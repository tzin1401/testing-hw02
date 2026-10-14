# AI-022 — B-FR07 Domain cases output snapshot

Snapshot of `features/B-FR07/03-domain-cases.md` at creation time.

# B-FR07 — Ca kiểm thử Domain

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2.
**Trạng thái:** Ca thiết kế do AI soạn; chưa ghi actual/status và chưa chạy SUT. Có expected cần review được đánh dấu rõ.

## Quy ước dữ liệu và chuẩn bị

- Tất cả ca là UI Web, trừ B-DT-020 exploratory API. API không thay thế ca giao diện.
- Fixture sản phẩm đã do người dùng cung cấp: P1 = iPhone 15 Pro Max, ID 1, đơn giá 30.000.000 VND; P2 = Samsung Galaxy S24 Ultra, ID 2, đơn giá 28.000.000 VND. Trước khi chạy, đối chiếu tên/ID/giá đang hiển thị bằng quan sát chỉ đọc. Nếu khác, sửa fixture trong ca. Không sửa/xóa sản phẩm mẫu.
- Dùng tài khoản kiểm thử riêng, không dùng admin/giỏ của người khác. Đăng nhập là tiền điều kiện, không thuộc expected của các ca. API spec yêu cầu Bearer token cho API cart; token không ghi vào log.
- Reset cho từng ca độc lập bằng UI: trong giỏ của tài khoản test, xóa và xác nhận chỉ các dòng P1/P2 do ca trước thêm, rồi kiểm tra số dòng. Không xóa bản ghi sản phẩm, không gọi API để reset. Nếu không xác định được dòng test hoặc không thể dọn qua UI, dừng ca; không đụng dữ liệu khác.
- Reload chỉ được dùng ở đầu một ca độc lập khi cần mở trang; không dùng reload làm thao tác reset và không reload giữa chuỗi. Vì persistence chưa rõ, luôn kiểm tra trạng thái thực sau khi mở.
- Khi chạy sau này, lưu ảnh trước/sau tại evidence/B-FR07/<TC-ID>/<Run-ID>/; ghi browser/OS/SUT commit, thời điểm, thao tác, input, output. Nếu có request, lưu response đã che token. Ảnh tính tiền cần thấy tên, đơn giá, quantity, thành tiền, nhãn và tổng.
- Với nút +/−, Xóa và dialog: trước hết kiểm tra control có mặt. Nếu thiếu, ghi nhận thiếu control, không giả sử để click; ca tương tác phụ thuộc được ghi Blocked khi execution.

## B-DT-001 — Giỏ rỗng

- **Mục tiêu / requirement:** Empty state, B-R01.
- **Loại:** UI Web.
- **Điều kiện / giỏ đầu:** Tài khoản test; reset qua UI; giỏ 0 dòng.
- **Dữ liệu:** Không có sản phẩm/giá/quantity.
- **Thao tác:** Mở Giỏ hàng; quan sát vùng nội dung, không thêm sản phẩm.
- **Expected:** Có hình minh họa và thông báo rõ giỏ rỗng; không kiểm câu chữ cụ thể (SRS FR-07).
- **EC:** B-EC-01, B-EC-24, B-EC-25.
- **Quan sát/evidence:** Ảnh toàn vùng empty state; ghi riêng có/không có hình và thông báo.

## B-DT-002 — Một sản phẩm

- **Mục tiêu / requirement:** Một dòng và các cột giỏ, B-R02/B-R03/B-R13.
- **Loại:** UI Web.
- **Điều kiện / giỏ đầu:** Reset UI; giỏ rỗng; P1 có trong catalog.
- **Dữ liệu:** P1 ID 1, 30.000.000 VND, nhập quantity 1 ở trang chi tiết.
- **Thao tác:** Trang chủ → mở chi tiết P1 → nhập 1 → bấm Thêm vào giỏ → quan sát phản hồi → mở Giỏ hàng.
- **Expected:** Một dòng P1, quantity 1; có cột Sản phẩm/Đơn giá/Số lượng/Thành tiền/Thao tác. Sau thêm thành công có toast hoặc badge cập nhật, một trong hai là đủ (FR-06/07).
- **EC:** B-EC-02, B-EC-06, B-EC-08, B-EC-10, B-EC-26, B-EC-28, B-EC-34.
- **Quan sát/evidence:** Ảnh input, phản hồi thêm, và dòng giỏ; ghi ID, tên, giá, quantity.

