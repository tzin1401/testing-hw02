# C-FR14 — Ca kiểm thử giá trị biên (BVA)

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2.
**Trạng thái:** Thiết kế BVA từ yêu cầu và slide; chưa chạy SUT, chưa ghi actual/status.

## 1. Căn cứ và cách chọn biên

- SRS `eshop-sut/README.md`, FR-14: tên danh mục **bắt buộc, không được để trống**. Miền có căn cứ là độ dài tên ở biên dưới: `LB = 1 ký tự`, `δ = 1 ký tự`; các điểm là `LB−δ = 0`, `LB = 1`, `LB+δ = 2`.
- Dùng ký tự ASCII cho các ca 1/2 ký tự để phép đếm độ dài rõ ràng. Expected chỉ dựa trên rỗng/không rỗng; không thêm yêu cầu về uniqueness, trim hoặc giới hạn độ dài.
- **Không có upper bound (UB) trong SRS/API specification.** Không đặt giá trị max hoặc tạo ca `UB−1/UB/UB+1`.
- ID danh mục là định danh, không có khoảng giá trị hoặc giới hạn min/max được nêu. Hai ca ID bên dưới là **state-boundary probes** cho tồn tại/không tồn tại, không phải BVA số học; không bịa ID cực đại. ID không tồn tại có expected xử lý chưa rõ.
- Unicode có dấu và whitespace-only là các probe Domain ở `03-domain-cases.md`, không phải điểm BVA theo thứ tự độ dài; không lặp lại như ca biên. Trạng thái danh sách rỗng/có dữ liệu và role/token cũng là các lớp Domain, không phải biên số.
- Slide Domain/BVA dùng điều kiện đặc tả để chọn điểm sát biên và đại diện; nếu nguồn không nêu giới hạn thì không tự tạo biên.

## 2. Quy ước chuẩn bị và bảo toàn dữ liệu

- Mỗi ca dùng phiên Admin Web có tài khoản role admin và JWT hợp lệ; token không chụp/ghi vào evidence. Đây là điều kiện quyền theo FR-12, không phải biến biên của các ca tên.
- Thay `<RunID>` bằng mã riêng lần chạy, ví dụ `R20261015-01`, để tên category test nhận diện được; hậu tố không kiểm tra uniqueness.
- Trước mỗi ca chụp/ghi danh sách hiện tại. Positive case chỉ tạo category test qua UI, ghi ID/name do hệ thống trả/hiển thị. Không sửa hoặc xóa category mẫu.
- Chỉ dọn category ID do chính ca tạo sau khi lưu bằng chứng; thao tác dọn ghi trong execution log. Không tự chạy trong tài liệu này.
- Ảnh lưu dự kiến tại `evidence/C-FR14/<TC-ID>/<Run-ID>/`; lưu ảnh input và list trước/sau. Với API probe, lưu request/response đã che token và snapshot GET.

## 3. Các ca BVA tên danh mục

### C-BV-001 — Biên dưới ngoài miền: tên 0 ký tự

- **Mục tiêu:** Kiểm tra ngay dưới lower bound bắt buộc.
- **Biên:** `LB=1`, `δ=1`, input length `0 = LB−δ`.
- **Loại:** Admin Web UI.
- **Role/tài khoản, setup:** Tài khoản test role admin đã đăng nhập; ghi snapshot danh sách category trước. Không dùng danh mục mẫu làm target. Không cần tạo category cho input rỗng; nếu cần fixture để so sánh, chỉ dùng một category test riêng do ca tạo trước và ghi ID.
- **Input:** ô tên để trống `""` (0 ký tự); không nhập ký tự khác.
- **C-EC / requirement / liên quan:** C-EC-01; C-R02/C-R05; liên quan C-DT-003.
- **Thao tác:** 1) Mở Admin → **Danh mục**. 2) Ghi/chụp danh sách trước. 3) Để ô tên hoàn toàn rỗng. 4) Bấm **Thêm mới** một lần. 5) Quan sát validation và danh sách sau, không điền tên khác trong cùng ca.
- **Expected:** Không có danh mục mới với tên rỗng, theo FR-14 “tên bắt buộc, không được để trống”. Cách báo lỗi/UI behavior cụ thể chưa quy định.
- **Quan sát/evidence:** ảnh ô input rỗng, thao tác submit nếu có thể, danh sách trước/sau; ghi số/ID của các dòng test. Không chấm wording/status HTTP.

