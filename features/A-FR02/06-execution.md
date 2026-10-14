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
