# A-FR02 — Phân hoạch tương đương

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2.

**Trạng thái:** Bản thiết kế do AI soạn ở bước 5.2; chưa có human review hoặc kết quả thực thi. Các ví dụ là dữ liệu đề xuất, không phải dữ liệu đã tạo/chạy.

## 1. Cách đọc và căn cứ

Lớp tương đương (EC) là nhóm giá trị mà ta dự kiến hệ thống xử lý theo cùng một quy tắc. Ví dụ, mật khẩu sai `Wrong123!` và `Wrong456!` đều thuộc nhóm “không khớp mật khẩu tài khoản”; chưa cần chạy mọi chuỗi sai để đại diện nhóm này.

Căn cứ: [01-requirements.md](01-requirements.md), đặc biệt A-R01–A-R11 và Q1–Q9; [slide VN](../../slide/domain-testing-vn.pdf) trang 8–15; [slide EN](../../slide/domain-testing-en.pdf) trang 15–31. Nguồn nghiệp vụ là SRS FR-02 và API specification mục 1.2 như đã dẫn trong requirements. Baseline: `85af3ba875c88283615e22cb108f13e2fccaf0e9`.

Quy ước:

- **H:** hợp lệ đối với điều kiện đang xét. Không có nghĩa cả lần đăng nhập chắc chắn thành công.
- **K:** không hợp lệ đối với điều kiện đó; dự kiến bị chặn/từ chối.
- **C:** chưa chốt được hành vi chi tiết từ đặc tả; phải giữ câu hỏi/giả định, không biến thành bug chắc chắn.
- Với trạng thái, “đang khóa” là trạng thái nghiệp vụ có thật nhưng **không đủ điều kiện đăng nhập**, nên được ghi K về quyền đăng nhập, không coi là dữ liệu hệ thống hỏng.
- Expected trong mỗi bảng giữ các điều kiện còn lại ở mức hợp lệ, trừ khi hàng đó ghi điều kiện khác. Mã HTTP lỗi, câu lỗi cụ thể, cách lưu token chưa được đặc tả thì không tự ấn định.

## 2. Điều kiện nền cho các ví dụ

Dùng tài khoản test dự kiến `test@eshop.com`, mật khẩu đúng `Test1234!`. Phải xác nhận tài khoản này và trạng thái tại lúc chuẩn bị chạy; không suy ra trạng thái hiện tại chỉ từ dữ liệu seed.

Mặc định: tài khoản tồn tại, chưa khóa, chưa có lần sai trong chuỗi mới, không có token cũ ở client. Gọi `n` là số lần sai liên tiếp **trước** request hiện tại. Mỗi ví dụ là tình huống độc lập, không thực hiện nối tiếp bảng mà giữ nguyên state.

Ví dụ email chưa tồn tại dùng `absent-a-fr02@example.com`, cần kiểm tra chưa có tài khoản này trước khi chạy. Các giá trị null/số/object hoặc thiếu key chỉ dành cho API trực tiếp, không giả vờ có thể nhập chúng nguyên dạng qua ô Web.

## 3. Email — A-I01 và sự tồn tại tài khoản A-S01

Tách hình dạng dữ liệu khỏi ý nghĩa xác thực. Trong bảng, xét thiếu key/sai kiểu/rỗng trước; với chuỗi không rỗng, tách trường hợp chuẩn hóa chưa rõ trước khi xét format và tài khoản. Như vậy không xếp cùng một giá trị vào hai hàng trong cùng cách phân chia này.

