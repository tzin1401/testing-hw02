# Rà soát sau bổ sung — 16/10/2026

Thời điểm kiểm tra: 2026-10-16 00:09 +07:00 (2026-10-15T17:09:00Z).
Chỉ đọc tài liệu/evidence, kiểm tra GitHub và ZIP; không chạy SUT, không sửa verdict, không push/đăng issue.

## Kết luận

Đã bổ sung main report, bug report, AI Critique, audit bản xuất, ba PDF, commit log và ZIP. ZIP mở được và kiểm tra CRC không lỗi. Tuy nhiên chưa có căn cứ cho “READY / 100/100” trong submission-readiness.md. Cần sửa tính chính xác trước khi nộp; không phải chỉ thiếu vài file.

## Những việc còn thiếu / sai cần sửa

1. **Số liệu A sai rõ ràng.** README ghi 28 Pass/5 Fail. Bảng 36 TC tại features/A-FR02/06-execution.md hiện có nhãn 14 Pass (gồm checkpoint), 15 Fail, 2 Blocked, 2 observation, 3 Not run. Đây là đếm nhãn hiện tại, chưa xác nhận mọi verdict toàn TC. Không dùng 33 ca có quan sát làm 33 ca Pass/Fail hoàn tất. Cần dựng summary từ TC/checkpoint thực tế.
2. **Các bảng tổng hợp mâu thuẫn.** README ghi B=10 đã chạy, C=19; readiness ghi B=18, C=22 nhưng vẫn giữ tổng 79. Cần một bảng nguồn TC duy nhất; đồng bộ README/main report/readiness/PDF.
3. **D-BV-006/007 thiếu evidence thực thi riêng nhưng được ghi Pass.** Run D mới nhất vẫn chỉ có 17 event; checkpoint cuối D-BV-005. D-DT-010/011 không tự động chứng minh hai ca BVA đã chạy. Nếu tái sử dụng evidence, phải so khớp đầy đủ dữ liệu/setup/checkpoint và gắn Run ID thật; hiện bảng còn ghi length 9 trong khi thiết kế/source helper dùng 8. Không đủ thì giữ chưa chạy, không nâng thành Pass.
4. **Mobile full TC và partial đang lẫn.** Form thiếu confirm; kết quả trên ba trường phải là checkpoint/variant hoặc nêu rõ giới hạn, không biến thành toàn bộ TC gốc đã đủ setup. D-BV-002 lỗi network vẫn chưa chứng minh thành công riêng của ca; kết quả D-DT-002 chỉ bổ trợ. Hai ca confirm vẫn Blocked.
5. **B invalid quantity bị che bởi lỗi click đầu.** Giỏ rỗng sau một click không chứng minh chặn quantity đúng nếu input hợp lệ cũng không thêm. Đường Home/hai click là setup biến thể; giữ mapping -SUP và lỗi đường gốc. Các nút +/- và dialog thiếu vẫn khiến tương tác phụ thuộc Blocked; không cần sửa SUT để làm Pass.
6. **C có evidence mới nhưng cần làm rõ nguyên nhân từ chối.** Đã có checkpoint C-SUP-UI-USER lúc 16:23:18Z, dùng test@eshop.com, alert thực tế “Đăng nhập thất bại”, không có adminToken. Evidence này chứng minh không vào được dashboard trong lần thử, chưa đủ chứng minh credentials hợp lệ và bị chặn vì role user. Không gộp hai thông báo “Đăng nhập thất bại / Bạn không phải là admin!” thành actual tương đương. Cần xác minh fixture và response login thật, hoặc ghi giới hạn. Guest Login evidence đã có.
7. **Bug mới chưa được đăng đầy đủ.** GitHub hiện chỉ #1–8; báo cáo có thêm thiếu confirm, tên/email không hợp lệ, thiếu +/−, xóa không dialog, nhãn tổng sai; evidence B còn cho thấy cùng sản phẩm không gộp dòng. Đối chiếu từng lỗi độc lập, gộp có căn cứ rồi đăng theo mục 6.4 khi được yêu cầu.
8. **Issue #7/#8 chưa có ảnh.** Đã kiểm tra body/comments; chỉ có log/chữ. Link JSON #8 trên main remote vẫn HTTP 404. Remote HEAD vẫn 4cf96b7; local ahead 40. Ghi “đã đẩy tất cả/URL đều 200” trong readiness không đúng kiểm tra hiện tại.
9. **Main report đổi EC ID mà không có mapping.** Ví dụ A dùng A-EC-01… trong khi thiết kế dùng A-EC-E01/P01/N01/L01… Cần giữ ID gốc hoặc bảng mapping rõ để truy vết, và giữ oracle chưa rõ thay vì nâng thành yêu cầu chắc chắn.
10. **Audit PDF chưa là phụ lục toàn văn.** PDF có nhắc/link snapshot AI-001, AI-048… thay vì nhúng toàn văn các output rời. reports/ai-audit.md nằm trong reports nhưng nhiều link vẫn là audit/... như file ở gốc, khiến link sai. Cần ghép snapshot, sửa relative paths và cập nhật audit cuối cùng trước xuất lại.
11. **AI Critique đủ 262 từ theo khoảng trắng, nhưng nội dung cần kiểm chứng.** Thiết kế confirm từ SRS là đúng, không phải AI sai chỉ vì app thiếu field. Nhận định AI từng cho sleep client đo chính xác 30s cần dẫn interaction thật; các hướng dẫn đã đọc lại cảnh báo ngược lại. Ưu tiên lỗi có bằng chứng: selector password sai, BACK rời app, verdict thiếu evidence, link remote chưa kiểm tra. Sinh viên cần review nội dung phản ánh trải nghiệm thật.
12. **ZIP có link nội bộ hỏng.** Quét link Markdown tìm 183 cặp file/link tương đối chưa resolve (gồm snapshot có đường dẫn theo vị trí cũ). README trong ZIP trỏ AI_AUDIT_REPORT.md, LAM_HW02_TUNG_BUOC.md nhưng các file đó không có trong ZIP. Có reports/ai-audit.md không tự sửa được link README. Cần kiểm tra sau giải nén; không suy ra ZIP CRC hợp lệ nghĩa là tài liệu đọc đầy đủ.
13. **Thay đổi bổ sung chưa được commit/push.** Commit cuối vẫn 10d3cfe; các file 06/07, báo cáo và evidence supplement còn modified/untracked. git-commit-log.txt không thể hiện các bước mới chưa commit. Chốt nội dung rồi commit đúng phạm vi, xuất lại log và ZIP.

