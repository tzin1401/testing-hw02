# C-FR14 — Phân hoạch miền

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2.
**Trạng thái:** Phân hoạch do AI soạn từ requirements; chưa tạo test case, chưa chạy SUT và chưa có human review.

## 1. Căn cứ và quy ước

Expected dựa trên [`01-requirements.md`](01-requirements.md), SRS FR-14/FR-12 trong `eshop-sut/README.md`, và endpoint trong `eshop-sut/api_specification.md`. Slide Domain/BVA được dùng để chia đầu vào/trạng thái thành các lớp có hành vi tương tự và chọn đại diện; slide không bổ sung quy tắc nghiệp vụ.

- C-R02/C-R05 áp dụng khi thêm danh mục; C-R03 khi xem; C-R04 khi xóa; C-R06 cho quyền của thao tác API ghi.
- FR-12 ràng buộc **POST/DELETE** danh mục: JWT hợp lệ và role admin. Không chuyển ràng buộc đó thành điều kiện cấm người dùng thường/khách gọi **GET** danh sách, vì SRS không nói điều này cho `GET /api/categories`.
- “Không hợp lệ” chỉ dùng khi requirement cho expected rõ. Trường hợp thiếu oracle được ghi **cần xác định/thăm dò**, không gán Pass/Fail.
- Không giả định uniqueness, giới hạn độ dài, trim, mã HTTP hay chính sách xóa danh mục đang được sản phẩm tham chiếu.

## 2. Các lớp tương đương

