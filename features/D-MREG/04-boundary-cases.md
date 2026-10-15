# D-MREG — Ca BVA và robustness cho đăng ký Mobile

**Thiết bị thiết kế:** Android Emulator AVD `Pixel 9`, Android 15 / API 35, Expo Go SDK 54. Có thể dùng thiết bị Android thật; khi chạy phải ghi model và phiên bản OS/API thực tế.

**Nguồn:** `01-requirements.md` D-R01–D-R09; `02-domains.md` D-EC-08–D-EC-14; `03-domain-cases.md` D-DT-008–D-DT-011; SRS FR-01/FR-20 và slide Domain/BVA. Chỉ độ dài tối thiểu password có giới hạn số được nêu nên mới áp dụng BVA số học. Thiếu từng nhóm ký tự là ca robustness/EC riêng, không gọi là điểm biên độ dài.

**Trạng thái:** thiết kế, chưa chạy; chưa ghi actual/status hay human review.

## Quy ước thực hiện và setup

- Mỗi ca chạy độc lập từ Home → **Đăng nhập** → liên kết mở **Đăng ký**; ghi lại nhãn UI nếu khác. Đảm bảo form mới. Nếu app không mở được Register, chụp ảnh và đánh dấu ca phụ thuộc là Blocked khi thực thi; tiếp tục ca độc lập có thể làm.
- Thiết bị mặc định là Pixel 9 / Android 15 / API 35 / Expo Go SDK 54. Khi dùng máy thật, thay bằng thông tin thiết bị thực tế trong execution log; không ghi giá trị dự kiến như môi trường đã chạy.
- Trước mỗi lần submit, kiểm tra email trong **DB backend test** bằng truy vấn chỉ đọc và bind parameter `SELECT COUNT(*) FROM users WHERE email = ?`. Email phải có count 0. Không dùng database mẫu để tạo account và không xóa account test sau khi chạy.
- Nhập họ tên `Nguyen Le The Vinh`; email theo từng ca; nhập password và confirm giống nhau. Giữ password ở chế độ ẩn. Sau nhập, chạm vùng tiêu đề để ẩn bàn phím, chụp ảnh form, cuộn nếu cần tới nút submit rồi chạm một lần. Sau submit chụp màn hình hiện tại và kiểm tra account state bằng DB read-only hoặc response của request do app gửi.
- Dùng các mật khẩu giả được nêu dưới đây, không phải mật khẩu thật. Không ghi password vào tên ảnh, AI Audit hay log chia sẻ; ảnh phải cho thấy password đã che.
- Tất cả D-BV-001–D-BV-007 cần thao tác được bốn trường của form. Nếu thiếu bất kỳ trường cần thiết nào, chụp bằng chứng hiện diện theo D-DT-001 và đánh dấu ca phụ thuộc đó Blocked khi chạy; tiếp tục ca nào vẫn có thể thực hiện mà không cần control bị thiếu.
- Với ca bị từ chối, hậu kiểm email có count 0. Với ca được chấp nhận, count dự kiến là 1 và Mobile tới màn hình Login. Không tự đặt câu chữ thông báo. Lỗi cụ thể, màu sắc hay vị trí báo lỗi không có expected trong SRS/API.
- `δ` là khoảng cách đến ngưỡng theo số ký tự: với ngưỡng tối thiểu 8, các giá trị `7, 8, 9` lần lượt là `LB−1`, `LB`, `LB+1`. Không có UB password được nêu.
- Lưu evidence dưới `evidence/D-MREG/`. Không điền actual/status vào thiết kế.

## A. BVA độ dài password

### D-BV-001 — Độ dài 7 (LB−1)

