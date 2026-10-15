# D-MREG — Yêu cầu đăng ký trên Mobile

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2  
**Phạm vi:** đăng ký tài khoản trong ứng dụng Mobile. FR-20 yêu cầu tính năng Đăng ký có trên Mobile; quy tắc đăng ký được lấy từ FR-01. Không mở rộng sang đăng nhập, quên mật khẩu hay các chức năng Mobile khác.

## 1. Yêu cầu và expected result

Expected result bên dưới lấy từ SRS và API specification, không lấy từ cách SUT đang cài đặt. Khi tài liệu không chốt thông báo hoặc phản hồi lỗi, ghi rõ là chưa quy định thay vì tự đặt câu chữ/status.

| ID | Yêu cầu | Input | Trạng thái trước → sau | Đầu ra cần quan sát trên Mobile/API | Nguồn expected result |
|---|---|---|---|---|---|
| **D-R01** | Người dùng phải cung cấp họ tên khi đăng ký. | Trường **Họ Tên**; ví dụ đại diện hợp lệ: `Nguyen Le The Vinh`. | Trước: chưa gửi đăng ký. Khi họ tên có giá trị và các input khác hợp lệ: có thể tiếp tục đăng ký. Khi thiếu họ tên: không được đăng ký thành công. | Mobile: trường họ tên và kết quả từ chối/cho tiếp tục. API: body đăng ký có `name`, nhưng API spec không mô tả cách báo lỗi khi thiếu. | SRS `README.md`, FR-01 (dòng 32); API specification §1.1 (dòng 12–21) có trường `name`; phân công thành viên 2, Pool D (dòng 50–52) xác định kiểm tra form Mobile. |
| **D-R02** | Người dùng phải cung cấp email. | Trường **Email**; ví dụ `vinh.test@example.com`. | Trước: email chưa gửi. Email có giá trị: đủ điều kiện xét format/trùng. Email thiếu: không được đăng ký thành công. | Mobile: giá trị nhập và phản hồi đăng ký. API: trường `email` trong body; cách báo lỗi khi thiếu chưa được nêu. | SRS `README.md`, FR-01 (dòng 32–33); API specification §1.1 (dòng 12–21). |
| **D-R03** | Email phải đúng định dạng hợp lệ, ví dụ `user@domain.com`. | Trường **Email**; ví dụ hợp lệ `vinh.test@example.com`; định dạng sai là input không thỏa điều kiện. | Trước: chưa gửi. Email hợp lệ: được xét tiếp điều kiện duy nhất. Email sai định dạng: không được đăng ký thành công. | Mobile: trường email và phản hồi validation. API: trường `email`; API spec không nêu ví dụ phản hồi lỗi cho format sai. | SRS `README.md`, FR-01 (dòng 33); API specification §1.1 (dòng 12–21) xác định field email, nhưng không định nghĩa format/error response chi tiết. |
| **D-R04** | Email phải là duy nhất trong hệ thống. | Email hợp lệ có trạng thái **chưa tồn tại** hoặc **đã tồn tại**. | Chưa tồn tại → đăng ký thành công có thể tạo một tài khoản. Đã tồn tại → từ chối tạo bản ghi trùng; tài khoản cũ vẫn tồn tại. | Mobile: kết quả đăng ký. API: phản hồi `POST /api/register`; quan sát trạng thái tài khoản bằng cách phù hợp nếu có. Status/body cụ thể khi trùng chưa được quy định. | SRS `README.md`, FR-01 (dòng 33); API specification §1.1 (dòng 12–21) xác định endpoint đăng ký nhưng không nêu response khi email trùng. |
| **D-R05** | Người dùng phải cung cấp mật khẩu. | Trường **Mật khẩu**. | Trước: chưa gửi. Có mật khẩu thì xét tiếp các điều kiện mạnh; thiếu mật khẩu thì không được đăng ký thành công. | Mobile: trường mật khẩu và phản hồi validation. API: body có `password`; API spec không mô tả lỗi khi thiếu. | SRS `README.md`, FR-01 (dòng 32, 34); API specification §1.1 (dòng 12–21). |
| **D-R06** | Mật khẩu phải dài ít nhất 8 ký tự, có ít nhất một chữ hoa, một chữ thường, một chữ số, và ít nhất một ký tự thuộc tập `@$!%*?&`. | Trường **Mật khẩu**; ví dụ hợp lệ đại diện `VinhTest8!` (dài hơn 8, có đủ các nhóm và `!` thuộc tập cho phép). | Trước: chưa gửi. Mật khẩu thỏa mọi điều kiện: đủ điều kiện xét đăng ký. Thiếu bất kỳ điều kiện nào: không được đăng ký thành công. | Mobile: phản hồi validation. API: trường `password` được gửi khi đăng ký; phản hồi lỗi cụ thể chưa được API spec quy định. | SRS `README.md`, FR-01 (dòng 34); API specification §1.1 (dòng 12–21) xác định field password nhưng không nhắc quy tắc/response lỗi. |
| **D-R07** | Form Mobile phải có trường **Xác nhận mật khẩu** và hệ thống phải từ chối khi mật khẩu với xác nhận không khớp. Giá trị xác nhận phải được cung cấp trong luồng form. | Hai input trên Mobile: **Mật khẩu** và **Xác nhận mật khẩu**; cần so sánh hai giá trị. | Trước: chưa gửi. Hai giá trị được cung cấp và khớp → đủ điều kiện tiếp tục. Xác nhận thiếu hoặc không khớp → không được đăng ký thành công. | Mobile: trường xác nhận hiện diện, giá trị được nhập và thông báo/kết quả khi submit. API: API specification không có `confirmPassword` trong body mẫu; không coi đây là field của endpoint nếu hợp đồng chưa cập nhật. | SRS `README.md`, FR-01 (dòng 35) yêu cầu trường xác nhận và từ chối khi không khớp; phân công thành viên 2, Pool D (dòng 50–52) yêu cầu kiểm tra form trên Mobile. API specification §1.1 (dòng 12–21) chỉ liệt kê `name`, `email`, `password`. |
| **D-R08** | Khi mọi điều kiện đăng ký hợp lệ và email chưa tồn tại, hệ thống tạo tài khoản. | Họ tên, email mới hợp lệ, mật khẩu hợp lệ; form xác nhận khớp. | Trước: email chưa có tài khoản. Sau thành công: tài khoản với email đó tồn tại một lần. | Mobile: thông báo/kết quả thành công. API: `POST /api/register`, JSON body gồm `name`, `email`, `password`; thành công trả `200 OK` với `message: "User registered successfully"` và `id`. | SRS `README.md`, FR-01 (dòng 32–35); API specification §1.1 (dòng 12–21) cho endpoint, body và response thành công; FR-20 (dòng 233–235) đặt Đăng ký trong phạm vi Mobile. |
| **D-R09** | Sau đăng ký thành công, Mobile chuyển người dùng tới màn hình Đăng nhập. | Thao tác submit bộ dữ liệu đăng ký hợp lệ. | Trước: đang ở form Đăng ký. Sau thành công: ở màn hình Đăng nhập. | Mobile: màn hình sau submit là Đăng nhập. API: không có API response riêng cho điều hướng. | SRS `README.md`, FR-01 (dòng 36); FR-20 (dòng 233–235) xác định ứng dụng Mobile có chức năng Đăng ký và Đăng nhập. |

