---
name: domain-bva
description: Phân tích yêu cầu, thiết kế và đối chiếu kiểm thử Domain Testing/BVA từ đặc tả và slide; tạo truy vết, ghi review thật và kết quả có evidence cho Web, API hoặc Mobile.
---

# Domain Testing và Boundary Value Analysis

## Input và phạm vi

Nhận chức năng/phạm vi, nguồn SRS/API contract, slide phương pháp, nền tảng,
baseline SUT, nơi lưu tài liệu/evidence, thiết kế và review đã có, cùng bước người
dùng muốn làm: thiết kế, review, thực thi, báo bug hoặc hướng dẫn demo.

Đọc nguồn thực tế trước khi thiết kế. Nếu thiếu oracle, ghi câu hỏi Q-ID cùng phần
bị ảnh hưởng; tiếp tục phần có căn cứ. Không dùng code SUT hay kết quả chạy làm
expected. Code chỉ hỗ trợ tìm control, endpoint, fixture và cách quan sát.
Không mặc định một chức năng, đường dẫn, tài khoản, ngưỡng hoặc công nghệ cụ thể.

Nếu chỉ được yêu cầu thiết kế/hướng dẫn, không chạy SUT. Nếu đã được yêu cầu thực
thi, tự chạy phần khả thi; không bắt người dùng chạy terminal. Không biến bước
human review thành việc xin phép lặp lại khi người dùng đã cho phép thực thi.

## Quy trình

### 1. Trích yêu cầu và oracle

- Tách từng yêu cầu thành R-ID; ghi nguồn tới mục/trang/phiên bản.
- Liệt kê input, trạng thái trước/sau, output và điểm quan sát UI/API/DB.
- Phân biệt điều ghi trực tiếp, cách diễn giải, giả định và câu hỏi chưa rõ.
- Ghi dependency và phần ngoài phạm vi. Slide hướng dẫn phương pháp; SRS/API
  contract cung cấp quy tắc nghiệp vụ. Nếu hai nguồn mâu thuẫn, giữ câu hỏi mở.

### 2. Chia lớp tương đương

- Với từng input/output/trạng thái, tạo EC-ID, điều kiện chính xác, đại diện cụ
  thể, hợp lệ/không hợp lệ, expected, R-ID và lý do các đại diện phân biệt hành vi.
- Các lớp trên cùng một chiều cần không chồng lấn và phủ miền đang xét; nếu chưa
  phủ hết, nêu phần thiếu. Chia nhỏ lớp nếu có căn cứ hành vi khác nhau.
- Tách lỗi format, thiếu dữ liệu, không tồn tại, quyền và trạng thái. Lớp chưa đủ
  oracle là probe/observation, không gán expected hoặc Pass/Fail tùy ý.
- Phân biệt giá trị nhập trực tiếp với thao tác nút và payload API. Không tạo ca
  nhập chuỗi vào control chỉ cho click; kiểm tra API là ca riêng.

### 3. Chọn ca Domain

Chọn ít nhất một đại diện mỗi lớp có thể kiểm tra. Ca hợp lệ có thể phủ nhiều lớp;
ca âm cơ bản chỉ vi phạm một điều kiện, giữ các điều kiện khác hợp lệ. Những chuỗi
nhiều lỗi có chủ đích phải ghi là interaction/robustness, không giả là ca âm đơn.

Mỗi DT-ID ghi mục tiêu, loại UI/API/Mobile, setup và fixture riêng, state ban đầu,
dữ liệu cụ thể, từng thao tác click/tap/nhập/request, expected từng checkpoint,
R-ID/EC-ID, cách quan sát và evidence cần lưu. Nêu reset trước/sau ca và dependency.
Không điền actual/status thực thi ở bước thiết kế. Nếu control bắt buộc không có,
thiết kế ca presence riêng và ca tương tác phụ thuộc; chỉ kết luận khi quan sát UI.

### 4. Chọn BVA

- Chỉ dùng BVA cho miền có thứ tự và biên có căn cứ. Ghi LB/UB, thuộc/không thuộc
  miền, đơn vị, δ và độ phân giải của control/phép đo.
