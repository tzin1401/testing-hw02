# AI-047 — Kiểm tra sẵn sàng nộp

Tool: Codex. Ngày giờ ghi log: 2026-10-15T15:22:08Z (22:22:08 +07:00).

## Prompt nguyên văn

Giờ hãy tạm thời bỏ qua phần skill và quay video đi. Check xem những phần còn lại của tôi đã đủ để nộp full điểm chưa?

## Output và giới hạn

Đọc PDF đề, README, work-progress, execution/bug/review và inventory artifact; đọc GitHub issue body/comments, kiểm tra link evidence D qua API (404). Không chạy SUT, không push, không sửa issue, không tự ghi human review/điểm. Bản output dưới đây lưu toàn văn báo cáo kiểm tra.

````markdown
# Kiểm tra mức sẵn sàng nộp HW02 — 23120190

Thời điểm: 2026-10-15T15:22:08Z (22:22:08 +07:00). Tạm loại skill/video khỏi phạm vi đánh giá theo yêu cầu. Đây là kiểm tra tài liệu và GitHub, không phải chạy lại test hay chấm điểm của giảng viên.

## Kết luận

Chưa đủ để nộp và chưa có cơ sở khẳng định đạt trọn 90 điểm A/B/C/D. Đề không cho công thức trừ điểm từng thiếu sót; không tự gán điểm. Nếu bỏ hẳn skill/video khi nộp thì không thể coi là đã đủ hạng mục 10 điểm còn lại.

## Căn cứ đề

PDF HW02 mục 6 yêu cầu Domain, BVA, AI gap và bug Markdown/GitHub với ảnh trên từng issue (trang 3–4). Mục 9 yêu cầu audit mỗi interaction gồm tool/date-time/prompt/output (trang 4–5). Mục 10 yêu cầu AI Critique 200–300 từ. Mục 12 yêu cầu commit từng bước và log văn bản. Mục 14 yêu cầu báo cáo chính Markdown + PDF, bug report, AI Critique/Audit Markdown + PDF, commit log và README tự chấm/test summary (trang 5–6). Mục 17 ghi thiếu bất kỳ tài liệu bắt buộc nào sẽ bị 0 điểm. Do đó thiếu tài liệu đóng gói là vấn đề cần xử lý trước khi nộp, không chỉ là lỗi trình bày.

## Thiết kế và thực thi

Có đủ 01–07 cho cả bốn chức năng. Số ID thiết kế duy nhất trong file Domain/BVA: 105 (gồm probe/robustness, không phải 105 ca BVA thuần hoặc 105 ca đã hoàn thành).

| Phần | Thiết kế | Bằng chứng/tình trạng hiện có | Việc còn thiếu |
|---|---:|---|---|
| A-FR02 | 36 | 33 TC có actual/checkpoint theo log; có partial, observation và Blocked; 3 mốc clock Not run; issue #1–3 có ảnh | Chuẩn hóa tổng trạng thái theo TC hoàn tất/checkpoint. Giữ giới hạn đúng 30s/1ms; không cộng partial thành Pass đầy đủ. |
| B-FR07 | 26 | 1 Pass, 2 Fail, 23 Blocked; issue #4–5 có ảnh | Xác minh lại blocker thêm giỏ trên UI/harness; thực thi phần độc lập khả thi. Nếu SUT thực sự chặn, giữ dependency/evidence và giải thích độ phủ hạn chế; không sửa SUT để ép test Pass. |
| C-FR14 | 23 | 15 Pass, 4 Fail, 1 Blocked, 3 observation-only; issue #6–7 | Coverage C-R01 truy cập Admin UI bằng khách/user chưa kiểm tra; API permission không thay UI. Issue #7 thiếu ảnh. |
| D-MREG | 20 | Toàn bộ 20 Mobile UI TC Blocked vì chưa mở Register; API riêng phát hiện email trùng | Mở Register và thực thi các TC Mobile trên emulator/thiết bị, chụp evidence. API phụ trợ không đủ chứng minh Mobile. Issue #8 thiếu ảnh và link JSON remote lỗi. |

Fail do phát hiện bug không có nghĩa bài kiểm thử kém. Blocked thật có thể hợp lý nhưng phải đủ chứng cứ, nêu phần chưa phủ; không khẳng định điểm tối đa từ số file đã tạo.

