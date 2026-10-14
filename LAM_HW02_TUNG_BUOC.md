# Làm HW02 từng bước — Nguyễn Lê Thế Vinh — 23120190

Bạn mở file này bên cạnh cửa sổ chat và làm **từ trên xuống**. Mỗi lần chỉ làm một bước. Đánh dấu `[x]` khi bạn đã hoàn thành thật. Chưa làm thì giữ `[ ]`.

Bạn không cần viết hết báo cáo ngay. Trình tự là: **chuẩn bị → thiết kế test → bạn đọc và kiểm tra → chạy thử → lưu kết quả → làm chức năng tiếp theo → đóng gói**.

File này là hướng dẫn thao tác, chưa phải kết quả bài làm. Những prompt mẫu bên dưới chỉ được gửi khi bạn tới bước đó. AI Audit của các lượt làm bài tiếp theo vẫn được cập nhật; riêng lượt tạo file này không thêm interaction mới theo yêu cầu của bạn.

## 1. Mở đúng thư mục

- [ ] Mở Terminal, dán hai dòng sau rồi Enter:

```bash
cd /home/zinn/zinn/test/hw02
code .
```

- [ ] Trong VS Code, mở `LAM_HW02_TUNG_BUOC.md`. Nhấn `Ctrl+Shift+V` để xem bản dễ đọc.
- [ ] Mở terminal trong VS Code bằng menu **Terminal → New Terminal**.
- [ ] Chạy:

```bash
pwd
git status --short
```

**Đạt bước này:** `pwd` in `/home/zinn/zinn/test/hw02`.

`eshop-sut` đang được stage dưới dạng repo lồng bên trong. Ở các bước commit, chỉ thêm những file thuộc bài làm được chỉ định; không dùng `git add .` hoặc `git commit -a` để gom nhầm thay đổi.

## 2. Tạo nơi lưu bài làm

- [ ] Trong terminal ở thư mục `hw02`, chạy:

```bash
mkdir -p reports scripts skills videos
mkdir -p features/A-FR02 features/B-FR07 features/C-FR14 features/D-MREG
mkdir -p evidence/A-FR02 evidence/B-FR07 evidence/C-FR14 evidence/D-MREG
```

Tên thư mục có nghĩa như sau:

| Thư mục           | Bạn làm gì trong đó?                            |
| ------------------- | ---------------------------------------------------- |
| `features/A-FR02` | Đăng nhập và khóa tài khoản Web               |
| `features/B-FR07` | Giỏ hàng Web                                       |
| `features/C-FR14` | Thêm/Xem/Xóa danh mục Admin                       |
| `features/D-MREG` | Đăng ký Mobile                                    |
| `evidence/...`    | Ảnh, video, log chạy của chức năng tương ứng |
| `reports`         | Báo cáo tổng hợp để nộp                       |

- [ ] Gửi cho tôi prompt sau:

> Chuẩn bị bộ file làm bài theo LAM_HW02_TUNG_BUOC.md cho Nguyễn Lê Thế Vinh — 23120190. Tạo README.md có bảng tự chấm 25/25/25/15/10 nhưng để điểm trống; tạo reports/environment.md và reports/work-progress.md. Ghi baseline SUT, bốn chức năng của thành viên 2 và nguồn yêu cầu. Không điền kết quả chạy hay human review. Ghi AI Audit cho lượt này. Sau khi tạo xong, commit riêng bước chuẩn bị, không gom eshop-sut hoặc thay đổi không liên quan.

**Đạt bước này:** có README và hai file trong `reports`; chưa cần có điểm hay test case.

## 3. Mở backend — ứng dụng xử lý dữ liệu

**Trước khi chạy:** backend này tự xóa và tạo lại dữ liệu mẫu mỗi lần khởi động vì `database.js` gọi `initDatabase()` và `server.js` import file đó. Vì vậy, không khởi động lại giữa một chuỗi test khóa tài khoản hoặc khi chưa lưu bằng chứng. Không chạy thêm `node database.js` một cách tùy tiện.

- [ ] Mở một terminal mới, gọi là **Terminal Backend**. Chạy:

```bash
cd /home/zinn/zinn/test/hw02/eshop-sut/backend
mkdir -p /home/zinn/zinn/test/hw02-local-backups
cp -n database.sqlite /home/zinn/zinn/test/hw02-local-backups/database-before-hw02.sqlite
npm ci
```

Lệnh `cp -n` lưu DB hiện tại bên ngoài bài nộp và không ghi đè bản sao đã có. Nếu có lỗi cài đặt, dừng và gửi nguyên lỗi cho tôi. Không cần tự xóa lockfile.

- [ ] Khi cài xong, chạy:

```bash
node server.js
```

- [ ] Giữ terminal này mở. Chờ thông báo server chạy cổng 3000 và DB đã khởi tạo.
- [ ] Mở trình duyệt, vào `http://localhost:3000/api/products`.

**Đạt bước này:** trình duyệt hiển thị danh sách sản phẩm dưới dạng dữ liệu JSON. Chưa đánh dấu Pass cho test case nào; đây mới là kiểm tra môi trường.

## 4. Mở Web và Admin

- [ ] Mở terminal mới tên **Terminal Web**, chạy:

```bash
cd /home/zinn/zinn/test/hw02/eshop-sut/frontend-web
npm ci
npm run dev -- --port 5173 --strictPort
```

- [ ] Giữ terminal mở. Vào `http://localhost:5173`, kiểm tra thấy trang bán hàng.
- [ ] Mở terminal khác tên **Terminal Admin**, chạy:

```bash
cd /home/zinn/zinn/test/hw02/eshop-sut/frontend-admin
npm ci
npm run dev
```

- [ ] Vào `http://localhost:5174`. Đăng nhập bằng:

```text
Email: admin@eshop.com
Mật khẩu: Admin123!
```

**Đạt bước này:** thấy trang Admin và mục **Danh mục**. Nếu bị báo cổng bận, không tiếp tục đổi cổng ngẫu nhiên; gửi lỗi cho tôi để kiểm tra tiến trình đang chạy.

- [ ] Gửi tôi kết quả của bước 3–4 để điền vào `reports/environment.md`. Nêu rõ trình duyệt bạn sử dụng. Nếu chưa mở được trang nào, nói tên trang và lỗi.

## 5. Thiết kế test đăng nhập trước khi chạy

Làm **A-FR02 trước**, chưa chuyển qua ba chức năng còn lại.

Bạn sẽ gửi lần lượt các prompt sau. Chờ tôi hoàn thành một prompt rồi mới gửi prompt tiếp theo. Mỗi prompt tạo một phần và một commit riêng.

