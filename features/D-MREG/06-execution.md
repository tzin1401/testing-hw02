# D-MREG — Nhật ký thực thi Domain và BVA

**SUT baseline:** `85af3ba875c88283615e22cb108f13e2fccaf0e9`
**Run Mobile:** `20261015T153620Z-57c022`, Android Emulator Pixel 9 / Android 15 / API 35 / x86_64, Expo Go SDK 54. Bằng chứng trong `evidence/D-MREG/supplement-runs/20261015T153620Z-57c022/`.
**Run API phụ trợ:** `20261015T1303Z-DMREG`, chạy trên bản sao DB cô lập vì backend ban đầu không có listener; không restart backend cũ, không dùng API thay cho Mobile UI.

## Điểm giới hạn chung

Form Mobile quan sát được chỉ có ba trường: Họ tên, Email, Mật khẩu; thiếu trường Xác nhận mật khẩu theo D-R07. Vì thế các ca được thiết kế với đủ bốn trường không thể hoàn thành đúng setup. Bảng “ca thiết kế” ghi verdict cho toàn ca; kết quả thao tác trên ba trường hiện có ghi riêng là **probe biến thể**, không được tính Pass/Fail cho full test case.

## Trạng thái 20 ca thiết kế

| TC | Trạng thái full TC | Lý do / bằng chứng |
|---|---|---|
| D-DT-001 | Fail | Form chỉ có 3 trường; thiếu xác nhận mật khẩu. `D-DT-001` presence record và `D-DT-001-register-form.png`. |
| D-DT-002–D-DT-011 | Partial / setup không đạt | Có submit các biến thể 3 trường và ghi kết quả riêng bên dưới; không thể nhập confirmation nên không hoàn tất ca thiết kế. |
| D-DT-012–D-DT-013 | Blocked | Ca phụ thuộc trường xác nhận không tồn tại. |
| D-BV-001–D-BV-005 | Partial / setup không đạt | Password được thử qua Mobile UI nhưng confirmation field thiếu. D-BV-002 còn gặp network request failed. Chi tiết bên dưới. |
| D-BV-006–D-BV-007 | Not run | Không có lượt submit hợp lệ đủ để đánh giá hai ca này. Các lượt tự động hóa bổ sung ngày 16/10 đều bị dừng trước submit do nhập sai/lệch trường; một lượt chụp màn hình trước submit rồi thoát Expo Go về Home. Không dùng các ảnh đó để kết luận chức năng. |

Không cộng 15 partial thành 15 TC hoàn tất; không có Pass/Fail đầy đủ cho 19 ca phụ thuộc form 4 trường.

## Kết quả probe biến thể trên ba trường hiện có

| Probe liên quan | Input chính (password luôn được che trong log) | Actual UI và state | Đánh giá |
|---|---|---|---|
| D-DT-002 | Tên hợp lệ, email mới, password dài 8; confirmation absent | Alert đăng ký thành công, DB test count 0→1, chuyển về Login. | Biến thể 3 trường thành công; không phải Pass full TC D-DT-002. |
| D-DT-003 | Họ tên rỗng; email mới; password dài 8 | Alert thành công, count 0→1, chuyển Login. | Finding D-R01: validation tên bắt buộc không quan sát được. |
| D-DT-004 | Email rỗng; tên/password hợp lệ | Alert thành công, count 0→1, chuyển Login. | Finding D-R02: email rỗng được chấp nhận. |
| D-DT-005 | Email `bad-20261015t153620z-57c022` (không có `@`) | Alert thành công, count 0→1, chuyển Login. | Finding D-R03: đại diện sai format được chấp nhận. |
| D-DT-006 | Email đã tạo ở biến thể D-DT-002 | Alert thành công, count 1→2. | Finding D-R04 trên Mobile UI; cùng loại uniqueness issue API-only D-MREG run. |
| D-DT-007–011 | Password rỗng, thiếu hoa, thiếu thường, thiếu số, thiếu ký tự thuộc tập tương ứng | Form hiện lỗi password; count email 0→0. | Probe cho quy tắc password hiện có; do confirmation absent, không tính Pass full TC. |
| D-BV-001 | Password length 7 | Lỗi password hiện; count 0→0. | Đúng hướng rejection quan sát được; ca full TC còn confirmation absent. |
| D-BV-002 | Password length 8 | Hiện “Network request failed”; count 0→0. | Không kết luận độ dài tại biên; network failure chặn oracle. |
| D-BV-003 | Password length 9 | Alert thành công; count 0→1; chuyển Login. | Biến thể 3 trường thành công; chưa phải Pass full TC. |
| D-BV-004–005 | Thiếu hoa / thiếu thường, length 8 trong event | Form hiện lỗi password; count 0→0. | Probe robustness; không tính Pass full TC. |

`events.jsonl` là nguồn timestamp/state; các ảnh trước/phản hồi/điều hướng tương ứng nằm cùng thư mục run. Mỗi password chỉ ghi `[REDACTED]` và độ dài, không ghi giá trị.

## Kết quả API-only bổ trợ uniqueness