| EC ID | Nhóm và loại | Ví dụ đại diện | Expected và nguồn |
|---|---|---|---|
| A-EC-E01 | H — email đúng format, khớp chính xác tài khoản tồn tại | `test@eshop.com` | Với password đúng, chưa khóa: thành công 200, có token/user; A-R01/R02 |
| A-EC-E02 | K — đúng format nhưng tài khoản không tồn tại, không thuộc nhóm chuẩn hóa | `absent-a-fr02@example.com` | Từ chối xác thực, không cấp token thành công mới; không chốt bộ đếm cho email này; A-R03/R07, Q1 |
| A-EC-E03 | K — chuỗi không rỗng sai format rõ ràng, không thuộc nhóm chuẩn hóa | `not-an-email` | Web dùng HTML5 validation để chặn submit; API trực tiếp không được xác thực thành công với email không hợp lệ này; bộ đếm chưa chốt; A-R03/R10, Q2 |
| A-EC-E04 | C — chuỗi rỗng | `""` | Không có định danh hợp lệ để đăng nhập theo mô hình; chưa chốt Web có required hay không, lỗi/bộ đếm ra sao; A-R01/R03, Q2/Q7 |
| A-EC-E05 | C — giá trị cần quy tắc trim/hoa-thường | ` TEST@ESHOP.COM ` | Chưa chốt được coi là tài khoản có thật hay email khác/sai format; Q7. Không dùng làm ca sai format chắc chắn |
| A-EC-E06 | K về cấu trúc — thiếu key email | Body chỉ có `password` | Không đáp ứng đầu vào email; dự kiến không xác thực thành công; chưa chốt HTTP lỗi/validation/bộ đếm; A-R01, Q2/Q8 |
| A-EC-E07 | K về cấu trúc — email không phải chuỗi | `{"email":123,"password":"Test1234!"}` | Không đáp ứng mô hình email chuỗi; dự kiến không xác thực thành công; chi tiết xử lý ngoài contract chưa rõ; A-R01, Q2/Q8 |

E05 là nhóm tạm cần làm rõ, có thể tách tiếp phần khoảng trắng và hoa/thường khi có quy tắc. E07 đại diện sơ bộ cho null/số/boolean/array/object; nếu cần kiểm tra rủi ro ép kiểu khác nhau thì tách nhỏ, không khẳng định mọi kiểu chắc chắn chạy giống nhau. Không tự đặt độ dài tối đa email.

**Vì sao chia:** email tồn tại khác email không tồn tại về khả năng xác thực; sai format còn có tầng chặn HTML5; thiếu/sai kiểu là lỗi payload khác chuỗi rỗng; chuẩn hóa chưa được đặc tả.

## 4. Mật khẩu — A-I02

Giữ email E01 và tài khoản chưa khóa. Đối chiếu với mật khẩu đúng đã chuẩn bị, không đánh giá độ mạnh của mật khẩu ở chức năng login.

| EC ID | Nhóm và loại | Ví dụ đại diện | Expected và nguồn |
|---|---|---|---|
| A-EC-P01 | H — chuỗi khớp mật khẩu tài khoản | `Test1234!` | Thành công nếu không khóa; A-R02 |
| A-EC-P02 | K — chuỗi không rỗng, không chỉ khoảng trắng và không khớp | `Wrong123!` | Từ chối; lần sai được tính tăng n đúng 1, khóa nếu đạt ngưỡng; A-R03/R04/R05/R07 |
| A-EC-P03 | C — chuỗi rỗng | `""` | Không khớp tài khoản nền nên không được đăng nhập; chặn UI hay API, bộ đếm chưa chốt; Q2/Q7 |
| A-EC-P04 | C — chuỗi chỉ có khoảng trắng | `"   "` | Không khớp mật khẩu nền; không đăng nhập; chưa chốt coi là thiếu hay sai password thông thường; Q2/Q7 |
| A-EC-P05 | K về cấu trúc — thiếu key password | `{"email":"test@eshop.com"}` | Thiếu thông tin xác thực, dự kiến từ chối; chi tiết status/bộ đếm chưa chốt; A-R01, Q2/Q8 |
| A-EC-P06 | K về cấu trúc — password không phải chuỗi | `{"email":"test@eshop.com","password":null}` | Payload ngoài mô hình chuỗi, dự kiến từ chối; lỗi và bộ đếm chưa chốt; A-R01, Q2/Q8 |

P06 cũng là nhóm sơ bộ như E07. Khi kiểm tra email sai, giữ password đúng; khi kiểm tra password sai, giữ email E01. Không ghép hai lỗi chỉ để giảm số lượng ca.

