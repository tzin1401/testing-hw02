# B-FR07 — Bugs và AI gaps sau thực thi

**Run:** `20261014T191645Z-BFR07-UI`; baseline SUT `85af3ba875c88283615e22cb108f13e2fccaf0e9`. Hai issue được chuẩn bị dạng draft dựa trên ảnh và expected đã rõ. Chưa đăng lên GitHub; cần đính kèm ảnh checkpoint khi tạo.

## Draft issue B-BUG-001 — Thêm sản phẩm hợp lệ không cập nhật giỏ Web

- **Labels đề xuất:** `type: bug`, `status: new`, `severity: major`, `priority: P1`, `module: cart`, `module: web` (đối chiếu tên tag với quy ước repo/slide lúc tạo).
- **TC:** B-DT-002; liên quan B-R03/B-R13.
- **Môi trường:** Chrome 154, Linux; SUT `85af3ba875c88283615e22cb108f13e2fccaf0e9`.
- **Tiền điều kiện/dữ liệu:** tài khoản test đã đăng nhập; giỏ trống; P1 iPhone 15 Pro Max ID 1 giá 30.000.000 VND; quantity 1 hiển thị hợp lệ.
- **Bước:** mở chi tiết P1 → bấm “Thêm vào giỏ hàng” một lần → mở Giỏ hàng.
- **Expected:** FR-06 yêu cầu phản hồi trực quan khi thêm; ca B-DT-002 yêu cầu một dòng sản phẩm quantity 1 trong giỏ.
- **Actual:** click được ghi nhận; trang vẫn ở chi tiết; giỏ vẫn báo rỗng/0 dòng; không có UI `POST /api/cart` quan sát được.
- **Evidence cần đính kèm:** [input P1](../../evidence/B-FR07/full-runs/20261014T191645Z-BFR07-UI/screenshots/B-DT-002_input-p1-default.png), [sau click](../../evidence/B-FR07/full-runs/20261014T191645Z-BFR07-UI/screenshots/B-DT-002_after-add-p1.png), [giỏ sau click](../../evidence/B-FR07/full-runs/20261014T191645Z-BFR07-UI/screenshots/B-DT-002_cart-after-add.png).
- **Reproduction:** 1/1 lần chạy được ghi trong run này; chưa kiểm tra trên browser khác.

## Draft issue B-BUG-002 — Empty state không có hình minh họa

- **Labels đề xuất:** `type: bug`, `status: new`, `severity: minor`, `priority: P2`, `module: cart`, `module: web` (xác nhận bộ labels theo slide/repo khi tạo).
- **TC:** B-DT-001; liên quan B-R01.
- **Tiền điều kiện/bước:** tài khoản test, giỏ rỗng; mở Giỏ hàng.
- **Expected:** SRS FR-07 yêu cầu empty cart có hình minh họa và thông báo rõ.
- **Actual:** thông báo “Giỏ hàng của bạn đang trống” hiện; không thấy hình minh họa.
- **Evidence cần đính kèm:** [empty state](../../evidence/B-FR07/full-runs/20261014T191645Z-BFR07-UI/screenshots/B-DT-001_empty-state.png).
- **Reproduction:** quan sát được ở checkpoint của run này.

## Chưa đủ bằng chứng để tạo issue khác

Không tạo issue về nút `+`, `−`, Xóa, dialog, columns, total label hoặc persistence: không có hàng giỏ tạo được qua UI nên các control/đầu ra này chưa quan sát được. Các ca tương ứng Blocked, không phải Fail. Quantity 0 và -1 được hiển thị trong input; 1.5 bị browser constraint từ chối về validity; không thể kết luận hành vi ứng dụng khi Add hợp lệ đang lỗi. Chuỗi `abc` không còn trong input type=number; B-DT-019 Pass theo observation đã thiết kế.

## AI gaps và giới hạn run

- Lần thử ban đầu `20261014T191002Z-BFR07` bị loại do harness append thay vì thay nội dung quantity (`1` thành `11`). Kết quả UI lần đó không được tính; các file run thử bị bỏ. Tuy nhiên lần thử đã gửi exploratory API POST P1 quantity 1.5.
- Run qualified gửi thêm API POST P1 quantity 1.5 (B-DT-020), nhận HTTP 200 `Added to cart`; SRS/API spec không nêu expected invalid quantity tại API nên chỉ ghi observation.
- GET chỉ đọc sau đó thấy hai entry P1 quantity 1.5; không có API cart baseline trước các POST nên không gán được entry cho từng attempt. UI không hiển thị các entry để xóa. Không gọi API delete, không sửa DB, không restart backend. Side effect API local còn tồn tại.
- 107 checkpoint screenshots và timestamp UTC/monotonic được lưu. Không có ảnh dòng hàng/giá/quantity/thành tiền/tổng vì UI không tạo được dòng.
- Hai issue ở trên chỉ là nội dung nháp; chưa đăng GitHub. Lý do giữ ở dạng draft: yêu cầu hiện tại chưa cho đăng và evidence chưa được tải thành attachment lên issue.
