# D-MREG — Execution log

**Run ID:** `20261015T1303Z-DMREG`
**SUT baseline:** `85af3ba875c88283615e22cb108f13e2fccaf0e9`
**Phạm vi chạy:** Mobile UI theo từng ca; API chỉ là bằng chứng phụ trợ, không thay thế UI.

## Môi trường và kiểm tra trước chạy

- Android Emulator đang chạy: AVD Pixel 9, Android 15, API 35, x86_64; `emulator-5554`. Expo Go hiển thị SDK 54. Ảnh khởi đầu và thao tác UI nằm tại `evidence/D-MREG/full-runs/20261015T1303Z-DMREG/`.
- SUT gitlink ở commit baseline nêu trên. Working tree SUT đã có thay đổi từ trước: `backend/database.sqlite`, `frontend-mobile/App.js`, `backend/node_modules/`. Không sửa các mục này; `App.js` đặt API URL `http://10.0.2.2:3000/api`.
- Expo Go/Metro đã hoạt động trên cổng 8081. Backend PID cũ không còn chạy khi kiểm tra lại và cổng 3000 từ chối kết nối lúc 13:04:41Z. Không restart backend cũ vì có thể seed/reset state. Thay vào đó, tạo bản sao cô lập `/tmp/hw02-dmreg-isolated-run` từ `/tmp/hw02-mobile-backend-safe` và chạy server trên bản sao đó; source `server.js` khớp byte với SUT (`SHA-256 47573ce5a6bf9a894748d2bb56cc8d1659ad7acd033fdd6db6b3e4d9473eb487`). Server khởi tạo dữ liệu seed trong DB bản sao; DB của SUT và bản sao nguồn không bị khởi động lại.
- Host API `/api/products` ban đầu đã trả 5 sản phẩm. Sau đó backend tạm không còn listener; khi server bản sao được bật, cổng 3000 hoạt động lại. Chạm sản phẩm trong app khi listener vắng mặt mở màn chi tiết báo `TypeError: Network request failed`; không dùng quan sát này làm kết luận cho D-MREG.
- Có thể điều khiển emulator bằng ADB và chụp ảnh. Tuy nhiên, các lần tap vào header **Đăng nhập** không chuyển sang Login; thao tác tap vào vùng sản phẩm có phản hồi. Không vào được form Register nên không thể quan sát bốn trường hay thực hiện submit từ Mobile. Các screenshot/ADB dump chứng minh blocker, không chứng minh expected của form.
- Không restart backend hoặc Metro trong khi chạy API. Không sửa code SUT, không xóa dữ liệu. Backend API bản sao hiện chứa hai account test trùng email `vinh.dmreg.api-fixture01@example.com`, do phép kiểm tra API phụ trợ bên dưới; không có account test nào được tạo trong DB SUT.

## Kết quả API phụ trợ — không thay thế UI

Tại 13:04:41Z, hai POST thử tới backend đang tắt bị `Connection refused`, không làm thay đổi DB (`count=0`). Sau khi xác minh bản sao cô lập, gửi một POST hợp lệ làm fixture rồi gửi lại cùng email một lần nữa. Cả hai request là tới `POST /api/register`; response lần 1 HTTP 200, `id=3`, count 1; lần 2 HTTP 200, `id=4`, count 2. Request/response đã che password; count được truy vấn SQLite ở chế độ chỉ đọc.

- Evidence: [`api-registration-duplicate-isolated.json`](../../evidence/D-MREG/full-runs/20261015T1303Z-DMREG/api-registration-duplicate-isolated.json), [`api-registration-duplicate.json`](../../evidence/D-MREG/full-runs/20261015T1303Z-DMREG/api-registration-duplicate.json).
- API evidence xác nhận endpoint tạo hai account với cùng email, trái yêu cầu uniqueness D-R04. Đây là API-only observation/failure; không đánh dấu D-DT-006 Mobile là Fail và không suy ra app Mobile đã submit.
- API success fixture trả đúng response success đã mô tả trong API spec. Đây chỉ là kiểm tra contract API và tạo account fixture; không phải Pass cho đăng ký Mobile, password UI validation, confirm field hoặc navigation.