**Vì sao chia:** P02 có căn cứ rõ để kiểm tra đếm lần sai; P03/P04 có thể bị validation chặn trước khi xác thực. Chúng không nên bị gộp khi chưa biết có cùng quy tắc đếm hay không.

## 5. Cách gửi — A-I03

Đây là các đường đi của thao tác, không phải mọi đường đều có thể gắn “input không hợp lệ”. API trực tiếp là cách kiểm tra bổ trợ hợp lệ, không thay thế kiểm tra form Web.

| EC ID | Nhóm và loại | Ví dụ | Expected và nguồn |
|---|---|---|---|
| A-EC-G01 | H — submit Web với giá trị hợp lệ theo validation | E01 + P01, bấm nút login | Request có email/password được xử lý; với điều kiện nền trả thành công; A-R01/R02 |
| A-EC-G02 | K về format — submit Web bị validation email chặn | E03 + P01 | Browser chặn request form do format; không xem đây là một lần xác thực sai ở server; A-R10. Chưa đặt kỳ vọng về cách UI khác quản lý state |
| A-EC-G03 | H về đường gửi — gọi API trực tiếp | POST `/api/login` với JSON E01 + P01 | Response theo dữ liệu và trạng thái; ví dụ nền thành công. Với payload sai, dùng expected nhóm E/P tương ứng; A-R01/R02 |

Ba hàng mô tả phạm vi thao tác login đang xét, không bao phủ phương thức/endpoint sai, JSON hỏng hoặc mọi lỗi mạng. Những nội dung đó ngoài phạm vi phân hoạch đầu vào FR-02 hiện tại.

## 6. Số lần sai trước request — A-S02

Xét **email có thật và password sai không rỗng P02**, request đến server. Các trạng thái phụ thuộc nhau; không ghép `n≥3` với “chưa từng khóa” như một tình huống người dùng bình thường.

| EC ID | Nhóm và loại | Ví dụ đại diện | Expected và nguồn |
|---|---|---|---|
| A-EC-N01 | H về state — chuỗi mới, n=0, chưa khóa | Trước request đầu: n=0 | Sai → n=1, chưa khóa; A-R04/R05 |
| A-EC-N02 | H về state — n=1, chưa khóa | Đã sai một lần | Sai → n=2, chưa khóa; A-R04/R05 |
| A-EC-N03 | H về state — n=2, chưa khóa | Đã sai hai lần | Sai → n=3 và kích hoạt khóa 30 giây; A-R04/R05/R06 |
| A-EC-N04 | K về khả năng đăng nhập — đã đạt ngưỡng và đang khóa | n=3, mới khóa được 10 giây | Từ chối đăng nhập; không khẳng định lần thử tiếp làm n=4 hoặc kéo dài khóa; A-R06, Q2/Q5 |
| A-EC-N05 | C — từng đạt ngưỡng, khóa đã hết, chưa có lần thành công mới | n còn lưu từ chuỗi trước, đã qua 40 giây | Với P02 vẫn không xác thực thành công; reset/giữ n và khóa lại chưa chốt; Q3 |

N01/N02 được tách để phân biệt bắt đầu chuỗi và tiếp tục chuỗi, dù cùng quy tắc “tăng 1, chưa khóa”. N03 phải riêng vì làm thay đổi trạng thái khóa. n âm, thập phân hoặc null là state bất thường do lưu trữ/fixture, không phải lớp invalid mà người dùng nhập qua login; chưa đưa thành ca FR-02 bắt buộc.

## 7. Thời gian và trạng thái khóa — A-I05, A-S03/A-S04

Để cô lập ảnh hưởng thời gian, dùng email/password đúng. `t0` là thời điểm kích hoạt khóa; `elapsed` tính theo thời điểm server xét request. Không gửi request thăm dò giữa chuỗi đo nếu chưa làm rõ Q5.

