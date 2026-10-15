# C-FR14 — Ca kiểm thử Domain

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2.
**Trạng thái:** Thiết kế ca từ requirements và domains; chưa chạy SUT, chưa có actual/status và chưa có human review.

## Quy ước chung

- **Nguồn expected:** SRS `eshop-sut/README.md` FR-14 (Thêm/Xem/Xóa; tên bắt buộc, không để trống) và FR-12 (Admin role; API POST/DELETE cần JWT hợp lệ và role admin); endpoint `GET/POST/DELETE /api/categories` theo `eshop-sut/api_specification.md` mục 3.4.
- Dùng tài khoản test có role admin và user thường; không ghi password/JWT vào evidence. API request/response phải che token. Nếu không có sẵn tài khoản với đúng role, chuẩn bị qua quy trình an toàn được phép trước khi bắt đầu; không sửa role của tài khoản mẫu.
- Tên cho category test: thay `<RunID>` bằng mã riêng cho lần chạy, ví dụ `R20261015-01`. Các ví dụ đầy đủ như `C14-DT-R20261015-01-ASCII` hoặc `C14-DT-R20261015-01-Đồ uống` là dữ liệu test cụ thể; hậu tố chỉ để nhận diện/dọn đúng dữ liệu của ca, không kiểm tra tính duy nhất.
- Trước mỗi ca ghi danh sách hiện tại; khi so sánh chỉ xét các dòng test do ca tạo. Không sửa/xóa category mẫu. Nếu không thể phân biệt dòng test hoặc target có tham chiếu sản phẩm và thao tác có rủi ro, dừng ca.
- Lưu ảnh giao diện trước/sau; với API lưu request/response JSON đã che token, thời điểm, và snapshot `GET /api/categories` trước/sau. Evidence sau này đặt tại `evidence/C-FR14/<TC-ID>/<Run-ID>/`.
- **Dọn dẹp:** sau khi evidence được lưu, xóa qua Admin UI/API chỉ những category ID do chính ca đó tạo và đã đối chiếu tên/ID. Ghi thao tác dọn vào execution log. Không xóa tự động trong các ca thiết kế này. Không xóa dữ liệu mẫu.
- Không đặt HTTP status/body, trim, uniqueness, độ dài tên, dialog bắt buộc hoặc chính sách xóa category đang được sản phẩm tham chiếu.

## C-DT-001 — Admin thêm tên ASCII và thấy đúng tên trong danh sách

- **Mục tiêu / requirement:** Thêm và xem danh mục mới; C-R02, C-R03, C-R05.
- **Loại:** Admin Web UI.
- **Role/tài khoản, trạng thái đầu:** Tài khoản test role `admin` đã đăng nhập; ghi snapshot danh sách trước; không dùng lại tên test đã tạo ở Run trước nếu còn tồn tại.
- **Dữ liệu:** Tên `C14-DT-<RunID>-Do uong test` (ASCII, không rỗng).
- **EC:** C-EC-02, C-EC-06, C-EC-10.
- **Thao tác:** 1) Mở khu vực **Danh mục** trong Admin. 2) Chụp danh sách trước. 3) Nhập đúng tên vào ô tên danh mục. 4) Bấm **Thêm mới** một lần. 5) Quan sát phản hồi. 6) Chụp danh sách và tìm chính xác tên vừa nhập; ghi ID hiển thị nếu có.
- **Expected:** Admin có thể thêm danh mục; tên test xuất hiện trong danh sách đúng như nhập. Không chấm thông báo/status cụ thể.
- **Quan sát/evidence:** ảnh form trước submit, ảnh sau submit có tên và ID/dòng; ghi danh sách trước/sau. Ghi ID category test để dọn sau khi lưu evidence.

## C-DT-002 — Admin thêm tên Unicode có dấu và thấy đúng tên

