# AI-024 — B-FR07 review and coverage output snapshot

Snapshot of `features/B-FR07/05-review-coverage.md` at creation time.

# B-FR07 — Review và truy vết coverage

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2.
**Mục đích:** Ghi nhận phản hồi review thực tế và truy vết từng yêu cầu tới equivalence class/điểm biên và các ca thiết kế.

## Ghi nhận review của sinh viên

Phản hồi nhận được: **“Tôi đã hiểu hết tất cả các ca kiểm thử rồi.”**

- Đã hiểu: toàn bộ 20 ca Domain `B-DT-001`–`B-DT-020` và 6 ca BVA `B-BV-001`–`B-BV-006` trong phiên bản được review.
- Chưa hiểu: không có ca nào được nêu là chưa hiểu.
- Phản hồi này chỉ xác nhận mức độ hiểu các ca; **không ghi nhận là phê duyệt tính đúng của mọi expected result, giả định hoặc cách diễn giải requirement**.
- Sửa đổi theo phản hồi: không có sửa đổi ca nào được yêu cầu. Các câu hỏi oracle dưới đây vẫn mở vì sinh viên chưa đưa ra nhận xét/giải đáp về chúng.

## Ma trận truy vết Requirement → EC/điểm biên → test case

| Requirement | EC / lớp dữ liệu và điểm biên | Ca Domain | Ca BVA | Trạng thái truy vết và điểm cần review riêng |
|---|---|---|---|---|
| **B-R01** — Giỏ rỗng có hình và thông báo rõ | B-EC-01 (0 dòng hợp lệ), B-EC-24 (đủ hình + thông báo), B-EC-25 (thiếu một thành phần); không có numeric boundary | B-DT-001 (empty state), B-DT-013 (xóa dòng cuối rồi về empty state) | — Không có biên số theo requirement | Được phủ bằng empty state ban đầu và transition sau xóa. Exact wording không phải oracle. |
| **B-R02** — Các cột Sản phẩm/Đơn giá/Số lượng/Thành tiền/Thao tác | B-EC-02 (một dòng), B-EC-03 (nhiều dòng), B-EC-05 (ID khác, identity còn cần xác nhận), B-EC-08/B-EC-26/B-EC-28 (cột và giá trị dòng) | B-DT-002, B-DT-003, B-DT-005 | — Không có biên số dòng được nêu | Một và nhiều dòng là đại diện trạng thái, không phải LB/UB. Cách ghép ID khác với sản phẩm khác vẫn là giả định cần oracle nếu chấm số dòng. |
| **B-R03** — Thêm một sản phẩm vào giỏ | B-EC-02/B-EC-06 (sản phẩm tồn tại), B-EC-08 (giá), B-EC-10/B-EC-11 (quantity hợp lệ), B-EC-34/B-EC-35 (phản hồi thêm); B-EC-16 chỉ thăm dò API | B-DT-002; B-DT-003 là thêm sản phẩm thứ hai; B-DT-016–019 kiểm tra input invalid thuộc FR-06; B-DT-020 là API exploratory | B-BV-001–003 kiểm tra quantity nhập 0/1/2 | FR-06 quantity là điểm phụ thuộc trong luồng FR-07; API invalid chưa có oracle. Toast/badge cần được đối chiếu theo FR-06. |
| **B-R04** — Thêm lại cùng sản phẩm thì gộp dòng và tăng quantity | B-EC-04 (cùng ID theo giả định identity), B-EC-05 (ID khác), B-EC-27 (dòng trùng không hợp lệ) | B-DT-004 | — Không có biên số được nêu | Cùng ID dùng làm đại diện cho cùng sản phẩm; phép nhận diện sản phẩm và expected số quantity cuối cần review nếu muốn chấm theo ID/phép cộng cụ thể. |
| **B-R05** — Nút `+` tăng quantity | B-EC-17 (thao tác tăng; delta chưa nêu) | B-DT-006 (presence), B-DT-007 (click) | B-BV-006 (tăng từ q=1) | Kỳ vọng quantity tăng; mức tăng mỗi click chưa được SRS xác định. BVA không gán số âm/thập phân cho nút. |
| **B-R06** — Nút `−` giảm quantity, có mức tối thiểu | B-EC-18 (giảm khi q lớn hơn mức tối thiểu), B-EC-19 (q=1, expected chưa rõ) | B-DT-008 (presence), B-DT-009 (q=2), B-DT-010 (q=1) | B-BV-004 (q=2 hướng về LB), B-BV-005 (q=1 transition) | FR-06 nói LB=1 tại ô nhập; áp dụng chính sách khi giảm trong giỏ chưa được FR-07 nói rõ. B-BV-005 là observation-only cho tới khi có oracle. |
| **B-R07** — Thành tiền dòng = đơn giá × quantity theo phân công | B-EC-08/B-EC-28 (đơn giá), B-EC-29 (công thức hợp lệ), B-EC-30 (sai công thức), B-EC-09/B-EC-40 (giá đổi chưa rõ) | B-DT-002, B-DT-005, B-DT-007, B-DT-009 | B-BV-002–006; dùng P1 30.000.000 VND để tính theo quantity | Công thức có nguồn phân công nhóm; không trình bày như câu trực tiếp trong SRS. Với nút, dùng q sau quan sát nếu delta chưa rõ. |
| **B-R08** — Nhãn “Tổng cộng” và vùng tổng tiền | B-EC-31 (nhãn đúng), B-EC-32 (nhãn sai), B-EC-33 (giá trị tổng chưa có oracle), B-EC-09/B-EC-40 (giá thay đổi) | B-DT-005 (giá trị tổng quan sát; không chấm công thức tổng), B-DT-015 (nhãn chính xác) | — Không có biên tổng tiền/quantity upper bound được nêu | Nhãn có expected rõ; công thức tổng hợp, phí, giảm giá và làm tròn vẫn chưa được SRS định nghĩa. |
| **B-R09** — Xóa phải mở dialog xác nhận trước | B-EC-20 (bấm Xóa mở dialog), B-EC-21 (xác nhận), B-EC-22 (hủy/đóng chưa rõ) | B-DT-011, B-DT-012, B-DT-013 | — Không có biên số được nêu | Có thao tác dialog trong ca; câu chữ/loại dialog không bị chấm. Hủy vẫn là nhánh chưa có expected trực tiếp. |
| **B-R10** — Xác nhận thì xóa dòng được chọn | B-EC-21/B-EC-36 (dòng chọn bị xóa) | B-DT-012 (giỏ hai dòng), B-DT-013 (dòng cuối) | — Không có biên số được nêu | Hậu quả xóa được ghi là diễn giải của thao tác “Xóa sản phẩm”; theo dõi dòng còn lại và empty state. |
| **B-R11** — Hủy xóa thì dòng còn | B-EC-22/B-EC-37 (nhánh hủy, chưa có oracle) | B-DT-011 | — Không có biên số được nêu | Ca tách riêng để quan sát dialog/hủy. Không đánh Pass/Fail cho kết quả hủy trước khi requirement được xác nhận. |
| **B-R12** — Tiếp tục mua sắm đưa về trang chủ | B-EC-23 (nút và điều hướng); persistence sau điều hướng chưa rõ | B-DT-014 | — Không có biên số được nêu | Ca kiểm tra điều hướng; không chấm việc giữ giỏ sau điều hướng/reload. |
| **B-R13** — Quantity nhập ở trang chi tiết là số nguyên dương, tối thiểu 1 | B-EC-10/B-EC-11 (hợp lệ), B-EC-12–15 (invalid UI), B-EC-16 (API riêng, không có oracle), B-EC-34/B-EC-35/B-EC-38 (phản hồi/badge) | B-DT-002, B-DT-016–019 (chỉ thao tác UI nếu control cho phép), B-DT-020 (API exploratory) | B-BV-001 (0), B-BV-002 (1), B-BV-003 (2) | Điểm nhập UI và API không gộp làm một. Số âm/thập phân/chuỗi chỉ thử nếu UI cho phép nhập; badge count cụ thể chưa được đặc tả. |

## Trạng thái review và việc còn lại

- Toàn bộ ca được người dùng xác nhận là **đã hiểu**; không có câu hỏi “chưa hiểu” cụ thể nào được gửi.
- Chưa ghi nhận phê duyệt kỹ thuật cho các expected có ghi “diễn giải”, “candidate”, “cần xác nhận” hoặc “chưa có oracle”. Các điểm đó tiếp tục cần làm rõ trước khi chấm kết quả.
- Qua đối chiếu coverage, không thấy yêu cầu B-R01–B-R13 nào thiếu ít nhất một liên kết tới EC và ca thiết kế. Những requirement không có numeric boundary được ghi `—` và lý do, không tạo điểm biên giả.
- Không sửa `01-requirements.md`–`04-boundary-cases.md` theo phản hồi “đã hiểu”; phản hồi không yêu cầu thay nội dung. Các khoảng trống đặc tả được giữ trong requirements/domains/cases.
- Chưa chạy test; file này không có actual, status, Pass/Fail hoặc kết luận bug.
