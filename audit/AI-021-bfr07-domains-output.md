# AI-021 — Snapshot output: B-FR07 equivalence classes

Prompt và metadata lượt làm được ghi trong `AI_AUDIT_REPORT.md`. Snapshot sau đây là nội dung file được tạo.

---

# B-FR07 — Phân hoạch miền dữ liệu và trạng thái

**Nguồn requirement:** [`01-requirements.md`](01-requirements.md), SRS FR-06/FR-07, API spec mục 4.1–4.2 và phân công Thành viên 2.
**Trạng thái:** Phân hoạch do AI soạn; chưa có human review. Đây là EC design, chưa phải test case và chưa chạy SUT.

## Cách chia lớp

Theo slide Domain Testing, các giá trị thuộc cùng lớp nếu expected result của chúng giống nhau; input có điều kiện rõ thì tách lớp hợp lệ và không hợp lệ. Mỗi lớp dưới đây có một ví dụ để người đọc hiểu ranh giới, chưa phải lịch chạy test. Expected lấy từ SRS khi có; hướng dẫn bổ sung của phân công được ghi riêng. Điểm thiếu oracle được xếp “chưa kết luận / thăm dò”, không ép vào lớp Fail.

Trong các ví dụ, `P1`/`P2` là hai sản phẩm mẫu có ID khác nhau; giá chỉ minh họa phép tính. Số lượng được nhập tại **ô quantity của trang chi tiết sản phẩm trước khi bấm Thêm vào giỏ** (FR-06). API payload là một điểm nhập khác, không dùng để thay thế kiểm tra input Web.

## 1. Trạng thái giỏ và sản phẩm

| EC ID | Input/trạng thái | Lớp và điều kiện chính xác | Ví dụ đại diện | Expected result và căn cứ | B-R liên quan |
|---|---|---|---|---|---|
| B-EC-01 | Số dòng giỏ | Hợp lệ — giỏ rỗng, 0 dòng | `[]` | Web hiển thị hình minh họa và thông báo giỏ rỗng. SRS FR-07, trực tiếp. | B-R01 |
| B-EC-02 | Số dòng giỏ | Hợp lệ — giỏ có đúng 1 dòng sản phẩm | `P1 × 1` | Web hiển thị các cột Sản phẩm, Đơn giá, Số lượng, Thành tiền, Thao tác. SRS FR-07. | B-R02, B-R03 |
| B-EC-03 | Số dòng giỏ | Hợp lệ — giỏ có từ 2 dòng khác nhau trở lên | `P1`, `P2` | Danh sách có một dòng cho mỗi sản phẩm khác nhau; các cột SRS hiển thị. Việc một sản phẩm khác ID là sản phẩm khác dựa trên ví dụ `id` của API spec, cần xác nhận quy tắc identity. | B-R02 |
| B-EC-04 | ID sản phẩm thêm lại | Hợp lệ theo giả định identity — ID lần thêm bằng ID sản phẩm đã có | P1 có `id=1`; thêm lại P1 `id=1` | Nếu hai mục cùng sản phẩm, số dòng giữ 1 và quantity tăng; SRS FR-07 trực tiếp nói cùng sản phẩm phải gộp. Dùng cùng ID làm đại diện là giả định từ trường `id` trong API spec. | B-R04 |
| B-EC-05 | ID sản phẩm được thêm | Hợp lệ theo giả định identity — ID khác ID đang có | Giỏ có P1 `id=1`; thêm P2 `id=2` | Kỳ vọng mỗi sản phẩm là một dòng riêng là suy luận tự nhiên từ “cùng một sản phẩm” và trường `id`; SRS không nêu rõ quy tắc matching. Cần xác nhận trước khi chấm số dòng theo ID. | B-R02, B-R04 |
| B-EC-06 | Tồn tại sản phẩm | Hợp lệ — sản phẩm được chọn còn xác định được từ danh mục sản phẩm | P1 tồn tại và có giá hiển thị | Có thể quan sát thông tin sản phẩm và luồng thêm; SRS FR-06 mô tả chi tiết sản phẩm. | B-R03, B-R13 |
| B-EC-07 | Tồn tại sản phẩm | Chưa kết luận — ID không tồn tại, sản phẩm bị xóa hoặc không xác định được | ID `999999` không có nguồn xác nhận tồn tại | SRS FR-06/FR-07 và API spec không nói xử lý ra sao; chỉ thăm dò để ghi actual, không có expected/Pass/Fail. | B-R03, B-R04; câu hỏi |