- **Mục tiêu / requirement:** Kiểm tra tên không rỗng có dấu; C-R02, C-R03, C-R05.
- **Loại:** Admin Web UI.
- **Role/tài khoản, trạng thái đầu:** Tài khoản role `admin`; danh sách trước đã ghi; dùng tên mới cho ca.
- **Dữ liệu:** `C14-DT-<RunID>-Đồ uống thử` (Unicode có dấu, không rỗng).
- **EC:** C-EC-03, C-EC-06, C-EC-10.
- **Thao tác:** 1) Mở **Danh mục**. 2) Nhập tên nguyên văn vào ô tên. 3) Bấm **Thêm mới**. 4) Quan sát danh sách sau thao tác, không sửa lại ký tự. 5) So sánh chuỗi hiển thị với input.
- **Expected:** FR-14 yêu cầu tên không để trống và không nêu giới hạn ký tự; category được thêm và tên nhập được hiển thị đúng. Không đặt expected về Unicode normalization.
- **Quan sát/evidence:** ảnh input và danh sách sau; ghi chính xác tên và ID. Dọn chỉ category ID do ca tạo sau khi lưu evidence.

## C-DT-003 — Tên rỗng bị từ chối, danh sách không đổi

- **Mục tiêu / requirement:** Tên bắt buộc; C-R05.
- **Loại:** Admin Web UI.
- **Role/tài khoản, trạng thái đầu:** Admin đã đăng nhập; ghi snapshot danh sách trước.
- **Dữ liệu:** trường tên rỗng `""`; không nhập giá trị khác.
- **EC:** C-EC-01, C-EC-10.
- **Thao tác:** 1) Mở **Danh mục**. 2) Chụp/ghi danh sách trước. 3) Để trống ô tên. 4) Bấm **Thêm mới** một lần. 5) Quan sát validation và danh sách sau; không nhập tên thay thế trong cùng ca.
- **Expected:** Không tạo category có tên rỗng theo FR-14. Câu chữ/thời điểm validation không được quy định.
- **Quan sát/evidence:** ảnh ô trống và danh sách sau; xác nhận không xuất hiện dòng mới bằng cách đối chiếu snapshot. Không gán expected cho nội dung cảnh báo.

## C-DT-004 — Probe tên chỉ có ba dấu cách

- **Mục tiêu / requirement:** Tìm hiểu cách xử lý whitespace-only; C-R05 nhưng oracle chưa chốt.
- **Loại:** Admin Web UI; probe, không kết luận Pass/Fail.
- **Role/tài khoản, trạng thái đầu:** Admin đã đăng nhập; ghi snapshot danh sách trước.
- **Dữ liệu:** đúng ba dấu cách `"   "`; không thêm ký tự khác.
- **EC:** C-EC-04.
- **Thao tác:** 1) Mở **Danh mục**. 2) Nhập ba dấu cách. 3) Chụp giá trị hiển thị trong ô. 4) Bấm **Thêm mới** một lần nếu UI cho phép. 5) Quan sát response/danh sách sau và ghi chính xác input/output.
- **Expected:** **Chưa chốt.** SRS không định nghĩa trim hoặc whitespace-only có phải “để trống”. Không đánh Pass/Fail cho việc nhận/từ chối chuỗi này; nếu category được tạo, chỉ dọn đúng ID test sau khi evidence được lưu.
- **Quan sát/evidence:** ảnh ô input trước submit và trạng thái sau; nếu có category mới ghi ID/name/API GET observation. Ghi kết quả là probe để hỏi review.

## C-DT-005 — Admin xem danh sách đang có dữ liệu

- **Mục tiêu / requirement:** Xem danh sách; C-R03.
- **Loại:** Admin Web UI.
- **Role/tài khoản, trạng thái đầu:** Admin đã đăng nhập; danh sách có ít nhất một category hiện có hoặc category test do ca trước tạo; ghi ID/tên trước.
- **Dữ liệu:** không thay đổi tên/ID; không có request ghi.
- **EC:** C-EC-06, C-EC-10.
- **Thao tác:** 1) Mở **Danh mục**. 2) Quan sát và chụp các dòng. 3) Đối chiếu tên/ID với snapshot trước; không click Xóa/Thêm.
- **Expected:** Admin xem được danh sách danh mục. Không đặt thứ tự, schema field hoặc nội dung giao diện ngoài việc danh sách được hiển thị.
- **Quan sát/evidence:** ảnh danh sách đủ rõ; ghi các ID/tên đã quan sát và xác nhận trạng thái dữ liệu không bị thay đổi.

