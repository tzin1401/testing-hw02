# AI-011 — Output nguyên văn

## Thông báo tiến độ

Tôi sẽ ghi nhận đúng phản hồi của bạn: đã đọc và hiểu tất cả ca. Tôi sẽ lập bảng truy vết yêu cầu → lớp tương đương/biên → ca kiểm thử, đồng thời nêu rõ đây là xác nhận bạn hiểu nội dung, không tự suy diễn thành phê duyệt tính đúng đắn hay xác nhận đã chạy test.

## File: features/A-FR02/05-review-coverage.md

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

## File: features/A-FR02/03-domain-cases.md

# A-FR02 — Test case Domain Testing

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2.

**Trạng thái chung: bản thiết kế, tất cả ca chưa chạy (Not run).** Ngày 15/10/2026, sinh viên phản hồi đã đọc và hiểu các ca kiểm thử. Chưa có xác nhận sinh viên phê duyệt expected/độ phủ, actual result hoặc bug. Expected là yêu cầu để đối chiếu sau này, không phải kết quả đã quan sát.

Nguồn: [01-requirements.md](01-requirements.md), [02-domains.md](02-domains.md), SRS FR-02 và API specification mục 1.2 được dẫn trong requirements. Baseline SUT: `85af3ba875c88283615e22cb108f13e2fccaf0e9`. Cách chọn ca theo slide VN trang 15/EN trang 31: phủ các lớp hợp lệ bằng ca kết hợp; mỗi ca âm cơ bản chỉ sai một điều kiện.

## 1. Quy ước và cách chuẩn bị dùng chung

Các thủ tục dưới đây là một phần của từng ca có viện dẫn chúng. **Chưa thực hiện các lệnh trong tài liệu ở lượt thiết kế này.**

- `U = test@eshop.com`, `P = Test1234!`, `V = absent-a-fr02@example.com`. Nếu tài khoản nền không tồn tại hoặc đã bị thay đổi, dừng để chuẩn bị fixture rồi ghi giá trị thực tế; không đoán mật khẩu.
- EC viết tắt `E01` nghĩa là `A-EC-E01`; requirement `R01` nghĩa là `A-R01`. Mỗi ca bên dưới ghi đầy đủ ID trong mục truy vết.
- **P0 — chuẩn bị độc lập:** Backend/Web đang chạy; xác nhận U tồn tại, mật khẩu test là P, counter n=0 và chưa khóa bằng D. Nếu state không đạt, chưa chạy ca; nhờ chuẩn bị tài khoản riêng hoặc fixture reset có khai báo. Reload Web/đăng xuất chỉ xóa state client, không reset counter server. Không restart backend để reset giữa ca vì sẽ seed lại toàn bộ DB.
- **W — mở Web:** dùng trình duyệt có DevTools (nếu trình duyệt tích hợp không đủ chức năng, mở cùng URL trong Chrome/Firefox và ghi phiên bản). Mở `http://localhost:5173/login`. Đăng xuất nếu cần để bắt đầu client sạch, rồi mở lại /login; kiểm tra token cũ đã hết. Mở F12 → Network, bật Preserve log và xóa log cũ; không bật lại nút submit nhiều lần. Ô email có thể ghi “Username”, nút login “Sign In” theo code hiện tại; nhận diện control không đổi expected theo lỗi UI.
- **D — đọc state bổ trợ:** mở terminal riêng tại thư mục gốc, chạy đoạn Python chỉ đọc dưới đây trước/sau thao tác cần theo dõi. Ghi kết quả và thời điểm. Không import database.js vì sẽ seed DB. Counter/locked_until là điểm quan sát trong bản SUT, không phải yêu cầu tên trường của nghiệp vụ.

```bash
cd /home/zinn/zinn/test/hw02
python3 - <<'READ_STATE'
import sqlite3
from datetime import datetime, timezone
con = sqlite3.connect('file:eshop-sut/backend/database.sqlite?mode=ro', uri=True)
print(datetime.now(timezone.utc).isoformat())
for email in ('test@eshop.com', 'absent-a-fr02@example.com'):
    rows = con.execute('SELECT id, email, login_attempts, locked_until FROM users WHERE email = ?', (email,)).fetchall()
    print(email, rows)
con.close()
READ_STATE
```

- **A — gửi API:** dùng terminal khác để tránh tắt server. Mỗi ca API thay chuỗi JSON của `--data-raw` bên dưới bằng **đúng body ghi ở ca**, gửi một lần; ghi thời điểm, status và body. Không gửi thêm request hợp lệ chỉ để “thử kết nối” vì có thể reset counter. Không có thao tác click ở ca API; lệnh gửi request là thao tác thực hiện.

```bash
curl -i -sS --max-time 10   -X POST http://localhost:3000/api/login   -H 'Content-Type: application/json'   --data-raw '{"email":"test@eshop.com","password":"Test1234!"}'
```

- **K — chuẩn bị khóa độc lập:** bắt đầu P0; thực hiện ba lần sai tuần tự theo 011, ghi response và D sau từng lần. `t0` là mốc kích hoạt khóa quan sát được, không phải lúc bắt đầu lần sai thứ nhất. Không suy ra t0 từ `locked_until−30s` vì thời lượng triển khai có thể sai. Nếu không xác định được khóa/state đúng do lỗi trước, ghi phần phụ thuộc chưa đủ điều kiện; có thể thiết kế fixture riêng sau nhưng không lặng lẽ sửa DB để tuyên bố luồng người dùng đúng.
- Với kiểm tra ở 10/40 giây, đo thời gian thực tế; nếu không đủ chính xác để xác định nằm trong/ngoài cửa sổ thì chưa chấm checkpoint thời gian. Không dùng một chuỗi khóa cho nhiều ca độc lập. Ca đúng mốc 30 giây dành cho BVA có cách đo rõ ràng.
- Khi chạy về sau, lưu ảnh/log dưới `evidence/A-FR02/<TC-ID>/<Run-ID>/`, ghi vào execution. Với ca C/thăm dò, chỉ chấm checkpoint có expected đã biết; phần chưa rõ giữ “chưa chốt”, không biến observed behavior thành expected. Không công khai token đầy đủ trong ảnh/issue.

## 2. Danh sách ca và thao tác

### A-DT-001 — Đăng nhập Web đúng; lưu và gửi token

- **Loại:** Web — dương
- **Điều kiện chuẩn bị:** P0 và W; tài khoản U có n=0, chưa khóa; client không có token.
- **Dữ liệu nhập:** Email U; password P.
- **Điều kiện sai duy nhất / mục đích tương tác:** Không có.
- **EC ID:** `A-EC-E01`, `A-EC-P01`, `A-EC-G01`, `A-EC-L01`, `A-EC-T01`, `A-EC-O01`.
- **Requirement:** `A-R01`, `A-R02`, `A-R08`, `A-R09`.

**Thao tác:**

1. Mở /login; nhập U vào ô email (có thể ghi Username), nhập P vào ô Mật khẩu.
2. Bấm Sign In một lần; trong Network mở POST /api/login → Response.
3. Ghi status, token và user của response. Mở Application/Storage → Local Storage của localhost:5173, quan sát token sau đăng nhập.
4. Trong Network mở request cần xác thực GET /api/users/me xuất hiện sau login → Request Headers; đối chiếu Bearer token với token vừa nhận. Nếu chưa xuất hiện, bấm link hồ sơ người dùng; không tự gắn header thủ công để chứng minh client gửi đúng.

**Expected result:** HTTP 200 và JWT token/user đúng tài khoản; client giữ token và request cần xác thực mang Authorization: Bearer <token vừa nhận>. Không buộc một URL chuyển trang cụ thể. Local Storage chỉ là điểm quan sát của bản code này, không phải quy định bắt buộc cách lưu.

**Điểm chưa chốt:** Không có câu hỏi chặn expected chính.

### A-DT-002 — Một lần sai mật khẩu trên Web

- **Loại:** Web — âm cơ bản
- **Điều kiện chuẩn bị:** P0 và W; n=0, chưa khóa.
- **Dữ liệu nhập:** U; Wrong123!.
- **Điều kiện sai duy nhất / mục đích tương tác:** Chỉ mật khẩu không khớp.
- **EC ID:** `A-EC-E01`, `A-EC-P02`, `A-EC-G01`, `A-EC-N01`, `A-EC-O02`.
- **Requirement:** `A-R03`, `A-R04`, `A-R05`, `A-R07`.

**Thao tác:**

1. Nhập U và Wrong123! trên /login; bấm Sign In đúng một lần.
2. Mở request login trong Network; đọc status/response, chụp thông báo trên form.
3. Dùng D đọc counter/locked_until sau request; không gửi lần login khác để thăm dò.

**Expected result:** Từ chối, không cấp token thành công mới, có lỗi phù hợp ở UI/API. Counter từ 0 thành 1 và chưa khóa. Không chốt status lỗi/câu chữ; ghi từng checkpoint riêng.

**Điểm chưa chốt:** Q6/Q8: chỉ đánh giá ý nghĩa lỗi, không buộc câu chữ/status cụ thể.

### A-DT-003 — Email đúng format nhưng chưa đăng ký trên Web

- **Loại:** Web — âm cơ bản
- **Điều kiện chuẩn bị:** P0/W; D xác nhận V không tồn tại.
- **Dữ liệu nhập:** V; P.
- **Điều kiện sai duy nhất / mục đích tương tác:** Chỉ email không trỏ tới tài khoản tồn tại; password giữ nguyên P của nền.
- **EC ID:** `A-EC-E02`, `A-EC-G01`, `A-EC-O06`.
- **Requirement:** `A-R01`, `A-R03`, `A-R07`.

