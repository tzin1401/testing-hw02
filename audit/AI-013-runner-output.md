# AI-013 — Output nguyên văn

## Thông báo tiến độ

Tôi hiểu bạn đang gửi prompt đầu tiên của bước 8 để tôi chuẩn bị script; các dòng checklist phía dưới là hướng dẫn thao tác sau khi script được tạo. Tôi sẽ chỉ tạo script và lệnh chạy, chưa gọi API hay chạy test.

## File: scripts/A-FR02-login-sequence.py

```python
#!/usr/bin/env python3
"""Prepare a fresh local account and send a sequence of wrong logins.

This script records observations; it does not decide Pass/Fail. Passwords and
tokens are redacted from the JSONL log. The optional SQLite query opens the DB
read-only and is only a supporting observation.
"""

import argparse
import json
import sqlite3
import sys
import time
import urllib.error
import urllib.request
import uuid
from datetime import datetime, timezone
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_DB = ROOT / "eshop-sut" / "backend" / "database.sqlite"
WRONG_PASSWORD = "Wrong123!"
RIGHT_PASSWORD = "Test1234!"


def utc_now():
    return datetime.now(timezone.utc).isoformat(timespec="milliseconds")


def redact(value):
    if isinstance(value, dict):
        return {
            key: ("[REDACTED]" if key.lower() in {"password", "token", "authorization"} else redact(item))
            for key, item in value.items()
        }
    if isinstance(value, list):
        return [redact(item) for item in value]
    return value


def read_json_state(db_path, email):
    """Read account lock state through a SQLite read-only connection."""
    try:
        uri = db_path.resolve().as_uri() + "?mode=ro"
        with sqlite3.connect(uri, uri=True, timeout=2) as connection:
            row = connection.execute(
                "SELECT id, email, login_attempts, locked_until "
                "FROM users WHERE email = ?",
                (email,),
            ).fetchone()
        if row is None:
            return {"available": True, "account_found": False}
        return {
            "available": True,
            "account_found": True,
            "user_id": row[0],
            "email": row[1],
            "login_attempts": row[2],
            "locked_until": row[3],
        }
    except (OSError, sqlite3.Error) as error:
        return {"available": False, "error": str(error)}


def send_json(url, payload, timeout):
    """Send one JSON request and return timing plus a safely redacted body."""
    encoded = json.dumps(payload).encode("utf-8")
    request = urllib.request.Request(
        url,
        data=encoded,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    sent_utc = utc_now()
    sent_mono = time.monotonic()
    try:
        with urllib.request.urlopen(request, timeout=timeout) as response:
            status = response.status
            raw = response.read()
    except urllib.error.HTTPError as error:
        status = error.code
        raw = error.read()
    received_mono = time.monotonic()
    received_utc = utc_now()

    try:
        body = json.loads(raw.decode("utf-8"))
    except (UnicodeDecodeError, json.JSONDecodeError):
        body = {"non_json_response": raw.decode("utf-8", errors="replace")}

    safe_body = redact(body)
    if isinstance(body, dict) and "token" in body and isinstance(safe_body, dict):
        safe_body["token_present"] = bool(body.get("token"))

    return {
        "sent_utc": sent_utc,
        "received_utc": received_utc,
        "sent_monotonic": sent_mono,
        "received_monotonic": received_mono,
        "round_trip_seconds": received_mono - sent_mono,
        "status": status,
        "response": safe_body,
    }


def append_jsonl(path, record):
    with path.open("a", encoding="utf-8") as output:
        output.write(json.dumps(record, ensure_ascii=False) + "\n")


def main():
    parser = argparse.ArgumentParser(
        description=(
            "Create a unique local account and submit 1–4 wrong-password "
            "login requests sequentially. This records data; it does not "
            "assert test results."
        )
    )
    parser.add_argument("--attempts", type=int, choices=range(1, 5), default=3)
    parser.add_argument("--base-url", default="http://localhost:3000/api")
    parser.add_argument("--db", type=Path, default=DEFAULT_DB)
    parser.add_argument("--timeout", type=float, default=10.0)
    args = parser.parse_args()

    run_id = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ") + "-" + uuid.uuid4().hex[:8]
    email = f"a-fr02-{run_id.lower()}@example.test"
    output_dir = ROOT / "evidence" / "A-FR02" / "api-runs" / run_id
    output_dir.mkdir(parents=True, exist_ok=False)
    log_path = output_dir / "login-sequence.jsonl"

    started_mono = time.monotonic()
    append_jsonl(log_path, {
        "event": "run_started",
        "run_id": run_id,
        "utc": utc_now(),
        "monotonic": started_mono,
        "base_url": args.base_url,
        "attempts_requested": args.attempts,
        "email": email,
        "passwords_logged": False,
        "timing_note": "Monotonic client send/receive times; not server comparison time.",
    })

    print(f"Run ID: {run_id}")
    print(f"Test account: {email}")
    print(f"JSONL log: {log_path.relative_to(ROOT)}")

    before = read_json_state(args.db, email)
    append_jsonl(log_path, {"event": "db_state_before_register", "utc": utc_now(), "state": before})

    registration_payload = {
        "name": f"A-FR02 Test {run_id}",
        "email": email,
        "password": RIGHT_PASSWORD,
    }
    registration = send_json(
        args.base_url.rstrip("/") + "/register",
        registration_payload,
        args.timeout,
    )
    append_jsonl(log_path, {
        "event": "register_account",
        "request": redact(registration_payload),
        **registration,
    })
    print(f"Registration HTTP status: {registration['status']}")

    if registration["status"] < 200 or registration["status"] >= 300:
        append_jsonl(log_path, {
            "event": "run_stopped",
            "utc": utc_now(),
            "reason": "Registration failed; no login attempts were sent.",
        })
        print("Registration failed; no login attempts were sent. Inspect the redacted log.", file=sys.stderr)
        return 2

    for attempt in range(1, args.attempts + 1):
        payload = {"email": email, "password": WRONG_PASSWORD}
        result = send_json(
            args.base_url.rstrip("/") + "/login",
            payload,
            args.timeout,
        )
        state = read_json_state(args.db, email)
        record = {
            "event": "login_attempt",
            "run_id": run_id,
            "attempt_number": attempt,
            "request": redact(payload),
            **result,
            "db_state_after": state,
        }
        append_jsonl(log_path, record)
        print(
            f"Attempt {attempt}: HTTP {result['status']}; "
            f"round trip {result['round_trip_seconds']:.6f}s; "
            f"DB state available={state.get('available')}"
        )

    append_jsonl(log_path, {
        "event": "run_finished",
        "run_id": run_id,
        "utc": utc_now(),
        "elapsed_since_script_start_seconds": time.monotonic() - started_mono,
        "note": "No Pass/Fail judgment is generated by this script.",
    })
    print("Finished recording; this script does not decide Pass/Fail.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

```