## C-DT-006 — GET danh mục riêng, không suy rộng quyền truy cập

- **Mục tiêu / requirement:** Quan sát GET độc lập với kiểm thử quyền POST/DELETE; C-R03, C-R06 (điểm chưa rõ).
- **Loại:** API read-only probe.
- **Role/tài khoản, trạng thái đầu:** Chuẩn bị lần lượt token admin, token user thường và request không có token; nếu không có một dạng credential thì ghi Not run cho biến thể đó. Chụp/ghi trạng thái category ban đầu.
- **Dữ liệu:** `GET /api/categories`; không có body và không làm thay đổi state.
- **EC:** C-EC-05/C-EC-06 tùy danh sách; C-EC-15.
- **Thao tác:** 1) Gọi GET với token admin; lưu response đã che token. 2) Gọi GET với token user; lưu response. 3) Gọi GET không Authorization; lưu response. 4) Đối chiếu dữ liệu và xác nhận không có thay đổi sau các GET.
- **Expected:** FR-14 yêu cầu chức năng xem danh sách; API có endpoint GET. **Chưa có expected cho việc từ chối/cho phép từng nhóm credential** vì FR-12/API spec không chốt quyền của GET dùng chung. Không yêu cầu user/khách bị từ chối; không gán Fail nếu GET trả danh sách cho họ.
- **Quan sát/evidence:** request/response từng biến thể đã che token, timestamp; danh sách trước/sau. Gắn nhãn probe/observation-only.

## C-DT-007 — Admin xóa đúng category test vừa tạo

- **Mục tiêu / requirement:** Xóa đúng target và giữ các dòng khác; C-R04.
- **Loại:** Admin Web UI.
- **Role/tài khoản, trạng thái đầu:** Admin đã đăng nhập. Tạo mới một category test riêng qua UI với tên `C14-DT-<RunID>-delete-target`; ghi ID/tên sau khi tạo. Ghi thêm một category khác đang có để so sánh, không sửa/xóa category đó. Nếu target có liên quan sản phẩm hoặc không thể phân biệt, dừng.
- **Dữ liệu:** chỉ xóa ID vừa tạo trong cùng ca; giữ nguyên category khác.
- **EC:** C-EC-06, C-EC-07, C-EC-10.
- **Thao tác:** 1) Chụp danh sách có target và dòng so sánh. 2) Tại đúng dòng target bấm **Xóa**. 3) Nếu UI hiện dialog, chụp lại và chỉ chọn nút xác nhận có nhãn rõ; nếu không có dialog, ghi nhận rồi tiếp tục luồng xóa UI đang có. 4) Sau khi thao tác hoàn tất, chụp danh sách. 5) Đối chiếu target ID và dòng so sánh.
- **Expected:** Sau khi thao tác xóa target test thành công, ID/tên target không còn trong danh sách; dòng so sánh và category khác giữ nguyên. Không yêu cầu dialog/status cụ thể.
- **Quan sát/evidence:** ảnh trước/sau thể hiện target và dòng khác; ghi ID test, thao tác và mọi feedback. Evidence phải được lưu trước khi cleanup bổ sung.

## C-DT-008 — Dialog xóa và Hủy (chỉ khi UI có dialog)