## 2. Đơn giá và số lượng

| EC ID | Input | Lớp và điều kiện chính xác | Ví dụ đại diện | Expected result và căn cứ | B-R liên quan |
|---|---|---|---|---|---|
| B-EC-08 | Đơn giá sản phẩm | Giá sản phẩm hiện có và xác định được ở thời điểm mở trang | P1 có đơn giá được SUT hiển thị là 50.000 | Web có cột Đơn giá; giá trị cụ thể phụ thuộc dữ liệu sản phẩm. Không kiểm tra biến động giá ở lớp này. SRS FR-07. | B-R02, B-R03, B-R07 |
| B-EC-09 | Giá thiếu, sai hoặc thay đổi | Chưa kết luận — giá không xác định, âm, hoặc thay đổi sau khi thêm | Giá P1 thay đổi giữa lúc thêm và mở giỏ | SRS/API spec không đặt miền hợp lệ cho giá trong giỏ hay quy tắc chọn giá cũ/mới. Thăm dò/đợi làm rõ; không gán expected. | B-R07, B-R08; câu hỏi |
| B-EC-10 | Quantity ở ô nhập FR-06 | Hợp lệ — số nguyên đúng bằng 1 | `1` | Được chấp nhận theo FR-06: số nguyên dương, tối thiểu 1; sau khi thêm, quantity được đưa vào giỏ. | B-R03, B-R13 |
| B-EC-11 | Quantity ở ô nhập FR-06 | Hợp lệ — số nguyên lớn hơn 1 | `2` | Là số nguyên dương; FR-06 cho phép quantity theo mô tả. Giá trị cụ thể không đại diện cho giới hạn tối đa. | B-R03, B-R13 |
| B-EC-12 | Quantity ở ô nhập FR-06 | Không hợp lệ — bằng 0 | `0` | FR-06 chỉ nhận số nguyên dương tối thiểu 1; giá trị 0 không được chấp nhận làm quantity thêm vào giỏ. Hình thức chặn/thông báo chưa quy định. | B-R13 |
| B-EC-13 | Quantity ở ô nhập FR-06 | Không hợp lệ — số nguyên âm | `-1` | Không phải số nguyên dương tối thiểu 1; không được chấp nhận làm quantity thêm. Cách UI chặn/thông báo chưa quy định. | B-R13 |
| B-EC-14 | Quantity ở ô nhập FR-06 | Không hợp lệ — số thập phân | `1.5` | Không phải số nguyên; FR-06 yêu cầu số nguyên dương nên không được chấp nhận làm quantity thêm. Cách UI chặn/thông báo chưa quy định. | B-R13 |
| B-EC-15 | Quantity ở ô nhập FR-06 | Không hợp lệ — nội dung không phải số | `abc` nếu điểm nhập cho phép gõ chuỗi này | Không đáp ứng yêu cầu số nguyên dương; không được chấp nhận làm quantity thêm. Nếu control không cho nhập chuỗi, ghi nhận điểm nhập không thể nhận giá trị đó, không đổi sang API để giả lập UI. | B-R13 |
| B-EC-16 | Quantity tại API `POST /api/cart` | Chưa kết luận — 0, âm, thập phân, null, chuỗi hoặc thiếu trường gửi trực tiếp API | `quantity: 1.5` | API spec chỉ cho ví dụ trường `quantity`, không định nghĩa validate/error/side effect. Có thể thăm dò khi thiết kế execution riêng; không gán expected hoặc verdict từ FR-06 UI. | B-R03; câu hỏi |
| B-EC-17 | Quantity thay đổi bằng `+` | Hợp lệ — dòng đã có, bấm nút `+` | P1 quantity 1 rồi bấm `+` | SRS FR-07 yêu cầu nút + để chỉnh. Quantity cần tăng; bước tăng chính xác chưa được SRS nêu, phân công hàm ý mỗi click tăng một đơn vị nhưng cần xác nhận. | B-R05 |
| B-EC-18 | Quantity thay đổi bằng `−` | Hợp lệ — dòng có quantity lớn hơn mức tối thiểu, bấm nút `−` | P1 quantity 2 rồi bấm `−` | SRS FR-07 yêu cầu nút − để chỉnh; quantity giảm khi thao tác được chấp nhận. FR-06 và phân công nêu tối thiểu 1; mức giảm một click cần xác nhận trước khi chấm số cụ thể. | B-R06 |
| B-EC-19 | Bấm `−` tại quantity 1 | Chưa kết luận — thao tác ở ngưỡng tối thiểu | P1 quantity 1 rồi bấm `−` | Không rõ có disable nút, giữ 1, mở confirm xóa hay xóa ngay. Không đặt expected; cần câu trả lời từ SRS/giảng viên. | B-R06; câu hỏi |

