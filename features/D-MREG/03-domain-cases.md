# D-MREG — Ca kiểm thử Domain trên Mobile

**Thiết bị thiết kế:** Android Emulator AVD `Pixel 9`, Android 15 / API 35, Expo Go SDK 54 (hoặc thiết bị Android thật; khi chạy phải ghi model và Android version thực tế). Baseline app và backend ghi theo `reports/environment.md` tại thời điểm thực thi.

**Phạm vi:** kiểm tra form đăng ký bằng thao tác trên Mobile UI. Không gọi API riêng để thay thế kiểm tra giao diện. API response và trạng thái account chỉ là bằng chứng bổ sung cho hành động submit từ app. File này chỉ thiết kế ca: chưa chạy, chưa điền actual/status và chưa có human review.

## Cách dùng chung cho từng ca

- **Bắt đầu độc lập:** mở app trên emulator/thiết bị, từ Home chạm **Đăng nhập**, rồi dùng liên kết trên màn hình Login để mở **Đăng ký**. Ghi đúng nhãn UI nếu khác. Không xóa database, account mẫu hoặc account test cũ. Nếu chưa vào được Register, lưu ảnh màn hình và đánh dấu các ca phụ thuộc form là Blocked khi thực thi; vẫn chạy các ca độc lập có thể làm.
- **Làm sạch form:** bắt đầu mỗi ca ở Register mới. Với từng ô cần nhập, chạm ô, nhấn giữ nội dung → **Chọn tất cả** → Backspace; nếu ô trống thì để nguyên. Nhập dữ liệu theo thứ tự họ tên, email, mật khẩu, xác nhận. Trường mật khẩu phải để chế độ ẩn; không bấm nút hiện mật khẩu. Sau khi nhập, chạm vùng tiêu đề để ẩn bàn phím, chụp checkpoint form, cuộn nếu cần để thấy nút submit, rồi chạm nút đăng ký một lần. Ghi nhãn nút thực tế nếu khác.
- **Dữ liệu:** mọi chuỗi mật khẩu dưới đây là dữ liệu giả dành riêng cho kiểm thử, không phải mật khẩu thật. Không ghi password vào tên ảnh, log công khai hoặc AI Audit. Ảnh chụp phải giữ trường mật khẩu được che.
- **Email chưa tồn tại:** với ca cần email mới, kiểm tra trước bằng truy vấn chỉ đọc trên database của backend test (nếu được phép): `SELECT COUNT(*) FROM users WHERE email = ?` với email cụ thể làm bind parameter; kết quả tiền điều kiện phải là 0. Nếu không có quyền đọc DB, ghi rõ cách xác minh khác và không tuyên bố chắc chắn email mới.
- **Xác nhận không tạo account khi bị từ chối:** sau mỗi submit âm, dùng kết nối DB chỉ đọc tới database của backend test và truy vấn cùng bảng/field bằng bind parameter; expected là số account theo email vẫn 0 (ca trùng email phải còn đúng 1). Không chạy lệnh ghi/xóa. Lưu query đã bỏ bí mật và kết quả count trong evidence. Nếu không thể truy vấn an toàn, ghi phần account state là chưa xác minh; không suy ra từ việc UI báo lỗi.
- **Expected lỗi:** “bị từ chối/không đăng ký thành công” nghĩa là không tạo account mới và không có điều hướng thành công tới Login. Không yêu cầu câu chữ, màu sắc hay vị trí thông báo cụ thể vì SRS/API không quy định. Có thể chụp thông báo thực tế nhưng không chấm câu chữ.
- **Evidence:** lưu ảnh checkpoint trước submit và sau submit dưới `evidence/D-MREG/` theo tên nêu ở mỗi ca. Đối với ca có kết quả account, lưu thêm redacted response/request hoặc kết quả DB read-only nếu quan sát được. Không chụp bàn phím nếu làm lộ dữ liệu nhạy cảm; dùng dữ liệu giả.
- **Ký hiệu:** `[điền khi chạy]` là thông tin môi trường cần ghi vào execution log; không phải actual của file thiết kế. Một ca chưa được chạy không được đánh dấu Pass/Fail.