- **Mục tiêu / requirement:** Probe hành vi dialog; C-R04 nhưng dialog không phải yêu cầu SRS.
- **Loại:** Admin Web UI; phụ thuộc giao diện có dialog.
- **Role/tài khoản, trạng thái đầu:** Admin đã đăng nhập; tạo một category test riêng `C14-DT-<RunID>-cancel-target`; ghi ID/name và xác nhận category khác hiện diện. Không dùng category mẫu làm target.
- **Dữ liệu:** ID category test vừa tạo.
- **EC:** C-EC-07, C-EC-10.
- **Thao tác:** 1) Tại dòng category test bấm **Xóa**. 2) Nếu dialog xuất hiện, chụp nội dung/nút. 3) Chọn nút Hủy/Cancel nếu hiện rõ. 4) Chụp danh sách và kiểm tra ID test còn tồn tại. Nếu không có dialog, ghi “dialog không quan sát thấy” và dừng nhánh tương tác; không tạo thao tác Hủy giả định.
- **Expected:** **Chưa có oracle SRS cho việc phải có dialog hoặc ngữ nghĩa/nội dung nút Hủy.** Candidate để review: chọn Hủy không xóa category; chỉ ghi observation, không gán Pass/Fail cho dialog/cancel.
- **Quan sát/evidence:** ảnh dialog (nếu có), nút đã chọn, danh sách sau; ghi status “probe”. Dọn chỉ ID test riêng sau khi lưu evidence.

## C-DT-009 — API POST với JWT admin hợp lệ

- **Mục tiêu / requirement:** API thêm và quyền admin hợp lệ; C-R02/C-R06.
- **Loại:** API.
- **Role/tài khoản, trạng thái đầu:** Tài khoản test role admin; token hợp lệ còn hiệu lực; danh sách trước đã lưu. Không ghi token vào file/log.
- **Dữ liệu:** `POST /api/categories`, body `{"name":"C14-DT-<RunID>-api-post"}`.
- **EC:** C-EC-02, C-EC-06, C-EC-10.
- **Thao tác:** 1) Lưu snapshot GET trước. 2) Gửi POST với `Authorization: Bearer <admin-token>` và body tên trên. 3) Lưu response đã che token. 4) Gọi GET danh sách. 5) Tìm category mới, ghi ID/tên.
- **Expected:** Admin có thể thêm danh mục; tên hợp lệ xuất hiện trong danh sách sau POST. HTTP status/body thành công chưa được quy định.
- **Quan sát/evidence:** request/response redacted, timestamps, GET trước/sesudah; ghi ID test để dọn sau khi evidence được lưu.

## C-DT-010 — API DELETE với JWT admin hợp lệ

- **Mục tiêu / requirement:** API xóa đúng category test bằng quyền admin; C-R04/C-R06.
- **Loại:** API.
- **Role/tài khoản, trạng thái đầu:** Admin token hợp lệ. Trong setup, tạo một category test riêng bằng POST admin với tên `C14-DT-<RunID>-api-delete`, nhận ID và xác nhận ID/name tồn tại qua GET. Có thể có category khác làm đối chứng; tuyệt đối không dùng ID mẫu làm target.
- **Dữ liệu:** `DELETE /api/categories/<ID vừa tạo>`.
- **EC:** C-EC-06, C-EC-07, C-EC-10.
- **Thao tác:** 1) Lưu GET trước, gồm target và dòng khác. 2) Gửi DELETE bằng admin token. 3) Lưu response redacted. 4) Gọi GET sau. 5) Đối chiếu: target mất, dòng khác vẫn còn.
- **Expected:** category test được chọn bị xóa khỏi danh sách; category khác không bị thay đổi. HTTP status/body không quy định.
- **Quan sát/evidence:** POST setup, ID/name, DELETE request/response, GET trước/sau đã lưu; token luôn che. Dọn chỉ ID test nếu còn tồn tại sau ca và chỉ sau khi lưu evidence.

## C-DT-011 — API POST thiếu token

- **Mục tiêu / requirement:** FR-12 chặn ghi khi không có JWT; C-R06.
- **Loại:** API âm.
- **Role/tài khoản, trạng thái đầu:** Không gửi token; danh sách category trước đã snapshot. Endpoint/body/name hợp lệ; không có field nghiệp vụ sai.
- **Dữ liệu:** `POST /api/categories`, body `{"name":"C14-DT-<RunID>-post-no-token"}`; không có Authorization header.
- **EC:** C-EC-02, C-EC-12.
- **Thao tác:** 1) GET snapshot trước. 2) Gửi đúng POST/body, bỏ Authorization. 3) Lưu response. 4) GET snapshot sau và tìm tên test.
- **Expected:** Thiếu JWT hợp lệ nên không được thêm category; danh sách không đổi. Không đặt HTTP status/body lỗi.
- **Quan sát/evidence:** request headers (xác nhận không có Authorization), body, response, GET trước/sau. Chỉ một yếu tố sai là quyền/xác thực.

