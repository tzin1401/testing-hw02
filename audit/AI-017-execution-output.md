# AI-017 — Snapshot output thực thi A-FR02

Lượt thực thi tạo/cập nhật các file dưới đây. Nội dung được giữ toàn văn để audit; JSONL và ảnh gốc nằm ở thư mục evidence đã dẫn trong execution log.

## `features/A-FR02/06-execution.md`

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
| A-BV-006 | 29.0598–29.0711s, probe bị 403; khóa đã phát sinh sớm ở lần sai thứ hai | Blocked cho luồng ngưỡng chuẩn; diagnostic bị chặn trước 30s |
| A-BV-007 | Không có clock/harness điều khiển tại điểm server so sánh đúng 30.000s | Not run |
| A-BV-008 | 31.0707–31.0814s, probe vẫn 403; locked_until cho thấy khoảng khóa runtime 180s | Fail — A-R06 (kèm setup threshold fail) |
| A-BV-009 | 10.0610–10.0706s, probe 403; khóa phát sinh sớm | Blocked cho luồng ngưỡng chuẩn; diagnostic bị chặn trong khóa |
| A-BV-010 | 40.0876–40.0969s, probe vẫn 403; khóa phát sinh sớm và còn hiệu lực | Fail — A-R06 (kèm setup threshold fail) |
| A-BV-011 | Không có clock/harness 1ms tại điểm server so sánh | Not run |
| A-BV-012 | Không có clock/harness 1ms tại điểm server so sánh | Not run |

“Pass” ở hàng có ghi checkpoint nghĩa là chỉ checkpoint expected đã nêu được chứng minh; phần oracle đang mở không được suy ra. Với các ca trạng thái/timing, bảng ghi Fail/Blocked ở cả setup lẫn phần phụ thuộc khi cần, không coi lỗi setup là bằng chứng cho mọi checkpoint.

## Tài khoản và dữ liệu test

Run 003/004 đã tạo 46 tài khoản test mới với tiền tố email `a-fr02-`; tài khoản user ID 3 từ Run 002 cũng còn trong SQLite local. Không xóa tài khoản hoặc database. Tài khoản test được ghi trong các JSONL. Backend vẫn chạy; không restart.


## `features/A-FR02/07-bugs-and-ai-gaps.md`

# A-FR02 — Bug report và AI gaps

**Baseline/runtime SUT:** `85af3ba875c88283615e22cb108f13e2fccaf0e9`. Findings bên dưới được tái hiện bằng API và/hoặc Web trong Run 003/004. Chưa đăng GitHub Issue. Các issue yêu cầu ảnh UI; hiện có log JSONL và screenshot UI, nhưng bằng chứng hình ảnh chưa hiển thị đầy đủ request/state counter, nên draft chờ chọn/chụp ảnh phù hợp.

## Bug xác nhận

### A-BUG-001 — Mỗi lần đăng nhập sai tăng counter thêm 2 và khóa từ lần sai thứ hai

- **Requirement:** A-R04 yêu cầu mỗi lần sai tăng đúng 1; A-R05 yêu cầu khóa từ lần sai thứ ba.
- **TC:** A-DT-002, A-DT-011, A-DT-014, A-DT-020; A-BV-002, A-BV-003, A-BV-004, A-BV-005.
- **Môi trường:** API `localhost:3000`, Web `localhost:5173`, Ubuntu 26.04.1, Chrome 154.0.8037.57; baseline/runtime commit như trên.
- **Tiền điều kiện/dữ liệu:** Tài khoản mới cho từng chuỗi, state đầu `login_attempts=0`, chưa khóa; email test riêng; password sai `Wrong123!` (đã che trong log).
- **Bước tái hiện:** đăng ký user test mới → gửi POST `/api/login` sai password một lần → đọc state bằng SQLite read-only → gửi lần sai thứ hai → đọc state/response.
- **Expected:** sau lần 1 counter=1, chưa khóa; sau lần 2 counter=2, chưa khóa; lần sai thứ 3 mới kích hoạt khóa.
- **Actual:** sau lần 1 counter=2, chưa khóa; sau lần 2 counter=4 và `locked_until` đã được đặt; request thứ 3 trả 403 do đang khóa. Các chuỗi độc lập lặp lại kết quả; UI cũng từ chối sau sớm.
- **Bằng chứng:** Run 003 `execution.jsonl` cho A-BV-002/003/004/005 và A-DT-011/014; Run 004 UI JSONL/screenshots cho A-DT-002/011/014/020.
- **Severity đề nghị:** Major — người dùng bị khóa sớm hơn đặc tả và chỉ có thể thử sai một lần thay vì hai trước ngưỡng.
- **Issue:** Chưa đăng. Cần ảnh/ảnh ghép thể hiện lần gửi và counter/locked state; không chỉ ảnh giao diện thông báo chung.

### A-BUG-002 — Tài khoản vẫn bị khóa sau hơn 30 giây

