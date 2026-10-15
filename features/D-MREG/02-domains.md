# D-MREG — Phân hoạch lớp tương đương

**Nguồn oracle:** [01-requirements.md](01-requirements.md), dựa trên FR-01/FR-20, API specification và phân công thành viên 2. Đây là thiết kế lớp dữ liệu, chưa phải test case hay kết quả chạy. Expected không lấy từ mã nguồn SUT.

## 1. Quy ước khi đọc các lớp

- Mỗi **D-EC** là một nhóm input/trạng thái có cùng expected theo yêu cầu. Các đại diện chỉ minh họa miền; chưa được chạy.
- Khi xét một trường, giữ các trường khác hợp lệ để lỗi có thể quy về điều kiện đang xét. Với password thiếu một nhóm ký tự, vẫn giữ độ dài từ 8 trở lên và đủ các nhóm còn lại.
- **Không được đăng ký thành công** là oracle từ yêu cầu bắt buộc/điều kiện từ chối. Câu chữ báo lỗi, HTTP status và body lỗi chưa được đặc tả nên không được tự đặt.
- Confirmation password là input của Mobile UI; API spec không đưa field này vào JSON đăng ký. Lớp xác nhận chỉ có expected ở Mobile.
- Các lớp network/error nơi chưa có oracle được ghi là **chưa chốt / observation**, không gán Pass/Fail.

## 2. Họ tên — D-R01

| D-EC | Điều kiện lớp | Đại diện cụ thể | Expected | Quan sát | Liên quan |
|---|---|---|---|---|---|
| **D-EC-01** | Không cung cấp họ tên | `name = ""`; các input còn lại hợp lệ | Không được đăng ký thành công vì họ tên bắt buộc. Không tự đặt status/body hoặc câu báo lỗi. | Mobile: phản hồi trên form và có chuyển màn hình thành công hay không. API: không có lỗi thiếu name được định nghĩa trong API spec. | D-R01 |
| **D-EC-02** | Họ tên có giá trị thông thường | `Nguyen Le The Vinh`; các input khác hợp lệ | Đạt điều kiện “phải cung cấp họ tên”; đăng ký chỉ thành công nếu các điều kiện còn lại cũng đạt. | Mobile: giá trị nhập; API: field `name` trong body nếu request được gửi. | D-R01, D-R08 |

Khoảng trắng-only và cách trim họ tên chưa được xếp valid/invalid vì yêu cầu chưa định nghĩa cách xử lý; xem câu hỏi Q-01.

## 3. Email — D-R02, D-R03, D-R04

| D-EC | Điều kiện lớp | Đại diện cụ thể | Trạng thái trước | Expected | Quan sát | Liên quan |
|---|---|---|---|---|---|---|
| **D-EC-03** | Bỏ trống email | `email = ""`; các input khác hợp lệ | Chưa gửi request | Không được đăng ký thành công vì email bắt buộc. Lỗi/status cụ thể chưa có oracle. | Mobile: phản hồi. API: request/body và phản hồi nếu gửi; API spec không quy định lỗi này. | D-R02 |
| **D-EC-04** | Email sai định dạng | `vinh.example.com`; họ tên/mật khẩu/confirm hợp lệ | Email này không được dùng làm tài khoản test đã tồn tại | Không được đăng ký thành công vì email không đúng ví dụ định dạng yêu cầu. Quy tắc grammar chi tiết và lỗi cụ thể chưa chốt. | Mobile/API: kết quả từ chối hay tiếp tục; không tự đặt thông báo/status. | D-R03 |
| **D-EC-05** | Email đúng định dạng, chưa có tài khoản | `vinh.new@example.com` (dùng địa chỉ test duy nhất); email chưa tồn tại | Tìm được trạng thái chưa có account | Email thỏa format và uniqueness; với các input khác hợp lệ, có thể đăng ký thành công. | Mobile: kết quả submit. API: thành công theo response contract nếu request thành công. | D-R03, D-R04, D-R08 |
| **D-EC-06** | Email đúng định dạng, đã có tài khoản | `existing.user@example.com`; tạo/chuẩn bị account trước bằng fixture test | Đã có đúng một account với email này | Phải từ chối tạo account trùng; account cũ vẫn tồn tại. Status/body lỗi chưa được quy định. | Mobile: phản hồi. API: response và state account nếu đọc được an toàn. | D-R03, D-R04 |

