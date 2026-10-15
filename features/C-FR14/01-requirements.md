# C-FR14 — Yêu cầu quản lý danh mục

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2.
**Trạng thái:** Phân tích yêu cầu do AI soạn. Chưa có EC/TC, chưa chạy SUT và chưa có human review.

## 1. Phạm vi và nguồn expected result

| Nguồn | Nội dung dùng trong tài liệu |
|---|---|
| [`eshop-sut/README.md`](../../eshop-sut/README.md), FR-14 | Admin có thể thêm, xem, xóa danh mục; tên danh mục bắt buộc, không được để trống. |
| [`eshop-sut/README.md`](../../eshop-sut/README.md), FR-12 | Phân hệ Admin chỉ dành cho role admin; các API ghi `/api/categories` phải yêu cầu JWT hợp lệ và role admin trong token. |
| [`eshop-sut/api_specification.md`](../../eshop-sut/api_specification.md), mục 3.4 | `GET /api/categories`, `POST /api/categories` với body `{"name":"Tên DM"}`, `PUT /api/categories/:id`, `DELETE /api/categories/:id`. Mục này không nêu response mẫu hoặc HTTP status. |
| [`group_feature_assignment.md`](../../group_feature_assignment.md), Pool C — Thành viên 2 | FR-14; input tên danh mục; xét tên rỗng, chỉ khoảng trắng, tên hợp lệ; thêm và xóa. Đây là phân công kiểm thử, không bổ sung chính sách trim chưa có trong SRS. |
| Slide [`domain-testing-vn.pdf`](../../slide/domain-testing-vn.pdf) và [`domain-testing-en.pdf`](../../slide/domain-testing-en.pdf) | Phương pháp xác định input/output từ đặc tả và phân biệt các lớp dữ liệu; slide là phương pháp, không đặt thêm expected nghiệp vụ. |

## 2. Input, trạng thái và output cần quan sát

| ID | Input / trạng thái | Ý nghĩa |
|---|---|---|
| C-I01 | Tên danh mục | Tên nhập khi Admin thêm danh mục. FR-14 chỉ nói tên bắt buộc và không được để trống. |
| C-I02 | JWT | Token gửi trong `Authorization: Bearer <token>` khi gọi API ghi. FR-12 yêu cầu token hợp lệ. |
| C-I03 | Role trong token | FR-12 yêu cầu `role = 'admin'` cho các API ghi danh mục. |
| C-I04 | Category ID | ID trong đường dẫn `DELETE /api/categories/:id` để chỉ định danh mục cần xóa. API specification cũng liệt kê ID ở endpoint PUT, nhưng PUT không thuộc yêu cầu FR-14. |
| C-S01 | Danh sách danh mục trước thao tác | Ghi nhận danh sách hiện có để đối chiếu sau thêm/xóa; không sửa hoặc xóa dữ liệu mẫu khi chưa được phép. |
| C-S02 | Danh tính/role phiên Admin | Phân hệ Admin dành cho tài khoản có role admin (FR-12). Token có thể là input API; giao diện dùng trạng thái đăng nhập tương ứng. |

**Output quan sát được:**

- **Admin Web:** có thể thao tác thêm, xem danh sách và xóa danh mục với vai trò Admin; quan sát tên/danh sách trước và sau thao tác cùng phản hồi giao diện nếu có. SRS/API không quy định câu chữ cụ thể cho phản hồi.
- **API:** danh sách từ `GET /api/categories`; thao tác thêm qua `POST /api/categories` với trường `name`; thao tác xóa qua `DELETE /api/categories/:id`. Ghi lại HTTP status/body thực tế khi kiểm thử sau này, nhưng hiện không đặt status/body làm expected vì hợp đồng không quy định.
- **Trạng thái:** sau khi thêm hợp lệ, danh mục mới được kỳ vọng xuất hiện trong danh sách; sau khi xóa một danh mục, danh mục được chọn được kỳ vọng không còn trong danh sách. Đây là hệ quả trực tiếp của các thao tác Thêm/Xem/Xóa; cần theo dõi đúng category ID và các danh mục còn lại.
- **Input tên để trống:** không tạo danh mục với tên để trống theo FR-14. Cách hiển thị lỗi, status HTTP và việc giữ nguyên form chưa được nêu.