## Trạng thái từng ca

`Blocked` nghĩa là chưa thực hiện thao tác trên Register Mobile, do không thể mở được màn hình Login/Register từ emulator bằng điều khiển hiện có. Không ghi Pass/Fail cho checkpoint UI chưa có bằng chứng.

| TC | Trạng thái | Actual / lý do | Evidence |
|---|---|---|---|
| D-DT-001 | **Blocked** | App hiển thị Home; tap vào header Đăng nhập không mở Login. Chưa quan sát được form bốn trường. | `D-DT-001-no-register-screen.png` |
| D-DT-002 | **Blocked** | Chưa nhập/submit trên Mobile; không kiểm tra account/navigation UI. | cùng blocker UI; API fixture không thay thế ca này |
| D-DT-003 | **Blocked** | Chưa vào Register để nhập name rỗng. | cùng blocker UI |
| D-DT-004 | **Blocked** | Chưa vào Register để nhập email rỗng. | cùng blocker UI |
| D-DT-005 | **Blocked** | Chưa vào Register để nhập email sai format. | cùng blocker UI |
| D-DT-006 | **Blocked** | Chưa vào Register để thử duplicate trên Mobile. API duplicate đã chạy riêng, không đổi status UI. | API log chỉ là supplementary |
| D-DT-007 | **Blocked** | Chưa vào Register để nhập password rỗng. | cùng blocker UI |
| D-DT-008 | **Blocked** | Chưa vào Register để thử password thiếu hoa. | cùng blocker UI |
| D-DT-009 | **Blocked** | Chưa vào Register để thử password thiếu thường. | cùng blocker UI |
| D-DT-010 | **Blocked** | Chưa vào Register để thử password thiếu số. | cùng blocker UI |
| D-DT-011 | **Blocked** | Chưa vào Register để thử thiếu ký tự thuộc tập. | cùng blocker UI |
| D-DT-012 | **Blocked** | Chưa vào Register để nhập confirmation mismatch. | cùng blocker UI |
| D-DT-013 | **Blocked** | Chưa vào Register để để trống confirmation. | cùng blocker UI |
| D-BV-001 | **Blocked** | Chưa nhập password 7 ký tự trên Mobile. | cùng blocker UI |
| D-BV-002 | **Blocked** | Chưa nhập password 8 ký tự/submit trên Mobile. | cùng blocker UI |
| D-BV-003 | **Blocked** | Chưa nhập password 9 ký tự/submit trên Mobile. | cùng blocker UI |
| D-BV-004 | **Blocked** | Chưa thử robustness thiếu hoa trên Mobile. | cùng blocker UI |
| D-BV-005 | **Blocked** | Chưa thử robustness thiếu thường trên Mobile. | cùng blocker UI |
| D-BV-006 | **Blocked** | Chưa thử robustness thiếu số trên Mobile. | cùng blocker UI |
| D-BV-007 | **Blocked** | Chưa thử robustness thiếu ký tự tập trên Mobile. | cùng blocker UI |

## Trạng thái theo requirement

| Requirement | Mobile UI | API phụ trợ | Kết luận trong Run |
|---|---|---|---|
| D-R01 | **Blocked** — chưa tới form | — | Chưa kết luận |
| D-R02 | **Blocked** — chưa tới form | — | Chưa kết luận |
| D-R03 | **Blocked** — chưa tới form | — | Chưa kết luận |
| D-R04 | **Blocked** — chưa submit từ app | **Fail** — cùng email tạo hai bản ghi | API-only failure; UI vẫn cần chạy |
| D-R05 | **Blocked** — chưa tới form | — | Chưa kết luận |
| D-R06 | **Blocked** — chưa tới form | — | Chưa kết luận password UI rules |
| D-R07 | **Blocked** — chưa thấy confirmation field | — | Chưa kết luận; API spec không nhận confirmation field |
| D-R08 | **Blocked** — chưa submit từ app | **Pass** contract success cho request hợp lệ | API result không phải Pass Mobile |
| D-R09 | **Blocked** — không có success UI | — | Chưa kết luận navigation |

