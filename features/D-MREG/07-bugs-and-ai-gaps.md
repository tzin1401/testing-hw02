# D-MREG — Báo cáo bug, issue draft và AI/execution gaps

**SUT baseline:** `85af3ba875c88283615e22cb108f13e2fccaf0e9`
**Run:** `20261015T1303Z-DMREG` — chi tiết thực thi tại [`06-execution.md`](06-execution.md)
**Đối chiếu oracle:** FR-01 trong `eshop-sut/README.md`; endpoint `POST /api/register` trong `eshop-sut/api_specification.md`.
**Nguyên tắc:** chỉ báo bug có bằng chứng và expected từ tài liệu. Không suy ra lỗi Mobile UI từ API.

## Bug có bằng chứng: API tạo nhiều tài khoản cùng email

Đây là **một lỗi độc lập** được xác nhận trong run này. Không có thêm lỗi API/Mobile nào đủ bằng chứng để tách thành bug khác. Các ca Mobile chưa thực hiện vẫn Blocked, không được gộp vào lỗi này.

- **Title đề xuất:** `[BUG][API] Đăng ký tạo tài khoản mới dù email đã tồn tại`
- **Requirement:** D-R04 — FR-01 yêu cầu email là duy nhất trong hệ thống.
- **TC / nguồn phát hiện:** API-only supplemental check liên quan D-R04; không phải kết quả Mobile của D-DT-006. Không gán một TC UI là Fail.
- **Expected có căn cứ:** Sau khi email đã được dùng để tạo tài khoản, lần đăng ký tiếp theo không được tạo thêm tài khoản cùng email. FR-01 không nêu HTTP status hoặc câu chữ response lỗi cụ thể; API specification chỉ mô tả response thành công.
- **Môi trường và phạm vi:** baseline `85af3ba875c88283615e22cb108f13e2fccaf0e9`; Linux host; backend `server.js` byte-match baseline, chạy trên bản sao test cô lập `/tmp/hw02-dmreg-isolated-run`; database của bản sao, không phải DB trong repo. Đây là kiểm tra API tuần tự, không phải thử race condition.
- **Severity / Priority đề xuất:** `major / P1`. Lý do: vi phạm trực tiếp tính duy nhất của email—định danh tài khoản theo FR-01—và tạo các bản ghi có cùng email, có thể gây nhập nhằng khi đăng nhập/tìm user. Bằng chứng chỉ dùng DB test cô lập; chưa có ảnh hưởng dữ liệu người dùng thật được ghi nhận.
- **Labels đề xuất:** `type: bug`, `severity: major`, `priority: P1`, `status: new`, `module: api` (đối chiếu tên label hiện có của repo trước khi đăng).

### Body đề xuất cho GitHub Issue

```markdown
## Mô tả
`POST /api/register` tạo thêm tài khoản khi email đó đã được đăng ký trước, trái với yêu cầu email duy nhất tại FR-01.

## Môi trường
- SUT baseline: `85af3ba875c88283615e22cb108f13e2fccaf0e9`
- Backend source: `server.js` khớp baseline; chạy trong bản sao test cô lập trên Linux.
- Endpoint: `POST http://127.0.0.1:3000/api/register`
- Database: DB của bản sao test, không phải database làm việc của SUT.
- Run ID: `20261015T1303Z-DMREG`

## Bước tái hiện
1. Dùng email test mới `vinh.dmreg.api-fixture01@example.com`; xác minh count ban đầu bằng truy vấn chỉ đọc là 0.
2. Gửi `POST /api/register` với họ tên test, email này và mật khẩu hợp lệ (mật khẩu đã được che trong evidence).
3. Xác minh request đầu tạo một tài khoản: HTTP 200, ID 3, count là 1.
4. Gửi lại cùng request với chính email đó.
5. Đọc count bằng truy vấn chỉ đọc.

## Kết quả mong đợi
Request thứ hai không tạo tài khoản khác cho email đã tồn tại theo FR-01. FR-01/API specification không quy định HTTP status hoặc body lỗi cụ thể, nên issue không yêu cầu một status/message riêng.

## Kết quả thực tế
Request thứ hai cũng trả HTTP 200 với `User registered successfully`, ID 4; count email tăng từ 1 lên 2. Tổng count quan sát: 0 → 1 → 2.

## Test và phạm vi
- Requirement: D-R04 / FR-01.
- Phát hiện: API-only supplemental check trong run `20261015T1303Z-DMREG`.
- Mobile `D-DT-006` vẫn Blocked vì chưa mở được màn hình Register; kết quả API không đại tính cho UI.
- Hai POST tuần tự; chưa kiểm thử race condition.

## Severity / Priority đề xuất
Major / P1, vì vi phạm ràng buộc duy nhất của email và tạo định danh tài khoản trùng. Chỉ tái hiện trên DB test cô lập; chưa có dữ liệu người dùng thật bị ảnh hưởng.

## Evidence đính kèm
- `evidence/D-MREG/full-runs/20261015T1303Z-DMREG/api-registration-duplicate-isolated.json` — request/response đã che password, timestamp UTC/monotonic và count DB trước/sau.
- Ảnh UI: không có ảnh phù hợp cho API-only lỗi này. Không đính kèm ảnh emulator đang Blocked vì ảnh đó không chứng minh API response. Nếu quy trình nhóm bắt buộc có ảnh, cần chụp ảnh terminal/API client thật hiển thị hai response và che thông tin nhạy cảm; không tạo ảnh minh họa giả.
```

**Trạng thái issue:** chỉ chuẩn bị draft, chưa đăng theo yêu cầu. Evidence chính hiện là JSON request/response, không phải screenshot.

## AI / execution gaps có bằng chứng

- **Blocker điều khiển Mobile UI:** run evidence có ảnh trước/sau thao tác và log ghi ADB/emulator kết nối, nhưng tap vào header “Đăng nhập” không mở Login; Register không được mở. Vì vậy các ca UI chưa chạy. Đây là giới hạn điều khiển trong run, chưa đủ căn cứ kết luận SUT có lỗi điều hướng.
- **Backend ban đầu không chạy:** log run ghi port 3000 từ chối kết nối tại `2026-10-15T13:04:41Z`. Để tránh restart backend có thể làm mất state, lượt chạy dùng bản sao cô lập và kiểm tra source hash. Đây là giới hạn môi trường đã được xử lý, không phải lỗi chức năng.
- **Không có AI content gap được xác nhận:** evidence hiện có không chỉ ra AI đã bịa expected, bỏ sót lỗi đã quan sát, hoặc báo sai trạng thái UI. Chỉ ghi nhận giới hạn thao tác UI nêu trên; không suy diễn thành AI gap nội dung.

## Chưa kết luận / không phải bug đã xác nhận

- Các ca `D-DT-001–013` và `D-BV-001–007` trên Mobile đều **Blocked**; chưa có actual UI để báo lỗi.
- Không kết luận form thiếu trường xác nhận vì chưa mở được Register. Không dùng mã nguồn thay evidence giao diện.
- Không kết luận API status/message lỗi, validation password API, xử lý network/retry, race condition, whitespace/trim hoặc navigation sau đăng ký; chưa có evidence phù hợp hoặc oracle cụ thể.
- Lỗi `TypeError: Network request failed` xuất hiện ở trang chi tiết sản phẩm khi backend cũ đã dừng, ngoài luồng đăng ký; không báo thành bug D-MREG.