| EC ID | Input/trạng thái và lớp | Đại diện cụ thể | Expected theo nguồn | Output/state cần quan sát | Requirement |
|---|---|---|---|---|---|
| **C-EC-01** | **Tên rỗng** — không hợp lệ khi thêm | UI để trống; API `POST /api/categories` body `{"name":""}` | Không tạo danh mục vì FR-14 nói tên bắt buộc, không được để trống. Câu chữ lỗi và HTTP status/body chưa có expected. | So sánh danh sách trước/sau; quan sát validation hoặc API response mà không chấm status/message. | C-R02, C-R05 |
| **C-EC-02** | **Tên không rỗng gồm ASCII** — lớp tên có giá trị | `Do uong test C` | FR-14 chỉ yêu cầu tên không rỗng và không nêu giới hạn ký tự; theo yêu cầu hiện có, đây là đại diện tên có giá trị để thêm. Không suy ra giới hạn độ dài/duy nhất. | Sau thao tác với quyền hợp lệ, kiểm tra tên và danh mục mới trong danh sách; ghi response thực tế. | C-R02, C-R05, C-R06 |
| **C-EC-03** | **Tên không rỗng có Unicode/dấu** — lớp tên có giá trị, kiểm tra dữ liệu ký tự | `Đồ uống thử nghiệm` | FR-14 không giới hạn bảng chữ cái; tên không rỗng thuộc miền có giá trị. Không đặt expected về chuẩn hóa Unicode hay cách sắp xếp. | Quan sát tên gửi/hiển thị/đọc lại có được giữ; đối chiếu danh sách. Quy tắc chuẩn hóa/encoding chi tiết chưa được nêu. | C-R02, C-R05 |
| **C-EC-04** | **Chỉ có khoảng trắng** — lớp cần xác định, không xếp hợp lệ/không hợp lệ trước | UI nhập ba dấu cách `"   "`; API body `{"name":"   "}` | Chưa kết luận. FR-14 không định nghĩa “để trống” đối với whitespace-only và không quy định trim. Phân công Thành viên 2 yêu cầu xét lớp này nhưng không cung cấp oracle. | Ghi chính xác input, phản hồi UI/API, danh sách trước/sau; kết quả chỉ là observation cho tới khi có quyết định yêu cầu. | C-R05 |
| **C-EC-05** | **Danh sách rỗng** — trạng thái dữ liệu không có category | `GET /api/categories` trả danh sách rỗng theo observation; hoặc Admin Web ở trạng thái không có danh mục | C-R03 yêu cầu xem danh sách; expected ở mức nghiệp vụ là danh sách không có category. Câu chữ/empty illustration và schema/status HTTP không được quy định. Không giả định cách tạo trạng thái rỗng. | Ghi danh sách trên Admin/API, response body/status thực tế; đảm bảo chỉ quan sát, không xóa dữ liệu thật để tạo lớp. | C-R03 |
| **C-EC-06** | **Danh sách có danh mục** — trạng thái dữ liệu có ít nhất một category | Một category hiện có hoặc category test vừa tạo; ghi ID/tên cụ thể trong lần test sau | C-R03 yêu cầu có thể xem danh sách; category hiện có cần được liệt kê. Không đặt thứ tự, schema field hoặc phân quyền GET ngoài điều nguồn nói. | So sánh tên/ID trong Web với dữ liệu GET; lưu trạng thái không đổi sau GET. | C-R03 |
| **C-EC-07** | **Category ID vừa tạo, hiện tồn tại** — target hợp lệ, an toàn hơn nếu là fixture do test tạo | Tạo tên duy nhất cho run, lấy ID qua API/Web, rồi dùng đúng ID ở bước xóa trong thiết kế sau | C-R04 cho phép Admin xóa category; với ID đang tồn tại, category được chọn được kỳ vọng biến mất sau thao tác xóa thành công. Chỉ dùng ID test; không đặt dialog/status. | Ghi ID, tên và danh sách trước/sau. Nếu thao tác thực tế, giữ các danh mục mẫu nguyên vẹn. | C-R04, C-R06 |
| **C-EC-08** | **Category ID đã tồn tại trước test** — target tồn tại nhưng có thể là dữ liệu mẫu | ID/tên đã được xác minh từ danh sách trước đó; không xóa trong kiểm thử nếu chưa được phép | Category tồn tại thuộc lớp ID có thể định danh. SRS không phân biệt category mẫu và test khi xóa; không được xem lớp này là an toàn để xóa dữ liệu thật. | Quan sát/ghi ID, tên và tham chiếu sản phẩm nếu có căn cứ; chỉ dùng để đọc hoặc lập kế hoạch, không xóa khi chưa được phép. | C-R03, C-R04 |
| **C-EC-09** | **Category ID không tồn tại/không xác định** — xử lý chưa đủ oracle | Ví dụ số ID được xác nhận không nằm trong danh sách; giá trị cần chọn sau khi quan sát dataset | API có đường dẫn `DELETE /api/categories/:id`, nhưng SRS/API không quy định phản hồi cho ID không tồn tại. Không kết luận status, message hay behavior; chỉ thăm dò nếu an toàn. | Ghi request/response và đối chiếu danh sách trước/sau. Không dùng ID mẫu hoặc suy ra expected lỗi cụ thể. | C-R04, C-R06 |
| **C-EC-10** | **Role admin + JWT hợp lệ** — lớp quyền được phép cho API ghi | Token còn hiệu lực lấy từ phiên admin đã xác thực; không lưu token vào evidence | FR-12 yêu cầu JWT hợp lệ và role admin; POST/DELETE được phép đi vào chức năng theo C-R02/C-R04. API spec không định nghĩa status/body thành công. | Lưu request đã che token; quan sát response và xác minh state theo thao tác. | C-R02, C-R04, C-R06 |
| **C-EC-11** | **Role user thường + JWT hợp lệ** — lớp quyền không đủ | Token còn hiệu lực của tài khoản role user | FR-12 yêu cầu role admin; user thường không được phép làm thay đổi danh mục bằng POST/DELETE. Expected chỉ là không thay đổi state; mã HTTP/message chưa quy định. | So sánh danh sách trước/sau; lưu response đã che token. Thử trên POST/DELETE an toàn, không nhắm tới dữ liệu mẫu để xóa. | C-R06 |
| **C-EC-12** | **Thiếu token** — lớp xác thực không hợp lệ cho ghi | POST/DELETE không có header Authorization | FR-12 yêu cầu JWT hợp lệ; không có token không đáp ứng điều kiện, nên thao tác ghi không được làm thay đổi danh sách. Response cụ thể chưa có oracle. | Ghi response/status như actual; xác nhận không đổi danh sách. | C-R06 |
| **C-EC-13** | **Token sai định dạng/không hợp lệ** — lớp xác thực không hợp lệ | Header Bearer chứa chuỗi không phải JWT hợp lệ, ví dụ `Bearer not-a-valid-token` | Không đáp ứng yêu cầu JWT hợp lệ ở FR-12; không được làm thay đổi danh sách. Không chấm status/body. | Ghi response thực tế và so sánh danh sách trước/sau; không ghi token thật. | C-R06 |
| **C-EC-14** | **Token hết hạn** — lớp xác thực không hợp lệ | JWT có thời hạn đã qua, nếu có thể tạo/lấy an toàn | Token hết hạn không còn hợp lệ theo yêu cầu JWT hợp lệ của FR-12; POST/DELETE không được làm thay đổi danh sách. Cách trả lỗi chưa quy định. | Ghi thời điểm/token test đã che, response và danh sách trước/sau. Không dùng token cá nhân trong tài liệu. | C-R06 |
| **C-EC-15** | **GET danh sách với các trạng thái đăng nhập khác nhau** — quyền GET cần phân biệt với ghi | Gọi `GET /api/categories` lần lượt với admin, user thường và không token nếu có thể; hoặc quan sát danh sách công khai | FR-14 cho phép xem danh sách; FR-12 nói phân hệ Admin chỉ dành cho role admin nhưng không nói rõ GET `/api/categories` dùng chung có cần token/admin hay không. Không đặt expected từ chối user/khách; đây là câu hỏi/thăm dò. Với Admin Web, đánh giá quyền vào phân hệ theo C-R01. | Ghi response/status cho từng dạng request và ghi rõ là observation; GET không làm thay đổi danh sách. | C-R01, C-R03; liên quan câu hỏi C-R06 |