| EC ID | Nhóm và loại | Ví dụ đại diện | Expected và nguồn |
|---|---|---|---|
| A-EC-L01 | H — hiện không có khóa đã kích hoạt | Tài khoản nền n=0, không có t0 | Cho đăng nhập đúng; A-R02 |
| A-EC-L02 | K về khả năng đăng nhập — 0 ≤ elapsed < 30s | elapsed=10s | Chặn đăng nhập dù mật khẩu đúng; A-R06 |
| A-EC-L03 | H theo diễn giải — elapsed=30s | Đúng mốc t0+30s | Khoảng khóa hết, xét thông tin đúng để đăng nhập; Q4 về cách đo phải được làm rõ trước khi đánh giá đúng mốc |
| A-EC-L04 | H — elapsed>30s, không có tác động gia hạn xen giữa | elapsed=40s | Khóa cũ đã hết, cho đăng nhập đúng; A-R02/R06 |

L03 tách khỏi L04 để không che khuất vấn đề so sánh tại mốc hết khóa. Ví dụ 10/40 giây là đại diện miền; bộ điểm sát biên và cách đo đầy đủ được làm ở bước BVA, không coi bảng này đã thay thế BVA. elapsed âm là lỗi mô hình đo hoặc fixture, không phải khoảng thời gian khóa bình thường.

## 8. Thứ tự thao tác/kết quả trước — A-I04, A-S05

Đây là các nhóm lịch sử cần xét, không tuyên bố đã chia mọi chuỗi thao tác vô hạn. Chọn theo sự kiện làm thay đổi cách đếm hoặc còn mơ hồ; có liên hệ với N/L, không cộng chúng thành những ca độc lập mặc định.

| EC ID | Nhóm và loại | Ví dụ cụ thể | Expected và nguồn |
|---|---|---|---|
| A-EC-H01 | H về lịch sử — sai nối tiếp khi chưa khóa | Sai → sai → sai, đều P02 | Bộ đếm 1 → 2 → 3, khóa ở lần thứ 3; A-R04/R05 |
| A-EC-H02 | H về lịch sử — thành công ngắt chuỗi sai | Sai → đúng → sai | Sau thành công chuỗi sai cũ kết thúc, lần sai cuối là lần 1; A-R11 là diễn giải từ “liên tiếp” |
| A-EC-H03 | C — xen thao tác bị validation Web chặn | Sai → email sai format bị chặn → sai | Thao tác bị chặn không có request xác thực; chưa chốt toàn bộ chính sách bộ đếm/chuỗi cho thao tác xen này; Q2 |
| A-EC-H04 | K khi đang khóa; C về state sau đó | Khóa → nhập đúng lúc 10s → thử lại sau đó | Lần tại 10s bị chặn; tác động lên thời hạn/counter và expected lần sau phụ thuộc Q2/Q5 |
| A-EC-H05 | C về counter sau hết khóa | Khóa → chờ hơn 30s không request xen → nhập sai | Không xác thực thành công; bộ đếm/khóa lại chưa chốt; Q3 |

Các ví dụ đúng/sai chỉ mô tả chuỗi đại diện; chưa có steps chi tiết, tài khoản đã tạo hoặc thực thi.

## 9. Token phía client — A-S06

Tách token trước thao tác khỏi output của request. Token ở đây là dữ liệu do hệ thống tạo, không phải ô nhập login.

| EC ID | Nhóm và loại | Ví dụ | Expected và nguồn |
|---|---|---|---|
| A-EC-T01 | H về điều kiện nền — chưa có token | Client mới, sau đó login đúng | Nhận và lưu token, request cần xác thực gửi đúng Bearer header; A-R02/R08/R09 |
| A-EC-T02 | H về state — đã có token hợp lệ từ thành công trước | Có token T từ lần đúng, tiếp theo nhập sai | Request sai không cấp token thành công mới; không coi token T còn ở client là bằng chứng request sai thành công; A-R03, Q9 về chính sách giữ/xóa |
| A-EC-T03 | C — giá trị token cũ không rõ hiệu lực hoặc sai dạng | Client chứa chuỗi `not-a-jwt` | Không được suy ra login mới thành công từ giá trị này; với login đúng vẫn kiểm tra output và token được lưu/gửi. TTL, xử lý token cũ không được FR-02 mô tả đầy đủ; Q9 |

T03 chưa là bộ kiểm thử API authorization hoặc JWT security. Expected “server phải chặn mọi token giả” thuộc phạm vi yêu cầu bảo mật khác nếu mở rộng sau; không dùng để thay cho kiểm tra A-R09 về gửi header.