## Danh sách ca

### D-DT-001 — Form đăng ký có đủ bốn trường

- **Mục tiêu:** kiểm tra hiện diện và khả năng nhập của họ tên, email, mật khẩu, xác nhận mật khẩu.
- **Loại:** Mobile UI — kiểm tra sự hiện diện.
- **Thiết bị/OS:** Android Emulator `Pixel 9`, Android 15/API 35, Expo Go SDK 54; hoặc ghi model/OS/API thực tế khi dùng thiết bị thật.
- **Trạng thái app:** mở app → Home → Login → Register; chưa submit, form mới.
- **Account/email:** không cần account; chưa nhập email.
- **Dữ liệu:** không nhập.
- **Thao tác:** (1) mở Register theo quy trình chung; (2) quan sát từng ô; (3) chạm lần lượt từng ô và xác nhận bàn phím/nhập liệu có thể sử dụng; (4) ẩn bàn phím bằng cách chạm vùng tiêu đề; (5) chụp toàn bộ form, cuộn để quan sát phần dưới nếu form dài.
- **Expected:** form Mobile có đủ bốn trường theo D-R01, D-R02, D-R05, D-R07. Không có yêu cầu về bố cục hay nhãn chính xác ngoài ý nghĩa trường.
- **EC / requirement:** D-EC-22; D-R01, D-R02, D-R05, D-R07.
- **Phụ thuộc:** nếu thiếu trường, lưu ảnh và khi thực thi đánh dấu các ca cần trường đó là Blocked; vẫn tiếp tục ca không phụ thuộc được.
- **Evidence:** `evidence/D-MREG/D-DT-001-form-four-fields.png` (có thể thêm ảnh riêng sau cuộn nếu không thấy đủ bốn ô trong một ảnh).

### D-DT-002 — Đăng ký thành công với email mới

- **Mục tiêu:** xác nhận một bộ dữ liệu hợp lệ được chấp nhận, tạo account và đưa app về Login.
- **Loại:** Mobile UI; API/DB chỉ bổ sung bằng chứng.
- **Thiết bị/OS:** Android Emulator `Pixel 9`, Android 15/API 35, Expo Go SDK 54; hoặc ghi thiết bị thật.
- **Trạng thái app:** Register mới; backend test sẵn sàng; email chưa tồn tại.
- **Account/email:** email `vinh.dmreg.success01@example.com`, cần count 0 trước ca; sau thành công kỳ vọng count 1.
- **Dữ liệu:** họ tên `Nguyen Le The Vinh`; email `vinh.dmreg.success01@example.com`; mật khẩu giả `Aa1!bbbb`; xác nhận `Aa1!bbbb`.
- **Thao tác:** (1) nhập họ tên; (2) nhập email; (3) nhập password trong ô đang ẩn; (4) nhập confirm giống hệt; (5) chạm tiêu đề để ẩn bàn phím; (6) kiểm tra các ô đã được điền, chụp ảnh trước submit (password được che); (7) cuộn tới nút nếu cần và chạm submit đúng một lần; (8) chụp màn hình sau phản hồi; (9) quan sát màn hình hiện tại; (10) kiểm tra account bằng DB read-only hoặc response API của request do app gửi.
- **Expected:** với các điều kiện hợp lệ và email mới, account được tạo; API success contract nếu quan sát được là 200 với `message` và `id`; Mobile chuyển tới Login. Không đặt câu chữ thông báo thành công vì chưa được quy định.
- **EC / requirement:** D-EC-02, D-EC-05, D-EC-09, D-EC-15, D-EC-18, D-EC-22, D-EC-23; D-R01–D-R09.
- **Evidence:** `evidence/D-MREG/D-DT-002-before-submit.png`, `evidence/D-MREG/D-DT-002-login-after-success.png`, và bản ghi redacted response/count. Không lưu mật khẩu.

### D-DT-003 — Họ tên để trống