**Thao tác:**

1. Nhập V và P; bấm Sign In một lần.
2. Đọc response login, thông báo UI và quan sát có token thành công mới hay không.

**Expected result:** Từ chối xác thực, báo lỗi phù hợp, không cấp token thành công mới. Không đặt expected bộ đếm cho tài khoản không tồn tại.

**Điểm chưa chốt:** P được giữ nguyên từ dữ liệu nền, không khẳng định có mật khẩu đúng cho V. Q1/Q6/Q8 còn mở.

### A-DT-004 — Email sai format bị HTML5 chặn

- **Loại:** Web — âm cơ bản
- **Điều kiện chuẩn bị:** P0/W; password P.
- **Dữ liệu nhập:** not-an-email; P.
- **Điều kiện sai duy nhất / mục đích tương tác:** Chỉ format email.
- **EC ID:** `A-EC-E03`, `A-EC-P01`, `A-EC-G02`, `A-EC-O05`.
- **Requirement:** `A-R10`.

**Thao tác:**

1. Nhấp phải ô email → Inspect; ghi thuộc tính type đang có, không sửa DOM.
2. Nhập not-an-email và P; xóa danh sách Network cũ rồi bấm Sign In một lần.
3. Quan sát validation trình duyệt và kiểm tra có request POST /api/login mới hay không.

**Expected result:** Input có type=email; browser báo format không hợp lệ và không gửi request login. Nếu request vẫn gửi, ghi checkpoint sai format thất bại; không coi phản hồi API từ chối là thay thế validation HTML5.

**Điểm chưa chốt:** Không có câu hỏi chặn expected chính.

### A-DT-005 — Login đúng qua API

- **Loại:** API — dương
- **Điều kiện chuẩn bị:** P0; U n=0, chưa khóa.
- **Dữ liệu nhập:** {"email":"test@eshop.com","password":"Test1234!"}
- **Điều kiện sai duy nhất / mục đích tương tác:** Không có.
- **EC ID:** `A-EC-E01`, `A-EC-P01`, `A-EC-G03`, `A-EC-L01`.
- **Requirement:** `A-R01`, `A-R02`.

**Thao tác:**

1. Theo A, gửi đúng body đã cho một lần.
2. Ghi HTTP status và response token/user.

**Expected result:** HTTP 200, JWT token và user của U. Ca API này không chứng minh client Web lưu/gửi token; phần đó thuộc 001.

**Điểm chưa chốt:** Không có câu hỏi chặn expected chính.

### A-DT-006 — Email không tồn tại qua API

- **Loại:** API — âm cơ bản
- **Điều kiện chuẩn bị:** P0; D xác nhận V không tồn tại.
- **Dữ liệu nhập:** {"email":"absent-a-fr02@example.com","password":"Test1234!"}
- **Điều kiện sai duy nhất / mục đích tương tác:** Chỉ email không tồn tại.
- **EC ID:** `A-EC-E02`, `A-EC-G03`, `A-EC-O06`.
- **Requirement:** `A-R01`, `A-R03`, `A-R07`.

**Thao tác:**

1. Theo A, gửi body một lần.
2. Đọc status, lỗi và kiểm tra không có token thành công mới.

**Expected result:** Từ chối xác thực và lỗi phù hợp; không chốt counter cho V.

**Điểm chưa chốt:** Q1/Q6/Q8; không gán lớp password khớp tài khoản không tồn tại.

### A-DT-007 — Thiếu key email

- **Loại:** API — âm cơ bản, oracle chi tiết chưa chốt
- **Điều kiện chuẩn bị:** P0; U sẵn sàng, payload chỉ bỏ email.
- **Dữ liệu nhập:** {"password":"Test1234!"}
- **Điều kiện sai duy nhất / mục đích tương tác:** Chỉ thiếu email.
- **EC ID:** `A-EC-E06`, `A-EC-G03`.
- **Requirement:** `A-R01`.

**Thao tác:**

1. Theo A, gửi body giữ nguyên password, không thêm key email.
2. Ghi response và việc có/không có token thành công.

**Expected result:** Theo mô hình A-R01, payload thiếu định danh không được xác thực thành công. Status/thông báo/counter chưa được contract quy định; không tự coi một status cụ thể là bắt buộc.

**Điểm chưa chốt:** Q2/Q8; giữ password nền P, chưa xác định tài khoản ở payload.

### A-DT-008 — Email là số

- **Loại:** API — âm cơ bản, oracle chi tiết chưa chốt
- **Điều kiện chuẩn bị:** P0.
- **Dữ liệu nhập:** {"email":123,"password":"Test1234!"}
- **Điều kiện sai duy nhất / mục đích tương tác:** Chỉ kiểu email.
- **EC ID:** `A-EC-E07`, `A-EC-G03`.
- **Requirement:** `A-R01`.

**Thao tác:**

1. Theo A, gửi số 123 không có dấu nháy, giữ password chuỗi P.
2. Ghi response; không lặp thêm biến thể kiểu khác trong cùng run.

**Expected result:** Email ngoài mô hình chuỗi nên dự kiến không xác thực thành công; chưa chốt xử lý ép kiểu/status/counter. Null/object/array cần run hoặc ca riêng nếu mở rộng.

**Điểm chưa chốt:** Q2/Q8; oracle từ mô hình đầu vào, không phải schema validation chi tiết đã được đặc tả.

### A-DT-009 — Thiếu key password

- **Loại:** API — âm cơ bản, oracle chi tiết chưa chốt
- **Điều kiện chuẩn bị:** P0; U n=0.
- **Dữ liệu nhập:** {"email":"test@eshop.com"}
- **Điều kiện sai duy nhất / mục đích tương tác:** Chỉ thiếu password.
- **EC ID:** `A-EC-E01`, `A-EC-P05`, `A-EC-G03`.
- **Requirement:** `A-R01`.

**Thao tác:**

1. Theo A, gửi body chỉ có email.
2. Ghi response, quan sát counter bằng D nếu cần nhưng chưa chấm hành vi counter.

**Expected result:** Không xác thực thành công khi thiếu mật khẩu theo A-R01. Không đặt status lỗi hay số counter cụ thể.

**Điểm chưa chốt:** Q2/Q8.

### A-DT-010 — Password là null

- **Loại:** API — âm cơ bản, oracle chi tiết chưa chốt
- **Điều kiện chuẩn bị:** P0; U n=0.
- **Dữ liệu nhập:** {"email":"test@eshop.com","password":null}
- **Điều kiện sai duy nhất / mục đích tương tác:** Chỉ kiểu password.
- **EC ID:** `A-EC-E01`, `A-EC-P06`, `A-EC-G03`.
- **Requirement:** `A-R01`.

**Thao tác:**

1. Theo A, gửi null không đặt trong dấu nháy.
2. Ghi response và việc có token thành công hay không.

**Expected result:** Payload không có mật khẩu chuỗi phù hợp; dự kiến không xác thực thành công. Không chốt status/counter hoặc tự suy ra mọi kiểu sai được xử lý giống nhau.

**Điểm chưa chốt:** Q2/Q8.

### A-DT-011 — Chuỗi ba lần sai và kích hoạt khóa

- **Loại:** Web + D — tương tác trạng thái có chủ đích
- **Điều kiện chuẩn bị:** P0/W; D xác nhận n=0, chưa khóa.
- **Dữ liệu nhập:** U; Wrong123! cho từng lần.
- **Điều kiện sai duy nhất / mục đích tương tác:** Mỗi request chỉ sai password; lặp ba lần là chủ đích kiểm tra state.
- **EC ID:** `A-EC-E01`, `A-EC-P02`, `A-EC-G01`, `A-EC-N01`, `A-EC-N02`, `A-EC-N03`, `A-EC-H01`, `A-EC-O02`, `A-EC-O03`.
- **Requirement:** `A-R03`, `A-R04`, `A-R05`, `A-R06`, `A-R07`.

**Thao tác:**

1. Nhập U/Wrong123!, bấm Sign In một lần; đợi response xong, đọc D và lưu mốc giờ.
2. Giữ dữ liệu, bấm lần thứ hai; đợi response xong, đọc D và lưu mốc giờ.
3. Giữ dữ liệu, bấm lần thứ ba; đọc response/D, ghi mốc kích hoạt khóa t0 và locked_until nếu có.
4. Nếu sai khác xảy ra từ bước đầu, ghi ngay bước đó; chỉ tiếp tục quan sát chuỗi nếu an toàn, không giả định đã đạt n=1/2 đúng để chấm lớp tiếp theo.

**Expected result:** Cả ba request bị từ chối vì password sai. Sau mỗi lần counter lần lượt 1,2,3; hai lần đầu chưa khóa; lần thứ ba kích hoạt khóa 30 giây, có thông báo lỗi phù hợp. Nếu lỗi trước ngăn đạt state, phần sau chưa được kiểm chứng độc lập.

**Điểm chưa chốt:** Q4: D chỉ hỗ trợ kiểm tra cấu hình thời hạn; thời lượng thực tế cần ca 012/013 và BVA. Không suy ra runtime đúng chỉ từ locked_until.

### A-DT-012 — Mật khẩu đúng khi đang khóa

- **Loại:** Web + D — âm về trạng thái
- **Điều kiện chuẩn bị:** K độc lập: xác nhận tài khoản đang khóa; không có token cũ.
- **Dữ liệu nhập:** U/P; mục tiêu elapsed khoảng 10 giây.
- **Điều kiện sai duy nhất / mục đích tương tác:** Chỉ trạng thái khóa không cho phép; email/password đúng.
- **EC ID:** `A-EC-E01`, `A-EC-P01`, `A-EC-G01`, `A-EC-N04`, `A-EC-L02`, `A-EC-O04`.
- **Requirement:** `A-R02`, `A-R06`, `A-R07`.

