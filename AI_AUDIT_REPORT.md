# AI Audit Report — HW02 — 23120190

**Sinh viên:** Nguyễn Lê Thế Vinh — Thành viên 2.

**Declaration:** “I use AI tools for the following tasks,” — đọc và đối chiếu yêu cầu bài tập, bài giảng, phân công nhóm và tài liệu/mã nguồn SUT; xây dựng hướng dẫn thực hiện và ghi audit. Các công việc khác được bổ sung khi thực sự thực hiện.

Đây là log đang phát triển, chưa phải phụ lục hoàn chỉnh để nộp. Chưa có test execution hay bug runtime được xác nhận trong lượt tạo hướng dẫn. Phản hồi review của sinh viên được cập nhật bên dưới. Các lượt trước về upload PDF/tóm tắt yêu cầu chưa được nhập lại vào log; cần bổ sung từ lịch sử thật cùng ngày giờ nếu lấy được. Không tự điền timestamp ước đoán. Bản nộp cuối cần Markdown + PDF, bao gồm nội dung đầy đủ của các output đính kèm.

## Interaction AI-001 — Tạo hướng dẫn cá nhân

- **AI tool:** Codex trong phiên chat hiện tại. Không ghi model ID vì không có metadata phiên xác thực để điền.
- **Ngày giờ ghi nhận:** 2026-10-13 15:21:37 +07:00 (Asia/Ho_Chi_Minh). Đây là thời điểm ghi log trong lượt xử lý, không phải timestamp chính xác lúc người dùng gửi prompt.
- **Đầu vào đã đọc:** đề HW02; hai PDF trong `slide/`; `group_feature_assignment.md`; `eshop-sut/README.md`, `api_specification.md`, `setup_guide.md`; các đoạn code liên quan login, cart, categories, mobile register và seed database.
- **SUT baseline:** `85af3ba875c88283615e22cb108f13e2fccaf0e9`.

### Prompt nguyên văn

```text
Tôi sẽ cung cấp những thứ bạn cần:

- /home/zinn/zinn/test/hw02/slide: Đây là bài giảng về domain testing và BVA
- /home/zinn/zinn/test/hw02/group_feature_assignment.md: đây là phân công chức năng của nhóm mình, mình là thành viên 2 nhé!
- /home/zinn/zinn/test/hw02/eshop-sut: đây là repo chính thức của eshop, cần gì thì vào đây mà đọc
- Các template chính thức của lớp, nếu có: đối với thông tin này thì hiện tại không cần template gì hết và AI Audit Report thì mỗi lần prompt bạn sẽ điền vào miễn là đủ các trường có liệt kê trong requirement.
- Link repo GitHub của nhóm để tạo Issues: chính là repo này luôn `tzin1401/testing-hw02`
- MSSV, họ tên và thông tin lớp/nhóm cần ghi: Nguyễn Lê Thế Vinh - 23120190
- 2 trường cuối không cần

Nếu đã nắm rõ thì hãy tạo 1 file hướng tôi hoàn thành bài tập này để đạt điểm tối đa.
```

### AI output

**Toàn văn tài liệu tạo ra:** [AI-001-guide-output.md](audit/AI-001-guide-output.md). Đây là bản sao của [hướng dẫn làm việc](HUONG_DAN_HW02_23120190.md) tại lượt AI-001. Giữ nguyên bản sao này; khi thay đổi hướng dẫn thì ghi interaction mới. Khi xuất audit PDF, chèn toàn văn bản sao vào phụ lục, không chỉ in liên kết.

**Các thông báo tiến độ nguyên văn:**

> Tôi sẽ đọc slide, phân công của thành viên 2 và tài liệu EShop để tạo hướng dẫn làm bài theo thang điểm. Tôi cũng sẽ tạo AI Audit Report với các trường đề yêu cầu và ghi lại lượt trao đổi này.

> Tôi đã xác định 4 chức năng của bạn: đăng nhập/khóa tài khoản, giỏ hàng Web, quản lý danh mục và đăng ký Mobile. Có hai điểm cần lưu ý trong hướng dẫn: FR-14 chỉ bắt buộc Thêm/Xem/Xóa dù mang tên CRUD; đăng ký Mobile dùng yêu cầu FR-01 trong phạm vi FR-20. Tôi cũng thấy một số khác biệt giữa mã nguồn và đặc tả, nên sẽ ghi rõ cách kiểm chứng trước khi kết luận là bug.

> Hướng dẫn đã có quy trình theo slide, các lớp dữ liệu và giá trị biên cần xét cho từng chức năng, cùng checklist nộp bài. Tôi đang kiểm tra các đường dẫn và lưu bản hướng dẫn vào AI Audit để giữ nguyên đầu ra của lượt này khi tài liệu được chỉnh sửa về sau.