- **Requirement:** A-R06 yêu cầu khóa tạm thời 30 giây.
- **TC:** A-DT-013, A-DT-021, A-DT-022; A-BV-008, A-BV-010. A-BV-006/009 là đối chứng trước 30 giây.
- **Tiền điều kiện/dữ liệu:** Tài khoản riêng; hai lần password sai tạo khóa runtime; probe password đúng (hoặc sai ở DT-022) được gửi sau khoảng đo bảo thủ >30s, không có request khác trong ca ngoài DT-021 đã nêu.
- **Expected:** sau hơn 30 giây, khóa hết; password đúng được xét đăng nhập. Password sai vẫn phải bị từ chối vì thông tin sai, nhưng không còn bị từ chối do khóa cũ.
- **Actual:** probes toàn phần ở khoảng 31.0707–31.0814s và 40.0726–40.0969s vẫn trả HTTP 403/lỗi đang khóa. State có `locked_until` xấp xỉ ba phút sau thời điểm kích hoạt quan sát được. A-DT-021 probe ở 10s không đổi `locked_until`; probe khoảng 40s vẫn 403.
- **Bằng chứng:** Run 003 JSONL và [timing analysis](timing-analysis.md); UI timing observations ở Run 004 cũng trả 403 sau >40s.
- **Severity đề nghị:** Major — đúng credentials vẫn bị từ chối lâu hơn thời gian khóa đã công bố.
- **Issue:** Chưa đăng; cần ảnh/log ghép timestamp, HTTP response và mốc khóa cho review.

### A-BUG-003 — Trường email Login Web không dùng HTML `type="email"`

- **Requirement:** A-R10.
- **TC:** A-DT-004, A-DT-020.
- **Dữ liệu:** `not-an-email` cùng password hợp lệ/test.
- **Thao tác:** mở `/login`, nhập email sai format, submit một lần; quan sát validity/Network.
- **Expected:** input email có `type=email`; browser HTML5 chặn submit và không gửi POST `/api/login`.
- **Actual:** input là `type=text`; `checkValidity()` chấp nhận format đó và browser gửi POST login, nhận 401.
- **Bằng chứng:** Run 004 JSONL, screenshot A-DT-004 và các observation/request A-DT-020. Ảnh sau khi dọn ô nhập không tự nó chứng minh giá trị nhập; cần thêm ảnh rõ input/Network trước khi đăng issue.
- **Severity đề nghị:** Minor — validation định dạng email bắt buộc của form bị thiếu; API vẫn từ chối tài khoản không tồn tại.
- **Issue:** Chưa đăng; chờ screenshot thể hiện giá trị sai định dạng và request phát sinh.

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


## `features/A-FR02/timing-analysis.md`

# A-FR02 — Đối chiếu timestamp cho các ca thời gian

**Nguồn:** Run 003 API và Run 004 UI; SUT baseline/runtime `85af3ba875c88283615e22cb108f13e2fccaf0e9`. Thời gian trong bảng là monotonic phía client/browser. Không có log tại đúng điểm server so sánh `locked_until`.

Với một request kích hoạt khóa, gọi `s` là lúc gửi và `r` là lúc nhận response. Thời điểm kích hoạt server nằm trong khoảng này. Với probe có thời điểm gửi/nhận `p_s`, `p_r`, khoảng elapsed bảo thủ là `[p_s-r, p_r-s]`. Nếu cận trên <30s thì toàn request ở trước 30s; nếu cận dưới >30s thì toàn request ở sau 30s. Khoảng này xác định phía của mốc, không khẳng định request được xử lý đúng tại số mục tiêu danh nghĩa.

## API — Run 003

| TC | Probe | Khoảng elapsed (giây) | HTTP | Phân loại |
|---|---|---:|---:|---|
| A-DT-012 | đúng, mục tiêu 10s | [10.0344, 10.0458] | 403 | Toàn request trước 30s |
| A-DT-013 | đúng, mục tiêu 40s | [40.0787, 40.0881] | 403 | Toàn request sau 30s |
| A-BV-006 | đúng, mục tiêu 29s | [29.0598, 29.0711] | 403 | Toàn request trước 30s |
| A-BV-008 | đúng, mục tiêu 31s | [31.0707, 31.0814] | 403 | Toàn request sau 30s |
| A-BV-009 | đúng, mục tiêu 10s | [10.0610, 10.0706] | 403 | Toàn request trước 30s |
| A-BV-010 | đúng, mục tiêu 40s | [40.0876, 40.0969] | 403 | Toàn request sau 30s |
| A-DT-021 | đúng, mục tiêu 10s | [10.0541, 10.0661] | 403 | Toàn request trước 30s |
| A-DT-021 | đúng, mục tiêu 40s | [40.1490, 40.1576] | 403 | Toàn request sau 30s |
| A-DT-022 | sai, mục tiêu 40s | [40.0726, 40.0822] | 403 | Toàn request sau 30s |

Mỗi chuỗi khóa bắt đầu từ tài khoản mới. Tuy nhiên backend khóa sau lần sai thứ hai, không phải thứ ba. Các ca này vì vậy là chẩn đoán thời gian từ mốc khóa quan sát được; không chứng minh tiền điều kiện “đã sai đúng ba lần”. Việc probe sau 31/40 giây vẫn nhận 403 cùng `locked_until` khoảng ba phút sau lúc kích hoạt cho thấy hành vi thời lượng không khớp 30 giây.

