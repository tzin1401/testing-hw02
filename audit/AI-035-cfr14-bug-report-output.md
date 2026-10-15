# C-FR14 — Bug report và AI gaps

**SUT baseline:** `85af3ba875c88283615e22cb108f13e2fccaf0e9`.
**Run:** `20261015T055119Z-CFR14`.
**Nguồn expected:** [SRS `eshop-sut/README.md`](../../eshop-sut/README.md), FR-12 dòng 174–179 và FR-14 dòng 186–189; API specification mục 3.4 xác nhận endpoint. FR-14 yêu cầu Admin thêm/xem/xóa và tên bắt buộc không rỗng. FR-12 yêu cầu JWT hợp lệ cùng role `admin` cho các API ghi `/api/categories`. Không dùng code SUT để quyết định expected.

## Bug đã tái hiện

### Issue draft C-FR14-01 — Có thể tạo danh mục với tên rỗng

- **Title:** `[BUG][Admin] Hệ thống cho phép tạo danh mục khi tên để trống`
- **Mô tả:** FR-14 ghi tên danh mục là bắt buộc và không được để trống. Trên Admin UI, để trống trường tên và bấm **Thêm mới** vẫn tạo dòng danh mục có tên rỗng.
- **Môi trường:** Linux x86_64; Chrome Headless `154.0.8037.57`; Admin `http://127.0.0.1:5174`; backend `http://127.0.0.1:3000`; SUT commit `85af3ba875c88283615e22cb108f13e2fccaf0e9`; phiên đăng nhập admin fixture.
- **Body đề xuất:**

  ```markdown
  ## Mô tả lỗi
  Admin UI tạo được danh mục dù tên để trống, trái với FR-14: tên danh mục bắt buộc và không được để trống.

  ## Môi trường
  Linux x86_64; Chrome Headless 154.0.8037.57; Admin http://127.0.0.1:5174; backend http://127.0.0.1:3000; SUT commit 85af3ba875c88283615e22cb108f13e2fccaf0e9; tài khoản role admin.

  ## Steps to reproduce
  1. Đăng nhập Admin và mở Danh mục.
  2. Để ô tên danh mục rỗng.
  3. Bấm Thêm mới một lần.
  4. Quan sát danh sách và đối chiếu ID mới.

  ## Expected result
  Không tạo danh mục nếu tên rỗng (SRS FR-14). Không yêu cầu wording/status cụ thể.

  ## Actual result
  Danh mục rỗng được tạo; lần tái hiện bổ sung ghi nhận ID 26.

  ## Test cases
  C-DT-003, C-BV-001.

  ## Severity / Priority
  Minor / P2: sai validation và làm bẩn dữ liệu quản trị, nhưng cần phiên admin; lần chạy không làm thay đổi dữ liệu mẫu hoặc gây mất dữ liệu khác.

  ## Evidence
  Đính kèm ảnh trước/sau bên dưới và issue-empty-name-evidence.json (snapshot trước/sau, request/response và cleanup đúng ID test).
  ```

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
- **Evidence cần đính kèm:** ảnh [trước](../../evidence/C-FR14/full-runs/20261015T055119Z-CFR14/screenshots/issue-empty-name-before.png) và [sau](../../evidence/C-FR14/full-runs/20261015T055119Z-CFR14/screenshots/issue-empty-name-after-created.png), cùng `issue-empty-name-evidence.json`. Ảnh sau cho thấy ID 26 với tên trống; JSON có snapshot trước/sau và cleanup đúng ID.

### Issue draft C-FR14-02 — Role user thường ghi/xóa được danh mục qua API