## B-DT-003 — Hai sản phẩm khác nhau

- **Mục tiêu / requirement:** Nhiều dòng, B-R02.
- **Loại:** UI Web.
- **Điều kiện / giỏ đầu:** Reset UI; giỏ rỗng; P1/P2 còn hiển thị.
- **Dữ liệu:** P1 ID 1, 30.000.000, quantity 1; P2 ID 2, 28.000.000, quantity 1.
- **Thao tác:** Thêm P1 qua chi tiết; điều hướng UI về danh sách; thêm P2; mở giỏ.
- **Expected:** Có hai sản phẩm/dòng khác nhau và các cột yêu cầu. Hai ID khác nhau là đại diện cho hai sản phẩm dựa trên API spec; quy tắc identity cần xác nhận nếu chấm số dòng theo ID.
- **EC:** B-EC-03, B-EC-05, B-EC-06, B-EC-10, B-EC-26, B-EC-28.
- **Quan sát/evidence:** Ảnh cả hai dòng và tên/ID/giá.

## B-DT-004 — Thêm lại cùng sản phẩm, xác nhận gộp dòng

- **Mục tiêu / requirement:** B-R04.
- **Loại:** UI Web.
- **Điều kiện / giỏ đầu:** Reset UI; giỏ rỗng; P1 còn hiển thị.
- **Dữ liệu:** P1 ID 1, 30.000.000; lần đầu quantity 1, lần hai quantity 2.
- **Thao tác:** Thêm P1 quantity 1 → điều hướng UI lại chi tiết P1 → nhập 2 → thêm lần hai → mở giỏ, đếm dòng và quantity.
- **Expected:** Chỉ một dòng P1 và quantity tăng từ 1 theo quantity thêm (diễn giải là tổng 3); không tạo dòng trùng (SRS FR-07). Cách map “cùng sản phẩm” với cùng ID và phép cộng cần xác nhận trước khi chấm chi tiết.
- **EC:** B-EC-04, B-EC-06, B-EC-10, B-EC-11, B-EC-27.
- **Quan sát/evidence:** Ảnh trước lần thêm thứ hai và sau; ghi số dòng và quantity.

## B-DT-005 — Đơn giá, thành tiền dòng và tổng

- **Mục tiêu / requirement:** B-R02/B-R07/B-R08.
- **Loại:** UI Web.
- **Điều kiện / giỏ đầu:** Reset UI; rỗng; xác nhận fixture P1/P2.
- **Dữ liệu:** P1 30.000.000 × quantity 2; P2 28.000.000 × quantity 1.
- **Thao tác:** Thêm P1 quantity 2; thêm P2 quantity 1; mở giỏ; ghi đơn giá, quantity, thành tiền từng dòng, nhãn và tổng.
- **Expected có căn cứ:** Hai dòng có đơn giá; thành tiền P1 = 60.000.000 và P2 = 28.000.000 theo công thức phân công Thành viên 2; nhãn đúng “Tổng cộng” theo SRS FR-07.
- **Expected tổng:** Ghi giá trị tổng. 88.000.000 là candidate theo phép cộng thông thường, nhưng SRS không nêu rõ công thức tổng giỏ; không chấm đúng/sai tổng cho tới khi xác nhận. Không thêm phí/giảm giá/làm tròn.
- **EC:** B-EC-03, B-EC-08, B-EC-11, B-EC-26, B-EC-28–B-EC-33.
- **Quan sát/evidence:** Ảnh đủ hai dòng và vùng tổng; ghi phần expected trực tiếp riêng với tổng còn chờ oracle.