| Thứ tự | Prompt gửi cho tôi                                                                                                                                                                                                                                                                                                         |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 5.1      | Với A-FR02, đọc FR-02 trong SRS và slide. Tạo features/A-FR02/01-requirements.md bằng tiếng Việt đơn giản: từng yêu cầu, đầu vào, trạng thái cần theo dõi, đầu ra và nguồn expected result. Đánh dấu điểm chưa rõ. Ghi audit và commit riêng bước này. Chưa tạo kết quả kiểm thử. |
| 5.2      | Dựa trên requirements A-FR02, tạo 02-domains.md: chia từng đầu vào/trạng thái thành nhóm hợp lệ và không hợp lệ, gắn EC ID, ví dụ cụ thể và kết quả mong đợi. Giải thích ngắn vì sao chia như vậy. Ghi audit và commit riêng.                                                             |
| 5.3      | Tạo 03-domain-cases.md cho A-FR02. Mỗi ca có ID, điều kiện chuẩn bị, dữ liệu nhập, từng thao tác click/nhập, expected result, EC ID và requirement liên quan. Mỗi ca âm cơ bản chỉ sai một điều kiện. Ghi audit và commit riêng.                                                                  |
| 5.4      | Tạo 04-boundary-cases.md cho A-FR02 theo slide: số lần sai 2/3/4 và thời gian khóa 29/30/31 giây, thêm các ca cần thiết. Hướng dẫn chuẩn bị trạng thái riêng và cách đo thời gian, không bịa độ chính xác. Ghi audit và commit riêng.                                                         |

Ở đây **EC** chỉ là “nhóm dữ liệu có hành vi mong đợi giống nhau”. **Expected** là “hệ thống phải làm gì theo đặc tả”. Chưa chạy thì chưa có **Actual** — “hệ thống thực tế đã làm gì”.

**Đạt bước này:** có bốn file thiết kế, chưa có Pass/Fail và chưa tuyên bố bạn đã review.

## 6. Bạn đọc và review thiết kế A-FR02

- [ ] Mở `eshop-sut/README.md`, tìm `FR-02`.
- [ ] Mở bốn file vừa tạo cạnh SRS.
- [ ] Tự kiểm tra từng dòng sau:

```text
[x] Ca đăng nhập đúng có email và mật khẩu cụ thể.
[x] Sau mỗi lần sai, bộ đếm phải tăng 1 chứ không phải 2.
[x] Ngưỡng khóa là lần sai thứ 3.
[x] Thời gian khóa là 30 giây, có chỉ rõ tính từ lúc nào.
[x] Mỗi ca nói rõ phải bắt đầu với tài khoản/trạng thái nào.
[x] Expected result có căn cứ từ yêu cầu, không lấy code có lỗi làm chuẩn.
[x] Tôi hiểu cách thực hiện từng ca; chỗ chưa hiểu đã được chỉ ra.
```

- [ ] Gửi nhận xét thật cho tôi. Ví dụ: “Tôi hiểu các ca 1–5; ca 6 chưa rõ cách reset tài khoản; hãy sửa phần đó.” Nếu đọc xong thấy ổn, nói rõ bạn đã đọc những file nào.
- [ ] Sau khi phần chưa rõ được giải thích, gửi:

> Dựa trên review thực tế của tôi ở trên, cập nhật 05-review-coverage.md cho A-FR02, sửa các file cần thiết, đối chiếu yêu cầu → nhóm dữ liệu/biên → test case. Không ghi tôi đã duyệt phần chưa duyệt. Ghi audit và commit riêng bước review.

**Đạt bước này:** bạn hiểu cách chạy từng ca. Chưa hiểu ca nào thì hỏi ngay ca đó.

## 7. Chạy một ca đăng nhập mẫu

- [X] Vào `http://localhost:5173/login`.
- [X] Nếu đang đăng nhập, bấm nút đăng xuất; giao diện hiện tại có thể ghi **Thoát**.
- [X] Nhập `test@eshop.com` vào ô tài khoản. Ô này có thể đang ghi **Username**.
- [X] Nhập `Test1234!` vào ô mật khẩu.
- [X] Bấm **Sign In** một lần.
- [X] Quan sát có chuyển về trang chủ và hiển thị người dùng đã đăng nhập không.
- [ ] Chụp màn hình bằng công cụ Screenshot của máy. Lưu vào `evidence/A-FR02/` với tên chứa TC ID của ca tương ứng, ví dụ `A-DT-001-login-success.png` nếu ID đó được dùng trong bảng.

**Đây là ca đăng nhập thành công, không phải ca kiểm chứng khóa.** Nếu tài khoản đã bị khóa do thử trước đó, ca này chưa có đúng tiền điều kiện: ghi lại và chuẩn bị lại, không kết luận ngay là bug đăng nhập đúng.

