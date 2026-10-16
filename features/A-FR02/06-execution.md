# A-FR02 — Nhật ký thực thi

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2.

## Run 001 — A-DT-001: Đăng nhập Web đúng; lưu và gửi token

- **TC ID:** A-DT-001.
- **Thời điểm:** 15/10/2026; giờ/phút người chạy chưa cung cấp.
- **Môi trường:** Web tại `http://localhost:5173`; OS của workspace là Ubuntu 26.04.1 LTS, nhưng chưa xác nhận trình duyệt/phiên bản thực sự dùng cho run. SUT baseline dự kiến `85af3ba875c88283615e22cb108f13e2fccaf0e9`; chưa ghi nhận commit runtime riêng cho lần chạy.
- **Tiền điều kiện:** Theo mô tả thực thi, người chạy đã vào trang login và nếu cần đã đăng xuất trước đó. Việc đăng nhập thành công cho thấy tài khoản được chấp nhận ở lần đó; counter n=0, chưa khóa và client không token cũ chưa có ảnh/log xác nhận riêng.
- **Dữ liệu:** Email `test@eshop.com`; mật khẩu test `Test1234!`.
- **Thao tác đã làm:** Theo người chạy, đã mở `/login`, nhập email/mật khẩu, bấm **Sign In** một lần và quan sát chuyển về trang chủ với người dùng đăng nhập.
- **Expected:** Request login thành công; có JWT token và thông tin user; client lưu token và gửi `Authorization: Bearer <token>` khi phát request cần xác thực. Xem A-DT-001.
- **Actual:** Người chạy báo “mọi thứ đều pass”. Phần chi tiết được xác nhận trong hội thoại là đăng nhập thành công, chuyển về trang chủ và thấy người dùng đã đăng nhập. Chưa có response/network log hoặc quan sát storage/header để xác nhận riêng các checkpoint token.
- **Status:** **Chưa hoàn tất toàn bộ A-DT-001.** UI login được người chạy báo thành công; checkpoint token được lưu/gửi chưa được ghi nhận. Không đánh dấu toàn TC là Pass cho tới khi xác nhận checkpoint còn lại.
- **Bằng chứng:** Chưa có screenshot login được lưu. Sau khi chụp, đặt tại `evidence/A-FR02/A-DT-001-login-success.png` hoặc cập nhật path đúng. Ảnh hiện có trong hội thoại là trang Admin, không dùng làm bằng chứng cho ca login.

### Còn cần ghi để đóng A-DT-001

1. Chụp trang sau đăng nhập và lưu screenshot với TC ID.
2. Trong DevTools → Network, mở `POST /api/login`, xác nhận response có token/user; không đưa nguyên token vào ảnh công khai.
3. Kiểm tra client đã lưu token ở nơi implementation dùng.
4. Mở request cần xác thực do client gửi (ví dụ `GET /api/users/me`) và xác nhận request header Bearer khớp token vừa nhận. Không tự thêm header bằng tay.
5. Nếu đã làm các bước 2–4, gửi đúng quan sát và log/ảnh để cập nhật Actual/Status. Nếu chưa làm, phần đó còn Not run.

Đây là ghi nhận theo lời người chạy; không tạo thêm kết quả nào ngoài thông tin đã cung cấp. Không sửa SUT.


## Run 002 — API; hai lần sai liên tiếp (phủ một phần A-BV-003 / A-DT-011)

