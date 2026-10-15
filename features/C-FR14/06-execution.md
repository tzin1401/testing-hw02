# C-FR14 — Kết quả thực thi Domain và BVA

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2.
**Run ID:** `20261015T055119Z-CFR14` (UTC; 12:51:19 ngày 15/10/2026, UTC+07).
**SUT baseline:** `85af3ba875c88283615e22cb108f13e2fccaf0e9`.
**Repo bài làm tại thời điểm chạy:** `a6bceb2e2d367bcd5d087259f2bb738534176e61`.

## Môi trường và cách chạy

- Linux x86_64, kernel `7.0.0-34-generic`; Node.js `v22.22.1`; Chrome Headless `154.0.8037.57`.
- Backend `http://127.0.0.1:3000`, Admin `http://127.0.0.1:5174`; Web/Admin/backend đều phản hồi trước khi chạy. Admin UI được thao tác qua Chrome DevTools Protocol bằng click/nhập bàn phím; API gọi tuần tự bằng HTTP.
- Tài khoản fixture đã xác nhận bằng login: `admin@eshop.com` role `admin`; `test@eshop.com` role `user`. Không ghi mật khẩu hoặc JWT vào evidence. Tạo token hết hạn riêng cho test với claim role admin; token không được lưu.
- Danh mục ban đầu: ID 1 `Điện thoại`, ID 2 `Laptop`, ID 3 `Phụ kiện`. DB đọc chỉ-đọc cho thấy các danh mục này đang được sản phẩm tham chiếu; không sửa hoặc xóa chúng.
- Thời gian UTC và `monotonic_ms` được ghi ở request API và các checkpoint chính trong `api-evidence.json` / `ui-evidence.json`. Response được lưu cùng danh sách category trước/sau. UI có ảnh PNG cho từng ca tương ứng.

## Tóm tắt kết quả

Trong 23 ca: **15 Pass, 4 Fail, 1 Blocked và 3 observation-only**. Fail là hai lần cho phép tên rỗng và hai lần cho phép role user thường ghi/xóa danh mục. Whitespace, quyền GET và ID không tồn tại được giữ observation-only vì expected chưa được đặc tả. Ca dialog/Hủy bị Blocked vì UI không hiện dialog.