- [ ] Sau khi chạy ca UI này, gửi cho tôi prompt ở bước 8 để tôi cập nhật `features/A-FR02/06-execution.md` cùng kết quả các ca còn lại. Bạn không cần tự tạo file hay tự chép mẫu dưới đây; mẫu chỉ cho biết một bản ghi test cần có thông tin gì:

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
```

Pass = kết quả đúng expected. Fail = đã chạy và kết quả khác expected. Blocked = không thể thực hiện/hoàn tất vì điều kiện hoặc chức năng phụ thuộc bị thiếu. Ca chưa bắt đầu để Not run.

## 8. Yêu cầu tôi chạy toàn bộ test A-FR02

**Bạn không cần tự mở terminal để gọi script này.** Script là công cụ tôi dùng khi bạn gửi prompt bên dưới; mỗi chuỗi API độc lập có tài khoản riêng. Một prompt yêu cầu tôi chạy tất cả ca A-FR02, không chỉ chuỗi 2 lần sai đã chạy thử.

- [ ] Khi đã sẵn sàng, copy và gửi nguyên prompt sau:

> Hãy thực thi toàn bộ test case Domain và BVA của A-FR02 trong `features/A-FR02/03-domain-cases.md` và `features/A-FR02/04-boundary-cases.md`. Tôi đã review và hiểu các ca. Tự kiểm tra backend đang chạy, commit SUT, các script và tiền điều kiện; tận dụng `scripts/A-FR02-login-sequence.py` hoặc tạo mã hỗ trợ dùng thư viện sẵn có để chạy những ca API. Tự chạy lệnh cần thiết, không yêu cầu tôi tự chạy script. Dùng tài khoản test riêng cho từng chuỗi có trạng thái; không restart backend, không import `database.js`, không xóa DB/dữ liệu thật và không sửa logic SUT. Thực hiện cả ca Domain lẫn BVA, tránh bỏ qua ca chỉ vì đã chạy một lần tương tự; nếu cùng một lần chạy phủ nhiều TC ID thì ghi rõ bằng chứng và liên kết Run ID cho từng ca. Tự động hóa UI nếu môi trường cho phép. Nếu cần thao tác trên trình duyệt người dùng mà bạn không điều khiển được, hãy tiếp tục chạy tất cả ca API/tự động hóa còn lại rồi gửi tôi danh sách thao tác UI cụ thể cần làm, từng bước một; không yêu cầu tôi chạy lệnh terminal. Với từng ca, lưu request/response đã che password/token, ảnh UI nếu quan sát được, timestamp UTC/monotonic và state DB chỉ đọc khi hữu ích. Đánh dấu Pass/Fail chỉ khi expected đã rõ và có bằng chứng; ghi Blocked/Not run cùng lý do khi không thể chạy. Q chưa rõ thì ghi observation riêng, không tự đặt expected hoặc báo bug. Với mốc 29/30/31 giây, chỉ kết luận phía biên khi khoảng đo chứng minh request nằm hẳn trước/sau ngưỡng; đúng 30 giây chỉ kết luận nếu kiểm soát được clock tại điểm server so sánh, nếu không ghi Blocked/không đủ độ chính xác. Cập nhật `06-execution.md`, `07-bugs-and-ai-gaps.md` và `reports/work-progress.md` theo kết quả thật; chưa tạo GitHub Issue cho lỗi thiếu ảnh cần thiết. Ghi prompt/output và giới hạn vào AI Audit. Commit riêng phần thực thi, chỉ stage file bài làm và evidence liên quan.

- [ ] Sau khi Codex chạy, xem bảng kết quả được ghi vào `06-execution.md`: từng TC ID có status, Run ID, link log/ảnh và expected/actual. Bạn không cần đọc JSONL thô trừ khi muốn kiểm tra chi tiết. Gửi nhận xét nếu thấy kết quả không khớp với điều bạn quan sát.
- [ ] Chỉ khi Codex trả về danh sách thao tác giao diện thủ công vì không điều khiển được trình duyệt, hãy làm các bước đó; chụp ảnh đúng TC ID rồi gửi ảnh/quan sát cho Codex để gắn vào Run ID và cập nhật trạng thái.

Script tạo tài khoản test riêng và **để lại các tài khoản đó trong DB**; log cho biết email nào đã tạo. Đợi tôi tổng hợp xong trước khi yêu cầu dọn dữ liệu. Đo monotonic từ client không chứng minh chính xác thời điểm server so sánh `locked_until`. Ca đúng 30 giây có thể cần harness đồng hồ riêng và sẽ được đánh dấu chưa chạy nếu không có môi trường kiểm soát phù hợp.

**Đạt bước này:** mỗi TC trong danh sách Domain và BVA đều có kết quả/bằng chứng, hoặc lý do cụ thể vì sao chưa chạy/chưa kết luận. Một ca API không thay thế ca cần kiểm tra UI; một lần chạy chỉ phủ nhiều ca khi bằng chứng thực tế đáp ứng expected của từng ca.

## 9. Báo bug A-FR02 và kết thúc chức năng đầu tiên

- [ ] Với mỗi ca Fail, mở SRS để xác nhận expected đúng.
- [ ] Gửi tôi:

> Với mỗi bug A-FR02 đã xác nhận và đủ bằng chứng, tự tạo GitHub Issue trên `tzin1401/testing-hw02`; không chỉ soạn nháp và không yêu cầu tôi tự mở web/terminal. Trước khi đăng, đọc SRS và `features/A-FR02/07-bugs-and-ai-gaps.md`, đối chiếu actual/expected, steps, môi trường, Run ID/TC ID, severity có lý do và ảnh phù hợp; gộp ca cùng nguyên nhân thành một issue, không tạo trùng (kiểm tra issues đã mở/đóng trước). Dùng GitHub CLI `gh`; kiểm tra CLI đã cài và `gh auth status`, chỉ cài nếu thiếu, và xác nhận đúng repo. Theo slide `slide/03 - github_bug_management.pptx.pdf`, issue phải có title `[BUG][Module] ...`, các mục Mô tả lỗi, Môi trường, Steps to reproduce, Actual result, Expected result, Evidence; đính kèm ảnh trong chính issue. Gắn đủ labels `type: bug`, `status: new`, một `severity: blocker|critical|major|minor|trivial`, một `priority: P0|P1|P2|P3`, và module thích hợp (`module: login|cart|checkout|admin|api|ui`). Nếu label chưa có thì tạo theo đúng tên trước khi đăng. Dùng `gh issue create --body-file ... --attach ... --label ...` để upload ảnh và tạo issue; không chỉ chèn đường dẫn ảnh local. Không đăng bug chưa có expected rõ hoặc thiếu evidence bắt buộc: ghi lý do và việc cần bổ sung. Sau khi tạo, mở lại từng issue để xác nhận title/body/ảnh/labels, ghi URL vào bug report, execution và work-progress; thêm prompt/output/giới hạn vào AI Audit, cập nhật checkbox chỉ khi đúng, rồi commit riêng file bài làm/evidence liên quan. Không push SUT hoặc file ngoài phạm vi.

- [ ] Copy và gửi nguyên prompt ở trên; Codex tự tạo từng issue đủ chuẩn và đính kèm ảnh.
- [ ] Mở các URL trả về, kiểm tra ảnh hiển thị cùng labels và nội dung tái hiện.
- [ ] Nếu bug còn thiếu bằng chứng/expected, bổ sung đúng phần Codex nêu trước khi yêu cầu đăng issue; không đánh dấu bước này hoàn tất khi còn bug đã xác nhận chưa có issue.

**Đạt bước này:** A có đủ thiết kế, review, thực thi, bằng chứng, issue và phân tích AI. Bây giờ mới làm B.

## 10. Làm giỏ hàng Web — B-FR07

Thực hiện prompt theo thứ tự 10.1 → 10.5; mỗi prompt tạo một bước riêng. Không nhảy thẳng sang chạy test khi chưa có requirements, domains, ca, BVA và review.

Phạm vi của bạn là **giỏ hàng Web theo FR-07**. FR-06 chỉ là nguồn cho quy tắc số lượng nguyên dương khi chọn số lượng/thêm sản phẩm; không nhận toàn bộ phần chi tiết sản phẩm của thành viên khác. SUT hiện dùng state phía Web cho giỏ, nên gọi API cart riêng không thay thế kiểm thử UI.

### 10.1. Trích yêu cầu B-FR07

- [ ] Gửi prompt:

> Đọc SRS FR-07 trong `eshop-sut/README.md`, phần liên quan FR-06, API specification, slide Domain/BVA và phân công thành viên 2. Tạo `features/B-FR07/01-requirements.md` bằng tiếng Việt đơn giản. Tách từng yêu cầu có ID B-Rxx; liệt kê input (sản phẩm, giá, số lượng, thao tác), trạng thái giỏ trước/sau, đầu ra cần quan sát trên Web và nguồn expected result. Bao gồm giỏ rỗng; hiển thị cột; thêm lại cùng sản phẩm phải gộp dòng/tăng số lượng; nút +/-; xác nhận/hủy xóa; tiếp tục mua sắm; nhãn “Tổng cộng”; thành tiền và tổng tiền. Dẫn FR-06 cho số lượng nguyên dương tối thiểu 1. Đánh dấu rõ điều chưa được SRS nói: số lượng tối đa/tồn kho, lưu giỏ qua reload, xử lý giá đổi, hành vi số âm/thập phân ở client/API, câu chữ thông báo. Không lấy code SUT làm expected. Ghi nguồn, giả định/câu hỏi, trường hợp phụ thuộc FR-06 và giới hạn thành viên 2. Chưa thiết kế EC/TC, chưa chạy test, chưa ghi human review. Ghi AI Audit và commit riêng bước requirements.

**Đạt:** có `01-requirements.md`; chưa có actual, Pass/Fail hay tuyên bố bạn đã review.

### 10.2. Chia lớp dữ liệu và trạng thái B-FR07

- [ ] Đọc mục yêu cầu trên rồi gửi:

> Dựa trên `features/B-FR07/01-requirements.md`, tạo `features/B-FR07/02-domains.md`. Chia từng input và trạng thái thành lớp hợp lệ/không hợp lệ với B-EC ID, điều kiện chính xác, ví dụ cụ thể, expected result và B-R liên quan. Tối thiểu xét: giỏ rỗng/có một/có nhiều dòng; cùng product ID/ID khác; số lượng 1 và các giá trị 0, âm, thập phân, không phải số tại đúng điểm nhập có thể thao tác; trạng thái xóa dialog xác nhận/hủy; product còn tồn tại/không xác định nếu có căn cứ. Bao gồm các lớp đầu ra về dòng hàng, đơn giá, thành tiền, tổng cộng, badge nếu nguồn yêu cầu và empty state. Không tự đặt max quantity, tồn kho hoặc chính sách persistence. Tách lớp không thể kết luận expected thành câu hỏi/thăm dò, không gán Pass/Fail. Giải thích ngắn cách phân lớp và vì sao các đại diện phân biệt được hành vi. Chưa tạo test case hay chạy SUT. Ghi audit và commit riêng.

**Đạt:** mỗi lớp có ví dụ và kết quả dự kiến hoặc ghi rõ câu hỏi chưa chốt.

### 10.3. Tạo test case Domain B-FR07

- [ ] Gửi prompt:

> Tạo `features/B-FR07/03-domain-cases.md` từ requirements và domains đã review. Mỗi ca ghi TC ID `B-DT-nnn`, mục tiêu, loại UI/API, điều kiện chuẩn bị và trạng thái giỏ ban đầu, dữ liệu cụ thể (tên/ID/giá sản phẩm, số lượng), từng bước click/nhập, expected theo từng requirement, EC ID, cách quan sát và bằng chứng cần lưu. Phải có ca độc lập cho: giỏ rỗng; một sản phẩm; hai sản phẩm khác nhau; thêm cùng sản phẩm lần hai và xác nhận gộp dòng/tăng quantity; kiểm tra đơn giá × quantity và tổng; tăng/giảm bằng +/-; giảm khi đang là 1; mở dialog xóa rồi hủy; xác nhận xóa đúng dòng; xóa dòng cuối; tiếp tục mua sắm; nhãn “Tổng cộng”; số lượng sai miền nếu UI cho nhập. Ca âm cơ bản chỉ sai một điều kiện. Dùng sản phẩm test có giá biết trước; không xóa dữ liệu mẫu. Ghi reset giỏ bằng thao tác UI, vì reload chỉ được dùng khi bắt đầu ca độc lập và state giỏ có thể mất. Nếu control không tồn tại, thiết kế ca kiểm tra sự hiện diện và đánh dấu ca tương tác phụ thuộc; không giả định có nút để click. Không tạo actual/status. Ghi audit và commit riêng.

**Đạt:** mỗi ca đủ bước làm lại được, expected không lẫn với kết quả quan sát.

### 10.4. Thiết kế BVA B-FR07

- [ ] Gửi prompt:

> Tạo `features/B-FR07/04-boundary-cases.md` theo slide. Chọn biên có căn cứ cho quantity: 0/1/2 tại trường nhập số lượng; nếu thao tác giảm từ 1 có ý nghĩa thì ghi state transition riêng. Phân biệt giá trị nhập trực tiếp với nút +/-: không gán số âm/thập phân cho control không nhận được các giá trị đó. Ghi δ, điểm biên, expected và B-R/B-EC/TC liên quan. Nếu SRS không định nghĩa upper bound, ghi “không có UB được nêu”, không bịa 99/100 hay giới hạn tồn kho. Có thể thêm biên số dòng giỏ chỉ khi có giới hạn được nêu; nếu không, dùng ca đại diện một/nhiều, không gọi là UB. Hướng dẫn reset giỏ độc lập và kiểm tra tiền bằng công thức giá × quantity; không tạo actual hay kết quả chạy. Ghi audit và commit riêng.

**Đạt:** các điểm 0/1/2 có lý do; không tạo biên tối đa không có trong SRS.

### 10.5. Review, coverage, thực thi và bug B-FR07

- [ ] Đọc 4 file B, rồi gửi nhận xét của bạn. Sau khi có nhận xét thật, gửi:

> Dựa trên review thực tế của tôi, cập nhật `features/B-FR07/05-review-coverage.md`: truy vết từng B-R → B-EC/điểm biên → B-DT/B-BV; ghi phần tôi hiểu/chưa hiểu và mọi sửa đổi cần thiết. Không ghi tôi duyệt phần chưa nói. Ghi audit và commit riêng.

- [ ] Khi review đã xong, gửi prompt chạy:

> Thực thi toàn bộ ca Domain và BVA B-FR07 trong `features/B-FR07/03-domain-cases.md` và `04-boundary-cases.md`. Đọc SRS/oracle và kiểm tra Web/backend đang chạy trước khi bắt đầu. Tự chạy những gì có thể; không yêu cầu tôi chạy lệnh terminal. Giỏ hàng là state phía Web: không coi gọi riêng API hoặc đọc code là test UI. Mỗi ca bắt đầu từ trạng thái giỏ được nêu; reset chỉ bằng thao tác phù hợp và ghi rõ, không reload giữa chuỗi đang cần giữ state. Chỉ dùng sản phẩm test và không xóa sản phẩm/dữ liệu mẫu. Chụp ảnh hoặc video cho từng checkpoint UI; ghi giá, quantity, thành tiền và phép tính tổng; nếu trình duyệt không điều khiển được thì chạy hết phần có thể trước rồi gửi thao tác UI cụ thể còn thiếu. Đánh dấu từng TC Pass/Fail/Blocked/Not run theo bằng chứng; ca phụ thuộc nút +/- không tồn tại phải Blocked sau khi ghi Fail riêng cho yêu cầu sự hiện diện. Không tự đặt expected cho giới hạn chưa có trong SRS. Cập nhật `06-execution.md`, `07-bugs-and-ai-gaps.md`, `reports/work-progress.md`, evidence và AI Audit. Chuẩn bị nội dung GitHub Issue nhưng chưa đăng issue nếu thiếu ảnh yêu cầu. Commit riêng phần thực thi, chỉ stage file B và evidence liên quan.

- [ ] Sau khi có kết quả, gửi prompt tổng hợp:

> Đối chiếu bug B-FR07 đã có evidence với SRS. Cập nhật `07-bugs-and-ai-gaps.md`, gộp test fail cùng nguyên nhân, tách lỗi độc lập; chuẩn bị title/body issue với bước tái hiện, expected/actual, severity có lý do, TC ID và ảnh cần đính kèm. Chỉ nêu AI gap có bằng chứng. Không tự đăng GitHub Issue; ghi audit và commit riêng phần báo cáo bug.

- [ ] Chỉ đánh dấu B-FR07 hoàn tất khi mọi TC có actual/status/evidence hoặc lý do Not run/Blocked. Không dùng kết quả A thay cho B.

## 11. Làm danh mục Admin — C-FR14

Thực hiện prompt theo thứ tự 11.1 → 11.5; mỗi prompt tạo một bước riêng. Không dùng kết quả A/B làm thiết kế cho quyền và dữ liệu danh mục.

Phạm vi là **Thêm/Xem/Xóa danh mục** (FR-14), cộng kiểm soát quyền đối với các API ghi danh mục theo FR-12. Mặc dù tiêu đề SRS ghi CRUD, FR-14 không yêu cầu sửa danh mục. Không mở rộng thành kiểm thử toàn bộ Admin.

### 11.1. Trích yêu cầu C-FR14

- [ ] Gửi prompt:

> Đọc FR-14 và FR-12 trong `eshop-sut/README.md`, API specification, slide Domain/BVA và phân công thành viên 2. Tạo `features/C-FR14/01-requirements.md` tiếng Việt đơn giản. Tách yêu cầu C-Rxx cho: admin thêm danh mục; xem danh sách; xóa danh mục; tên bắt buộc không để trống; API thao tác ghi cần JWT hợp lệ và role admin theo FR-12. Liệt kê input (tên, token/role, category ID), state trước/sau, output quan sát được ở Admin/API và nguồn expected. Nêu rõ FR-14 không bắt buộc edit; không tự thêm uniqueness, max length 255, chính sách trim, xóa danh mục đang được sản phẩm tham chiếu hoặc HTTP status nếu SRS/API contract không nói. Đánh dấu các điểm chưa rõ để review. Chưa tạo EC/TC, chưa chạy test hay human review. Ghi audit và commit riêng.

### 11.2. Chia lớp dữ liệu và trạng thái C-FR14

- [ ] Gửi prompt:

> Từ `features/C-FR14/01-requirements.md`, tạo `02-domains.md`. Đặt C-EC ID và phân hoạch: tên rỗng/không rỗng; khoảng trắng-only là lớp cần xác định cách diễn giải chứ không giả định trim; tên ASCII và Unicode có dấu; danh sách rỗng/có danh mục; category ID test vừa tạo/tồn tại/không tồn tại nếu có thể kết luận; role admin, user thường, thiếu token, token sai/hết hạn cho thao tác ghi. Mỗi lớp có đại diện cụ thể, expected theo FR-14/FR-12, output/state cần quan sát và requirement liên quan. Phân biệt GET xem danh sách với thao tác POST/DELETE bị ràng buộc quyền; không tự đòi khách không được xem danh mục nếu SRS không nói. Không đặt giới hạn độ dài hoặc uniqueness. Giải thích ngắn lý do chia và gắn câu hỏi cho các oracle chưa đủ. Chưa chạy test. Ghi audit và commit riêng.

### 11.3. Tạo test case Domain C-FR14

- [ ] Gửi prompt:

> Tạo `features/C-FR14/03-domain-cases.md`. Mỗi TC `C-DT-nnn` ghi role/tài khoản và state chuẩn bị, tên hoặc category ID cụ thể, thao tác click/nhập/API từng bước, expected, C-EC, C-R, cách quan sát và evidence. Bao gồm: admin thêm tên hợp lệ rồi thấy chính xác trong danh sách; tên rỗng bị từ chối và không tạo dòng; xem danh sách có dữ liệu; xóa đúng danh mục test vừa tạo và xác nhận chỉ dòng đó biến mất; mở dialog/hủy nếu UI có dialog; API POST/DELETE với admin; cùng thao tác ghi bằng thiếu token, token không hợp lệ và user thường phải bị từ chối theo FR-12; kiểm tra GET riêng mà không suy rộng quyền. Tên ba dấu cách ghi là probe/expected chưa chốt nếu không có quy tắc trim. Không sửa/xóa dữ liệu mẫu; mọi tạo/xóa chỉ với danh mục test do ca tạo. Nêu thủ tục dọn chỉ ID test đã tạo sau khi lưu evidence, không tự xóa trong thiết kế. Mỗi ca âm cơ bản chỉ vi phạm một yếu tố (tên hoặc quyền). Chưa chạy. Ghi audit và commit riêng.

### 11.4. Thiết kế BVA C-FR14

- [ ] Gửi prompt:

> Tạo `features/C-FR14/04-boundary-cases.md` theo slide. Với tên danh mục, dùng 0/1/2 ký tự làm biên dưới (0 rỗng, 1 và 2 không rỗng), expected theo quy tắc “bắt buộc, không được để trống”; giải thích không có upper bound trong SRS nên không bịa max. Có thể dùng các đại diện Unicode/whitespace như domain probes, nhưng đừng gọi chúng BVA nếu không phải điểm biên thứ tự. Với ID, chỉ chọn tồn tại/không tồn tại nếu requirement/ca hỗ trợ; không tạo số ID cực đại giả. Nếu có biên khác được nêu rõ trong tài liệu thì dẫn nguồn. Mỗi ca có setup danh mục riêng, role/token, thao tác, expected, C-EC/C-R/TC ID và ảnh/log cần lưu. Không chạy test hay điền actual. Ghi audit và commit riêng.

### 11.5. Review, coverage, thực thi và bug C-FR14

- [ ] Đọc các file C rồi gửi nhận xét thật; sau đó:

> Dựa trên review thực tế của tôi, cập nhật `05-review-coverage.md` cho C-FR14, truy vết C-R → C-EC/biên → C-DT/C-BV. Ghi rõ các oracle cần hỏi thêm và những phần tôi chưa duyệt. Sửa file liên quan nếu cần, không suy ra tôi đã chấp thuận. Ghi audit và commit riêng.

- [ ] Khi sẵn sàng chạy, gửi:

> Thực thi toàn bộ ca Domain và BVA C-FR14 trong `03-domain-cases.md` và `04-boundary-cases.md`. Tự kiểm tra Admin/backend và baseline, tự chạy API/UI nào có thể; không yêu cầu tôi tự chạy terminal. Mỗi ca dùng danh mục test riêng do ca tạo, ghi ID, state trước/sau và lưu request/response hoặc ảnh UI. Không sửa/xóa danh mục mẫu hay dữ liệu người khác; chỉ xóa đúng ID test nếu ca yêu cầu và evidence đã lưu. Kiểm tra POST/DELETE theo ba trạng thái quyền: admin, thiếu/invalid token, user thường; không dùng UI admin để suy ra API đã chặn role thường. Không coi GET danh sách công khai là vi phạm FR-12. Nếu thiếu fixture role user hoặc không thể điều khiển trình duyệt, chạy các ca khả thi trước rồi nêu đúng việc còn cần tôi làm, không đưa lệnh terminal. Chấm từng TC theo expected có căn cứ; whitespace/uniqueness/giới hạn chưa rõ ghi observation, không kết luận bug. Cập nhật `06-execution.md`, `07-bugs-and-ai-gaps.md`, `reports/work-progress.md`, evidence và AI Audit; chuẩn bị issue nhưng không đăng nếu chưa đủ ảnh. Commit riêng execution và file C/evidence liên quan.

- [ ] Sau đó gửi prompt tổng hợp bug như bước 10.5, đổi phạm vi thành C-FR14 và dùng evidence C. Chỉ đánh dấu hoàn tất khi mọi ca có status hoặc lý do chưa chạy.

## 12. Mở ứng dụng Mobile

Chọn điện thoại Android/iPhone có Expo Go cùng Wi-Fi với máy tính, hoặc emulator đã cấu hình. Việc test API trên máy tính không chứng minh giao diện React Native chạy trên Mobile.

- [ ] Trên máy tính, chạy `hostname -I` và xác định IP LAN. Nếu có nhiều IP, gửi kết quả cho tôi để xác định cái nào thuộc Wi-Fi.
- [ ] Trên điện thoại mở `http://IP-CUA-MAY:3000/api/products`. Chỉ tiếp tục khi JSON mở được; nếu không, ghi lỗi mạng/firewall, chưa đánh dấu app chạy.
- [ ] Mở `eshop-sut/frontend-mobile/App.js`, tìm `API_URL`. Đổi riêng hostname thành IP LAN, giữ nguyên scheme, port và `/api`; ghi config vào `reports/environment.md`. Đây là thay đổi cấu hình trong repo SUT, không stage/commit cùng tài liệu bài làm trừ khi cần theo yêu cầu môn học.
- [ ] Mở terminal Mobile:

```bash
cd /home/zinn/zinn/test/hw02/eshop-sut/frontend-mobile
npm ci
npx expo start
```

- [ ] Mở Expo Go/quét QR hoặc chạy emulator. Xác nhận màn hình app hiện; chụp ảnh và ghi thiết bị, OS, phiên bản Expo/ứng dụng. Giữ Metro/backend đang chạy.
- [ ] Nếu không có điện thoại/emulator, báo tôi. Có thể tiếp tục thiết kế và chạy API phụ trợ, nhưng D-MREG UI phải ghi Blocked; không gọi API test là Mobile UI pass.

## 13. Làm đăng ký Mobile — D-MREG

Thực hiện prompt theo thứ tự 13.1 → 13.5 sau khi Mobile mở được. Mỗi prompt tạo một bước riêng; API chỉ là bằng chứng phụ trợ, không thay thế thao tác trên app.

Phạm vi là đăng ký trong ứng dụng Mobile: FR-20 xác định chức năng có trên Mobile; quy tắc đăng ký lấy từ FR-01. Các phần khác của Mobile (đăng nhập, giỏ hàng, checkout...) không thuộc D-MREG.

### 13.1. Trích yêu cầu D-MREG

- [ ] Sau khi ứng dụng Mobile mở được, gửi:

> Đọc FR-20 và FR-01 trong `eshop-sut/README.md`, API specification, slide Domain/BVA và phân công thành viên 2. Tạo `features/D-MREG/01-requirements.md` tiếng Việt đơn giản. Gắn ID D-Rxx cho: họ tên/email/mật khẩu bắt buộc; email đúng định dạng và duy nhất; password tối thiểu 8 ký tự, có ít nhất một chữ hoa, chữ thường, chữ số, và ký tự thuộc `@$!%*?&`; trường xác nhận mật khẩu bắt buộc và phải khớp; đăng ký thành công tạo tài khoản và chuyển về màn hình Đăng nhập. Tách input, state (email đã tồn tại/chưa tồn tại, account tạo thành công hay không), output Mobile/API và nguồn expected cụ thể. Ghi điều kiện ký tự đặc biệt là membership trong tập đã nêu, không tự đòi đủ mọi ký tự. Nêu các điểm cần xác minh như trim họ tên/email, giới hạn độ dài, thông báo cụ thể, trạng thái khi mạng lỗi, email trùng race; không tự đặt expected. Chưa tạo EC/TC, chưa chạy test/human review. Ghi audit và commit riêng.

### 13.2. Chia lớp dữ liệu và trạng thái D-MREG

- [ ] Gửi prompt:

> Dựa trên `features/D-MREG/01-requirements.md`, tạo `02-domains.md` với D-EC ID. Phân lớp riêng cho họ tên rỗng/hợp lệ; email rỗng/sai format/hợp lệ mới/hợp lệ đã tồn tại; password độ dài dưới 8/đúng 8/trên 8 và thiếu riêng từng nhóm hoa, thường, số, ký tự đặc biệt; confirm khớp/không khớp/rỗng; kết quả API/network success/failure và app ở Register/Login. Mỗi lớp nêu dữ liệu mẫu, expected, D-R, output cần quan sát. Để kiểm tra một quy tắc password, giữ các quy tắc còn lại hợp lệ; ví dụ nhóm ký tự thiếu nhưng vẫn đủ 8 ký tự. Không gộp lỗi email trùng với format sai. Ghi cách xử lý Unicode/khoảng trắng/trim chưa có quy tắc là câu hỏi, không tự kết luận. Giải thích phân lớp và chưa chạy SUT. Ghi audit, commit riêng.

### 13.3. Tạo test case Domain D-MREG

- [ ] Gửi prompt:

> Tạo `features/D-MREG/03-domain-cases.md` cho ca trên Mobile thật, mỗi ca `D-DT-nnn`. Ghi thiết bị/OS, trạng thái app, account/email đã tồn tại hay chưa, dữ liệu từng trường, từng thao tác tap/nhập/ẩn-hiện bàn phím/submit, expected, D-EC, D-R và evidence. Bao gồm: form có đủ bốn trường; đăng ký thành công bằng dữ liệu hợp lệ và email mới; tên rỗng; email rỗng/sai format/trùng; password rỗng; từng lỗi password độc lập (thiếu hoa, thường, số, ký tự đặc biệt); confirm sai/rỗng; xác nhận không tạo account khi bị từ chối; sau thành công chuyển về Login và có thể thấy account được tạo. Ca âm chỉ vi phạm một điều kiện, giữ các trường khác hợp lệ. Mỗi ca thành công phải dùng email riêng; không ghi mật khẩu thật. Nếu form thiếu trường bắt buộc, tạo ca kiểm tra sự hiện diện với ảnh; các ca cần field đó đánh dấu phụ thuộc/blocked, nhưng tiếp tục các ca độc lập có thể làm. Ghi thông báo lỗi dự kiến theo ý nghĩa yêu cầu, không bịa câu chữ. Chưa chạy và chưa điền actual. Ghi audit và commit riêng.