- **Mục tiêu:** cô lập kiểm tra họ tên bắt buộc.
- **Loại:** Mobile UI; DB read-only hậu kiểm.
- **Thiết bị/OS:** Android Emulator `Pixel 9`, Android 15/API 35, Expo Go SDK 54; hoặc ghi thiết bị thật.
- **Trạng thái app:** Register mới, email chưa tồn tại.
- **Account/email:** `vinh.dmreg.nameempty@example.com`, count 0 trước và sau khi bị từ chối.
- **Dữ liệu:** họ tên rỗng; email `vinh.dmreg.nameempty@example.com`; password `Aa1!bbbb`; confirm `Aa1!bbbb`.
- **Thao tác:** để trống họ tên; nhập ba trường còn lại; chạm vùng tiêu đề để ẩn bàn phím; chụp trước submit; chạm submit một lần; chụp phản hồi; xác minh count email bằng DB chỉ đọc.
- **Expected:** không được đăng ký thành công vì họ tên bắt buộc; không tạo account. Không kết luận cách xử lý họ tên chỉ có khoảng trắng.
- **EC / requirement:** D-EC-01, D-EC-05, D-EC-09, D-EC-15, D-EC-19; D-R01, D-R08.
- **Evidence:** `evidence/D-MREG/D-DT-003-name-empty-before.png`, `evidence/D-MREG/D-DT-003-name-empty-after.png`, read-only count.

### D-DT-004 — Email để trống

- **Mục tiêu:** cô lập kiểm tra email bắt buộc.
- **Loại:** Mobile UI; DB read-only hậu kiểm.
- **Thiết bị/OS:** Android Emulator `Pixel 9`, Android 15/API 35, Expo Go SDK 54; hoặc ghi thiết bị thật.
- **Trạng thái app:** Register mới.
- **Account/email:** không có email để truy vấn; các input khác hợp lệ. Trước submit, ghi tổng số account trong DB test bằng `SELECT COUNT(*) FROM users`; sau phản hồi đối chiếu tổng số này trong cùng DB.
- **Dữ liệu:** họ tên `Nguyen Le The Vinh`; email rỗng; password `Aa1!bbbb`; confirm `Aa1!bbbb`.
- **Thao tác:** nhập họ tên; để trống email; nhập hai trường password; ẩn bàn phím; chụp trước submit; chạm submit một lần; chụp kết quả và quan sát có chuyển Login không.
- **Expected:** không đăng ký thành công do email bắt buộc; không tạo account mới, nên tổng số account trong DB test không tăng trong khoảng ca. Dùng DB test riêng và ghi thời điểm chụp count để tránh nhầm với đăng ký đồng thời. SRS/API không chốt phản hồi cụ thể cho email rỗng. Lưu request/response đã che nếu app gửi request; không tự tạo expected mới.
- **EC / requirement:** D-EC-03, D-EC-09, D-EC-15, D-EC-19; D-R02, D-R08.
- **Evidence:** `evidence/D-MREG/D-DT-004-email-empty-before.png`, `evidence/D-MREG/D-DT-004-email-empty-after.png`, tổng count read-only trước/sau và redacted request/response nếu có.

### D-DT-005 — Email sai định dạng

- **Mục tiêu:** kiểm tra một đại diện email sai định dạng, giữ các điều kiện khác hợp lệ.
- **Loại:** Mobile UI; DB read-only hậu kiểm.
- **Thiết bị/OS:** Android Emulator `Pixel 9`, Android 15/API 35, Expo Go SDK 54; hoặc ghi thiết bị thật.
- **Trạng thái app:** Register mới.
- **Account/email:** `vinh.dmreg.badformat@example` (không có phần domain dạng `domain.com`); trước ca chưa được dùng làm account test.
- **Dữ liệu:** họ tên `Nguyen Le The Vinh`; email `vinh.dmreg.badformat@example`; password/confirm `Aa1!bbbb`.
- **Thao tác:** nhập bốn trường như trên; ẩn bàn phím; chụp trước submit; chạm submit; chụp phản hồi; nếu app gửi request thì lưu redacted response; kiểm tra account state theo khóa email bằng DB chỉ đọc nếu field cho phép.
- **Expected:** không được đăng ký thành công vì email không theo dạng ví dụ hợp lệ `user@domain.com`; không tạo account mới. Quy tắc email chi tiết và câu chữ lỗi chưa được quy định.
- **EC / requirement:** D-EC-04, D-EC-09, D-EC-15, D-EC-19; D-R03, D-R08.
- **Evidence:** `evidence/D-MREG/D-DT-005-email-format-before.png`, `evidence/D-MREG/D-DT-005-email-format-after.png`, redacted response/count nếu quan sát được.

