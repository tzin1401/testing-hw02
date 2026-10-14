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

> Tổng hợp các lỗi A-FR02 có đủ bằng chứng thành 07-bugs-and-ai-gaps.md; gộp ca cùng lỗi và tách các lỗi độc lập. Chuẩn bị nội dung issue để tôi đăng, gồm bước tái hiện, expected/actual, severity có lý do, TC ID và ảnh cần đính kèm. Chỉ ghi AI gap có chứng cứ từ output trước và review/thực thi. Ghi audit và commit bước này.

- [ ] Mở `https://github.com/tzin1401/testing-hw02/issues` → **New issue**.
- [ ] Dán tiêu đề và nội dung đã kiểm tra. Kéo ảnh bug từ thư mục `evidence/A-FR02` vào ô nội dung, chờ upload xong. Preview để chắc ảnh hiển thị.
- [ ] Bấm tạo issue. Copy URL issue vào báo cáo bug cạnh TC liên quan.
- [ ] Nếu ảnh chưa đủ thể hiện lỗi thời gian/API, thêm ảnh terminal/log và đính kèm log đầy đủ; không chỉ chụp code.
- [ ] Nhờ tôi cập nhật các URL issue và commit phần bổ sung.

**Đạt bước này:** A có đủ thiết kế, review, thực thi, bằng chứng, issue và phân tích AI. Bây giờ mới làm B.

## 10. Làm giỏ hàng Web — B-FR07

- [ ] Làm lại **bước 5–6**, thay `A-FR02` bằng `B-FR07`, căn cứ SRS `FR-07` và ràng buộc số lượng liên quan `FR-06`. Mỗi bước vẫn có file và commit riêng.
- [ ] Khi yêu cầu thiết kế BVA, dùng **số lượng 0/1/2**, thêm số âm/thập phân; không dùng số lần sai hoặc 30 giây của A.
- [ ] Yêu cầu bảng test có thêm trùng sản phẩm, tăng/giảm, xóa/hủy xóa, giỏ rỗng và tính tiền.
- [ ] Review xong mới thực hiện các thao tác dưới đây theo TC tương ứng.

| Việc kiểm tra | Thao tác bạn thực hiện                                                             | Điều cần quan sát theo SRS                               |
| --------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| Giỏ rỗng      | Reload Web để bắt đầu giỏ mới; bấm Giỏ hàng                                  | Có hình minh họa và thông báo rỗng                    |
| Một sản phẩm | Bấm logo EShop → chọn sản phẩm → nhập 1 → bấm thêm → bấm Giỏ hàng        | Đúng sản phẩm, số lượng và thành tiền              |
| Gộp dòng      | Dùng link trong ứng dụng quay lại cùng sản phẩm → thêm lần nữa → vào giỏ | Cùng sản phẩm phải nằm một dòng và tăng số lượng |
| Điều chỉnh   | Tìm nút +/− ở dòng sản phẩm, thử tăng rồi giảm                              | Có nút; số lượng và tổng tiền cập nhật đúng      |
| Xóa            | Bấm Xóa một dòng                                                                   | Có dialog; hủy giữ nguyên; đồng ý mới xóa           |
| Nhãn tổng     | Quan sát phần tổng tiền                                                            | Ghi “Tổng cộng”                                          |
| Tính tiền     | Dùng 2 sản phẩm giá đã biết, tính tay`giá × số lượng`, rồi cộng       | Thành tiền từng dòng và tổng đều đúng              |

**Lưu ý khi thao tác:** sau khi giỏ đã có dữ liệu, dùng link/nút trong ứng dụng; không gõ URL mới hoặc reload vì state giỏ hiện tại có thể bị mất. Khi bắt đầu ca độc lập, mới chủ động reload và ghi đây là bước reset.

Nếu lần bấm “Thêm vào giỏ” đầu tiên không thêm được, ghi rõ trở ngại chuẩn bị dữ liệu. Có thể bấm lại để chuẩn bị giỏ và ghi số lần thực tế; không lặng lẽ coi đó là một lần thêm thành công. Phần chi tiết sản phẩm thuộc người khác, chỉ ghi liên hệ/phụ thuộc cần thiết trong bài của bạn.

Nếu không có nút +/−: chụp ảnh → ca “có nút +/−” là Fail → các ca bấm nút tương ứng là Blocked. Không tự sửa code để tiếp tục.

- [ ] Lưu ảnh ở `evidence/B-FR07`, kết quả ở `features/B-FR07/06-execution.md`.
- [ ] Lặp lại bước 9 để tổng hợp bug/AI gaps, tạo issue và commit cho B.

## 11. Làm danh mục Admin — C-FR14

- [ ] Lặp lại bước 5–6 cho `C-FR14`, lấy SRS `FR-14`; thêm phân quyền thao tác ghi danh mục từ `FR-12`.
- [ ] BVA dùng tên dài **0/1/2 ký tự**. Không tự đặt giới hạn 255 ký tự. SRS chỉ bắt buộc **Thêm/Xem/Xóa**, không bắt buộc bạn làm chức năng Sửa.
- [ ] Đăng nhập `http://localhost:5174` bằng tài khoản admin → bấm **Danh mục**.
- [ ] Ghi lại/chụp danh sách trước khi thử.
- [ ] Với từng dòng dưới, nhập vào **Tên danh mục mới**, bấm **Thêm mới**, quan sát và chụp kết quả:

| Dữ liệu nhập          | Kết quả mong đợi                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Để trống hoàn toàn  | Từ chối, không tạo danh mục rỗng                                                                       |
| `A`                    | Cho tạo vì tên không rỗng và không có giới hạn tối thiểu khác                                   |
| `AB`                   | Cho tạo                                                                                                     |
| `Vinh23120190-DanhMuc` | Tạo được, xem thấy đúng tên                                                                          |
| Ba dấu cách            | Ca kiểm tra cách hiểu “không trống”; ghi rõ diễn giải trim trong thiết kế trước khi kết luận |

