# C-FR14 — Bug report và AI gaps

**SUT baseline:** `85af3ba875c88283615e22cb108f13e2fccaf0e9`.
**Run:** `20261015T055119Z-CFR14`.
**Nguồn expected:** SRS `README.md` FR-14 và FR-12; API specification mục 3.4. Không dùng code SUT để quyết định expected.

## Bug đã tái hiện

### BUG-CFR14-01 — Có thể tạo danh mục với tên rỗng

- **Title:** `[BUG][Admin] Hệ thống cho phép tạo danh mục khi tên để trống`
- **Mô tả:** FR-14 ghi tên danh mục là bắt buộc và không được để trống. Trên Admin UI, để trống trường tên và bấm **Thêm mới** vẫn tạo dòng danh mục có tên rỗng.
- **Môi trường:** Linux x86_64; Chrome Headless `154.0.8037.57`; Admin `http://127.0.0.1:5174`; backend `http://127.0.0.1:3000`; SUT commit `85af3ba875c88283615e22cb108f13e2fccaf0e9`; phiên đăng nhập admin fixture.
- **Steps to reproduce:**
  1. Đăng nhập Admin bằng role admin và mở **Danh mục**.
  2. Để ô tên danh mục rỗng.
  3. Bấm **Thêm mới** một lần.
  4. Quan sát danh sách; dòng mới có ID 26 nhưng tên rỗng.
- **Expected:** Không tạo danh mục tên rỗng, theo FR-14 “tên bắt buộc, không được để trống”. Không yêu cầu wording/status cụ thể.
- **Actual:** Danh mục tên rỗng được tạo; API `GET /api/categories` ghi nhận ID 26. Dòng test được xóa đúng ID 26 sau khi lưu bằng chứng.
- **TC liên quan:** C-DT-003, C-BV-001.
- **Severity / Priority:** `severity: minor`, `priority: P2`. Chức năng tạo danh mục sai validation nhưng cần quyền admin và không làm thay đổi dữ liệu mẫu; ảnh hưởng dữ liệu quản trị và vi phạm yêu cầu bắt buộc, chưa có bằng chứng mất dữ liệu khác.
- **Labels đề xuất:** `type: bug`, `severity: minor`, `priority: P2`, `status: new`, `module: admin`.
- **Evidence cần đính kèm:** `evidence/C-FR14/full-runs/20261015T055119Z-CFR14/screenshots/issue-empty-name-before.png`, `.../screenshots/issue-empty-name-after-created.png`, `.../issue-empty-name-evidence.json`. Ảnh sau cho thấy ID 26 với tên trống; JSON có snapshot trước/sau và cleanup đúng ID.

### BUG-CFR14-02 — Role user thường ghi/xóa được danh mục qua API

- **Title:** `[BUG][API] API categories cho phép user thường POST và DELETE`
- **Mô tả:** FR-12 yêu cầu API ghi danh mục cần JWT hợp lệ và role admin. Hai request có JWT hợp lệ role `user` đã thay đổi dữ liệu: POST tạo category ID 6, DELETE xóa target test ID 10.
- **Môi trường:** Linux x86_64; backend `http://127.0.0.1:3000`; SUT commit `85af3ba875c88283615e22cb108f13e2fccaf0e9`; fixture `test@eshop.com` xác nhận role `user`; token không lưu trong artifact.
- **Steps to reproduce:**
  1. Lấy JWT bằng fixture có role `user`.
  2. POST `/api/categories` với body `{"name":"<tên test mới>"}` và Bearer user token. Quan sát request tạo category ID 6.
  3. Tạo target category test riêng bằng admin và ghi ID; trong lần chạy ghi ID 10.
  4. Gọi DELETE `/api/categories/10` bằng chính Bearer user token.
  5. GET danh sách sau từng thao tác và đối chiếu state.
- **Expected:** Theo FR-12, chỉ role admin mới được phép gọi API ghi danh mục. Với role user, POST không tạo danh mục và DELETE không xóa target. Không đặt HTTP status/body cụ thể.
- **Actual:** POST role user trả HTTP 200 và tạo ID 6; DELETE role user trả HTTP 200 và xóa ID 10. Các thao tác thiếu token, token giả và token hết hạn bị từ chối; GET được kiểm tra riêng và không được xem là lỗi phân quyền.
- **TC liên quan:** C-DT-014, C-DT-018. Không dùng UI Admin để suy ra API permission.
- **Severity / Priority:** `severity: major`, `priority: P1`. Role user không được phép thay đổi danh mục; có thể làm sai dữ liệu quản trị hoặc xóa category. Target trong lần test là dữ liệu test riêng, không phải category mẫu.
- **Labels đề xuất:** `type: bug`, `severity: major`, `priority: P1`, `status: new`, `module: api`.
- **Evidence cần đính kèm:** `evidence/C-FR14/full-runs/20261015T055119Z-CFR14/api-evidence.json`, mục `C-DT-014` và `C-DT-018`; `cleanup-evidence.json` ghi nhận chỉ xóa category test ID 6. Response đã che token, kèm snapshot category trước/sau.

## Phân loại các ca chưa thành bug

- C-DT-004: ba dấu cách được nhận, nhưng trim/whitespace-only chưa có expected trong SRS; chỉ observation.
- C-DT-006: GET trả danh sách cho admin, user và không token; quyền GET chưa được đặc tả, không tạo bug.
- C-DT-008: UI không hiện dialog; FR-14 không bắt buộc dialog/Hủy, ca phụ thuộc dialog được ghi Blocked.
- C-BV-005: DELETE ID không tồn tại trả HTTP 200 nhưng SRS không nêu expected cho ID này; chỉ observation.
- Không kết luận uniqueness, giới hạn độ dài tên, policy trim, status/body cụ thể, hoặc xử lý category đang được sản phẩm tham chiếu.

## AI gaps và giới hạn coverage

- Lượt automation UI đầu nhắm vào dòng nằm ngoài viewport. Ảnh đầu cho thấy danh sách chưa cuộn tới target và state không đổi; không dùng lần click đó làm kết quả. Đã cuộn đúng target vào vùng nhìn thấy và chạy lại C-DT-007, thu được kết quả hợp lệ. Dấu vết trong `C-DT-007-retry.json` và ảnh retry.
- Ở các ca tên rỗng, automation ban đầu chỉ chụp viewport đầu danh sách, chưa làm dòng rỗng mới thấy rõ trên ảnh. Đã chạy capture bổ sung cho C-DT-003: ảnh cuộn tới dòng ID 26 và snapshot API trước/sau được lưu; kết quả chính không bị thay đổi.
- C-R01 về quyền truy cập **Admin UI** của user thường/khách chưa được kiểm tra trực tiếp. API POST/DELETE role user là phép thử riêng, không thay thế UI access test.
- Không đăng GitHub Issue trong lượt này. Hai nội dung trên là draft theo cấu trúc slide (title, environment, steps, expected/actual, evidence, labels); chưa có thao tác đăng qua CLI/web.
