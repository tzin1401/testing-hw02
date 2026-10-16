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
| A-FR02 | 36 | 17 | 15 | 4 | 0 | [Execution](../features/A-FR02/06-execution.md) |
| B-FR07 | 26 | 4 | 12 | 2 | 8 | quantity UI đã được chạy lại; 8 ca phụ thuộc còn Blocked; [Execution](../features/B-FR07/06-execution.md) |
| C-FR14 | 23 | 15 | 4 | 3 | 1 | UI role-user đã được kiểm chứng trên fixture; [Execution](../features/C-FR14/06-execution.md) |
| D-MREG | 20 | 0 | 1 | 15 | 4 | 15 là variant partial trên form thiếu confirmation; [Execution](../features/D-MREG/06-execution.md) |
| **Tổng** | **105** | **36** | **32** | **24** | **13** | Partial/observation không phải kết quả hoàn chỉnh. |

## Việc AI đã sửa trong lần rà soát gần nhất

- Đồng bộ B/C/D execution logs theo evidence, tách test case thiết kế khỏi biến thể bổ sung.
- Sửa review coverage D và bug/gap reports B/C/D.
- Sửa README và báo cáo tổng hợp để bỏ tuyên bố sẵn sàng/100 điểm không có căn cứ; bảng tự chấm hiện để trống.
- Đối chiếu và đăng các findings B-FR07/D-MREG có bằng chứng: Issues #9–#14; cập nhật #7/#8 và bổ sung ảnh trích xuất từ log API đã lưu. Issue #1–#14 hiện mở; bảng chi tiết ở [bug report](bug-report.md).
- Ghi audit AI-052, gồm các tuyên bố AI-049/050 không được chứng cứ gốc hỗ trợ.
- Bổ sung C-R01 role-user bằng fixture xác thực trên DB clone; UI hiện “Bạn không phải là admin!” và không cấp admin token.
- Thử bổ sung D-BV-006/007; automation lỗi focus/text entry và rời Expo Go về Home. Lưu lượt lỗi, đánh dấu invalid; hai ca vẫn Not run.
- Kiểm tra GitHub trực tiếp sau cập nhật: #7–#14 mở, có labels theo slide và ảnh đính kèm; #7/#8 dùng ảnh trích xuất từ log JSON đã che bí mật, không phải ảnh UI. Các finding D #13/#14 là probe trên form thực tế thiếu confirmation; không thay thế full TC bốn trường.

## Còn thiếu trước khi nộp

- Đối chiếu lại status và draft AI Critique bằng góc nhìn thực tế của sinh viên.
- Chụp bổ sung ảnh UI cho các issue B/D nếu muốn có ảnh giao diện; #7/#8 hiện có ảnh minh họa trích xuất từ log API và liên kết tới JSON gốc.
- Đã xuất lại main report, AI Critique và AI Audit PDF từ Markdown; còn cần cập nhật commit log sau commit.
- Đã commit bộ tài liệu/evidence đối chiếu tại `668c7c2`, không stage `eshop-sut`.
- Đã làm mới commit log và tái tạo ZIP draft; kiểm tra CRC thành công. Sinh viên tự chọn điểm 3 chữ số và điền README trước ZIP cuối.
- Skill/video tạm ngoài phạm vi hiện tại. Phần còn thiếu ưu tiên xử lý tiếp là mục 6 theo hướng dẫn bài tập.

Không sửa logic SUT, không restart backend, không ghi DB thật; DB clone chỉ được truy vấn chỉ đọc. D automation dừng trước khi kết luận. Không có review/phê duyệt mới từ sinh viên.

## Cập nhật thực thi kiểm thử còn thiếu — 16/10/2026

- A-FR02: chạy riêng clock fixture tại thời điểm server so sánh cho A-BV-011 (29.999s), A-BV-007 (30.000s), A-BV-012 (30.001s). Cả ba checkpoint khớp expected; không thay thế kết quả thời lượng tự nhiên và không xóa finding 180 giây. A-BV-006/009 được kiểm tra active-lock bằng fixture nhưng giữ Partial vì natural setup khóa sớm tại lần sai thứ hai; không còn ca timing Not run/Blocked.
- B-FR07: chạy lại UI quantity với bước bấm thứ hai sau quan sát lần bấm đầu. B-DT-016/017/018/019 và B-BV-001 Fail; B-BV-002/003 Pass. B hiện 4 Pass, 12 Fail, 2 Observation (tổng amount oracle/API oracle), 8 Blocked (control/dialog phụ thuộc). Bằng chứng và từng giá trị có trong execution/evidence run `20261016T074533896Z-supp`.
- C-FR14: API clone xác nhận bổ sung user-token POST/DELETE vẫn thay đổi state, củng cố C-DT-014/018 Fail; category test do lượt POST thêm đã được dọn bằng admin token; category mẫu ID 1–3 giữ nguyên. Không dùng API run làm bằng chứng UI.
- D-MREG: mở app trên emulator được nhưng header đăng nhập chồng vùng status bar; nhiều lần tap không mở Login. Không submit registration; D-BV-006/007 Not run và các TC cần form vẫn Blocked/Partial. Ảnh obstruction được lưu để chỉ rõ lý do.

**Còn thiếu thực tế:** các ca Mobile D cần vào Register (và kiểm thử xác nhận mật khẩu) chưa thể hoàn tất vì đường điều hướng không thao tác được trên emulator hiện tại, đồng thời form baseline chỉ có ba trường thay vì bốn. Ca B phụ thuộc +/- và confirmation dialog vẫn Blocked do controls không tồn tại; đã ghi riêng Fail cho sự hiện diện. A-BV-006/009 vẫn Partial do active-lock được xác nhận bằng fixture nhưng setup threshold tự nhiên sai (khóa sớm từ lần sai thứ hai). Đây là các giới hạn SUT/setup có bằng chứng; không gán Pass để đạt đủ số lượng.