## B-DT-006 — Kiểm tra nút cộng hiện diện

- **Mục tiêu / requirement:** B-R05, kiểm tra control trước ca phụ thuộc.
- **Loại:** UI Web.
- **Điều kiện / giỏ đầu:** Reset UI; chỉ P1 quantity 1 trong giỏ.
- **Dữ liệu:** P1 ID 1, 30.000.000, quantity 1.
- **Thao tác:** Mở giỏ; tìm nút + trên dòng P1; ghi có/không và enable/disable. Không click trong ca presence này.
- **Expected:** Nút + tồn tại để chỉnh quantity theo FR-07.
- **EC:** B-EC-17.
- **Quan sát/evidence:** Ảnh dòng hàng và nút quantity.
- **Phụ thuộc:** Nếu thiếu, ghi nhận vấn đề presence; B-DT-007 sẽ Blocked khi thực thi.

## B-DT-007 — Tăng quantity bằng nút +

- **Mục tiêu / requirement:** B-R05/B-R07.
- **Loại:** UI Web.
- **Điều kiện / giỏ đầu:** Reset UI; P1 quantity 1; nút + hiện diện theo B-DT-006.
- **Dữ liệu:** P1 ID 1, 30.000.000, quantity trước 1.
- **Thao tác:** Mở giỏ; xác nhận control +; click một lần; ghi quantity/thành tiền.
- **Expected:** Quantity tăng. Nếu bước là +1 thì quantity 2 và thành tiền theo phân công là 60.000.000; FR-07 chưa nêu delta mỗi click, nên không chấm con số cụ thể nếu chưa review.
- **EC:** B-EC-17, B-EC-29.
- **Quan sát/evidence:** Ảnh trước/sau, quantity, đơn giá, thành tiền.
- **Phụ thuộc:** Nếu nút thiếu, Blocked; không thay bằng API hoặc nhập quantity trực tiếp.

## B-DT-008 — Kiểm tra nút trừ hiện diện

- **Mục tiêu / requirement:** B-R06, kiểm tra control trước ca phụ thuộc.
- **Loại:** UI Web.
- **Điều kiện / giỏ đầu:** Reset UI; chỉ P1 quantity 2 trong giỏ.
- **Dữ liệu:** P1 ID 1, 30.000.000, quantity 2.
- **Thao tác:** Mở giỏ; tìm nút −; ghi có/không và enable/disable. Không click trong ca presence này.
- **Expected:** Nút − tồn tại để chỉnh quantity theo FR-07.
- **EC:** B-EC-18/B-EC-19.
- **Quan sát/evidence:** Ảnh dòng P1 và control.
- **Phụ thuộc:** Nếu thiếu, B-DT-009/B-DT-010 sẽ Blocked khi execution.

## B-DT-009 — Giảm quantity khi lớn hơn 1

- **Mục tiêu / requirement:** B-R06/B-R07.
- **Loại:** UI Web.
- **Điều kiện / giỏ đầu:** Reset UI; P1 quantity 2; nút − hiện diện theo B-DT-008.
- **Dữ liệu:** P1 ID 1, 30.000.000, quantity trước 2.
- **Thao tác:** Mở giỏ; xác nhận quantity 2; click − một lần; ghi quantity/thành tiền.
- **Expected:** Quantity giảm, không thấp hơn 1 theo minimum trong FR-06/phân công. Nếu delta là 1, kết quả quantity 1 và thành tiền 30.000.000; delta cần xác nhận trước khi chấm số cụ thể.
- **EC:** B-EC-18, B-EC-29.
- **Quan sát/evidence:** Ảnh trước/sau và giá trị từng cột.
- **Phụ thuộc:** Nếu nút thiếu, Blocked; không giả định control tồn tại.