### C-BV-002 — Lower bound: tên 1 ký tự

- **Mục tiêu:** Kiểm tra giá trị nhỏ nhất không rỗng.
- **Biên:** `LB=1`, input length `1 = LB`.
- **Loại:** Admin Web UI.
- **Role/tài khoản, setup:** Admin đã đăng nhập; danh sách trước đã ghi. Category cần tạo là dữ liệu test của ca; không xóa dữ liệu khác.
- **Input:** tên đúng một ký tự ASCII: `Q` (length=1), sau khi xác nhận trước test chưa có tên đúng `Q`. Nếu `Q` đã có, chọn và ghi một ký tự ASCII khác chưa có trong danh sách. Việc chọn tên vắng mặt chỉ tránh đụng dữ liệu; không kiểm tra uniqueness.
- **C-EC / requirement / liên quan:** C-EC-02; C-R02/C-R05; liên quan C-DT-001.
- **Thao tác:** 1) Mở **Danh mục**. 2) Nhập đúng ký tự đã chọn ở setup (ví dụ `Q`; đúng 1 ký tự ASCII). 3) Bấm **Thêm mới** một lần. 4) Quan sát danh sách, đối chiếu theo ID/dòng category được thêm và ghi chính xác tên.
- **Expected:** Tên đã chọn không rỗng, vì vậy đáp ứng điều kiện tên bắt buộc hiện có; category test được thêm và xuất hiện chính xác trong danh sách. Không chấm uniqueness hay format thông báo.
- **Quan sát/evidence:** ảnh input của ký tự đã chọn, danh sách trước/sau, tên và ID test. Sau khi evidence lưu, chỉ dọn ID do ca này tạo.

### C-BV-003 — Ngay phía trên lower bound: tên 2 ký tự

- **Mục tiêu:** Kiểm tra điểm kề phía trong miền sau LB.
- **Biên:** `LB=1`, `δ=1`, input length `2 = LB+δ`.
- **Loại:** Admin Web UI.
- **Role/tài khoản, setup:** Admin đã đăng nhập; danh sách trước đã ghi; category mới là dữ liệu test riêng.
- **Input:** tên đúng hai ký tự ASCII: `QZ` (length=2), sau khi xác nhận trước test chưa có tên đúng `QZ`. Nếu đã có, chọn và ghi một chuỗi hai ký tự ASCII khác chưa có trong danh sách; không kiểm tra uniqueness.
- **C-EC / requirement / liên quan:** C-EC-02; C-R02/C-R05; liên quan C-DT-001.
- **Thao tác:** 1) Mở **Danh mục**. 2) Nhập đúng chuỗi đã chọn ở setup (ví dụ `QZ`; đúng 2 ký tự ASCII). 3) Bấm **Thêm mới** một lần. 4) Quan sát dòng mới và so sánh chính xác chuỗi tên với input.
- **Expected:** Tên đã chọn không rỗng và không vi phạm điều kiện bắt buộc hiện có; category test được thêm và tên được hiển thị chính xác. Không áp đặt uniqueness/UB.
- **Quan sát/evidence:** ảnh input và danh sách trước/sau, ID test; chỉ dọn ID do ca tạo sau khi lưu bằng chứng.

## 4. Probe trạng thái ID (không phải BVA số học)

### C-BV-004 — ID tồn tại của category test