**Phân biệt quan trọng:** lớp 0/âm/thập phân/không phải số ở B-EC-12–15 là input Web tại ô quantity FR-06. B-EC-16 là payload API riêng và đang thiếu oracle. Không gộp hai điểm nhập thành một lớp vì kết quả mong đợi và nguồn đặc tả khác nhau.

## 3. Thao tác và trạng thái dialog xóa

| EC ID | Input/trạng thái | Lớp và điều kiện chính xác | Ví dụ đại diện | Expected result và căn cứ | B-R liên quan |
|---|---|---|---|---|---|
| B-EC-20 | Xóa sản phẩm | Hợp lệ — bấm Xóa khi dòng đang tồn tại và chưa có dialog | Giỏ có P1, dialog đóng → bấm Xóa P1 | Dialog xác nhận phải hiện trước khi xóa. SRS FR-07. | B-R09 |
| B-EC-21 | Quyết định dialog | Hợp lệ — người dùng xác nhận | Dialog mở → chọn xác nhận | Sản phẩm được xóa là diễn giải của thao tác “Xóa sản phẩm”; theo dõi giỏ sau đó. Exact wording/type của dialog chưa quy định. | B-R09, B-R10 |
| B-EC-22 | Quyết định dialog | Hợp lệ về thao tác người dùng, expected còn cần xác nhận — người dùng hủy/đóng | Dialog mở → chọn hủy hoặc đóng | SRS chỉ yêu cầu hỏi xác nhận, không nói cụ thể nút hủy và kết quả. Dự kiến không xóa nhưng phải giữ là câu hỏi/giả định cho tới khi xác nhận. | B-R11; câu hỏi |
| B-EC-23 | Tiếp tục mua sắm | Hợp lệ — đang ở giỏ và bấm nút Tiếp tục mua sắm | Trang giỏ → bấm nút | Điều hướng về trang chủ theo SRS FR-07. SRS không nói persistence của giỏ qua chuyển trang/reload. | B-R12 |

## 4. Lớp đầu ra cần quan sát trên Web