## UI — Run 004

Browser log giữ các request/response theo thứ tự và monotonic timestamp. Khi ghép response, bỏ OPTIONS preflight HTTP 204; login POST thật trả 401/403. Kết quả ghép từ log như sau:

| TC | Probe | Khoảng elapsed (giây) | HTTP | Phân loại |
|---|---|---:|---:|---|
| A-DT-012 | đúng, gần 10s | [11.4230, 11.4290] | 403 | Toàn request trước 30s |
| A-DT-013 | đúng, gần 40s | [41.4140, 41.4246] | 403 | Toàn request sau 30s |
| A-DT-021 | đúng, gần 10s | [11.4335, 11.4407] | 403 | Toàn request trước 30s |
| A-DT-021 | đúng, gần 40s | [42.8516, 42.8602] | 403 | Toàn request sau 30s |
| A-DT-022 | sai, gần 40s | [41.4359, 41.4427] | 403 | Toàn request sau 30s |

Các khoảng bắt đầu từ lúc nhận response của request sai thứ hai và dùng request/response của probe trong cùng email test. Khoảng 10 giây thực tế dài hơn mục tiêu do thao tác automation và tải trang; vẫn nằm hẳn trước 30 giây. Browser timestamp cũng là client-side, không thay thế clock tại điểm so sánh trên server.

## Chưa đo được

A-BV-007 (đúng 30.000s), A-BV-011 (29.999s) và A-BV-012 (30.001s) chưa chạy. Môi trường không có clock/harness điều khiển tại điểm server so sánh; `sleep` phía client không chứng minh mốc chính xác. Không có Pass/Fail cho ba ca này.


## `reports/work-progress.md`

# Tiến độ HW02 — Nguyễn Lê Thế Vinh — 23120190

**Vai trò nhóm:** Thành viên 2. **Cập nhật:** 15/10/2026 (UTC+07:00).

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
| A-FR02 — Đăng nhập/khóa Web | Requirements A-R01–A-R11 (AI-007) | Các EC đã ghi (AI-008) | 24 ca thiết kế (AI-009) | 12 ca thiết kế (AI-010) | Sinh viên nói đã đọc/hiểu (AI-011); chưa xác nhận phê duyệt thiết kế | Run 001 user-reported; Run 003 API và Run 004 UI; 33/36 TC có actual/checkpoint, 3 mốc clock Not run; xem 06-execution | 3 bug draft có bằng chứng; 2 AI gaps trong harness được ghi ở 07 (AI-017) |
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
- [x] Thực thi ca API/Web có thể chạy, ghi Run 003/004 cùng các trạng thái và giới hạn (AI-017).
- [ ] Tạo harness đồng hồ tại server hoặc giữ A-BV-007/011/012 là Not run với lý do.

Phản hồi “đã hiểu” không được coi là phê duyệt tính đúng đắn của toàn bộ thiết kế hoặc xác nhận đã chạy test.

## Thực thi A-FR02

- [x] Giữ Run 001 theo lời người chạy; không dùng thay bằng chứng mới.
- [x] Run 004 có screenshot UI, login response, token local và request Bearer 200 cho A-DT-001.
- [x] Ghi status/actual/evidence cho cả 24 Domain và 12 BVA; giữ rõ observation-only, Fail/Blocked và 3 Not run trong 06-execution.md.
- [ ] Chụp/gom ảnh thể hiện rõ network/state counter để đính kèm các issue draft.

Phản hồi “mọi thứ đều pass” ở Run 001 vẫn được giữ như lời người chạy và tách khỏi các run có log tự động. Xem [execution log](../features/A-FR02/06-execution.md).

## Script hỗ trợ A-FR02

- [x] Tạo `scripts/A-FR02-login-sequence.py` và hướng dẫn `scripts/README-A-FR02.md`.
- [x] Script tuần tự trước đó đã tạo (AI-013); Run 002 `--attempts 2` lưu riêng.
- [x] Tạo và chạy `scripts/A-FR02-full-execution.mjs`; ghi request/response redacted, monotonic, state SQLite read-only và test labels.
- [x] API run 33 tài khoản; UI run 13 tài khoản trong Chrome headless profile cô lập; artifacts ở `evidence/A-FR02/full-runs/`.
- [ ] Giữ nguyên 46 tài khoản test trong DB local cho tới khi bằng chứng được lưu và chủ sở hữu yêu cầu cleanup.

Script tạo tài khoản mới bằng API đăng ký cho mỗi lần chạy. Terminal output không lưu password/token; state DB đọc-only là quan sát bổ trợ. Đo monotonic là ở client và không chứng minh thời điểm server so sánh đúng 30 giây.

## Việc tiếp theo

A-FR02 đã có execution table; bước còn lại là review bug drafts, chuẩn bị ảnh network/state phù hợp nếu đăng issue, và quyết định có dựng harness clock riêng cho ba mốc chưa chạy hay để Not run. Không xóa 46 tài khoản test hoặc restart backend khi chưa cần và chưa bảo toàn bằng chứng.