Không gộp D-EC-04 với D-EC-06: một lớp vi phạm format, lớp kia có format hợp lệ nhưng vi phạm uniqueness. Không giả định email phân biệt hoa/thường hoặc được trim; xem Q-02/Q-03.

## 4. Mật khẩu — D-R05, D-R06

Các đại diện dưới đây chỉ xét mật khẩu; họ tên, email mới hợp lệ và confirm được đặt hợp lệ. Tập ký tự đặc biệt cần có **ít nhất một ký tự thuộc `@$!%*?&`**; không yêu cầu chuỗi chứa tất cả ký tự trong tập.

| D-EC | Điều kiện lớp | Đại diện cụ thể | Expected | Quan sát | Liên quan |
|---|---|---|---|---|---|
| **D-EC-07** | Mật khẩu rỗng | `""` | Không được đăng ký thành công vì password bắt buộc. | Mobile: phản hồi validation. API: lỗi cụ thể chưa được nêu. | D-R05 |
| **D-EC-08** | Dài dưới 8, nhưng đủ mọi nhóm ký tự | `Aa1!bbb` (7 ký tự: hoa, thường, số, ký tự thuộc tập đều có) | Không được đăng ký thành công do không đạt tối thiểu 8; các điều kiện nhóm ký tự khác vẫn đạt. | Mobile: validation; không tự đặt câu chữ. API: status/body lỗi chưa có oracle. | D-R06 |
| **D-EC-09** | Dài đúng 8 và đủ mọi nhóm | `Aa1!bbbb` (8 ký tự) | Đạt điều kiện độ dài và nhóm ký tự. Đăng ký có thể thành công nếu các input/trạng thái khác hợp lệ. | Mobile: kết quả validation/submit. API: response success nếu request hợp lệ. | D-R06, D-R08 |
| **D-EC-10** | Dài trên 8 và đủ mọi nhóm | `Aa1!bbbbb` (9 ký tự) | Đạt điều kiện độ dài tối thiểu và nhóm ký tự. Không có upper bound được nêu. | Mobile/API: kết quả; không suy diễn giới hạn trên. | D-R06 |
| **D-EC-11** | Thiếu chữ hoa; các điều kiện còn lại đạt | `aa1!bbbb` (8 ký tự, có thường/số/`!`) | Không được đăng ký thành công do thiếu chữ hoa. | Mobile: validation. | D-R06 |
| **D-EC-12** | Thiếu chữ thường; các điều kiện còn lại đạt | `AA1!BBBB` (8 ký tự, có hoa/số/`!`) | Không được đăng ký thành công do thiếu chữ thường. | Mobile: validation. | D-R06 |
| **D-EC-13** | Thiếu chữ số; các điều kiện còn lại đạt | `Aa!!bbbb` (8 ký tự, có hoa/thường/`!`) | Không được đăng ký thành công do thiếu chữ số. | Mobile: validation. | D-R06 |
| **D-EC-14** | Thiếu ký tự thuộc tập đặc biệt cho phép; các điều kiện còn lại đạt | `Aa12bbbb` (8 ký tự, có hoa/thường/số, không có ký tự nào thuộc tập) | Không được đăng ký thành công do thiếu ký tự thuộc `@$!%*?&`. | Mobile: validation. | D-R06 |

Unicode, cách đếm ký tự, và việc chấp nhận các ký tự đặc biệt khác ngoài tập khi chúng xuất hiện thêm chưa được quy định; không phân loại chúng thành valid/invalid ở đây (Q-04).

## 5. Xác nhận mật khẩu — D-R07

Các lớp này chỉ áp dụng cho Mobile UI. Password chính dùng đại diện hợp lệ `Aa1!bbbb`; các input khác hợp lệ và email chưa tồn tại.