## B-DT-010 — Bấm nút trừ tại quantity 1

- **Mục tiêu / requirement:** Quan sát ngưỡng minimum mà không tự đặt policy.
- **Loại:** UI Web.
- **Điều kiện / giỏ đầu:** Reset UI; chỉ P1 quantity 1; nút − hiện diện.
- **Dữ liệu:** P1 ID 1, 30.000.000, quantity 1.
- **Thao tác:** Mở giỏ; ghi trạng thái nút −. Nếu enable, click một lần; nếu disable, chỉ ghi nhận, không click. Quan sát dòng/quantity/dialog.
- **Expected:** Chưa rõ nút bị disable, giữ quantity 1, hỏi xác nhận hay xóa dòng. Ghi observation; không chấm Pass/Fail cho outcome cho tới khi có oracle.
- **EC:** B-EC-19.
- **Quan sát/evidence:** Ảnh trước/sau, trạng thái nút và mọi dialog/thay đổi.
- **Phụ thuộc:** Nếu không có nút, presence đã kiểm ở B-DT-008; tương tác Blocked.

## B-DT-011 — Mở dialog xóa rồi hủy

- **Mục tiêu / requirement:** B-R09 và nhánh B-R11 cần review.
- **Loại:** UI Web.
- **Điều kiện / giỏ đầu:** Reset UI; chỉ P1 quantity 1 trong giỏ.
- **Dữ liệu:** P1 ID 1, 30.000.000, quantity 1.
- **Thao tác:** Mở giỏ; xác nhận Xóa hiện diện; click Xóa; chụp dialog; nếu có Hủy thì click Hủy, nếu không có thì không tự giả định cách đóng; quan sát giỏ.
- **Expected:** Dialog phải xuất hiện trước khi xóa (SRS FR-07). Dự kiến P1 còn nguyên sau Hủy, nhưng SRS chưa nói rõ Cancel; giữ là expected cần review, không chấm cho tới khi xác nhận.
- **EC:** B-EC-20, B-EC-22, B-EC-37, B-EC-41.
- **Quan sát/evidence:** Ảnh trước click, dialog, sau hủy; ghi nguyên văn nút nếu có.
- **Phụ thuộc:** Nếu không có Xóa/dialog/Hủy, ghi đúng control thiếu và không chạy nhánh phụ thuộc.

## B-DT-012 — Xác nhận xóa đúng dòng

- **Mục tiêu / requirement:** B-R09/B-R10.
- **Loại:** UI Web.
- **Điều kiện / giỏ đầu:** Reset UI; thêm P1 và P2, mỗi sản phẩm quantity 1; xác nhận hai dòng.
- **Dữ liệu:** P1 ID 1, 30.000.000 × 1; P2 ID 2, 28.000.000 × 1.
- **Thao tác:** Mở giỏ; tại dòng P1 click Xóa; xác nhận dialog; chọn Xác nhận; quan sát cả hai dòng.
- **Expected:** Có dialog trước xóa; P1 được chọn không còn sau xác nhận. P2 còn lại là diễn giải “xóa sản phẩm được chọn”; nếu cần chấm tác động lên dòng khác, xác nhận oracle trước.
- **EC:** B-EC-03, B-EC-20, B-EC-21, B-EC-36.
- **Quan sát/evidence:** Ảnh hai dòng trước, dialog và P2 còn lại sau; không xóa sản phẩm khỏi catalog.
- **Phụ thuộc:** Nếu Xóa/dialog/confirm thiếu, ghi presence/confirmation và không giả định thao tác.

## B-DT-013 — Xác nhận xóa dòng cuối

