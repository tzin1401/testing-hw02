# AI-023 — B-FR07 BVA output snapshot

Snapshot of `features/B-FR07/04-boundary-cases.md` at creation time.

# B-FR07 — Ca kiểm thử giá trị biên (BVA)

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2.
**Phạm vi:** Thiết kế BVA từ FR-06/FR-07 và phân công Thành viên 2; chưa chạy SUT, không có actual/status.

## Căn cứ và cách chọn biên

- FR-06 quy định ô nhập số lượng chỉ nhận số nguyên dương, tối thiểu là 1. Do quantity là số nguyên, bước nhỏ nhất quanh lower boundary là **δ = 1 đơn vị**: `LB−δ = 0`, `LB = 1`, `LB+δ = 2`.
- **Không có UB được nêu** cho quantity trong FR-06/FR-07 hoặc phân công Thành viên 2. Không dùng giá trị tùy đặt như 99/100 và không suy ra giới hạn từ tồn kho. Vì không có UB, không thiết kế ca `UB−1/UB/UB+1`.
- Giá trị `0` chỉ được thử tại ô nhập quantity nếu có thể nhập bằng thao tác người dùng. Không ép giá trị qua DOM, script hoặc API. Số âm/thập phân không phải là các ca nhập trực tiếp trong tài liệu BVA này: control có thể không nhận các kiểu/giá trị đó; chúng đã được đặt riêng trong Domain cases theo khả năng nhập của UI.
- Nút `+`/`−` là thao tác trạng thái, không phải ô nhập số. BVA của chúng được biểu diễn bằng quantity trước thao tác gần LB. SRS không nêu delta mỗi click; vì vậy chỉ kỳ vọng chiều thay đổi được yêu cầu, còn giá trị chính xác cần oracle bổ sung. Giảm từ 1 là transition riêng, chưa đặt expected cho cách xử lý.
- SRS không đặt giới hạn số dòng giỏ. Dùng một và nhiều dòng làm trạng thái đại diện theo Domain testing, không gọi chúng là biên hoặc UB.
- Công thức thành tiền `đơn giá × quantity` lấy từ phân công nhóm. Với P1 có giá đã biết 30.000.000 VND: q=1 → 30.000.000; q=2 → 60.000.000. Đây là kiểm tra thành tiền dòng; không dùng để tự suy ra công thức tổng giỏ.

## Chuẩn bị độc lập và bằng chứng

1. Dùng tài khoản kiểm thử riêng đã đăng nhập. Kiểm tra bằng giao diện, chỉ đọc, fixture P1: iPhone 15 Pro Max, ID 1, giá 30.000.000 VND. Không sửa/xóa sản phẩm mẫu.
2. Bắt đầu mỗi TC ở trạng thái độc lập. Dọn giỏ qua UI bằng cách xóa và xác nhận chỉ các dòng P1/P2 do ca trước thêm; mở giỏ và kiểm tra đúng số dòng. Không dùng API/DB để reset.
3. Chỉ reload khi bắt đầu một ca độc lập nếu cần mở lại trang; không reload giữa chuỗi. Persistence của giỏ chưa được quy định.
4. Lưu ảnh/ghi nhận tại `evidence/B-FR07/<TC-ID>/<Run-ID>/`: trang nhập trước thao tác, giá trị đang hiển thị, thông báo nếu có, giỏ sau thao tác, tên/ID/đơn giá/quantity/thành tiền. Ghi môi trường và SUT commit khi thực thi. Nếu control không cho nhập giá trị yêu cầu, lưu ảnh và ghi observation về giới hạn control; không giả lập bằng cách khác.
5. Tính expected thành tiền bằng phép nhân giá fixture với quantity kỳ vọng/quan sát được. Không đánh giá tổng giỏ trong các ca này.

## Các ca BVA

### B-BV-001 — Ô nhập tại LB−δ: quantity 0

- **Mục tiêu:** Kiểm tra dưới lower boundary của ô nhập quantity FR-06.
- **Loại:** UI Web — nhập trực tiếp ở trang chi tiết sản phẩm.
- **Biên / δ:** `LB=1`, `δ=1`, giá trị `LB−δ=0`.
- **Requirement / lớp:** B-R13; B-EC-12; liên quan Domain case B-DT-016.
- **Điều kiện / giỏ đầu:** Giỏ rỗng đã xác nhận qua UI; P1 có trong catalog.
- **Dữ liệu:** P1 ID 1, đơn giá 30.000.000 VND; quantity nhập `0`.
- **Thao tác:** Mở chi tiết P1 → focus ô Số lượng → thử nhập `0` → ghi giá trị thực sự hiển thị và validation → chỉ bấm “Thêm vào giỏ hàng” nếu UI giữ giá trị 0 và cho thao tác bằng giao diện → mở giỏ.
- **Expected:** Quantity 0 không được chấp nhận làm quantity thêm vì FR-06 yêu cầu số nguyên dương tối thiểu 1. Cách chặn/thông báo chưa được quy định. Nếu control không nhận/không cho submit, ghi nhận đây là cách UI chặn; không ép submit.
- **Quan sát / bằng chứng:** Ảnh ô nhập và validation; nếu submit được, ảnh giỏ sau đó xác nhận không có dòng P1 quantity 0. Lưu mọi request/response phát sinh đã che token nếu được quan sát.

