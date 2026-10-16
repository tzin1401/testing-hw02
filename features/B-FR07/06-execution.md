# B-FR07 — Nhật ký thực thi Domain và BVA

**SUT baseline:** `85af3ba875c88283615e22cb108f13e2fccaf0e9`
**Run chính:** `20261014T191645Z-BFR07-UI` — Chrome Headless 154/Linux, Web `127.0.0.1:5173`, backend `127.0.0.1:3000`; dịch vụ đã chạy sẵn, không restart. Sản phẩm test P1 ID 1 (30.000.000 VND), P2 ID 2 (28.000.000 VND), không sửa/xóa catalog.
**Run bổ sung:** `20261015T154202360Z-supp`, thư mục `evidence/B-FR07/supplement-runs/20261015T154202360Z-supp/`.

## Kết quả cho 26 ca đã thiết kế

| Trạng thái TC thiết kế | Số lượng | Ghi chú |
|---|---:|---|
| Pass | 4 | B-DT-003, 014; B-BV-002, 003. |
| Fail | 12 | B-DT-001, 002, 004, 006, 008, 011, 015–019; B-BV-001. |
| Observation | 2 | B-DT-005 tổng cộng chưa có oracle đã review; B-DT-020 API exploratory chưa có oracle. |
| Blocked | 8 | B-DT-007, 009, 010, 012, 013 và B-BV-004–006 do nút +/- hoặc dialog/xác nhận không tồn tại; Fail sự hiện diện được ghi riêng. |
| **Tổng thiết kế** | **26** | 20 Domain + 6 BVA. |

Các kết quả pass/fail này có evidence UI trong run chính hoặc run supplementary nêu bên dưới; supplementary không dùng API để seed cart. B-DT-016–019 được chạy lại bằng thao tác UI đủ hai lần bấm cần thiết tại trang chi tiết, sau khi reset giỏ bằng UI. B-DT-020 vẫn là probe API riêng, không chấm theo policy chưa có trong SRS. Không có UB được nêu.

## Run bổ sung: evidence UI và mapping vào TC thiết kế

Run bổ sung lập được giỏ bằng đường Home hoặc thao tác setup riêng. Run 20261016 xác nhận B-DT-002 vẫn Fail khi chỉ bấm một lần tại trang chi tiết; các hành vi độc lập có UI evidence được cập nhật verdict trong bảng 26 ca. TC cần thao tác nút/dialog không tồn tại vẫn Blocked sau khi ghi Fail riêng cho sự hiện diện.

