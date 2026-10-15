# D-MREG — Findings, issue draft và AI gaps

**Baseline:** `85af3ba875c88283615e22cb108f13e2fccaf0e9`
**Mobile run:** `20261015T153620Z-57c022`, Pixel 9 / Android 15 / API 35 / Expo Go SDK 54.
**API run:** `20261015T1303Z-DMREG` trên backend clone cô lập; không thay Mobile UI.

## Findings có evidence

| Finding | Requirement / TC | Actual | Evidence | GitHub |
|---|---|---|---|---|
| Form thiếu trường xác nhận mật khẩu | D-R07; D-DT-001 Fail | Chỉ có Họ tên, Email, Mật khẩu. | `supplement-runs/20261015T153620Z-57c022/D-DT-001-register-form.png`, presence event | Chưa có issue riêng trong #1–#8. Issue draft cần tạo kèm ảnh form. |
| Họ tên rỗng được chấp nhận ở form 3 trường | D-R01; probe liên quan D-DT-003 | App báo thành công, DB test count 0→1. | `D-DT-003-before.png`, `D-DT-003-response.png`, event | Chưa có issue riêng. Vì thiếu confirmation, ghi là probe variant, không phải full TC Fail. |
| Email rỗng được chấp nhận ở form 3 trường | D-R02; probe liên quan D-DT-004 | App báo thành công, DB test count 0→1. | `D-DT-004-before.png`, `D-DT-004-response.png`, event | Chưa có issue riêng. Probe variant. |
| Email sai format được chấp nhận ở form 3 trường | D-R03; probe liên quan D-DT-005 | Email không có `@` được chấp nhận; app báo thành công, count 0→1. | `D-DT-005-before.png`, `D-DT-005-response.png`, event | Chưa có issue riêng. Probe variant. |
| Email trùng tạo account thứ hai | D-R04; API evidence và probe Mobile liên quan D-DT-006 | API POST lặp tuần tự count 0→1→2; Mobile variant cũng count 1→2 và báo thành công. Không thử race. | `full-runs/20261015T1303Z-DMREG/api-registration-duplicate-isolated.json`; `supplement-runs/20261015T153620Z-57c022/D-DT-006-{before,response}.png` và event | Issue #8 đã có nhưng ghi API-only; cần cập nhật nội dung/evidence từ Mobile variant sau khi ảnh được đính kèm. |
| Mật khẩu rỗng/thiếu nhóm bị chặn trong các probe | D-R05/D-R06; D-DT-007–011, D-BV-001, D-BV-004/005 | Có thông báo password và DB count 0→0. | Ảnh response và event từng TC | Không phải bug từ bằng chứng hiện tại; full flow vẫn partial. |

### Issue draft cần bổ sung

**Draft 1 — thiếu trường xác nhận:** `[BUG][Mobile] Form đăng ký không có trường Xác nhận mật khẩu` — Expected: FR-01 yêu cầu trường bắt buộc và giá trị phải khớp; Actual: form có ba trường. TC `D-DT-001`; ảnh `D-DT-001-register-form.png`; severity đề xuất Major/P1 vì không thể thực hiện một yêu cầu bắt buộc. Cần bổ sung steps/môi trường/labels theo template slide trước khi đăng.

**Draft 2 — validation họ tên:** `[BUG][Mobile] Form đăng ký chấp nhận họ tên để trống` — Expected: không đăng ký khi họ tên thiếu; Actual probe: success alert/count tăng 0→1. TC liên quan `D-DT-003` (variant 3 field); ảnh trước/sau. Severity đề xuất Major/P1 do tạo account thiếu thông tin bắt buộc. Ghi rõ confirmation field đang absent, đây là variant.

**Draft 3 — email validation:** `[BUG][Mobile] Form đăng ký chấp nhận email rỗng hoặc sai định dạng` — Expected: email bắt buộc và đúng format; Actual probes riêng: email rỗng và chuỗi không có `@` đều success/count tăng. TC liên quan `D-DT-004/005` (variants 3 field); đính kèm hai bộ ảnh, không gộp hai input trong một lần chạy. Severity đề xuất Major/P1 vì account có định danh email không hợp lệ.

### Issue #8 — cần đồng bộ lại với evidence mới

Issue #8 đã được đăng cho lỗi API duplicate email, severity/priority Major/P1. Nội dung đã đăng trước đó nêu Mobile D-DT-006 Blocked. Run bổ sung sau đó có Mobile variant count 1→2 và success alert. Cập nhật issue để nói rõ đây là variant trên form thiếu confirmation, không đổi full TC status. API log có password redacted; ảnh Mobile không lộ password. Chưa xác minh ảnh API screenshot được gắn trong issue; JSON/link không thay ảnh theo yêu cầu đề.

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
