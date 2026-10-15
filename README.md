# HW02 — Domain Testing on EShop

- **Sinh viên:** Nguyễn Lê Thế Vinh — **MSSV:** 23120190
- **Phân công:** Thành viên 2
- **Repo bài làm:** [tzin1401/testing-hw02](https://github.com/tzin1401/testing-hw02)
- **SUT baseline:** `85af3ba875c88283615e22cb108f13e2fccaf0e9`

## Phạm vi và nguồn

| Mã | Chức năng | Cơ sở yêu cầu |
|---|---|---|
| A-FR02 | Đăng nhập/khóa tài khoản Web | SRS FR-02 |
| B-FR07 | Giỏ hàng Web | SRS FR-07; quantity tham chiếu FR-06 |
| C-FR14 | Thêm/xem/xóa danh mục Admin | SRS FR-14; quyền ghi tham chiếu FR-12 |
| D-MREG | Đăng ký Mobile | FR-20 và quy tắc FR-01 |

Chi tiết nguồn, môi trường và các yêu cầu chưa rõ: [reports/environment.md](reports/environment.md), [LAM_HW02_TUNG_BUOC.md](LAM_HW02_TUNG_BUOC.md), cùng các file `features/<mã>/01-requirements.md`.

## Bảng tự đánh giá

Điểm để trống cho sinh viên tự chấm sau khi đối chiếu rubric. AI không điền điểm.

| Hạng mục | Tối đa | Tự chấm | Dẫn chứng |
|---|---:|---:|---|
| A-FR02 — Domain/BVA | 25 |  | [Thiết kế và execution](features/A-FR02/) |
| B-FR07 — Domain/BVA | 25 |  | [Thiết kế và execution](features/B-FR07/) |
| C-FR14 — Domain/BVA | 25 |  | [Thiết kế và execution](features/C-FR14/) |
| D-MREG — Mobile Domain/BVA | 15 |  | [Thiết kế và execution](features/D-MREG/) |
| Skill/video theo rubric lớp | 10 |  | Skill và video cần được đối chiếu riêng; xem [videos/README.md](videos/README.md) |
| **Tổng** | **100** |  | Điểm tự chấm chưa được nhập. |

## Test summary theo TC thiết kế

Các trạng thái dưới đây đếm TC ID duy nhất trong bốn bộ thiết kế (105 TC). `Partial/observation` không được cộng vào Pass/Fail; `Blocked/Not run` là chưa có kết quả đầy đủ. Những biến thể bổ sung có ID `-SUP` được báo riêng trong execution log, không cộng vào mẫu số 105.

| Chức năng | Thiết kế | Pass | Fail | Partial / observation | Blocked / Not run |
|---|---:|---:|---:|---:|---:|
| A-FR02 | 36 | 14 | 15 | 2 observation | 5 |
| B-FR07 | 26 | 1 | 2 | 0 | 23 |
| C-FR14 | 23 | 15 | 4 | 3 observation | 1 |
| D-MREG | 20 | 0 | 1 | 15 partial (test trên form thiếu field) | 4 |
| **Tổng** | **105** | **30** | **22** | **20** | **33** |

**Chú ý cách đếm:** ở A, hai ca Blocked do setup threshold, hai observation-only và ba biên thời gian Not run được giữ riêng. Ở B, 23 TC gốc vẫn Blocked vì setup/thao tác yêu cầu không hoàn thành; các quan sát `-SUP` không thay verdict đó. Ở C, một TC Blocked và ba probe observation. Ở D, chỉ lỗi hiện diện field là verdict Fail cho TC đầy đủ; 15 lần thao tác trên form ba trường là partial và không được tính Pass/Fail cho ca yêu cầu bốn trường.

## Bugs và GitHub

Tám issue (#1–#8) đang mở và được liệt kê tại [reports/bug-report.md](reports/bug-report.md) cùng báo cáo feature. GitHub CLI xác nhận #7/#8 chưa có ảnh user-attachment trong body/comments; #8 còn cần cập nhật thông tin Mobile variant. Findings mới B-FR07/D-MREG chưa được đăng thành issues. Local evidence không đồng nghĩa đã đính kèm issue.

## Hồ sơ nộp và giới hạn hiện tại

- Báo cáo chính: [Markdown](reports/main-report.md), [PDF](reports/main-report.pdf).
- Bug report: [reports/bug-report.md](reports/bug-report.md).
- AI Critique: [Markdown](reports/ai-critique.md), [PDF](reports/ai-critique.pdf); nội dung cần sinh viên xác nhận phản ánh trải nghiệm cá nhân.
- AI Audit: [AI_AUDIT_REPORT.md](AI_AUDIT_REPORT.md), [PDF](reports/ai-audit.pdf).
- Commit log: [git-commit-log.txt](git-commit-log.txt).
- Readiness/checklist và việc còn thiếu: [reports/submission-readiness.md](reports/submission-readiness.md).
- Bản ZIP nháp nằm cạnh thư mục repo với tên `23120190_HW02_AI_DomainTesting_draft.zip`. Điểm tự chấm để trống nên đây chưa phải ZIP cuối có hậu tố điểm. Skill/video không được đánh giá trong lần rà soát này.

Không dùng kết quả API thay cho Mobile/Web UI; không coi code SUT làm expected; không tự đặt expected khi SRS chưa đủ rõ. Các bản ghi/readiness hiện không khẳng định bài đã đạt 100 điểm.