**Thao tác:**

1. Chuẩn bị form U/P trước khi đến mốc; Network đã bật.
2. Tại khoảng t0+10s bấm Sign In một lần; lưu thời điểm và response.
3. Chụp lỗi; kiểm tra không có token thành công mới. Không dùng cùng chuỗi này cho ca hết khóa độc lập.

**Expected result:** Nếu request thực sự nằm trong khoảng khóa 0≤elapsed<30s, đăng nhập bị từ chối dù thông tin đúng. Không khẳng định counter tăng hoặc thời hạn được gia hạn.

**Điểm chưa chốt:** Q2/Q4/Q5; nếu không chứng minh được request đang trong cửa sổ khóa thì không chấm ca này.

### A-DT-013 — Thông tin đúng sau thời gian khóa

- **Loại:** Web + D — dương sau chuyển trạng thái
- **Điều kiện chuẩn bị:** K độc lập; không có request login nào xen giữa kích hoạt khóa và phép đo.
- **Dữ liệu nhập:** U/P; elapsed mục tiêu 40 giây.
- **Điều kiện sai duy nhất / mục đích tương tác:** Không có lỗi đầu vào.
- **EC ID:** `A-EC-E01`, `A-EC-P01`, `A-EC-G01`, `A-EC-L04`.
- **Requirement:** `A-R02`, `A-R06`.

**Thao tác:**

1. Chuẩn bị form U/P và đồng hồ đo từ t0.
2. Chờ ít nhất 40 giây kể từ mốc khóa đã ghi, không bấm login thăm dò.
3. Bấm Sign In một lần; lưu thời điểm, response và trạng thái client.

**Expected result:** Ở thời điểm >30s, khóa 30s phải hết, thông tin đúng được xác thực thành công HTTP 200/token/user. Nếu vẫn bị chặn, ghi actual và kiểm tra tiền điều kiện trước khi báo lỗi. Không dùng ca này để tuyên bố đã đo chính xác 30s.

**Điểm chưa chốt:** Q4; phải biết t0 và không có tác động gia hạn xen giữa.

### A-DT-014 — Thành công ngắt chuỗi sai

- **Loại:** Web + D — tương tác trạng thái
- **Điều kiện chuẩn bị:** P0/W; n=0, chưa khóa.
- **Dữ liệu nhập:** Chuỗi U/Wrong123! → U/P → U/Wrong123!.
- **Điều kiện sai duy nhất / mục đích tương tác:** Mỗi request âm chỉ sai password; request giữa hợp lệ.
- **EC ID:** `A-EC-E01`, `A-EC-P02`, `A-EC-P01`, `A-EC-G01`, `A-EC-H02`, `A-EC-N01`.
- **Requirement:** `A-R02`, `A-R03`, `A-R04`, `A-R05`, `A-R11`.

**Thao tác:**

1. Gửi một lần sai; đọc counter bằng D.
2. Sửa password thành P, bấm Sign In; xác nhận response thành công. Nếu bước này không thành công, dừng phần kiểm tra reset.
3. Bấm nút đăng xuất (có thể ghi Thoát), về /login.
4. Nhập U/Wrong123!, bấm một lần; đọc counter bằng D.

**Expected result:** Lần đầu sai được tính là 1; lần đúng thành công ngắt chuỗi; lần sai cuối là lần đầu của chuỗi mới, counter logic=1 và chưa khóa. Đây là diễn giải A-R11 từ “liên tiếp”, chưa phải human review đã duyệt.

**Điểm chưa chốt:** Không có câu hỏi chặn expected chính.

### A-DT-015 — Email rỗng trên Web

- **Loại:** Web — thăm dò C
- **Điều kiện chuẩn bị:** P0/W.
- **Dữ liệu nhập:** Email rỗng; P.
- **Điều kiện sai duy nhất / mục đích tương tác:** Chỉ email rỗng.
- **EC ID:** `A-EC-E04`, `A-EC-P01`.
- **Requirement:** `A-R01`, `A-R03`.

**Thao tác:**

1. Xóa hết email, nhập P; bấm Sign In một lần.
2. Ghi browser có chặn không; nếu có request thì lưu response; ghi actual theo tầng.

**Expected result:** Không có định danh đúng để đăng nhập theo mô hình; không được xác thực thành công. Chưa chốt phải chặn required tại Web hay trả lỗi API, hoặc counter ra sao.

**Điểm chưa chốt:** Q2/Q7; phần UI required chưa có expected để chấm.

### A-DT-016 — Password rỗng trên Web

- **Loại:** Web — thăm dò C
- **Điều kiện chuẩn bị:** P0/W.
- **Dữ liệu nhập:** U; password rỗng.
- **Điều kiện sai duy nhất / mục đích tương tác:** Chỉ password rỗng.
- **EC ID:** `A-EC-E01`, `A-EC-P03`.
- **Requirement:** `A-R01`, `A-R03`.

**Thao tác:**

1. Nhập U, xóa hết password, bấm Sign In một lần.
2. Ghi browser có chặn, có request login hay không; lưu phản hồi nếu có.

**Expected result:** Password rỗng không khớp P của tài khoản nền nên không đăng nhập thành công. Chưa chốt tầng validation/status/counter.

**Điểm chưa chốt:** Q2/Q7.

### A-DT-017 — Password chỉ có khoảng trắng

- **Loại:** Web — thăm dò C
- **Điều kiện chuẩn bị:** P0/W.
- **Dữ liệu nhập:** U; ba dấu cách ASCII.
- **Điều kiện sai duy nhất / mục đích tương tác:** Chỉ password không hợp lệ.
- **EC ID:** `A-EC-E01`, `A-EC-P04`.
- **Requirement:** `A-R01`, `A-R03`.

**Thao tác:**

1. Nhập U và đúng ba dấu cách vào password; bấm Sign In một lần.
2. Đọc request payload để xác nhận số dấu cách nếu request được gửi, đọc response và ghi counter bổ trợ.

**Expected result:** Không khớp P nên không đăng nhập thành công. Chưa chốt được tính là sai thông thường hay thiếu password, không chấm counter theo suy đoán.

**Điểm chưa chốt:** Q2/Q7.

### A-DT-018 — Email khác hoa/thường

- **Loại:** API — thăm dò C, tách một yếu tố
- **Điều kiện chuẩn bị:** P0; chỉ tài khoản chính xác U tồn tại, không tạo bản chữ hoa.
- **Dữ liệu nhập:** {"email":"TEST@ESHOP.COM","password":"Test1234!"}
- **Điều kiện sai duy nhất / mục đích tương tác:** Chỉ thay hoa/thường của email; không thêm khoảng trắng.
- **EC ID:** `A-EC-E05`, `A-EC-G03`.
- **Requirement:** `A-R01`, `A-R02`.

**Thao tác:**

1. Theo A, gửi body một lần.
2. Ghi response và tài khoản nếu thành công; không tự kết luận thành công hoặc bị từ chối là bug.

**Expected result:** Chưa chốt email có phân biệt hoa/thường. Thu thập hành vi để làm rõ Q7, chưa có verdict cho chính sách chuẩn hóa.

**Điểm chưa chốt:** Q7; chưa chốt expected chính.

### A-DT-019 — Email có khoảng trắng đầu/cuối

- **Loại:** API — thăm dò C, tách một yếu tố
- **Điều kiện chuẩn bị:** P0.
- **Dữ liệu nhập:** {"email":" test@eshop.com ","password":"Test1234!"}
- **Điều kiện sai duy nhất / mục đích tương tác:** Chỉ thêm khoảng trắng; không đổi hoa/thường.
- **EC ID:** `A-EC-E05`, `A-EC-G03`.
- **Requirement:** `A-R01`, `A-R02`.

**Thao tác:**

1. Theo A, gửi body giữ nguyên khoảng trắng.
2. Ghi response và định danh user nếu thành công.

**Expected result:** Chưa chốt trim email; cả chấp nhận sau trim hoặc từ chối đều cần đối chiếu quy tắc bổ sung trước verdict.

**Điểm chưa chốt:** Q7; tách khỏi 018 để không thay hai yếu tố cùng lúc.

### A-DT-020 — Validation email xen giữa hai lần sai

- **Loại:** Web + D — thăm dò chuỗi C
- **Điều kiện chuẩn bị:** P0/W; n=0.
- **Dữ liệu nhập:** U/Wrong123! → not-an-email/P → U/Wrong123!.
- **Điều kiện sai duy nhất / mục đích tương tác:** Hai request xác thực chỉ sai password; thao tác giữa chỉ sai format email.
- **EC ID:** `A-EC-E03`, `A-EC-G02`, `A-EC-H03`, `A-EC-P02`.
- **Requirement:** `A-R03`, `A-R04`, `A-R10`.

**Thao tác:**

1. Gửi U/Wrong123! một lần, ghi counter.
2. Đổi email thành not-an-email và password P; bấm Sign In; xác nhận browser chặn và không có request.
3. Nếu bước giữa thực sự bị chặn, đổi về U/Wrong123!, gửi một lần và ghi response/counter.
4. Nếu bước giữa vẫn gửi request, ghi lỗi validation và dừng kết luận cho chuỗi yêu cầu “bị browser chặn”.

