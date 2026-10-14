# A-FR02 — Bug report và AI gaps

**Baseline/runtime SUT:** `85af3ba875c88283615e22cb108f13e2fccaf0e9`. Findings bên dưới được tái hiện bằng API và/hoặc Web trong Run 003/004; ảnh giao diện bổ sung được chụp ở Run 005. Chưa đăng GitHub Issue. Screenshot minh họa UI; log cùng Run ID cung cấp HTTP response và state DB chỉ đọc khi cần.

## Bug xác nhận

### A-BUG-001 — Mỗi lần đăng nhập sai tăng counter thêm 2 và khóa từ lần sai thứ hai

- **Requirement:** A-R04 yêu cầu mỗi lần sai tăng đúng 1; A-R05 yêu cầu khóa từ lần sai thứ ba.
- **TC:** A-DT-002, A-DT-011, A-DT-014, A-DT-020; A-BV-002, A-BV-003, A-BV-004, A-BV-005.
- **Môi trường:** API `localhost:3000`, Web `localhost:5173`, Ubuntu 26.04.1, Chrome 154.0.8037.57; baseline/runtime commit như trên.
- **Tiền điều kiện/dữ liệu:** Tài khoản mới cho từng chuỗi, state đầu `login_attempts=0`, chưa khóa; email test riêng; password sai `Wrong123!` (đã che trong log).
- **Bước tái hiện:** đăng ký user test mới → gửi POST `/api/login` sai password một lần → đọc state bằng SQLite read-only → gửi lần sai thứ hai → đọc state/response.
- **Expected:** sau lần 1 counter=1, chưa khóa; sau lần 2 counter=2, chưa khóa; lần sai thứ 3 mới kích hoạt khóa.
- **Actual:** sau lần 1 counter=2, chưa khóa; sau lần 2 counter=4 và `locked_until` đã được đặt; request thứ 3 trả 403 do đang khóa. Các chuỗi độc lập lặp lại kết quả; UI cũng từ chối sau sớm.
- **Bằng chứng:** Run 003 `execution.jsonl` cho A-BV-002/003/004/005 và A-DT-011/014; Run 004 UI JSONL/screenshots cho A-DT-002/011/014/020; Run 005 [ảnh UI](../../evidence/A-FR02/issue-evidence/20261014T183925Z-fa22ee4e/A-BUG-001-counter-after-one-wrong.png) và [capture log](../../evidence/A-FR02/issue-evidence/20261014T183925Z-fa22ee4e/capture.jsonl) cho 401/counter=2 sau một lần sai.
- **Severity đề nghị:** Major — người dùng bị khóa sớm hơn đặc tả và chỉ có thể thử sai một lần thay vì hai trước ngưỡng.
- **Issue:** Chưa đăng. Ảnh UI và log counter/response hiện đã được lưu riêng; có thể đính kèm cùng nhau.

### A-BUG-002 — Tài khoản vẫn bị khóa sau hơn 30 giây

- **Requirement:** A-R06 yêu cầu khóa tạm thời 30 giây.
- **TC:** A-DT-013, A-DT-021, A-DT-022; A-BV-008, A-BV-010. A-BV-006/009 là đối chứng trước 30 giây.
- **Tiền điều kiện/dữ liệu:** Tài khoản riêng; hai lần password sai tạo khóa runtime; probe password đúng (hoặc sai ở DT-022) được gửi sau khoảng đo bảo thủ >30s, không có request khác trong ca ngoài DT-021 đã nêu.
- **Expected:** sau hơn 30 giây, khóa hết; password đúng được xét đăng nhập. Password sai vẫn phải bị từ chối vì thông tin sai, nhưng không còn bị từ chối do khóa cũ.
- **Actual:** probes toàn phần ở khoảng 31.0707–31.0814s và 40.0726–40.0969s vẫn trả HTTP 403/lỗi đang khóa. State có `locked_until` xấp xỉ ba phút sau thời điểm kích hoạt quan sát được. A-DT-021 probe ở 10s không đổi `locked_until`; probe khoảng 40s vẫn 403.
- **Bằng chứng:** Run 003 JSONL và [timing analysis](timing-analysis.md); UI timing observations ở Run 004 cũng trả 403 sau >40s; Run 005 [ảnh giao diện](../../evidence/A-FR02/issue-evidence/20261014T183925Z-fa22ee4e/A-BUG-002-correct-after-40s.png) và [capture log](../../evidence/A-FR02/issue-evidence/20261014T183925Z-fa22ee4e/capture.jsonl) thể hiện đăng nhập đúng bị từ chối trong lần chụp bổ sung.
- **Severity đề nghị:** Major — đúng credentials vẫn bị từ chối lâu hơn thời gian khóa đã công bố.
- **Issue:** Chưa đăng. Ảnh UI bổ sung và log thời gian/HTTP của các Run trước đã sẵn sàng để đính kèm.

