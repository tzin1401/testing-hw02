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

## Interaction AI-003 — Ghi nhận cài dependency backend

- **Tên công cụ:** Codex trong phiên chat hiện tại.
- **Ngày giờ ghi log:** 2026-10-14T23:15:50+07:00; thời điểm ghi log, không phải thời điểm thực thi lệnh của sinh viên.

### Prompt nguyên văn

```text
zinn@zinn-Nitro-AN515-57:~/zinn/test/hw02$ cd /home/zinn/zinn/test/hw02/eshop-sut/backend
mkdir -p /home/zinn/zinn/test/hw02-local-backups
cp -n database.sqlite /home/zinn/zinn/test/hw02-local-backups/database-before-hw02.sqlite
npm ci
cp: warning: behavior of -n is non-portable and may change in future; use --update=none instead
npm WARN deprecated prebuild-install@7.1.3: No longer maintained. Please contact the author of the relevant nativeaddon; alternatives are available.

added 135 packages, and audited 136 packages in 2s

36 packages are looking for funding
  run `npm fund` for details

5 vulnerabilities (1 low, 1 moderate, 1 high, 2 critical)

To address all issues, run:
  npm audit fix

Run `npm audit` for details.
```

### AI output nguyên văn

Thông báo tiến độ:

> `npm ci` đã hoàn tất; các cảnh báo trên không làm bước cài đặt thất bại. Tôi sẽ ghi nhận kết quả bạn cung cấp vào tài liệu môi trường và AI Audit.

Phần thêm vào environment.md:


## Cập nhật cài dependency backend — 14/10/2026

Nguồn: output terminal do sinh viên gửi trong AI-003; chưa phải kết quả chạy test.

- Đã chạy `npm ci` trong `eshop-sut/backend`: thêm 135 package, audit 136 package, hoàn tất trong 2 giây theo output.
- Cảnh báo `prebuild-install@7.1.3` deprecated.
- npm báo 5 vulnerabilities: 1 low, 1 moderate, 1 high, 2 critical; chưa đọc báo cáo chi tiết, chưa đánh giá ảnh hưởng runtime và chưa chạy `npm audit fix`.
- Lệnh backup `cp -n` phát cảnh báo về tính portable; chưa xác minh file backup được tạo mới hay đã tồn tại.
- Backend chưa được xác nhận khởi động; Web/Admin/Mobile chưa được xác nhận. Bước tiếp theo là `node server.js` và mở `/api/products`.

Phản hồi cuối:

**Cài dependency backend đã thành công**: npm đã thêm 135 package.

- Cảnh báo `cp -n` không phải lỗi sao chép; chưa đủ để xác nhận bản backup đã được tạo mới.
- `deprecated` và 5 vulnerabilities là cảnh báo dependency. **Chưa chạy `npm audit fix`**, vì có thể thay đổi phiên bản dependency của SUT đang dùng làm baseline.

Tiếp theo, ngay trong terminal backend, chạy:

```bash
node server.js
```

Giữ terminal mở. Khi server khởi động, vào **http://localhost:3000/api/products**. Gửi tôi output terminal và cho biết trang có hiển thị danh sách sản phẩm không.

Tôi đã ghi kết quả cài đặt bạn cung cấp vào tài liệu môi trường và AI Audit.

Không chạy SUT hoặc sửa dependency trong lượt này; không ghi human review hay test result.

## Interaction AI-004 — Xác nhận phản hồi backend và hướng dẫn mở Web

- **Tên công cụ:** Codex trong phiên chat hiện tại.
- **Ngày giờ ghi log:** 2026-10-14T23:23:06+07:00; không phải timestamp request backend.

### Prompt nguyên văn