**Expected result:** Bước giữa phải bị HTML5 chặn theo A-R10. Với hai request password sai, xác thực phải từ chối; chính sách bộ đếm toàn chuỗi khi xen thao tác bị chặn còn Q2, chưa gán số cuối chắc chắn.

**Điểm chưa chốt:** Q2; đây là chuỗi có chủ đích, không là ca âm cơ bản.

### A-DT-021 — Thử lại sau một request trong lúc khóa

- **Loại:** Web + D — thăm dò chuỗi C
- **Điều kiện chuẩn bị:** K độc lập, mốc t0 được lưu.
- **Dữ liệu nhập:** U/P tại khoảng 10s và khoảng 40s.
- **Điều kiện sai duy nhất / mục đích tương tác:** Trạng thái khóa là yếu tố xét; thông tin đều đúng.
- **EC ID:** `A-EC-N04`, `A-EC-L02`, `A-EC-H04`.
- **Requirement:** `A-R06`, `A-R07`.

**Thao tác:**

1. Chuẩn bị form U/P; bấm tại t0+10s, ghi response và state D.
2. Giữ chuỗi, đến t0+40s bấm U/P lần nữa; ghi response và thời hạn đang lưu.

**Expected result:** Request tại 10s phải bị chặn. Kết quả request 40s chưa chốt vì chưa biết lần thử trong khóa có gia hạn hay không. Không dùng ca này thay cho 013.

**Điểm chưa chốt:** Q2/Q4/Q5; chỉ checkpoint đầu có expected xác định nếu đo đúng cửa sổ.

### A-DT-022 — Sai mật khẩu sau khi khóa cũ hết

- **Loại:** Web + D — thăm dò C
- **Điều kiện chuẩn bị:** K độc lập; không request xen giữa.
- **Dữ liệu nhập:** U/Wrong123! tại khoảng t0+40s.
- **Điều kiện sai duy nhất / mục đích tương tác:** Chỉ password sai tại lúc đáng lẽ khóa cũ đã hết.
- **EC ID:** `A-EC-N05`, `A-EC-H05`, `A-EC-P02`.
- **Requirement:** `A-R03`, `A-R06`.

**Thao tác:**

1. Chờ 40s từ t0, không thăm dò login.
2. Nhập U/Wrong123!, bấm Sign In một lần.
3. Lưu response; đọc counter/locked_until để mô tả trạng thái sau đó.

**Expected result:** Không đăng nhập thành công vì password sai. Counter reset/giữ, có kích hoạt khóa mới hay không chưa chốt. Nếu runtime khóa cũ chưa hết vì lỗi thời lượng, ghi tiền điều kiện chưa đạt thay vì khẳng định đã phủ N05.

**Điểm chưa chốt:** Q3/Q4; không có expected chắc chắn cho counter sau hết khóa.

### A-DT-023 — Token cũ không chứng minh lần login sai thành công

- **Loại:** Web — âm với token nền hợp lệ
- **Điều kiện chuẩn bị:** Login đúng như 001 để có token T; dùng đúng tài khoản đã xác thực; không đăng xuất.
- **Dữ liệu nhập:** Token T hợp lệ đang lưu; U/Wrong123!.
- **Điều kiện sai duy nhất / mục đích tương tác:** Chỉ password mới sai; token cũ hợp lệ.
- **EC ID:** `A-EC-E01`, `A-EC-P02`, `A-EC-T02`, `A-EC-G01`.
- **Requirement:** `A-R03`, `A-R07`.

**Thao tác:**

1. Ghi token T cục bộ để so sánh, không đưa token đầy đủ vào ảnh công khai.
2. Mở /login trực tiếp mà không đăng xuất, xác nhận T vẫn tồn tại; nếu app không cho vào form, ghi chưa thể thực hiện đường UI này.
3. Nhập U/Wrong123!, bấm Sign In; chỉ đọc response POST login mới và token trước/sau.

**Expected result:** Request sai bị từ chối, không cấp token thành công mới. Có thể token T vẫn còn: không coi đó là login sai được chấp nhận. Chính sách giữ/xóa T chưa được yêu cầu quy định.

**Điểm chưa chốt:** Q9; không bắt buộc xóa phiên cũ.

### A-DT-024 — Login đúng khi client có token sai dạng

- **Loại:** Web — thăm dò C có fixture client
- **Điều kiện chuẩn bị:** P0/W; mở DevTools tại /login. Tạo fixture chỉ trên client, không sửa mã nguồn.
- **Dữ liệu nhập:** Token cũ not-a-jwt; U/P.
- **Điều kiện sai duy nhất / mục đích tương tác:** Chỉ state token cũ sai dạng; thông tin login đúng.
- **EC ID:** `A-EC-E01`, `A-EC-P01`, `A-EC-T03`.
- **Requirement:** `A-R02`, `A-R08`, `A-R09`.

**Thao tác:**

1. Trong Application/Storage → Local Storage localhost:5173, đặt key token thành not-a-jwt; ghi đây là fixture.
2. Không reload; nhập U/P và bấm Sign In. Kiểm tra token sai thực sự còn tại lúc gửi; nếu app đã xóa nó, ghi tiền điều kiện khác.
3. Đọc response login; kiểm tra token mới được lưu và header của request cần xác thực như 001.
4. Sau khi thu bằng chứng, đăng xuất/xóa fixture token; không dùng state này cho ca tiếp theo.

**Expected result:** Theo A-R02, thông tin đúng và không khóa phải được xét thành công; token mới được lưu/gửi đúng. Chính sách tự xóa/giữ token sai trước login còn Q9; không chấm toàn bộ JWT security hoặc ép app phải giữ token sai.

**Điểm chưa chốt:** Q9; fixture Local Storage dựa vào code để thao tác, không phải nơi lưu bắt buộc của SRS.

## 3. Truy vết lớp tương đương và giới hạn độ phủ

Bảng này là độ phủ **thiết kế dự kiến**, không phải độ phủ thực thi. EC thuộc ca thăm dò chưa có oracle hoàn chỉnh vẫn phải ghi hạn chế; không tuyên bố đã phủ xác định 100%.

| EC ID | Ca liên quan | Lưu ý |
|---|---|---|
| A-EC-E01 | A-DT-001, A-DT-002, A-DT-005, A-DT-009, A-DT-010, A-DT-011, A-DT-012, A-DT-013, A-DT-014, A-DT-016, A-DT-017, A-DT-023, A-DT-024 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-E02 | A-DT-003, A-DT-006 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-E03 | A-DT-004, A-DT-020 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-E04 | A-DT-015 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-E05 | A-DT-018, A-DT-019 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-E06 | A-DT-007 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-E07 | A-DT-008 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-P01 | A-DT-001, A-DT-004, A-DT-005, A-DT-012, A-DT-013, A-DT-014, A-DT-015, A-DT-024 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-P02 | A-DT-002, A-DT-011, A-DT-014, A-DT-020, A-DT-022, A-DT-023 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-P03 | A-DT-016 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-P04 | A-DT-017 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-P05 | A-DT-009 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-P06 | A-DT-010 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-G01 | A-DT-001, A-DT-002, A-DT-003, A-DT-011, A-DT-012, A-DT-013, A-DT-014, A-DT-023 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-G02 | A-DT-004, A-DT-020 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-G03 | A-DT-005, A-DT-006, A-DT-007, A-DT-008, A-DT-009, A-DT-010, A-DT-018, A-DT-019 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-N01 | A-DT-002, A-DT-011, A-DT-014 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-N02 | A-DT-011 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-N03 | A-DT-011 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-N04 | A-DT-012, A-DT-021 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-N05 | A-DT-022 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-L01 | A-DT-001, A-DT-005 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-L02 | A-DT-012, A-DT-021 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-L03 | Chưa có — dành cho BVA | Chuyển sang 04-boundary-cases.md: cần phép đo tại đúng 30s; chưa có ca Domain kiểm chứng lớp này. |
| A-EC-L04 | A-DT-013 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-H01 | A-DT-011 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-H02 | A-DT-014 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-H03 | A-DT-020 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-H04 | A-DT-021 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-H05 | A-DT-022 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-T01 | A-DT-001 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-T02 | A-DT-023 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-T03 | A-DT-024 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-O01 | A-DT-001 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-O02 | A-DT-002, A-DT-011 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-O03 | A-DT-011 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-O04 | A-DT-012 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-O05 | A-DT-004 | Theo expected và giới hạn ở từng ca; chưa chạy. |
| A-EC-O06 | A-DT-003, A-DT-006 | Theo expected và giới hạn ở từng ca; chưa chạy. |

### Cách tránh đếm sai hoặc tạo kết luận vượt bằng chứng

- Có 24 TC ID trong file này, gồm ca chính và ca thăm dò/chỉ có expected một phần. Chưa có ca nào được thực thi hoặc human review. Số thiết kế này chưa tự động trở thành số liệu đã duyệt trong README.
- N02/N03 có checkpoint trong chuỗi 011. Nếu lỗi sớm làm state lệch, checkpoint phía sau không chứng minh đã kiểm tra độc lập đúng lớp N02/N03; cần ca/fixture bổ trợ khi review. Không sửa SUT để che lỗi.
- E05 được xét bằng hai biến thể 018/019: thay hoa/thường và khoảng trắng riêng, tránh thay hai yếu tố cùng lúc. E07/P06 dùng một đại diện mỗi nhóm, không khẳng định mọi kiểu sai tương đương khi chưa kiểm tra rủi ro ép kiểu.
- Ca 003/006 dùng V không tồn tại: không thể gọi password là “đúng cho V”. Giá trị P được giữ cố định để chỉ thay yếu tố định danh. Kết quả lớp E02 là trọng tâm.
- G01 ở ca âm là đường gửi Web khi browser cho submit, không khẳng định cả lần xác thực hợp lệ. O01 được kiểm tra đầy đủ ở ca 001 (UI + token/header); ca API 005 chỉ chứng minh phần response.
- L03 được hoãn công khai sang BVA, không thao tác bằng tay rồi tuyên bố chính xác đúng 30 giây. Q1–Q9 vẫn giữ trạng thái chưa được làm rõ như requirements; không tự gán status lỗi, câu thông báo, cơ chế chuẩn hóa hoặc TTL.
- Với A-R07, lưu thông báo UI/API; ghi bằng chứng nếu lộ chi tiết nhạy cảm nhưng không tự kết luận mọi khác biệt câu chữ là bug. Review sẽ chốt oracle chi tiết nếu cần.