### D-DT-006 — Email hợp lệ nhưng đã tồn tại

- **Mục tiêu:** kiểm tra tính duy nhất của email, không gộp với lỗi định dạng.
- **Loại:** Mobile UI; DB read-only trước/sau.
- **Thiết bị/OS:** Android Emulator `Pixel 9`, Android 15/API 35, Expo Go SDK 54; hoặc ghi thiết bị thật.
- **Trạng thái app:** trước test phải có đúng một account fixture do kiểm thử tạo; sau khi chuẩn bị fixture, mở Register mới.
- **Account/email:** fixture test `vinh.dmreg.fixture@example.com`, count 1. Nếu chưa có fixture, tạo trước bằng luồng UI với bộ dữ liệu hợp lệ dành riêng cho fixture và ghi evidence/setup riêng; không dùng account mẫu hoặc email của người thật. Không xóa fixture.
- **Dữ liệu mục tiêu:** họ tên `Nguyen Le The Vinh Duplicate`; email fixture `vinh.dmreg.fixture@example.com`; password `Aa1!bbbb`; confirm `Aa1!bbbb`.
- **Thao tác:** xác minh count fixture là 1; mở Register mới; nhập dữ liệu mục tiêu; ẩn bàn phím; chụp trước submit; chạm submit một lần; chụp phản hồi; kiểm tra count vẫn bằng 1 và account fixture vẫn tồn tại bằng DB read-only.
- **Expected:** từ chối tạo account trùng theo yêu cầu uniqueness; account ban đầu vẫn còn đúng một bản ghi. Không tự đặt status/body/câu thông báo.
- **EC / requirement:** D-EC-06, D-EC-09, D-EC-15, D-EC-19; D-R03, D-R04, D-R08.
- **Evidence:** `evidence/D-MREG/D-DT-006-existing-email-before.png`, `evidence/D-MREG/D-DT-006-existing-email-after.png`, fixture setup reference, read-only count trước/sau, redacted response nếu có.

### D-DT-007 — Mật khẩu để trống

- **Mục tiêu:** cô lập điều kiện password bắt buộc.
- **Loại:** Mobile UI; DB read-only hậu kiểm.
- **Thiết bị/OS:** Android Emulator `Pixel 9`, Android 15/API 35, Expo Go SDK 54; hoặc ghi thiết bị thật.
- **Trạng thái app:** Register mới; email chưa tồn tại.
- **Account/email:** `vinh.dmreg.pass-empty@example.com`, count 0 trước/sau.
- **Dữ liệu:** họ tên `Nguyen Le The Vinh`; email trên; password rỗng; confirm rỗng.
- **Thao tác:** nhập họ tên/email; để password và confirm rỗng; ẩn bàn phím; chụp trước submit; chạm submit một lần; chụp phản hồi; kiểm tra count email bằng DB read-only.
- **Expected:** không đăng ký thành công vì password bắt buộc; không tạo account. Confirm cũng rỗng nhưng D-R07 yêu cầu confirm bắt buộc, do đó để đảm bảo ca âm chỉ có một điều kiện sai, **không dùng ca này để kết luận hành vi confirm rỗng**. Confirm cần được điền hợp lệ nếu UI cho phép mà password rỗng không; nếu form bắt buộc so khớp để nhận confirm, ghi rõ ràng buộc tương tác và không kết luận riêng phần confirm.
- **EC / requirement:** D-EC-07, D-EC-15 (confirm được cung cấp cùng giá trị rỗng không thể khớp password rỗng; xem ghi chú độc lập bên dưới), D-EC-19; D-R05, D-R08.
- **Giới hạn cô lập:** password rỗng khiến không thể có confirm khác rỗng mà vẫn khớp. Đây là ràng buộc dữ liệu giữa hai trường; ca kiểm tra password rỗng đồng thời làm confirm rỗng. Không tính đây là bằng chứng riêng cho D-R07. Nếu SUT cho confirm rỗng nhưng có validation độc lập, ghi observation.
- **Evidence:** `evidence/D-MREG/D-DT-007-password-empty-before.png`, `evidence/D-MREG/D-DT-007-password-empty-after.png`, count nếu quan sát được.

