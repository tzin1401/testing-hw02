# Rà soát mức độ sẵn sàng nộp — HW02

- **Sinh viên:** Nguyễn Lê Thế Vinh — 23120190
- **Rà soát:** 2026-10-16, UTC+07
- **Kết luận:** **Chưa thể xác nhận sẵn sàng nộp.** Tài liệu lõi hiện có nhưng còn nhiều TC Blocked/Partial/Not run, findings mới chưa được đăng, issue attachments chưa được xác minh trực tiếp, AI Critique chưa được sinh viên xác nhận, và bản xuất/ZIP/commit log cần đồng bộ.

## Bảng trạng thái theo hồ sơ

| Mục | Trạng thái hiện tại | Việc cần hoàn tất |
|---|---|---|
| README/test summary | Đã sửa để điểm tự chấm trống và số liệu phân loại Pass/Fail/partial/blocked riêng | Sinh viên nhập điểm sau khi tự đối chiếu rubric. |
| A-FR02 | 36 ca thiết kế; 14 Pass, 15 Fail, 2 observation, 2 Blocked, 3 Not run | Giữ 3 ca clock chưa chạy nếu không có server-clock harness; kiểm tra issue screenshot/evidence. |
| B-FR07 | 26 ca thiết kế; 1 Pass, 2 Fail, 23 Blocked; run bổ sung có findings riêng | Hoàn thiện issue cho duplicate line, controls, delete dialog, total label nếu muốn báo hết bug; evidence phải được upload/đính kèm. |
| C-FR14 | 23 ca; 15 Pass, 4 Fail, 1 Blocked, 3 observation | C role-user Admin UI được kiểm chứng trên fixture trong DB clone; #7 không có ảnh attachment trong body/comments tại lần kiểm tra trực tiếp. Không coi API JSON là screenshot. |
| D-MREG | 20 ca; 1 Fail, 15 Partial, 2 Blocked, 2 Not run | Không đủ field để full registration TC; email/name findings cần issue; lượt thử D-BV-006/007 không hợp lệ nên vẫn Not run; #8 cần cập nhật/evidence attachment xác thực. |
| Main report | Markdown và PDF đã đồng bộ theo execution logs | Chỉ sửa lại nếu thay đổi verdict sau lượt này. |
| Bug report | Liệt kê issue #1–#8 và findings mới | #7/#8 đang mở và đúng labels; kiểm tra CLI không thấy ảnh attachment trong body/comments. Findings mới B/D chưa có issue. |
| AI Critique | Draft cần được đối chiếu trải nghiệm cá nhân | Sinh viên review 200–300 từ; không xác nhận thay. |
| AI Audit | Có lịch sử; đã thêm AI-053/054; PDF/HTML xuất lại | Sinh viên vẫn cần đọc các output và lưu ý các lượt Mobile invalid; không có human approval mới. |
| Commit log | Bộ tài liệu/evidence đã commit `668c7c2`, file log chưa làm mới sau commit | Tái tạo log sau commit; giữ nguyên submodule `eshop-sut` và thay đổi không liên quan. |
| ZIP | Draft trước log cuối đã CRC pass; điểm tự chấm để trống | Tái tạo draft từ commit log mới; draft không thay ZIP cuối có hậu tố điểm. |
| Skill/video | **Tạm bỏ khỏi lần kiểm tra này theo yêu cầu** | Đối chiếu riêng khi quay lại phạm vi skill/video. |

## Số liệu TC thiết kế hiện tại

Tổng 105 TC: 30 Pass, 22 Fail, 20 Partial/Observation và 33 Blocked/Not run. “Partial/Observation” không tính là verdict hoàn chỉnh. Chi tiết và quy tắc đếm tại [README](../README.md), từng [execution log](../features/).

## Những lỗi hồ sơ đã được sửa trong lần rà soát này

- Loại bỏ câu khẳng định “Ready/100/100” và số liệu tổng cũ bị mâu thuẫn.
- B-FR07 ghi riêng 26 TC gốc với 23 Blocked; các biến thể `-SUP` không bị tính thay cho TC thiết kế.
- C-FR14 không còn coi alert generic ở lần login user là bằng chứng role-user bị chặn đúng.
- D-MREG phân biệt full TC với thao tác biến thể trên form thiếu confirmation; không nâng kết quả variant thành Pass cho test bốn trường.
- D-BV-006/007 không ghi Pass khi không có event/evidence.
- Không ghi local screenshot hoặc JSON link là ảnh đã đính kèm trên GitHub.

## Điều kiện để chốt

1. Sinh viên xem lại các status/partial và review nội dung AI Critique.
2. Hoàn tất hoặc ghi rõ issue còn thiếu ảnh; mọi issue phát hiện mới phải có reproduction, expected/actual, severity, TC và ảnh/log thật.
3. Xuất lại main report PDF, AI Critique PDF, AI Audit PDF từ các file Markdown đã chốt.
4. Commit đúng phạm vi, cập nhật `git-commit-log.txt`; giữ nguyên submodule `eshop-sut` và thay đổi không liên quan.
5. Tạo ZIP có tên điểm tự chấm 3 chữ số do sinh viên chọn; giải nén kiểm tra các file/link.

Đây là kiểm tra tài liệu và evidence hiện có; không phải chứng nhận điểm, thay thế human review, hoặc xác nhận Moodle submission.
