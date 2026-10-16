# D-MREG — Findings, GitHub Issues và AI gaps

**Baseline:** `85af3ba875c88283615e22cb108f13e2fccaf0e9`
**Mobile run:** `20261015T153620Z-57c022`, Pixel 9 / Android 15 / API 35 / Expo Go SDK 54.
**API run:** `20261015T1303Z-DMREG` trên backend clone cô lập; không thay Mobile UI.

## Findings có evidence

| Finding | Requirement / TC | Actual | Evidence | GitHub |
|---|---|---|---|---|
| Form thiếu trường xác nhận mật khẩu | D-R07; D-DT-001 Fail | Chỉ có Họ tên, Email, Mật khẩu. | `supplement-runs/20261015T153620Z-57c022/D-DT-001-register-form.png`, presence event | [Issue #13](https://github.com/tzin1401/testing-hw02/issues/13), OPEN; ảnh form đính kèm. |
| Họ tên rỗng được chấp nhận ở form 3 trường | D-R01; probe liên quan D-DT-003 | App báo thành công, DB test count 0→1. | `D-DT-003-before.png`, `D-DT-003-response.png`, event | [Issue #14](https://github.com/tzin1401/testing-hw02/issues/14), OPEN; probe variant, không phải full TC Fail. |
| Email rỗng được chấp nhận ở form 3 trường | D-R02; probe liên quan D-DT-004 | App báo thành công, DB test count 0→1. | `D-DT-004-before.png`, `D-DT-004-response.png`, event | [Issue #14](https://github.com/tzin1401/testing-hw02/issues/14), OPEN; probe variant. |
| Email sai format được chấp nhận ở form 3 trường | D-R03; probe liên quan D-DT-005 | Email không có `@` được chấp nhận; app báo thành công, count 0→1. | `D-DT-005-before.png`, `D-DT-005-response.png`, event | [Issue #14](https://github.com/tzin1401/testing-hw02/issues/14), OPEN; probe variant. |
| Email trùng tạo account thứ hai | D-R04; API evidence và probe Mobile liên quan D-DT-006 | API POST lặp tuần tự count 0→1→2; Mobile variant cũng count 1→2 và báo thành công. Không thử race. | `full-runs/20261015T1303Z-DMREG/api-registration-duplicate-isolated.json`; `supplement-runs/20261015T153620Z-57c022/D-DT-006-{before,response}.png` và event | [Issue #8](https://github.com/tzin1401/testing-hw02/issues/8), OPEN; nội dung đã ghi rõ giới hạn Mobile variant và ảnh API log đã đính kèm. |
| Mật khẩu rỗng/thiếu nhóm bị chặn trong các probe | D-R05/D-R06; D-DT-007–011, D-BV-001, D-BV-004/005 | Có thông báo password và DB count 0→0. | Ảnh response và event từng TC | Không phải bug từ bằng chứng hiện tại; full flow vẫn partial. |

### Issues đã đăng từ findings D-MREG

- **Issue #13 — thiếu trường xác nhận:** [Form đăng ký thiếu trường xác nhận mật khẩu](https://github.com/tzin1401/testing-hw02/issues/13). D-R07, D-DT-001; ảnh form thật đã đính kèm. Severity/Priority Major/P1.
- **Issue #14 — validation họ tên/email:** [Đăng ký chấp nhận họ tên hoặc email rỗng/sai định dạng](https://github.com/tzin1401/testing-hw02/issues/14). D-R01/D-R02/D-R03; gộp ba probe theo nhóm validation input nhưng ghi từng bước và evidence riêng. Severity/Priority Major/P1. Body nêu rõ đây là variant trên form thiếu confirmation, không nâng full TC lên Fail.
- **Issue #8 — email trùng:** [API đăng ký tạo tài khoản mới dù email đã tồn tại](https://github.com/tzin1401/testing-hw02/issues/8). Body được cập nhật để ghi Mobile variant là observation giới hạn, không đổi trạng thái full D-DT-006; ảnh API log đã upload.

Cả ba issue đều OPEN và có labels `type: bug`, `status: new`, severity, priority và module phù hợp. Issue #8 đính kèm bản trình bày từ API JSON log đã lưu; source JSON được dẫn trong body. Ảnh này là bằng chứng log, không phải screenshot UI.

## Các điểm chưa được kết luận là bug

- D-BV-002 length 8 gặp `Network request failed`; không kết luận biên 8 pass/fail.
- D-BV-006/007 chưa có event/ảnh riêng; không mượn ca Domain tương tự để đánh dấu đã chạy.
- Email race, trim, Unicode, max length, câu chữ lỗi, hành vi network/retry chưa có expected đủ rõ hoặc chưa chạy.
- Thiếu confirmation đã làm các test bốn trường không thể hoàn thành; các outcome của ba trường hiện có là findings quan sát được nhưng không nâng thành full testcase verdict.

## AI / execution gaps có bằng chứng

- Run ban đầu dùng thao tác tap header không mở Login; sau đó run bổ sung thành công bằng điều hướng qua Login và liên kết đăng ký. Kết quả đầu tiên là blocker của automation, không phải bug điều hướng SUT.
- Lượt run bổ sung dừng sau D-BV-005; D-BV-006/007 không được chạy. Audit/output trước đó có chỗ mô tả robustness đến D-BV-007 như đã Pass; mô tả đó không khớp event log và cần được bỏ/đính chính.
- Các lượt automation mới ngày 16/10 cũng không hoàn thành D-BV-006/007: một lượt chạy chồng với tên nhập sai; ba lượt dừng ở kiểm tra input; lượt manual có ảnh trước submit nhưng thoát Expo Go về Home trước khi lưu response. Giữ lại dưới Run ID trong `06-execution.md`, không tính là kết quả SUT. Đây là AI execution gap có bằng chứng.
- D-BV-002 lỗi network làm input đúng LB chưa được xác minh; không được dùng D-DT-002 thành công làm bằng chứng thay thế do email/setup/run khác.
