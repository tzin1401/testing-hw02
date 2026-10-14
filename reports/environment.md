# Môi trường và baseline — HW02

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2.

**Ngày ghi nhận:** 14/10/2026, múi giờ Asia/Ho_Chi_Minh (UTC+07:00). Đây là thông tin chuẩn bị, không phải kết quả kiểm thử SUT.

## Baseline

| Thuộc tính | Giá trị |
|---|---|
| Repo bài làm | https://github.com/tzin1401/testing-hw02 |
| Repo SUT | https://github.com/ttbhanh/eshop-sut |
| Thư mục SUT tương đối | `eshop-sut/` |
| Commit SUT | `85af3ba875c88283615e22cb108f13e2fccaf0e9` |
| Thay đổi cục bộ SUT tại lúc kiểm tra | Không có (`git -C eshop-sut status --short` không có output) |
| Cấu hình Mobile đã chỉnh | Chưa ghi nhận |
| Môi trường chạy ứng dụng | Backend trả danh sách 5 sản phẩm (AI-004); Web hiển thị danh sách sản phẩm theo ảnh sinh viên gửi (AI-005); Admin hiển thị danh mục (AI-006); Mobile chưa xác nhận |

Repo ngoài đang có `eshop-sut` staged dạng gitlink; bước chuẩn bị không đưa mục này vào commit. Để tái lập SUT, lấy repo chính thức và checkout đúng commit trên. Mọi diff cấu hình sau này phải được ghi lại riêng cùng lần chạy.

## Công cụ đã kiểm tra bằng lệnh chỉ đọc

| Thành phần | Giá trị quan sát | Nguồn |
|---|---|---|
| Hệ điều hành | Ubuntu 26.04.1 LTS | `/etc/os-release` |
| Kernel | Linux 7.0.0-34-generic | `uname -sr` |
| Node.js | v22.22.1 | `node --version` |
| npm | 9.2.0 | `npm --version` |
| Python | 3.14.4 | `python3 --version` |
| Trình duyệt/phiên bản | Chưa cung cấp | Bổ sung khi chuẩn bị chạy Web |
| Thiết bị Mobile, OS, kích thước màn hình | Chưa cung cấp | Bổ sung khi chuẩn bị chạy Mobile |
| Expo Go/emulator và phiên bản | Chưa xác nhận | Bổ sung khi chuẩn bị chạy Mobile |

Các phiên bản này được đọc trên workspace hiện tại; nếu chạy test trên máy khác, ghi lại môi trường của máy thực thi. Kết quả cài dependency backend do sinh viên cung cấp được ghi bên dưới; chưa kiểm chứng tính tương thích runtime.

## Địa chỉ dự kiến, chưa xác nhận đang hoạt động

| Thành phần | Địa chỉ/cấu hình dự kiến |
|---|---|
| Backend | `http://localhost:3000` |
| Web | `http://localhost:5173` |
| Admin | `http://localhost:5174` |
| Mobile | Expo trên thiết bị/emulator; API dùng địa chỉ backend thiết bị truy cập được |

Theo mã nguồn đã đọc trong quá trình chuẩn bị hướng dẫn, backend import `database.js`, file này gọi `initDatabase()` để DROP/seed bảng khi khởi động. Sao lưu dữ liệu cần giữ trước khi khởi chạy; tránh restart giữa chuỗi kiểm thử trạng thái. Không chạy server hoặc reset DB trong bước chuẩn bị tài liệu này.

## Nguồn yêu cầu để đối chiếu

