# AI-054 — Thử bổ sung D-BV-006/007 và loại lượt không hợp lệ

- **Prompt:** tiếp tục tự kiểm tra và bổ sung những phần còn thiếu; bỏ qua phần skill.
- **Thời điểm:** 2026-10-15T17:37–17:44Z (2026-10-16 00:37–00:44 UTC+07).
- **Mục tiêu:** thu evidence Mobile cho hai password robustness cases trên Android Emulator Pixel 9 / Android 15 API 35 / Expo Go SDK 54.
- **An toàn:** backend là clone dưới `/tmp/hw02-dmreg-isolated-run`; state kiểm tra SQLite chỉ đọc; không restart backend, không sửa SUT/DB thật.
- **Lượt đầu `20261016T003700Z-DMREG-BV67`:** automation chạy chồng hai process; tên và email nhập lệch. Bằng chứng giữ tại `evidence/D-MREG/supplement-runs/20261016T003700Z-DMREG-BV67/`, nhưng không dùng để đánh giá chức năng.
- **Lượt kế tiếp:** ba lượt `...174041Z-DMREG-BV67-clean`, `...174117Z-DMREG-BV67-clean`, `...174221Z-DMREG-BV67-clean` dừng vì xác minh dữ liệu nhập thất bại trước submit. Không có account mới.
- **Lượt manual `20261015T174259Z-D-MREG-manual-probe`:** ảnh trước submit xác nhận fixture; thao tác kế tiếp làm Expo Go rời về Home, không thu được response UI. SQLite read-only cho email riêng thấy count 0; đây không chứng minh app đã từ chối input.
- **Kết luận:** D-BV-006/007 giữ `Not run`. Không kết luận pass/fail SUT. Ghi các lượt invalid và nguyên nhân vào D execution/AI gap; không xóa artifacts.
- **AI gap:** automation không xử lý tốt text entry/focus/keyboard và back/navigation. Đây là lỗi thao tác của AI, không phải SUT bug.
- **Không làm:** không đăng/update GitHub issues, không push, không thao tác trên thiết bị thật.