- Chọn tại biên, ngay dưới và ngay trên: LB−δ/LB/LB+δ; UB−δ/UB/UB+δ nếu có UB.
  Xét điểm trong miền và cực trị UI khi có ý nghĩa và căn cứ; không ép đủ chín ca.
- Với số nguyên δ thường là 1; với thời gian/số thực phải giải thích δ. Không có
  UB trong đặc tả thì ghi “không có UB được nêu”, không bịa max hay tồn kho.
- Chuỗi thiếu một nhóm ký tự là EC/robustness, không phải biên độ dài. Trạng thái
  trước/sau thao tác là state transition; không nhầm số lần thao tác với counter.
- Mỗi BV-ID có đầy đủ setup/thao tác/expected/evidence như DT-ID, thêm điểm biên,
  δ và liên kết ca Domain. Thừa kế fixture phải rõ và tránh state rò giữa ca.

### 5. Human review và coverage

Đưa bản thiết kế cụ thể cho người dùng đọc: dữ liệu, thao tác, expected, nguồn,
biên và các câu hỏi. Yêu cầu nhận xét đúng phần cần làm rõ, không viết hộ phản hồi.
Ghi nguyên văn hoặc tóm tắt trung thực phản hồi, ngày/nguồn nếu biết, phiên bản
hoặc tập ID được xem, phần đã hiểu/chưa hiểu, sửa đổi và lý do.

“Đã đọc/hiểu” không đồng nghĩa phê duyệt expected, coverage hoặc kết quả chạy.
Không gán review của bộ cũ cho ca mới/thay đổi. Lập ma trận R → EC/biên → DT/BV;
phân biệt coverage thiết kế với coverage đã chạy. Câu hỏi oracle còn mở vẫn giữ
mở dù người dùng đã hiểu cách thao tác. Nếu chưa có review, ghi chưa nhận được;
không tự dựng lời phê duyệt. Khi được phép thực thi, chạy checkpoint có expected
rõ; checkpoint cần câu trả lời thì chỉ quan sát hoặc Blocked kèm lý do.

### 6. Thực thi khi được yêu cầu

- Kiểm tra baseline thực tế, thay đổi local, dịch vụ, UI/device, API và DB phục vụ
  chính tiến trình đang chạy. Không tin commit hard-code hoặc đọc nhầm DB bản khác.
- Đọc script trước khi dùng: phạm vi, side effect, reset, clock, redaction, mapping
  TC. Tạo tài khoản/dữ liệu test riêng từng chuỗi; không sửa logic SUT, restart dịch
  vụ có thể reset state, hoặc xóa dữ liệu mẫu/người khác. Nếu thiếu môi trường,
  ghi Blocked và xử lý phần độc lập được; bản sao cô lập phải ghi đúng phạm vi.
- Tạo Run ID mới duy nhất từ UTC + hậu tố; thư mục evidence mới. Không ghi đè log,
  ảnh hoặc thay nhãn run cũ thành run mới. Khởi tạo manifest trước thao tác đầu tiên.
- UI cần thao tác trên UI thật/emulator và evidence tương ứng. API không thay UI.
  Nếu không điều khiển được UI, hoàn thành phần khả thi rồi đưa từng thao tác còn
  thiếu cho người dùng, không đánh dấu checkpoint UI là Pass từ response API.
- Ghi request/response che password/token, UTC, monotonic, state chỉ đọc nếu cần,
  ảnh đúng checkpoint và liên kết TC → Run ID → evidence. Một lần chạy chỉ phủ
  nhiều TC khi setup và mọi checkpoint của từng TC thực sự tương ứng.
- Với thời gian khóa, chỉ rõ gốc thời gian theo oracle. Nếu kích hoạt nằm trong
  [s0,r0], probe nằm trong [s1,r1], trên cùng clock monotonic dùng khoảng elapsed
  bảo thủ [s1−r0,r1−s0], ghi giả định về xử lý server trong request/response.
  Chỉ kết luận phía biên khi toàn khoảng nằm trước/sau ngưỡng; khoảng cắt biên
  chưa đủ kết luận. Đúng mốc cần kiểm soát clock tại server comparison; sleep đúng
  số giây ở client không đủ. Không sửa SUT chỉ để tạo kết quả đúng mốc.