| TC ID | Kết quả | Actual và căn cứ | Bằng chứng |
|---|---|---|---|
| C-DT-001 | Pass | Admin UI thêm tên ASCII `C14-DT-001-ASCII`; ID 13 xuất hiện đúng trong danh sách. Dọn đúng ID 13 sau khi lưu evidence. | `evidence/C-FR14/full-runs/20261015T055119Z-CFR14/ui-evidence.json`; `screenshots/C-DT-001-after.png` |
| C-DT-002 | Pass | Admin UI thêm `C14-DT-002-Đồ uống thử`; ID 14 và tên có dấu hiển thị đúng. | `ui-evidence.json`; `screenshots/C-DT-002-after.png` |
| C-DT-003 | **Fail** | Submit trường tên rỗng tạo một dòng tên rỗng (ID 15). FR-14 yêu cầu tên bắt buộc/không để trống. Dọn ID 15 sau khi lưu bằng chứng. | `ui-evidence.json`; `screenshots/C-DT-003-before.png`, `C-DT-003-after.png`; `cleanup-evidence.json`; ảnh tái hiện bổ sung `screenshots/issue-empty-name-after-created.png` |
| C-DT-004 | Observation-only | Gửi đúng ba dấu cách tạo dòng tên ba dấu cách (ID 17). Không chấm Pass/Fail vì SRS không nói trim hoặc whitespace-only có phải rỗng. Dọn ID 17 sau khi lưu evidence. | `ui-evidence.json`; `screenshots/spaces-input-input.png`, `C-DT-004-after.png`; `cleanup-evidence.json` |
| C-DT-005 | Pass | Admin xem danh sách có dữ liệu, bao gồm category test ID 18; danh sách hiển thị được. Dọn ID 18 sau khi lưu. | `ui-evidence.json`; `screenshots/C-DT-005-list.png` |
| C-DT-006 | Observation-only | GET không token, token user, token admin đều trả danh sách (HTTP 200); state không đổi. Quyền GET chưa chốt, không coi user/khách xem được là lỗi. | `api-evidence.json`, mục `C-DT-006` |
| C-DT-007 | Pass | Tạo category riêng ID 24 ở lần chạy UI hợp lệ cuối, cuộn đúng dòng vào vùng nhìn thấy rồi bấm Xóa; ID 24 biến mất, các dòng khác còn. Lần click đầu bị hụt vì dòng ngoài viewport; lần chạy hợp lệ có checkpoint riêng. ID 19 từ lần chuẩn bị trước được dọn sau khi lưu evidence. | `C-DT-007-retry.json`; `screenshots/C-DT-007-retry-before.png`, `C-DT-007-retry-after.png`; `cleanup-evidence.json` |
| C-DT-008 | Blocked | Không có dialog xác nhận trên UI. Khi bấm Xóa ở ca kiểm tra cuối, danh mục test ID 25 bị xóa ngay; không có nút Hủy để thử. Không kết luận đây là bug vì SRS không bắt buộc dialog. | `C-DT-008-final.json`; `screenshots/C-DT-008-final-before.png`, `C-DT-008-final-after.png` |
| C-DT-009 | Pass | POST với JWT admin tạo category ID 4; GET sau đó thấy đúng tên. Dọn ID 4 sau khi lưu evidence. | `api-evidence.json`, mục `C-DT-009`; `cleanup` trong cùng file |
| C-DT-010 | Pass | POST setup tạo target test ID 5; DELETE admin thành công, target biến mất, các mục còn lại không đổi. | `api-evidence.json`, mục `C-DT-010` |
| C-DT-011 | Pass | POST thiếu Authorization trả HTTP 401; tên không xuất hiện và danh sách không đổi. Status chỉ là actual, không phải expected. | `api-evidence.json`, mục `C-DT-011` |
| C-DT-012 | Pass | POST token giả trả HTTP 403; tên không xuất hiện, danh sách không đổi. | `api-evidence.json`, mục `C-DT-012` |
| C-DT-013 | Pass | POST token admin đã hết hạn trả HTTP 403; tên không xuất hiện, danh sách không đổi. | `api-evidence.json`, mục `C-DT-013` |
| C-DT-014 | **Fail** | POST với JWT hợp lệ role `user` trả HTTP 200, tạo category ID 6. FR-12 yêu cầu API ghi danh mục cần role admin. Dọn đúng ID 6 sau khi lưu evidence. | `api-evidence.json`, mục `C-DT-014`; `cleanup-evidence.json` |
| C-DT-015 | Pass | DELETE thiếu Authorization trả HTTP 401; target test ID 7 vẫn có trong danh sách; dọn đúng ID 7 sau khi lưu evidence. | `api-evidence.json`, mục `C-DT-015` |
| C-DT-016 | Pass | DELETE token giả trả HTTP 403; target test ID 8 còn; dọn đúng ID 8 sau khi lưu evidence. | `api-evidence.json`, mục `C-DT-016` |
| C-DT-017 | Pass | DELETE token admin hết hạn trả HTTP 403; target test ID 9 còn; dọn đúng ID 9 sau khi lưu evidence. | `api-evidence.json`, mục `C-DT-017` |
| C-DT-018 | **Fail** | DELETE với JWT hợp lệ role `user` trả HTTP 200 và xóa target test ID 10. FR-12 yêu cầu role admin cho API ghi. Target do chính ca tạo. | `api-evidence.json`, mục `C-DT-018` |
| C-BV-001 | **Fail** | Biên dưới 0 ký tự: submit form rỗng tạo category tên rỗng ID 16. Dọn ID 16 sau khi lưu evidence. | `ui-evidence.json`; `screenshots/C-BV-001-before.png`, `C-BV-001-after.png`; `cleanup-evidence.json`; ảnh tái hiện bổ sung `screenshots/issue-empty-name-after-created.png` |
| C-BV-002 | Pass | Tên một ký tự ASCII `Q` được tạo và hiển thị đúng (ID 21). Dọn ID 21 sau khi lưu. | `ui-evidence.json`; ảnh `Q-input.png` và `C-BV-002-after.png` |
| C-BV-003 | Pass | Tên hai ký tự ASCII `QZ` được tạo và hiển thị đúng (ID 22). Dọn ID 22 sau khi lưu. | `ui-evidence.json`; ảnh `QZ-input.png` và `C-BV-003-after.png` |
| C-BV-004 | Pass | Xóa ID tồn tại do ca tạo (ID 11); target biến mất, mục khác được giữ nguyên. | `api-evidence.json`, mục `C-BV-004` |
| C-BV-005 | Observation-only | Candidate ID 0 vắng mặt trước request; DELETE trả HTTP 200; category đối chứng ID 12 vẫn còn. SRS không định nghĩa response khi ID không tồn tại nên không chấm theo status/body. Dọn ID 12 sau khi lưu. | `api-evidence.json`, mục `C-BV-005`; `cleanup` trong cùng file |

## Dữ liệu test và cleanup

- Các request API và UI dùng category test do ca tự tạo; target xóa thành công đều là ID test. Không target ID 1–3 hoặc dữ liệu mẫu.
- Bằng chứng được lưu trước khi cleanup. Các category test dùng làm setup/validation được dọn theo đúng ID/tên sau khi lưu evidence; các target ID 10, 11, 24, 25 đã được xóa như thao tác của ca. Những lần thử UI chưa hợp lệ cũng để lại test rows ID 19 và 23; sau khi chụp evidence, chúng được xác nhận đúng tên rồi dọn. Snapshot cuối chỉ còn ID 1–3.
- API POST role user tạo ID 6 và UI empty-name tạo ID 15/16; đây là actual lỗi được giữ trong request/response/ảnh trước khi dọn đúng test data.

## Giới hạn và kết luận

- Không chạy thử truy cập Admin UI với user thường/khách; C-R01 UI access vẫn là coverage gap. API test role user là riêng biệt và không thay thế UI test.
- Không suy rộng quyền từ GET `/api/categories`; C-DT-006 là observation-only.
- Không đánh giá uniqueness, whitespace policy, giới hạn tên, hành vi xóa ID không tồn tại, dialog bắt buộc, hoặc HTTP error body/status theo đặc tả. Không tạo bug từ các điểm này.
- Có hai nhóm sai lệch có expected rõ: tên rỗng được thêm (C-DT-003/C-BV-001) và role user có thể POST/DELETE (C-DT-014/C-DT-018). Issue draft được ghi ở `07-bugs-and-ai-gaps.md`, chưa đăng.
