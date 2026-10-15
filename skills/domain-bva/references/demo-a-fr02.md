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
