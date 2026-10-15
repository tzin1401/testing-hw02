# D-MREG — Review và truy vết coverage

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2
**Phạm vi:** Đăng ký Mobile theo FR-20, quy tắc FR-01.

## Ghi nhận review của sinh viên

Phản hồi thực tế: **“Tôi đã đọc qua và hiểu được hết tất cả các ca kiểm thử.”** Ghi nhận rằng sinh viên đã xem và nói đã hiểu các ca Domain `D-DT-001`–`D-DT-013` và BVA/robustness `D-BV-001`–`D-BV-007`.

Phản hồi này không được diễn giải thành việc phê duyệt expected result, xác nhận giả định, coverage, kết quả thực thi, hoặc các câu hỏi còn mở.

## Ma trận truy vết

| Requirement | EC / biên | Ca thiết kế | Ghi chú coverage |
|---|---|---|---|
| D-R01 Họ tên bắt buộc | D-EC-01/02 | D-DT-001/002/003 | Rỗng và giá trị thường có ca. Trim/whitespace chưa có expected. |
| D-R02 Email bắt buộc | D-EC-03/05 | D-DT-001/002/004 | Rỗng được tách riêng; email mới là điều kiện nền cho success. |
| D-R03 Email đúng định dạng | D-EC-04/05 | D-DT-002/005 | Sai format có một đại diện; grammar chi tiết chưa chốt. |
| D-R04 Email duy nhất | D-EC-05/06 | D-DT-002/006 | Duplicate phân biệt với sai format; race chưa thử. |
| D-R05 Password bắt buộc | D-EC-07 | D-DT-007 | Password rỗng đồng thời có khó khăn với confirm khớp; thiết kế ghi rõ giới hạn cô lập. |
| D-R06 Password ≥8 và đủ nhóm | D-EC-08–14; LB 8, δ=1 | D-DT-008–011; D-BV-001–007 | 7/8/9 là BVA; thiếu riêng nhóm là EC/robustness, không gọi là length boundary. Không có UB. |
| D-R07 Confirm bắt buộc/khớp | D-EC-15–17 | D-DT-001/002/012/013; confirm trong BVA | Thiếu control trên SUT làm các test phụ thuộc blocked. |
| D-R08 Tạo tài khoản khi input hợp lệ | D-EC-18–21 | D-DT-002–013; D-BV-001–007 | API result không thay Mobile; outcome khi network lỗi chưa rõ. |
| D-R09 Chuyển Login sau thành công | D-EC-22–24 | D-DT-002; D-BV-002/003 | Điều hướng sau lỗi chưa có expected. |

## Nội dung sinh viên nói đã hiểu

- `03-domain-cases.md`: form, success, invalid name/email, duplicate, password classes, confirmation, setup và evidence.
- `04-boundary-cases.md`: password length 7/8/9, robustness riêng từng nhóm, không tự đặt upper bound.

Chỉ ghi nhận mức độ hiểu theo lời sinh viên. Không có nhận xét chi tiết hoặc phê duyệt kỹ thuật nào khác.

## Oracle còn cần hỏi

Trim và khoảng trắng; grammar/normalization email; giới hạn trên; cách đếm Unicode; confirmation/API; câu chữ/status lỗi; network/retry; race uniqueness; cách xác minh account khi không đọc được DB. Chi tiết tại `01-requirements.md` và `02-domains.md`.

## Cập nhật theo evidence

Execution được cập nhật tại [`06-execution.md`](06-execution.md). Ở Run `20261015T153620Z-57c022`, form Mobile thiếu confirmation. Vì thế chỉ D-DT-001 có verdict đầy đủ là Fail về presence; 15 thao tác khác là partial variants trên ba trường, hai ca confirmation Blocked, hai ca BVA robustness chưa chạy. Không lấy lời “đã hiểu” làm phê duyệt hoặc kết quả chạy.

## Nguồn

- [01-requirements.md](01-requirements.md), D-R01–D-R09.
- [02-domains.md](02-domains.md), D-EC-01–D-EC-24.
- [03-domain-cases.md](03-domain-cases.md), D-DT-001–D-DT-013.
- [04-boundary-cases.md](04-boundary-cases.md), D-BV-001–D-BV-007.
- SRS `eshop-sut/README.md` FR-01/FR-20, API specification §1.1, slide Domain/BVA.
