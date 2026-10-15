# C-FR14 — Nhật ký thực thi Domain và BVA

**Run chính:** `20261015T055119Z-CFR14`
**Run bổ sung:** `20261015T154202360Z-supp` (checkpoint phụ, không thay thế các 23 TC thiết kế)
**SUT baseline:** `85af3ba875c88283615e22cb108f13e2fccaf0e9`. Linux x86_64, Node 22.22.1, Chrome Headless 154.0.8037.57; Admin `127.0.0.1:5174`, backend `127.0.0.1:3000`. Danh mục mẫu ID 1–3 được giữ nguyên; các bản ghi test được dọn theo ID sau khi lưu bằng chứng.

## Kết quả 23 ca thiết kế

| TC ID | Kết quả | Actual có căn cứ | Evidence |
|---|---|---|---|
| C-DT-001 | Pass | Admin thêm tên ASCII test; dòng xuất hiện. | `ui-evidence.json`, `C-DT-001-after.png` |
| C-DT-002 | Pass | Admin thêm tên Unicode có dấu; hiển thị đúng. | `ui-evidence.json`, `C-DT-002-after.png` |
| C-DT-003 | Fail | Tên rỗng tạo được danh mục test; ID được dọn sau khi lưu evidence. | Trước/sau trong `ui-evidence.json`, `issue-empty-name-evidence.json` |
| C-DT-004 | Observation | Ba dấu cách được nhận; SRS không chốt trim/whitespace-only. | `ui-evidence.json`, ảnh input/after |
| C-DT-005 | Pass | Danh sách có dữ liệu test hiển thị được. | `ui-evidence.json`, `C-DT-005-list.png` |
| C-DT-006 | Observation | GET trả danh sách cho admin/user/không token; quyền GET không được suy rộng. | `api-evidence.json` |
| C-DT-007 | Pass | Xóa đúng category test ID 24; các mục khác còn. Lần click ngoài viewport ban đầu không tính; lần retry có target nhìn thấy. | `C-DT-007-retry.json`, ảnh retry |
| C-DT-008 | Blocked | Không có dialog; dòng test bị xóa ngay. Không có nhánh Hủy để chạy. FR-14 không bắt buộc dialog nên không ghi bug. | `C-DT-008-final.json`, ảnh trước/sau |
| C-DT-009 | Pass | POST với JWT admin tạo category test; GET thấy tên. | `api-evidence.json` |
| C-DT-010 | Pass | DELETE với JWT admin xóa đúng target test. | `api-evidence.json` |
| C-DT-011 | Pass | POST thiếu token bị từ chối, không tạo category. | `api-evidence.json` |
| C-DT-012 | Pass | POST token giả bị từ chối, state không đổi. | `api-evidence.json` |
| C-DT-013 | Pass | POST token hết hạn bị từ chối, state không đổi. | `api-evidence.json` |
| C-DT-014 | Fail | POST JWT role user tạo category ID test 6; đã dọn đúng target. | `api-evidence.json`, cleanup evidence |
| C-DT-015 | Pass | DELETE thiếu token bị từ chối; target test còn. | `api-evidence.json` |
| C-DT-016 | Pass | DELETE token giả bị từ chối; target test còn. | `api-evidence.json` |
| C-DT-017 | Pass | DELETE token hết hạn bị từ chối; target test còn. | `api-evidence.json` |
| C-DT-018 | Fail | DELETE JWT role user xóa target test ID 10. | `api-evidence.json` |
| C-BV-001 | Fail | Biên 0 ký tự tạo được tên rỗng. | Ảnh trước/sau, `issue-empty-name-evidence.json` |
| C-BV-002 | Pass | Tên 1 ký tự `Q` được tạo và hiển thị. | `ui-evidence.json`, ảnh input/after |
| C-BV-003 | Pass | Tên 2 ký tự `QZ` được tạo và hiển thị. | `ui-evidence.json`, ảnh input/after |
| C-BV-004 | Pass | DELETE đúng ID đang tồn tại do test tạo; target biến mất. | `api-evidence.json` |
| C-BV-005 | Observation | ID 0 vắng mặt; DELETE trả HTTP 200, đối chứng còn. Expected cho ID không tồn tại chưa được quy định. | `api-evidence.json` |

**Tổng:** 15 Pass, 4 Fail, 1 Blocked, 3 Observation-only. HTTP status ở bảng là actual, không được nâng thành expected nếu hợp đồng không nêu.

## Checkpoint bổ sung về giao diện Admin

Run bổ sung có hai record nhưng chỉ guest có evidence checkpoint đủ để nói trang mở ra form Admin Login, không hiển thị dashboard (`C-SUP-UI-GUEST-guest.png`). Record user role cho biết fixture được tạo là `supp-...@example.com`, nhưng checkpoint login lại dùng `test@eshop.com` và chỉ ghi alert “Đăng nhập thất bại”; không có request/response chứng minh credentials hợp lệ hoặc nguyên nhân là role. Vì vậy **không** kết luận C-R01 UI role-user đã được kiểm tra thành công. User UI role test còn chưa đủ bằng chứng; API role user POST/DELETE trong C-DT-014/018 vẫn là hai kết quả riêng.

## Cleanup và giới hạn

Các danh mục test do run tạo đã được dọn theo ID; category mẫu ID 1–3 không bị sửa/xóa. Bằng chứng gốc nằm tại `evidence/C-FR14/full-runs/20261015T055119Z-CFR14/` và checkpoint phụ tại `evidence/C-FR14/supplement-runs/20261015T154202360Z-supp/`.

Không kết luận uniqueness, whitespace policy, max length, hành vi xóa ID không tồn tại, HTTP error status/body, hoặc quyền xem danh sách. Không có cơ sở để ghi dialog xóa là bug theo FR-14. Issue #6 và #7 đã được đăng; cần kiểm tra attachment ảnh của #7 riêng vì log/API JSON trong body không tương đương ảnh đính kèm.

## Bổ sung C-R01 — Login UI với user fixture hợp lệ

**Run ID:** `20261016T003500Z-CUI-user`; Admin UI vẫn chạy tại `127.0.0.1:5174`, backend PID 620916 chạy từ bản sao `/tmp/hw02-dmreg-isolated-run` (không phải DB SUT). Fixture user được tạo trong run bổ sung trước đó: ID 11, `supp-20261015t154202360z-supp@example.com`, role `user`; password chỉ ghi `[REDACTED]`. DB clone xác minh bằng truy vấn read-only; lần login gọi API trả HTTP 200 (preflight 204).

| Checkpoint | Thao tác/Expected | Actual | Kết luận | Evidence |
|---|---|---|---|---|
| C-SUP-UI-USER-VALID | Dùng credentials hợp lệ của account role user ở trang Admin Login; không cấp dashboard/token Admin. | Login API HTTP 200; giao diện hiện alert “Bạn không phải là admin!”, vẫn ở Admin Login; `adminTokenPresent=false`. | Pass cho việc user thường không vào được Admin UI. Đây là kiểm tra bổ sung C-R01, tách khỏi API POST/DELETE C-DT-014/018. | `supplement-runs/20261016T003500Z-CUI-user/{before,credentials-entered,after-submit}.png`, `result.json`, `events.jsonl`, `fixture-state-readonly.json`. |

Lần thử trước trong `20261015T154202360Z-supp` nhập `test@eshop.com` và nhận alert generic “Đăng nhập thất bại”; lần đó vẫn là inconclusive, không dùng làm evidence Pass. Run mới này dùng đúng fixture `supp-…` đã xác minh role và credentials thành công qua login API. Database dùng là clone cô lập; không restart backend, không thay đổi DB trong repo.