| D-EC | Điều kiện lớp | Đại diện cụ thể | Expected | Quan sát | Liên quan |
|---|---|---|---|---|---|
| **D-EC-15** | Confirm khớp password | `password = Aa1!bbbb`; `confirm = Aa1!bbbb` | Đạt điều kiện so khớp; các điều kiện khác vẫn phải đạt để đăng ký thành công. | Mobile: hai giá trị nhập và kết quả submit. Không gửi confirm lên API theo contract hiện tại. | D-R07, D-R08 |
| **D-EC-16** | Confirm không khớp | `password = Aa1!bbbb`; `confirm = Aa1!bbbc` | Hệ thống từ chối đăng ký khi hai giá trị không khớp. Không tự đặt câu chữ lỗi. | Mobile: phản hồi và việc có chuyển Login/đăng ký thành công hay không. API spec không có confirm field. | D-R07 |
| **D-EC-17** | Confirm bỏ trống | `password = Aa1!bbbb`; `confirm = ""` | Theo yêu cầu form, confirmation phải được cung cấp và khớp; không được đăng ký thành công. Câu chữ/status chưa chốt. | Mobile: phản hồi. Không thể kiểm tra input này bằng request API trực tiếp theo contract hiện tại. | D-R07 |

## 6. Trạng thái API và kết nối

Các trạng thái này là đầu ra/môi trường, không phải input người dùng. Chỗ tài liệu không định nghĩa lỗi được giữ ở mức câu hỏi/probe.

| D-EC | Trạng thái | Ví dụ/điều kiện | Expected | Quan sát | Liên quan |
|---|---|---|---|---|---|
| **D-EC-18** | API nhận đăng ký hợp lệ và trả thành công | `POST /api/register`, body có `name`, email mới, `password`; các điều kiện FR-01 đạt | API spec nêu `200 OK` và JSON gồm `message: "User registered successfully"`, `id`. Account được tạo. | HTTP status/body; state account nếu có cách kiểm tra chỉ đọc. | D-R08 |
| **D-EC-19** | API nhận request nhưng từ chối input không hợp lệ/trùng email | Ví dụ email hợp lệ đã tồn tại hoặc field bắt buộc thiếu; mỗi lần xét chỉ có một điều kiện sai | FR-01 yêu cầu không đăng ký thành công đối với điều kiện sai. API spec không nêu status/body lỗi hoặc cách map validation UI/API. | Ghi response và state; không đánh giá status/message theo oracle chưa có. | D-R01–D-R06, D-R08 |
| **D-EC-20** | Network/API hoạt động, có thể trao đổi request-response | Backend reachable; một request đăng ký có kết quả trả về | Khi đăng ký hợp lệ, áp dụng contract success D-EC-18; khả năng kết nối tự thân không phải kết quả chức năng. | Timestamp, request/response đã che mật khẩu/token. | D-R08; API §1.1 |
| **D-EC-21** | Network/API không truy cập được hoặc request timeout | Backend không reachable, mất kết nối hoặc timeout | **Chưa có expected result** trong SRS/API cho thông báo, giữ form, retry hay trạng thái account. Không gán pass/fail; chỉ ghi observation khi được thiết kế/chạy sau. | Lỗi kết nối trên Mobile, trạng thái form và trạng thái account nếu xác minh được. | Q-06; D-R08 |

## 7. Trạng thái màn hình Mobile

| D-EC | Trạng thái app | Điều kiện/đại diện | Expected | Quan sát | Liên quan |
|---|---|---|---|---|---|
| **D-EC-22** | Đang ở form Register trước khi submit | Mở luồng Đăng ký, form sẵn sàng nhận input | Trạng thái bắt đầu hợp lệ; form cần có họ tên, email, mật khẩu và xác nhận mật khẩu theo FR-01. Chi tiết bố cục/thông báo chưa định nghĩa ở nguồn đang dùng. | Màn hình và sự hiện diện/có thể nhập của bốn trường; dữ liệu sau khi nhập. | D-R01–D-R07; FR-01, FR-20 |
| **D-EC-23** | Chuyển sang Login sau đăng ký thành công | Chỉ sau một đăng ký hợp lệ được chấp nhận | Mobile chuyển tới màn hình Đăng nhập. Đây là trạng thái sau hợp lệ được FR-01 nêu. | Màn hình hiện tại sau submit; API không thể chứng minh điều hướng. | D-R08, D-R09 |
| **D-EC-24** | Kết quả thất bại khi app vẫn ở Register hay chuyển màn khác | Submit dữ liệu sai hoặc gặp lỗi mạng | **Chưa có oracle điều hướng/giữ dữ liệu khi thất bại**; không giả định app phải ở lại Register dù đó là hành vi thường gặp. | Ghi màn hình thực tế và dữ liệu form nếu sau này chạy; không gán expected. | D-R01–D-R07, câu hỏi D-R08 |