| ID bổ sung | Quan sát | Kết luận giới hạn |
|---|---|---|
| B-DT-001-SUP | Giỏ rỗng có dòng “Giỏ hàng của bạn đang trống”, không thấy minh họa. | Xác nhận Fail B-R01. Ảnh `B-DT-001-empty.png`. |
| B-DT-002-SUP | Thêm từ chi tiết một lần vẫn để giỏ rỗng. | Cùng hiện tượng B-DT-002; ảnh `B-DT-002-first-click.png`, `B-DT-002-cart-after-one-click.png`. |
| B-DT-003-SUP | P1 và P2 hiển thị thành hai dòng riêng. | Hành vi đúng được quan sát trong biến thể; không ghi đè ca thiết kế bị blocked. |
| B-DT-004-SUP | Thêm P1 lần hai tạo hai dòng P1 riêng, mỗi dòng quantity 1. | Fail B-R04; bằng chứng `B-DT-004-SUP-duplicate-product.png`. |
| B-DT-005-SUP | P1: 30.000.000 × 2 = 60.000.000; P2: 28.000.000 × 1 = 28.000.000; tổng hiển thị 88.000.000. | Thành tiền dòng khớp; tổng hiển thị bằng phép cộng nhưng expected tổng vẫn candidate chưa được review, nên cả TC là Observation. Checkpoint `B-DT-005-SUP-amounts.png`. |
| B-DT-006/007/008/009/010-SUP và B-BV-004/005/006-SUP | Trên dòng giỏ không có nút `+` hoặc `−`; chỉ có “Xóa”. | Fail yêu cầu sự hiện diện của điều khiển; thao tác phụ thuộc không thể thực hiện nên Blocked. Không giả lập nút. |
| B-DT-011/012/013-SUP | “Xóa” gỡ dòng ngay; không xuất hiện dialog. | Fail B-DT-011 về dialog; B-DT-012/013 Blocked ở nhánh xác nhận. Việc xóa trực tiếp được ghi observation riêng. Các dòng là fixture do run tạo và đã dọn bằng UI. |
| B-DT-014-SUP | “← Mua tiếp” về Home. | Pass B-DT-014. |
| B-DT-015-SUP | Hiển thị “Tổng tạm tính” thay vì nhãn yêu cầu “Tổng cộng”. | Fail nhãn theo B-R; ảnh `B-DT-015-SUP-total-label.png`. |
| B-DT-016/017/018/019-SUP; B-BV-001/002/003-SUP | Run 20261016 lặp thao tác nhập rồi bấm nút chi tiết hai lần. Giá trị 0 tạo quantity 0; -1 tạo quantity -1; 1.5 hiện thành 1; `abc` bị input number loại thành rỗng nhưng vẫn tạo dòng quantity/amount `NaN`; 1 và 2 tạo quantity tương ứng. | Fail B-DT-016/017/018/019 và B-BV-001 theo FR-06 quantity nguyên dương tối thiểu 1; Pass B-BV-002/003. Đây là actual của TC thiết kế, không chỉ probe. Ảnh/event theo run 20261016T074533896Z-supp. |

Run bổ sung đã dọn các dòng giỏ test qua UI; event log ghi rõ fixture và cleanup. Số ảnh trong thư mục run không phải số ca đã chạy.

## Evidence và side effect

- Run chính: `evidence/B-FR07/full-runs/20261014T191645Z-BFR07-UI/` gồm metadata, summary, case observations, checkpoint index, ảnh và ghi chú.
- Run bổ sung: `evidence/B-FR07/supplement-runs/20261015T154202360Z-supp/events.jsonl` cùng ảnh checkpoint.
- Run chính có hai API POST exploratory quantity 1.5 (một ở lần thử helper hỏng và một ở probe); GET sau đó thấy hai entry nhưng không có snapshot API cart trước đó nên không thể gán từng entry. Web không hiển thị để dọn; không gọi API delete hoặc sửa DB. Side effect và giới hạn được ghi trong execution notes/audit.

## Kết luận

Evidence UI hiện cho phép chấm các TC độc lập về duplicate line, số học, xóa dòng, tiếp tục mua sắm, quantity và nhãn. 8 TC còn Blocked chỉ là thao tác phụ thuộc nút +/-/dialog vắng mặt; finding sự hiện diện được chấm Fail riêng. B-R04 và các yêu cầu điều khiển/dialog/nhãn có issue tương ứng #9–#12; Issue #4/#5 giữ cho hai finding của run chính. Liên kết và tình trạng ảnh được ghi trong `07-bugs-and-ai-gaps.md`. Không kết luận về UB, tồn kho, persistence, hay validation quantity phía ứng dụng khi setup không chứng minh được.


## Run bổ sung ngày 16/10 — kiểm tra lại UI trên clone

**Run ID:** `20261016T072910588Z-supp`; Chrome headless, Web UI trên backend clone cô lập từ baseline `85af3ba875c88283615e22cb108f13e2fccaf0e9`. Không dùng API để seed cart; chỉ tạo account test riêng và thao tác UI. Sản phẩm mẫu không bị sửa/xóa. Bằng chứng ảnh/event nằm trong `evidence/B-FR07/supplement-runs/20261016T072910588Z-supp/`.