## C-DT-012 — API POST token sai/không hợp lệ

- **Mục tiêu / requirement:** FR-12 chặn JWT không hợp lệ; C-R06.
- **Loại:** API âm.
- **Role/tài khoản, trạng thái đầu:** Không dùng credential thật; danh sách trước đã snapshot; body và tên hợp lệ.
- **Dữ liệu:** POST body `{"name":"C14-DT-<RunID>-post-bad-token"}`; header `Authorization: Bearer not-a-valid-token`.
- **EC:** C-EC-02, C-EC-13.
- **Thao tác:** GET trước → gửi POST với token giả ở trên → lưu response → GET sau, tìm tên test.
- **Expected:** Token không hợp lệ không đáp ứng FR-12; category không được tạo và danh sách không đổi. Status/message chưa quy định.
- **Quan sát/evidence:** request/response đã lưu, token giả hiển thị đúng literal, GET trước/sau. Chỉ yếu tố token sai.

## C-DT-013 — API POST token hết hạn

- **Mục tiêu / requirement:** FR-12 yêu cầu JWT hợp lệ; C-R06.
- **Loại:** API âm.
- **Role/tài khoản, trạng thái đầu:** Có token test hết hạn đã chuẩn bị an toàn; danh sách trước snapshot; token role admin nhưng hết hạn để chỉ thời hạn là yếu tố sai. Không ghi giá trị token.
- **Dữ liệu:** POST body `{"name":"C14-DT-<RunID>-post-expired"}`.
- **EC:** C-EC-02, C-EC-14.
- **Thao tác:** GET trước → POST với Bearer token hết hạn → lưu response redacted → GET sau và tìm tên.
- **Expected:** JWT hết hạn không hợp lệ nên không được tạo category; danh sách không đổi. Status/message chưa quy định. Nếu không thể tạo/xác minh token hết hạn mà không đổi hệ thống, đánh dấu ca chưa chạy thay vì thay bằng token khác.
- **Quan sát/evidence:** token metadata redacted (role/expiry test), request/response và GET trước/sau. Chỉ yếu tố thời hạn token sai.

## C-DT-014 — API POST token user thường hợp lệ

- **Mục tiêu / requirement:** FR-12 chặn role không phải admin; C-R06.
- **Loại:** API âm.
- **Role/tài khoản, trạng thái đầu:** User test có token hợp lệ còn hạn và role user; danh sách trước snapshot. Body hợp lệ; không dùng admin token.
- **Dữ liệu:** POST body `{"name":"C14-DT-<RunID>-post-user"}`.
- **EC:** C-EC-02, C-EC-11.
- **Thao tác:** GET trước → POST với Bearer user token → lưu response redacted → GET sau và tìm tên.
- **Expected:** Token hợp lệ nhưng role không phải admin nên không được thêm category theo FR-12; danh sách không đổi. Status/message không quy định.
- **Quan sát/evidence:** xác nhận role của test account từ nguồn an toàn (không lưu token), request/response, GET trước/sau. Chỉ role là yếu tố không đạt.

## C-DT-015 — API DELETE thiếu token

- **Mục tiêu / requirement:** FR-12 chặn DELETE không có JWT; C-R06.
- **Loại:** API âm.
- **Role/tài khoản, trạng thái chuẩn bị:** Setup bằng admin tạo một category test riêng `C14-DT-<RunID>-delete-no-token`; lưu ID/name qua GET. Token bị thiếu chỉ ở request DELETE; không đụng category khác.
- **Dữ liệu:** `DELETE /api/categories/<ID test>` không Authorization header.
- **EC:** C-EC-07, C-EC-12.
- **Thao tác:** GET trước xác nhận target tồn tại → DELETE không token → lưu response → GET sau xác nhận target còn và các dòng khác không đổi.
- **Expected:** Không có JWT hợp lệ nên FR-12 yêu cầu không cho ghi; target không bị xóa, danh sách không đổi. Không đặt status/body.
- **Quan sát/evidence:** POST setup, target ID, DELETE headers không Authorization, response, GET trước/sau. Chỉ yếu tố token thiếu.