### B-BV-002 — Ô nhập tại LB: quantity 1

- **Mục tiêu:** Kiểm tra đúng lower boundary hợp lệ.
- **Loại:** UI Web — nhập trực tiếp ở trang chi tiết sản phẩm.
- **Biên / δ:** `LB=1`, giá trị `LB`; điểm kề trên là `LB+δ=2` ở B-BV-003.
- **Requirement / lớp:** B-R03/B-R07/B-R13; B-EC-10/B-EC-29; liên quan B-DT-002.
- **Điều kiện / giỏ đầu:** Giỏ rỗng đã xác nhận qua UI; P1 có trong catalog.
- **Dữ liệu:** P1 ID 1, đơn giá 30.000.000 VND; quantity nhập `1`.
- **Thao tác:** Mở chi tiết P1 → nhập `1` → xác nhận UI hiển thị 1 → bấm “Thêm vào giỏ hàng” → mở giỏ.
- **Expected:** Giá trị 1 hợp lệ theo FR-06; giỏ có P1 quantity 1. Thành tiền dòng `30.000.000 × 1 = 30.000.000 VND` theo công thức phân công.
- **Quan sát / bằng chứng:** Ảnh giá trị nhập, phản hồi thêm hàng và dòng giỏ gồm tên, đơn giá, quantity, thành tiền.

### B-BV-003 — Ô nhập tại LB+δ: quantity 2

- **Mục tiêu:** Kiểm tra điểm hợp lệ liền kề phía trên lower boundary.
- **Loại:** UI Web — nhập trực tiếp ở trang chi tiết sản phẩm.
- **Biên / δ:** `LB=1`, `δ=1`, giá trị `LB+δ=2`. Đây không phải UB.
- **Requirement / lớp:** B-R03/B-R07/B-R13; B-EC-11/B-EC-29; liên quan B-DT-005.
- **Điều kiện / giỏ đầu:** Giỏ rỗng đã xác nhận qua UI; P1 có trong catalog.
- **Dữ liệu:** P1 ID 1, đơn giá 30.000.000 VND; quantity nhập `2`.
- **Thao tác:** Mở chi tiết P1 → nhập `2` → xác nhận UI hiển thị 2 → bấm “Thêm vào giỏ hàng” → mở giỏ.
- **Expected:** Giá trị 2 là số nguyên dương nên hợp lệ theo FR-06; giỏ có P1 quantity 2. Thành tiền dòng `30.000.000 × 2 = 60.000.000 VND` theo công thức phân công.
- **Quan sát / bằng chứng:** Ảnh giá trị nhập, phản hồi thêm hàng và dòng giỏ với đơn giá/quantity/thành tiền.

### B-BV-004 — Nút giảm từ 2 về phía lower boundary

- **Mục tiêu:** Kiểm tra transition nút `−` khi quantity ở sát trên mức tối thiểu.
- **Loại:** UI Web — thao tác nút, không nhập số trực tiếp.
- **Biên / δ:** Trạng thái ban đầu q=2=`LB+δ`; thao tác hướng về LB=1. Delta mỗi click chưa được SRS định nghĩa.
- **Requirement / lớp:** B-R06/B-R07; B-EC-18/B-EC-29; liên quan B-DT-008/B-DT-009.
- **Điều kiện / giỏ đầu:** Ca độc lập; giỏ chỉ có P1 quantity 2, được tạo qua trang chi tiết; nút `−` đã được kiểm tra hiện diện.
- **Dữ liệu:** P1 ID 1, đơn giá 30.000.000 VND; quantity trước 2.
- **Thao tác:** Mở giỏ → xác nhận P1 có quantity 2 và nút `−` hiện diện → click `−` đúng một lần → ghi quantity sau thao tác và thành tiền.
- **Expected:** FR-07 yêu cầu nút `−` chỉnh quantity xuống; quantity sau thao tác phải thấp hơn 2 nếu thao tác được chấp nhận. Không kết luận trước rằng một click phải cho đúng 1 vì bước thay đổi chưa được nêu. Với quantity sau là q, expected thành tiền theo phân công là `30.000.000 × q`; quantity không được giả định dưới 1 theo quy tắc tối thiểu ở FR-06/phân công. Chi tiết ngưỡng trong giỏ cần review.
- **Quan sát / bằng chứng:** Ảnh trước/sau; ghi rõ nút có/enable, q trước/sau, đơn giá và thành tiền. Nếu nút không tồn tại, dừng tương tác và ghi nhận presence; không thay bằng API.