**Phản hồi cuối của lượt này:**

```markdown
Đã tạo [hướng dẫn HW02 dành cho bạn](/home/zinn/zinn/test/hw02/HUONG_DAN_HW02_23120190.md), gồm:

- Phạm vi 4 chức năng của thành viên 2.
- Quy trình Domain Testing/BVA theo slide và các ca cần chú ý.
- Kế hoạch Agent Skills, video demo, commit và checklist nộp đủ các hạng mục 100 điểm.

Đã ghi lượt này vào [AI Audit Report](/home/zinn/zinn/test/hw02/AI_AUDIT_REPORT.md), kèm bản lưu nguyên văn hướng dẫn. Các kết quả kiểm thử và bug sẽ được ghi sau khi thực sự kiểm chứng.
```

### Review và hạn chế

- Sinh viên review: **Hướng dẫn còn khó hiểu, chưa đủ cụ thể để tự làm theo. Cần viết lại theo kiểu cầm tay chỉ việc: hướng dẫn từng thao tác, lệnh cần chạy, kết quả cần quan sát và nơi lưu bằng chứng.** Đây là phản hồi về mức độ dễ hiểu của hướng dẫn, không phải xác nhận tính đúng đắn của thiết kế kiểm thử hoặc kết quả thực thi.
- Chỉ đọc tài liệu/code và tạo hướng dẫn; chưa cài/chạy SUT hoặc thực thi test.
- Khác biệt code/SRS trong hướng dẫn là điểm cần kiểm chứng, chưa phải bug runtime đã xác nhận.
- Artifact của lượt: hướng dẫn làm việc, bản sao output và chính audit này. Chưa tạo báo cáo kết quả, PDF nộp, skill hoặc video.

## Quy tắc nối log cho lượt tiếp theo

Tạo interaction tiếp theo với tên công cụ, ngày giờ thực tế kèm múi giờ, prompt và output nguyên văn. Lưu output dài theo file riêng; ghi phần review/sửa đổi nếu thực sự diễn ra. Giữ lịch sử trước/sau và liên kết TC/bug/commit khi có. Nếu thiếu dữ liệu lịch sử, ghi rõ thiếu; không tạo lại output như thể đó là bản nguyên gốc.

## Interaction AI-002 — Chuẩn bị bộ file bài làm

- **Tên công cụ AI:** Codex trong phiên chat hiện tại; không suy đoán model ID.
- **Ngày giờ ghi log:** 2026-10-14T23:14:02+07:00 (Asia/Ho_Chi_Minh); thời điểm ghi nhận trong lượt xử lý, không phải thời điểm gửi prompt chính xác.
- **Phạm vi:** tạo README, environment và work-progress; ghi baseline và nguồn; kiểm tra tài liệu và commit riêng bước chuẩn bị.
- **Baseline SUT:** `85af3ba875c88283615e22cb108f13e2fccaf0e9`; working tree SUT sạch khi kiểm tra.

### Prompt nguyên văn

```text
Chuẩn bị bộ file làm bài theo LAM_HW02_TUNG_BUOC.md cho Nguyễn Lê Thế Vinh — 23120190. Tạo README.md có bảng tự chấm 25/25/25/15/10 nhưng để điểm trống; tạo reports/environment.md và reports/work-progress.md. Ghi baseline SUT, bốn chức năng của thành viên 2 và nguồn yêu cầu. Không điền kết quả chạy hay human review. Ghi AI Audit cho lượt này. Sau khi tạo xong, commit riêng bước chuẩn bị, không gom eshop-sut hoặc thay đổi không liên quan.
```

### AI output nguyên văn

Xem [AI-002-preparation-output.md](audit/AI-002-preparation-output.md): lưu đầy đủ ba file đầu ra cùng thông báo tiến độ và phản hồi cuối. Giữ bản snapshot này khi tiếp tục sửa tài liệu làm việc; khi xuất audit PDF, đưa nội dung snapshot vào phụ lục. Bản audit hiện chưa chứa đầy đủ các lượt lịch sử được nêu ở đầu file.

### Giới hạn của lượt

Chỉ đọc trạng thái Git, nguồn cục bộ và phiên bản công cụ; tạo tài liệu. Không chạy backend, reset DB, thực thi test hoặc xác nhận review của sinh viên. Bảng điểm và số liệu test chưa được điền. Commit của bước này chỉ bao gồm ba file yêu cầu, audit hiện tại và snapshot AI-002; các mục staged/untracked khác không thuộc bước này.