## Tài liệu nộp còn thiếu/chưa hoàn thiện

- Chưa thấy báo cáo chính tổng hợp Markdown + PDF. Các file chức năng hiện có là nguồn để tổng hợp.
- Chưa thấy AI Critique 200–300 từ (Markdown + PDF).
- AI Audit đang phát triển, chưa có bản PDF; phần đầu tự ghi nhận lịch sử thiếu. Có mục còn `COMMIT_ID`/ghi sau. Cần đối chiếu toàn văn prompt/output, đưa snapshot vào phụ lục, không chỉ dẫn link. Không bịa lịch sử hoặc review.
- Chưa thấy `git-commit-log.txt`; lịch sử Git đã có nhiều commit từng bước.
- README còn trạng thái chuẩn bị, bảng số liệu trống, điểm tự chấm trống. Cần đếm TC duy nhất, tách partial/probe/Blocked; công thức chỉ Pass+Fail không phản ánh hết ca đã thao tác nhưng chưa thể verdict.
- `reports/work-progress.md` có dòng B/D nói issue chưa đăng dù #4/#5/#8 đã đăng. Cần phân biệt lịch sử với trạng thái hiện tại.
- Chưa có ZIP nộp theo tên quy định; cần kiểm tra sau giải nén, PDF/ảnh/link và tự chấm thực tế.

## GitHub và evidence

Kiểm tra trực tiếp issue #1–8 qua GitHub CLI. #1–6 có Markdown ảnh trong body; #7/#8 không có ảnh trong body hoặc comments. Đề mục 6.4 yêu cầu screenshot ở mỗi issue, không nêu miễn trừ cho API-only. Với lỗi API có thể chụp màn hình API client/terminal thật chứa request/response đã che bí mật và kết quả state; không dùng ảnh UI không liên quan.

API kiểm tra path evidence D trên GitHub trả HTTP 404:
`evidence/D-MREG/full-runs/20261015T1303Z-DMREG/api-registration-duplicate-isolated.json`.
Thông tin trước đó rằng file đã có trên main remote là sai: file được commit local, không chứng minh đã push. `git status -sb` báo local main ahead origin/main 40 commit (theo tracking ref hiện có). Cần đưa evidence lên remote và kiểm tra link thật trước khi nộp; lượt kiểm tra này không push hay sửa issue.

Có tài liệu/evidence untracked: phân công nhóm, slide, ảnh A và audit AI-001. Không mặc định chúng đã nằm trong GitHub/ZIP. Kiểm tra toàn bộ link Markdown tương đối từ README/audit/features thấy không có link local bị thiếu; điều này không bảo đảm nội dung ảnh đúng, remote mở được hoặc ZIP có đủ file.

## Human review và AI gaps

Đã có review thật về mức độ hiểu ca, cùng lỗi harness được ghi trong A/B. Không cần bịa AI gap ở C/D. Review hiện chưa chứng minh sinh viên đã rà soát độ đúng expected/coverage/kết quả cuối. Cần người dùng thực sự đọc và nhận xét những điểm đó; trợ lý không thể xác nhận thay.

## Thứ tự hoàn thiện đề xuất

1. Gỡ blocker Mobile; kiểm tra lại blocker giỏ hàng và gap Admin UI, giữ run mới cho mọi lần chạy lại.
2. Bổ sung screenshot thật cho #7/#8 và sửa link evidence remote; kiểm tra các issue.
3. Tổng hợp main report/bug report, test summary và trạng thái tiến độ; giữ rõ ca không chạy/chỉ quan sát.
4. Viết AI Critique từ trải nghiệm thật, hoàn thiện Audit; sinh viên review kỹ thuật và review bản tổng hợp.
5. Xuất PDF, tự chấm có căn cứ, xuất commit log sau khi chốt nội dung, đóng ZIP và kiểm tra sau giải nén.

Không cần làm mọi test Pass; cần báo cáo đúng, đủ bằng chứng và đủ tài liệu bắt buộc. Bản kiểm tra này chưa đánh giá sâu từng ảnh/response hay xác nhận mọi verdict cũ đều đúng.
````
