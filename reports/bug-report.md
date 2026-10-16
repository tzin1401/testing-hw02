# Bug report — HW02 EShop

**SUT baseline:** `85af3ba875c88283615e22cb108f13e2fccaf0e9`
**Nguồn expected:** SRS/API specification theo từng feature; không lấy code SUT làm oracle.
**Trạng thái kiểm tra GitHub:** 16/10/2026 UTC+07; Issues #1–#14 đang OPEN.

## Issues đã đăng

| Issue | Finding | TC/requirement | Evidence trên GitHub |
|---:|---|---|---|
| [#1](https://github.com/tzin1401/testing-hw02/issues/1) | Login counter tăng 2 thay vì 1 | A-FR02, A-R04 | Có ảnh UI |
| [#2](https://github.com/tzin1401/testing-hw02/issues/2) | Tài khoản vẫn khóa quá 30 giây | A-FR02, A-R06 | Có ảnh UI; biên đúng thời điểm server comparison chưa chạy |
| [#3](https://github.com/tzin1401/testing-hw02/issues/3) | Email sai format vẫn được gửi từ form login Web | A-FR02, A-R10 | Có ảnh UI |
| [#4](https://github.com/tzin1401/testing-hw02/issues/4) | Thêm sản phẩm hợp lệ không cập nhật giỏ | B-DT-002 | Có ảnh UI |
| [#5](https://github.com/tzin1401/testing-hw02/issues/5) | Empty cart thiếu hình minh họa | B-DT-001 | Có ảnh UI |
| [#6](https://github.com/tzin1401/testing-hw02/issues/6) | Tạo danh mục với tên rỗng | C-DT-003, C-BV-001 | Có ảnh UI trước/sau |
| [#7](https://github.com/tzin1401/testing-hw02/issues/7) | JWT role user vẫn POST/DELETE categories | C-DT-014, C-DT-018 | Có ảnh trích xuất từ log JSON API; JSON gốc được dẫn trong issue |
| [#8](https://github.com/tzin1401/testing-hw02/issues/8) | API cho tạo account thứ hai cùng email | D-R04 | Có ảnh trích xuất từ log JSON API; JSON gốc được dẫn trong issue |
| [#9](https://github.com/tzin1401/testing-hw02/issues/9) | Thêm lại cùng sản phẩm tạo dòng trùng | B-DT-004-SUP | Có ảnh UI giỏ hàng |
| [#10](https://github.com/tzin1401/testing-hw02/issues/10) | Giỏ hàng thiếu nút tăng/giảm quantity | B-DT-006–010-SUP | Có ảnh UI giỏ hàng |
| [#11](https://github.com/tzin1401/testing-hw02/issues/11) | Xóa hàng không hiện dialog xác nhận | B-DT-011–013-SUP | Có ảnh UI trước/sau |
| [#12](https://github.com/tzin1401/testing-hw02/issues/12) | Nhãn tổng tiền sai (“Tổng tạm tính”) | B-DT-015-SUP | Có ảnh UI giỏ hàng |
| [#13](https://github.com/tzin1401/testing-hw02/issues/13) | Form Mobile thiếu trường xác nhận mật khẩu | D-DT-001, D-R07 | Có ảnh UI form đăng ký |
| [#14](https://github.com/tzin1401/testing-hw02/issues/14) | Mobile chấp nhận họ tên/email rỗng hoặc email sai format | D-DT-003/004/005 variants; D-R01/02/03 | Có ảnh UI before/response cho từng probe |

Tất cả issue mới #9–#14 dùng title `[BUG][Module]`, có môi trường, steps, expected/actual, TC ID, severity/priority có lý do và labels `type: bug`, `status: new`, severity, priority, module. Nội dung và ảnh của #7/#8 đã được cập nhật; bằng chứng API được ghi rõ là trích xuất từ run log JSON, không mô tả thành screenshot UI.

## Giới hạn verdict liên quan

- Issue #4 và các run bổ sung khác nhau về đường setup; không dùng một biến thể để xóa verdict của TC gốc.
- Issue #10 chỉ kết luận thiếu control `+/-`; các thao tác cần control đó vẫn Blocked.
- Issue #11 chỉ kết luận dialog xác nhận vắng mặt; nhánh Hủy không thực hiện được.
- Issue #13/#14: form thiếu confirmation khiến các full TC bốn trường chưa hoàn tất. #14 ghi rõ các probe trên ba trường là biến thể; không đổi partial thành verdict full TC.
- Issue #8 là hai POST tuần tự, không phải kiểm thử race condition. Mobile duplicate là observation trên form thiếu confirmation, tách biệt với bằng chứng API.
- Các oracle chưa rõ như whitespace/trim, max length, persistence, race condition và thời điểm clock server không được báo thành bug.

## AI gaps có bằng chứng

Chi tiết từng lỗi/giới hạn của AI ở [A](../features/A-FR02/07-bugs-and-ai-gaps.md), [B](../features/B-FR07/07-bugs-and-ai-gaps.md), [C](../features/C-FR14/07-bugs-and-ai-gaps.md), [D](../features/D-MREG/07-bugs-and-ai-gaps.md). Chỉ các sai lệch đã đối chiếu với log/evidence được nêu là AI gap; blocker công cụ không tự động được coi là bug AI.
