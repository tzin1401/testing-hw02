# B-FR07 — Yêu cầu giỏ hàng trên Web

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2.
**Trạng thái:** Phân tích yêu cầu do AI soạn; chưa có human review. Chưa phân hoạch EC, chưa thiết kế test case, chưa chạy test.

## 1. Phạm vi và nguồn expected result

| Mã | Nguồn | Dùng để xác định |
|---|---|---|
| S1 | [`eshop-sut/README.md`](../../eshop-sut/README.md), FR-07 | Hành vi giỏ hàng Web: nội dung/ cột, gộp sản phẩm, xác nhận xóa, tiếp tục mua sắm, nhãn tổng tiền, giỏ rỗng |
| S2 | [`eshop-sut/README.md`](../../eshop-sut/README.md), FR-06 | Ô nhập số lượng trên trang chi tiết sản phẩm: số nguyên dương, tối thiểu 1; phản hồi trực quan khi thêm vào giỏ |
| S3 | [`eshop-sut/api_specification.md`](../../eshop-sut/api_specification.md), mục 4.1–4.2 | API cart được tài liệu hóa là `GET /api/cart`, `POST /api/cart`; header yêu cầu Bearer token; body thêm hàng có `id`, `name`, `price`, `quantity` |
| S4 | [`group_feature_assignment.md`](../../group_feature_assignment.md), Thành viên 2 / Pool B FR-07 | Input được giao: số lượng, nút +/−, nút Xóa; thành tiền = đơn giá × số lượng; số lượng tối thiểu ≥1; dialog xác nhận; nhãn “Tổng cộng” |
| S5 | Slide [`domain-testing-en.pdf`](../../slide/domain-testing-en.pdf) và [`domain-testing-vn.pdf`](../../slide/domain-testing-vn.pdf) | Phương pháp: xác định input/output từ đặc tả; expected của một phân hoạch phải nhất quán; chọn giá trị biên từ điều kiện có nguồn |

S1 là oracle chính cho hành vi FR-07. S2 chỉ là nguồn quy tắc số lượng nhập ở FR-06; không tự động coi mọi chi tiết trang sản phẩm là phần việc FR-07. S3 mô tả giao tiếp API và ví dụ dữ liệu, không định nghĩa đầy đủ expected cho các thao tác Web trong FR-07. S4 là phân công bổ sung của nhóm; nội dung nào S1 không nêu rõ được ghi là giả định/câu hỏi, không gán thành yêu cầu SRS.

**Baseline tham chiếu:** SUT commit `85af3ba875c88283615e22cb108f13e2fccaf0e9`. Không đọc code SUT để đặt expected result.

## 2. Input và trạng thái cần theo dõi

| ID | Input / trạng thái | Ý nghĩa |
|---|---|---|
| B-I01 | Sản phẩm | Danh tính sản phẩm được thêm vào giỏ; API spec minh họa bằng `id` và `name`. Quy tắc xác định hai mục là “cùng sản phẩm” chưa được mô tả chi tiết ngoài việc so sánh theo sản phẩm. |
| B-I02 | Đơn giá | Giá sản phẩm cần hiển thị trên dòng giỏ và dùng để xác định thành tiền theo phân công nhóm. Định dạng hiển thị và thời điểm lấy giá chưa rõ. |
| B-I03 | Số lượng | Giá trị đưa vào giỏ hoặc thay đổi bằng nút +/−. FR-06 yêu cầu số nguyên dương, tối thiểu 1 đối với ô nhập số lượng trên trang chi tiết. |
| B-I04 | Thao tác người dùng | Thêm vào giỏ; bấm +/−; bấm Xóa; xác nhận hoặc hủy dialog; bấm Tiếp tục mua sắm; mở trang giỏ. |
| B-S01 | Nội dung giỏ trước thao tác | Giỏ rỗng hay có một/nhiều dòng; sản phẩm và số lượng hiện tại. Cần biết để đánh giá thay đổi sau thao tác. |
| B-S02 | Dòng sản phẩm | Danh tính sản phẩm, đơn giá và số lượng trước/sau; số dòng cho sản phẩm đó. |
| B-S03 | Tổng giỏ | Giá trị tổng hiển thị trước/sau thao tác. Quy tắc tổng hợp/rounding chưa được nêu đầy đủ trong SRS. |
| B-S04 | Dialog xóa | Dialog đang mở hay chưa; quyết định người dùng xác nhận hoặc hủy. |
| B-S05 | Trang hiện tại | Trang giỏ hay trang chủ, để kiểm tra thao tác tiếp tục mua sắm. |

## 3. Yêu cầu, trạng thái và đầu ra cần quan sát

### B-R01 — Hiển thị trạng thái giỏ rỗng