- **Phân loại:** BVA — điểm ngay dưới lower bound `LB=8`, `δ=1`.
- **Mục tiêu:** cô lập điều kiện độ dài tối thiểu. Password vẫn có chữ hoa, chữ thường, chữ số và ký tự thuộc tập cho phép.
- **Thiết bị/OS:** Android Emulator `Pixel 9`, Android 15/API 35, Expo Go SDK 54; hoặc ghi Android device thực tế.
- **Trạng thái app:** Register mới, chưa submit.
- **Account/email trước:** email `vinh.dmreg.len7@example.com` chưa tồn tại; DB test count 0.
- **Dữ liệu:** họ tên `Nguyen Le The Vinh`; email `vinh.dmreg.len7@example.com`; password `Aa1!bbb` (7 ký tự; hoa, thường, số và `!` đều có); confirm `Aa1!bbb`.
- **Thao tác:** (1) mở Register; (2) nhập tên/email; (3) nhập password 7 ký tự trong secure field; (4) nhập confirm trùng khớp; (5) ẩn bàn phím; (6) chụp form trước submit; (7) submit một lần; (8) chụp kết quả; (9) truy vấn count email chỉ đọc.
- **Expected:** bị từ chối vì password ngắn hơn 8; không tạo account, email vẫn count 0. Không gán expected cho câu chữ lỗi hay status/body API.
- **D-EC / D-R / TC liên quan:** D-EC-08 (dưới 8, đủ nhóm ký tự), D-EC-05, D-EC-15, D-R06, D-R08; liên hệ D-DT-008–D-DT-011 về từng nhóm ký tự nhưng đây không thay thế chúng.
- **Evidence:** `evidence/D-MREG/D-BV-001-len7-before.png`, `evidence/D-MREG/D-BV-001-len7-after.png`, DB count trước/sau và redacted response nếu app gửi request.

### D-BV-002 — Độ dài 8 (LB)

- **Phân loại:** BVA — lower bound `LB=8`, `δ=0`.
- **Mục tiêu:** xác nhận giá trị đúng tại độ dài tối thiểu, đồng thời các nhóm ký tự khác đều đạt.
- **Thiết bị/OS:** Android Emulator `Pixel 9`, Android 15/API 35, Expo Go SDK 54; hoặc ghi Android device thực tế.
- **Trạng thái app:** Register mới, backend test sẵn sàng.
- **Account/email trước:** email `vinh.dmreg.len8@example.com` chưa tồn tại; DB test count 0. Đây là email riêng cho ca thành công này.
- **Dữ liệu:** họ tên `Nguyen Le The Vinh`; email `vinh.dmreg.len8@example.com`; password `Aa1!bbbb` (8 ký tự); confirm `Aa1!bbbb`.
- **Thao tác:** (1) vào Register mới; (2) nhập họ tên/email; (3) nhập mật khẩu 8 ký tự và confirm khớp; (4) ẩn bàn phím; (5) chụp form trước submit; (6) bấm submit một lần; (7) chụp màn hình sau phản hồi; (8) quan sát điều hướng; (9) xác minh account count.
- **Expected:** độ dài 8 đạt riêng điều kiện D-R06. Với các input còn lại hợp lệ và email mới, kỳ vọng đăng ký được chấp nhận, account count 1, API success contract nếu quan sát được là 200 với `message` và `id`, app chuyển tới Login. Kết quả tổng thể vẫn phụ thuộc các trường khác và kết nối/backend hoạt động.
- **D-EC / D-R / TC liên quan:** D-EC-09, D-EC-05, D-EC-15, D-EC-18, D-EC-23; D-R01–D-R09; D-DT-002 là ca thành công Domain với email khác.
- **Evidence:** `evidence/D-MREG/D-BV-002-len8-before.png`, `evidence/D-MREG/D-BV-002-len8-login.png`, read-only count trước/sau và redacted response.

### D-BV-003 — Độ dài 9 (LB+1)

