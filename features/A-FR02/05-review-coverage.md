# A-FR02 — Ghi nhận review và truy vết độ phủ

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2.

## 1. Phản hồi review nhận được

Ngày **15/10/2026**, sinh viên phản hồi:

> Tôi đã đọc từng ca và hiểu hết các ca kiểm thử.

Ghi nhận phản hồi này đúng phạm vi: sinh viên nói đã đọc và hiểu các ca kiểm thử Domain/BVA trong bước hiện tại. Sinh viên **chưa nêu nhận xét về tính đúng/sai của expected, độ đầy đủ của truy vết, cách đo thời gian hoặc phê duyệt thiết kế**. Vì vậy, tài liệu không diễn giải phản hồi thành xác nhận rằng thiết kế đã hoàn toàn đúng.

Không có actual result; chưa có ca nào được thực thi. “Hiểu ca” là phản hồi review về mức độ hiểu, không phải Pass test hay xác nhận từng yêu cầu đã được kiểm chứng.

## 2. Bản tài liệu được đối chiếu

| Tài liệu | Nội dung | Trạng thái sau phản hồi |
|---|---|---|
| [01-requirements.md](01-requirements.md) | Yêu cầu, input/output, state và câu hỏi còn mở | Đã có bản nháp; chưa ghi nhận phản hồi cụ thể về tính chính xác |
| [02-domains.md](02-domains.md) | Các lớp tương đương và expected | Đã có bản nháp; chưa ghi nhận phản hồi cụ thể về tính chính xác |
| [03-domain-cases.md](03-domain-cases.md) | 24 ca Domain | Sinh viên nói đã đọc và hiểu các ca; chưa có đánh giá tính đúng đắn hoặc đầy đủ |
| [04-boundary-cases.md](04-boundary-cases.md) | 12 ca BVA | Sinh viên nói đã đọc và hiểu các ca; chưa có đánh giá tính đúng đắn hoặc khả năng đo biên |

Không có nhận xét cụ thể nào yêu cầu sửa một TC ID. Do đó không ghi nhận sửa nội dung test case như thể sinh viên đã đề xuất sửa. Đối chiếu dưới đây là kiểm tra truy vết tài liệu do AI thực hiện, cần tiếp tục review kỹ thuật.

## 3. Ma trận yêu cầu → lớp → ca

“Liên kết” cho biết ID có xuất hiện và được dùng để thiết kế ca; không có nghĩa ca đã chạy hoặc yêu cầu đã đạt. `A-DT` là Domain, `A-BV` là BVA.

| Requirement | Nhóm dữ liệu/trạng thái/biên | Ca liên quan | Nhận xét độ phủ thiết kế |
|---|---|---|---|
| A-R01 — email và mật khẩu là input | E01–E07; P01–P06; G01/G03 | DT-001–010, DT-015–019; BV-001–010 | Có input đúng, sai, thiếu/rỗng, sai kiểu và format. Một số payload API chỉ có oracle từ chối đăng nhập ở mức cao; status/validation chi tiết còn mở. |
| A-R02 — login đúng cấp token và user | E01/P01; L01/L03/L04; O01 | DT-001, DT-005, DT-013/014/024; BV-001/003/006–010/012 | Có đường Web/API và state chưa khóa/hết khóa. L03 ở đúng 30s phụ thuộc harness chưa có. |
| A-R03 — thông tin sai bị từ chối | E02/E03; P02–P06; O02/O04/O06 | DT-002–004, DT-006–010, DT-015–019, DT-023; BV-002/004/005 | Có các ca âm cơ bản. Lỗi email không tồn tại và payload thiếu/sai kiểu còn câu hỏi Q1/Q2/Q8; không gán HTTP status chưa có trong SRS. |
| A-R04 — mỗi lần sai tăng đúng 1 | N01/N02/N03; H01; O02/O03 | DT-002/011/014; BV-002–004 | Có quan sát counter theo chuỗi sai và sau success. Request trong lúc khóa và sau hết khóa có chính sách chưa rõ; cần không đếm counter mơ hồ là expected chắc chắn. |
| A-R05 — khóa từ lần sai liên tiếp thứ 3 | N01–N04; H01; O03 | DT-011/012/021; BV-001–005 | Có điểm dưới/đúng/sau ngưỡng. Request thứ tư xảy ra khi đang khóa nên không chứng minh counter=4; chỉ expected từ chối đăng nhập. |
| A-R06 — thời lượng khóa 30 giây | L01–L04; N04/N05; H04/H05; O03/O04 | DT-011–013, DT-021/022; BV-004–012 | Có 29/30/31s, 10/40s và sát biên mô phỏng. 30s, 29.999s, 30.001s chưa thể kết luận nếu không điều khiển/quan sát clock tại điểm server so sánh; chuỗi tự nhiên còn bị phụ thuộc việc đạt ngưỡng khóa. |
| A-R07 — báo lỗi phù hợp, không lộ chi tiết | Output O02–O06 | DT-002–004/006–010/012/015–022; BV-002/004–009 | Các ca yêu cầu lưu quan sát lỗi; tiêu chí “không lộ chi tiết” chưa được tách thành dữ liệu nhạy cảm cụ thể vì Q6 còn mở. Coverage hiện một phần, cần tiêu chí oracle được làm rõ trước verdict bảo mật. |
| A-R08 — lưu token phía client | T01/T02/T03; O01 | DT-001/023/024; BV-001/012 | Có kiểm tra token mới và state token cũ. Cách lưu cụ thể trong test UI dựa vào implementation; SRS không yêu cầu Local Storage hay vòng đời token. |
| A-R09 — gửi Bearer token tới request cần xác thực | T01; O01 | DT-001; BV-001 | Có một luồng Web login → request cần xác thực. Chỉ tính là phủ nếu request thực sự được client tạo và header khớp token vừa nhận; chưa chạy. |
| A-R10 — email Web dùng HTML5 validation | E03; G02; O05 | DT-004/020; BV không thiết kế lại | Có kiểm tra type=email và browser chặn submit ở Domain. BVA không áp dụng vì đây là điều kiện định dạng, không phải miền số có thứ tự. |
| A-R11 — sai liên tiếp; success ngắt chuỗi | H01/H02 | DT-011/014; BV không thiết kế lại | Có chuỗi sai liên tiếp và sai→đúng→sai. Reset counter khi success được diễn giải từ “liên tiếp”; cần giữ nhãn diễn giải khi review expected. |

