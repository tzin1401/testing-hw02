# AI-046 — Tạo skill Domain/BVA và hướng dẫn demo A-FR02

- Công cụ: Codex; áp dụng skill-creator tại `/home/zinn/.codex/skills/.system/skill-creator/SKILL.md`.
- Thời điểm ghi log: 2026-10-15T15:14:56Z (22:14:56 +07:00), không phải timestamp gửi prompt.

## Prompt nguyên văn

```text
Dựa trên quy trình đã thực hiện và review thật, tạo skill tại skills/domain-bva/SKILL.md để tái sử dụng Domain Testing và BVA theo slide. Có input, các bước, output, chỗ cần human review và ví dụ. Không hard-code một chức năng. Hướng dẫn tôi cách gọi và demo skill từ đầu đến cuối trên A-FR02, đánh dấu chạy lại là run mới. Ghi audit và commit riêng phần skill.
```

## Nguồn và quyết định

Đọc slide EN (quy trình trang in 13–14, chọn ca 31–33, BVA 34–37), requirements/review/nhật ký A-FR02, các đoạn review B/C/D, mục 14 của LAM_HW02_TUNG_BUOC.md và phần khởi tạo harness A-FR02. Kế thừa phản hồi thật “Tôi đã đọc từng ca và hiểu hết các ca kiểm thử” đúng phạm vi hiểu bộ ca A cũ. Không ghi review mới hoặc phê duyệt thay sinh viên.

Skill chung nhận nguồn và phạm vi từ input, không dùng ngưỡng/tài khoản của A làm mặc định. Ví dụ A-FR02 được tách vào reference. Hướng dẫn demo có prompt thiết kế → review → execution run mới → đối chiếu bug/evidence → quay/lưu video. Chọn phạm vi hướng dẫn theo yêu cầu và mục 14; không thực thi SUT ở lượt tạo skill.

Khi đọc harness thấy metadata commit và đường dẫn DB cố định; đưa kiểm tra commit/DB runtime vào workflow để tránh nhận nhầm state, nhất là sau lượt Mobile dùng bản sao backend. Đây là phát hiện từ code helper, không phải lỗi runtime mới của SUT.

## Kiểm tra và giới hạn

- `python3 /home/zinn/.codex/skills/.system/skill-creator/scripts/quick_validate.py skills/domain-bva`: `Skill is valid!`.
- Kiểm tra tài liệu: có input, bốn bước Domain/BVA theo slide, output, review thật, truy vết, ví dụ, run mới, đo khoảng thời gian, phân biệt UI/API và hướng dẫn demo.
- Kiểm tra staged whitespace và phạm vi file trước commit. Không có test SUT mới, actual mới, Run ID execution mới hoặc video mới. Validation cấu trúc không chứng minh runtime demo đã thành công.
- Các file SUT/evidence cũ/untracked ngoài phạm vi không stage. Commit riêng phần skill và audit; tra commit bằng `git log -- skills/domain-bva/SKILL.md`.

## Output nguyên văn tại lúc tạo

### skills/domain-bva/SKILL.md

````markdown
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
````

### skills/domain-bva/references/demo-a-fr02.md

````markdown
# Cách gọi skill và demo từ đầu đến cuối trên A-FR02

Tài liệu này là **hướng dẫn demo**, chưa phải lần chạy mới và chưa có video.
Bạn gửi các prompt bên dưới cho trợ lý ngay trong repo; trợ lý làm thao tác terminal.
Bạn đọc/review và quay màn hình. Mỗi lần thực thi lại phải có Run ID và evidence mới.

## 1. Gọi skill bằng đường dẫn cụ thể

File nằm tại `skills/domain-bva/SKILL.md`. Cách gọi dùng được mà không cần dựa vào
việc skill đã xuất hiện trong danh sách tự động của phiên:

> Đọc và áp dụng `skills/domain-bva/SKILL.md` cho công việc dưới đây.

Nếu phiên đã liệt kê `domain-bva` trong danh sách skill, có thể dùng `$domain-bva`.
Nếu chưa có trong danh sách, dùng câu chỉ rõ đường dẫn ở trên; không chỉ gửi tên.
Không cần sửa SUT hay cài thư viện để đọc skill.

Để tái sử dụng cho chức năng khác, cung cấp SRS/API contract, phạm vi nền tảng,
phân công, slide, thư mục output và bước muốn làm. Chẳng hạn:

> Đọc và áp dụng `skills/domain-bva/SKILL.md`. Thiết kế Domain/BVA cho chức năng
> quản lý danh mục theo FR-14/FR-12 trong `eshop-sut/README.md`, API specification
> và slide. Xuất vào thư mục demo riêng; chưa chạy. Giữ các câu hỏi thiếu oracle.

## 2. Chuẩn bị demo A-FR02