## File: scripts/README-A-FR02.md

```markdown
# Chạy chuỗi đăng nhập API A-FR02

Script này tạo một tài khoản riêng qua API đăng ký, sau đó gửi 1–4 lần đăng nhập sai **tuần tự**. Mỗi lần gọi script sinh email/run ID mới. Script chỉ ghi request/response và counter/lock state nếu đọc được DB; script không tự kết luận Pass/Fail.

## Trước khi chạy

1. Đảm bảo backend đang chạy ở `http://localhost:3000`.
2. Mở terminal mới ở thư mục gốc bài làm. Không chạy `node database.js` và không restart backend giữa một chuỗi test.
3. Chọn số lần theo ca: `2` để khảo sát dưới ngưỡng, `3` để kiểm tra ngưỡng, `4` để gửi request thứ tư khi tài khoản có thể đã khóa. Mỗi lựa chọn tạo tài khoản mới.

## Lệnh chạy

Chạy **một lệnh cho mỗi chuỗi cần thu thập**:

```bash
cd /home/zinn/zinn/test/hw02
python3 scripts/A-FR02-login-sequence.py --attempts 2
```

Đổi `2` thành `3` hoặc `4` cho chuỗi độc lập khác. Lưu toàn bộ terminal output nếu cần:

```bash
python3 scripts/A-FR02-login-sequence.py --attempts 3 | tee /tmp/a-fr02-attempts-3.txt
```

`tee` chỉ lưu thêm bản terminal text; log JSONL chính được script tạo tại `evidence/A-FR02/api-runs/<Run-ID>/login-sequence.jsonl`.

## Nội dung và giới hạn của log

- Ghi UTC, monotonic send/receive time, thời lượng round-trip, HTTP status, response đã che password/token, email test, run ID và state DB đọc-only trước/sau.
- Nếu đọc DB lỗi, log ghi state unavailable; request API vẫn được ghi.
- Password không được ghi ra log. Token và trường authorization bị che; không copy token vào ảnh/issue.
- Thời gian đo là đồng hồ **client** tại lúc trước/sau HTTP call. Nó không cho biết chính xác lúc server so sánh `locked_until`, nên không tự chứng minh điểm đúng 29/30/31 giây. Với request thất bại thứ ba, khoảng round-trip cũng không được dùng thay cho timestamp nội bộ của server.
- Đăng ký qua API chỉ chuẩn bị tài khoản cho chuỗi; đây không phải kiểm thử FR-01. Không chạy lệnh này trong lúc đang giữ state của tài khoản khác cho một ca UI.
- Không dùng log API để kết luận UI validation, hiển thị lỗi, token storage của trình duyệt hay header do client Web gửi. Những phần đó cần chạy riêng trên giao diện và ghi đúng bằng chứng UI.
- Script tạo tài khoản trong SQLite hiện có và không xóa tài khoản sau chạy. Dùng email riêng, giữ log; chỉ dọn dữ liệu test sau khi đã bảo toàn bằng chứng và xác định đúng tài khoản.

