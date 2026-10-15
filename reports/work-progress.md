# Tiến độ HW02 — Nguyễn Lê Thế Vinh — 23120190

**Vai trò nhóm:** Thành viên 2. **Cập nhật:** 15/10/2026 (UTC+07:00).

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
| A-FR02 — Đăng nhập/khóa Web | Requirements A-R01–A-R11 (AI-007) | Các EC đã ghi (AI-008) | 24 ca thiết kế (AI-009) | 12 ca thiết kế (AI-010) | Sinh viên nói đã đọc/hiểu (AI-011); chưa xác nhận phê duyệt thiết kế | Run 001 user-reported; Run 003 API, Run 004 UI, Run 005 ảnh bổ sung; 33/36 TC có actual/checkpoint, 3 mốc clock Not run; xem 06-execution | 3 bug đã đăng Issue #1–#3 có ảnh/labels; AI gaps trong harness ở 07 |
| B-FR07 — Giỏ hàng Web | Requirements B-R01–B-R13 (AI-020); câu hỏi mở được đánh dấu | EC B-EC-01–B-EC-41 (AI-021); các lớp chưa rõ giữ dạng thăm dò | 20 ca B-DT-001–020 (AI-022) | 6 ca B-BV-001–006 (AI-023) | Người dùng xác nhận đã hiểu toàn bộ ca (AI-024); chưa phê duyệt expected | Run `20261014T191645Z-BFR07-UI`: 1 Pass / 2 Fail / 23 Blocked / 0 Not run; xem `features/B-FR07/06-execution.md` | 2 issue draft chưa đăng; AI gaps và side effect API ghi ở `07-bugs-and-ai-gaps.md` (AI-025) |
| C-FR14 — Danh mục Admin | C-R01–C-R06 (AI-028) | C-EC-01–C-EC-15 (AI-029) | 18 ca C-DT-001–018 (AI-031) | 3 name-boundary cases + 2 ID probes (AI-032) | Người dùng nói đã đọc/hiểu; chưa phê duyệt expected (AI-033). Coverage có gap C-R01 UI access. | Chưa chạy | Chưa ghi nhận |
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
- [ ] Bug report, GitHub Issues và ảnh trên từng issue cho đủ bốn chức năng (A-FR02 Issues #1–#3 đã hoàn thành).
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
- [x] Thực thi ca API/Web có thể chạy, ghi Run 003/004 cùng các trạng thái và giới hạn (AI-017).
- [ ] Tạo harness đồng hồ tại server hoặc giữ A-BV-007/011/012 là Not run với lý do.

Phản hồi “đã hiểu” không được coi là phê duyệt tính đúng đắn của toàn bộ thiết kế hoặc xác nhận đã chạy test.

## Thực thi A-FR02

- [x] Giữ Run 001 theo lời người chạy; không dùng thay bằng chứng mới.
- [x] Run 004 có screenshot UI, login response, token local và request Bearer 200 cho A-DT-001.
- [x] Ghi status/actual/evidence cho cả 24 Domain và 12 BVA; giữ rõ observation-only, Fail/Blocked và 3 Not run trong 06-execution.md.
- [x] Run 005 chụp UI bổ sung; ảnh A-BUG-001/002/003 được đính kèm trực tiếp trên GitHub Issues #1–#3.

Phản hồi “mọi thứ đều pass” ở Run 001 vẫn được giữ như lời người chạy và tách khỏi các run có log tự động. Xem [execution log](../features/A-FR02/06-execution.md).

## Script hỗ trợ A-FR02

- [x] Tạo `scripts/A-FR02-login-sequence.py` và hướng dẫn `scripts/README-A-FR02.md`.
- [x] Script tuần tự trước đó đã tạo (AI-013); Run 002 `--attempts 2` lưu riêng.
- [x] Tạo và chạy `scripts/A-FR02-full-execution.mjs`; ghi request/response redacted, monotonic, state SQLite read-only và test labels.
- [x] API run 33 tài khoản; UI run 13 tài khoản trong Chrome headless profile cô lập; artifacts ở `evidence/A-FR02/full-runs/`.
- [ ] Giữ nguyên 46 tài khoản test trong DB local cho tới khi bằng chứng được lưu và chủ sở hữu yêu cầu cleanup.

Script tạo tài khoản mới bằng API đăng ký cho mỗi lần chạy. Terminal output không lưu password/token; state DB đọc-only là quan sát bổ trợ. Đo monotonic là ở client và không chứng minh thời điểm server so sánh đúng 30 giây.

## Việc tiếp theo

A-FR02 đã có execution table và GitHub Issues #1–#3 có ảnh. Còn review kỹ thuật, quyết định về harness clock cho ba mốc chưa chạy, và tiếp tục chức năng B-FR07. Không xóa tài khoản test hoặc restart backend khi chưa cần và chưa bảo toàn bằng chứng.


## Thực thi B-FR07 — AI-025

- [x] Đọc lại FR-06/FR-07, API spec, requirements, EC, Domain/BVA cases và review coverage; xác minh Web/backend/API đang phản hồi trước run.
- [x] Chạy Web UI bằng Chrome headless riêng; 26 ca, 107 screenshot checkpoint có timestamp UTC/monotonic.
- [x] Ghi từng TC: **1 Pass, 2 Fail, 23 Blocked, 0 Not run**. Hai Fail là empty state thiếu illustration và Add hợp lệ không thêm hàng. Không coi API request/code là test UI.
- [x] Không sửa/xóa sản phẩm, không restart backend, không seed cart qua API; reset các ca bằng UI.
- [x] Tạo `features/B-FR07/06-execution.md`, `07-bugs-and-ai-gaps.md`; hai issue draft có nội dung và ảnh nhưng chưa đăng.
- [x] Cập nhật audit và tiến độ.

**Giới hạn/side effect:** Run thử đầu bị loại do harness nhập quantity sai (1 thành 11), nhưng đã gửi một API POST exploratory quantity 1.5. Qualified run cũng gửi API POST exploratory 1.5; response HTTP 200. GET chỉ đọc cho thấy hai entry, nhưng không có API cart baseline nên không thể phân bổ; UI không hiển thị entry để dọn. Không gọi API delete hoặc sửa DB. Chi tiết trong execution notes và AI Audit AI-025.


- [x] AI-026: đối chiếu B-FR07 bug với SRS, tách 2 lỗi độc lập và chuẩn bị issue draft; chưa đăng GitHub.

- [x] AI-027: đăng hai GitHub Issue B-FR07 kèm ảnh, xác minh body/labels/URL; #4 và #5 đang OPEN.

- [x] AI-033: ghi nhận người dùng hiểu các ca C-FR14 và tạo ma trận review/coverage; không xem là phê duyệt.