## 3. Yêu cầu có mã

### C-R01 — Phân hệ danh mục dành cho Admin

- **Yêu cầu:** Thao tác quản lý danh mục trong phân hệ Admin dành cho người dùng có `role = 'admin'` (SRS FR-12).
- **Input/trạng thái:** danh tính và role của phiên đăng nhập.
- **Trạng thái:** trước khi vào thao tác, phiên có role admin hoặc role khác/chưa đăng nhập; trạng thái danh mục cần được ghi nhận.
- **Output quan sát:** khả năng truy cập/hiển thị khu vực Admin và các chức năng danh mục. SRS không quy định cách chuyển hướng hoặc thông báo cho tài khoản không phải admin.
- **Nguồn expected:** `eshop-sut/README.md`, FR-12.

### C-R02 — Admin thêm danh mục

- **Yêu cầu:** Admin có thể thêm một danh mục (SRS FR-14).
- **Input:** tên danh mục; đối với API là `POST /api/categories` với body có trường `name`; JWT hợp lệ với role admin theo C-R06.
- **Trạng thái trước/sau:** ghi danh sách trước; sau thao tác thêm hợp lệ, danh mục mới được kỳ vọng xuất hiện trong danh sách.
- **Output quan sát:** Admin Web cập nhật danh sách/phản hồi; API status/body và kết quả `GET /api/categories` được ghi nhận như actual. Status/body thành công cụ thể chưa có oracle.
- **Nguồn expected:** `eshop-sut/README.md`, FR-14 và `api_specification.md`, mục 3.4.

### C-R03 — Admin xem danh sách danh mục

- **Yêu cầu:** Admin có thể xem danh sách danh mục (SRS FR-14).
- **Input:** phiên Admin; API endpoint `GET /api/categories`.
- **Trạng thái trước/sau:** không yêu cầu thay đổi danh mục; trạng thái dữ liệu giữ nguyên.
- **Output quan sát:** danh sách danh mục trong Admin Web và dữ liệu trả về từ API; hợp đồng không định nghĩa schema/field hoặc thứ tự danh sách.
- **Nguồn expected:** `eshop-sut/README.md`, FR-14; `api_specification.md`, mục 3.4.
- **Điểm cần review:** FR-12 nói phân hệ Admin chỉ dành cho role admin, nhưng không nói rõ `GET /api/categories` (endpoint dùng chung ở mục 3.4) có bắt buộc JWT/role admin hay không. Không tự đặt yêu cầu phân quyền cho GET nếu chưa làm rõ.

### C-R04 — Admin xóa danh mục được chọn

- **Yêu cầu:** Admin có thể xóa danh mục (SRS FR-14).
- **Input:** category ID được chọn; API `DELETE /api/categories/:id`; JWT hợp lệ với role admin theo C-R06.
- **Trạng thái trước/sau:** ghi danh sách và ID trước thao tác; sau khi xóa thành công, danh mục có ID được chọn được kỳ vọng không còn trong danh sách. Các danh mục khác cần được đối chiếu để phát hiện thay đổi ngoài mục tiêu.
- **Output quan sát:** phản hồi thao tác trên Admin Web/API và danh sách sau xóa. HTTP status, body, dialog xác nhận hoặc xử lý ID không tồn tại chưa được đặc tả.
- **Nguồn expected:** `eshop-sut/README.md`, FR-14; endpoint theo `api_specification.md`, mục 3.4.

### C-R05 — Tên danh mục không được để trống