- Khi setup chuẩn thất bại, ghi lỗi prerequisite, Blocked cho checkpoint phụ
  thuộc và observation riêng cho thử nghiệm chẩn đoán; không gọi đó là luồng chuẩn.

### 7. Kết quả, bug và audit

- Mỗi checkpoint ghi expected, actual, evidence và verdict. Pass chỉ khi đủ chứng
  cứ; Fail khi sai expected rõ; Blocked khi prerequisite/công cụ/oracle ngăn đánh
  giá; Not run khi chưa thực hiện. Probe chưa rõ oracle chỉ ghi observation.
- TC có checkpoint chưa hoàn tất không được ghi Pass toàn ca. Đếm tổng TC và
  checkpoint riêng; liệt kê mọi ID bị thiếu, không bỏ qua vì “đã chạy tương tự”.
- Gộp cùng biểu hiện/nguyên nhân có căn cứ, tách lỗi độc lập; nếu chưa xác minh
  nguyên nhân gốc, ghi giả thuyết, không trình bày như đã chứng minh.
- Issue draft có title, môi trường, fixture, bước tái hiện, expected + nguồn,
  actual, severity có lý do, R/TC/Run ID, labels và ảnh/log liên kết sử dụng được.
  Không lấy ảnh của ca khác làm chứng cứ. Chỉ đăng khi được yêu cầu; không tạo
  issue trùng khi demo lại. Kiểm tra link remote thực sự truy cập được.
- AI gap cần chỉ rõ output AI nào sai/thiếu và bằng chứng đối chiếu; blocker môi
  trường không tự trở thành lỗi nội dung AI. Không có bằng chứng thì ghi chưa xác nhận.
- Ghi audit prompt/output, nguồn, thời điểm, review thật, thay đổi và giới hạn.
  Nếu yêu cầu commit, chỉ stage artifact thuộc bước này và kiểm tra staged diff.

## Output tối thiểu

Dùng cấu trúc repo hiện có; nếu chưa có, gợi ý:

| File | Nội dung |
|---|---|
| 01-requirements.md | R-ID, nguồn, input/state/output, Q-ID |
| 02-domains.md | EC-ID, điều kiện, đại diện, expected/R-ID |
| 03-domain-cases.md | DT-ID, setup, thao tác, expected, EC/R, evidence dự kiến |
| 04-boundary-cases.md | BV-ID, biên/δ, setup, thao tác, expected, EC/R |
| 05-review-coverage.md | Review thật, phần còn mở, truy vết, thay đổi |
| 06-execution.md | Chỉ khi chạy: từng Run/TC/checkpoint và evidence |
| 07-bugs-and-ai-gaps.md | Chỉ khi có quan sát: bug/probe/gap, issue draft |

Giữ output thiết kế riêng với run thực thi; ghi trạng thái lịch sử theo thời điểm,
không để “chưa chạy” trong bản review cũ bị hiểu là trạng thái hiện tại.

## Ví dụ ngắn (giả định để minh họa, không phải oracle của SUT)

Nếu đặc tả nói quantity là số nguyên từ 1 đến 5: EC hợp lệ [1,5], invalid dưới 1,
trên 5, không nguyên; đại diện 3, 0, 6, 1.5. BVA với δ=1: 0/1/2 và 4/5/6.
Nếu giá là 10 và quantity=3, expected thành tiền 30 chỉ khi đặc tả nêu công thức
nhân. Nếu chỉ có nút +/- thì 1.5 không phải dữ liệu nhập được; cần ca khác tại
đúng điểm nhận số hoặc ghi không áp dụng, không giả thao tác UI.

Khi cần hướng dẫn gọi và quay demo trên một chức năng đã làm, đọc
[references/demo-a-fr02.md](references/demo-a-fr02.md). Đây là ví dụ riêng;
không áp các ID/ngưỡng/đường dẫn của ví dụ cho chức năng khác.
