# A-FR02 — Boundary Value Analysis (BVA)

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2.

**Trạng thái:** Thiết kế ở bước 5.4, toàn bộ ca **Not run**. Chưa có actual, Pass/Fail, human review hoặc bug xác nhận. Không chạy hoặc chỉnh SUT trong lượt tạo tài liệu này.

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