Login trước khi bắt đầu đăng ký là một trạng thái workflow khác, không tự xem là invalid: cần đi vào luồng Register trước khi nhập form. Nguồn hiện tại chưa nêu cách điều hướng cụ thể từ Login sang Register; ghi nhận ở Q-05.

## 8. Câu hỏi/miền thăm dò chưa có expected

- **Q-01 — Họ tên/khoảng trắng:** `name = "   "` có được coi là thiếu không? Có trim đầu/cuối không?
- **Q-02 — Email có khoảng trắng:** `" vinh.new@example.com "` có được trim trước khi validate/lưu không?
- **Q-03 — Email normalization:** format hợp lệ ngoài ví dụ nào được chấp nhận? So uniqueness có phân biệt hoa/thường không?
- **Q-04 — Unicode/password:** Unicode được tính độ dài như thế nào? Chữ hoa/thường và chữ số Unicode có được tính? Nếu password có thêm ký tự đặc biệt ngoài `@$!%*?&`, nó được chấp nhận hay từ chối?
- **Q-05 — Navigation:** cách mở Register từ Home/Login và hành vi form sau failure chưa được mô tả đầy đủ.
- **Q-06 — Error contract:** message, HTTP status/body, thứ tự ưu tiên khi nhiều field sai, network retry và gửi lặp chưa được nêu.
- **Q-07 — Email uniqueness race:** hai request đồng thời cho cùng email sẽ được xử lý thế nào chưa có oracle.

Các probe Q-01–Q-07 chưa được xếp vào lớp valid/invalid có expected; chúng cần clarification hoặc chỉ được ghi observation, không dùng để kết luận bug.

## 9. Lý do phân lớp

- Mỗi điều kiện bắt buộc hoặc định dạng/uniqueness có nhóm đạt và nhóm vi phạm riêng; đại diện sai email format và email đã tồn tại tách biệt để không nhập nhằng giữa cú pháp và trạng thái hệ thống.
- Password được chia theo điểm dưới/đúng/trên ngưỡng tối thiểu và theo từng nhóm ký tự bắt buộc. Các mẫu thiếu một nhóm vẫn dài 8 ký tự và có các nhóm khác để cô lập nguyên nhân.
- Confirm được chia khớp/không khớp/rỗng vì các trạng thái có expected khác nhau ở UI. Không tạo lớp API riêng cho confirm vì endpoint không nhận field này trong contract.
- API success, API rejection và network failure là các trạng thái đầu ra khác nhau. Chỉ response success có status/body rõ trong API spec; lỗi API/network thiếu oracle nên không được gán kết quả cụ thể.
- Register/Login được mô tả như trạng thái workflow trước/sau. Chỉ chuyển sang Login sau success là expected rõ; điều hướng/error state sau failure còn cần xác minh.

## Trạng thái

Chưa tạo test case Domain/BVA, chưa chạy SUT, chưa ghi actual/Pass/Fail, chưa có human review hay phê duyệt.

## Nguồn

- [01-requirements.md](01-requirements.md), D-R01–D-R09.
- SRS: [eshop-sut/README.md](https://github.com/ttbhanh/eshop-sut/blob/85af3ba875c88283615e22cb108f13e2fccaf0e9/README.md), FR-01 và FR-20.
- API: [eshop-sut/api_specification.md](https://github.com/ttbhanh/eshop-sut/blob/85af3ba875c88283615e22cb108f13e2fccaf0e9/api_specification.md), §1.1.
- Phân công: [group_feature_assignment.md](../../group_feature_assignment.md), thành viên 2, Pool D.
- Slide Domain/BVA: [domain-testing-vn.pdf](../../slide/domain-testing-vn.pdf), trang 6–10 và 19–23; [domain-testing-en.pdf](../../slide/domain-testing-en.pdf), trang 13–19 và 20–24.