- **TC ID:** `A-BV-003` được chạy một phần: chỉ hai lần sai, chưa thực hiện bước nhập mật khẩu đúng cuối ca. Cũng là hai bước đầu của `A-DT-011`; lần sai thứ ba và kiểm tra khóa chưa chạy.
- **Run ID:** `20261014T173755Z-47a40399`.
- **Thời điểm:** 2026-10-14 17:37:55–17:37:55 UTC (2026-10-15 00:37:55–00:37:55 Asia/Ho_Chi_Minh), lấy từ log JSONL.
- **Môi trường:** API `http://localhost:3000/api`; database SQLite được đọc chỉ để quan sát state. Baseline SUT của bài là `85af3ba875c88283615e22cb108f13e2fccaf0e9`; commit runtime lúc chạy chưa được xác nhận riêng.
- **Tiền điều kiện:** Tài khoản mới tạo qua `/register`, user id 3; trước đăng ký chưa có tài khoản cùng email. State sau đăng ký trước lần sai đầu: counter/lock chưa được lưu riêng trong log. Mỗi lần sai gửi tuần tự, request trước đã hoàn tất.
- **Dữ liệu:** `a-fr02-20261014t173755z-47a40399@example.test`; password sai `Wrong123!` (đã che trong log).
- **Thao tác:** Đăng ký tài khoản mới (HTTP 200); gửi POST `/login` sai hai lần tuần tự.
- **Expected:** Theo `A-R04`/`A-R05` và expected của A-BV-003, sau hai lần sai counter phải là 1 rồi 2, tài khoản chưa khóa. A-BV-003 còn có bước nhập mật khẩu đúng sau đó; bước này chưa làm.
- **Actual:** Hai response đều HTTP 401. Sau lần 1 DB cho thấy `login_attempts=2`, `locked_until=null`. Sau lần 2 DB cho thấy `login_attempts=4`, `locked_until=2026-10-14T17:40:55.185Z`. Đây là sai khác trực tiếp với expected về counter và ngưỡng khóa, quan sát được sau cả hai request.
- **Status:** **Fail cho checkpoint counter sau lần 1 và lần 2**; bằng chứng cũng cho thấy khóa đã phát sinh trước ngưỡng 3. `A-BV-003` tổng thể **chưa hoàn tất** vì bước password đúng sau hai lần sai chưa chạy. `A-DT-011` **chưa hoàn tất** vì mới gửi hai trong ba lần sai. Không kết luận về 30 giây từ lần chạy này.
- **Bằng chứng:** [JSONL đã che password](../../evidence/A-FR02/api-runs/20261014T173755Z-47a40399/login-sequence.jsonl). Log ghi thời gian monotonic client và round-trip; không đo chính xác thời điểm server so sánh `locked_until`.
- **Tài khoản còn lại:** Tài khoản test user id 3 vẫn ở database local và đang có `locked_until` theo log; không xóa hoặc restart DB trong bước này.

## Run 003 — API Domain/BVA và các chuỗi trạng thái

- **Run ID:** `20261014T180523Z-fa50f52b` (2026-10-15 01:05:23+07:00 bắt đầu; 272.39 giây).
- **TC liên quan:** A-DT-005–010, A-DT-011–014, A-DT-018–019, A-DT-021–022; A-BV-001–006, A-BV-008–010. Xem bảng coverage bên dưới để biết ca nào chỉ phủ một phần.
- **Môi trường:** API `localhost:3000`; Web `localhost:5173`; Ubuntu 26.04.1; baseline và runtime SUT commit `85af3ba875c88283615e22cb108f13e2fccaf0e9`. Backend đã chạy sẵn; không restart. Database chỉ được đọc qua kết nối SQLite `mode=ro`.
- **Cách chạy:** Harness [A-FR02-full-execution.mjs](../../scripts/A-FR02-full-execution.mjs) tạo tài khoản độc lập qua API đăng ký, gửi request tuần tự, ghi response đã che password/token và state DB trước/sau. Không có kết luận Pass/Fail tự động.
- **Bằng chứng thô:** [execution.jsonl](../../evidence/A-FR02/full-runs/20261014T180523Z-fa50f52b/execution.jsonl). Run có 33 tài khoản test mới; không xóa.
- **Kết quả nổi bật:** request sai đầu tiên làm `login_attempts` thành 2; request sai thứ hai làm counter thành 4 và đặt `locked_until` trước khi đến lần sai thứ ba. Lần thứ ba trả HTTP 403 do đã khóa. Các chuỗi độc lập cho A-BV-002/003/004/005 và A-DT-011 tái hiện điều này. Sau lần sai thứ hai, probe đúng ở A-BV-003 cũng bị 403.
- **Thời gian:** các khoảng đo client được ghi ở JSONL. A-BV-006: toàn request nằm khoảng 29.0598–29.0711 giây sau khoảng request kích hoạt khóa; trả 403. A-BV-008: 31.0707–31.0814 giây; trả 403. A-BV-009: 10.0610–10.0706 giây; trả 403. A-BV-010: 40.0876–40.0969 giây; trả 403. A-DT-012 ở khoảng 10.0344–10.0458 giây trả 403; A-DT-013 ở 40.0787–40.0881 giây trả 403. Mỗi khoảng được tính bảo thủ từ thời điểm gửi/nhận request kích hoạt và probe. Setup khóa bắt đầu sau lần sai thứ hai (sai ngưỡng); các ca thời gian là quan sát chẩn đoán trên trạng thái khóa thực tế, không chứng minh luồng chuẩn bắt đầu khóa ở lần thứ ba. Đo client không kiểm soát clock tại điểm server so sánh.
- **A-DT-014:** chuỗi sai → đúng → sai trả 401 → 200 → 401; DB lần lượt cho thấy counter 2 → 0 → 2. Việc đăng nhập đúng reset counter được quan sát; mỗi lần sai vẫn tăng 2 thay vì 1.
- **A-DT-021:** probe đúng ở khoảng 10 giây và khoảng 40 giây đều trả 403; `locked_until` không đổi sau probe 10 giây. Q5 chưa được đặc tả nên không kết luận chính sách gia hạn nói chung.
- **A-DT-022:** password sai gửi sau hơn 40 giây kể từ response kích hoạt khóa vẫn trả 403; counter/locked state được giữ. Đây là bằng chứng thời lượng thực tế vượt 30 giây.
- **API input thăm dò:** A-DT-006 trả 401 cho email không tồn tại; A-DT-007 (thiếu email), A-DT-008 (email số), A-DT-009 (thiếu password), A-DT-010 (email null) đều không đăng nhập thành công. Riêng A-DT-009 làm counter thành 2; quy tắc đếm cho payload thiếu password chưa chốt nên không chấm counter. A-DT-018 (email uppercase) và A-DT-019 (email có khoảng trắng) trả 401; chuẩn hóa email chưa được SRS định nghĩa nên chỉ ghi observation.
- **A-DT-005/A-BV-001:** đăng nhập đúng tài khoản mới trả HTTP 200, có token và user.

