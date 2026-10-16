# B-FR07 — Nhật ký thực thi Domain và BVA

**SUT baseline:** `85af3ba875c88283615e22cb108f13e2fccaf0e9`
**Run chính:** `20261014T191645Z-BFR07-UI` — Chrome Headless 154/Linux, Web `127.0.0.1:5173`, backend `127.0.0.1:3000`; dịch vụ đã chạy sẵn, không restart. Sản phẩm test P1 ID 1 (30.000.000 VND), P2 ID 2 (28.000.000 VND), không sửa/xóa catalog.
**Run bổ sung:** `20261015T154202360Z-supp`, thư mục `evidence/B-FR07/supplement-runs/20261015T154202360Z-supp/`.

## Kết quả cho 26 ca đã thiết kế

Bảng dưới giữ kết quả Run chính của đúng các TC trong `03-domain-cases.md` và `04-boundary-cases.md`. Các thử nghiệm bổ sung có hậu tố `-SUP` được ghi riêng bên dưới, không tính thành kết quả cho TC gốc nếu cách chạy/trạng thái setup khác.

| Trạng thái TC thiết kế | Số lượng | Ghi chú |
|---|---:|---|
| Pass | 1 | B-DT-019: trường số không giữ được `abc`; đây chỉ là hành vi input, không kiểm chứng API. |
| Fail | 2 | B-DT-001 thiếu hình minh họa; B-DT-002 click đầu từ trang chi tiết không thêm sản phẩm. |
| Blocked | 23 | Các thao tác cần giỏ có dòng bị ảnh hưởng vì đường thêm sản phẩm gốc không hoạt động; API không dùng để seed UI. |
| Not run | 0 | — |
| **Tổng thiết kế** | **26** | 20 Domain + 6 BVA. |

B-DT-016 (quantity 0), B-DT-017 (âm), B-DT-018 (thập phân) có checkpoint input nhưng đường thêm hợp lệ cũng lỗi nên chưa kết luận được app xử lý giá trị; B-DT-019 chỉ chứng minh browser input đã loại `abc`. B-DT-020 là API probe không có oracle, không chấm kết quả nghiệp vụ. Không có UB được nêu trong yêu cầu.

## Run bổ sung: biến thể UI, không thay verdict TC gốc

Run bổ sung lập được giỏ bằng đường Home hoặc thao tác setup riêng. Kết quả này kiểm tra hành vi UI quan sát được, nhưng không đổi kết quả của B-DT-002 (lỗi click đầu) và không hoàn tất các TC tương tác cần nút/dialog vắng mặt.

| ID bổ sung | Quan sát | Kết luận giới hạn |
|---|---|---|
| B-DT-001-SUP | Giỏ rỗng có dòng “Giỏ hàng của bạn đang trống”, không thấy minh họa. | Xác nhận Fail B-R01. Ảnh `B-DT-001-empty.png`. |
| B-DT-002-SUP | Thêm từ chi tiết một lần vẫn để giỏ rỗng. | Cùng hiện tượng B-DT-002; ảnh `B-DT-002-first-click.png`, `B-DT-002-cart-after-one-click.png`. |
| B-DT-003-SUP | P1 và P2 hiển thị thành hai dòng riêng. | Hành vi đúng được quan sát trong biến thể; không ghi đè ca thiết kế bị blocked. |
| B-DT-004-SUP | Thêm P1 lần hai tạo hai dòng P1 riêng, mỗi dòng quantity 1. | Fail B-R04; bằng chứng `B-DT-004-SUP-duplicate-product.png`. |
| B-DT-005-SUP | P1: 30.000.000 × 2 = 60.000.000; P2: 28.000.000 × 1 = 28.000.000; tổng hiển thị 88.000.000. | Phép tính quan sát khớp; checkpoint `B-DT-005-SUP-amounts.png`. |
| B-DT-006/007/008/009/010-SUP và B-BV-004/005/006-SUP | Trên dòng giỏ không có nút `+` hoặc `−`; chỉ có “Xóa”. | Fail yêu cầu sự hiện diện của điều khiển; thao tác phụ thuộc không thể thực hiện nên Blocked. Không giả lập nút. |
| B-DT-011/012/013-SUP | “Xóa” gỡ dòng ngay; không xuất hiện dialog. | Fail yêu cầu dialog; nhánh hủy dialog Blocked. Các dòng là fixture do run tạo và đã dọn bằng UI. |
| B-DT-014-SUP | “← Mua tiếp” về Home. | Quan sát thành công trong biến thể. |
| B-DT-015-SUP | Hiển thị “Tổng tạm tính” thay vì nhãn yêu cầu “Tổng cộng”. | Fail nhãn theo B-R; ảnh `B-DT-015-SUP-total-label.png`. |
| B-DT-016–019-SUP, B-BV-001–003-SUP | Lặp thao tác input khi đường thêm hợp lệ chưa được chứng minh; giỏ vẫn rỗng. | Không đủ bằng chứng để kết luận cách app xử lý lượng nhập; giữ blocked/observation, không suy ra từ browser constraint. |

Run bổ sung đã dọn các dòng giỏ test qua UI; event log ghi rõ fixture và cleanup. Số ảnh trong thư mục run không phải số ca đã chạy.

## Evidence và side effect

- Run chính: `evidence/B-FR07/full-runs/20261014T191645Z-BFR07-UI/` gồm metadata, summary, case observations, checkpoint index, ảnh và ghi chú.
- Run bổ sung: `evidence/B-FR07/supplement-runs/20261015T154202360Z-supp/events.jsonl` cùng ảnh checkpoint.
- Run chính có hai API POST exploratory quantity 1.5 (một ở lần thử helper hỏng và một ở probe); GET sau đó thấy hai entry nhưng không có snapshot API cart trước đó nên không thể gán từng entry. Web không hiển thị để dọn; không gọi API delete hoặc sửa DB. Side effect và giới hạn được ghi trong execution notes/audit.

## Kết luận

Các biến thể mới đủ bằng chứng cho một số hành vi bổ sung của UI, gồm duplicate line, thiếu điều khiển `+/-`, thiếu dialog, nhãn tổng và số học. Chúng không làm biến mất lỗi setup của 23 TC gốc. B-R04 và các yêu cầu điều khiển/dialog/nhãn có issue tương ứng #9–#12; Issue #4/#5 giữ cho hai finding của run chính. Liên kết và tình trạng ảnh được ghi trong `07-bugs-and-ai-gaps.md`. Không kết luận về UB, tồn kho, persistence, hay validation quantity phía ứng dụng khi setup không chứng minh được.