- **Yêu cầu:** Không chấp nhận thêm danh mục có tên để trống (SRS FR-14).
- **Input:** trường tên danh mục rỗng; input còn lại hợp lệ; API request dùng trường `name`.
- **Trạng thái trước/sau:** ghi danh sách trước; khi tên để trống, danh mục không được thêm vào danh sách.
- **Output quan sát:** UI validation/feedback hoặc API response và danh sách sau thao tác. Câu chữ thông báo, HTTP status/body và chi tiết phân biệt chuỗi rỗng với các loại khoảng trắng chưa được quy định.
- **Nguồn expected:** `eshop-sut/README.md`, FR-14. Phân công Thành viên 2 gợi ý xét chuỗi rỗng và chuỗi khoảng trắng, nhưng không xác định policy trim.

### C-R06 — API ghi danh mục yêu cầu JWT hợp lệ và role admin

- **Yêu cầu:** Các thao tác ghi qua `/api/categories` phải có JWT hợp lệ và token có `role = 'admin'` (SRS FR-12). Trong phạm vi FR-14, thao tác ghi là POST thêm và DELETE xóa.
- **Input:** token hợp lệ/admin; token hợp lệ nhưng role khác; thiếu token; token không hợp lệ. Với POST/DELETE, body hoặc category ID tương ứng.
- **Trạng thái trước/sau:** với token admin hợp lệ, đánh giá theo C-R02/C-R04. Với thiếu/sai token hoặc role không phải admin, thao tác ghi không được làm thay đổi danh sách; response status/body cụ thể chưa có oracle.
- **Output quan sát:** kết quả API và đối chiếu danh sách trước/sau; nếu thao tác qua Admin Web, ghi trạng thái truy cập/phản hồi mà không đặt câu chữ cụ thể.
- **Nguồn expected:** `eshop-sut/README.md`, FR-12; API endpoints tại `api_specification.md`, mục 3.4 và quy tắc Bearer token ở mục 6 cho các API Admin được liệt kê ở phần đó.

## 4. Phạm vi và điểm chưa rõ cần review

- **FR-14 không yêu cầu sửa danh mục.** Dù API specification liệt kê `PUT /api/categories/:id` và tên FR-14 ghi “CRUD”, yêu cầu mô tả chỉ nêu Thêm/Xem/Xóa. Không đưa Edit/PUT vào phạm vi kiểm thử FR-14 nếu chưa có yêu cầu bổ sung.
- **Không tự thêm uniqueness:** SRS không nói tên danh mục phải duy nhất.
- **Không tự thêm giới hạn độ dài 255:** giới hạn 255 ký tự nằm ở FR-15 cho tên sản phẩm, không áp dụng sang tên danh mục.
- **Không tự quy định trim:** FR-14 không nói có trim khoảng trắng ở đầu/cuối hay chuỗi toàn khoảng trắng có được xem là rỗng. Phân công gợi ý lớp chuỗi chỉ có khoảng trắng nhưng expected cần được xác nhận.
- **Không tự đặt chính sách xóa category đang được sản phẩm tham chiếu:** SRS/API contract không nói chặn xóa, xóa dây chuyền, đổi tham chiếu hay phản hồi thế nào.
- **Không tự đặt HTTP status/body:** API specification liệt kê endpoint/body tạo danh mục nhưng không quy định response cho thành công, validation hoặc lỗi quyền.
- **GET authorization chưa rõ:** FR-12 nêu các API Admin và các API ghi ảnh hưởng dữ liệu; cần xác nhận GET `/api/categories` dùng chung có cần JWT/admin không.
- **Category ID:** API dùng `:id` cho xóa; hành vi ID không tồn tại/không hợp lệ chưa được quy định.
- **Dialog xác nhận xóa:** FR-14 chỉ yêu cầu Admin xóa; không yêu cầu rõ dialog xác nhận, nên không đặt dialog làm expected.
- **Giới hạn phạm vi:** Pool C — FR-14 thuộc Thành viên 2. Không mở rộng sang FR-15 quản lý sản phẩm, FR-17 coupon hoặc thao tác sửa danh mục ngoài FR-14.

Tài liệu này chỉ phân tích yêu cầu. Chưa tạo EC/test case, chưa chạy SUT và chưa ghi nhận review/phê duyệt của sinh viên.
