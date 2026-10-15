# Tiến độ HW02 — Nguyễn Lê Thế Vinh — 23120190

**Vai trò:** Thành viên 2. **Cập nhật:** 16/10/2026 UTC+07.

## Phần đã chuẩn bị

- Bốn chức năng theo phân công: A-FR02, B-FR07, C-FR14, D-MREG.
- Mỗi chức năng có requirements, EC/domains, Domain cases, BVA, review coverage, execution và bug/gap report.
- Có evidence nhiều lớp: ảnh Web/Mobile, event logs, API JSON đã che bí mật và DB read-only checkpoints. Baseline SUT ghi trong [environment](environment.md).
- Người dùng đã nói đã hiểu các ca của A/B/C/D; các câu trả lời này chỉ được ghi nhận là “đã hiểu”, không suy thành phê duyệt expected/coverage.

## Kết quả kiểm thử hiện được ghi nhận

| Feature | TC thiết kế | Pass | Fail | Partial/Observation | Blocked/Not run | Chi tiết |
|---|---:|---:|---:|---:|---:|---|
| A-FR02 | 36 | 14 | 15 | 2 | 5 | [Execution](../features/A-FR02/06-execution.md) |
| B-FR07 | 26 | 1 | 2 | 0 | 23 | Run supplement có findings riêng, không nâng TC gốc; [Execution](../features/B-FR07/06-execution.md) |
| C-FR14 | 23 | 15 | 4 | 3 | 1 | UI role-user đã được kiểm chứng trên fixture; [Execution](../features/C-FR14/06-execution.md) |
| D-MREG | 20 | 0 | 1 | 15 | 4 | 15 là variant partial trên form thiếu confirmation; [Execution](../features/D-MREG/06-execution.md) |
| **Tổng** | **105** | **30** | **22** | **20** | **33** | Partial/observation không phải kết quả hoàn chỉnh. |

## Việc AI đã sửa trong lần rà soát gần nhất

- Đồng bộ B/C/D execution logs theo evidence, tách test case thiết kế khỏi biến thể bổ sung.
- Sửa review coverage D và bug/gap reports B/C/D.
- Sửa README và báo cáo tổng hợp để bỏ tuyên bố sẵn sàng/100 điểm không có căn cứ; bảng tự chấm hiện để trống.
- Ghi rõ issue #1–#8 theo hồ sơ; findings B/D mới chưa đăng/đính ảnh được xác minh.
- Ghi audit AI-052, gồm các tuyên bố AI-049/050 không được chứng cứ gốc hỗ trợ.
- Bổ sung C-R01 role-user bằng fixture xác thực trên DB clone; UI hiện “Bạn không phải là admin!” và không cấp admin token.
- Thử bổ sung D-BV-006/007; automation lỗi focus/text entry và rời Expo Go về Home. Lưu lượt lỗi, đánh dấu invalid; hai ca vẫn Not run.
- Kiểm tra GitHub trực tiếp: #7/#8 mở, đúng labels; body/comments không có ảnh user-attachment. #8 còn nội dung cũ ghi Mobile Blocked.

## Còn thiếu trước khi nộp

- Đối chiếu lại status và draft AI Critique bằng góc nhìn thực tế của sinh viên.
- Tạo/cập nhật GitHub issues cho findings mới và đính screenshot/log thật; cập nhật issue #8 khi có thể gắn evidence phù hợp. Không coi JSON link là screenshot.
- Đã xuất lại main report, AI Critique và AI Audit PDF từ Markdown; còn cần cập nhật commit log sau commit.
- Đã commit bộ tài liệu/evidence đối chiếu tại `668c7c2`, không stage `eshop-sut`.
- ZIP draft trước commit log đã CRC pass; sau khi làm mới commit log sẽ tái tạo draft. Sinh viên tự chọn điểm 3 chữ số và điền README trước ZIP cuối.
- Skill/video tạm ngoài phạm vi hiện tại.

Không sửa logic SUT, không restart backend, không ghi DB thật; DB clone chỉ được truy vấn chỉ đọc. D automation dừng trước khi kết luận. Không có review/phê duyệt mới từ sinh viên.
