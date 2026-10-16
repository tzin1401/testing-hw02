# AI-056 — Hoàn tất các kiểm thử còn thiếu

- **Tool/time:** Codex; 2026-10-16, khoảng 07:30–07:50 UTC.
- **Prompt nguyên văn:** “ý là phần có các kiểm thử chưa hoàn tất á. Hoàn tất tất cà các kiểm thử còn thiếu đi”.
- **Phạm vi:** tiếp tục execution test A-FR02, B-FR07, C-FR14, D-MREG; không sửa SUT logic, không tạo GitHub Issue, không ghi human review.

## Thực hiện và kết quả

1. **A-FR02:** tạo bản clone baseline riêng, dùng clock preload chỉ ở ngoài repo để điều khiển `Date.now()` và `new Date()` tại phép so sánh. Với ba user fixture độc lập đang có `locked_until=08:00:30.000Z`, chạy request login đúng tại elapsed 29.999/30.000/30.001s. Kết quả 403/200/200 theo expected. Ghi `A-BV-011/007/012` Pass cho checkpoint toán tử của fixture; không khẳng định thời lượng khóa tự nhiên. Chạy thêm `A-BV-009` ở 10s và `A-BV-006` ở 29s; cả hai trả 403 như expected, nhưng full TC giữ Partial vì natural setup bị khóa sớm ở lần sai thứ hai. Bằng chứng `evidence/A-FR02/full-runs/20261016T-clock-A-FR02.json` và `20261016T-clock-A-FR02-midpoints.json` đã che token/password.
2. **B-FR07:** trên Web UI clone, thực hiện lại quantity cases sau khi từng ca xác nhận cart rỗng và reset bằng UI. Đường chi tiết cần click lần hai mới thêm vào cart. Giá trị 0 và -1 được lưu; 1.5 bị chuyển thành 1; `abc` bị input `type=number` loại thành rỗng nhưng submit tạo dòng NaN. Quantity 1 và 2 hiển thị đúng. Cập nhật 26 TC: 4 Pass, 12 Fail, 2 Observation, 8 Blocked do nút +/-/dialog vắng mặt. Ảnh và events ở `evidence/B-FR07/supplement-runs/20261016T074533896Z-supp/`.
3. **C-FR14:** chạy bổ sung API trên clone với JWT role=user, xác nhận POST tạo category ID 4 và DELETE xóa target test ID 5 (HTTP 200); guest và user đều GET được danh sách, không kết luận GET cần admin. Category ID 4 do lượt thử tạo được dọn bằng admin; target ID 5 là dữ liệu test do lượt này tạo và đã bị xóa; danh mục mẫu ID 1–3 không bị sửa/xóa. Token/password không lưu. Bằng chứng `evidence/C-FR14/supplement-runs/20261016T-user-role-api/api-role-check.json`. Đây là củng cố C-DT-014/018, không thay API evidence bằng UI.
4. **D-MREG:** mở app baseline clone trên Pixel 9 / Android 15 API 35 / Expo Go SDK 54. Home và product detail hoạt động, nhưng header “Đăng nhập” chồng vùng status bar; nhiều tap không mở Login. Không submit test registration. Lưu ảnh diagnostic ở `evidence/D-MREG/supplement-runs/20261016T-emulator-navigation-blocked/`. D-DT phụ thuộc Register vẫn Partial/Blocked; D-BV-006/007 Not run.

## Giới hạn còn lại

- A-BV-006/009 vẫn Partial: fixture xác nhận active-lock tại 29s/10s, nhưng setup threshold tự nhiên vẫn khóa từ lần sai thứ hai nên không mô phỏng được chuỗi ba lần sai như thiết kế.
- B-DT-007/009/010/012 và B-BV-004/005/006 vẫn Blocked vì nút +/-/dialog không có; Fail sự hiện diện được ghi riêng. B-DT-020 là observation vì API oracle chưa được nêu.
- D cần sinh viên hoặc người điều khiển emulator tương tác được để mở Register; đồng thời form baseline thiếu confirmation password, nên ca bốn trường không thể hoàn tất nếu thiếu field này.
- C có một lần automation UI mới dừng trước user login do không tìm thấy form field selector; không dùng nó làm kết quả. API role cases đã có kết quả hợp lệ.
- Không sửa database trong repo; mọi thay đổi trạng thái test diễn ra trong các bản clone. B cart của run được dọn bằng UI. Không push GitHub issue.

## Files updated

- `features/A-FR02/06-execution.md`
- `features/B-FR07/06-execution.md`
- `features/C-FR14/06-execution.md`
- `features/D-MREG/06-execution.md`
- `reports/work-progress.md`
- Evidence JSON/PNG/events của A/B/C/D được dẫn ở trên.

Chưa có human review mới và không ghi sinh viên phê duyệt kết quả.