- [Đề HW02](../2026.HW02.Domain%20Testing_En.pdf), [phân công thành viên 2](../group_feature_assignment.md).
- [Slide VN](../slide/domain-testing-vn.pdf), [slide EN](../slide/domain-testing-en.pdf).
- [SRS tại commit baseline](https://github.com/ttbhanh/eshop-sut/blob/85af3ba875c88283615e22cb108f13e2fccaf0e9/README.md): A-FR02 → FR-02; B-FR07 → FR-07/FR-06; C-FR14 → FR-14/FR-12; D-MREG → FR-20/FR-01.
- API và hướng dẫn cài đặt nằm cùng commit baseline; đường dẫn được liệt kê trong [README bài làm](../README.md).

## Thông tin bổ sung ở bước chạy môi trường

- [ ] Ghi kết quả cài dependency và lệnh khởi chạy thực tế.
- [ ] Xác nhận backend/Web/Admin mở được, kèm thời điểm và bằng chứng.
- [ ] Ghi trình duyệt, thiết bị và phiên bản ứng dụng Mobile.
- [ ] Ghi IP/URL Mobile thực tế và diff cấu hình nếu thay đổi.
- [ ] Ghi dữ liệu tiền điều kiện và phương pháp reset/cleanup cho từng nhóm test.

Các mục trên là công việc chưa xác nhận, không phải human review hoặc kết quả test.

## Cập nhật cài dependency backend — 14/10/2026

Nguồn: output terminal do sinh viên gửi trong AI-003; chưa phải kết quả chạy test.

- Đã chạy `npm ci` trong `eshop-sut/backend`: thêm 135 package, audit 136 package, hoàn tất trong 2 giây theo output.
- Cảnh báo `prebuild-install@7.1.3` deprecated.
- npm báo 5 vulnerabilities: 1 low, 1 moderate, 1 high, 2 critical; chưa đọc báo cáo chi tiết, chưa đánh giá ảnh hưởng runtime và chưa chạy `npm audit fix`.
- Lệnh backup `cp -n` phát cảnh báo về tính portable; chưa xác minh file backup được tạo mới hay đã tồn tại.
- Backend chưa được xác nhận khởi động; Web/Admin/Mobile chưa được xác nhận. Bước tiếp theo là `node server.js` và mở `/api/products`.

## Cập nhật kết nối backend — AI-004

- Sinh viên gửi JSON gồm 5 sản phẩm (ID 1–5) sau hướng dẫn mở `http://localhost:3000/api/products`.
- Ghi nhận backend đã phản hồi danh sách sản phẩm theo bằng chứng do sinh viên cung cấp; chưa có timestamp của request hoặc log terminal server.
- Đây là kiểm tra kết nối môi trường, không phải kết quả Pass cho test case chức năng hoặc xác nhận toàn bộ backend đúng.
- Web/Admin/Mobile chưa được xác nhận. Bước tiếp theo: mở frontend Web tại cổng 5173, giữ backend chạy.

## Cập nhật giao diện Web — AI-005

- Bằng chứng: ảnh người dùng đính kèm trong hội thoại, hiển thị `http://localhost:5173/` trong trình duyệt tích hợp VS Code.
- Quan sát: trang EShop có danh sách 5 sản phẩm, ảnh placeholder, tên, giá và các nút thao tác. Ghi nhận Web đã hiển thị danh sách sản phẩm; không suy ra các nút/chức năng đã được kiểm thử.
- Chưa biết phiên bản trình duyệt. Ảnh gốc chưa được lưu vào repo; tham chiếu attachment trong hội thoại, cần lưu bản ảnh khi hoàn thiện bằng chứng môi trường.
- Backend đã phản hồi ở AI-004; Web hiển thị ở AI-005. Admin và Mobile chưa xác nhận. Tiếp theo: mở Admin và đăng nhập, chưa thay đổi dữ liệu.

## Cập nhật giao diện Admin — AI-006

- Ảnh sinh viên gửi hiển thị `http://localhost:5174/`, trang EShop Admin, mục Quản lý Danh mục và ba dòng: #1 Điện thoại, #2 Laptop, #3 Phụ kiện. Terminal trong ảnh hiển thị URL Vite cổng 5174.
- Ghi nhận đã truy cập được giao diện Admin và dữ liệu danh mục theo ảnh. Không suy ra đã kiểm thử chức năng Thêm/Xóa hoặc phân quyền.
- Hoàn tất kiểm tra mở môi trường Backend/Web/Admin theo bằng chứng AI-004 đến AI-006. Mobile chưa chuẩn bị/xác nhận; phiên bản trình duyệt chưa cung cấp.
- Ảnh gốc vẫn ở attachment hội thoại, chưa có bản lưu trong repo. Cần bổ sung ảnh khi hoàn thiện evidence/audit nộp bài.
- Bước tiếp theo: 5.1 — phân tích yêu cầu A-FR02, chưa thực thi test chức năng.

Quan sát Git sau bước mở Admin: SUT vẫn ở commit baseline, nhưng `backend/database.sqlite` đã thay đổi và `backend/node_modules/` chưa được theo dõi. Đây là trạng thái sau cài/chạy, khác working tree sạch lúc chuẩn bị; các mục này không được đưa vào commit tài liệu.