```json
[{"id":1,"name":"iPhone 15 Pro Max","price":30000000,"description":"Điện thoại cao cấp của Apple","imageUrl":"https://placehold.co/300x300/png?text=iPhone+15","category_id":1},{"id":2,"name":"Samsung Galaxy S24 Ultra","price":28000000,"description":"Màn hình hiển thị xuất sắc, camera siêu zoom","imageUrl":"https://placehold.co/300x300/png?text=Samsung+S24","category_id":1},{"id":3,"name":"MacBook Pro M3","price":45000000,"description":"Laptop chuyên nghiệp mạnh mẽ","imageUrl":"https://placehold.co/300x300/png?text=Macbook+Pro","category_id":2},{"id":4,"name":"Tai nghe AirPods Pro 2","price":6000000,"description":"Chống ồn chủ động xuất sắc","imageUrl":"https://placehold.co/300x300/png?text=AirPods+Pro","category_id":3},{"id":5,"name":"Bàn phím cơ Keychron Q1","price":4000000,"description":"Gõ cực sướng, thiết kế kim loại","imageUrl":"https://placehold.co/300x300/png?text=Keychron+Q1","category_id":3}]
```

### AI output nguyên văn

Thông báo tiến độ:

> API đã trả về danh sách 5 sản phẩm. Tôi sẽ ghi nhận backend đã phản hồi theo dữ liệu bạn gửi; tiếp theo là mở giao diện Web.

Phần bổ sung environment.md:

## Cập nhật kết nối backend — AI-004

- Sinh viên gửi JSON gồm 5 sản phẩm (ID 1–5) sau hướng dẫn mở `http://localhost:3000/api/products`.
- Ghi nhận backend đã phản hồi danh sách sản phẩm theo bằng chứng do sinh viên cung cấp; chưa có timestamp của request hoặc log terminal server.
- Đây là kiểm tra kết nối môi trường, không phải kết quả Pass cho test case chức năng hoặc xác nhận toàn bộ backend đúng.
- Web/Admin/Mobile chưa được xác nhận. Bước tiếp theo: mở frontend Web tại cổng 5173, giữ backend chạy.

Dòng trạng thái môi trường được cập nhật thành: Backend trả danh sách 5 sản phẩm theo dữ liệu sinh viên gửi (AI-004); Web/Admin/Mobile chưa xác nhận.

Phản hồi cuối:

**Backend đã phản hồi được danh sách 5 sản phẩm.** Bước kiểm tra kết nối backend đã xong.

Giữ terminal backend đang chạy. Mở **terminal mới** rồi chạy:

```bash
cd /home/zinn/zinn/test/hw02/eshop-sut/frontend-web
npm ci
npm run dev -- --port 5173 --strictPort
```

Sau đó mở **http://localhost:5173**.

Gửi tôi kết quả: trang bán hàng có hiển thị sản phẩm không? Nếu có lỗi, gửi nguyên thông báo lỗi.

Không chạy thêm SUT hoặc ghi nhận human review/test case Pass trong lượt này.

## Interaction AI-005 — Xác nhận Web và hướng dẫn mở Admin

- **Tên công cụ:** Codex trong phiên chat hiện tại.
- **Ngày giờ ghi log:** 2026-10-14T23:26:48+07:00; không phải timestamp thực thi của sinh viên.

### Prompt / đầu vào

Người dùng gửi một ảnh, không kèm văn bản. Ảnh cho thấy VS Code mở trang `http://localhost:5173/`, tiêu đề EShop và danh sách sản phẩm. Đây là mô tả attachment, không phải bản sao ảnh nguyên gốc. Attachment còn ở hội thoại, chưa có file ảnh trong repo; cần bổ sung khi xuất audit đầy đủ.

### AI output

Thông báo tiến độ:

> Ảnh cho thấy Web tại `localhost:5173` đã hiển thị danh sách sản phẩm. Tôi sẽ cập nhật trạng thái môi trường; bước tiếp theo là mở trang Admin.

Nội dung thêm vào environment.md:

## Cập nhật giao diện Web — AI-005