## Bước tiếp theo sau mỗi lần chạy

Mở JSONL, xác nhận run ID/email, trạng thái tạo tài khoản và số request đã gửi. Gửi nguyên log cùng các ảnh UI liên quan và nhận xét của bạn để cập nhật `features/A-FR02/06-execution.md`. Nếu số lần/counter không như expected, ghi đúng actual; không sửa log để làm khớp thiết kế.

```

## File: reports/work-progress.md

```markdown
# Tiến độ HW02 — Nguyễn Lê Thế Vinh — 23120190

**Vai trò nhóm:** Thành viên 2. **Cập nhật:** 14/10/2026 (UTC+07:00).

## Bước chuẩn bị tài liệu

- [x] Đối chiếu phân công thành viên 2 và xác nhận bốn chức năng.
- [x] Ghi baseline SUT `85af3ba875c88283615e22cb108f13e2fccaf0e9` và nguồn yêu cầu.
- [x] Tạo README với rubric 25/25/25/15/10, để trống điểm tự chấm.
- [x] Tạo environment.md với thông tin công cụ quan sát được và các mục chưa xác nhận.
- [x] Tạo file theo dõi tiến độ này.

Đây là trạng thái tạo tài liệu của AI; không thể hiện sinh viên đã review thiết kế hoặc đã chạy SUT. Nhật ký tương tác của bước này nằm ở **AI-002** trong [AI Audit](../AI_AUDIT_REPORT.md).

## Tiến độ từng chức năng

“Chưa ghi nhận” nghĩa là chưa có sản phẩm/bằng chứng được xác nhận trong bộ bài làm này.

| Chức năng | Yêu cầu/input-output | EC | Ca Domain | Ca BVA | Review sinh viên | Thực thi | Bug/AI gaps |
|---|---|---|---|---|---|---|---|
| A-FR02 — Đăng nhập/khóa Web | Đã có bản nháp 01-requirements.md (AI-007) | Đã có bản nháp 02-domains.md (AI-008) | Đã có 24 ca nháp 03-domain-cases.md (AI-009) | Đã có 12 ca nháp 04-boundary-cases.md (AI-010) | Đã đọc và hiểu ca (AI-011); chưa xác nhận phê duyệt thiết kế | A-DT-001 UI được báo thành công; toàn TC còn checkpoint token và bằng chứng (AI-012) | Chưa ghi nhận | Script hỗ trợ/API chưa chạy (AI-013) |
| B-FR07 — Giỏ hàng Web | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận |
| C-FR14 — Danh mục Admin | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận |
| D-MREG — Đăng ký Mobile | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận |

Không chuyển một ô thành hoàn thành chỉ vì AI đã đề xuất nội dung. Review chỉ ghi khi có nhận xét thật của sinh viên; execution chỉ ghi khi có lần chạy và bằng chứng.

## Quy trình lưu file và commit khi thực hiện

Mỗi chức năng dùng thư mục `features/<mã-chức-năng>/`, với các bước:

| Thứ tự | File dự kiến | Nội dung |
|---|---|---|
| 1 | `01-requirements.md` | Nguồn yêu cầu, input/output, trạng thái |
| 2 | `02-domains.md` | Lớp tương đương và đại diện |
| 3 | `03-domain-cases.md` | Các ca Domain có thao tác và expected |
| 4 | `04-boundary-cases.md` | Biên và các ca BVA |
| 5 | `05-review-coverage.md` | Review thực tế, sửa đổi và truy vết |
| 6 | `06-execution.md` | Run ID, actual, status và evidence |
| 7 | `07-bugs-and-ai-gaps.md` | Bug/issue, thiếu sót AI có bằng chứng |

Tạo commit sau từng bước thực sự hoàn thành của từng chức năng. Chỉ stage đường dẫn liên quan; giữ nguyên các thay đổi khác. Không điền trước các file execution hoặc human review.

## Các phần tổng hợp còn lại