- **Yêu cầu:** Khi giỏ không có sản phẩm, Web hiển thị hình minh họa và thông báo rõ ràng rằng giỏ đang rỗng.
- **Input:** Trạng thái giỏ trước là rỗng; mở trang giỏ.
- **Trạng thái trước → sau:** 0 dòng → vẫn 0 dòng; không có thao tác thêm/xóa trong bước quan sát.
- **Đầu ra Web:** Có hình minh họa và thông báo rõ ràng về giỏ rỗng.
- **Nguồn expected:** S1 FR-07. SRS không quy định ảnh hay câu chữ cụ thể.

### B-R02 — Hiển thị các cột của giỏ

- **Yêu cầu:** Khi giỏ có sản phẩm, danh sách hiển thị các cột Sản phẩm, Đơn giá, Số lượng, Thành tiền, Thao tác.
- **Input:** Một hay nhiều dòng sản phẩm trong giỏ; mở trang giỏ.
- **Trạng thái trước → sau:** Có dòng → giữ nguyên dòng trong lúc quan sát.
- **Đầu ra Web:** Nhìn thấy đủ năm cột và dữ liệu tương ứng.
- **Nguồn expected:** S1 FR-07. Tên/cách trình bày có thể khác về kiểu chữ nhưng ý nghĩa cột phải tương ứng; chi tiết bố cục chưa được quy định.

### B-R03 — Thêm một sản phẩm vào giỏ

- **Yêu cầu:** Giỏ có thể hiển thị sản phẩm đã được thêm từ luồng mua sắm.
- **Input:** Sản phẩm (id/tên), đơn giá, số lượng; thao tác thêm. Số lượng ở ô nhập trên trang chi tiết chịu quy tắc FR-06.
- **Trạng thái trước → sau:** Giỏ ban đầu chưa có sản phẩm đó → giỏ có dòng sản phẩm sau khi thêm thành công.
- **Đầu ra Web:** Dòng sản phẩm xuất hiện với tên, đơn giá, số lượng và thành tiền; phản hồi thêm hàng thuộc FR-06 có thể là toast hoặc badge.
- **Nguồn expected:** S1 FR-07 cho nội dung giỏ; S2 FR-06 cho input số lượng và phản hồi thêm; S3 mục 4.2 cho các trường API mẫu. SRS không chỉ rõ giá trị mặc định khi thêm.

### B-R04 — Thêm lại cùng sản phẩm thì gộp dòng và tăng số lượng

- **Yêu cầu:** Thêm cùng một sản phẩm lần nữa làm tăng số lượng hiện có, không tạo thêm dòng cho sản phẩm đó.
- **Input:** Sản phẩm đã có trong giỏ; số lượng đang có; thao tác thêm lại cùng sản phẩm.
- **Trạng thái trước → sau:** Có một dòng cho sản phẩm với số lượng hiện tại → vẫn một dòng cho sản phẩm đó, số lượng tăng theo lượng được thêm.
- **Đầu ra Web:** Không xuất hiện dòng trùng; số lượng dòng hiện có tăng. Số lượng tăng cụ thể phụ thuộc input ở lần thêm.
- **Nguồn expected:** S1 FR-07. Cách nhận diện “cùng sản phẩm” theo ID hay thuộc tính khác chưa được đặc tả.

### B-R05 — Nút cộng số lượng

- **Yêu cầu:** Dòng sản phẩm có nút `+` để điều chỉnh số lượng.
- **Input:** Một dòng có số lượng hiện tại q; bấm `+` một lần.
- **Trạng thái trước → sau:** q → số lượng mới lớn hơn q theo một bước điều chỉnh.
- **Đầu ra Web:** Số lượng trên dòng được cập nhật và thành tiền được cập nhật tương ứng nếu phép tính theo đơn giá × số lượng được áp dụng.
- **Nguồn expected:** S1 FR-07 nói có nút +/- để chỉnh; S4 yêu cầu kiểm tra nút và công thức thành tiền. SRS chưa nêu bước tăng là bao nhiêu (phân công hàm ý tăng 1, cần xác nhận trước khi chấm chi tiết).

### B-R06 — Nút trừ số lượng và giới hạn tối thiểu

- **Yêu cầu:** Dòng sản phẩm có nút `−` để điều chỉnh số lượng; số lượng dương, tối thiểu 1 là quy tắc được nêu cho quantity ở FR-06.
- **Input:** Một dòng có số lượng q; bấm `−`.
- **Trạng thái trước → sau:** q → số lượng mới nhỏ hơn q khi thao tác được chấp nhận; không được suy ra từ FR-06 rằng số lượng ở giỏ được phép thành 0 hoặc âm.
- **Đầu ra Web:** Số lượng/ thành tiền phản ánh thay đổi được chấp nhận; khi đang ở 1 thì kết quả của thao tác trừ cần làm rõ.
- **Nguồn expected:** S1 FR-07 về nút +/-; S2 FR-06 và S4 về số lượng nguyên dương tối thiểu 1. Phạm vi áp dụng ngưỡng 1 khi giảm trong giỏ chưa được diễn đạt trực tiếp trong S1.