- Bằng chứng: ảnh người dùng đính kèm trong hội thoại, hiển thị `http://localhost:5173/` trong trình duyệt tích hợp VS Code.
- Quan sát: trang EShop có danh sách 5 sản phẩm, ảnh placeholder, tên, giá và các nút thao tác. Ghi nhận Web đã hiển thị danh sách sản phẩm; không suy ra các nút/chức năng đã được kiểm thử.
- Chưa biết phiên bản trình duyệt. Ảnh gốc chưa được lưu vào repo; tham chiếu attachment trong hội thoại, cần lưu bản ảnh khi hoàn thiện bằng chứng môi trường.
- Backend đã phản hồi ở AI-004; Web hiển thị ở AI-005. Admin và Mobile chưa xác nhận. Tiếp theo: mở Admin và đăng nhập, chưa thay đổi dữ liệu.

Dòng trạng thái hiện tại được cập nhật tương ứng: backend có phản hồi, Web hiển thị, Admin/Mobile chưa xác nhận.

Phản hồi cuối nguyên văn:

**Web đã mở thành công và hiển thị sản phẩm.** Giữ cả terminal Backend và Web đang chạy.

Mở **terminal mới** để chạy Admin:

```bash
cd /home/zinn/zinn/test/hw02/eshop-sut/frontend-admin
npm ci
npm run dev
```

Sau đó:

1. Mở **http://localhost:5174**.
2. Đăng nhập bằng email `admin@eshop.com`, mật khẩu `Admin123!`.
3. Bấm **Danh mục** và gửi ảnh màn hình kết quả. Chưa thêm hoặc xóa dữ liệu ở bước này.

Không ghi kết quả test case hoặc human review từ ảnh kiểm tra môi trường.

## Interaction AI-006 — Xác nhận giao diện Admin

- **Tên công cụ:** Codex trong phiên chat hiện tại.
- **Ngày giờ ghi log:** 2026-10-14T23:28:24+07:00; không phải thời điểm thực thi chính xác.

### Prompt / đầu vào

Người dùng gửi ảnh, không kèm văn bản. Attachment cho thấy trang Admin tại localhost:5174, mục Quản lý Danh mục với ba dòng Điện thoại, Laptop, Phụ kiện. Đây là mô tả ảnh; ảnh nguyên gốc nằm trong hội thoại, chưa lưu vào repo. Cần bổ sung ảnh cho bản audit nộp đầy đủ.

### AI output

Thông báo tiến độ:

> Trang Admin đã mở được mục Danh mục với ba dòng dữ liệu mẫu. Tôi sẽ ghi nhận bước kiểm tra môi trường Backend, Web và Admin đã hoàn thành; tiếp theo là phân tích yêu cầu đăng nhập A-FR02.

Nội dung thêm vào environment.md:

## Cập nhật giao diện Admin — AI-006

- Ảnh sinh viên gửi hiển thị `http://localhost:5174/`, trang EShop Admin, mục Quản lý Danh mục và ba dòng: #1 Điện thoại, #2 Laptop, #3 Phụ kiện. Terminal trong ảnh hiển thị URL Vite cổng 5174.
- Ghi nhận đã truy cập được giao diện Admin và dữ liệu danh mục theo ảnh. Không suy ra đã kiểm thử chức năng Thêm/Xóa hoặc phân quyền.
- Hoàn tất kiểm tra mở môi trường Backend/Web/Admin theo bằng chứng AI-004 đến AI-006. Mobile chưa chuẩn bị/xác nhận; phiên bản trình duyệt chưa cung cấp.
- Ảnh gốc vẫn ở attachment hội thoại, chưa có bản lưu trong repo. Cần bổ sung ảnh khi hoàn thiện evidence/audit nộp bài.
- Bước tiếp theo: 5.1 — phân tích yêu cầu A-FR02, chưa thực thi test chức năng.

README được cập nhật trạng thái môi trường; work-progress ghi ba bước mở Backend/Web/Admin đã được xác nhận qua dữ liệu/ảnh, còn lưu ảnh gốc, phiên bản trình duyệt và Mobile; chuyển việc tiếp theo sang bước 5.1. Không ghi test Pass hoặc human review.

Phản hồi cuối nguyên văn:

**Admin đã mở thành công**, hiển thị ba danh mục: Điện thoại, Laptop và Phụ kiện. Bạn đã xong bước 3–4 về khởi chạy môi trường.

Tiếp theo là **bước 5.1: phân tích yêu cầu đăng nhập**, chưa chạy test. Gửi tôi prompt sau:

> Với A-FR02, đọc FR-02 trong SRS và slide. Tạo features/A-FR02/01-requirements.md bằng tiếng Việt đơn giản: từng yêu cầu, đầu vào, trạng thái cần theo dõi, đầu ra và nguồn expected result. Đánh dấu điểm chưa rõ. Ghi audit và commit riêng bước này. Chưa tạo kết quả kiểm thử.

Giữ các terminal đang chạy và chưa thêm/xóa dữ liệu trong Admin.

Bổ sung environment từ kiểm tra Git chỉ đọc: SUT vẫn ở baseline; `backend/database.sqlite` đã thay đổi và `backend/node_modules/` untracked sau cài/chạy. Không đưa các mục này vào commit tài liệu.

## Interaction AI-007 — Phân tích yêu cầu A-FR02

- **Tên công cụ:** Codex trong phiên chat hiện tại.
- **Ngày giờ ghi log:** 2026-10-14T23:31:47+07:00 (Asia/Ho_Chi_Minh); thời điểm ghi log, không phải thời điểm gửi prompt chính xác.
- **Nguồn đọc:** SRS FR-02; API specification mục 1.2; slide VN trang 6–10, slide EN trang 13–16; phân công và hướng dẫn đã đọc trước đó.

### Prompt nguyên văn

```text
Với A-FR02, đọc FR-02 trong SRS và slide. Tạo features/A-FR02/01-requirements.md bằng tiếng Việt đơn giản: từng yêu cầu, đầu vào, trạng thái cần theo dõi, đầu ra và nguồn expected result. Đánh dấu điểm chưa rõ. Ghi audit và commit riêng bước này. Chưa tạo kết quả kiểm thử.
```

### AI output nguyên văn

[AI-007-requirements-output.md](audit/AI-007-requirements-output.md) lưu toàn văn requirements, work-progress đã cập nhật, thông báo tiến độ và phản hồi cuối. Giữ nguyên snapshot khi tài liệu làm việc được chỉnh sau này; chèn toàn văn khi xuất audit PDF.

### Phạm vi và giới hạn

Tạo bản nháp 11 yêu cầu, đầu vào/trạng thái/đầu ra, nguồn expected và 9 điểm chưa rõ. Phân biệt nội dung trực tiếp của đặc tả với diễn giải. Chưa tạo lớp tương đương/test case, chưa thực thi, chưa ghi nhận human review hoặc bug. Commit riêng requirements, work-progress, audit và snapshot; không gom SUT hoặc thay đổi khác.

## Interaction AI-008 — Phân hoạch tương đương A-FR02

- **Tên công cụ:** Codex trong phiên chat hiện tại.
- **Ngày giờ ghi log:** 2026-10-14T23:36:27+07:00 (Asia/Ho_Chi_Minh); thời điểm ghi log, không phải timestamp gửi prompt chính xác.
- **Nguồn:** 01-requirements.md hiện tại; quy tắc phân hoạch từ slide đã đọc ở các lượt trước.

### Prompt nguyên văn

```text
Dựa trên requirements A-FR02, tạo 02-domains.md: chia từng đầu vào/trạng thái thành nhóm hợp lệ và không hợp lệ, gắn EC ID, ví dụ cụ thể và kết quả mong đợi. Giải thích ngắn vì sao chia như vậy. Ghi audit và commit riêng.
```

### AI output nguyên văn

[AI-008-domains-output.md](audit/AI-008-domains-output.md) lưu đầy đủ 02-domains.md, work-progress đã cập nhật, thông báo tiến độ và phản hồi cuối. Giữ snapshot này khi sửa bản làm việc; chèn nội dung khi xuất audit PDF.

