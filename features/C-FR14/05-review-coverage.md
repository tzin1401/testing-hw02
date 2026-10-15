# C-FR14 — Review và ma trận coverage

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2.
**Phản hồi review được ghi nhận:** “Tôi đã đọc qua từng ca kiểm thử và hiểu rõ hoàn toàn.”
**Phạm vi phản hồi:** người dùng cho biết đã đọc và hiểu các ca Domain `C-DT-001`–`C-DT-018` và BVA/probe `C-BV-001`–`C-BV-005`. Không có ca cụ thể nào được báo là chưa hiểu.
**Không suy diễn:** câu “hiểu rõ” không được xem là chấp thuận expected, giả định, tính đầy đủ hoặc phê duyệt bộ test. Chưa có nhận xét nào thể hiện rõ sinh viên đã duyệt thiết kế.

## 1. Ma trận truy vết yêu cầu → lớp/biên → ca

| Requirement | EC / điểm biên liên quan | Ca Domain | Ca BVA / probe | Coverage và giới hạn |
|---|---|---|---|---|
| **C-R01 — Phân hệ danh mục dành cho Admin** | C-EC-10 admin hợp lệ; C-EC-11 user; C-EC-15 trạng thái GET riêng | C-DT-005 (Admin mở danh sách); C-DT-006 chỉ thăm dò GET với admin/user/không token; C-DT-014/C-DT-018 kiểm tra user role trên API POST/DELETE | Không có biên số | **Một phần.** Chưa có ca trực tiếp thử user thường/khách mở khu vực Admin Web. API write denial không thay thế kiểm thử quyền vào UI. SRS nêu phân hệ Admin chỉ dành cho admin nhưng chưa quy định redirect/message cụ thể. |
| **C-R02 — Admin thêm danh mục** | C-EC-02 ASCII non-empty; C-EC-03 Unicode có dấu; C-EC-04 whitespace probe; C-EC-10 admin | C-DT-001 ASCII; C-DT-002 Unicode; C-DT-004 whitespace probe; C-DT-009 API POST admin | C-BV-002 (1 ký tự), C-BV-003 (2 ký tự) | Có ca UI/API và điểm phía trong LB; whitespace vẫn observation-only. Không có UB được nêu. |
| **C-R03 — Admin xem danh sách** | C-EC-05 danh sách rỗng; C-EC-06 có category; C-EC-15 GET quyền chưa rõ | C-DT-001 quan sát empty state; C-DT-005 xem danh sách có dữ liệu; C-DT-006 GET read-only với nhiều auth state | C-BV-004/005 dùng GET để xác nhận state ID trước/sau, nhưng không phải biên số cho chức năng list | Có kiểm tra danh sách có dữ liệu; authorization của GET chưa có expected cho user/khách. Câu chữ/empty illustration và API schema/thứ tự không được SRS quy định. |
| **C-R04 — Admin xóa category được chọn** | C-EC-07 ID test vừa tạo; C-EC-08 ID cũ có thể là mẫu; C-EC-09 ID không tồn tại; C-EC-10 admin | C-DT-007 xóa target test UI; C-DT-008 dialog/Hủy probe; C-DT-010 API DELETE admin; C-DT-015–018 DELETE với token/role không đủ | C-BV-004 ID tồn tại của category test; C-BV-005 ID vắng mặt probe | ID test tồn tại có expected xóa đúng dòng. Không xóa ID mẫu. ID không tồn tại và dialog/Hủy là probe chưa có oracle. C-EC-08 không dùng làm target xóa để bảo vệ dữ liệu mẫu. |
| **C-R05 — Tên danh mục không để trống** | C-EC-01 rỗng; C-EC-02 ASCII non-empty; C-EC-03 Unicode non-empty; C-EC-04 whitespace-only chưa rõ | C-DT-001–002 tên hợp lệ; C-DT-003 rỗng; C-DT-004 whitespace probe | C-BV-001 = 0 ký tự; C-BV-002 = 1; C-BV-003 = 2 | 0 ký tự expected bị từ chối; 1/2 ký tự expected thêm theo rule hiện tại. Whitespace-only chưa gán hợp lệ/không hợp lệ. Không có UB. |
| **C-R06 — POST/DELETE cần JWT hợp lệ + role admin** | C-EC-10 admin; C-EC-11 user; C-EC-12 thiếu token; C-EC-13 token sai; C-EC-14 token hết hạn | C-DT-009 POST admin; C-DT-010 DELETE admin; C-DT-011–014 POST thiếu/sai/hết hạn/user; C-DT-015–018 DELETE thiếu/sai/hết hạn/user | Không có biên số; role/token là lớp Domain | Có cặp ca cho cả hai thao tác ghi và từng lớp quyền. Status/body lỗi chưa có oracle; token hết hạn chỉ chạy nếu chuẩn bị được an toàn. GET được tách riêng ở C-DT-006, không suy rộng quyền ghi. |