## 2. Ranh giới Mobile UI và API

- FR-20 xác định Đăng ký là một chức năng phải có trong ứng dụng Mobile. Do đó, expected về trường nhập, xác nhận mật khẩu và chuyển màn hình phải được quan sát trên Mobile UI; chỉ gọi API không chứng minh các hành vi giao diện này.
- API specification định nghĩa `POST /api/register` với `name`, `email`, `password`, và phản hồi thành công `200 OK` gồm `message` và `id`. Tài liệu không định nghĩa mã HTTP, body lỗi hay câu chữ lỗi cho các trường hợp bị từ chối.
- `confirmPassword` có trong yêu cầu form FR-01 nhưng không có trong body API mẫu. Trong phạm vi tài liệu hiện tại, xác nhận mật khẩu là điều kiện của Mobile UI; không tự thêm field vào hợp đồng API.
- Các lỗi về input được mô tả là **không được đăng ký thành công** theo yêu cầu bắt buộc/từ chối. Câu chữ, vị trí lỗi, status HTTP và cấu trúc body lỗi vẫn chưa có oracle cụ thể.

## 3. Điểm cần xác minh, chưa tự đặt expected

1. **Trim và khoảng trắng:** họ tên/email chỉ gồm dấu cách có được coi là rỗng không? Hệ thống có trim khoảng trắng đầu/cuối trước khi kiểm tra hay lưu không?
2. **Email:** phạm vi chính xác của định dạng hợp lệ ngoài ví dụ `user@domain.com`; email trùng được so sánh phân biệt hoa/thường hay chuẩn hóa chữ thường?
3. **Giới hạn độ dài:** SRS không nêu độ dài tối đa của họ tên, email, mật khẩu hoặc xác nhận mật khẩu.
4. **Mật khẩu:** tài liệu yêu cầu tối thiểu 8 ký tự và ít nhất một ký tự thuộc `@$!%*?&`; chưa nói cách đếm ký tự Unicode, các chữ số/hoa/thường ngoài ASCII, hoặc có cấm thêm ký tự đặc biệt khác hay không.
5. **Xác nhận mật khẩu:** API spec không có field này. Cần xác nhận đây chỉ là kiểm tra ở Mobile hay có hợp đồng API khác được lớp yêu cầu.
6. **Thông báo lỗi:** chưa có câu chữ, vị trí hiển thị, thứ tự ưu tiên khi nhiều input sai, hoặc status/body lỗi API được quy định cho đăng ký thất bại.
7. **Lỗi mạng và gửi lặp:** chưa nói khi mất mạng, timeout, bấm submit nhiều lần, hoặc response bị mất sau khi server đã tạo tài khoản thì app phải hiển thị/tránh tạo trùng thế nào.
8. **Giữ dữ liệu form:** chưa quy định form giữ hay xóa các giá trị sau khi đăng ký thất bại.