- **Title:** `[BUG][API] API categories cho phép user thường POST và DELETE`
- **Mô tả:** FR-12 yêu cầu API ghi danh mục cần JWT hợp lệ và role admin. Hai request có JWT hợp lệ role `user` đã thay đổi dữ liệu: POST tạo category ID 6, DELETE xóa target test ID 10.
- **Môi trường:** Linux x86_64; backend `http://127.0.0.1:3000`; SUT commit `85af3ba875c88283615e22cb108f13e2fccaf0e9`; fixture `test@eshop.com` xác nhận role `user`; token không lưu trong artifact.
- **Body đề xuất:**

  ```markdown
  ## Mô tả lỗi
  API ghi danh mục chấp nhận JWT hợp lệ của tài khoản role user. FR-12 yêu cầu các API POST/DELETE ảnh hưởng dữ liệu phải có JWT hợp lệ và role admin.

  ## Môi trường
  Linux x86_64; backend http://127.0.0.1:3000; SUT commit 85af3ba875c88283615e22cb108f13e2fccaf0e9; fixture test@eshop.com có role user.

  ## Steps to reproduce
  1. Đăng nhập bằng fixture role user và giữ JWT trong bộ nhớ (không đưa token vào issue).
  2. Gửi POST /api/categories với body {"name":"C14-user-post-test"} và Bearer user token.
  3. Tạo một category khác riêng bằng admin; ghi ID trả về.
  4. Gửi DELETE /api/categories/<ID-test> bằng Bearer user token.
  5. Gọi GET /api/categories sau từng thao tác để đối chiếu state.

  ## Expected result
  FR-12 chỉ cho role admin thực hiện API ghi: POST không tạo category và DELETE không xóa target. Không yêu cầu status/body cụ thể.

  ## Actual result
  POST role user tạo category test ID 6; DELETE role user xóa category test ID 10. Request/response đã che token trong evidence.

  ## Test cases
  C-DT-014 (POST), C-DT-018 (DELETE).

  ## Severity / Priority
  Major / P1: tài khoản thường có thể thay đổi hoặc xóa dữ liệu danh mục, trái kiểm soát truy cập; target kiểm thử là dữ liệu test riêng.

  ## Evidence
  Đính kèm api-evidence.json, gồm request/response và snapshot state trước/sau cho hai TC. Đây là ca API-only; không có ảnh UI mô tả được quyền API, nên dùng network log redacted làm evidence theo slide.
  ```

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
- **Evidence cần đính kèm:** `api-evidence.json`, mục `C-DT-014` và `C-DT-018`; `cleanup-evidence.json` cho biết các ID test được dọn sau evidence. Response đã che token, kèm snapshot category trước/sau. Không tạo ảnh UI giả cho ca API-only; network log là evidence.

## Phân loại các ca chưa thành bug

- C-DT-004: ba dấu cách được nhận, nhưng trim/whitespace-only chưa có expected trong SRS; chỉ observation.
- C-DT-006: GET trả danh sách cho admin, user và không token; quyền GET chưa được đặc tả, không tạo bug.
- C-DT-008: UI không hiện dialog; FR-14 không bắt buộc dialog/Hủy, ca phụ thuộc dialog được ghi Blocked.
- C-BV-005: DELETE ID không tồn tại trả HTTP 200 nhưng SRS không nêu expected cho ID này; chỉ observation.
- Không kết luận uniqueness, giới hạn độ dài tên, policy trim, status/body cụ thể, hoặc xử lý category đang được sản phẩm tham chiếu.

## AI gaps và giới hạn coverage

- Lượt automation UI đầu nhắm vào dòng nằm ngoài viewport. Ảnh đầu cho thấy danh sách chưa cuộn tới target và state không đổi; không dùng lần click đó làm kết quả. Đã cuộn đúng target vào vùng nhìn thấy và chạy lại C-DT-007, thu được kết quả hợp lệ. Dấu vết trong `C-DT-007-retry.json` và ảnh retry.
- Ở các ca tên rỗng, automation ban đầu chỉ chụp viewport đầu danh sách, chưa làm dòng rỗng mới thấy rõ trên ảnh. Đã chạy capture bổ sung cho C-DT-003: ảnh cuộn tới dòng ID 26 và snapshot API trước/sau được lưu; kết quả chính không bị thay đổi.
- `api-evidence.json` của C-DT-018 chứa hai bản ghi giống hệt cho request POST setup cùng ID 10. Runner lưu cùng một response setup hai lần vào mảng evidence; đây là lỗi ghi log của AI, không phải hai POST độc lập lên SUT. DELETE và snapshot state vẫn được ghi riêng; không suy diễn thêm một lần chạy.

## Coverage gap (không phải AI gap)

- C-R01 về quyền truy cập **Admin UI** của user thường/khách chưa được kiểm tra trực tiếp. API POST/DELETE role user là phép thử riêng, không thay thế UI access test.
- Không đăng GitHub Issue theo yêu cầu. Hai draft có title/body theo slide (environment, steps, expected/actual, evidence, severity/priority, labels); ảnh được chỉ định cho issue UI. Với bug API-only, bằng chứng là network log redacted; không có ảnh UI thích hợp và không tạo ảnh giả.
