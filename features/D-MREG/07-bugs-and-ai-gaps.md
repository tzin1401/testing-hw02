# D-MREG — Bugs, issue draft và AI/execution gaps

**SUT baseline:** `85af3ba875c88283615e22cb108f13e2fccaf0e9`
**Run:** [`06-execution.md`](06-execution.md), `20261015T1303Z-DMREG`
**Nguyên tắc:** bug phải có evidence và expected từ SRS/API. Không suy ra Mobile UI từ API.

## Bug có bằng chứng — API chấp nhận email trùng

- **Title draft:** `[BUG][API] Đăng ký API tạo nhiều tài khoản cùng email`
- **Requirement / TC:** D-R04; API-only supplemental evidence. Mobile D-DT-006 vẫn **Blocked**, không phải Fail.
- **Nguồn expected:** FR-01 yêu cầu email phải duy nhất. Không đặt HTTP status/body cụ thể cho request trùng vì API spec không định nghĩa response lỗi.
- **Môi trường:** Android host Linux, Node backend chạy từ bản sao cô lập `/tmp/hw02-dmreg-isolated-run`, source `server.js` byte-match SUT baseline; database là DB của bản sao, không phải database trong repo SUT.
- **Steps:**
  1. Đọc count email `vinh.dmreg.api-fixture01@example.com` bằng SQLite read-only; count ban đầu là 0.
  2. Gửi `POST /api/register` với name test, email trên và một password giả đã che; response là HTTP 200, `id=3`; count thành 1.
  3. Gửi lại cùng email bằng request POST thứ hai; response là HTTP 200, `id=4`; count thành 2.
- **Expected:** email đã có account thì không tạo account thứ hai. SRS không yêu cầu status/body cụ thể.
- **Actual:** endpoint trả success cho cả hai POST; DB test có hai account cùng email.
- **Severity / Priority draft:** `major / P1`: uniqueness là yêu cầu định danh account; duplicate có thể gây nhập nhằng khi đăng nhập/tìm user. Chỉ phát sinh trên test DB cô lập; chưa có dữ liệu người dùng bị ảnh hưởng.
- **Labels đề xuất:** `type: bug`, `severity: major`, `priority: P1`, `status: new`, `module: api` (dùng đúng tên label trong repo nếu khác).
- **Evidence:** [`api-registration-duplicate-isolated.json`](../../evidence/D-MREG/full-runs/20261015T1303Z-DMREG/api-registration-duplicate-isolated.json), gồm redacted request/response, UTC/monotonic timestamps và DB count 0→1→2. Không có screenshot Mobile/API thích hợp; **chưa đăng issue** theo yêu cầu chờ ảnh khi thiếu ảnh.

### Body đề xuất cho issue

```markdown
## Mô tả lỗi
`POST /api/register` tạo thêm một tài khoản khi email đã tồn tại, trái với FR-01 yêu cầu email duy nhất.

## Môi trường
SUT baseline 85af3ba875c88283615e22cb108f13e2fccaf0e9; backend source khớp baseline, chạy trong bản sao test cô lập; Linux; API `http://127.0.0.1:3000/api/register`. Không dùng DB thật của repo.

## Steps to reproduce
1. Xác minh email test chưa tồn tại (count 0).
2. POST `/api/register` với dữ liệu test hợp lệ và email `vinh.dmreg.api-fixture01@example.com`.
3. Gửi lại POST với chính email đó.
4. Đọc count email trong DB test ở chế độ chỉ đọc.

## Expected result
Không tạo account thứ hai cho một email đã có theo FR-01. Không quy định HTTP status/body lỗi.

## Actual result
Cả hai POST trả HTTP 200 và `User registered successfully`; lần lượt tạo ID 3 và ID 4. Count email tăng 0 → 1 → 2.

## Test / phạm vi
D-R04, API-only supplemental run. Mobile D-DT-006 chưa chạy và vẫn Blocked; không suy rộng API result thành UI result.

## Severity / Priority
Major / P1: email là định danh tài khoản; bản ghi trùng gây nhập nhằng trong đăng nhập/tìm tài khoản. Reproduction dùng DB bản sao test.

## Evidence
Đính kèm `api-registration-duplicate-isolated.json` (request/response đã che password, timestamp và state count trước/sau). Chưa có screenshot Mobile.
```

## AI / execution gaps có evidence

- **Không tiếp cận được Register bằng điều khiển ADB:** emulator và ADB kết nối; UI tree có node `Đăng nhập`, nhưng các lần tap không mở Login. Một tap vào nút sản phẩm mở trang chi tiết, chứng minh một phần touch automation hoạt động; trang chi tiết sau đó báo `TypeError: Network request failed` khi backend cũ đã dừng. Các ảnh điều hướng nằm trong run directory. Đây là blocker của execution/tooling, chưa đủ căn cứ để gọi là bug SUT.
- **Backend cũ đã dừng:** cổng 3000 từ chối kết nối tại 13:04:41Z. Không restart backend có thể reset dữ liệu. Đã dùng bản sao cô lập được tạo từ test clone và xác minh hash source giống baseline. Đây là giới hạn môi trường được xử lý an toàn, không phải AI-generated false result.
- **Không phát hiện AI gap nội dung có bằng chứng** trong expected/case design từ lượt chạy này. Không có test Mobile nào hoàn tất để đánh giá độ chính xác của kết quả UI.

## Chưa kết luận / không phải bug đã xác nhận

- Không kết luận form thiếu confirmation field vì Register chưa mở được trên thiết bị; mã nguồn không được dùng thay bằng chứng UI.
- Không kết luận API error wording/status, password API validation, network retry hay hành vi giữ form khi lỗi vì oracle hoặc checkpoint chưa đủ.
- Không tạo issue cho checkpoint UI blocked hoặc lỗi chi tiết API request ban đầu khi backend tắt.

**Issue chưa đăng.** API duplicate draft có request/response evidence nhưng chưa có ảnh; chờ quyết định/ảnh theo quy trình nhóm trước khi đăng.
