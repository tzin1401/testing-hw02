# AI-043 — Output thực thi D-MREG

## Prompt nguyên văn

```text
Thực thi toàn bộ ca Domain và BVA D-MREG trong `03-domain-cases.md` và `04-boundary-cases.md`. Trước tiên kiểm tra Mobile app, thiết bị/emulator và kết nối API; không restart backend nếu có thể làm mất dữ liệu/state. Tự chạy API phụ trợ bằng tài khoản/email test riêng khi điều đó giúp chuẩn bị hoặc xác minh account, nhưng mỗi TC giao diện phải được thực hiện trên app Mobile thật/emulator; API không thay thế Mobile UI. Không yêu cầu tôi chạy lệnh terminal. Chụp ảnh từng màn hình quan trọng có TC ID, ghi thao tác, timestamp, thiết bị/OS, request/response đã che mật khẩu/token và kết quả điều hướng. Với ca đăng ký thành công, email phải duy nhất; với ca fail kiểm tra account không được tạo nếu có cách truy vấn chỉ đọc. Nếu Codex không điều khiển được điện thoại/emulator, hoàn tất phần API có thể làm rồi gửi từng thao tác Mobile cụ thể tôi cần thực hiện và cách lưu ảnh, không bắt tôi tự sửa file/test script. Ghi Blocked cho checkpoint UI chưa có bằng chứng; không suy ra UI từ API. Đánh dấu Pass/Fail từng requirement có expected; câu hỏi chưa rõ ghi observation. Cập nhật `06-execution.md`, `07-bugs-and-ai-gaps.md`, `reports/work-progress.md`, evidence và AI Audit. Chuẩn bị issue, chưa đăng issue nếu thiếu ảnh. Commit riêng execution và file D/evidence liên quan.
```

## Output đã tạo

- [`features/D-MREG/06-execution.md`](../features/D-MREG/06-execution.md): môi trường/run, status của 13 Domain + 7 BVA/robustness case, requirement-level status, blocker và hướng dẫn thao tác Mobile còn lại.
- [`features/D-MREG/07-bugs-and-ai-gaps.md`](../features/D-MREG/07-bugs-and-ai-gaps.md): draft issue API duplicate email, expected/actual/severity/labels/evidence; chưa đăng.
- [`reports/work-progress.md`](../reports/work-progress.md): trạng thái D-MREG cập nhật.
- Evidence: [`evidence/D-MREG/full-runs/20261015T1303Z-DMREG/`](../evidence/D-MREG/full-runs/20261015T1303Z-DMREG/), gồm ảnh D-DT-001 trước/sau tap, run metadata và JSON request/response đã che password.

## Kết quả và giới hạn

Emulator Pixel 9 / Android 15 / API 35 và Expo Go SDK 54 đang chạy. Taps vào header Đăng nhập không mở Login/Register; không có UI evidence của form, nên cả 20 Mobile UI case đều Blocked. Backend cũ không còn listener; không restart để tránh state loss. Đã chạy server trên bản sao cô lập, source server.js khớp baseline. API POST hợp lệ tạo test fixture 200/ID 3; request duplicate trả 200/ID 4 và read-only email count tăng 1→2. D-R04 API-only Fail; D-R08 API success contract Pass-only; không suy ra Mobile behavior.

Không tạo account trong DB SUT, không sửa source SUT, không xóa dữ liệu, không đăng GitHub Issue. Chưa chạy các bước Mobile UI và chưa ghi actual UI/Pass/Fail.