Run này tái hiện các checkpoint UI cho giỏ rỗng, mở chi tiết/thêm sản phẩm, hai sản phẩm khác nhau, thêm lại cùng sản phẩm, phép tính thành tiền/tổng, sự hiện diện nút +/- và dialog xóa, xóa dòng, tiếp tục mua sắm, nhãn tổng. Kết quả khớp các quan sát đã có: route chi tiết thêm một lần không thêm dòng; cách thêm từ Home tạo được dòng; thêm trùng tạo hai dòng; giá × quantity và tổng số học hiển thị; +/- và dialog không hiện; xóa xảy ra ngay; tiếp tục mua sắm quay Home; nhãn là “Tổng tạm tính”. Các ca input số lượng chưa có setup giỏ hợp lệ để đánh giá chính sách input.

Các checkpoint supplementary được lưu theo Run ID và ảnh gắn TC ID để giữ nguồn gốc. Bảng 26 TC thiết kế đầu file phản ánh verdict cuối theo toàn bộ UI evidence: các hành vi độc lập đã chạy được chấm theo expected; ca tương tác thực sự phụ thuộc control/dialog vắng mặt vẫn Blocked sau khi ghi Fail riêng cho sự hiện diện.


## Run quantity bổ sung 20261016T074533896Z

Từng ca bắt đầu bằng giỏ rỗng được xác nhận trên UI và reset bằng UI; dùng account test của run trên bản clone. Ở trang chi tiết, sau khi nhập quantity, lần bấm thứ nhất không thêm; lần bấm thứ hai thêm vào cart. Điều này được ghi lại, không bỏ qua thao tác cần thiết.

| TC | Input UI | Actual trên cart sau thao tác | Kết luận theo FR-06 | Evidence |
|---|---|---|---|---|
| B-DT-016 / B-BV-001 | `0` | Dòng P1 quantity `0`, thành tiền `0 ₫` | Fail: quantity phải là số nguyên dương tối thiểu 1. | `B-DT-016-after.png`, `B-BV-001-after.png` |
| B-DT-017 | `-1` | Dòng P1 quantity `-1`, thành tiền `-30.000.000 ₫` | Fail theo cùng quy tắc. | `B-DT-017-after.png` |
| B-DT-018 | `1.5` | Control nhận chuỗi; cart lưu/hiển thị quantity `1`, thành tiền `30.000.000 ₫`. | Fail: nhập thập phân bị chuyển ngầm thành integer thay vì bị từ chối. | `B-DT-018-input.png`, `B-DT-018-after.png` |
| B-DT-019 | `abc` | `input[type=number]` không giữ được `abc`, thành trường rỗng; submit vẫn tạo dòng quantity/amount `NaN`. | Fail: trường rỗng tạo cart item không hợp lệ; không kết luận endpoint API. | `B-DT-019-input.png`, `B-DT-019-after.png` |
| B-BV-002 | `1` | Quantity `1`, thành tiền `30.000.000 ₫`. | Pass tại LB. | `B-BV-002-after.png` |
| B-BV-003 | `2` | Quantity `2`, thành tiền `60.000.000 ₫`. | Pass tại LB+δ. | `B-BV-003-after.png` |

B-DT-013 được giữ **Blocked** vì ca thiết kế yêu cầu xác nhận dialog trước khi kết luận nhánh xóa cuối; chỉ quan sát được nút Xóa xóa ngay và màn hình rỗng. Empty state thiếu minh họa đã được Fail ở B-DT-001. B-DT-005 là **Observation** do tổng cộng 88.000.000 khớp phép cộng số học nhưng công thức tổng chưa có oracle được review; thành tiền từng dòng đã quan sát khớp giá × quantity.

Nguồn event có input validity, URL, cart row, timestamp UTC/monotonic và trạng thái từng checkpoint trong `evidence/B-FR07/supplement-runs/20261016T074533896Z-supp/events.jsonl`. Đây là lần thực thi hợp lệ; kết quả không dùng API thay UI.