## 4. Bước tiếp theo

Tạo `04-boundary-cases.md` cho số lần sai và thời gian khóa, rồi review cả bộ thiết kế trước khi thực thi. Khi review, ưu tiên kiểm tra fixture/reset, tính độc lập của ca, oracle còn thiếu và cách thu bằng chứng token/thời gian. Không điền sẵn actual hoặc Pass/Fail vào bộ thiết kế.

## File: features/A-FR02/04-boundary-cases.md

# A-FR02 — Boundary Value Analysis (BVA)

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2.

**Trạng thái:** Thiết kế ở bước 5.4, toàn bộ ca **Not run**. Ngày 15/10/2026, sinh viên phản hồi đã đọc và hiểu các ca kiểm thử. Chưa có xác nhận phê duyệt phép đo/expected, actual, Pass/Fail hoặc bug. Không chạy hoặc chỉnh SUT trong lượt tạo tài liệu này.

## 1. Nguồn và cách chọn biên

- [Requirements](01-requirements.md): A-R02–A-R07, A-R11; đặc biệt Q2–Q5 về bộ đếm, hết khóa và phép đo.
- [Các lớp tương đương](02-domains.md): N01–N05, L01–L04, H01/H02; L03 đúng 30s được thiết kế ở đây.
- [Ca Domain](03-domain-cases.md): thủ tục P0/W/D/A/K để chuẩn bị, thao tác Web/API và quan sát state.
- [Slide VN](../../slide/domain-testing-vn.pdf), trang 19–26: xét miền có thứ tự, các giá trị sát biên trong/ngoài miền; [slide EN](../../slide/domain-testing-en.pdf), trang 34–37: lỗi điều kiện biên và lựa chọn điểm.
- SRS FR-02 tại baseline `85af3ba875c88283615e22cb108f13e2fccaf0e9`: sai liên tiếp từ 3 lần thì khóa 30 giây. Code chỉ giúp tìm điểm quan sát, không thay expected 3 lần/30 giây bằng hành vi triển khai.

| Biến | Định nghĩa | Biên và điểm chọn | Lý do |
|---|---|---|---|
| k | Số request nhập sai password đã gửi trong một chuỗi mới, không có đăng nhập thành công xen giữa | Ngưỡng 3; chọn 2, 3, 4. Thêm 0, 1 | Phân biệt trước/đến/sau ngưỡng và lỗi tăng counter ngay lần đầu |
| n | Counter phía hệ thống, đọc trước/sau request | Kỳ vọng n=k trước/khi kích hoạt khóa | Không đồng nhất k với n nếu ứng dụng tăng sai; không tự bắt n=4 cho request bị khóa |
| elapsed | Thời gian server xét request kể từ lúc kích hoạt khóa t0 | 29s, 30s, 31s; thêm 10s, 40s | Kiểm tra trong khoảng, đúng lúc hết và ngoài khoảng khóa |
| elapsed ở đồng hồ kiểm soát | Thời gian giả lập ở điểm kiểm tra khóa trong bản chạy tách biệt | 29.999s, 30.000s, 30.001s nếu harness thực sự hỗ trợ tick 1ms | Phân biệt toán tử so sánh sát mốc; không gán độ chính xác ms cho bấm tay |

**Điểm quan trọng về lần thứ 4:** lần nhập sai thứ 4 được gửi ngay khi tài khoản đang khóa. Expected là không được đăng nhập; chưa biết counter có tăng/gia hạn hay không (Q2/Q5). Không gọi đây là trạng thái “đã xác thực sai 4 lần nhưng chưa khóa”.

Không áp máy móc công thức Standard 4n+1 hoặc Robust 6n+1: bộ đếm và thời gian là biến trạng thái phụ thuộc nhau, không phải hai khoảng số độc lập có đủ LB/UB. Chọn quanh từng ngưỡng, giữ thông tin đăng nhập và tiền điều kiện còn lại cố định. Không tạo giới hạn password/email tùy ý để có thêm BVA.

## 2. Chuẩn bị riêng cho mỗi ca

1. Backend/Web đã chạy; ghi baseline, môi trường và Run ID. Lưu ảnh/log trong `evidence/A-FR02/<TC-ID>/<Run-ID>/` khi thực thi sau này.
2. Mỗi ca dùng một tài khoản test riêng hoặc một lần reset fixture riêng được ghi nhận. Tài khoản có email tồn tại, password đúng P=`Test1234!`, n=0, không khóa. Email ví dụ `bva001-run001@example.com` là dữ liệu **dự kiến**, chưa tạo. Nếu dùng U=`test@eshop.com`, phải chứng minh state sạch trước mỗi ca; không dựa vào reload/đăng xuất để reset server.
3. Dùng thủ tục D chỉ đọc của 03-domain-cases.md để xem state; thay email truy vấn bằng tài khoản của ca. Đọc sau khi DB update đã hoàn tất; nếu response đã về nhưng state chưa ổn định, ghi thời điểm quan sát và chờ state hoàn tất, không tự tăng counter bằng tay.
4. Tài khoản mới/reset do setup riêng chuẩn bị, không qua việc sửa logic login. Nếu cần SQL fixture, phải có before/after, phạm vi tài khoản cụ thể và cách khôi phục được review trước. Tài liệu này không tự thực hiện SQL ghi.
5. Với ca thời gian, kích hoạt khóa bằng chuỗi sai tự nhiên, ghi mỗi request và state. Không gọi API login thăm dò trong lúc chờ: request đó có thể tác động thời hạn khóa chưa rõ ở Q5.
6. Không dùng chung một lần khóa để thử lần lượt 29/30/31s. Mỗi điểm có tài khoản/chuỗi khóa độc lập. Một lần login đúng có thể reset state, làm phép thử sau mất ý nghĩa.
7. Nếu ứng dụng khóa sớm hoặc counter tăng sai khi setup, ghi lỗi tại bước có bằng chứng; không giả vờ đã đạt tiền điều kiện đúng. Có thể đo thời lượng từ mốc khóa **thực tế** như kiểm tra chẩn đoán riêng, nêu rõ khác luồng chuẩn. Phần kiểm tra phụ thuộc ngưỡng đúng vẫn chưa được chứng minh.
8. Không restart backend giữa ca: import database.js seed lại DB. Cleanup chỉ sau khi đã giữ bằng chứng, không reset dữ liệu chung chưa được sao lưu.

Mật khẩu sai dùng W=`Wrong123!`. Khi kiểm tra số lần sai, chỉ password sai. Khi kiểm tra thời gian, email/password đều đúng; chỉ thay thời điểm. Chuỗi sai dùng để setup khóa không phải ca âm đa điều kiện.

## 3. Đo thời gian trung thực

### 3.1 Chạy baseline thật: đo khoảng, không giả độ chính xác

Dùng script/harness tuần tự (sẽ tạo ở bước hỗ trợ thực thi), đồng hồ monotonic để đo elapsed; đồng thời ghi UTC cho nhật ký. Ghi t_send và t_receive cho request kích hoạt khóa, request thử login. Không dùng giờ trên thanh desktop, thời gian sleep yêu cầu hoặc HTTP Date làm bằng chứng server xử lý đúng mốc.

Nếu cùng client đo được:

- Request kích hoạt khóa được gửi tại `a`, response về tại `b`.
- Request thử đăng nhập được gửi tại `c`, response về tại `d`.
- Nếu mốc kích hoạt và điểm kiểm tra thực sự nằm trong hai khoảng xử lý tương ứng, elapsed server nằm trong khoảng bảo thủ **[c−b, d−a]**.

Dùng đơn vị giây và cùng nguồn monotonic cho a,b,c,d. Điều kiện của phép chặn khoảng phải được xác nhận: response được nhận sau mốc đang xét, không retry ngầm, không có request cạnh tranh; chưa xác nhận thì không dùng công thức như chứng cứ chắc chắn.

| Khoảng đo thu được | Có thể kết luận về miền? |
|---|---|
| Cận dưới ≥0 và cận trên <30s | Có thể xác định request được xét trong khoảng khóa |
| Cận dưới >30s | Có thể xác định request được xét sau 30s |
| Khoảng chứa/cắt mốc 30s | Chưa phân biệt trước/đúng/sau; không chấm Pass/Fail cho checkpoint đúng biên |

Ví dụ **minh họa, không phải kết quả đo**: khoảng [28.98,29.06]s hỗ trợ “trước 30s”; khoảng [30.96,31.08]s hỗ trợ “sau 30s”; khoảng [29.97,30.05]s không chứng minh đúng 30s. Sai số thực tế phải tính từ log, không mặc định ±0.01s hoặc ±1ms.

