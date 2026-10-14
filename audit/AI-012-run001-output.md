# AI-012 — Output nguyên văn

## Thông báo tiến độ

Tôi sẽ điền Run 001 theo những gì bạn đã báo. Tôi sẽ ghi rõ phần nào bạn xác nhận đã qua và phần nào chưa có bằng chứng cụ thể; hiện screenshot vẫn chưa được cung cấp, và A-DT-001 còn kiểm tra token/header ngoài các thao tác UI trong checklist.

## File: features/A-FR02/06-execution.md

# A-FR02 — Nhật ký thực thi

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2.

## Run 001 — A-DT-001: Đăng nhập Web đúng; lưu và gửi token

- **TC ID:** A-DT-001.
- **Thời điểm:** 15/10/2026; giờ/phút người chạy chưa cung cấp.
- **Môi trường:** Web tại `http://localhost:5173`; OS của workspace là Ubuntu 26.04.1 LTS, nhưng chưa xác nhận trình duyệt/phiên bản thực sự dùng cho run. SUT baseline dự kiến `85af3ba875c88283615e22cb108f13e2fccaf0e9`; chưa ghi nhận commit runtime riêng cho lần chạy.
- **Tiền điều kiện:** Theo mô tả thực thi, người chạy đã vào trang login và nếu cần đã đăng xuất trước đó. Việc đăng nhập thành công cho thấy tài khoản được chấp nhận ở lần đó; counter n=0, chưa khóa và client không token cũ chưa có ảnh/log xác nhận riêng.
- **Dữ liệu:** Email `test@eshop.com`; mật khẩu test `Test1234!`.
- **Thao tác đã làm:** Theo người chạy, đã mở `/login`, nhập email/mật khẩu, bấm **Sign In** một lần và quan sát chuyển về trang chủ với người dùng đăng nhập.
- **Expected:** Request login thành công; có JWT token và thông tin user; client lưu token và gửi `Authorization: Bearer <token>` khi phát request cần xác thực. Xem A-DT-001.
- **Actual:** Người chạy báo “mọi thứ đều pass”. Phần chi tiết được xác nhận trong hội thoại là đăng nhập thành công, chuyển về trang chủ và thấy người dùng đã đăng nhập. Chưa có response/network log hoặc quan sát storage/header để xác nhận riêng các checkpoint token.
- **Status:** **Chưa hoàn tất toàn bộ A-DT-001.** UI login được người chạy báo thành công; checkpoint token được lưu/gửi chưa được ghi nhận. Không đánh dấu toàn TC là Pass cho tới khi xác nhận checkpoint còn lại.
- **Bằng chứng:** Chưa có screenshot login được lưu. Sau khi chụp, đặt tại `evidence/A-FR02/A-DT-001-login-success.png` hoặc cập nhật path đúng. Ảnh hiện có trong hội thoại là trang Admin, không dùng làm bằng chứng cho ca login.

### Còn cần ghi để đóng A-DT-001

1. Chụp trang sau đăng nhập và lưu screenshot với TC ID.
2. Trong DevTools → Network, mở `POST /api/login`, xác nhận response có token/user; không đưa nguyên token vào ảnh công khai.
3. Kiểm tra client đã lưu token ở nơi implementation dùng.
4. Mở request cần xác thực do client gửi (ví dụ `GET /api/users/me`) và xác nhận request header Bearer khớp token vừa nhận. Không tự thêm header bằng tay.
5. Nếu đã làm các bước 2–4, gửi đúng quan sát và log/ảnh để cập nhật Actual/Status. Nếu chưa làm, phần đó còn Not run.

Đây là ghi nhận theo lời người chạy; không tạo thêm kết quả nào ngoài thông tin đã cung cấp. Không sửa SUT.

## File: reports/work-progress.md

# Tiến độ HW02 — Nguyễn Lê Thế Vinh — 23120190

**Vai trò nhóm:** Thành viên 2. **Cập nhật:** 14/10/2026 (UTC+07:00).

## Bước chuẩn bị tài liệu

- [x] Đối chiếu phân công thành viên 2 và xác nhận bốn chức năng.
- [x] Ghi baseline SUT `85af3ba875c88283615e22cb108f13e2fccaf0e9` và nguồn yêu cầu.
- [x] Tạo README với rubric 25/25/25/15/10, để trống điểm tự chấm.
- [x] Tạo environment.md với thông tin công cụ quan sát được và các mục chưa xác nhận.
- [x] Tạo file theo dõi tiến độ này.

Đây là trạng thái tạo tài liệu của AI; không thể hiện sinh viên đã review thiết kế hoặc đã chạy SUT. Nhật ký tương tác của bước này nằm ở **AI-002** trong [AI Audit](../AI_AUDIT_REPORT.md).

## Tiến độ từng chức năng

“Chưa ghi nhận” nghĩa là chưa có sản phẩm/bằng chứng được xác nhận trong bộ bài làm này.

| Chức năng | Yêu cầu/input-output | EC | Ca Domain | Ca BVA | Review sinh viên | Thực thi | Bug/AI gaps |
|---|---|---|---|---|---|---|---|
| A-FR02 — Đăng nhập/khóa Web | Đã có bản nháp 01-requirements.md (AI-007) | Đã có bản nháp 02-domains.md (AI-008) | Đã có 24 ca nháp 03-domain-cases.md (AI-009) | Đã có 12 ca nháp 04-boundary-cases.md (AI-010) | Đã đọc và hiểu ca (AI-011); chưa xác nhận phê duyệt thiết kế | A-DT-001 UI được báo thành công; toàn TC còn checkpoint token và bằng chứng (AI-012) | Chưa ghi nhận |
| B-FR07 — Giỏ hàng Web | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận |
| C-FR14 — Danh mục Admin | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận |
| D-MREG — Đăng ký Mobile | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận |

Không chuyển một ô thành hoàn thành chỉ vì AI đã đề xuất nội dung. Review chỉ ghi khi có nhận xét thật của sinh viên; execution chỉ ghi khi có lần chạy và bằng chứng.

## Quy trình lưu file và commit khi thực hiện

Mỗi chức năng dùng thư mục `features/<mã-chức-năng>/`, với các bước:

| Thứ tự | File dự kiến | Nội dung |
|---|---|---|
| 1 | `01-requirements.md` | Nguồn yêu cầu, input/output, trạng thái |
| 2 | `02-domains.md` | Lớp tương đương và đại diện |
| 3 | `03-domain-cases.md` | Các ca Domain có thao tác và expected |
| 4 | `04-boundary-cases.md` | Biên và các ca BVA |
| 5 | `05-review-coverage.md` | Review thực tế, sửa đổi và truy vết |
| 6 | `06-execution.md` | Run ID, actual, status và evidence |
| 7 | `07-bugs-and-ai-gaps.md` | Bug/issue, thiếu sót AI có bằng chứng |

Tạo commit sau từng bước thực sự hoàn thành của từng chức năng. Chỉ stage đường dẫn liên quan; giữ nguyên các thay đổi khác. Không điền trước các file execution hoặc human review.

## Các phần tổng hợp còn lại

- [ ] Skill Domain/BVA tái sử dụng và video demo YouTube.
- [ ] Báo cáo chính Markdown + PDF cho đủ bốn chức năng.
- [ ] Bug report, GitHub Issues và ảnh trên từng issue.
- [ ] AI Audit đầy đủ và PDF; xử lý các phần lịch sử còn thiếu bằng dữ liệu thật.
- [ ] AI Critique 200–300 từ, Markdown + PDF.
- [ ] Test summary thực tế và bảng tự chấm.
- [ ] Commit log, kiểm tra ZIP và nộp Moodle.

## Kiểm tra mở môi trường

- [x] Backend trả danh sách sản phẩm theo JSON sinh viên gửi (AI-004).
- [x] Web hiển thị danh sách sản phẩm theo ảnh sinh viên gửi (AI-005).
- [x] Admin hiển thị ba danh mục mẫu theo ảnh sinh viên gửi (AI-006).
- [ ] Lưu bản ảnh gốc vào repo và bổ sung phiên bản trình duyệt.
- [ ] Chuẩn bị môi trường Mobile.

Các dấu hoàn thành ở đây chỉ ghi khả năng mở môi trường, không phải Pass test chức năng hay human review.

## Review A-FR02

- [x] Sinh viên xác nhận đã đọc và hiểu các ca kiểm thử Domain/BVA (AI-011).
- [x] Tạo ma trận review/truy vết `features/A-FR02/05-review-coverage.md`.
- [ ] Review kỹ thuật expected, lớp chưa rõ và protocol đo đúng 30 giây.
- [ ] Chốt harness/fixture thời gian hoặc ghi giới hạn nếu không khả thi.
- [ ] Thực thi ca và ghi actual/bằng chứng; hiện chưa có ca nào chạy.

Phản hồi “đã hiểu” không được coi là phê duyệt tính đúng đắn của toàn bộ thiết kế hoặc xác nhận đã chạy test.

## Thực thi A-FR02

- [x] Ghi nhận Run 001 cho A-DT-001 theo báo cáo người chạy: login UI thành công, chuyển về trang chủ và thấy tài khoản đăng nhập.
- [ ] Lưu screenshot login vào `evidence/A-FR02/`.
- [ ] Xác nhận response/token, lưu token phía client và Bearer header do client gửi. Chưa ghi nhận các checkpoint này.
- [ ] Hoàn tất Status cho toàn TC sau khi có đủ bằng chứng.

Phản hồi “mọi thứ đều pass” được giữ kèm phạm vi chi tiết thực tế đã mô tả. A-DT-001 kiểm tra cả token, nên toàn TC chưa đóng chỉ từ chuyển trang UI. Xem [execution log](../features/A-FR02/06-execution.md).

## Việc tiếp theo

Hoàn tất các checkpoint còn thiếu của A-DT-001 bằng DevTools và screenshot. Sau đó tiếp tục những ca thiết kế đã review; không reset/restart backend khi cần giữ trạng thái khóa.

## Phản hồi cuối

Đã điền Run 001 cho **A-DT-001** vào `features/A-FR02/06-execution.md` theo kết quả bạn báo: đăng nhập thành công, chuyển về trang chủ và thấy người dùng đã đăng nhập.

Tôi ghi trạng thái là **chưa hoàn tất toàn ca** vì A-DT-001 còn kiểm tra token được lưu và header Bearer do client gửi; hiện chưa có quan sát cụ thể cho hai phần đó. Screenshot cũng chưa có trong repo nên được ghi là bằng chứng còn thiếu. Khi bạn bổ sung ảnh và xác nhận Network/Storage, tôi sẽ cập nhật Status cuối cùng.