### B-R07 — Thành tiền trên từng dòng

- **Yêu cầu:** Mỗi dòng có cột Thành tiền; theo phân công nhóm, thành tiền bằng đơn giá nhân số lượng.
- **Input:** Đơn giá p và số lượng q trên một dòng.
- **Trạng thái trước → sau:** p, q của dòng → sau khi q đổi thì thành tiền cần phản ánh p × q theo quy ước được giao.
- **Đầu ra Web:** Giá trị thành tiền của đúng dòng sản phẩm.
- **Nguồn expected:** S1 FR-07 yêu cầu cột Thành tiền; công thức `p × q` có nguồn S4, không được ghi như câu chữ trực tiếp từ SRS. Định dạng tiền/làm tròn chưa rõ.

### B-R08 — Tổng tiền và nhãn “Tổng cộng”

- **Yêu cầu:** Khu vực tổng tiền dùng chính xác nhãn **“Tổng cộng”**, không dùng **“Tổng tạm tính”**.
- **Input:** Các dòng sản phẩm, đơn giá, số lượng và thao tác làm thay đổi giỏ.
- **Trạng thái trước → sau:** Tập dòng trước thao tác → tập dòng sau thao tác; tổng hiển thị được quan sát trước/sau.
- **Đầu ra Web:** Nhãn “Tổng cộng” và giá trị tổng tiền hiện trên trang giỏ.
- **Nguồn expected:** Nhãn theo S1 FR-07 và S4. S1 chưa viết rõ công thức tổng giỏ; S4 chỉ nêu rõ công thức thành tiền từng dòng. Không tự giả định quy tắc làm tròn, phí/vận chuyển/giảm giá hay thời điểm cập nhật tổng.

### B-R09 — Xóa sản phẩm mở dialog xác nhận

- **Yêu cầu:** Khi chọn xóa một dòng sản phẩm, hệ thống phải hỏi xác nhận trước khi thực hiện.
- **Input:** Giỏ có dòng sản phẩm; bấm Xóa sản phẩm.
- **Trạng thái trước → sau:** Dòng còn trong giỏ, dialog chưa mở → dialog xác nhận xuất hiện; chưa xác nhận thì không coi là đã xóa.
- **Đầu ra Web:** Có dialog/confirmation trước khi xóa.
- **Nguồn expected:** S1 FR-07; S4 cũng nêu dialog. Câu chữ và loại dialog (native hay giao diện tùy biến) chưa quy định.

### B-R10 — Xác nhận xóa

- **Yêu cầu:** Khi người dùng xác nhận trong dialog, thao tác xóa được thực hiện.
- **Input:** Dialog đang mở; chọn hành động xác nhận.
- **Trạng thái trước → sau:** Dòng được chọn còn trong giỏ → dòng đó không còn trong giỏ sau khi xác nhận; các dòng khác (nếu có) cần được quan sát.
- **Đầu ra Web:** Dòng bị xóa; nếu đó là dòng cuối, trạng thái giỏ rỗng cần tuân theo B-R01.
- **Nguồn expected:** S1 FR-07 yêu cầu dialog trước thao tác xóa; kết quả sau xác nhận là diễn giải chức năng thông thường, cần giữ rõ là expected suy ra từ “Xóa sản phẩm”, chưa có mô tả cụ thể về ảnh hưởng dòng khác.

### B-R11 — Hủy xóa

- **Yêu cầu:** Khi người dùng hủy/đóng dialog thay vì xác nhận, không thực hiện yêu cầu xóa.
- **Input:** Dialog đang mở; chọn hủy/đóng.
- **Trạng thái trước → sau:** Dòng vẫn còn trước quyết định → dòng tiếp tục còn sau khi hủy; số lượng và tổng không đổi do riêng thao tác hủy.
- **Đầu ra Web:** Dialog đóng và sản phẩm không bị xóa.
- **Nguồn expected:** S1 nói cần dialog xác nhận nhưng không mô tả nút Hủy hoặc kết quả cụ thể khi hủy. Đây là giả định cần xác nhận, không đánh dấu là yêu cầu trực tiếp của SRS.

### B-R12 — Tiếp tục mua sắm

- **Yêu cầu:** Có nút Tiếp tục mua sắm; bấm nút đưa người dùng trở về trang chủ.
- **Input:** Đang ở trang giỏ; bấm nút Tiếp tục mua sắm.
- **Trạng thái trước → sau:** Trang giỏ, nội dung giỏ hiện tại → trang chủ; FR-07 không nói thao tác này xóa giỏ, nên không kỳ vọng giỏ bị xóa.
- **Đầu ra Web:** Điều hướng về trang chủ.
- **Nguồn expected:** S1 FR-07. Việc giữ giỏ khi điều hướng là điều không được S1 nói trực tiếp, ghi thành câu hỏi ở mục 4.