Mở VS Code tại thư mục gốc bài. Mở skill, SRS FR-02 và thư mục `features/A-FR02/`.
Đọc hướng dẫn một lượt, thực hành thử trước khi quay; lượt thử cũng là run mới nếu
có gửi request/thao tác test. Bắt đầu quay trước khi gửi prompt bước 3.

Nguồn cần dùng trong demo:

- `eshop-sut/README.md`: FR-02 và FR liên quan khi chuẩn bị fixture.
- `eshop-sut/api_specification.md`: mục 1.2, contract login; đăng ký để tạo fixture.
- `slide/domain-testing-en.pdf`: trang in 13–14 (quy trình/input/output), 31–33
  (chọn đại diện, ca âm chỉ một lớp invalid), 34–37 (biên/đại diện).
- `slide/domain-testing-vn.pdf`, `group_feature_assignment.md`: phương pháp và phạm vi.
- `features/A-FR02/01-requirements.md` đến `07-bugs-and-ai-gaps.md`: thiết kế, review,
  kết quả lịch sử và issue. File cũ chỉ là nguồn đối chiếu, không phải lần chạy demo.

Review thật đã có trong `05-review-coverage.md`: “Tôi đã đọc từng ca và hiểu hết
các ca kiểm thử.” Chỉ kế thừa phạm vi hiểu bộ ca cũ; không ghi thành phê duyệt mọi
expected hoặc review của tài liệu mới.

## 3. Prompt thiết kế và kiểm tra lại từ đặc tả

Gửi nguyên khối:

```text
Đọc và áp dụng skills/domain-bva/SKILL.md để demo A-FR02 từ đầu.
Đọc FR-02, API specification, slide Domain/BVA và phân công thành viên 2.
Tạo một thư mục demo mới trong reports/domain-bva-demos/A-FR02/ với ID UTC
và hậu tố duy nhất. Ghi đường dẫn rõ để dùng ở bước tiếp theo.
Tạo 01-requirements.md đến 04-boundary-cases.md trong thư mục đó từ nguồn
đặc tả, rồi đối chiếu bộ A-FR02 hiện có; giữ ID cũ nếu tương đương, ghi rõ
mọi khác biệt về dữ liệu/setup/expected. Không sửa đè bộ bài làm hiện có.
Giải thích input/output/state, một lớp hợp lệ, một lớp không hợp lệ,
biên số lần sai 2/3/4 và thời gian 29/30/31 giây; chỉ rõ gốc thời gian và δ.
Không lấy bug cũ làm expected. Không gán counter=4 cho request thứ tư đang
bị khóa. Ghi câu hỏi còn mở và những ca cần kiểm soát clock server.
Chưa chạy test. Đưa các điểm cần tôi review và ghi audit của bước demo này.
```

Trên video, mở lần lượt các file mới. Giải thích bằng lời của bạn:
“Input là email/password; state là số lần sai và thời gian khóa; expected lấy
FR-02. Cùng một mật khẩu đúng có thể được chấp nhận hoặc bị từ chối tùy state.”
Chỉ nói câu này nếu bạn thật sự hiểu nó.

## 4. Review thật và lập coverage

Đọc ca đã tạo, đặc biệt setup tài khoản riêng, kết quả sau mỗi lần sai, thời điểm
bắt đầu tính khóa. Nếu không hiểu, ghi đúng TC và chỗ vướng. Không copy lời nhận
xét giả để video trông hoàn tất. Bạn có thể nói “Tôi hiểu ca X nhưng chưa hiểu cách
đo 30 giây” nếu đúng với trải nghiệm của mình.

Sau khi gửi nhận xét của chính bạn, gửi prompt:

```text
Áp dụng skills/domain-bva/SKILL.md. Dùng đúng thư mục demo vừa tạo.
Dựa trên phản hồi thực tế tôi vừa gửi, tạo 05-review-coverage.md: truy vết
R → EC/điểm biên → DT/BV, ghi phần đã hiểu/chưa hiểu, sửa đổi và câu hỏi.
Phân biệt review cũ trong features/A-FR02 với review của bản demo mới.
Không suy ra tôi đã duyệt expected hoặc coverage nếu tôi chưa nói điều đó.
Ghi audit và giải thích các thay đổi cần thiết trước khi thực thi.
```

Ví dụ điểm review đáng trình bày: `sleep(30)` chỉ đo ở client, không xác nhận đúng
thời điểm server so sánh; ca đúng 30 giây có thể Blocked dù ca 29/31 giây khả thi.

## 5. Gửi prompt để trợ lý tự chạy, tạo run mới

Gửi sau khi đọc/review bản demo:

```text
Áp dụng skills/domain-bva/SKILL.md. Thực thi toàn bộ ca Domain/BVA trong
thư mục demo A-FR02 vừa tạo và đã được tôi review ở bước trước.
Tự kiểm tra backend/Web, commit runtime, thay đổi local và DB thực sự được
backend đang chạy sử dụng. Không restart backend gây reset, không import
module seed DB, không sửa logic SUT hoặc xóa dữ liệu mẫu.
Đọc scripts/A-FR02-full-execution.mjs và scripts/A-FR02-login-sequence.py
trước khi dùng. Chỉ tái sử dụng khi phù hợp môi trường hiện tại; không tin
baseline hard-code và không đọc DB repo nếu backend đang dùng bản sao.
Tạo Run ID mới UTC + hậu tố, evidence mới tại evidence/A-FR02/skill-demo-runs/.
Nếu script tự tạo thư mục khác, ghi manifest liên kết đúng thư mục thực tế;
không đổi nhãn hoặc sao chép evidence cũ thành kết quả mới.
Dùng tài khoản test riêng mỗi chuỗi. Tự chạy API và UI có thể điều khiển;
API không thay UI. Lưu request/response đã che password/token, ảnh checkpoint,
UTC/monotonic, trạng thái DB chỉ đọc nếu đúng DB runtime.
Ca 29/31 giây cần khoảng đo chứng minh phía biên; đúng 30 giây Blocked nếu
không kiểm soát được clock server. Nếu setup khóa sai, ghi riêng prerequisite
fail và diagnostic observation; không gọi là setup chuẩn.
Tạo 06-execution.md và 07-bugs-and-ai-gaps.md trong thư mục demo, liệt kê
mọi TC/checkpoint Pass/Fail/Blocked/Not run và lý do, observation khi thiếu oracle.
Không bắt tôi chạy terminal. Nếu UI không điều khiển được, hoàn tất phần khả thi
và đưa thao tác còn thiếu cụ thể. Ghi audit, không tạo issue trùng hoặc đăng issue.
```

Trợ lý phải trả về Run ID mới, đường dẫn manifest/log/ảnh và bảng đủ các TC.
Không nói “demo chạy đủ/thành công” chỉ vì script exit 0. Kiểm tra các ca Blocked
và checkpoint chưa đủ. Nếu muốn quay lại sau một lượt thử, gửi lại prompt bước 5;
đó là một run khác, không dùng log của lượt thử để giả lượt đang quay.

**Lưu ý đã thấy khi đọc harness hiện tại:** metadata baseline/runtime được ghi
cố định trong mã; truy vấn state đọc `eshop-sut/backend/database.sqlite` cố định.
Ở lượt Mobile trước đã có backend chạy từ DB bản sao. Vì thế phải kiểm tra lại
hai điểm này trước demo. Đây là hạn chế tái sử dụng script, không phải kết quả
kiểm thử mới và không khẳng định dịch vụ hiện tại vẫn chạy từ bản sao.

## 6. Mở evidence và đối chiếu bug

Gửi prompt:

```text
Áp dụng skills/domain-bva/SKILL.md. Đối chiếu bằng chứng run demo A-FR02 mới
với expected và coverage. Chỉ ra một chuỗi R → EC/biên → TC → Run → evidence
để tôi trình bày. Mở/đưa đường dẫn ảnh UI và request/response đã che bí mật.
Gộp phát hiện cùng lỗi có căn cứ, tách lỗi độc lập, nêu severity và giới hạn.
Đối chiếu issue A-FR02 đã có trong 07-bugs-and-ai-gaps.md lịch sử; link issue
đúng và ghi run mới là tái hiện nếu đủ chứng cứ. Không tự tạo/comment issue.
Ghi AI gap chỉ khi có output sai và evidence đối chiếu. Ghi audit.
```

Trên video, mở một TC, ảnh/log **của run mới**, expected, actual và báo cáo.
Mở issue tương ứng nếu đã có; giải thích đó là issue cũ và run mới là lần kiểm tra
lại, chỉ khi evidence mới chứng minh cùng lỗi. Nếu khác, báo đúng kết quả mới.

## 7. Kết thúc video và lưu kết quả

- Dừng quay, xem lại chữ và đoạn thao tác; che password/token trong ảnh/log/video.
- Nếu ca Blocked, trình bày giới hạn và việc còn thiếu; không cắt dựng để ngụ ý đã Pass.
- Khi bạn đã có video thật và link thật, ghi vào `videos/README.md` kèm Run ID,
  thư mục demo, baseline, các TC trình bày và giới hạn. Không ghi link dự kiến.
- Gửi trợ lý: “Kiểm tra artifact demo vừa tạo, ghi audit và commit riêng demo;
  chỉ stage file demo/evidence/audit liên quan, không gom SUT hoặc file khác.”

Lượt tạo skill này chỉ kiểm tra cấu trúc skill và đối chiếu hướng dẫn với tài liệu.
Không phải chạy thử runtime, không có Run ID execution mới, không có human review
mới cho skill, và không phải bằng chứng video đã hoàn thành.
````