### 13.4. Thiết kế BVA D-MREG

- [ ] Gửi prompt:

> Tạo `features/D-MREG/04-boundary-cases.md` theo slide. Kiểm tra password length ở 7/8/9 ký tự: dùng chuỗi có hoa, thường, số và ký tự đặc biệt hợp lệ ở cả ba điểm, ví dụ `Aa1!bbb`, `Aa1!bbbb`, `Aa1!bbbbb`; expected riêng về độ dài là 7 từ chối, 8/9 đạt điều kiện độ dài nhưng chỉ thành công nếu các trường khác hợp lệ. Thêm biên một bên cho các tập ký tự bằng cách thiếu một nhóm riêng, nhưng phân loại đó là EC/robustness chứ không giả danh length boundary. Với họ tên/email/confirm chỉ thiết kế biên nếu SRS nêu giới hạn; không bịa max length. Ghi email duy nhất cho mỗi ca đăng ký thành công, setup trạng thái DB, từng thao tác Mobile, expected, D-EC/D-R/TC và ảnh cần lưu. Chưa chạy. Ghi audit và commit riêng.

### 13.5. Review, coverage, thực thi và bug D-MREG

- [ ] Đọc các file D và gửi ý kiến thật; sau đó gửi:

> Dựa trên review thực tế của tôi, cập nhật `05-review-coverage.md` cho D-MREG, truy vết D-R → D-EC/biên → D-DT/D-BV. Ghi rõ tôi đã xem/hiểu nội dung nào và điểm nào còn cần hỏi; không ghi phê duyệt thay tôi. Sửa các file cần thiết, ghi audit và commit riêng.

- [ ] Khi sẵn sàng chạy, gửi:

> Thực thi toàn bộ ca Domain và BVA D-MREG trong `03-domain-cases.md` và `04-boundary-cases.md`. Trước tiên kiểm tra Mobile app, thiết bị/emulator và kết nối API; không restart backend nếu có thể làm mất dữ liệu/state. Tự chạy API phụ trợ bằng tài khoản/email test riêng khi điều đó giúp chuẩn bị hoặc xác minh account, nhưng mỗi TC giao diện phải được thực hiện trên app Mobile thật/emulator; API không thay thế Mobile UI. Không yêu cầu tôi chạy lệnh terminal. Chụp ảnh từng màn hình quan trọng có TC ID, ghi thao tác, timestamp, thiết bị/OS, request/response đã che mật khẩu/token và kết quả điều hướng. Với ca đăng ký thành công, email phải duy nhất; với ca fail kiểm tra account không được tạo nếu có cách truy vấn chỉ đọc. Nếu Codex không điều khiển được điện thoại/emulator, hoàn tất phần API có thể làm rồi gửi từng thao tác Mobile cụ thể tôi cần thực hiện và cách lưu ảnh, không bắt tôi tự sửa file/test script. Ghi Blocked cho checkpoint UI chưa có bằng chứng; không suy ra UI từ API. Đánh dấu Pass/Fail từng requirement có expected; câu hỏi chưa rõ ghi observation. Cập nhật `06-execution.md`, `07-bugs-and-ai-gaps.md`, `reports/work-progress.md`, evidence và AI Audit. Chuẩn bị issue, chưa đăng issue nếu thiếu ảnh. Commit riêng execution và file D/evidence liên quan.

- [ ] Sau khi có kết quả, gửi prompt tổng hợp bug như bước 10.5, đổi phạm vi sang D-MREG. Không kết luận D hoàn tất nếu Mobile UI chưa chạy hoặc các ca còn thiếu chưa được nêu rõ.

## 14. Tạo skill và quay video để làm phần 10 điểm

- [ ] Sau khi đã làm ít nhất một chức năng đầy đủ, gửi:

> Dựa trên quy trình đã thực hiện và review thật, tạo skill tại skills/domain-bva/SKILL.md để tái sử dụng Domain Testing và BVA theo slide. Có input, các bước, output, chỗ cần human review và ví dụ. Không hard-code một chức năng. Hướng dẫn tôi cách gọi và demo skill từ đầu đến cuối trên A-FR02, đánh dấu chạy lại là run mới. Ghi audit và commit riêng phần skill.