### D-DT-008 — Mật khẩu thiếu chữ hoa

- **Mục tiêu:** cô lập điều kiện chữ hoa; độ dài, chữ thường, chữ số và ký tự thuộc tập đều hợp lệ.
- **Loại:** Mobile UI; DB read-only hậu kiểm.
- **Thiết bị/OS:** Android Emulator `Pixel 9`, Android 15/API 35, Expo Go SDK 54; hoặc ghi thiết bị thật.
- **Trạng thái app:** Register mới; email chưa tồn tại.
- **Account/email:** `vinh.dmreg.no-upper@example.com`, count 0 trước/sau.
- **Dữ liệu:** họ tên `Nguyen Le The Vinh`; email trên; password/confirm `aa1!bbbb` (8 ký tự); không có chữ hoa, có chữ thường, số và `!`.
- **Thao tác:** nhập từng trường; với password dùng bàn phím hiện lên, giữ ô secure text; ẩn bàn phím; chụp trước submit; submit một lần; chụp phản hồi; query count chỉ đọc.
- **Expected:** từ chối do thiếu chữ hoa; không tạo account. Không chấm câu chữ lỗi.
- **EC / requirement:** D-EC-11, D-EC-05, D-EC-15, D-EC-19; D-R06, D-R08.
- **Evidence:** `evidence/D-MREG/D-DT-008-no-uppercase-before.png`, `evidence/D-MREG/D-DT-008-no-uppercase-after.png`, count/response nếu có.

### D-DT-009 — Mật khẩu thiếu chữ thường

- **Mục tiêu:** cô lập điều kiện chữ thường; các điều kiện password khác hợp lệ.
- **Loại:** Mobile UI; DB read-only hậu kiểm.
- **Thiết bị/OS:** Android Emulator `Pixel 9`, Android 15/API 35, Expo Go SDK 54; hoặc ghi thiết bị thật.
- **Trạng thái app:** Register mới; email chưa tồn tại.
- **Account/email:** `vinh.dmreg.no-lower@example.com`, count 0 trước/sau.
- **Dữ liệu:** họ tên `Nguyen Le The Vinh`; email trên; password/confirm `AA1!BBBB` (8 ký tự).
- **Thao tác:** nhập dữ liệu; ẩn bàn phím; chụp trước submit; submit một lần; chụp phản hồi; kiểm tra count chỉ đọc.
- **Expected:** từ chối do thiếu chữ thường; không tạo account.
- **EC / requirement:** D-EC-12, D-EC-05, D-EC-15, D-EC-19; D-R06, D-R08.
- **Evidence:** `evidence/D-MREG/D-DT-009-no-lowercase-before.png`, `evidence/D-MREG/D-DT-009-no-lowercase-after.png`, count/response nếu có.

### D-DT-010 — Mật khẩu thiếu chữ số