## 4. Ma trận lớp tương đương → ca

| Họ EC | Các EC | Ca đã liên kết | Kết luận tài liệu |
|---|---|---|---|
| Email | E01–E07 | DT-001/003–008/015/018/019; BV-001/006–010 | Có đại diện cho các lớp rõ và exploratory cho normalization. E05 có hai biến thể tách biệt. E04 và E07 chưa có Web required/type-invalid chi tiết. |
| Password | P01–P06 | DT-001/002/005/007/009/010/015–017/020–024; BV-001–010/012 | Có chuỗi đúng/sai, rỗng, whitespace, thiếu và null. Hành vi counter với dữ liệu rỗng/bị chặn còn Q2/Q7. |
| Cách gửi | G01–G03 | DT-001–004/011–024; BV-001–012 | G01 Web, G02 HTML5, G03 API có ca. |
| Counter | N01–N05 | DT-002/011/014/021/022; BV-001–005 | N01–N04 có ca dự kiến; N05 phụ thuộc Q3 và ca BV-010 có giới hạn oracle. |
| Lock elapsed | L01–L04 | DT-001/011–013/021; BV-001/004/006–012 | L01/L02/L04 có thao tác; L03 đúng 30s phụ thuộc harness. |
| Lịch sử | H01–H05 | DT-011/014/020–022; BV-003–010 | H01/H02 rõ; H03–H05 chứa điểm chưa rõ và chỉ kết luận checkpoint có oracle. |
| Token | T01–T03 | DT-001/023/024; BV-001/012 | T01/T02 có quan sát; T03 có fixture Local Storage dựa trên implementation và còn Q9. |
| Output | O01–O06 | DT-001–013/015–024; BV-001–010/012 | Output success/denial/lock/HTML5 có liên kết; không gán lỗi cụ thể cho lớp chưa rõ. |

### Điểm cần sửa nếu tiếp tục hoàn thiện thiết kế

1. **L03 đúng 30s:** ca được chuyển sang BVA và có protocol harness, nhưng chưa có công cụ kiểm soát clock. Đánh dấu Not run đến khi có môi trường phù hợp; nếu không thể dùng harness, ghi hạn chế và không tuyên bố đã chứng minh chính xác mốc.
2. **Biên 29/31s:** lịch lập request từ client chỉ xác định đúng phía biên khi khoảng elapsed bảo thủ không cắt qua 30s. Nếu khoảng đo cắt biên, phân loại “chưa kết luận”, đo lại; không tự chấm.
3. **Counter qua khóa:** P5/DT-021 và counter sau khi khóa hết chưa có expected cho việc tăng/reset/gia hạn. Giữ giới hạn này khi điền execution, bug report và summary.
4. **Lỗi bảo mật thông báo:** Q6 chưa đủ oracle để phân xử mức lộ email/password/lock. Cần yêu cầu cụ thể trước khi kết luận mức độ lộ thông tin là lỗi.
5. **Bản nháp rất rộng:** 24 Domain + 12 BVA có các tình huống chồng nhau. Khi chạy, liên kết một Run ID với nhiều nhãn nếu cùng bằng chứng thực sự phủ được cả hai; không chạy lặp chỉ để tăng số liệu. Sau khi review, có thể gộp ID trùng nhưng giữ traceability.

Các mục trên là điểm phân tích tài liệu của AI; chúng **không phải nhận xét của sinh viên** và chưa thay đổi expected/TC. Nếu sửa vì lý do kỹ thuật, ghi diff và lý do ở interaction kế tiếp.

## 5. Trạng thái sau review

- Sinh viên xác nhận đã đọc và hiểu các ca kiểm thử: **có**.
- Sinh viên báo ca nào chưa hiểu hoặc yêu cầu sửa cụ thể: **không có trong phản hồi nhận được**.
- Sinh viên phê duyệt expected, coverage hoặc phương pháp đo thời gian: **chưa được xác nhận**.
- Ca đã chạy / actual / Pass / Fail: **chưa có**.
- Bug đã xác nhận: **chưa có**.
- Việc tiếp theo: review kỹ thuật các điểm ở mục 4; sau đó mới chốt phạm vi, tạo harness nếu cần và ghi execution bằng kết quả thật.