### Phạm vi và giới hạn

Thiết kế lớp email, password, đường gửi, bộ đếm, thời gian khóa, lịch sử thao tác, token và output. Phân biệt hợp lệ/không hợp lệ/chưa chốt; ví dụ là dữ liệu đề xuất, chưa tạo hoặc thực thi. Chưa có human review hoặc kết quả test. Commit riêng tài liệu domains, tiến độ, audit và snapshot; không gom SUT/thay đổi khác.

## Interaction AI-009 — Thiết kế test case Domain A-FR02

- **Tên công cụ:** Codex trong phiên chat hiện tại.
- **Ngày giờ ghi log:** 2026-10-14T23:41:06+07:00 (Asia/Ho_Chi_Minh); thời điểm ghi log, không phải thời điểm gửi prompt chính xác.
- **Nguồn:** 02-domains.md; 01-requirements.md và slide đã đọc trong các lượt trước. Đọc Login.jsx/AuthContext.jsx để nhận diện control và điểm quan sát token, không dùng hành vi triển khai làm oracle.

### Prompt nguyên văn

```text
Tạo 03-domain-cases.md cho A-FR02. Mỗi ca có ID, điều kiện chuẩn bị, dữ liệu nhập, từng thao tác click/nhập, expected result, EC ID và requirement liên quan. Mỗi ca âm cơ bản chỉ sai một điều kiện. Ghi audit và commit riêng.
```

### AI output nguyên văn

[AI-009-domain-cases-output.md](audit/AI-009-domain-cases-output.md) lưu toàn văn file ca, tiến độ đã cập nhật, thông báo tiến độ và phản hồi cuối. Giữ bản snapshot; khi xuất audit PDF cần chèn toàn văn.

### Phạm vi và giới hạn

Thiết kế 24 ca Web/API, state và thăm dò; mỗi ca âm cơ bản thay một điều kiện. Có thủ tục chung để setup, quan sát state chỉ đọc, thao tác UI/API và kiểm soát ảnh hưởng giữa ca. 38 EC có liên kết ca dự kiến (một số chỉ có oracle một phần); L03 dành cho BVA, không tuyên bố đã thực thi/độ phủ 100%. Không chạy các lệnh test trong tài liệu, không tạo kết quả test hay human review. Commit riêng ca, tiến độ, audit và snapshot.

## Interaction AI-010 — Thiết kế BVA A-FR02

- **Tên công cụ:** Codex trong phiên chat hiện tại.
- **Ngày giờ ghi log:** 2026-10-14T23:45:22+07:00 (Asia/Ho_Chi_Minh); thời điểm ghi log, không phải thời điểm gửi prompt chính xác.
- **Nguồn đọc:** thủ tục setup/đo trong Domain cases; slide VN trang 19–26; requirements/domains và slide EN đã đọc trước đó; đoạn login backend để xác định điểm kiểm tra thời gian, không dùng lỗi triển khai làm expected.

### Prompt nguyên văn

```text
Tạo 04-boundary-cases.md cho A-FR02 theo slide: số lần sai 2/3/4 và thời gian khóa 29/30/31 giây, thêm các ca cần thiết. Hướng dẫn chuẩn bị trạng thái riêng và cách đo thời gian, không bịa độ chính xác. Ghi audit và commit riêng.
```

### AI output nguyên văn

[AI-010-boundary-cases-output.md](audit/AI-010-boundary-cases-output.md) lưu toàn văn ca BVA, tiến độ, thông báo tiến độ và phản hồi cuối. Giữ nguyên snapshot khi sửa bản làm việc; chèn toàn văn khi xuất audit PDF.

### Phạm vi và giới hạn

Thiết kế 12 ca, có setup riêng, cách tính khoảng elapsed từ timestamp request/response với điều kiện áp dụng, và kế hoạch clock kiểm soát tại server cho đúng 30s. Phân biệt baseline tự nhiên với fixture kiểm toán tử; không có harness hay độ chính xác ms đã được kiểm chứng. Không chạy SUT, sửa code/DB, tạo kết quả test hoặc human review. Commit riêng BVA, tiến độ, audit và snapshot.