- **Mục tiêu:** cô lập điều kiện chữ số; độ dài và ba nhóm còn lại đạt.
- **Loại:** Mobile UI; DB read-only hậu kiểm.
- **Thiết bị/OS:** Android Emulator `Pixel 9`, Android 15/API 35, Expo Go SDK 54; hoặc ghi thiết bị thật.
- **Trạng thái app:** Register mới; email chưa tồn tại.
- **Account/email:** `vinh.dmreg.no-digit@example.com`, count 0 trước/sau.
- **Dữ liệu:** họ tên `Nguyen Le The Vinh`; email trên; password/confirm `Aa!!bbbb` (8 ký tự).
- **Thao tác:** nhập dữ liệu; ẩn bàn phím; chụp trước submit; submit một lần; chụp phản hồi; query count chỉ đọc.
- **Expected:** từ chối do thiếu chữ số; không tạo account.
- **EC / requirement:** D-EC-13, D-EC-05, D-EC-15, D-EC-19; D-R06, D-R08.
- **Evidence:** `evidence/D-MREG/D-DT-010-no-digit-before.png`, `evidence/D-MREG/D-DT-010-no-digit-after.png`, count/response nếu có.

### D-DT-011 — Mật khẩu thiếu ký tự thuộc tập cho phép

- **Mục tiêu:** kiểm tra membership của ít nhất một ký tự trong `@$!%*?&`; không yêu cầu có toàn bộ ký tự trong tập.
- **Loại:** Mobile UI; DB read-only hậu kiểm.
- **Thiết bị/OS:** Android Emulator `Pixel 9`, Android 15/API 35, Expo Go SDK 54; hoặc ghi thiết bị thật.
- **Trạng thái app:** Register mới; email chưa tồn tại.
- **Account/email:** `vinh.dmreg.no-special@example.com`, count 0 trước/sau.
- **Dữ liệu:** họ tên `Nguyen Le The Vinh`; email trên; password/confirm `Aa12bbbb` (8 ký tự; hoa/thường/số có mặt, không có ký tự thuộc tập yêu cầu).
- **Thao tác:** nhập dữ liệu; nếu ký tự cần nhập không có trên bàn phím hiện tại, chuyển layout ký hiệu rồi nhập; quay lại layout chữ nếu cần; ẩn bàn phím; chụp trước submit; submit một lần; chụp phản hồi; query count chỉ đọc.
- **Expected:** từ chối do không có ký tự nào thuộc `@$!%*?&`; không tạo account. Không suy ra rằng ký tự đặc biệt khác bị cấm trong trường hợp password có chứa ký tự hợp lệ.
- **EC / requirement:** D-EC-14, D-EC-05, D-EC-15, D-EC-19; D-R06, D-R08.
- **Evidence:** `evidence/D-MREG/D-DT-011-no-allowed-special-before.png`, `evidence/D-MREG/D-DT-011-no-allowed-special-after.png`, count/response nếu có.

### D-DT-012 — Xác nhận mật khẩu không khớp

- **Mục tiêu:** cô lập điều kiện hai trường password không khớp.
- **Loại:** Mobile UI; DB read-only hậu kiểm.
- **Thiết bị/OS:** Android Emulator `Pixel 9`, Android 15/API 35, Expo Go SDK 54; hoặc ghi thiết bị thật.
- **Trạng thái app:** Register mới; email chưa tồn tại.
- **Account/email:** `vinh.dmreg.confirm-mismatch@example.com`, count 0 trước/sau.
- **Dữ liệu:** họ tên `Nguyen Le The Vinh`; email trên; password `Aa1!bbbb`; confirm `Aa1!bbbc`. Cả hai dài 8 và thỏa password policy; chỉ khác một ký tự nên mismatch là điều kiện sai duy nhất.
- **Thao tác:** nhập dữ liệu; sau mỗi ô password ẩn bàn phím/chuyển focus theo UI; nhập confirm khác một ký tự; ẩn bàn phím; chụp trước submit; submit một lần; chụp phản hồi; query count chỉ đọc.
- **Expected:** từ chối đăng ký vì confirm không khớp; không tạo account. Không có kỳ vọng về câu chữ cụ thể hoặc API field `confirmPassword`.
- **EC / requirement:** D-EC-16, D-EC-05, D-EC-09, D-EC-19; D-R07, D-R08.
- **Evidence:** `evidence/D-MREG/D-DT-012-confirm-mismatch-before.png`, `evidence/D-MREG/D-DT-012-confirm-mismatch-after.png`, count/response nếu có.