- [ ] Skill Domain/BVA tái sử dụng và video demo YouTube.
- [ ] Báo cáo chính Markdown + PDF cho đủ bốn chức năng.
- [ ] Bug report, GitHub Issues và ảnh trên từng issue.
- [ ] AI Audit đầy đủ và PDF; xử lý các phần lịch sử còn thiếu bằng dữ liệu thật.
- [ ] AI Critique 200–300 từ, Markdown + PDF.
- [ ] Test summary thực tế và bảng tự chấm.
- [ ] Commit log, kiểm tra ZIP và nộp Moodle.

## Kiểm tra mở môi trường

- [x] Backend trả danh sách sản phẩm theo JSON sinh viên gửi (AI-004).
- [x] Web hiển thị danh sách sản phẩm theo ảnh sinh viên gửi (AI-005).
- [x] Admin hiển thị ba danh mục mẫu theo ảnh sinh viên gửi (AI-006).
- [ ] Lưu bản ảnh gốc vào repo và bổ sung phiên bản trình duyệt.
- [ ] Chuẩn bị môi trường Mobile.

Các dấu hoàn thành ở đây chỉ ghi khả năng mở môi trường, không phải Pass test chức năng hay human review.

## Review A-FR02

- [x] Sinh viên xác nhận đã đọc và hiểu các ca kiểm thử Domain/BVA (AI-011).
- [x] Tạo ma trận review/truy vết `features/A-FR02/05-review-coverage.md`.
- [ ] Review kỹ thuật expected, lớp chưa rõ và protocol đo đúng 30 giây.
- [ ] Chốt harness/fixture thời gian hoặc ghi giới hạn nếu không khả thi.
- [ ] Thực thi ca và ghi actual/bằng chứng; hiện chưa có ca nào chạy.

Phản hồi “đã hiểu” không được coi là phê duyệt tính đúng đắn của toàn bộ thiết kế hoặc xác nhận đã chạy test.

## Thực thi A-FR02

- [x] Ghi nhận Run 001 cho A-DT-001 theo báo cáo người chạy: login UI thành công, chuyển về trang chủ và thấy tài khoản đăng nhập.
- [ ] Lưu screenshot login vào `evidence/A-FR02/`.
- [ ] Xác nhận response/token, lưu token phía client và Bearer header do client gửi. Chưa ghi nhận các checkpoint này.
- [ ] Hoàn tất Status cho toàn TC sau khi có đủ bằng chứng.

Phản hồi “mọi thứ đều pass” được giữ kèm phạm vi chi tiết thực tế đã mô tả. A-DT-001 kiểm tra cả token, nên toàn TC chưa đóng chỉ từ chuyển trang UI. Xem [execution log](../features/A-FR02/06-execution.md).

## Script hỗ trợ A-FR02

- [x] Tạo `scripts/A-FR02-login-sequence.py` và hướng dẫn `scripts/README-A-FR02.md`.
- [x] Đọc cú pháp Python tĩnh; **không chạy script và không gọi API** ở lượt chuẩn bị.
- [ ] Sinh viên chạy từng chuỗi bằng `--attempts 2`, `3` hoặc `4`; xem JSONL tại đường dẫn script in ra.
- [ ] Thực hiện ca UI riêng, lưu screenshot và Network evidence.
- [ ] Gửi log/ảnh/nhận xét để cập nhật execution.

Script tạo tài khoản mới bằng API đăng ký cho mỗi lần chạy. Terminal output không lưu password/token; state DB đọc-only là quan sát bổ trợ. Đo monotonic là ở client và không chứng minh thời điểm server so sánh đúng 30 giây.

## Việc tiếp theo

Chạy một chuỗi API theo hướng dẫn và lưu log JSONL. Tiếp tục thực hiện ca UI riêng; không dùng kết quả API thay cho UI hoặc restart backend khi cần giữ state khóa.

```

## Phản hồi cuối

Đã tạo script [A-FR02-login-sequence.py](../scripts/A-FR02-login-sequence.py) và [hướng dẫn chạy](../scripts/README-A-FR02.md).

Script tạo tài khoản riêng cho mỗi lần chạy, gửi 1–4 lần login sai tuần tự và lưu JSONL gồm thời gian UTC/monotonic, response đã che password/token và state DB nếu đọc được. Script không tự kết luận Pass/Fail. Tôi chỉ kiểm tra cú pháp Python; **chưa chạy script, chưa gọi API và chưa chạy test**.

Đã ghi AI Audit, cập nhật tiến độ và commit riêng bước chuẩn bị. Sau khi đọc hướng dẫn, bạn có thể chạy `python3 scripts/A-FR02-login-sequence.py --attempts 2` từ thư mục gốc.