- [ ] Ghi ID của danh mục bạn vừa tạo. Bấm **Xóa** đúng dòng đó, kiểm tra chỉ dòng đó biến mất. Không xóa dữ liệu mẫu để làm bước này.
- [ ] Để kiểm thử API thiếu token/user thường, gửi:

> Tạo hướng dẫn/script chạy các ca quyền truy cập API danh mục C-FR14 đã review. Chỉ tác động dữ liệu test do tôi tạo, ghi request/response và token role; không mở rộng sang toàn bộ Admin. Chưa thực thi; đưa lệnh để tôi chạy và cách cleanup. Ghi audit và commit phần chuẩn bị.

- [ ] Chạy script, lưu kết quả. Với thiếu/null ở API, cũng chạy theo payload trong bảng ca, không coi thao tác UI là đã thử được các payload đó.
- [ ] Lưu ảnh vào `evidence/C-FR14`, điền execution, làm bug/AI gaps và issue như bước 8–9.

**Đạt bước này:** C có đầy đủ bảy phần, tương tự A và B.

## 12. Mở ứng dụng Mobile

Chọn đường đi đơn giản: điện thoại Android/iPhone có Expo Go và kết nối cùng Wi-Fi với máy tính. Nếu bạn không có thiết bị hoặc gặp lỗi tương thích Expo, báo cho tôi để hướng dẫn emulator; chưa tính phần Mobile đã hoàn thành bằng việc test API.

- [ ] Mở terminal mới ở máy tính, chạy:

```bash
hostname -I
```

- [ ] Trong kết quả, xác định IP Wi-Fi/LAN của máy. Nếu có nhiều IP và không biết chọn IP nào, gửi kết quả cho tôi.
- [ ] Trên trình duyệt điện thoại, thử `http://IP-CUA-MAY:3000/api/products`, thay `IP-CUA-MAY` bằng địa chỉ vừa xác định.
- [ ] Chỉ tiếp tục khi điện thoại xem được danh sách sản phẩm; nếu không, gửi lỗi kết nối.
- [ ] Trong VS Code, mở `eshop-sut/frontend-mobile/App.js`, tìm `const API_URL`. Chỉ thay IP trong URL bằng IP máy của bạn, giữ `/api`. Ví dụ nếu IP thật là `192.168.1.20`:

```javascript
const API_URL = "http://192.168.1.20:3000/api";
```

- [ ] Ghi thay đổi cấu hình vào `reports/environment.md` và lưu diff từ thư mục gốc:

```bash
cd /home/zinn/zinn/test/hw02
git -C eshop-sut diff -- frontend-mobile/App.js > reports/mobile-config.patch
```

- [ ] Mở **Terminal Mobile**, chạy:

```bash
cd /home/zinn/zinn/test/hw02/eshop-sut/frontend-mobile
npm ci
npx expo start
```

- [ ] Mở Expo Go/quét QR theo hướng dẫn terminal. Chờ app hiện sản phẩm.
- [ ] Chụp ảnh app đang chạy. Ghi loại điện thoại, Android/iOS và phiên bản vào environment.

## 13. Làm đăng ký Mobile — D-MREG

- [ ] Lặp lại bước 5–6 cho `D-MREG`, nguồn SRS `FR-20` + `FR-01`.
- [ ] BVA dùng mật khẩu dài **7/8/9**, đồng thời giữ đủ hoa/thường/số/ký tự đặc biệt.
- [ ] Trên app, vào màn hình **Đăng nhập** → chọn **Đăng ký**.
- [ ] Chụp toàn bộ form để kiểm tra có đủ Họ tên, Email, Mật khẩu và Xác nhận mật khẩu không.
- [ ] Theo ca đã review, nhập Họ tên `Nguyen Le The Vinh`. Mỗi ca thành công phải dùng email test mới, ví dụ thêm số lần chạy vào `vinh23120190-run001@example.com`.
- [ ] Lần lượt thử ba ca, mỗi lần ghi kết quả riêng:

| Password      | Độ dài | Expected riêng cho điều kiện độ dài |
| ------------- | --------: | ------------------------------------------ |
| `Aa1!bbb`   |         7 | Từ chối vì quá ngắn                   |
| `Aa1!bbbb`  |         8 | Đạt điều kiện độ dài               |
| `Aa1!bbbbb` |         9 | Đạt điều kiện độ dài               |

Nếu có confirm, nhập giống password để ca chỉ kiểm tra độ dài. Nếu không có confirm, ghi lỗi thiếu trường; các ca cần nhập confirm bị Blocked. Các phép kiểm tra khác vẫn có thể quan sát độc lập, nhưng không gọi cả chức năng đăng ký là đạt toàn bộ yêu cầu.

- [ ] Chạy tiếp các ca trong bảng: thiếu riêng chữ hoa/thường/số/ký tự yêu cầu; email sai/rỗng/trùng; tên rỗng; confirm sai nếu có trường; chuyển về login sau đăng ký thành công.
- [ ] Sau mỗi ca, chụp màn hình điện thoại; chuyển ảnh về máy và lưu trong `evidence/D-MREG` với TC ID.
- [ ] Khi lỗi hiện, kiểm tra trên điện thoại có nhìn thấy/đọc được thông báo và có bị bàn phím che không. Ghi kết quả thực tế, phân biệt yêu cầu bắt buộc và quan sát usability bổ sung.
- [ ] Tổng hợp execution, bug/AI gaps, GitHub Issues và commit như các chức năng trước.

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
