# B-FR07 — Báo cáo bug và AI gaps

**Run:** `20261014T191645Z-BFR07-UI`
**SUT baseline:** `85af3ba875c88283615e22cb108f13e2fccaf0e9`
**Đối chiếu oracle:** `eshop-sut/README.md`, FR-06 và FR-07. Hai TC Fail được giữ thành hai issue draft vì chúng kiểm tra hai đầu ra độc lập: thêm sản phẩm vào giỏ và empty state. Chưa tạo issue trên GitHub.

## B-BUG-001 — Thêm sản phẩm hợp lệ không cập nhật giỏ hoặc phản hồi trên Web

**GitHub:** [Issue #4](https://github.com/tzin1401/testing-hw02/issues/4) — OPEN.

**Severity đã gán: Major.** Thêm sản phẩm là luồng cốt lõi của giỏ hàng. Với dữ liệu P1 hợp lệ, người dùng không thấy sản phẩm trong giỏ và không quan sát được phản hồi sau thao tác. Bằng chứng hiện giới hạn ở một fixture và một run; chưa xác nhận phạm vi trên trình duyệt khác.

**TC:** `B-DT-002` — một sản phẩm; requirements `B-R03`, `B-R13`; nguồn SRS FR-06 (phản hồi trực quan sau khi bấm Thêm vào giỏ) và FR-07 (hiển thị sản phẩm trong danh sách giỏ).

**Title đã đăng:** `[BUG][Cart] Valid product addition does not update the Web cart`

**Body đã đăng:**

```markdown
## Môi trường
- SUT commit: 85af3ba875c88283615e22cb108f13e2fccaf0e9
- Chrome 154.0.8037.57, Linux
- Run: 20261014T191645Z-BFR07-UI

## Tiền điều kiện
- Người dùng test đã đăng nhập.
- Giỏ hàng đang rỗng.
- P1: iPhone 15 Pro Max (ID 1), giá 30.000.000 VND.

## Các bước tái hiện
1. Mở chi tiết P1.
2. Để số lượng là 1 (giá trị hợp lệ theo FR-06).
3. Bấm **Thêm vào giỏ hàng** một lần.
4. Mở **Giỏ hàng**.

## Expected
- Theo SRS FR-06, sau khi bấm phải có phản hồi trực quan (toast hoặc badge cập nhật).
- Theo luồng thêm hàng và màn hình giỏ FR-07, sản phẩm được thêm phải xuất hiện trong danh sách giỏ với quantity 1.

## Actual
- Click được thực hiện trên nút; trang vẫn ở chi tiết sản phẩm.
- Khi mở giỏ, trang báo giỏ rỗng và không có dòng sản phẩm.
- Trong lần chạy này không quan sát thấy request `POST /api/cart` phát sinh từ thao tác Web.

## Bằng chứng
- `B-DT-002_input-p1-default.png` — quantity 1 trước khi thêm.
- `B-DT-002_after-add-p1.png` — giao diện ngay sau click.
- `B-DT-002_cart-after-add.png` — giỏ vẫn rỗng.
- TC: B-DT-002; Run: 20261014T191645Z-BFR07-UI.
```

**Ảnh đã đính kèm:** [input](../../evidence/B-FR07/full-runs/20261014T191645Z-BFR07-UI/screenshots/B-DT-002_input-p1-default.png), [sau click](../../evidence/B-FR07/full-runs/20261014T191645Z-BFR07-UI/screenshots/B-DT-002_after-add-p1.png), [giỏ sau click](../../evidence/B-FR07/full-runs/20261014T191645Z-BFR07-UI/screenshots/B-DT-002_cart-after-add.png). Đã xác minh body Issue #4 chứa đủ ba ảnh từ `github.com/user-attachments/assets/`.

## B-BUG-002 — Giỏ rỗng thiếu hình minh họa

**GitHub:** [Issue #5](https://github.com/tzin1401/testing-hw02/issues/5) — OPEN.

**Severity đã gán: Minor.** Đây là thiếu sót trình bày ở empty state; thông báo giỏ rỗng vẫn hiển thị rõ, nên bằng chứng không cho thấy người dùng bị ngăn khỏi luồng chính.

**TC:** `B-DT-001` — giỏ rỗng; requirement `B-R01`; nguồn SRS FR-07.

**Title đã đăng:** `[BUG][Cart] Empty cart state is missing its illustration`

**Body đã đăng:**

```markdown
## Môi trường
- SUT commit: 85af3ba875c88283615e22cb108f13e2fccaf0e9
- Chrome 154.0.8037.57, Linux
- Run: 20261014T191645Z-BFR07-UI

## Tiền điều kiện
- Người dùng test đã đăng nhập.
- Giỏ hàng đang rỗng.

## Các bước tái hiện
1. Mở trang **Giỏ hàng** khi giỏ không có sản phẩm.

## Expected
- SRS FR-07 yêu cầu giỏ hàng trống có hình minh họa và thông báo rõ ràng.

## Actual
- Thông báo “Giỏ hàng của bạn đang trống” hiển thị.
- Không thấy hình minh họa trong vùng empty state.

## Bằng chứng
- `B-DT-001_empty-state.png`
- TC: B-DT-001; Run: 20261014T191645Z-BFR07-UI.
```

**Ảnh đã đính kèm:** [empty state](../../evidence/B-FR07/full-runs/20261014T191645Z-BFR07-UI/screenshots/B-DT-001_empty-state.png). Đã xác minh body Issue #5 chứa ảnh từ `github.com/user-attachments/assets/`.

## Fail đã gộp và các ca chưa kết luận

Hai hành vi cùng luồng của B-DT-002 — không thấy phản hồi trực quan sau click và sản phẩm không xuất hiện trong giỏ — được gộp trong một draft vì cùng xảy ra sau một lần thao tác Thêm với quantity hợp lệ. Đây là nhóm triệu chứng theo bằng chứng; nguyên nhân kỹ thuật chưa xác định. B-DT-001 là lỗi độc lập về empty state nên có draft riêng.

Các ca +/- / xóa / dialog / cột / tổng tiền không tạo issue: không thể quan sát chúng do chưa thiết lập được giỏ có hàng bằng Web; các TC đó là Blocked, không phải Fail. Không suy ra lỗi hay kết quả cho giới hạn chưa có trong SRS.

## AI gaps có bằng chứng

- Trial `20261014T191002Z-BFR07` bị loại khỏi kết quả vì harness nối chuỗi thay vì thay giá trị, làm quantity `1` thành `11`. Run notes ghi lỗi setup; kết quả UI của trial không được tính. Trial vẫn đã gửi một exploratory API POST quantity 1.5.
- Qualified run gửi exploratory API POST quantity 1.5 và nhận HTTP 200 `Added to cart` (B-DT-020). SRS/API spec không định nghĩa expected cho quantity thập phân qua API, nên đây chỉ là observation, không phải bug.
- GET chỉ đọc sau đó trả hai entry P1 quantity 1.5. Không có baseline cart API trước các POST, nên không thể xác định entry nào đến từ attempt nào. Web không hiển thị các entry; không gọi API delete, không sửa DB, không restart backend. Side effect API local còn tồn tại.
- Run lưu 107 ảnh checkpoint và timestamps UTC/monotonic. Không có ảnh dòng hàng hoặc giá/quantity/thành tiền/tổng vì thao tác thêm trên Web không tạo được dòng.

Hai issue đã đăng và được xác minh còn OPEN; mỗi issue có labels `type: bug`, `status: new`, `severity`, `priority`, `module: cart`. Labels có sẵn `module: cart` được tạo cho bước phân loại này. Ghi nhận hoạt động đăng issue tại AI-027.