| EC ID | Output | Lớp đầu ra và điều kiện | Ví dụ/expected | Nguồn và B-R |
|---|---|---|---|---|
| B-EC-24 | Empty state | Hợp lệ — giỏ có 0 dòng, có hình và thông báo rõ | Giỏ rỗng: có cả hình minh họa và thông báo giỏ rỗng | SRS FR-07; B-R01 |
| B-EC-25 | Empty state | Không hợp lệ — giỏ 0 dòng nhưng thiếu hình hoặc thiếu thông báo rõ | Chỉ hiện một trong hai thành phần | Vi phạm điều kiện có hình minh họa **và** thông báo rõ trong SRS FR-07; câu chữ cụ thể không bị kiểm tra | B-R01 |
| B-EC-26 | Cột/dòng hàng | Hợp lệ — dòng có tên sản phẩm, đơn giá, quantity, thành tiền, thao tác | P1 ở một dòng | Các cột Sản phẩm/Đơn giá/Số lượng/Thành tiền/Thao tác hiển thị | SRS FR-07; B-R02 |
| B-EC-27 | Dòng hàng trùng | Không hợp lệ — cùng một sản phẩm xuất hiện thành nhiều dòng sau thao tác thêm lại | Hai dòng P1 sau khi thêm lại cùng P1 | SRS yêu cầu tăng quantity và không tạo dòng mới. Việc map cùng sản phẩm với cùng ID vẫn là giả định cần xác nhận. | SRS FR-07; B-R04 |
| B-EC-28 | Đơn giá đầu ra | Hợp lệ — mỗi dòng có giá trị ở cột Đơn giá | P1 có đơn giá được hiển thị | Có cột Đơn giá; giá trị cụ thể cần đối chiếu với nguồn sản phẩm được chốt khi thiết kế test. Giá đổi sau khi thêm là câu hỏi. | SRS FR-07; B-R02, B-R07 |
| B-EC-29 | Thành tiền đầu ra | Hợp lệ theo phân công — giá trị dòng bằng đơn giá × quantity | `50.000 × 2 = 100.000` | Công thức có ở phân công nhóm Thành viên 2; SRS chỉ yêu cầu cột Thành tiền, không ghi công thức. Là expected có nguồn S4. | B-R07 |
| B-EC-30 | Thành tiền đầu ra | Không hợp lệ theo phân công — giá trị khác đơn giá × quantity | `50.000 × 2` nhưng hiển thị giá trị khác 100.000 | Sai với công thức phân công S4; định dạng/làm tròn cần giữ thống nhất, hiện chưa có quy tắc chi tiết. | B-R07 |
| B-EC-31 | Nhãn tổng | Hợp lệ — nhãn chính xác “Tổng cộng” | `Tổng cộng` | SRS FR-07 nêu đúng nhãn này. | B-R08 |
| B-EC-32 | Nhãn tổng | Không hợp lệ — dùng “Tổng tạm tính” thay cho nhãn yêu cầu hoặc thiếu nhãn “Tổng cộng” | `Tổng tạm tính` | Vi phạm nhãn chính xác theo SRS FR-07. | B-R08 |
| B-EC-33 | Giá trị tổng | Chưa kết luận về phép tính — có giá trị tổng hiển thị nhưng tổng hợp/rounding chưa được SRS định nghĩa | Hai dòng, mỗi thành tiền 100.000; hiển thị tổng được ghi nhận | Có thể quan sát giá trị và ghi actual, nhưng chưa chấm đúng/sai phép tổng hợp theo SRS. Không giả định về phí/giảm giá/làm tròn. | B-R08; câu hỏi |
| B-EC-34 | Phản hồi thêm hàng | Hợp lệ — sau thao tác thêm thành công, có toast hoặc badge cập nhật | Toast hiện hoặc badge cart thay đổi | FR-06 chấp nhận phản hồi trực quan kiểu toast **hoặc** badge; không bắt buộc đồng thời cả hai. | B-R03, B-R13 |
| B-EC-35 | Phản hồi thêm hàng | Không hợp lệ — thao tác thêm thành công nhưng không có toast và cũng không có badge cập nhật | Không thấy toast, badge không đổi | Không thỏa một trong hai dạng phản hồi FR-06. Nếu thao tác thêm thất bại thì chưa áp dụng lớp output thành công này. | B-R03, B-R13 |
| B-EC-36 | Kết quả xác nhận xóa | Hợp lệ theo diễn giải — sau xác nhận, dòng đã chọn không còn | Xác nhận xóa P1; P1 biến mất | Expected được suy ra từ nhãn “Xóa sản phẩm”; SRS không mô tả riêng hậu quả cho các dòng còn lại. | B-R10 |
| B-EC-37 | Kết quả hủy xóa | Chưa kết luận — dòng còn hay mất sau hủy dialog | Hủy dialog với P1 trong giỏ | Dự kiến giữ nguyên nhưng SRS không nêu hành vi Cancel. Ghi observation nếu thăm dò; không gán Pass/Fail. | B-R11; câu hỏi |
| B-EC-38 | Badge giỏ | Chưa kết luận về badge số lượng cụ thể | Thêm P1 quantity 2; badge hiển thị một số | FR-06 chỉ cho badge là một dạng phản hồi, không nói badge biểu thị số sản phẩm, tổng quantity hay cách cập nhật khi xóa. Không chấm con số badge. | B-R03, B-R13; câu hỏi |