### D-DT-013 — Xác nhận mật khẩu để trống

- **Mục tiêu:** cô lập yêu cầu xác nhận phải được cung cấp trong form.
- **Loại:** Mobile UI; DB read-only hậu kiểm.
- **Thiết bị/OS:** Android Emulator `Pixel 9`, Android 15/API 35, Expo Go SDK 54; hoặc ghi thiết bị thật.
- **Trạng thái app:** Register mới; email chưa tồn tại.
- **Account/email:** `vinh.dmreg.confirm-empty@example.com`, count 0 trước/sau.
- **Dữ liệu:** họ tên `Nguyen Le The Vinh`; email trên; password `Aa1!bbbb`; confirm rỗng.
- **Thao tác:** nhập họ tên/email/password; để trống confirm; ẩn bàn phím; chụp trước submit; submit một lần; chụp phản hồi; query count chỉ đọc.
- **Expected:** không đăng ký thành công vì confirm là trường bắt buộc theo yêu cầu form; không tạo account. Không yêu cầu thông báo cụ thể.
- **EC / requirement:** D-EC-17, D-EC-05, D-EC-09, D-EC-19; D-R07, D-R08.
- **Evidence:** `evidence/D-MREG/D-DT-013-confirm-empty-before.png`, `evidence/D-MREG/D-DT-013-confirm-empty-after.png`, count/response nếu có.

## Phụ thuộc và giới hạn thiết kế

- D-DT-002 và fixture của D-DT-006 là các thao tác thành công riêng, mỗi lần dùng một email riêng. Không dùng lại email thành công cho ca thành công khác; D-DT-006 chỉ tái sử dụng email fixture đã tạo để kiểm tra uniqueness.
- Phụ thuộc trường: D-DT-002 cần đủ cả bốn trường; D-DT-003 cần họ tên; D-DT-004–D-DT-006 cần email; D-DT-007–D-DT-011 cần mật khẩu; D-DT-012–D-DT-013 cần xác nhận mật khẩu. Nếu field cần cho một ca không hiện diện/không thao tác được, lưu ảnh ở D-DT-001 và đánh dấu đúng ca phụ thuộc đó Blocked khi chạy. Tiếp tục các ca không phụ thuộc field vắng mặt.
- D-DT-003–D-DT-013 là các ca âm; trong từng ca chỉ một điều kiện nghiệp vụ bị vi phạm, ngoại trừ ràng buộc password rỗng/confirm rỗng đã giải thích ở D-DT-007. Ca D-DT-007 không được dùng làm bằng chứng cho hành vi confirm rỗng; D-DT-013 kiểm tra riêng confirm rỗng với password hợp lệ.
- Nếu không có đủ bốn trường, lưu bằng chứng ở D-DT-001. Ca cần trường vắng mặt phụ thuộc trường đó và khi thực thi phải ghi Blocked; ca độc lập vẫn tiếp tục. Không giả định có thể điền hoặc tương tác với control không tồn tại.
- Các câu hỏi về trim, Unicode, giới hạn độ dài, thông báo cụ thể, lỗi mạng, retry/gửi lặp và race condition vẫn là oracle chưa chốt trong `01-requirements.md`/`02-domains.md`; các ca trên không kết luận những hành vi đó.
- Không bao gồm BVA riêng; các boundary cases thuộc file BVA tiếp theo. Không điền actual, status hoặc kết luận bug trong tài liệu thiết kế này.

## Nguồn

- [01-requirements.md](01-requirements.md), D-R01–D-R09.
- [02-domains.md](02-domains.md), D-EC-01–D-EC-24.
- SRS [`eshop-sut/README.md`](../../eshop-sut/README.md), FR-01 và FR-20; API [`eshop-sut/api_specification.md`](../../eshop-sut/api_specification.md), §1.1.
- Slide Domain Testing: [`slide/domain-testing-vn.pdf`](../../slide/domain-testing-vn.pdf), trang 6–10; [`slide/domain-testing-en.pdf`](../../slide/domain-testing-en.pdf), trang 13–19.
