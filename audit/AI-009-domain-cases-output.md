# AI-009 — Output nguyên văn

## Thông báo tiến độ

Tôi sẽ chuyển các lớp tương đương thành test case có bước thao tác cụ thể, tách ca Web và API, đồng thời giữ riêng những ca chưa chốt expected. Sau đó tôi sẽ kiểm tra độ phủ EC, ghi audit và commit riêng.

Bản nháp có 24 ca, mỗi ca âm cơ bản chỉ thay một điều kiện. Tôi cũng ghi rõ cách chuẩn bị trạng thái riêng để ca trước không ảnh hưởng ca sau. Điểm đúng 30 giây được chuyển sang BVA vì thao tác bấm tay không đủ để xác nhận chính xác mốc này.

## File: features/A-FR02/03-domain-cases.md

# A-FR02 — Test case Domain Testing

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2.

**Trạng thái chung: bản thiết kế, tất cả ca chưa chạy (Not run).** Chưa có human review, actual result hoặc bug xác nhận. Expected là yêu cầu để đối chiếu sau này, không phải kết quả đã quan sát.

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
| A-FR02 — Đăng nhập/khóa Web | Đã có bản nháp 01-requirements.md (AI-007) | Đã có bản nháp 02-domains.md (AI-008) | Đã có 24 ca nháp 03-domain-cases.md (AI-009) | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận |
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

## Việc tiếp theo

Đã có [24 ca Domain nháp A-FR02](../features/A-FR02/03-domain-cases.md), gồm ca Web/API, chuỗi trạng thái và ca thăm dò chưa chốt đầy đủ expected. Mỗi ca có dữ liệu, chuẩn bị, thao tác, expected, EC và requirement. EC L03 (đúng mốc 30s) được chuyển công khai sang BVA; chưa có kết quả thực thi hoặc human review.

Tiếp theo: **bước 5.4** — tạo `04-boundary-cases.md`, sau đó review toàn bộ thiết kế trước khi chạy. Không coi các ca thăm dò hoặc checkpoint phụ thuộc state chưa đạt là kết quả đã kiểm chứng.

## Phản hồi cuối

Đã tạo [03-domain-cases.md](/home/zinn/zinn/test/hw02/features/A-FR02/03-domain-cases.md) với **24 ca**, gồm đầy đủ điều kiện chuẩn bị, dữ liệu, thao tác, expected, EC ID và requirement.

Mỗi ca âm cơ bản chỉ sai một điều kiện; các ca chưa chốt expected được đánh dấu riêng. Đã ghi audit và commit riêng, chưa chạy test hoặc ghi human review.

Tiếp theo: **bước 5.4 — thiết kế ca BVA**.