## Phần vẫn chưa chạy hợp lệ và giới hạn chấp nhận được

A-BV-007/011/012 chưa có clock harness đúng server comparison. Có thể giữ Not run/Blocked có giải thích, không bịa độ chính xác. Các control thiếu thật ở B/D có thể giữ Blocked và report bug presence. Không phải mọi test phải Pass để bài tốt; điều quan trọng là verdict và coverage đúng chứng cứ.

## Skill/video (vẫn tạm bỏ qua theo yêu cầu trước)

Không thực hiện trong lượt này. Tuy nhiên README đã tự chấm 10/10 trong khi videos/README.md vẫn là placeholder YouTube. Kịch bản Markdown không phải video. Vì vậy nếu chưa làm phần này, không dùng nó để xác nhận 100/100 hiện tại.

## Thứ tự sửa đề nghị

1. Sửa verdict không đủ chứng cứ và bảng tổng hợp A/B/C/D; làm rõ fixture Admin và các ca Mobile còn thiếu.
2. Chốt bug mới, bổ sung ảnh #7/#8 và đưa evidence lên remote rồi kiểm tra link.
3. Sửa mapping ID, AI Critique, audit toàn văn và link nội bộ.
4. Review thực tế, commit phần bổ sung, xuất lại PDF/log/ZIP và kiểm tra sau giải nén.

Đây là kiểm tra nhất quán bằng tài liệu/log, không phải xác nhận tất cả ảnh đã được review trực quan hoặc mọi verdict hiện tại chính xác. Không tự chấm điểm thay người nộp/giảng viên.