- **Mục tiêu / requirement:** B-R10 rồi B-R01.
- **Loại:** UI Web.
- **Điều kiện / giỏ đầu:** Reset UI; thêm duy nhất P1 quantity 1.
- **Dữ liệu:** P1 ID 1, 30.000.000, quantity 1.
- **Thao tác:** Mở giỏ; click Xóa trên P1; xác nhận dialog; chọn Xác nhận; quan sát trạng thái rỗng.
- **Expected:** P1 dòng cuối bị xóa theo diễn giải thao tác Xóa; giỏ rỗng hiển thị hình minh họa và thông báo rõ theo FR-07.
- **EC:** B-EC-01, B-EC-20, B-EC-21, B-EC-24, B-EC-36.
- **Quan sát/evidence:** Ảnh dòng trước, dialog, empty state sau. Không xóa catalog item.
- **Phụ thuộc:** Nếu control/dialog thiếu thì không giả định để tiếp tục.

## B-DT-014 — Tiếp tục mua sắm

- **Mục tiêu / requirement:** B-R12.
- **Loại:** UI Web.
- **Điều kiện / giỏ đầu:** Reset UI; thêm P1 quantity 1; đang ở trang Giỏ hàng.
- **Dữ liệu:** P1 ID 1, 30.000.000, quantity 1.
- **Thao tác:** Chụp trang giỏ; click Tiếp tục mua sắm; quan sát URL/trang đích.
- **Expected:** Có nút này và đưa người dùng về trang chủ (SRS FR-07). Không chấm persistence của giỏ sau điều hướng.
- **EC:** B-EC-23, B-EC-39.
- **Quan sát/evidence:** Ảnh trước/sau và URL/trang đích.

## B-DT-015 — Nhãn “Tổng cộng”

- **Mục tiêu / requirement:** B-R08.
- **Loại:** UI Web.
- **Điều kiện / giỏ đầu:** Reset UI; thêm P1 quantity 1; mở giỏ.
- **Dữ liệu:** P1 ID 1, đơn giá 30.000.000, quantity 1.
- **Thao tác:** Đi tới vùng tổng; ghi nguyên văn nhãn.
- **Expected:** Nhãn chính xác “Tổng cộng”, không phải “Tổng tạm tính”; không chấm phép tính giá trị tổng trong ca này (SRS FR-07).
- **EC:** B-EC-31/B-EC-32.
- **Quan sát/evidence:** Ảnh rõ nhãn và giá trị đi kèm.

## B-DT-016 — Quantity bằng 0 tại ô nhập FR-06

- **Mục tiêu / requirement:** B-R13, input invalid duy nhất là quantity.
- **Loại:** UI Web.
- **Điều kiện / giỏ đầu:** Reset UI; giỏ rỗng; mở trang chi tiết P1.
- **Dữ liệu:** P1 ID 1, 30.000.000; quantity 0; input khác hợp lệ.
- **Thao tác:** Focus ô Số lượng; nhập 0 và ghi giá trị/validation. Nếu control giữ 0, bấm Thêm một lần; nếu từ chối, không can thiệp DOM/API. Mở giỏ quan sát có quantity 0 được thêm không.
- **Expected:** 0 không được nhận làm quantity thêm theo FR-06 (số nguyên dương tối thiểu 1); wording/chặn cụ thể chưa được quy định.
- **EC:** B-EC-12.
- **Quan sát/evidence:** Ảnh input và giỏ; Network redacted nếu phát sinh request.

## B-DT-017 — Quantity âm tại ô nhập FR-06

- **Mục tiêu / requirement:** B-R13, chỉ quantity sai miền.
- **Loại:** UI Web.
- **Điều kiện / giỏ đầu:** Reset UI; giỏ rỗng; trang chi tiết P1.
- **Dữ liệu:** P1 ID 1, 30.000.000; quantity -1; input khác hợp lệ.
- **Thao tác:** Thử nhập -1 vào ô Số lượng; ghi giá trị/validation. Nếu control giữ giá trị thì bấm Thêm; nếu không giữ thì dừng quan sát. Mở giỏ kiểm tra.
- **Expected:** Số âm không phải số nguyên dương tối thiểu 1 nên không được nhận làm quantity thêm theo FR-06; không gọi API để thay UI.
- **EC:** B-EC-13.
- **Quan sát/evidence:** Ảnh input/giỏ; Network redacted nếu có request.