Lập lịch gửi gần mục tiêu 29/31s bằng monotonic; sau response tính khoảng thực tế rồi gắn nhãn đúng mức. Nếu lệch, ghi “mục tiêu 29s, miền quan sát trước 30s”, không nói đã đo chính xác 29.000s. Request sleep 30s rồi gửi thường được xử lý muộn hơn 30s, không đủ phủ L03.

Mốc t0 không được lấy bằng `locked_until−30s`: cách đó đã giả định điều đang kiểm thử là đúng. Dữ liệu locked_until chỉ là bằng chứng bổ trợ. Độ dài khóa thực tế cần kiểm tra bằng hành vi, không chỉ nhìn timestamp lưu trong DB.

### 3.2 Kiểm tra đúng 30s: cần đồng hồ kiểm soát ở server

Để thực sự đánh giá L03, dùng harness có khả năng điều khiển thời gian tại **điểm server so sánh khóa**, trên bản sao SUT và DB riêng. Đây là kế hoạch, chưa có harness được tạo/chạy.

1. Lưu commit baseline và mọi patch của harness; chỉ can thiệp nguồn thời gian/ghi quan sát, không sửa ngưỡng 3, thời lượng 30s, toán tử so sánh hoặc nhánh login. Giữ server Web đang dùng nguyên trạng.
2. Đồng bộ các API thời gian liên quan (`Date.now()` và `new Date()` hoặc clock abstraction thực tế); đặt mốc kích hoạt là T0 và chờ ghi DB hoàn tất. Đặt đồng hồ đúng tại phép xét request, không chỉ tại lúc client gửi.
3. Chạy chuỗi khóa tự nhiên với logic baseline. Ở bản sao độc lập, thử T0+30.000s. Nếu lỗi ngưỡng trước đó ngăn setup chuẩn, ghi giới hạn; phép đo từ khóa thực tế là chẩn đoán, không thay bằng chứng ngưỡng đúng.
4. Muốn kiểm riêng toán tử hết hạn trong khi thời lượng tạo khóa bị sai, có thể dùng **fixture bổ trợ** với hạn hết T0+30s và n=3, rồi thử trước/đúng/sau hạn. Ghi rõ fixture này bỏ qua logic tạo khóa, không chứng minh baseline tự tạo khóa 30s.
5. Lưu giá trị clock ở chính điểm so sánh, clock resolution, request/response, state và patch. Với tick 1ms, đó là độ phân giải mô phỏng, không phải độ chính xác hạ tầng thật.

Nếu chưa có harness/không quan sát được điểm so sánh, ca đúng 30s vẫn **Not run** hoặc **Blocked vì giới hạn phép đo** khi đã cố thực hiện. Không đổi expected sang 31s, không tự đánh dấu Pass. Log thêm từ server cũng chỉ giúp nếu thời điểm đo đúng chỗ; log trước handler không chứng minh thời điểm so sánh.

## 4. Các ca biên

Các bước setup và đo ở mục 2–3 là một phần của từng ca. API là kênh chính để điều khiển tuần tự/thời gian; đối chiếu UI ở ca thích hợp bằng trình duyệt, không suy ra UI đúng từ API. Dùng POST `/api/login`, body `{"email":"<tài khoản riêng>","password":"<P hoặc W>"}` theo thủ tục A trong 03-domain-cases.md.

### A-BV-001 — Không có lần sai trước đăng nhập đúng

- **Điểm biên/đại diện:** k=0.
- **Chuẩn bị:** Tài khoản riêng n=0, không khóa; client sạch.
- **Dữ liệu:** email tài khoản riêng của ca; P=`Test1234!`, W=`Wrong123!`; chọn đúng P/W theo từng bước.
- **EC ID:** `A-EC-L01`, `A-EC-E01`, `A-EC-P01`.
- **Requirement:** `A-R02`, `A-R05`.

**Thao tác:**

1. Mở /login, nhập email của ca và P; mở Network.
2. Bấm Sign In một lần; lưu response và state sau khi xử lý hoàn tất.

**Expected result:** Đăng nhập thành công HTTP 200/token/user; không bị khóa bởi một chuỗi sai chưa tồn tại. Đây là điểm nền cho biến đếm.

**Giới hạn/điểm chưa rõ:** Không coi đây là kiểm tra toàn bộ luồng token/header; Domain 001 phụ trách phần đó.

### A-BV-002 — Một lần sai đầu tiên

- **Điểm biên/đại diện:** k=1.
- **Chuẩn bị:** Tài khoản riêng n=0, chưa khóa.
- **Dữ liệu:** email tài khoản riêng của ca; P=`Test1234!`, W=`Wrong123!`; chọn đúng P/W theo từng bước.
- **EC ID:** `A-EC-N01`, `A-EC-P02`, `A-EC-O02`.
- **Requirement:** `A-R03`, `A-R04`, `A-R05`.

**Thao tác:**

1. Theo A, gửi email đúng/W một lần; chờ response và DB ổn định.
2. Đọc D, lưu n và trạng thái khóa; không login đúng để thăm dò.

**Expected result:** Từ chối, n từ 0 thành 1, chưa kích hoạt khóa; chỉ password sai.

**Giới hạn/điểm chưa rõ:** Không dùng response lỗi đơn thuần để kết luận counter tăng đúng.

### A-BV-003 — Ngay dưới ngưỡng khóa

- **Điểm biên/đại diện:** k=2.
- **Chuẩn bị:** Tài khoản riêng n=0, chưa khóa.
- **Dữ liệu:** email tài khoản riêng của ca; P=`Test1234!`, W=`Wrong123!`; chọn đúng P/W theo từng bước.
- **EC ID:** `A-EC-N01`, `A-EC-N02`, `A-EC-P02`.
- **Requirement:** `A-R02`, `A-R03`, `A-R04`, `A-R05`.

**Thao tác:**

1. Gửi email đúng/W lần 1, chờ hoàn tất, đọc n.
2. Gửi lần 2 tuần tự, đọc n/locked_until và response.
3. Để kiểm tra chưa bị khóa trên hành vi, gửi P đúng một lần sau khi đã giữ state sau lần sai thứ 2; đây là bước cuối của ca, không tái dùng state.

**Expected result:** Sau hai lần sai, n=2 và chưa khóa. Request P đúng cuối được đăng nhập thành công. Nếu bước đầu lệch, ghi lỗi sớm và giới hạn checkpoint ngưỡng.

**Giới hạn/điểm chưa rõ:** Thăm dò đúng làm reset chuỗi; tuyệt đối không nối ca k=3 vào tài khoản này.

### A-BV-004 — Đúng ngưỡng khóa

- **Điểm biên/đại diện:** k=3.
- **Chuẩn bị:** Tài khoản riêng n=0, chưa khóa.
- **Dữ liệu:** email tài khoản riêng của ca; P=`Test1234!`, W=`Wrong123!`; chọn đúng P/W theo từng bước.
- **EC ID:** `A-EC-N01`, `A-EC-N02`, `A-EC-N03`, `A-EC-H01`, `A-EC-O03`, `A-EC-L02`.
- **Requirement:** `A-R03`, `A-R04`, `A-R05`, `A-R06`.

**Thao tác:**

1. Gửi 3 request email đúng/W tuần tự; sau mỗi request ghi response và D.
2. Lưu mốc request đầu tiên kích hoạt khóa và counter sau lần 3.
3. Nếu setup đạt khóa, gửi P đúng trong khoảng xác minh được <30s để kiểm tra bị chặn; lưu riêng thời điểm.

**Expected result:** Counter đi 1→2→3; khóa kích hoạt ở lần thứ 3. Trong khoảng khóa, P đúng bị chặn. Thời lượng 30s được kiểm tra bằng ca thời gian riêng.

**Giới hạn/điểm chưa rõ:** Nếu khóa ở lần 2, đó là sai expected ngưỡng nếu có bằng chứng, không gọi request thứ 3 là lần xác thực sai hợp lệ tiếp theo.

### A-BV-005 — Request sai thứ tư trong lúc khóa

- **Điểm biên/đại diện:** k=4 request sai đã gửi.
- **Chuẩn bị:** Tài khoản riêng; đã chuẩn bị 3 lần sai tự nhiên, xác nhận đang khóa và thời điểm thử thứ 4 vẫn <30s.
- **Dữ liệu:** email tài khoản riêng của ca; P=`Test1234!`, W=`Wrong123!`; chọn đúng P/W theo từng bước.
- **EC ID:** `A-EC-N04`, `A-EC-P02`, `A-EC-O04`.
- **Requirement:** `A-R03`, `A-R05`, `A-R06`, `A-R07`.

**Thao tác:**

1. Gửi email đúng/W lần thứ tư một lần khi đã khóa; không thay email hoặc payload type.
2. Lưu response, thời điểm và D trước/sau; không gửi thêm probe đúng.

**Expected result:** Request thứ tư bị từ chối; tài khoản vẫn không được đăng nhập trong thời gian khóa. Không bắt buộc n=4: request bị khóa có thể không được tính là lần xác thực sai.

**Giới hạn/điểm chưa rõ:** Q2/Q5: counter sau request/gia hạn chưa chốt. Nếu 3 lần sai không tạo đúng state, chưa chứng minh checkpoint sau ngưỡng chuẩn.

### A-BV-006 — Đăng nhập đúng tại mục tiêu 29 giây

- **Điểm biên/đại diện:** elapsed=29s.
- **Chuẩn bị:** Một tài khoản/chuỗi khóa riêng cho ca; email/password đúng; không request xen giữa setup và probe.
- **Dữ liệu:** email tài khoản riêng của ca; P=`Test1234!`, W=`Wrong123!`; chọn đúng P/W theo từng bước.
- **EC ID:** `A-EC-L02`, `A-EC-P01`, `A-EC-O04`.
- **Requirement:** `A-R02`, `A-R06`, `A-R07`.