- **Phân loại:** BVA — ngay trên lower bound `LB=8`, `δ=1`. SRS không nêu upper bound.
- **Mục tiêu:** xác nhận độ dài trên ngưỡng vẫn đạt điều kiện tối thiểu; không suy ra giới hạn trên.
- **Thiết bị/OS:** Android Emulator `Pixel 9`, Android 15/API 35, Expo Go SDK 54; hoặc ghi Android device thực tế.
- **Trạng thái app:** Register mới, backend test sẵn sàng.
- **Account/email trước:** email `vinh.dmreg.len9@example.com` chưa tồn tại; DB test count 0. Dùng email riêng, không tái sử dụng email của D-BV-002.
- **Dữ liệu:** họ tên `Nguyen Le The Vinh`; email `vinh.dmreg.len9@example.com`; password `Aa1!bbbbb` (9 ký tự); confirm `Aa1!bbbbb`.
- **Thao tác:** (1) vào Register mới; (2) nhập họ tên/email; (3) nhập mật khẩu 9 ký tự và confirm khớp; (4) ẩn bàn phím; (5) chụp form trước submit; (6) bấm submit một lần; (7) chụp phản hồi; (8) quan sát màn Login; (9) xác minh account count.
- **Expected:** độ dài 9 đạt điều kiện “tối thiểu 8”; với các trường khác hợp lệ và email mới, kỳ vọng đăng ký thành công, account count 1 và điều hướng Login. Đây không phải kiểm tra UB; không kỳ vọng từ chối ở 9.
- **D-EC / D-R / TC liên quan:** D-EC-10, D-EC-05, D-EC-15, D-EC-18, D-EC-23; D-R01–D-R09; D-DT-002 là ca thành công Domain với email khác.
- **Evidence:** `evidence/D-MREG/D-BV-003-len9-before.png`, `evidence/D-MREG/D-BV-003-len9-login.png`, read-only count trước/sau và redacted response.

## B. Ca robustness/EC — thiếu một nhóm ký tự

Các ca dưới đây không phải điểm BVA theo thứ tự. Mỗi password có độ dài 8 và giữ các điều kiện còn lại hợp lệ, chỉ thiếu một nhóm ký tự. Đây là các ca tương đương/robustness được liên kết tới D-DT-008–D-DT-011.

### D-BV-004 — Robustness: thiếu chữ hoa

- **Phân loại:** EC/robustness, không phải BVA độ dài.
- **Thiết bị/OS:** Android Emulator `Pixel 9`, Android 15/API 35, Expo Go SDK 54; hoặc ghi Android device thực tế.
- **Trạng thái app:** Register mới.
- **Account/email trước:** `vinh.dmreg.rb-no-upper@example.com`, count 0.
- **Dữ liệu:** họ tên `Nguyen Le The Vinh`; email trên; password/confirm `aa1!bbbb` (8 ký tự, thiếu chữ hoa duy nhất).
- **Thao tác:** mở Register; nhập bốn trường; ẩn bàn phím; chụp trước submit; submit một lần; chụp phản hồi; kiểm tra email count read-only.
- **Expected:** bị từ chối vì thiếu chữ hoa theo D-R06; không tạo account. Không chấm câu chữ lỗi.
- **D-EC / D-R / TC liên quan:** D-EC-11; D-R06, D-R08; ca Domain D-DT-008.
- **Evidence:** `evidence/D-MREG/D-BV-004-no-uppercase-before.png`, `evidence/D-MREG/D-BV-004-no-uppercase-after.png`, count/response nếu có.

### D-BV-005 — Robustness: thiếu chữ thường

- **Phân loại:** EC/robustness, không phải BVA độ dài.
- **Thiết bị/OS:** Android Emulator `Pixel 9`, Android 15/API 35, Expo Go SDK 54; hoặc ghi Android device thực tế.
- **Trạng thái app:** Register mới.
- **Account/email trước:** `vinh.dmreg.rb-no-lower@example.com`, count 0.
- **Dữ liệu:** họ tên `Nguyen Le The Vinh`; email trên; password/confirm `AA1!BBBB` (8 ký tự, thiếu chữ thường duy nhất).
- **Thao tác:** mở Register; nhập bốn trường; ẩn bàn phím; chụp trước submit; submit một lần; chụp phản hồi; kiểm tra email count read-only.
- **Expected:** bị từ chối vì thiếu chữ thường theo D-R06; không tạo account.
- **D-EC / D-R / TC liên quan:** D-EC-12; D-R06, D-R08; ca Domain D-DT-009.
- **Evidence:** `evidence/D-MREG/D-BV-005-no-lowercase-before.png`, `evidence/D-MREG/D-BV-005-no-lowercase-after.png`, count/response nếu có.

### D-BV-006 — Robustness: thiếu chữ số