- **Mục tiêu:** Kiểm tra state target đang ở phía “tồn tại” khi xóa; đây là state transition probe, không phải biên số.
- **Loại:** Admin Web UI hoặc API `DELETE` (chọn một cách và ghi rõ trong lần chạy).
- **Role/token, setup:** Admin role với phiên/JWT hợp lệ. Tạo một category test riêng bằng C-DT-001/C-DT-009 hoặc setup tương đương; ghi ID cụ thể được hệ thống cấp, tên và xác nhận target hiện trong GET/list. Không dùng ID mẫu.
- **Input:** category ID đang tồn tại vừa tạo; ví dụ khi thực hiện sẽ ghi `ID=<giá trị được trả/hiển thị>`; không hard-code ID giả.
- **C-EC / requirement / liên quan:** C-EC-07; C-R04/C-R06; liên quan C-DT-007/C-DT-010.
- **Thao tác:** 1) Chụp/ghi danh sách có target và dòng đối chứng. 2) Gửi thao tác xóa đúng ID target bằng UI hoặc `DELETE /api/categories/:id` với admin JWT. 3) Ghi response/feedback. 4) Xem lại danh sách và đối chiếu ID target cùng các dòng khác.
- **Expected:** Category test được chọn không còn trong danh sách sau khi xóa thành công; dòng không phải target giữ nguyên. SRS/API không định nghĩa HTTP status/body hoặc dialog.
- **Quan sát/evidence:** ID/name trước xóa; ảnh UI hoặc request/response đã che token; GET/list trước/sau. Đây là category do ca tạo nên có thể dọn/hoàn tất xóa sau khi evidence đã lưu.

### C-BV-005 — ID không tồn tại (probe, expected chưa chốt)

- **Mục tiêu:** Quan sát request xóa với ID không có trong danh sách; không gọi đây là UB ID.
- **Loại:** API probe `DELETE`.
- **Role/token, setup:** Admin role với JWT hợp lệ. Tạo một category test riêng làm đối chứng, ghi ID/name và xác nhận nó còn trong danh sách. Dùng GET chỉ đọc để chọn một candidate ID được xác nhận hiện không tồn tại; ghi chính xác candidate trong log trước khi gửi DELETE. Không dùng số cực đại hoặc ID của dữ liệu khác.
- **Input:** category ID candidate không có trong snapshot GET; kiểu/format phải tương thích với ID quan sát được trong hệ thống. Nếu không xác định được một candidate vắng mặt với format phù hợp, không gửi request và ghi ca chưa chạy.
- **C-EC / requirement / liên quan:** C-EC-09; C-R04/C-R06; liên quan phân hoạch ID không tồn tại ở `02-domains.md`.
- **Thao tác:** 1) Lưu GET snapshot trước, xác nhận candidate không xuất hiện và category test đối chứng vẫn tồn tại. 2) Gửi `DELETE /api/categories/<candidate>` bằng admin JWT. 3) Lưu response đã che token. 4) Lấy GET snapshot sau; xác nhận category đối chứng và các dòng khác còn nguyên.
- **Expected:** **Chưa có oracle** cho phản hồi/status khi ID không tồn tại. Chỉ kiểm tra observation và đảm bảo không có dòng hiện có nào bị xóa; không gán Pass/Fail theo response.
- **Quan sát/evidence:** candidate ID, snapshot trước/sau, request/response redacted, ID/name của category đối chứng. Không xóa category đối chứng trong ca này; thủ tục dọn chỉ áp dụng ID test do ca tạo sau khi evidence được lưu.

## 5. Tổng hợp biên và phạm vi

| Input | Điểm/biên | Expected |
|---|---|---|
| Tên danh mục | `0` ký tự = `LB−δ`, `LB=1`, `δ=1` | 0 không được thêm; 1 và 2 ký tự không rỗng được thêm theo điều kiện FR-14. |
| Tên tối đa | **Không có UB được nêu** | Không tạo giá trị lớn tùy ý hoặc kết luận vượt max. |
| Category ID | Tồn tại / không tồn tại | Tồn tại dùng ID test mới tạo để xác minh xóa; ID vắng mặt chỉ là probe chưa có expected phản hồi. Không xem ID là miền số có min/max. |
| Unicode / whitespace-only | Không phải điểm biên thứ tự trong bộ này | Đã để trong Domain cases C-DT-002/C-DT-004; whitespace expected chưa chốt. |

Không có biên khác được SRS/API hoặc phân công nêu rõ cho tên danh mục. Auth role/token là các lớp tương đương, không phải BVA. Không tạo test result, actual, Pass/Fail hay human review.