## 5. Persistence và lớp chưa có oracle

| EC ID | Trạng thái/input | Phân loại | Ví dụ | Expected/cách xử lý hiện tại | B-R |
|---|---|---|---|---|---|
| B-EC-39 | Reload khi giỏ có sản phẩm | Chưa kết luận | Có P1 trong giỏ → reload trang | SRS không nêu giỏ có phải tồn tại qua reload hay không; chỉ ghi nhận nếu thăm dò, không kết luận lỗi. | B-S01; câu hỏi |
| B-EC-40 | Giá/tồn kho đổi sau khi thêm | Chưa kết luận | P1 thay giá hoặc hết hàng sau khi đã thêm | SRS không nêu refresh giá, cập nhật tồn kho hoặc giới hạn max; không tạo expected. | B-R07, B-R08; câu hỏi |
| B-EC-41 | Nội dung/câu chữ thông báo | Chưa kết luận về exact text | Empty state/dialog/toast có câu chữ khác nhau | Yêu cầu chỉ đòi thông báo rõ, dialog xác nhận hoặc phản hồi trực quan; chỉ chấm sự hiện diện/chức năng, không chấm nguyên văn. | B-R01, B-R09, B-R13 |

Không lớp nào trong B-EC-07, B-EC-09, B-EC-16, B-EC-19, B-EC-22, B-EC-33, B-EC-37–41 được gán Pass/Fail. Chúng chứa câu hỏi đặc tả hoặc đầu ra cần quan sát thêm.

## 6. Vì sao các đại diện phân biệt được hành vi

- **Rỗng / một dòng / nhiều dòng** thay đổi cấu trúc đầu ra cần có: empty state, một record, hoặc danh sách nhiều record.
- **Cùng ID / ID khác** phân biệt yêu cầu gộp quantity khỏi trường hợp sản phẩm riêng; phép map ID sang “cùng sản phẩm” được đánh dấu là giả định vì SRS dùng khái niệm sản phẩm chứ không nêu khóa định danh.
- **Quantity 1 / 0 / âm / thập phân / không phải số** tách đúng biên số nguyên dương tối thiểu và kiểu dữ liệu tại ô nhập FR-06. API payload được đặt lớp riêng vì API spec không cho validation oracle.
- **Dialog đóng / mở / xác nhận / hủy** phân biệt chưa yêu cầu xóa, yêu cầu xác nhận, đã xác nhận và nhánh hủy. Nhánh hủy vẫn cần làm rõ trước khi chấm.
- **Các output cột, dòng trùng, thành tiền, label và empty state** tách những điều kiện có expected riêng trong SRS/phân công. Tổng giỏ và badge number giữ ở trạng thái câu hỏi khi nguồn không đủ.

Đây là tập lớp để review và chuẩn bị bước tiếp theo. Không liệt kê trình tự thao tác test, không thiết kế TC, không chạy SUT và không có kết quả thực thi/human review.
