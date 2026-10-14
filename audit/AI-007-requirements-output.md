# AI-007 — Output nguyên văn

## Thông báo tiến độ

Tôi sẽ đối chiếu FR-02 với slide, viết phần yêu cầu và input/output bằng tiếng Việt dễ hiểu, đánh dấu các điểm chưa rõ rồi ghi audit và commit riêng bước này.

## File: features/A-FR02/01-requirements.md

# A-FR02 — Yêu cầu đăng nhập và khóa tài khoản Web

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2.

**Bước đang làm:** 5.1 — đọc yêu cầu, xác định đầu vào và đầu ra. Đây là bản phân tích do AI soạn, chưa có xác nhận review của sinh viên. Tài liệu không có kết quả chạy, Pass/Fail hoặc bug đã xác nhận.

## 1. Hiểu chức năng bằng lời đơn giản

Người dùng nhập email và mật khẩu để đăng nhập. Nếu thông tin đúng và tài khoản không bị khóa, hệ thống cho đăng nhập và cấp JWT token — một chuỗi dùng để chứng minh người dùng đã đăng nhập khi gọi API cần xác thực.

Nếu nhập sai liên tiếp, hệ thống đếm số lần sai. Mỗi lần được tính là sai làm bộ đếm tăng đúng 1. Đến lần sai thứ 3, tài khoản bị khóa tạm thời 30 giây. Vì vậy, khi thiết kế kiểm thử, không chỉ nhìn email/password mà còn phải biết tài khoản đã sai mấy lần và đang ở thời điểm nào trong khoảng khóa.

“Expected result” là **kết quả hệ thống phải tạo ra theo yêu cầu**. Nó khác với kết quả thực tế khi chạy ứng dụng. Mã nguồn hiện tại không thay thế đặc tả để quyết định thế nào là đúng.

## 2. Nguồn căn cứ

| Mã nguồn tài liệu | Tài liệu và phần sử dụng | Vai trò |
|---|---|---|
| S1 | [SRS EShop](../../eshop-sut/README.md), FR-02 | Nguồn chính cho hành vi đăng nhập, bộ đếm, khóa, token và email Web |
| S2 | [API specification](../../eshop-sut/api_specification.md), mục 1.2 | `POST /api/login`, body `email`/`password`, thành công HTTP 200 và có `token`, `user` |
| S3 | [Slide VN](../../slide/domain-testing-vn.pdf), trang 6–7 | Bước 1: xác định Input/Output dựa vào đặc tả |
| S4 | [Slide EN](../../slide/domain-testing-en.pdf), trang 13–14 | Quy trình Domain Testing; xác định Input/Output trước khi chia lớp/chọn ca |
| S5 | [Phân công nhóm](../../group_feature_assignment.md), Thành viên 2 | Phạm vi FR-02 trên Web; chú ý số lần sai và thời gian khóa |
| S6 | [Đề HW02](../../2026.HW02.Domain%20Testing_En.pdf), mục 6, 9, 12 | Giải thích từng bước, lưu AI Audit và commit theo bước |

