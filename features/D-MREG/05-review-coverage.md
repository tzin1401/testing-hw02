# D-MREG — Review và truy vết coverage

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2
**Phạm vi:** Đăng ký Mobile theo FR-20, quy tắc đăng ký FR-01.

## Ghi nhận review của sinh viên

Phản hồi thực tế: **“Tôi đã đọc qua và hiểu được hết tất cả các ca kiểm thử.”** Ghi nhận rằng sinh viên đã xem và nói đã hiểu nội dung các ca Domain `D-DT-001`–`D-DT-013` và các ca BVA/robustness `D-BV-001`–`D-BV-007`.

Phản hồi này không được diễn giải thành việc sinh viên phê duyệt expected result, xác nhận mọi giả định, xác nhận coverage đầy đủ, chấp nhận các câu hỏi còn mở, hoặc duyệt kết quả thực thi. Chưa có test nào chạy và chưa có actual/status.

## Ma trận truy vết yêu cầu → lớp/biên → ca

| Requirement | Domain classes | Biên / robustness | Test cases | Coverage và lưu ý |
|---|---|---|---|---|
| **D-R01 — Họ tên bắt buộc** | D-EC-01 rỗng; D-EC-02 có giá trị | Không có giới hạn độ dài trong SRS; không tạo BVA | D-DT-001, D-DT-002, D-DT-003; giá trị hợp lệ làm điều kiện nền cho D-BV-001–007 | Hiện diện, giá trị thường, và rỗng có ca. Whitespace-only/trim chưa có expected. |
| **D-R02 — Email bắt buộc** | D-EC-03 rỗng; D-EC-05 hợp lệ mới | Không có giới hạn độ dài; không tạo BVA | D-DT-001, D-DT-002, D-DT-004; D-BV-001–007 dùng email hợp lệ làm điều kiện nền | Email rỗng có ca; trạng thái account hậu kiểm dùng tổng count DB test vì không có email định danh. |
| **D-R03 — Email đúng định dạng** | D-EC-04 sai định dạng; D-EC-05 đúng định dạng | Không có giới hạn độ dài/grammar chi tiết để tạo biên | D-DT-002, D-DT-005; email hợp lệ là điều kiện nền cho D-BV-001–007 | Có một đại diện sai định dạng dựa trên ví dụ SRS; grammar email đầy đủ và normalization chưa chốt. |
| **D-R04 — Email duy nhất** | D-EC-05 chưa tồn tại; D-EC-06 đã tồn tại | Không có biên số được nêu | D-DT-002, D-DT-006; D-BV-002/003 dùng email mới riêng | Ca trùng dùng fixture test và count trước/sau; race condition và so sánh hoa/thường chưa được kiểm tra/kết luận. |
| **D-R05 — Password bắt buộc** | D-EC-07 rỗng; các EC password có giá trị | Không có BVA riêng cho empty; D-EC-07/D-DT-007 kiểm tra lớp rỗng | D-DT-007; password có giá trị làm điều kiện nền cho các ca còn lại | Password rỗng đồng thời buộc confirm rỗng nếu cần khớp; D-DT-007 ghi rõ đây không phải bằng chứng riêng cho confirm. |
| **D-R06 — Password tối thiểu 8 và đủ nhóm ký tự** | D-EC-08 dưới 8; D-EC-09 đúng 8; D-EC-10 trên 8; D-EC-11–14 thiếu riêng từng nhóm | BVA: 7=`LB−1`, 8=`LB`, 9=`LB+1` (D-BV-001–003). EC/robustness thiếu hoa/thường/số/ký tự thuộc tập (D-BV-004–007) | D-DT-007–D-DT-011; D-BV-001–D-BV-007 | Độ dài và từng nhóm ký tự được tách; 8/9 là đạt điều kiện độ dài, không đồng nghĩa thành công nếu điều kiện khác/backend chưa đạt. Không có UB. |
| **D-R07 — Có confirm và confirm khớp** | D-EC-15 khớp; D-EC-16 không khớp; D-EC-17 rỗng | Không có giới hạn độ dài trong SRS; không tạo BVA | D-DT-001, D-DT-002, D-DT-012, D-DT-013; D-BV-001–003 dùng confirm khớp làm điều kiện nền | Có ca hiện diện, khớp, mismatch, rỗng. API spec không nhận confirm; expected chỉ áp dụng Mobile UI. |
| **D-R08 — Tạo account khi dữ liệu hợp lệ** | D-EC-18 API/UI success; D-EC-19 input rejection; D-EC-20/21 network states còn hạn chế oracle | Thành công tại BVA LB/LB+1; từ chối dưới LB và thiếu nhóm ký tự | D-DT-002, D-DT-003–D-DT-013; D-BV-001–D-BV-007 | Ca âm yêu cầu hậu kiểm không tạo account bằng DB test chỉ đọc nếu khả thi. API success contract được quan sát bổ sung; lỗi status/body chưa có expected. |
| **D-R09 — Sau thành công chuyển Login** | D-EC-22 Register trước; D-EC-23 Login sau success; D-EC-24 failure navigation chưa chốt | Không có biên riêng | D-DT-002; D-BV-002, D-BV-003; ảnh sau submit là checkpoint | Chuyển Login được kiểm tra ở các luồng success. Điều hướng/giữ dữ liệu sau lỗi chỉ được ghi nhận, không đặt expected mới. |

