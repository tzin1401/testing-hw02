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
| Môi trường chạy ứng dụng | Chưa xác nhận |

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

Các phiên bản này được đọc trên workspace hiện tại; nếu chạy test trên máy khác, ghi lại môi trường của máy thực thi. Chưa kiểm chứng dependency installation hoặc tính tương thích runtime.

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