## 4. Phạm vi và trạng thái tài liệu

- Thành viên 2 được phân công **Mobile FR-01: Đăng ký trên Mobile**; đây là phạm vi D-MREG.
- Slide Domain Testing hướng dẫn xác định input/output, phân hoạch lớp tương đương hợp lệ/không hợp lệ và chọn đại diện. Slide BVA áp dụng cho input có thứ tự/điểm biên. File này mới trích yêu cầu và nguồn expected; chưa tạo EC, test case Domain/BVA hoặc coverage.
- Chưa chạy test; chưa ghi actual, Pass/Fail, human review hay trạng thái phê duyệt.

## Nguồn

- SRS: [`eshop-sut/README.md`](../../eshop-sut/README.md), FR-01 dòng 30–36; FR-20 dòng 233–235.
- API: [`eshop-sut/api_specification.md`](../../eshop-sut/api_specification.md), Authentication §1.1, dòng 11–21.
- Phân công: [`group_feature_assignment.md`](../../group_feature_assignment.md), thành viên 2 Pool D, dòng 15 và 50–52.
- Slide: [`slide/domain-testing-vn.pdf`](../../slide/domain-testing-vn.pdf), Domain Testing bước xác định input/output, phân lớp và chọn đại diện (trang 6–10); BVA và giá trị lân cận (trang 19–23). [`slide/domain-testing-en.pdf`](../../slide/domain-testing-en.pdf), tương ứng phần Domain Testing (trang 13–19) và BVA (trang 20–24).