**Thao tác:**

1. Chuẩn bị khóa riêng theo mục 2, ghi a/b của request kích hoạt khóa; không gửi request xen.
2. Lập lịch một request email đúng/P gần mục tiêu 29s; lưu c/d bằng monotonic.
3. Tính khoảng elapsed theo mục 3.1; đối chiếu miền trước/sau 30s, lưu response và state.

**Expected result:** Request nằm trong [0,30)s phải bị chặn dù P đúng; không cấp token thành công mới.

**Giới hạn/điểm chưa rõ:** Ghi khoảng đo thực tế, không khẳng định đúng số giây mục tiêu. Khoảng cắt 30s: checkpoint thời gian chưa kết luận; nếu khóa sớm trong setup phải ghi chẩn đoán từ mốc thực, không che lỗi ngưỡng.

### A-BV-007 — Đăng nhập đúng tại mục tiêu 30 giây

- **Điểm biên/đại diện:** elapsed=30s.
- **Chuẩn bị:** Một tài khoản/chuỗi khóa riêng cho ca; email/password đúng; không request xen giữa setup và probe.
- **Dữ liệu:** email tài khoản riêng của ca; P=`Test1234!`, W=`Wrong123!`; chọn đúng P/W theo từng bước.
- **EC ID:** `A-EC-L03`, `A-EC-P01`.
- **Requirement:** `A-R02`, `A-R06`.

**Thao tác:**

1. Chuẩn bị chuỗi khóa riêng và T0 theo harness mục 3.2, giữ code login baseline.
2. Đặt clock tại điểm kiểm tra khóa bằng T0+30.000s; gửi email đúng/P.
3. Lưu giá trị clock thực tại phép so sánh, response, state, patch harness và loại setup tự nhiên/fixture.

**Expected result:** Tại đúng 30s kể từ kích hoạt, thời hạn khóa 30s đã hết; P đúng được xác thực thành công 200/token/user. Diễn giải theo A-R06, Q4 cần phương pháp đo phù hợp.

**Giới hạn/điểm chưa rõ:** Chỉ có verdict tại đúng mốc nếu harness đạt điều kiện 3.2. Sleep 30s/bấm tay không đủ; không có harness thì chưa kiểm chứng L03.

### A-BV-008 — Đăng nhập đúng tại mục tiêu 31 giây

- **Điểm biên/đại diện:** elapsed=31s.
- **Chuẩn bị:** Một tài khoản/chuỗi khóa riêng cho ca; email/password đúng; không request xen giữa setup và probe.
- **Dữ liệu:** email tài khoản riêng của ca; P=`Test1234!`, W=`Wrong123!`; chọn đúng P/W theo từng bước.
- **EC ID:** `A-EC-L04`, `A-EC-P01`.
- **Requirement:** `A-R02`, `A-R06`.

**Thao tác:**

1. Chuẩn bị khóa riêng theo mục 2, ghi a/b của request kích hoạt khóa; không gửi request xen.
2. Lập lịch một request email đúng/P gần mục tiêu 31s; lưu c/d bằng monotonic.
3. Tính khoảng elapsed theo mục 3.1; đối chiếu miền trước/sau 30s, lưu response và state.

**Expected result:** Request nằm sau 30s, không có gia hạn xen giữa: khóa cũ hết và P đúng được xác thực thành công 200/token/user.

**Giới hạn/điểm chưa rõ:** Ghi khoảng đo thực tế, không khẳng định đúng số giây mục tiêu. Khoảng cắt 30s: checkpoint thời gian chưa kết luận; nếu khóa sớm trong setup phải ghi chẩn đoán từ mốc thực, không che lỗi ngưỡng.

### A-BV-009 — Đăng nhập đúng tại mục tiêu 10 giây

- **Điểm biên/đại diện:** elapsed=10s.
- **Chuẩn bị:** Một tài khoản/chuỗi khóa riêng cho ca; email/password đúng; không request xen giữa setup và probe.
- **Dữ liệu:** email tài khoản riêng của ca; P=`Test1234!`, W=`Wrong123!`; chọn đúng P/W theo từng bước.
- **EC ID:** `A-EC-L02`, `A-EC-P01`, `A-EC-O04`.
- **Requirement:** `A-R02`, `A-R06`, `A-R07`.

**Thao tác:**

1. Chuẩn bị khóa riêng theo mục 2, ghi a/b của request kích hoạt khóa; không gửi request xen.
2. Lập lịch một request email đúng/P gần mục tiêu 10s; lưu c/d bằng monotonic.
3. Tính khoảng elapsed theo mục 3.1; đối chiếu miền trước/sau 30s, lưu response và state.

**Expected result:** Request nằm trong [0,30)s phải bị chặn dù P đúng; không cấp token thành công mới.

**Giới hạn/điểm chưa rõ:** Ghi khoảng đo thực tế, không khẳng định đúng số giây mục tiêu. Khoảng cắt 30s: checkpoint thời gian chưa kết luận; nếu khóa sớm trong setup phải ghi chẩn đoán từ mốc thực, không che lỗi ngưỡng.

### A-BV-010 — Đăng nhập đúng tại mục tiêu 40 giây

- **Điểm biên/đại diện:** elapsed=40s.
- **Chuẩn bị:** Một tài khoản/chuỗi khóa riêng cho ca; email/password đúng; không request xen giữa setup và probe.
- **Dữ liệu:** email tài khoản riêng của ca; P=`Test1234!`, W=`Wrong123!`; chọn đúng P/W theo từng bước.
- **EC ID:** `A-EC-L04`, `A-EC-P01`.
- **Requirement:** `A-R02`, `A-R06`.

**Thao tác:**

1. Chuẩn bị khóa riêng theo mục 2, ghi a/b của request kích hoạt khóa; không gửi request xen.
2. Lập lịch một request email đúng/P gần mục tiêu 40s; lưu c/d bằng monotonic.
3. Tính khoảng elapsed theo mục 3.1; đối chiếu miền trước/sau 30s, lưu response và state.

**Expected result:** Request nằm sau 30s, không có gia hạn xen giữa: khóa cũ hết và P đúng được xác thực thành công 200/token/user.

**Giới hạn/điểm chưa rõ:** Ghi khoảng đo thực tế, không khẳng định đúng số giây mục tiêu. Khoảng cắt 30s: checkpoint thời gian chưa kết luận; nếu khóa sớm trong setup phải ghi chẩn đoán từ mốc thực, không che lỗi ngưỡng.

### A-BV-011 — Sát mốc hết khóa ở 29.999s

- **Điểm biên/đại diện:** elapsed=29.999s (tick giả lập 1ms).
- **Chuẩn bị:** Bản sao và harness mục 3.2; mỗi ca state riêng. Chỉ dùng nếu clock và phép so sánh thật sự hỗ trợ độ phân giải 1ms.
- **Dữ liệu:** email tài khoản riêng của ca; P=`Test1234!`, W=`Wrong123!`; chọn đúng P/W theo từng bước.
- **EC ID:** `A-EC-L02`, `A-EC-P01`.
- **Requirement:** `A-R06`.

**Thao tác:**

1. Chuẩn bị khóa tự nhiên trên bản sao hoặc fixture toán tử riêng có khai báo; ghi phương án.
2. Đặt clock ở điểm kiểm tra bằng T0+29.999s, gửi email đúng/P một lần.
3. Lưu clock thực tại so sánh và response; không dùng sleep thực 1ms để thay việc điều khiển clock.

**Expected result:** Trước mốc 30s, đăng nhập đúng vẫn bị chặn.

**Giới hạn/điểm chưa rõ:** Đây là ca bổ sung phụ thuộc harness, không phải độ chính xác đã đo trên môi trường thật. Fixture chỉ kiểm toán tử hết hạn, không chứng minh logic tạo khóa.

### A-BV-012 — Sát mốc hết khóa ở 30.001s

- **Điểm biên/đại diện:** elapsed=30.001s (tick giả lập 1ms).
- **Chuẩn bị:** Bản sao và harness mục 3.2; mỗi ca state riêng. Chỉ dùng nếu clock và phép so sánh thật sự hỗ trợ độ phân giải 1ms.
- **Dữ liệu:** email tài khoản riêng của ca; P=`Test1234!`, W=`Wrong123!`; chọn đúng P/W theo từng bước.
- **EC ID:** `A-EC-L04`, `A-EC-P01`.
- **Requirement:** `A-R02`, `A-R06`.

**Thao tác:**

1. Chuẩn bị khóa tự nhiên trên bản sao hoặc fixture toán tử riêng có khai báo; ghi phương án.
2. Đặt clock ở điểm kiểm tra bằng T0+30.001s, gửi email đúng/P một lần.
3. Lưu clock thực tại so sánh và response; không dùng sleep thực 1ms để thay việc điều khiển clock.

**Expected result:** Sau mốc 30s, khóa hết; đăng nhập đúng thành công 200/token/user.

**Giới hạn/điểm chưa rõ:** Đây là ca bổ sung phụ thuộc harness, không phải độ chính xác đã đo trên môi trường thật. Fixture chỉ kiểm toán tử hết hạn, không chứng minh logic tạo khóa.

## 5. Truy vết và cách đánh giá sau khi chạy

