# Báo cáo kiểm thử HW02 — EShop

- **Sinh viên:** Nguyễn Lê Thế Vinh — MSSV 23120190 — Thành viên 2
- **SUT:** EShop, baseline `85af3ba875c88283615e22cb108f13e2fccaf0e9`
- **Phạm vi:** A-FR02, B-FR07, C-FR14, D-MREG
- **Nguồn:** SRS/ API specification ở baseline, phân công nhóm và slide Domain Testing/BVA. Expected được lấy từ yêu cầu; chỗ yêu cầu chưa rõ được giữ làm câu hỏi/probe.

## Phương pháp

Với mỗi chức năng, tài liệu `01` trích yêu cầu, input, state, output và oracle; `02` phân lớp EC; `03` thiết kế Domain cases; `04` thiết kế BVA; `05` ghi nhận review người dùng theo đúng phản hồi; `06` ghi actual/status/evidence; `07` đối chiếu bug và AI gap. Ca âm cố gắng chỉ vi phạm một điều kiện. Không tự đặt giới hạn trên khi SRS không nêu. Kết quả partial/observation không được tính thành Pass/Fail.

## Tổng hợp số ca thiết kế

| Feature | TC thiết kế | Pass | Fail | Partial/observation | Blocked/Not run |
|---|---:|---:|---:|---:|---:|
| A-FR02 | 36 | 14 | 15 | 2 observation | 5 |
| B-FR07 | 26 | 1 | 2 | 0 | 23 |
| C-FR14 | 23 | 15 | 4 | 3 | 1 |
| D-MREG | 20 | 0 | 1 | 15 | 4 |
| **Tổng** | **105** | **30** | **22** | **20** | **33** |

Cách tính có giải thích trong [README](../README.md). Những số liệu này mô tả hồ sơ hiện tại, không phải điểm rubric. Bảng test chi tiết và bằng chứng gốc nằm trong từng `06-execution.md` và thư mục evidence tương ứng.

## A-FR02 — Đăng nhập và khóa tài khoản Web

Run evidence ghi 14 Pass, 15 Fail, hai ca partial/blocked vì threshold bị khóa sớm, hai observation-only và ba biên thời gian chưa chạy. Các lỗi có expected rõ gồm bộ đếm tăng 2 thay vì 1, threshold khóa xảy ra sớm, thời lượng khóa khác yêu cầu và input email trên Web không có browser type validation như thiết kế. Ba biên yêu cầu điều khiển clock tại server không được kết luận từ đồng hồ client. Xem [execution](../features/A-FR02/06-execution.md), [bug report](../features/A-FR02/07-bugs-and-ai-gaps.md), [timing analysis](../features/A-FR02/timing-analysis.md).

## B-FR07 — Giỏ hàng Web

Run chính có 1 Pass, 2 Fail và 23 Blocked trên 26 TC thiết kế; lỗi thêm hợp lệ từ trang chi tiết làm hỏng setup. Run bổ sung tạo giỏ bằng đường Home/biến thể riêng, quan sát thêm: cùng sản phẩm không gộp dòng; thiếu nút `+/-`; xóa không hỏi xác nhận; nhãn “Tổng tạm tính”; phép tính dòng/tổng khớp ở checkpoint. Các phép thử `-SUP` không thay verdict của TC gốc. Không có kết luận về UB hay validation quantity app-level khi đường thêm hợp lệ chưa tạo được tiền đề. Xem [execution](../features/B-FR07/06-execution.md) và [bug report](../features/B-FR07/07-bugs-and-ai-gaps.md).

## C-FR14 — Quản lý danh mục Admin

23 TC thiết kế: 15 Pass, 4 Fail, 1 Blocked, 3 Observation. Fail gồm tên rỗng được nhận ở UI/biên 0 và API cho phép JWT role user POST/DELETE. GET authorization, whitespace và ID không tồn tại vẫn probes do oracle chưa đủ rõ. Guest checkpoint chỉ cho thấy form Admin Login. Lượt UI bổ sung dùng fixture role user đã xác minh trong DB clone: login API trả 200, Admin UI hiện “Bạn không phải là admin!” và không có admin token. Đây là bằng chứng UI riêng; API write tests vẫn là evidence khác. Xem [execution](../features/C-FR14/06-execution.md) và [bug report](../features/C-FR14/07-bugs-and-ai-gaps.md).

## D-MREG — Đăng ký Mobile

Run Pixel 9 emulator phát hiện form chỉ có ba trường, thiếu xác nhận mật khẩu. Trong 20 TC thiết kế, 1 Fail (thiếu field), 15 Partial (thao tác biến thể trên ba field), 2 Blocked (ca xác nhận), 2 Not run (BVA robustness riêng không có evidence hợp lệ). Các biến thể đã chấp nhận họ tên/email rỗng, email không có `@`, và email trùng; weak password probes bị từ chối. D-BV-002 độ dài 8 gặp network failure nên không kết luận. Các biến thể ba field không được tính Pass/Fail cho test case đầy đủ bốn trường. API-only duplicate test cũng tạo bản ghi thứ hai trên DB cô lập; không dùng API thay UI. Hai lượt automation mới cho D-BV-006/007 không tới được response đáng tin cậy và được loại khỏi kết quả. Xem [execution](../features/D-MREG/06-execution.md), [bug report](../features/D-MREG/07-bugs-and-ai-gaps.md).

## GitHub issues và bằng chứng

Issue #1–#8 đã tồn tại theo hồ sơ. Một số findings B/D mới phát hiện trong run bổ sung chưa được đăng thành issues mới; xem [bug report](bug-report.md) để biết issue hiện có, findings và attachment còn thiếu. Trước khi nộp cần xác minh trực tiếp từng issue có ảnh thật hiển thị/đính kèm theo yêu cầu của đề. Local screenshot hoặc JSON chưa đồng nghĩa đã upload lên issue.

## Kết luận và giới hạn

Bài làm có thiết kế 105 TC cho bốn chức năng, evidence của các run đã thực hiện và một số findings tái hiện được. Tuy nhiên còn nhiều ca Blocked/partial/Not run, findings mới chưa được xuất bản đầy đủ, và bộ tài liệu nộp cần đồng bộ lại trước khi tạo ZIP cuối. Báo cáo không tự chấm điểm; sinh viên cần tự đối chiếu rubric, duyệt nội dung AI Critique và xác minh GitHub/evidence. Skill/video không được đánh giá trong lần rà soát này.