## Observation chưa đủ expected để phân loại

- Khi backend cũ không còn listener, trang chi tiết sản phẩm đã hiện `TypeError: Network request failed`. Đây là lỗi kết nối ngoài luồng đăng ký, xảy ra trước khi khởi động bản sao cô lập; không dùng nó làm Fail D-MREG.
- Chưa quan sát được Register nên không có actual về whitespace/trim, chi tiết grammar email, Unicode/password counting, thông báo lỗi, giữ form sau lỗi, hoặc điều hướng sau lỗi. Đây là các câu hỏi Q trong requirements/domains, không phải Pass/Fail.
- Email uniqueness race và network retry/submit lặp chưa được thử. API duplicate test là request tuần tự, không phải race test.

## Các thao tác Mobile còn cần thực hiện

Không cần chạy lệnh terminal. Trên emulator Pixel 9 đang mở app:

1. Chạm **Đăng nhập** ở góc trên bên phải. Ở Login, chạm liên kết đăng ký. Nếu thao tác bằng chuột không phản hồi, dùng chạm trực tiếp vào vùng chữ trên emulator. Với D-DT-001, chụp màn hình khi form Register mở và xác nhận có thể focus/nhập bốn trường. Nếu thiếu trường, lưu ảnh đó; đánh dấu các ca dùng field thiếu là Blocked, rồi tiếp tục ca không cần field đó.
2. Mỗi ca độc lập bắt đầu lại ở Register mới. Điền dữ liệu chính xác trong ca tương ứng của [03-domain-cases.md](03-domain-cases.md) hoặc [04-boundary-cases.md](04-boundary-cases.md); password là chuỗi test giả trong file, không phải mật khẩu cá nhân. Sau mỗi trường password, giữ nội dung ẩn. Ẩn bàn phím, chụp ảnh trước submit có tên TC ID, bấm **Đăng Ký** một lần, chụp ảnh phản hồi/điều hướng với cùng TC ID.
3. Trường hợp thành công dùng email riêng ghi trong TC và chụp màn Login sau submit. Ca lỗi không cần xóa account; không có account nên giữ dữ liệu như vậy. Không xóa fixture `api-fixture01` khỏi bản sao backend.
4. Lưu ảnh vào `evidence/D-MREG/` với tên đã nêu dưới từng ca. Gửi ảnh/log hoặc cho biết đường dẫn đã lưu để cập nhật actual/status. Đừng ghi password/token vào ảnh/log không che.

Danh sách case-by-case dữ liệu, tap/input, keyboard, submit, expected và TC ID đã có trong hai file thiết kế liên kết ở trên; không được gộp UI result với API log.

## Run metadata

- **Run start:** `2026-10-15T13:04:41Z` (API connectivity refusal); isolated API exercise: `2026-10-15T13:05:37Z` onward. UTC and monotonic values are in JSON evidence.
- **Device:** Android Emulator Pixel 9, Android 15/API 35, x86_64; emulator serial `emulator-5554`.
- **Expo:** Expo Go SDK 54; Metro port 8081.
- **Backend:** isolated copy on `127.0.0.1:3000`; source `server.js` matches baseline. Test DB `/tmp/hw02-dmreg-isolated-run/database.sqlite`.
- **Password/token redaction:** API JSON evidence stores `[REDACTED]`; no credentials included.

## Giới hạn

Không có ảnh Register, response do Mobile gửi, hoặc bằng chứng điều hướng Mobile. Vì vậy 20 checkpoint UI đều Blocked; không báo cáo các ca đó là Pass/Fail. API duplicate là failure có bằng chứng riêng và chỉ phản ánh endpoint. Không tự chấm các câu hỏi về error wording, network handling hay các oracle chưa chốt.