### A-BUG-003 — Trường email Login Web không dùng HTML `type="email"`

- **Requirement:** A-R10.
- **TC:** A-DT-004, A-DT-020.
- **Dữ liệu:** `not-an-email` cùng password hợp lệ/test.
- **Thao tác:** mở `/login`, nhập email sai format, submit một lần; quan sát validity/Network.
- **Expected:** input email có `type=email`; browser HTML5 chặn submit và không gửi POST `/api/login`.
- **Actual:** input là `type=text`; `checkValidity()` chấp nhận format đó và browser gửi POST login, nhận 401.
- **Bằng chứng:** Run 004 JSONL và các observation/request A-DT-020; Run 005 [ảnh có giá trị email sai định dạng](../../evidence/A-FR02/issue-evidence/20261014T183925Z-fa22ee4e/A-BUG-003-invalid-email-submitted.png) cùng [capture log](../../evidence/A-FR02/issue-evidence/20261014T183925Z-fa22ee4e/capture.jsonl) ghi input `type=text`, validity=true và POST 401.
- **Severity đề nghị:** Minor — validation định dạng email bắt buộc của form bị thiếu; API vẫn từ chối tài khoản không tồn tại.
- **Issue:** Chưa đăng. Ảnh và log giao diện/request đã được lưu làm bằng chứng.

## Observation cần làm rõ, chưa phải bug

- A-DT-018/019: uppercase email và email có khoảng trắng bị từ chối; SRS chưa quy định chuẩn hóa hoa/thường hoặc trim.
- A-DT-007–010/015–017: một số payload thiếu/rỗng/sai kiểu bị browser/API chặn; status hoặc quy tắc counter chi tiết đang mở ở Q2/Q7/Q8. Chỉ ghi checkpoint không đăng nhập thành công đã quan sát.
- A-DT-021: SRS chưa nói request trong lúc khóa có gia hạn hay không; lần probe 10 giây trong run không đổi `locked_until`, nhưng không suy rộng thành chính sách đặc tả.
- `type="password"` chưa được chấm trong A-FR02; FR-22 có yêu cầu form chung riêng. Nếu cần, tạo trace/test theo FR-22 thay vì thêm vào A-R10.

## AI gaps đã phát hiện trong lượt chạy

1. Lượt UI đầu trong Run 003 dùng lại token trong profile giữa nhiều ca; một số ca âm cho thấy `tokenPresent=true`, và ca sai format bị điều hướng thành công. Đồng thời harness truyền email account mới thay cho dữ liệu `not-an-email`/rỗng ở một vài ca. Phát hiện từ chính log điều hướng/token; loại bỏ toàn bộ UI observations/screenshots Run 003 khỏi kết luận. Chạy lại UI trong profile sạch Run 004, xóa local token giữa ca và giữ đúng input; dùng Run 004 làm bằng chứng.
2. Bản harness đầu ghép response timing UI vào checkpoint không thành công. Raw event log vẫn có request/response và monotonic; đối chiếu thủ công theo email test, thứ tự request, response và loại preflight 204 trong [timing-analysis.md](timing-analysis.md). Kết luận UI thời gian dựa trên phép ghép đã công khai, không dựa vào trường bounds bị null trong checkpoint tự sinh.
3. Script ban đầu dùng `attempts` cho chuỗi sai nhưng không tự nối từng run với toàn bộ TC. Harness mới ghi TC label, Run ID, request/response redacted, timestamp và DB read-only; execution table vẫn cần đối chiếu expected con người.

Không sửa SUT, database bằng tay hoặc dữ liệu mẫu. Không tạo GitHub Issue trong lượt này.