## Nội dung đã được xem/hiểu theo phản hồi

- `03-domain-cases.md`: form bốn trường; success với email mới; input rỗng/sai; duplicate email; password thiếu từng điều kiện; confirm mismatch/rỗng; setup account/email; thao tác Mobile và evidence dự kiến.
- `04-boundary-cases.md`: BVA password length tại 7/8/9; phân biệt các ca robustness thiếu nhóm ký tự với điểm biên thứ tự; không tự đặt upper bound; email riêng cho mỗi lần đăng ký thành công.
- Đây là ghi nhận mức độ hiểu theo lời sinh viên, không phải xác nhận rằng test đã chạy hoặc bằng chứng đã được tạo.

## Điểm cần hỏi hoặc oracle chưa chốt

1. **Trim/khoảng trắng:** họ tên hoặc email chỉ có dấu cách, và khoảng trắng đầu/cuối, được xử lý thế nào?
2. **Email:** ngoài ví dụ `user@domain.com`, grammar hợp lệ cụ thể là gì? Email trùng có phân biệt hoa/thường hoặc được chuẩn hóa không?
3. **Giới hạn trên:** SRS không nêu max length cho họ tên/email/password/confirm. Không thiết kế BVA trên cho đến khi có giới hạn có nguồn.
4. **Password và Unicode:** ký tự Unicode được đếm thế nào; chữ hoa/thường/chữ số Unicode có được tính không? Yêu cầu “có ít nhất một ký tự thuộc `@$!%*?&`” có chỉ là membership hay có quy tắc khác về ký tự bổ sung?
5. **Confirm/API:** xác nhận mật khẩu được kiểm tra hoàn toàn tại Mobile hay có API contract khác ngoài tài liệu hiện có?
6. **Từ chối đăng ký:** câu chữ/vị trí/thứ tự lỗi, HTTP status/body khi thiếu/sai field hoặc duplicate chưa được quy định. Các test chỉ đánh giá ý nghĩa từ chối và state tạo account.
7. **Network và retry:** hành vi khi timeout/mất mạng, bấm submit lặp, response mất sau khi account đã được tạo, và giữ/xóa form sau thất bại chưa có oracle.
8. **Email uniqueness race:** kết quả khi hai request đồng thời dùng cùng email chưa được mô tả.
9. **Xác minh account state:** thiết kế dùng DB backend test ở chế độ chỉ đọc nếu truy cập được. Nếu môi trường chạy thực tế không cho phép, cần thống nhất cách xác minh khác; không xóa account test hoặc suy luận chỉ từ thông báo UI.

## Trạng thái review và giới hạn

- **Sinh viên nói đã đọc/hiểu:** toàn bộ ca D-DT và D-BV trong file thiết kế.
- **Sinh viên phê duyệt expected/giả định/coverage:** chưa được ghi nhận.
- **Test execution, actual, Pass/Fail/Blocked, evidence thực tế:** chưa có trong bước review này.
- **Sửa file liên quan:** ma trận này liên kết requirements, domains và test cases hiện có; không sửa expected khi chưa có nguồn oracle mới.

## Nguồn

- [01-requirements.md](01-requirements.md), D-R01–D-R09.
- [02-domains.md](02-domains.md), D-EC-01–D-EC-24.
- [03-domain-cases.md](03-domain-cases.md), D-DT-001–D-DT-013.
- [04-boundary-cases.md](04-boundary-cases.md), D-BV-001–D-BV-007.
- SRS [`eshop-sut/README.md`](../../eshop-sut/README.md), FR-01/FR-20; API [`eshop-sut/api_specification.md`](../../eshop-sut/api_specification.md), §1.1; slide Domain/BVA.