## 10. Lớp đầu ra mong đợi — A-O01 đến A-O07

Đầu ra được chia riêng theo kênh. Một lần thao tác có thể liên quan một lớp kết quả xác thực và một lớp state/token. Đây là các loại output phải quan sát, không phải kết quả thực tế đã thấy.

| EC ID | Lớp output | Ví dụ tình huống dẫn tới output | Expected và nguồn |
|---|---|---|---|
| A-EC-O01 | H — xác thực thành công | E01/P01/L01 | HTTP 200, JWT token và user; client lưu token và gửi header ở request cần xác thực; A-O01/O02/O06, A-R02/R08/R09 |
| A-EC-O02 | K — từ chối thông tin xác thực, chưa khóa | E01/P02/N01 | Không có token thành công mới; thông báo lỗi phù hợp; n tăng 1; A-O01/O03/O04, A-R03/R04/R07 |
| A-EC-O03 | K — từ chối và kích hoạt khóa | E01/P02/N03 | n thành 3, kích hoạt khóa 30s, báo lỗi; A-O03/O04/O05, A-R04/R05/R06/R07 |
| A-EC-O04 | K — từ chối do đang khóa | E01/P01/L02 | Không đăng nhập thành công, có lỗi phù hợp; chưa chốt counter/gia hạn; A-O01/O03/O05, A-R06/R07 |
| A-EC-O05 | K ở form — lỗi validation HTML5 | E03/P01/G02 | Email type=email, browser báo không hợp lệ và không submit request login; A-O07, A-R10 |
| A-EC-O06 | K xác thực — không tìm thấy tài khoản | E02 qua API | Không có token thành công; báo lỗi phù hợp; không đặt bộ đếm cho tài khoản không tồn tại; A-O01/O03, A-R03/R07, Q1 |

Với lỗi, không tự điền HTTP 401/403, bắt buộc câu chữ giống nhau hoặc phân biệt chi tiết email/password; xem Q6/Q8. Các payload ngoài contract và câu hỏi C chưa có toàn bộ output xác định, nên không gộp vào lớp O như thể đã biết chắc cách xử lý.

## 11. Đối chiếu và cách sử dụng ở bước tiếp theo

| Yêu cầu | Lớp liên quan chính |
|---|---|
| A-R01 | E01–E07, P01–P06, G01/G03 |
| A-R02 | E01, P01, L01/L03/L04, O01 |
| A-R03 | E02, P02, O02/O06; các lớp C cần giữ giới hạn |
| A-R04 | N01/N02/N03, H01, O02/O03 |
| A-R05 | N01–N04, H01, O03 |
| A-R06 | L01–L04, N04/N05, H04/H05, O03/O04 |
| A-R07 | O02/O03/O04/O06; Q6 vẫn chưa rõ |
| A-R08/A-R09 | T01/T02/T03, O01 |
| A-R10 | E03, G02, O05 |
| A-R11 | H02 |

Trong bảng này, E01 là viết tắt của A-EC-E01, tương tự các nhóm khác.

1. Chọn đại diện cho từng lớp có expected đã xác định; nhóm C được đánh dấu cần làm rõ/thăm dò riêng.
2. Ca hợp lệ có thể phủ nhiều lớp. Ca âm cơ bản chỉ vi phạm một điều kiện; những chuỗi kiểm tra khóa là tương tác có chủ đích và cần ghi rõ.
3. Không lấy tích mọi lớp: `n=0, chưa từng khóa` không đi cùng `elapsed=10s sau khóa`; token cũ không có nghĩa request hiện tại thành công.
4. Các lớp cùng dữ liệu nhưng khác state cần ca riêng khi expected thay đổi. Lớp output/state có thể được phủ chung trong cùng ca, không cộng số EC thành số test case.
5. Bước 5.3 sẽ tạo `03-domain-cases.md` có ID ca, setup/reset, dữ liệu, từng thao tác và expected; BVA làm riêng ở bước 5.4. Chưa có ca đã chạy hoặc điểm tự chấm trong tài liệu này.