## Interaction AI-011 — Ghi nhận review và ma trận coverage A-FR02

- **Tên công cụ:** Codex trong phiên chat hiện tại.
- **Ngày giờ ghi log:** 2026-10-15T00:08:28+07:00 (Asia/Ho_Chi_Minh); thời điểm ghi log, không phải thời điểm người dùng gửi chính xác.

### Prompt/nhận xét nguyên văn

```text
Tôi đã đọc từng ca và hiểu hết các ca kiểm thử.

Dựa trên review thực tế của tôi ở trên, cập nhật 05-review-coverage.md cho A-FR02, sửa các file cần thiết, đối chiếu yêu cầu → nhóm dữ liệu/biên → test case. Không ghi tôi đã duyệt phần chưa duyệt. Ghi audit và commit riêng bước review.
```

### AI output nguyên văn

[AI-011-review-coverage-output.md](audit/AI-011-review-coverage-output.md) lưu bản review/coverage, trạng thái trong ba tài liệu A-FR02 liên quan, work-progress và phản hồi cuối. Giữ snapshot nguyên gốc khi các file làm việc được cập nhật; chèn nội dung đầy đủ khi xuất audit PDF.

### Phạm vi và giới hạn

Phản hồi của sinh viên được ghi chính xác là đã đọc và hiểu mọi ca kiểm thử. Không suy diễn thành phê duyệt tính đúng đắn, tính đầy đủ hoặc cách đo thời gian. Tạo ma trận 11 requirement tới EC/biên/TC và ghi các khoảng còn thiếu/đang có expected chưa rõ. Chưa chạy test, chưa ghi actual/bug. Không thay đổi expected hoặc TC do sinh viên chưa yêu cầu sửa cụ thể. Commit riêng review, cập nhật trạng thái, tiến độ, audit và snapshot.

## Interaction AI-012 — Ghi Run 001 theo báo cáo người chạy

- **Tên công cụ:** Codex trong phiên chat hiện tại.
- **Ngày giờ ghi log:** 2026-10-15T00:17:53+07:00 (Asia/Ho_Chi_Minh); đây là thời điểm ghi log, không phải lúc test thực sự diễn ra. Ngày 15/10/2026 lấy từ ngữ cảnh phiên; giờ test chưa cung cấp.

### Prompt/nguyên văn người dùng gửi

```text
```markdown
### Run 001
- TC ID: [ID trong bảng thiết kế]
- Thời điểm: [ngày giờ thực tế]
- Môi trường: [trình duyệt, OS, SUT commit]
- Tiền điều kiện: [tài khoản chưa khóa, trạng thái đăng nhập...]
- Dữ liệu: [email, mật khẩu test]
- Thao tác đã làm: [các bước thực sự thực hiện]
- Expected: [chép từ ca đã review]
- Actual: [mô tả kết quả thực tế]
- Status: [Pass / Fail / Blocked]
- Bằng chứng: [đường dẫn tương đối tới ảnh/log]

Tôi test rồi và mọi thứ đều pass. Điền giúp tôi
```
```

### AI output nguyên văn

[AI-012-run001-output.md](audit/AI-012-run001-output.md) lưu execution log, cập nhật tiến độ, thông báo và phản hồi cuối. Giữ snapshot khi cập nhật execution; chèn toàn văn khi xuất audit PDF.

### Giới hạn và phân loại

Ghi theo lời người dùng: thao tác login UI thành công, chuyển về trang chủ, thấy user đăng nhập. Người dùng chưa đưa response/network log, kết quả storage/header hoặc screenshot login. TC A-DT-001 gồm các checkpoint token nên đánh dấu toàn TC chưa hoàn tất, không đổi thành Pass từ câu “mọi thứ đều pass” khi phạm vi chi tiết chưa chứng minh các checkpoint còn lại. Không chạy test trong lượt này.