### B-R13 — Số lượng hợp lệ từ FR-06

- **Yêu cầu phụ thuộc:** Khi lượng hàng được nhập ở ô quantity trên trang chi tiết trước khi thêm, giá trị phải là số nguyên dương, tối thiểu 1.
- **Input:** Giá trị quantity nhập và thao tác thêm vào giỏ.
- **Trạng thái trước → sau:** Giỏ có trạng thái trước đó → chỉ khi thao tác được chấp nhận mới kỳ vọng số lượng được thêm vào giỏ; hành vi với input không hợp lệ chưa được SRS mô tả đủ ở client/API.
- **Đầu ra Web:** Quantity hợp lệ được chuyển vào luồng thêm hàng; FR-06 yêu cầu có phản hồi trực quan (toast hoặc badge).
- **Nguồn expected:** S2 FR-06. Đây là quy tắc của trang chi tiết sản phẩm, phụ thuộc chức năng FR-06 do thành viên khác phụ trách; phần B-FR07 chỉ ghi nhận quantity được đưa vào giỏ và kết quả trên giỏ, không nhận toàn bộ kiểm thử FR-06.

## 4. Điều chưa được SRS nói rõ — giữ dạng câu hỏi

Các điểm dưới đây chưa được dùng để tự đặt expected result:

1. **Số lượng tối đa và tồn kho:** có giới hạn tối đa không; tăng quantity vượt tồn kho xử lý ra sao?
2. **Lưu giỏ qua reload/đóng mở trình duyệt/đăng nhập:** FR-07 không nói giỏ phải được lưu ở đâu hoặc bền qua lần tải lại hay không.
3. **Giá đổi sau khi thêm:** dùng giá lúc thêm hay giá mới khi mở giỏ; khi giá sản phẩm thay đổi thì thành tiền/tổng cập nhật thế nào?
4. **Số âm, số thập phân, rỗng hoặc chuỗi không phải số ở client/API:** FR-06 xác định quantity nhập là số nguyên dương tối thiểu 1, nhưng chưa nêu rõ thông báo/chặn ở client và phản hồi cho API invalid. Không suy ra từ code.
5. **Giảm từ quantity 1:** nút `−` bị disable, giữ ở 1, hỏi xóa hay xóa luôn dòng?
6. **Câu chữ của empty state, dialog và phản hồi thêm/xóa:** SRS yêu cầu thông báo/hình và dialog nhưng không cho nội dung cụ thể.
7. **Bước của nút +/-:** phân công gợi ý nút cộng/trừ; SRS không nêu mỗi lần thay đổi bao nhiêu.
8. **Tổng giỏ:** SRS nêu nhãn và giá trị tổng nhưng chưa định nghĩa tường minh công thức tổng hợp, làm tròn, phí hay giảm giá trong FR-07. Công thức thành tiền từng dòng chỉ được nêu ở phân công nhóm.
9. **Định danh sản phẩm trùng:** “cùng một sản phẩm” chưa chỉ rõ so theo ID hay theo trường nào.
10. **Hủy dialog và điều hướng:** FR-07 chưa nêu nút/behavior hủy, hoặc giỏ được giữ thế nào sau khi quay về trang chủ.

## 5. Giả định cần review và ranh giới thành viên 2

- Dùng chính các từ SRS “cùng một sản phẩm”, không tự chốt quy tắc matching ID/name trước khi review.
- `Đơn giá × Số lượng` cho **thành tiền dòng** là hướng dẫn của phân công nhóm; khi báo cáo cần ghi nguồn S4.
- Không suy rộng yêu cầu quantity FR-06 sang mọi request/API, hoặc sang quy tắc tồn kho/tối đa chưa có nguồn.
- Phạm vi thành viên 2: **FR-07 giỏ hàng trên Web**. Chỉ tham chiếu FR-06 ở quantity và luồng thêm sản phẩm; không nhận kiểm thử đầy đủ trang chi tiết sản phẩm. Không mở rộng sang FR-08 checkout, FR-09 coupon, API quản lý sản phẩm hay Mobile FR-20.

## 6. Phương pháp và trạng thái bước

Theo slide Domain/BVA, xác định input/output trước khi chia lớp; chỉ chọn expected có căn cứ trong đặc tả hoặc nguồn phân công được ghi rõ. Tài liệu này dừng ở requirements. EC, đại diện lớp, test case, boundary case, execution result và human review sẽ được tạo ở các bước riêng sau khi review các câu hỏi mở.