## C-DT-016 — API DELETE token không hợp lệ

- **Mục tiêu / requirement:** FR-12 chặn DELETE với JWT sai; C-R06.
- **Loại:** API âm.
- **Role/tài khoản, trạng thái chuẩn bị:** Tạo category test riêng bằng setup admin; xác nhận target tồn tại và ghi ID. DELETE request dùng token giả; target và mọi input khác hợp lệ.
- **Dữ liệu:** `DELETE /api/categories/<ID test>`; header `Authorization: Bearer not-a-valid-token`.
- **EC:** C-EC-07, C-EC-13.
- **Thao tác:** GET trước → DELETE với literal token giả → lưu response → GET sau, xác nhận target còn.
- **Expected:** JWT không hợp lệ không được phép xóa; danh sách giữ nguyên. Không đặt status/message.
- **Quan sát/evidence:** request/response, GET trước/sau và ID test. Chỉ yếu tố token sai.

## C-DT-017 — API DELETE token hết hạn

- **Mục tiêu / requirement:** FR-12 chặn DELETE khi JWT không còn hợp lệ; C-R06.
- **Loại:** API âm.
- **Role/tài khoản, trạng thái chuẩn bị:** Admin setup tạo category test riêng; token test có role admin nhưng hết hạn; xác nhận target còn tồn tại. Không ghi token.
- **Dữ liệu:** `DELETE /api/categories/<ID test>` bằng Bearer token hết hạn.
- **EC:** C-EC-07, C-EC-14.
- **Thao tác:** GET trước → DELETE với token hết hạn → lưu response redacted → GET sau, xác nhận target còn.
- **Expected:** JWT hết hạn không hợp lệ, không được xóa category; danh sách không đổi. Nếu không chuẩn bị được token an toàn, ghi Not run thay vì dùng token giả làm cùng lớp.
- **Quan sát/evidence:** metadata token test đã che, request/response và GET trước/sau.

## C-DT-018 — API DELETE token user thường hợp lệ

- **Mục tiêu / requirement:** FR-12 chặn role user thường khỏi DELETE; C-R06.
- **Loại:** API âm.
- **Role/tài khoản, trạng thái chuẩn bị:** Admin setup tạo target test riêng và xác nhận tồn tại; request DELETE dùng JWT hợp lệ của role user. Không dùng category mẫu.
- **Dữ liệu:** `DELETE /api/categories/<ID test>` với Bearer user token còn hạn.
- **EC:** C-EC-07, C-EC-11.
- **Thao tác:** GET trước → DELETE bằng user token → lưu response redacted → GET sau, xác nhận target test vẫn tồn tại.
- **Expected:** Role user không thỏa FR-12, nên thao tác ghi bị từ chối và target không bị xóa. Status/message không được đặc tả.
- **Quan sát/evidence:** role test account được xác nhận an toàn, request/response, GET trước/sau. Chỉ yếu tố role không đủ quyền.

## Giới hạn thiết kế

- Mỗi ca âm POST/DELETE chỉ có một yếu tố không hợp lệ: tên rỗng (C-DT-003) hoặc một điều kiện xác thực/quyền (C-DT-011–018). Body, endpoint và target ID còn lại phải hợp lệ.
- POST/DELETE chỉ dùng tên/ID do ca tạo. Nếu request âm bị xử lý sai và tạo/xóa nhầm dữ liệu, dừng thao tác tiếp theo, giữ lại evidence và không dọn dữ liệu ngoài phạm vi.
- C-DT-004 và C-DT-008 là probe có expected chưa chốt; C-DT-006 là probe quyền GET. Không chấm Pass/Fail trước khi có oracle.
- Không có expected cho ID không tồn tại; không đưa thành ca kết luận trong bộ này. Không có ca edit/PUT vì FR-14 không yêu cầu sửa danh mục.
- Tài liệu chỉ là thiết kế. Chưa chạy test, chưa ghi actual/status hoặc kết quả.