- [ ] Đọc hướng dẫn gọi skill vừa tạo; chạy thử một lần trước khi quay. Không ghi demo thành công nếu chưa chạy được.
- [ ] Mở công cụ quay màn hình máy tính. Bắt đầu quay trước khi gọi skill.
- [ ] Quay theo thứ tự: đưa đặc tả vào → gọi skill → xem EC và biên → bạn giải thích một chỗ review → thực hiện ca đã thiết kế → mở bằng chứng → xem báo cáo/issue tương ứng.
- [ ] Dừng quay, xem lại để chắc chữ đủ rõ và không bị mất phần thao tác.
- [ ] Vào YouTube → tạo/upload video → đặt chế độ người có link xem được nếu muốn → copy URL.
- [ ] Lưu URL vào `videos/README.md`; ghi rõ chức năng demo và nội dung video. Mở link bằng cửa sổ ẩn danh để kiểm tra xem được.

## 15. Gom thành báo cáo chính

- [ ] Gửi:

> Tổng hợp các file đã hoàn thành thành reports/main-report.md và reports/bug-report.md. Main report phải có Domain và BVA của đủ A/B/C/D, giải thích từng bước, review, kết quả, độ phủ và AI gaps. Giữ mọi trạng thái chưa chạy/bị chặn; không bịa kết quả. Bug report dẫn issue và ảnh. Cập nhật README theo số liệu thực, không tự cho điểm tối đa. Ghi audit và commit nội dung báo cáo.

- [ ] Mở báo cáo; kiểm tra có cả **4 chức năng**, ảnh mở được và link issue đúng.
- [ ] Gửi nhận xét của bạn về AI đã sai/thiếu/khó hiểu ở đâu, bạn đã kiểm tra/sửa gì. Phản hồi “hướng dẫn ban đầu khó hiểu” có thể dùng nếu bạn muốn, nhưng không thay cho phân tích kỹ thuật thực tế khi có.
- [ ] Nhờ tôi viết nháp `reports/ai-critique.md` dài **200–300 từ** từ các trải nghiệm thật đó; bạn đọc, sửa và xác nhận nội dung phản ánh đúng quá trình của mình.
- [ ] Nhờ tôi tổng hợp AI Audit cùng các output lưu rời vào `reports/ai-audit.md` để xuất PDF; giữ rõ những khoảng lịch sử còn thiếu. Không tự tạo lại prompt/output không có bản gốc.

## 16. Xuất PDF và kiểm tra

Máy hiện có `pandoc`. Bạn có thể chuyển Markdown thành HTML rồi dùng trình duyệt lưu PDF. Chạy từ thư mục gốc:

```bash
cd /home/zinn/zinn/test/hw02
pandoc reports/main-report.md -s --metadata title="HW02 - Nguyen Le The Vinh - 23120190" -o reports/main-report.html
pandoc reports/ai-audit.md -s --metadata title="AI Audit Report" -o reports/ai-audit.html
pandoc reports/ai-critique.md -s --metadata title="AI Critique" -o reports/ai-critique.html
```

- [ ] Mở từng `.html` trong trình duyệt.
- [ ] Nhấn `Ctrl+P` → chọn **Save to PDF/Lưu thành PDF** → chọn **All pages/Tất cả trang**.
- [ ] Lưu đúng tên `main-report.pdf`, `ai-audit.pdf`, `ai-critique.pdf` vào thư mục `reports`.
- [ ] Mở lại từng PDF: kiểm tra tiếng Việt, bảng không mất cột, ảnh hiện đầy đủ và audit chứa output nguyên văn chứ không chỉ link.
- [ ] Nếu bảng quá rộng hoặc ảnh mất, gửi tôi tên file/trang để chỉnh bản nguồn rồi xuất lại. Không tiếp tục đóng gói PDF lỗi.

## 17. Tự chấm, xuất commit log và kiểm tra cuối

- [ ] Mở README, tự điền điểm cho A /25, B /25, C /25, D /15, Skills /10. Mỗi dòng dẫn sản phẩm làm căn cứ. Tổng không quá 100.
- [ ] Gửi tôi:

> Kiểm tra bài nộp theo từng mục bắt buộc của PDF HW02. Đối chiếu số liệu README với execution, issue, ảnh, video, audit và các PDF. Chỉ rõ thiếu gì; không sửa kết quả để đạt điểm. Ghi audit cho lượt này, cập nhật lại bản audit xuất PDF sau cùng và commit các tài liệu đã hoàn thiện trước khi xuất commit log.

- [ ] Hoàn tất phần thiếu và xuất lại PDF bị ảnh hưởng, nhất là audit sau các lượt hỗ trợ cuối.
- [ ] Khi nội dung đã xong, chạy từ thư mục gốc:

```bash
git log --reverse --date=iso-strict --pretty=format:'%h | %ad | %an | %s' > git-commit-log.txt
```

- [ ] Mở log và kiểm tra thấy các bước của đủ bốn chức năng. Nếu chỉ có commit upload PDF, bài làm chưa được commit theo yêu cầu.
- [ ] Đảm bảo `README.md` nêu URL SUT và commit dùng để chạy; repo lồng `eshop-sut` không tự đóng gói đầy đủ khi chỉ có gitlink.

## 18. Đóng ZIP và nộp Moodle

Chỉ làm bước này sau khi đã tự chấm. Ví dụ **nếu điểm thật bạn tự chấm là 90**, tên ZIP là `23120190_HW02_AI_DomainTesting_090.zip`. Đổi `090` cho khớp điểm của bạn; không mặc định chọn 100.

- [ ] Từ thư mục gốc, chạy lệnh sau sau khi đã sửa điểm trong tên file:

```bash
zip -r 23120190_HW02_AI_DomainTesting_090.zip README.md reports features evidence scripts skills videos audit AI_AUDIT_REPORT.md git-commit-log.txt
```

- [ ] Mở ZIP bằng trình quản lý file, giải nén vào thư mục tạm khác.
- [ ] Mở README, ba PDF, ảnh và link YouTube/GitHub. Kiểm tra không phụ thuộc đường dẫn `/home/zinn/...` để đọc tài liệu nộp.
- [ ] Vào Moodle → bài HW02 → tải ZIP lên → thực hiện nút xác nhận nộp nếu Moodle yêu cầu.
- [ ] Kiểm tra Moodle hiển thị trạng thái đã nộp và đúng tên file; chụp xác nhận để giữ lại.

**Bạn nên bắt đầu ngay ở bước 1 và dừng ở cuối bước 4 để kiểm tra môi trường. Chưa cần đọc và thực hiện hết các bước trong một lần.**