## 3. Vì sao chia như vậy

- Tên rỗng và tên không rỗng tách theo điều kiện bắt buộc của FR-14; ASCII và Unicode có dấu là hai đại diện không rỗng để quan sát khả năng giữ/hiển thị ký tự mà không tự đặt quy tắc charset.
- Whitespace-only được tách riêng vì phân công yêu cầu xem xét, nhưng FR-14 không định nghĩa trim hoặc ý nghĩa của “trống” với khoảng trắng. Gán nó vào lớp hợp lệ hay không hợp lệ lúc này sẽ tự tạo oracle.
- Danh sách rỗng/có dữ liệu tạo hai trạng thái đầu ra khác nhau cho thao tác xem. Category vừa tạo, category tồn tại từ trước và ID không tồn tại phân biệt target có thể xác nhận an toàn, target có nguy cơ là dữ liệu mẫu, và target không có đối tượng tương ứng.
- Admin, user thường, thiếu token, token sai và token hết hạn được tách vì mỗi lớp kiểm tra một điều kiện xác thực/phân quyền của POST/DELETE. Trạng thái GET được xem riêng; không suy ra ràng buộc của thao tác ghi áp dụng cho GET.
- Các lớp chưa đủ nguồn được ghi là câu hỏi/thăm dò và không có Pass/Fail dự kiến. Không tạo lớp theo độ dài tên hoặc tính duy nhất vì SRS không quy định các giới hạn đó.

## 4. Câu hỏi cần làm rõ trước khi chấm kết quả

1. Có phải chuỗi chỉ gồm khoảng trắng được xem là trống sau trim không?
2. `GET /api/categories` có yêu cầu đăng nhập/role admin không, hay danh sách có thể xem công khai? FR-12/API spec chưa xác định rõ endpoint GET dùng chung này.
3. Khi xóa ID không tồn tại, expected response/status là gì?
4. Có thể xóa danh mục đang được sản phẩm tham chiếu không? Nếu không, expected behavior là gì? Chưa được tự thử xóa danh mục đang có tham chiếu nếu có nguy cơ ảnh hưởng dữ liệu mẫu.
5. Response/status nào được quy ước cho thêm/xóa thành công, tên rỗng và lỗi quyền? API specification hiện không nêu.

Tài liệu này chỉ là phân hoạch miền. Chưa tạo test case, chưa chạy SUT, chưa chấm kết quả và chưa ghi nhận human review.