Trên bản sao cô lập `/tmp/hw02-dmreg-isolated-run`, hai POST tuần tự cùng email trả HTTP 200, lần lượt tạo ID 3 và 4, count 0→1→2. `server.js` khớp hash với baseline; database thuộc bản sao, không phải DB SUT. Evidence: `evidence/D-MREG/full-runs/20261015T1303Z-DMREG/api-registration-duplicate-isolated.json`. Đây là lỗi API D-R04; nó không đại diện cho Mobile UI. Run bổ sung Mobile D-DT-006 sau đó cũng ghi biến thể UI tạo trùng, như ở bảng trên.

## Requirement-level findings

- D-R01, D-R02, D-R03: probe Mobile cho thấy họ tên rỗng, email rỗng và email không có `@` đều được chấp nhận trên form ba trường; ba TC full setup chưa hoàn thành vì confirm thiếu.
- D-R04: API-only duplicate được xác nhận; biến thể UI cũng tạo bản ghi thứ hai. Không thử race condition.
- D-R05/D-R06: password policies có các probe bị từ chối/được chấp nhận; không chấm Pass cho full registration flow vì thiếu confirmation. Password length 8 có network failure.
- D-R07: Fail về sự hiện diện trường confirmation (D-DT-001); khớp/mismatch/rỗng không thể thử.
- D-R08/D-R09: có bằng chứng success alert, DB count và điều hướng trong biến thể 3 trường, nhưng không coi là Pass cho ca có bốn trường.

## AI/execution gap và giới hạn

Run đầu `20261015T1303Z-DMREG` bị chặn khi tap header, sau đó run bổ sung mở được Register qua Login và liên kết đăng ký. Giới hạn ban đầu được khắc phục. Không dùng kết quả “Blocked” của run đầu để phủ nhận evidence run sau.

Không có evidence cho D-BV-006/007 trong run; không dùng ảnh từ ca Domain tương tự thay thế. Chưa xác minh xử lý mạng lỗi, trim, Unicode, giới hạn chiều dài, câu chữ expected, hay race email. Account test được tạo trong DB clone; không xóa DB/account test. Không restart backend SUT.

## Lượt automation không hợp lệ ngày 16/10/2026

Các lượt sau được giữ lại để minh bạch về lỗi công cụ nhưng không tính vào 20 TC hoặc probe có kết quả:

- `20261016T003700Z-DMREG-BV67`: hai process chạy chồng; trường tên bị nhập thành `Nguyen` thay vì giá trị dự kiến và dữ liệu trường bị lệch. Không dùng kết quả hiển thị để chấm ca.
- `20261015T174041Z-DMREG-BV67-clean`, `20261015T174117Z-DMREG-BV67-clean`, `20261015T174221Z-DMREG-BV67-clean`: xác minh trường đầu vào thất bại trước khi submit; không tạo account theo các lượt này.
- `20261015T174259Z-D-MREG-manual-probe`: ảnh trước submit xác nhận tên `V`, email riêng và password được che; thao tác tiếp theo rời Expo Go về màn hình Home, không lưu được response UI đáng tin cậy. DB clone được truy vấn chỉ đọc và không thấy account email fixture (`0`), nhưng không có checkpoint response của app nên không kết luận rejection.

Đây là lỗi thao tác/điều khiển của AI, không phải lỗi SUT. D-BV-006/007 vẫn **Not run**. Cần mở lại app, làm từng trường và xác nhận response trên app trước khi gọi lượt mới là test.


## GitHub Issues đã đăng/cập nhật

- [Issue #8](https://github.com/tzin1401/testing-hw02/issues/8): API duplicate email; cập nhật mô tả Mobile variant có giới hạn và đính kèm ảnh trích từ API run log.
- [Issue #13](https://github.com/tzin1401/testing-hw02/issues/13): form thiếu trường confirmation; ảnh form UI đã đính kèm.
- [Issue #14](https://github.com/tzin1401/testing-hw02/issues/14): ba probe name/email invalid được gộp trong cùng nhóm validation; ảnh before/response riêng cho từng probe đã đính kèm. Full TC bốn trường vẫn Partial/Fail/Blocked như bảng trên, không đổi verdict do issue được tạo.

Issue #8 ảnh là bản trình bày từ JSON API log, không phải screenshot Mobile UI. Mobile variant vẫn là observation bổ sung, không thay thế full D-DT-006.


## Run 20261016 — emulator navigation retry

Pixel 9 / Android 15 API 35 / Expo Go SDK 54 successfully opened the baseline Mobile app from a temporary clone. The product list loaded. “Đăng nhập” is drawn under/overlapped by Android status-bar icons; repeated ADB taps in its visible area did not open Login, while a tap on the product detail control did navigate. Therefore this attempt did not reach Register or submit a Mobile test. It is a tooling/UI navigation blocker, not a pass/fail for registration requirements. D-BV-006/007 remain Not run; D-DT cases requiring Register remain Blocked/Partial as already recorded. Diagnostic screenshot and note: `evidence/D-MREG/supplement-runs/20261016T-emulator-navigation-blocked/`. Backend was the isolated clone; no SUT DB or logic was modified.
