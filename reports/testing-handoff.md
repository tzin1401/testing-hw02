# Ghi nhận công việc trước khi chuyển sang chỉ hướng dẫn

Thời điểm ghi nhận: 2026-10-15T15:44:17Z (22:44:17 +07:00).
Người dùng ban đầu yêu cầu giải quyết các phần kiểm thử thiếu, sau đó yêu cầu dừng tự làm và ghi hướng dẫn. Đã gửi SIGTERM cho mobile runner PID 883774 và kiểm tra không còn runner Mobile/Web. Web runner đã kết thúc trước đó. Không tiếp tục test sau yêu cầu dừng.

## Môi trường/thao tác đã thực hiện

- Xác minh emulator-5554 kết nối, baseline SUT `85af3ba875c88283615e22cb108f13e2fccaf0e9`.
- Backend đang chạy PID 620916 với cwd `/tmp/hw02-dmreg-isolated-run`; DB quan sát là DB bản sao trong thư mục này. Không restart backend, không import database.js hoặc sửa logic SUT.
- Khởi chạy Vite Web cổng 5173 và Admin 5174 vì trước đó không có listener. Khởi chạy Chrome headless riêng trên 9333. Các dịch vụ này không phải runner và được để nguyên.
- Thử điều hướng Mobile bằng tap/phím. Có một lần thêm sản phẩm vào giỏ Mobile trong khi thăm dò phím; thay đổi density làm Activity dựng lại và giỏ hiển thị 0. Không xóa sản phẩm hoặc sửa DB vì việc này.
- Thử cấu hình Android density 600, xoay màn hình, immersive status; đã trả density về 420, rotation về 0, accelerometer về 1 và xóa policy_control thử nghiệm. Có ảnh thấy header chồng status bar, nhưng chưa chứng minh đây là nguyên nhân duy nhất gây tap thất bại.
- Đã mở Login bằng TAB/DPAD_UP/DPAD_RIGHT/DPAD_CENTER, rồi tap liên kết Register. Form Register thật có ba input, không thấy confirmation.
- Các tài khoản tạo mới qua API/UI nằm trong DB bản sao, chưa xóa. Giỏ Web của phiên test đã được dọn bằng UI, log có cleanup. Không chạy lại A-FR02, chưa tạo clock harness.

## Evidence mới đã có (chưa tổng hợp thành execution chính thức)

### Mobile D

Run `20261015T153459Z-20907d` là trial: có ảnh form/ghi nhận thiếu confirm, sau đó script lỗi vì thao tác BACK rời app khi dùng bàn phím cứng. Không dùng trial làm toàn bộ kết quả.

Run `20261015T153620Z-57c022` đã ghi presence và checkpoint cho D-DT-002–011, D-BV-001–005. Script bị dừng khi chưa hoàn tất các ca còn lại; kiểm tra ảnh/log trước khi dùng.

- D-DT-002: UI báo thành công, count email 0→1, Login xuất hiện.
- D-DT-003/004/005: UI báo thành công và count 0→1 dù tên rỗng/email rỗng/email dạng không có @. D-DT-005 dùng đại diện sai format mới, không phải nguyên chuỗi trong ca cũ; cần ghi biến thể.
- D-DT-006: cùng email fixture từ D-DT-002 có count 1→2, UI báo thành công.
- D-DT-007–011 và D-BV-001: count 0→0 và còn Register; cần đọc thông báo/ảnh chính xác trước verdict.
- D-BV-002: count 0→0 và còn Register, khác lần dữ liệu dài 8 ở D-DT-002; phải kiểm tra input/automation, chưa báo bug độ dài 8 từ kết quả này.
- D-BV-003: count 0→1, UI báo thành công/điều hướng Login.
- D-BV-004/005: count 0→0; D-BV-006/007 và D-DT-012/013 chưa có checkpoint hoàn tất trong run mới.

Các ca thiết kế có confirm nhưng form thực tế thiếu: đây là các checkpoint/biến thể trên trường hiện có, không tự chấm toàn TC gốc Pass. Hai ca tương tác confirm vẫn phụ thuộc field không tồn tại. Mobile không có capture request/response HTTP; bằng chứng là ảnh UI và count DB chỉ đọc. Script khai báo thiếu HTTP rõ ràng.

### Web B

Run `20261015T153746258Z-supp` lỗi setup: selector tìm input password không có vì Web dùng type=text. Chỉ có fixture, không có verdict.

Run `20261015T154202360Z-supp` có 96 event và ảnh:

- Thêm từ chi tiết một lần vẫn không thêm hàng, kể cả input hợp lệ; không dùng giỏ rỗng sau ca invalid làm bằng chứng validation đã đúng vì cùng lỗi first-click có thể che hành vi.
- Đường thêm từ Home tạo được giỏ có hàng. Biến thể `-SUP` ghi rõ thay đổi setup, không thay kết quả lỗi đường chi tiết cũ.
- Hai sản phẩm khác nhau hiển thị hai dòng; thêm lại cùng sản phẩm tạo hai dòng riêng.
- Quan sát giá/quantity/thành tiền: 30.000.000×2=60.000.000 và 28.000.000×1=28.000.000; tổng hiển thị 88.000.000. Tổng vẫn cần đối chiếu oracle như thiết kế; không tự duyệt phần candidate.
- Ảnh các dòng chỉ có Xóa, không có +/-; các thao tác +/- chưa thể thực hiện.
- Click Xóa làm dòng biến mất, log không có dialog; nhánh Hủy không thể thực hiện. Không chấm cả ca xác nhận/Hủy là Pass.
- Nhãn tổng hiển thị “Tổng tạm tính”; nút Mua tiếp về Home.
- Chỉ xóa các dòng giỏ do run thêm; không sửa/xóa catalog. Không chạy lại API cart probe B-DT-020.

### Admin C và A

C cùng Run ID với B: có ảnh màn Admin Login khi khách truy cập; có fixture user, nhưng chưa có kết quả đăng nhập user thường. Không đánh dấu C-R01 đã phủ đủ.

A chưa chạy thêm. Các mốc đúng 30 giây và 1ms giữ giới hạn cũ; chưa có clock harness mới.

## Trạng thái lưu tài liệu

Chưa cập nhật các file 06/07 bằng verdict mới vì evidence còn cần rà soát. Chưa đăng issue mới, sửa issue cũ, push hoặc commit lượt thực thi bổ sung. Không coi các dấu hiệu mới là toàn bộ test suite đã hoàn tất.

Script trợ giúp được lưu nguyên trạng ở `audit/AI-048-support-scripts/` để có thể xem lại cách thu bằng chứng. Đây là script chẩn đoán chưa đủ kiểm chứng, không tự chạy: script Mobile từng gặp BACK/keyboard issue; Web chưa hoàn tất phần C. Dữ liệu mật khẩu trong source chỉ là fixture giả, evidence che mật khẩu/token.

Các thư mục evidence:
- `evidence/B-FR07/supplement-runs/20261015T154202360Z-supp`
- `evidence/B-FR07/supplement-runs/20261015T153746258Z-supp`
- `evidence/C-FR14/supplement-runs/20261015T154202360Z-supp`
- `evidence/C-FR14/supplement-runs/20261015T153746258Z-supp`
- `evidence/D-MREG/supplement-runs/20261015T153459Z-20907d`
- `evidence/D-MREG/supplement-runs/20261015T153620Z-57c022`