- **Phân loại:** EC/robustness, không phải BVA độ dài.
- **Thiết bị/OS:** Android Emulator `Pixel 9`, Android 15/API 35, Expo Go SDK 54; hoặc ghi Android device thực tế.
- **Trạng thái app:** Register mới.
- **Account/email trước:** `vinh.dmreg.rb-no-digit@example.com`, count 0.
- **Dữ liệu:** họ tên `Nguyen Le The Vinh`; email trên; password/confirm `Aa!!bbbb` (8 ký tự, thiếu chữ số duy nhất).
- **Thao tác:** mở Register; nhập bốn trường; ẩn bàn phím; chụp trước submit; submit một lần; chụp phản hồi; kiểm tra email count read-only.
- **Expected:** bị từ chối vì thiếu chữ số theo D-R06; không tạo account.
- **D-EC / D-R / TC liên quan:** D-EC-13; D-R06, D-R08; ca Domain D-DT-010.
- **Evidence:** `evidence/D-MREG/D-BV-006-no-digit-before.png`, `evidence/D-MREG/D-BV-006-no-digit-after.png`, count/response nếu có.

### D-BV-007 — Robustness: thiếu ký tự thuộc tập `@$!%*?&`

- **Phân loại:** EC/robustness, không phải BVA độ dài. Kiểm tra membership trong tập, không yêu cầu chuỗi có mọi ký tự trong tập.
- **Thiết bị/OS:** Android Emulator `Pixel 9`, Android 15/API 35, Expo Go SDK 54; hoặc ghi Android device thực tế.
- **Trạng thái app:** Register mới.
- **Account/email trước:** `vinh.dmreg.rb-no-allowed-special@example.com`, count 0.
- **Dữ liệu:** họ tên `Nguyen Le The Vinh`; email trên; password/confirm `Aa12bbbb` (8 ký tự, có hoa/thường/số nhưng không có ký tự nào trong tập yêu cầu).
- **Thao tác:** mở Register; nhập tên/email; nhập password và confirm (chuyển bàn phím sang ký hiệu khi cần); ẩn bàn phím; chụp trước submit; submit một lần; chụp phản hồi; kiểm tra email count read-only.
- **Expected:** bị từ chối vì password thiếu ký tự thuộc `@$!%*?&`; không tạo account. Không kết luận về việc có chấp nhận ký tự đặc biệt ngoài tập khi chuỗi đã có ký tự hợp lệ.
- **D-EC / D-R / TC liên quan:** D-EC-14; D-R06, D-R08; ca Domain D-DT-011.
- **Evidence:** `evidence/D-MREG/D-BV-007-no-allowed-special-before.png`, `evidence/D-MREG/D-BV-007-no-allowed-special-after.png`, count/response nếu có.

## Biên không thiết kế

- **Họ tên, email, xác nhận mật khẩu:** SRS không nêu giới hạn min/max số ký tự để áp dụng BVA độ dài. Không đặt max giả; ca rỗng/format/khớp là các lớp Domain ở `03-domain-cases.md`.
- **Password upper bound:** không có UB được nêu. D-BV-003 tại 9 ký tự chỉ là `LB+1`, không đại diện cho giới hạn trên.
- **Password length 0:** password rỗng đã là lớp bắt buộc D-EC-07 và ca D-DT-007; ca này không dùng để thay thế điểm `LB−1` có các nhóm ký tự hợp lệ.
- **Mạng, email race, trim/Unicode:** chưa có biên/expected đủ rõ; không tạo thêm BVA.

## Nguồn

- [01-requirements.md](01-requirements.md), D-R01–D-R09; password policy D-R06.
- [02-domains.md](02-domains.md), D-EC-08–D-EC-14.
- [03-domain-cases.md](03-domain-cases.md), D-DT-002, D-DT-007–D-DT-011.
- SRS [`eshop-sut/README.md`](../../eshop-sut/README.md), FR-01 và FR-20; API [`eshop-sut/api_specification.md`](../../eshop-sut/api_specification.md), §1.1.
- Slide Domain/BVA: [`slide/domain-testing-vn.pdf`](../../slide/domain-testing-vn.pdf), BVA trang 19–23; [`slide/domain-testing-en.pdf`](../../slide/domain-testing-en.pdf), BVA trang 20–24.