## B-DT-018 — Quantity thập phân tại ô nhập FR-06

- **Mục tiêu / requirement:** B-R13, chỉ quantity sai miền.
- **Loại:** UI Web.
- **Điều kiện / giỏ đầu:** Reset UI; giỏ rỗng; trang chi tiết P1.
- **Dữ liệu:** P1 ID 1, 30.000.000; quantity 1.5; input khác hợp lệ.
- **Thao tác:** Thử nhập 1.5; ghi giá trị/validation. Nếu control giữ thì bấm Thêm một lần; nếu từ chối thì không dùng script/API. Mở giỏ quan sát.
- **Expected:** Quantity thập phân không phải số nguyên, không được nhận theo FR-06; wording cụ thể chưa quy định.
- **EC:** B-EC-14.
- **Quan sát/evidence:** Ảnh input/giỏ; Network redacted nếu phát sinh request.

## B-DT-019 — Quantity không phải số tại ô nhập FR-06

- **Mục tiêu / requirement:** B-R13, chỉ quantity sai kiểu.
- **Loại:** UI Web.
- **Điều kiện / giỏ đầu:** Reset UI; giỏ rỗng; trang chi tiết P1.
- **Dữ liệu:** P1 ID 1, 30.000.000; chuỗi abc; input khác hợp lệ.
- **Thao tác:** Thử nhập abc. Nếu control không nhận chữ, ghi đúng giá trị/validation và dừng; nếu nhận, bấm Thêm một lần. Mở giỏ quan sát.
- **Expected:** Nếu nhận được chuỗi, abc không được nhận làm số lượng theo FR-06. Nếu control ngăn gõ thì ghi observation; không thay bằng API.
- **EC:** B-EC-15.
- **Quan sát/evidence:** Ảnh ô quantity, giỏ; Network redacted nếu có request.

## B-DT-020 — Thăm dò quantity thập phân qua API (chưa có oracle)

- **Mục tiêu:** Quan sát riêng API invalid; không thay thế UI case B-DT-018.
- **Loại:** API exploratory.
- **Điều kiện / giỏ đầu:** Test account riêng có token hợp lệ; reset giỏ qua UI trước request; P1 không bị sửa.
- **Dữ liệu:** POST /api/cart; body id=1, name="iPhone 15 Pro Max", price=30000000, quantity=1.5; chỉ quantity sai, trường khác khớp fixture.
- **Thao tác:** Xác nhận giỏ rỗng bằng UI; gửi một POST; lưu response redacted; mở giỏ qua UI quan sát; nếu có dòng test thì dọn qua UI.
- **Expected:** Chưa có oracle: API spec liệt kê quantity nhưng không định nghĩa validation; FR-06 nói về ô UI. Chỉ ghi observation, không Pass/Fail.
- **EC:** B-EC-16.
- **Quan sát/evidence:** Request/response, timestamp, ảnh giỏ trước/sau; không lưu token.

## Giới hạn

- Không xóa/sửa sản phẩm catalog hoặc dữ liệu mẫu.
- Reset giỏ chỉ bằng thao tác UI; reload không được dùng giữa chuỗi hay làm cách reset.
- B-DT-005 có expected line amount theo phân công; tổng 88.000.000 là candidate cần xác nhận, không tự chấm.
- B-DT-010, nhánh Hủy ở B-DT-011, một số delta +/- và API B-DT-020 cần làm rõ. Nếu control không tồn tại, ghi presence riêng và đánh dấu tương tác phụ thuộc Blocked ở bước execution.
- File này chỉ chứa thiết kế: không có actual, status, ảnh/log chạy hoặc human review.