### B-BV-005 — Nút giảm tại lower boundary q=1

- **Mục tiêu:** Quan sát transition đúng tại mức tối thiểu khi người dùng bấm `−`.
- **Loại:** UI Web — thao tác nút, không nhập số trực tiếp.
- **Biên / δ:** q=LB=1; phép giảm một đơn vị nếu áp dụng sẽ đi tới `LB−δ=0`, là giá trị không hợp lệ ở ô nhập FR-06. Quy tắc xử lý nút tại đây chưa được SRS định nghĩa.
- **Requirement / lớp:** B-R06 (expected chưa rõ); B-EC-19; liên quan B-DT-010.
- **Điều kiện / giỏ đầu:** Ca độc lập; giỏ chỉ có P1 quantity 1; nút `−` hiện diện.
- **Dữ liệu:** P1 ID 1, đơn giá 30.000.000 VND; quantity trước 1.
- **Thao tác:** Mở giỏ → xác nhận q=1 → ghi trạng thái enable/disable của nút `−`. Nếu disable thì không click. Nếu enable thì click một lần, quan sát quantity/dòng/dialog sau đó; không lặp click.
- **Expected:** Chưa có oracle để chọn giữa disable, giữ ở 1, hỏi xác nhận xóa hoặc xóa dòng. Chỉ ghi nhận quan sát; không gán kết quả Pass/Fail. Nếu quantity/dòng còn lại, phép tính thành tiền quan sát được đối chiếu bằng `30.000.000 × q`, nhưng không giải quyết câu hỏi hành vi.
- **EC / liên quan:** B-EC-19; B-DT-010; B-R06.
- **Quan sát / bằng chứng:** Ảnh trước/sau, enable state, dialog nếu có, quantity/dòng còn lại và thành tiền.

### B-BV-006 — Nút tăng tại lower boundary q=1

- **Mục tiêu:** Kiểm tra transition nút `+` từ mức tối thiểu.
- **Loại:** UI Web — thao tác nút, không nhập số trực tiếp.
- **Biên / δ:** Trạng thái ban đầu q=LB=1; tăng hướng vào miền hợp lệ. Không có UB được nêu.
- **Requirement / lớp:** B-R05/B-R07; B-EC-17/B-EC-29; liên quan B-DT-006/B-DT-007.
- **Điều kiện / giỏ đầu:** Ca độc lập; giỏ chỉ có P1 quantity 1; nút `+` hiện diện.
- **Dữ liệu:** P1 ID 1, đơn giá 30.000.000 VND; quantity trước 1.
- **Thao tác:** Mở giỏ → xác nhận q=1 và nút `+` hiện diện → click `+` một lần → ghi q sau và thành tiền.
- **Expected:** FR-07 yêu cầu nút `+` chỉnh quantity lên; q sau phải lớn hơn 1 nếu thao tác được chấp nhận. SRS không nêu delta một click, do đó không khẳng định q sau đúng 2. Thành tiền theo phân công được tính là `30.000.000 × q sau`. Không kiểm tra điểm dừng trên vì không có UB được nêu.
- **Quan sát / bằng chứng:** Ảnh trước/sau, trạng thái control, q trước/sau, đơn giá và thành tiền. Nếu nút thiếu, ghi nhận presence và không tương tác bằng cách khác.

## Phạm vi không được gọi là biên

- **Số dòng giỏ:** Không có lower/upper limit về số dòng được nêu. Ca giỏ một dòng và hai dòng khác nhau trong Domain cases là đại diện cấu trúc, không phải biên số dòng.
- **Tổng tiền:** Dùng ca kiểm tra thành tiền dòng trong B-BV-002/003/004–006 theo công thức có nguồn ở phân công. Tổng giỏ không có công thức đầy đủ trong SRS; không tạo biên hay expected tổng tiền ở đây.
- **Giá trị nhập ngoài miền khác:** Số âm, thập phân và chuỗi không phải số chỉ thử nếu ô UI thực sự nhận được bằng thao tác người dùng; chúng thuộc Domain cases, không tự xem là các điểm biên số nguyên. Không gửi chúng vào control `+`/`−`.

Tài liệu này chỉ thiết kế ca BVA. Chưa chạy SUT và chưa ghi actual/status hoặc kết quả.