## 2. Ghi nhận mức độ hiểu và trạng thái phê duyệt

- Sinh viên nói đã đọc và hiểu rõ toàn bộ 18 ca Domain và 5 ca BVA/probe.
- Không có ca được nêu là khó hiểu; không có đề nghị sửa cụ thể nào trong phản hồi.
- **Chưa được xác nhận:** expected của whitespace-only; authorization cho GET `/api/categories`; hành vi khi xóa ID không tồn tại hoặc category đang được sản phẩm tham chiếu; dialog và Hủy; HTTP status/body; chính sách ký tự/Unicode chi tiết; quyền truy cập UI Admin đối với role không phải admin; mức độ đầy đủ/phù hợp của các ca.
- Do đó các câu hỏi trên và expected suy ra từ phạm vi đặc tả tiếp tục ở trạng thái **cần review**, không được đánh dấu đã duyệt chỉ từ phản hồi “hiểu rõ”. Không ghi người dùng chấp thuận hoặc phê duyệt test design.

## 3. Oracle cần hỏi thêm trước khi chấm

1. Chuỗi chỉ gồm dấu cách có được trim và xem là rỗng không? Nếu có, trim loại ký tự khoảng trắng nào?
2. `GET /api/categories` có cần đăng nhập/role admin không, hay được xem công khai? Không mặc định chặn user/khách.
3. Khi DELETE ID không tồn tại, expected là no-op hay thông báo lỗi nào? API status/body mong muốn là gì?
4. Có được xóa category đang được sản phẩm tham chiếu không? Nếu không, hệ thống phải giữ nguyên dữ liệu hay xử lý khác?
5. UI có bắt buộc dialog xác nhận trước khi xóa không? Khi chọn Hủy, expected state nào?
6. HTTP status/body dự kiến cho POST/DELETE thành công, tên rỗng và thiếu/sai quyền là gì?
7. FR-12 giới hạn phân hệ Admin cho admin; cần xác nhận ca UI riêng cho role thường/khách và expected điều hướng/hiển thị nào.
8. Tên Unicode có cần được giữ nguyên chính xác khi lưu/hiển thị không? FR-14 không nêu chuẩn hóa cụ thể.

## 4. Sửa đổi và khoảng trống coverage

Không sửa `01`–`04` chỉ dựa trên câu trả lời “đã hiểu”; chưa có yêu cầu sửa từ người review. Ma trận đánh dấu C-R01 mới được bao phủ một phần: nếu muốn xác minh quyền truy cập **giao diện Admin**, cần thêm ca UI với user thường/khách; không thay bằng API write test. Các ca C-DT-006 (GET), C-DT-008 (dialog/Hủy), C-DT-004 (whitespace) và C-BV-005 (ID vắng mặt) phải được báo là probe/observation nếu chưa có oracle bổ sung.

Không có execution result trong file này. Chưa chạy SUT và chưa có Pass/Fail.