Baseline SUT: `85af3ba875c88283615e22cb108f13e2fccaf0e9`. [SRS cố định tại baseline](https://github.com/ttbhanh/eshop-sut/blob/85af3ba875c88283615e22cb108f13e2fccaf0e9/README.md). S3/S4 hướng dẫn cách phân tích, không cung cấp quy tắc nghiệp vụ đăng nhập EShop.

## 3. Từng yêu cầu và kết quả mong đợi

**Trực tiếp:** tài liệu có nêu rõ. **Diễn giải:** suy ra ý nghĩa nghiệp vụ, cần giữ nhãn này khi thiết kế ca. Các chi tiết còn thiếu nằm ở mục 7.

| ID | Yêu cầu bằng lời đơn giản | Kết quả mong đợi để đối chiếu về sau | Nguồn và mức chắc chắn |
|---|---|---|---|
| A-R01 | Người dùng đăng nhập bằng email và mật khẩu | UI nhận hai giá trị; API login nhận `email`, `password` | S1 dòng đầu, S2 — trực tiếp |
| A-R02 | Đăng nhập đúng được cấp token | Khi thông tin đúng và không bị khóa: API thành công HTTP 200, trả JWT `token` và thông tin `user` | S1 phần đăng nhập thành công, S2 — trực tiếp về output; điều kiện đúng/không khóa là diễn giải nghiệp vụ |
| A-R03 | Thông tin sai không được đăng nhập thành công | Từ chối xác thực, không cấp token thành công mới cho lần đăng nhập sai | S1 nói về đăng nhập sai và thông báo lỗi — diễn giải; chưa quy định mã HTTP lỗi |
| A-R04 | Mỗi lần đăng nhập sai tăng bộ đếm đúng 1 | Với lần sai được tính vào chuỗi, `số_sai_sau = số_sai_trước + 1` | S1 dòng bộ đếm — trực tiếp; phạm vi những lỗi nào được tính cần làm rõ Q1/Q2 |
| A-R05 | Khóa khi sai liên tiếp từ lần thứ 3 | Lần sai thứ 3 kích hoạt khóa; 1–2 lần sai chưa đủ để kích hoạt khóa theo ngưỡng này | S1 ngưỡng ≥3 — trực tiếp; không suy ra request trong lúc khóa tiếp tục tăng bộ đếm |
| A-R06 | Khóa tạm thời 30 giây | Khoảng khóa kéo dài 30 giây từ mốc kích hoạt; trong khoảng khóa chưa cho đăng nhập thành công, kể cả nhập đúng | S1 thời lượng — trực tiếp; chặn trong thời gian khóa là diễn giải; chi tiết mốc đo ở Q4 |
| A-R07 | Khi sai/khóa phải báo lỗi phù hợp, không lộ chi tiết nguyên nhân | Có thông báo thể hiện thao tác không thành công; không lộ chi tiết nhạy cảm. Không tự bắt buộc một câu lỗi cụ thể | S1 thông báo lỗi — trực tiếp; mức độ chi tiết cho phép ở Q6 |
| A-R08 | Token được lưu phía client | Sau thành công, client giữ token để dùng cho yêu cầu cần xác thực | S1 token — trực tiếp; không bắt buộc localStorage hay cơ chế lưu cụ thể |
| A-R09 | Gửi token đúng header khi gọi API cần xác thực | Request cần xác thực mang `Authorization: Bearer <token>` | S1 token — trực tiếp; không áp cho mọi request công khai |
| A-R10 | Email trên Web dùng validation HTML5 | Input email có `type="email"`; giá trị sai định dạng bị validation HTML5 xử lý khi submit form | S1 email — trực tiếp; `type=email` một mình không quy định trường rỗng bắt buộc bị chặn |
| A-R11 | Đếm các lần sai liên tiếp | Một lần đăng nhập thành công ngắt chuỗi sai; lần sai tiếp theo là lần đầu của chuỗi mới | Diễn giải từ từ “liên tiếp” trong S1; không bắt buộc một cách lưu DB cụ thể |

Khi khóa hết 30 giây, rào cản khóa tạm thời phải hết; thông tin đúng có thể được xét đăng nhập. Điều này không đồng nghĩa mọi request sau 30 giây đều thành công: email/password vẫn phải đúng. SRS chưa nêu cách tính bộ đếm nếu request sau hết khóa tiếp tục sai (Q3).

## 4. Đầu vào cần ghi lại

| ID | Đầu vào | Ý nghĩa và điều cần ghi |
|---|---|---|
| A-I01 | Email nhập | Chuỗi người dùng nhập; ghi nguyên giá trị, có rỗng/khoảng trắng hay không; tài khoản tương ứng có tồn tại hay không |
| A-I02 | Mật khẩu nhập | Chuỗi người dùng nhập; đúng hay sai so với tài khoản đã chuẩn bị; không áp quy tắc độ mạnh của đăng ký FR-01 lên login |
| A-I03 | Thao tác gửi đăng nhập | Submit từ form Web hay gọi API trực tiếp; browser có thể chặn trước khi request đến server |
| A-I04 | Thứ tự các lần đăng nhập | Trình tự đúng/sai và khoảng thời gian giữa các lần; đây là đầu vào dạng chuỗi thao tác, không phải một ô trên form |
| A-I05 | Thời điểm gửi/xử lý request | Phục vụ xác định request trước hay sau thời điểm hết khóa; không chỉ dựa vào thời gian lúc UI hiện thông báo |

Tài khoản đã lưu, bộ đếm và trạng thái khóa là **điều kiện trước khi thao tác**, không phải giá trị mà người dùng sửa trong form login. Dữ liệu test sẽ được xác định ở bước thiết kế ca, chưa tạo trong bước này.

## 5. Trạng thái cần theo dõi

| ID | Trạng thái | Cách hiểu | Vì sao cần biết? |
|---|---|---|---|
| A-S01 | Tài khoản tồn tại và thông tin xác thực đã chuẩn bị | Biết email nào có thật và mật khẩu đúng tương ứng | Tránh coi lỗi chuẩn bị tài khoản là lỗi chức năng |
| A-S02 | Số lần sai liên tiếp | Gọi là `n`: số lần sai đã được tính trước lần thao tác hiện tại | Kiểm tra tăng đúng 1 và kích hoạt khóa đúng lần thứ 3 |
| A-S03 | Đang khóa hay không | Trạng thái tài khoản ở thời điểm xét request | Cùng mật khẩu đúng có thể được chấp nhận hoặc bị chặn tùy trạng thái |
| A-S04 | Mốc khóa `t0` và thời gian đã trôi qua | `elapsed = thời_điểm_xét − t0`; `t0` là lúc kích hoạt khóa | Không đo 30 giây từ lần sai đầu tiên |
| A-S05 | Kết quả thao tác trước | Đúng/sai/đang khóa hoặc bị browser chặn | Phân biệt chuỗi sai liên tiếp và các thao tác không chắc được tính |
| A-S06 | Token phía client trước và sau thao tác | Có token cũ hay chưa; token nào xuất hiện sau thành công | Không nhầm token cũ còn lưu với token mới do request thất bại cấp |

Đây là tên biến phân tích, không khẳng định các trường DB bắt buộc mang đúng tên này. Khi thực thi, có thể quan sát UI, Network và đọc trạng thái DB bổ trợ nếu cần; phải ghi cách quan sát. Không chỉnh bộ đếm hoặc giờ khóa rồi coi đó là bằng chứng của luồng người dùng thật mà không khai báo fixture.

## 6. Đầu ra và nơi quan sát khi thực thi sau này

| ID | Đầu ra cần quan sát | Nơi quan sát dự kiến | Yêu cầu liên quan |
|---|---|---|---|
| A-O01 | Đăng nhập thành công/thất bại | UI và response của `POST /api/login` | A-R02, A-R03, A-R05, A-R06 |
| A-O02 | HTTP status, `token`, `user` khi thành công | Network hoặc response API | A-R02 |
| A-O03 | Thông báo lỗi và thông tin bị tiết lộ | UI và response API; phân biệt thông báo mỗi tầng | A-R07 |
| A-O04 | Bộ đếm thay đổi sau request | Quan sát trạng thái có kiểm soát; UI có thể không hiển thị bộ đếm | A-R04, A-R05, A-R11 |
| A-O05 | Bắt đầu khóa và hết khóa | Response/thao tác đăng nhập cùng timestamp, trạng thái bổ trợ nếu có | A-R05, A-R06 |
| A-O06 | Client lưu token và gửi đúng header | Trạng thái lưu client và Network của request cần xác thực | A-R08, A-R09 |
| A-O07 | Kiểu input email và validation | Inspect phần tử Web, phản hồi browser khi submit | A-R10 |

Các hàng này chỉ xác định **sẽ quan sát gì**. Chưa có actual result. Chuyển trang/hiển thị tên người dùng có thể là dấu hiệu bổ trợ; FR-02 không quy định cụ thể phải chuyển đến URL nào sau đăng nhập.

## 7. Điểm chưa rõ — không tự biến thành yêu cầu chắc chắn

| ID | Câu hỏi còn thiếu trong SRS | Cách xử lý trước khi chốt ca |
|---|---|---|
| Q1 | Email không tồn tại thì đếm sai cho đối tượng nào? | Chưa có tài khoản để gắn bộ đếm; chỉ xác định phải từ chối xác thực, không tự đặt cơ chế đếm theo IP/email |
| Q2 | Rỗng/sai format/bị browser chặn và request trong lúc khóa có được tính là lần sai không? | Phân biệt tầng UI/API và loại lỗi; chưa khẳng định tất cả đều tăng bộ đếm |
| Q3 | Sau hết khóa, bộ đếm reset hay giữ? Một request sai tiếp có khóa lại ngay không? | Đánh dấu chưa rõ; không tự đặt expected cho chuỗi này. Ngắt chuỗi bởi thành công là diễn giải riêng A-R11 |
| Q4 | 30 giây được đo từ thời điểm xử lý nào, độ chính xác bao nhiêu? | Mô hình dự kiến là từ lúc kích hoạt khóa, hết khoảng khóa ở `t0+30s`; phải ghi cách đo/độ trễ trước khi khẳng định kiểm chứng đúng mốc bằng nhau |
| Q5 | Request trong lúc khóa có kéo dài thời hạn khóa không? | Chưa giả định có hoặc không; cần làm rõ trước khi dùng request thăm dò làm ảnh hưởng phép đo thời gian |
| Q6 | “Không để lộ chi tiết nguyên nhân” cấm phân biệt email sai/password sai đến mức nào? Có được nêu tài khoản đang khóa không? | Không bắt buộc mọi lỗi có cùng câu chữ; ghi diễn giải bảo mật và xin làm rõ khi cần kết luận bug từ khác biệt thông báo |
| Q7 | Email có trim/không phân biệt hoa thường không? Hai trường có độ dài tối đa hoặc bắt buộc chặn rỗng tại UI không? | Chưa có quy tắc rõ trong FR-02. Trường rỗng/sai kiểu là đầu vào cần xem xét, không tự tạo giới hạn hoặc chính sách chuẩn hóa |
| Q8 | Mã HTTP cho sai mật khẩu/đang khóa là gì? | S2 chỉ nêu thành công 200; không tự buộc 401/403 cho từng lỗi |
| Q9 | Token phải lưu ở đâu, tồn tại bao lâu, có phải còn sau reload không? | FR-02 chỉ yêu cầu lưu client và gửi header; chưa đặt TTL, localStorage bắt buộc hoặc lưu qua phiên |

Các câu hỏi trên được giữ để review/đối chiếu với giảng viên hoặc tài liệu bổ sung nếu có. Không cần giải quyết hết mới phân tích phần yêu cầu rõ ràng, nhưng ca phụ thuộc câu hỏi chưa giải quyết phải gắn nhãn giả định/chưa chốt expected.

## 8. Giới hạn và bước tiếp theo

Phạm vi chính là đăng nhập Web và hành vi API hỗ trợ, khóa tài khoản, token, email HTML5. Không mở rộng sang đăng ký, reset mật khẩu hoặc kiểm thử toàn bộ API phân quyền. Các yêu cầu giao diện chung nếu bổ sung sau phải dẫn nguồn riêng, không gán chúng là nội dung FR-02.

Đã hoàn thành bản nháp xác định yêu cầu/input/output theo bước 1 trong slide. **Chưa phân hoạch EC, chưa tạo test case Domain/BVA, chưa chạy test và chưa ghi human review.**

Bước tiếp theo là `02-domains.md`: chia các biến/trạng thái thành nhóm có kết quả mong đợi tương tự, dùng ID A-R/A-I/A-S/A-O ở trên để truy vết. Bạn nên đọc mục 3 và 7 trước, đánh dấu câu nào còn khó hiểu để tôi giải thích.

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
| A-FR02 — Đăng nhập/khóa Web | Đã có bản nháp 01-requirements.md (AI-007) | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận |
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

Đã có [bản nháp yêu cầu A-FR02](../features/A-FR02/01-requirements.md), gồm yêu cầu, input/output, trạng thái và điểm chưa rõ. Chưa ghi nhận review của sinh viên hoặc kết quả kiểm thử.

Đọc mục 3 và 7 của bản nháp, nêu điểm chưa hiểu nếu có; sau đó thực hiện **bước 5.2** trong hướng dẫn: phân hoạch tương đương vào `02-domains.md`. Giữ các terminal đang chạy để tránh reset DB do khởi động lại backend.

## Phản hồi cuối

Đã tạo [01-requirements.md](/home/zinn/zinn/test/hw02/features/A-FR02/01-requirements.md), gồm:

- 11 yêu cầu, kèm nguồn và expected result.
- Đầu vào, trạng thái cần theo dõi và đầu ra.
- 9 điểm chưa rõ, tách biệt với yêu cầu chắc chắn.

Đã ghi AI Audit, cập nhật tiến độ và commit riêng bước này. Chưa tạo kết quả kiểm thử hay human review.

Bạn đọc **mục 3 và 7** trước; bước kế tiếp là **5.2 — chia lớp tương đương**.