## Run 004 — UI Web bằng Chrome headless cô lập

- **Run ID:** `20261014T181147Z-0f7e1361` (2026-10-15 01:11:47+07:00 bắt đầu; 176.54 giây).
- **Môi trường:** Chrome 154.0.8037.57 headless, profile tạm riêng; Web `localhost:5173`, API `localhost:3000`; cùng baseline/runtime SUT như Run 003.
- **Bằng chứng:** [execution.jsonl](../../evidence/A-FR02/full-runs/20261014T181147Z-0f7e1361/execution.jsonl) và [ảnh UI theo TC](../../evidence/A-FR02/full-runs/20261014T181147Z-0f7e1361/screenshots/). 13 tài khoản test được tạo; không xóa.
- **A-DT-001:** tài khoản test đăng nhập thành công; trang chủ chào đúng user; localStorage có token. Có request `/api/users/me` mang `Authorization: Bearer` và trả 200 trong profile sạch; một OPTIONS preflight trả 204 không có Authorization. Không ghi token thô vào log/ảnh.
- **A-DT-002/A-DT-003:** sai password và email không tồn tại đều ở lại trang login, hiển thị thông báo thất bại, không có token mới; ảnh được chụp sau khi xóa giá trị khỏi ô nhập.
- **A-DT-004:** nhập `not-an-email` được form gửi tới API thay vì HTML5 chặn; input quan sát được là `type="text"`, request trả 401. Đây là Fail với A-R10. A-DT-020 cũng gửi request cho email sai format xen giữa hai lần sai password; không có chặn HTML5.
- **A-DT-015/016:** email rỗng/password rỗng bị browser chặn bởi thuộc tính required; không có request login. Đây là observation phù hợp checkpoint không đăng nhập thành công; SRS chưa quy định validation required cụ thể.
- **A-DT-017:** ba dấu cách trong password được submit và bị từ chối; DB sau đó có counter 2. Không chấm quy tắc đếm vì Q2 chưa giải quyết kiểu input này.
- **A-DT-011:** ba lần submit sai password trên UI; hai request đầu bị từ chối, trạng thái server đã khóa từ lần thứ hai; request thứ ba bị từ chối do đang khóa. UI hiển thị thông báo tổng quát. Fail ngưỡng ở A-R04/A-R05.
- **A-DT-014:** UI chạy sai → đúng → sai; chuyển trang chủ sau lần đúng, quay lại login và từ chối lần sai cuối. DB cuối có counter 2; xem Run 003 để biết counter sau từng bước API tương ứng.
- **A-DT-023:** sau login đúng, gửi login sai; thông báo thất bại, token cũ vẫn còn nguyên. Kết quả không nhầm token phiên cũ với token mới từ login sai.
- **A-DT-024:** client được đặt token sai dạng trong profile test; login với credentials đúng vẫn thành công và token mới hiện diện.
- **A-DT-012/013/021/022:** thao tác UI chạy; request đầu vào và response đã ghi trong JSONL. UI timing lần lượt ở khoảng 10s, 40s, 10/40s và 40s; chi tiết bounds được suy ra từ timestamp monotonic request/response trong log ở mục coverage. Không dùng UI screenshot để khẳng định chính xác thời điểm server so sánh.