| Điểm cần phủ | Ca | Ý nghĩa và điều kiện |
|---|---|---|
| k=0/1 | A-BV-001/002 | Nền và tăng đúng 1 |
| k=2/3/4 | A-BV-003/004/005 | Trước ngưỡng, kích hoạt khóa, thử tiếp trong khóa |
| 29/30/31s | A-BV-006/007/008 | Trước/đúng/sau mốc; 007 cần clock kiểm soát |
| 10/40s | A-BV-009/010 | Đại diện miền cách xa biên để đối chiếu |
| 29.999/30.001s | A-BV-011/012 | Bổ sung sát biên trên harness 1ms nếu khả thi |
| A-EC-L03 | A-BV-007 | Lớp đã hoãn từ Domain; mới có thiết kế, chưa có bằng chứng thực thi |

- Có **12 ca thiết kế**, không phải 12 ca đã chạy. Các ca 007/011/012 phụ thuộc harness chưa được xây dựng; không đánh dấu đã đạt hoặc Blocked như kết quả thực thi ở lượt này.
- Khi chạy, phân biệt: Not run (chưa chạy), Blocked (thiếu fixture/harness hoặc tiền điều kiện không đạt), Pass/Fail (checkpoint có expected rõ và bằng chứng đủ). Phép đo cắt biên ghi “chưa kết luận do phép đo”, không ép thành Pass hoặc Fail; nếu summary chỉ dùng bốn trạng thái, ghi Blocked với lý do và giữ log lần thử đo.
- Nếu có lỗi rõ ở setup, có thể ghi Fail ở checkpoint setup của ca tương ứng và đánh dấu checkpoint phụ thuộc chưa kiểm chứng. Không đếm cùng lỗi nhiều lần; không dùng một kết quả Fail tổng để tuyên bố mọi EC đã được thực thi.
- A-BV-001/002/004/009/010 có thể chồng dữ liệu với Domain 001/002/011/012/013. Khi thực thi, một run có đủ bằng chứng cho cả hai nhãn thì liên kết cùng Run ID và không đếm hai lần việc chạy. Nếu vẫn giữ hai TC ID thiết kế, giải thích phần trùng và cách thống kê; có thể hợp nhất khi human review.
- Các câu Q2/Q3/Q5 về counter sau khóa, gia hạn và reset chưa được tự giải quyết. BVA không tạo expected n=4 hoặc bắt buộc reset ngay hết khóa khi SRS chưa nói.

## 6. Thông tin cần lưu trong mỗi lần đo (chưa điền kết quả)

`TC ID; Run ID; baseline/patch; tài khoản fixture; counter/khóa trước và sau; setup tự nhiên hay fixture; payload; thời điểm gửi/nhận UTC và monotonic; a,b,c,d; khoảng elapsed; clock tại điểm so sánh nếu có; độ phân giải/giới hạn đo; response; ảnh UI nếu chạy Web; kết luận từng checkpoint; điểm chưa đủ bằng chứng`.

Không suy ra t0 từ hạn khóa bằng cách trừ 30s, không đồng nhất thời điểm response với thời điểm phép so sánh, không nhập số thời gian lý tưởng vào log. Script thực thi sẽ được chuẩn bị ở bước sau và phải lưu số đo thật.

## 7. Bước tiếp theo

Sinh viên đọc lại requirements, domains, Domain cases và file BVA này. Ưu tiên review: định nghĩa k/n, expected request thứ 4, điều kiện đo đúng 30s và việc tách fixture khỏi luồng thật. Chỉ tạo `05-review-coverage.md` dựa trên nhận xét thật; chưa ghi sinh viên đã duyệt.

## File: reports/work-progress.md

# Tiến độ HW02 — Nguyễn Lê Thế Vinh — 23120190

**Vai trò nhóm:** Thành viên 2. **Cập nhật:** 14/10/2026 (UTC+07:00).

## Bước chuẩn bị tài liệu

- [x] Đối chiếu phân công thành viên 2 và xác nhận bốn chức năng.
- [x] Ghi baseline SUT `85af3ba875c88283615e22cb108f13e2fccaf0e9` và nguồn yêu cầu.
- [x] Tạo README với rubric 25/25/25/15/10, để trống điểm tự chấm.
- [x] Tạo environment.md với thông tin công cụ quan sát được và các mục chưa xác nhận.
- [x] Tạo file theo dõi tiến độ này.

Đây là trạng thái tạo tài liệu của AI; không thể hiện sinh viên đã review thiết kế hoặc đã chạy SUT. Nhật ký tương tác của bước này nằm ở **AI-002** trong [AI Audit](../AI_AUDIT_REPORT.md).

## Tiến độ từng chức năng

“Chưa ghi nhận” nghĩa là chưa có sản phẩm/bằng chứng được xác nhận trong bộ bài làm này.

| Chức năng | Yêu cầu/input-output | EC | Ca Domain | Ca BVA | Review sinh viên | Thực thi | Bug/AI gaps |
|---|---|---|---|---|---|---|---|
| A-FR02 — Đăng nhập/khóa Web | Đã có bản nháp 01-requirements.md (AI-007) | Đã có bản nháp 02-domains.md (AI-008) | Đã có 24 ca nháp 03-domain-cases.md (AI-009) | Đã có 12 ca nháp 04-boundary-cases.md (AI-010) | Đã đọc và hiểu ca (AI-011); chưa xác nhận phê duyệt thiết kế | Chưa ghi nhận | Chưa ghi nhận |
| B-FR07 — Giỏ hàng Web | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận |
| C-FR14 — Danh mục Admin | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận |
| D-MREG — Đăng ký Mobile | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận |

Không chuyển một ô thành hoàn thành chỉ vì AI đã đề xuất nội dung. Review chỉ ghi khi có nhận xét thật của sinh viên; execution chỉ ghi khi có lần chạy và bằng chứng.

## Quy trình lưu file và commit khi thực hiện

Mỗi chức năng dùng thư mục `features/<mã-chức-năng>/`, với các bước:

| Thứ tự | File dự kiến | Nội dung |
|---|---|---|
| 1 | `01-requirements.md` | Nguồn yêu cầu, input/output, trạng thái |
| 2 | `02-domains.md` | Lớp tương đương và đại diện |
| 3 | `03-domain-cases.md` | Các ca Domain có thao tác và expected |
| 4 | `04-boundary-cases.md` | Biên và các ca BVA |
| 5 | `05-review-coverage.md` | Review thực tế, sửa đổi và truy vết |
| 6 | `06-execution.md` | Run ID, actual, status và evidence |
| 7 | `07-bugs-and-ai-gaps.md` | Bug/issue, thiếu sót AI có bằng chứng |

Tạo commit sau từng bước thực sự hoàn thành của từng chức năng. Chỉ stage đường dẫn liên quan; giữ nguyên các thay đổi khác. Không điền trước các file execution hoặc human review.

## Các phần tổng hợp còn lại

- [ ] Skill Domain/BVA tái sử dụng và video demo YouTube.
- [ ] Báo cáo chính Markdown + PDF cho đủ bốn chức năng.
- [ ] Bug report, GitHub Issues và ảnh trên từng issue.
- [ ] AI Audit đầy đủ và PDF; xử lý các phần lịch sử còn thiếu bằng dữ liệu thật.
- [ ] AI Critique 200–300 từ, Markdown + PDF.
- [ ] Test summary thực tế và bảng tự chấm.
- [ ] Commit log, kiểm tra ZIP và nộp Moodle.

## Kiểm tra mở môi trường

- [x] Backend trả danh sách sản phẩm theo JSON sinh viên gửi (AI-004).
- [x] Web hiển thị danh sách sản phẩm theo ảnh sinh viên gửi (AI-005).
- [x] Admin hiển thị ba danh mục mẫu theo ảnh sinh viên gửi (AI-006).
- [ ] Lưu bản ảnh gốc vào repo và bổ sung phiên bản trình duyệt.
- [ ] Chuẩn bị môi trường Mobile.

Các dấu hoàn thành ở đây chỉ ghi khả năng mở môi trường, không phải Pass test chức năng hay human review.

## Review A-FR02

- [x] Sinh viên xác nhận đã đọc và hiểu các ca kiểm thử Domain/BVA (AI-011).
- [x] Tạo ma trận review/truy vết `features/A-FR02/05-review-coverage.md`.
- [ ] Review kỹ thuật expected, lớp chưa rõ và protocol đo đúng 30 giây.
- [ ] Chốt harness/fixture thời gian hoặc ghi giới hạn nếu không khả thi.
- [ ] Thực thi ca và ghi actual/bằng chứng; hiện chưa có ca nào chạy.

Phản hồi “đã hiểu” không được coi là phê duyệt tính đúng đắn của toàn bộ thiết kế hoặc xác nhận đã chạy test.

## Việc tiếp theo

Đọc [ma trận review](../features/A-FR02/05-review-coverage.md), đặc biệt mục 4 về năm điểm cần chú ý. Nếu bạn có nhận xét về expected hay phép đo, gửi nội dung cụ thể; nếu không, bước kế tiếp là chốt phương án đo thời gian/harness rồi chuẩn bị thực thi.

## Phản hồi cuối

Đã tạo [05-review-coverage.md](/home/zinn/zinn/test/hw02/features/A-FR02/05-review-coverage.md) với:

- Ghi nhận bạn đã đọc và hiểu các ca, nhưng chưa xác nhận phê duyệt thiết kế hay expected.
- Ma trận truy vết yêu cầu → lớp tương đương/biên → ca kiểm thử.
- Các điểm kỹ thuật còn cần review và chưa có kết quả chạy.

Đã cập nhật trạng thái review trong tài liệu ca và work-progress, ghi AI Audit, rồi commit riêng bước review. Không có test nào được chạy.