## Lưu ý về lần tự động hóa UI đầu tiên

Run 003 JSONL cũng chứa một lượt UI ban đầu bị nhiễm state: profile dùng lại token từ A-DT-001 giữa các ca và harness truyền email fixture thay vì `not-an-email`/email rỗng cho một số ca. Phát hiện từ `tokenPresent=true` ở ca âm và điều hướng thành công ở ca sai format. Không dùng các kết quả/screenshot UI trong Run 003 để chấm. Run 004 dùng profile sạch, xóa token giữa các ca và nhập đúng dữ liệu; chỉ kết quả Run 004 được dùng cho UI coverage. API observations ở Run 003 vẫn độc lập và hợp lệ.

## Coverage từng TC sau Run 003/004

| TC ID | Kênh/thực tế và kết quả chính | Trạng thái |
|---|---|---|
| A-DT-001 | UI login 200, token lưu; protected request Bearer trả 200 | Pass |
| A-DT-002 | UI sai password bị từ chối; counter sau một lần sai = 2 | Fail — A-R04 |
| A-DT-003 | UI email chưa đăng ký bị từ chối, không token mới | Pass |
| A-DT-004 | UI gửi email sai format; input `type=text`, HTML5 không chặn | Fail — A-R10 |
| A-DT-005 | API login đúng trả 200/token/user | Pass |
| A-DT-006 | API và UI email không tồn tại bị từ chối | Pass |
| A-DT-007 | API thiếu email: không login thành công; status chi tiết không oracle | Pass cho checkpoint không thành công; status không chấm |
| A-DT-008 | API email là số: không login thành công | Pass cho checkpoint; ép kiểu/status không chấm |
| A-DT-009 | API thiếu password: bị từ chối; counter 0→2 | Pass cho từ chối; counter là Q2, không chấm |
| A-DT-010 | API email null: bị từ chối, không login thành công | Pass cho checkpoint; status chi tiết không chấm |
| A-DT-011 | UI/API chuỗi sai; counter 0→2→4, khóa ở lần sai thứ hai | Fail — A-R04/A-R05 |
| A-DT-012 | Password đúng khoảng 10s bị khóa; setup đã khóa sớm ở lần sai thứ hai | Fail — setup ngưỡng; checkpoint khóa 10s bị quan sát |
| A-DT-013 | Password đúng >40s vẫn bị khóa; setup sớm, thời lượng cũng lệch 30s | Fail — A-R06; setup threshold cũng fail |
| A-DT-014 | Sai→đúng→sai; counter 0→2→0→2, login đúng reset chuỗi | Fail — A-R04; reset A-R11 được quan sát |
| A-DT-015 | Email rỗng bị required chặn, không request/không login | Pass cho checkpoint không thành công; cách validation chưa đặc tả |
| A-DT-016 | Password rỗng bị required chặn, không request/không login | Pass cho checkpoint không thành công; cách validation chưa đặc tả |
| A-DT-017 | Password ba dấu cách bị từ chối; counter 0→2 | Pass cho từ chối; phân loại/counter chưa chấm (Q2/Q7) |
| A-DT-018 | API uppercase email trả 401; email normalization chưa rõ | Observation only — không verdict (Q7) |
| A-DT-019 | API email có khoảng trắng trả 401; trim chưa rõ | Observation only — không verdict (Q7) |
| A-DT-020 | Email sai format được gửi API; HTML5 không chặn; counter sai password 0→2→4 | Fail — A-R10 và A-R04 |
| A-DT-021 | UI/API đúng ở khoảng 10s và khoảng 40s đều bị khóa; lần 10s không đổi locked_until; setup khóa sớm | Fail — setup A-R05; 40s vi phạm A-R06; Q5 không suy rộng |
| A-DT-022 | Password sai >40s sau khóa vẫn nhận lỗi đang khóa | Fail — A-R06; setup threshold fail |
| A-DT-023 | UI login sai bị từ chối; token hợp lệ cũ vẫn còn, không phải token mới | Pass |
| A-DT-024 | UI login đúng thành công dù client ban đầu có token sai dạng | Pass |
| A-BV-001 | API login đúng với n=0 thành công | Pass |
| A-BV-002 | Một lần sai làm counter 0→2 thay vì 1 | Fail — A-R04 |
| A-BV-003 | Hai lần sai làm 0→2→4/khóa; password đúng probe bị 403 | Fail — A-R04/A-R05 |
| A-BV-004 | Khóa ở lần sai thứ hai; lần ba và probe đều 403 | Fail — A-R04/A-R05 |
| A-BV-005 | Khóa trước lần ba; lần sai thứ tư bị 403 khi đang khóa | Fail — ngưỡng/setup; request thứ tư bị từ chối |
| A-BV-006 | Clock fixture tại elapsed 29s trả 403; natural setup thực tế khóa sớm ở lần sai thứ hai | Partial: time checkpoint khớp expected; setup chuỗi 3 lần sai chưa đạt |
| A-BV-007 | Clock fixture tại đúng 30.000s ở phép so sánh; login đúng trả 200 | Pass cho checkpoint toán tử; fixture không kiểm chứng thời lượng khóa tự nhiên |
| A-BV-008 | 31.0707–31.0814s, probe vẫn 403; locked_until cho thấy khoảng khóa runtime 180s | Fail — A-R06 (kèm setup threshold fail) |
| A-BV-009 | Clock fixture tại elapsed 10s trả 403; natural setup thực tế khóa sớm ở lần sai thứ hai | Partial: time checkpoint khớp expected; setup chuỗi 3 lần sai chưa đạt |
| A-BV-010 | 40.0876–40.0969s, probe vẫn 403; khóa phát sinh sớm và còn hiệu lực | Fail — A-R06 (kèm setup threshold fail) |
| A-BV-011 | Clock fixture tại 29.999s; login bị chặn 403 | Pass cho checkpoint toán tử trước mốc |
| A-BV-012 | Clock fixture tại 30.001s; login đúng trả 200 | Pass cho checkpoint toán tử sau mốc |

“Pass” ở hàng có ghi checkpoint nghĩa là chỉ checkpoint expected đã nêu được chứng minh; phần oracle đang mở không được suy ra. Với các ca trạng thái/timing, bảng ghi Fail/Blocked ở cả setup lẫn phần phụ thuộc khi cần, không coi lỗi setup là bằng chứng cho mọi checkpoint.

## Tài khoản và dữ liệu test

Run 003/004 đã tạo 46 tài khoản test mới với tiền tố email `a-fr02-`; tài khoản user ID 3 từ Run 002 cũng còn trong SQLite local. Không xóa tài khoản hoặc database. Tài khoản test được ghi trong các JSONL. Backend vẫn chạy; không restart.

## Run 005 — Chụp bổ sung bằng chứng giao diện cho bug

- **Run ID:** `20261014T183925Z-fa22ee4e`; Chrome 154.0.8037.57 trong profile riêng, màn hình 1280×1100; backend/Web đang chạy, không restart.
- **Mục đích:** chụp lại UI cho A-DT-002/A-BV-002 (A-BUG-001), A-DT-013/A-BV-008 (A-BUG-002) và A-DT-004 (A-BUG-003), kèm log riêng trong [capture.jsonl](../../evidence/A-FR02/issue-evidence/20261014T183925Z-fa22ee4e/capture.jsonl). Đây là bằng chứng bổ sung cho Run 003/004, không thay đổi verdict.
- **A-BUG-001:** một lần nhập sai trên UI trả 401; ảnh cho thấy thông báo từ chối. SQLite chỉ đọc ghi counter `0→2`, chưa khóa. Ảnh: [A-BUG-001](../../evidence/A-FR02/issue-evidence/20261014T183925Z-fa22ee4e/A-BUG-001-counter-after-one-wrong.png).
- **A-BUG-002:** hai lần sai qua API kích hoạt khóa; sau khoảng 40 giây, nhập mật khẩu đúng trên UI vẫn bị từ chối, request trả 403. Ảnh: [A-BUG-002](../../evidence/A-FR02/issue-evidence/20261014T183925Z-fa22ee4e/A-BUG-002-correct-after-40s.png). Phép đo thời gian chi tiết lấy từ các Run trước trong [timing analysis](timing-analysis.md).
- **A-BUG-003:** email `not-an-email` được gửi từ form Web; validity của input `type=text` là true và POST login trả 401. Ảnh: [A-BUG-003](../../evidence/A-FR02/issue-evidence/20261014T183925Z-fa22ee4e/A-BUG-003-invalid-email-submitted.png).
- Ảnh chỉ giữ email test và kết quả giao diện; ô mật khẩu được xóa trước khi chụp. Không có token/mật khẩu trong ảnh hoặc log. Một lượt chụp sơ bộ trước đó bị hủy vì ô mật khẩu của SUT thực tế là `type=text`; ảnh lượt đó đã xóa và không được dùng làm bằng chứng.
- Sau khi xác minh ảnh, ba lỗi đã được đăng riêng với ảnh đính kèm: [A-BUG-001 #1](https://github.com/tzin1401/testing-hw02/issues/1), [A-BUG-002 #2](https://github.com/tzin1401/testing-hw02/issues/2), [A-BUG-003 #3](https://github.com/tzin1401/testing-hw02/issues/3).


## Run 006 — Clock fixture cho ba điểm biên

- **Run ID:** `20261016T-clock-A-FR02`; baseline `85af3ba875c88283615e22cb108f13e2fccaf0e9`.
- **Môi trường:** bản clone cô lập trong `/tmp/hw02-a-clock-20261016`, backend riêng port 3001. Business source từ baseline; chỉ preload ngoài repo thay `Date.now()`/`new Date()` bằng clock fixture đọc từ file. Không sửa source SUT. Mỗi điểm dùng tài khoản fixture riêng, `login_attempts=3`, `locked_until=2026-10-16T08:00:30.000Z`; gửi đúng password.
- **Kết quả:** A-BV-011 tại 29.999s trả 403 và trạng thái khóa còn; A-BV-007 tại đúng 30.000s trả 200, DB read-only sau request cho `locked_until=null`; A-BV-012 tại 30.001s trả 200, DB read-only sau request cho `locked_until=null`. Các lần request độc lập, UTC/monotonic round-trip được ghi trong JSON.
- **Verdict:** Pass cho các checkpoint so sánh thời gian của fixture ở 29.999/30.000/30.001 giây. Bằng chứng kiểm tra toán tử thời hạn của baseline với clock điều khiển; không chứng minh luồng tạo khóa tự nhiên bắt đầu đúng thời điểm, cũng không thay đổi finding khóa 180 giây do logic baseline.
- **Bằng chứng:** [clock fixture JSON đã che bí mật](../../evidence/A-FR02/full-runs/20261016T-clock-A-FR02.json). Response password và token đã loại/che; SQLite clone chỉ đọc sau từng request.


## Run 007 — Clock fixture cho mốc 10s và 29s

- **Run ID:** `20261016T-clock-A-FR02-midpoints`; clone và preload clock ngoài source như Run 006, baseline giữ nguyên. Hai user fixture riêng có `locked_until=08:00:30.000Z`, `login_attempts=3`; clock tại phép so sánh lần lượt đặt elapsed 10s (A-BV-009) và 29s (A-BV-006).
- **Actual:** cả hai request password đúng trả 403; trạng thái DB clone read-only sau request vẫn khóa. Hai mốc nằm hẳn trước 30s theo clock fixture.
- **Verdict:** Partial cho từng TC: expected về active lock được xác nhận bằng fixture, nhưng không hoàn tất chuỗi tự nhiên ba lần sai vì baseline thực tế kích hoạt khóa ở lần sai thứ hai (đã ghi Fail threshold ở các TC khác).
- **Evidence:** [clock midpoints JSON](../../evidence/A-FR02/full-runs/20261016T-clock-A-FR02-midpoints.json). Mật khẩu/token đã che; timestamp UTC và monotonic ghi trong file.
