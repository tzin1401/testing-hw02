# AI-034 — Thực thi Domain/BVA C-FR14

**Ngày giờ ghi nhận:** 2026-10-15 05:56 UTC (12:56 UTC+07); thời điểm ghi audit, không phải thời điểm gửi prompt chính xác.
**Run:** `20261015T055119Z-CFR14`; run bắt đầu lúc 05:51 UTC.
**SUT baseline:** `85af3ba875c88283615e22cb108f13e2fccaf0e9`.

## Prompt nguyên văn

```text
Thực thi toàn bộ ca Domain và BVA C-FR14 trong `03-domain-cases.md` và `04-boundary-cases.md`. Tự kiểm tra Admin/backend và baseline, tự chạy API/UI nào có thể; không yêu cầu tôi tự chạy terminal. Mỗi ca dùng danh mục test riêng do ca tạo, ghi ID, state trước/sau và lưu request/response hoặc ảnh UI. Không sửa/xóa danh mục mẫu hay dữ liệu người khác; chỉ xóa đúng ID test nếu ca yêu cầu và evidence đã lưu. Kiểm tra POST/DELETE theo ba trạng thái quyền: admin, thiếu/invalid token, user thường; không dùng UI admin để suy ra API đã chặn role thường. Không coi GET danh sách công khai là vi phạm FR-12. Nếu thiếu fixture role user hoặc không thể điều khiển trình duyệt, chạy các ca khả thi trước rồi nêu đúng việc còn cần tôi làm, không đưa lệnh terminal. Chấm từng TC theo expected có căn cứ; whitespace/uniqueness/giới hạn chưa rõ ghi observation, không kết luận bug. Cập nhật `06-execution.md`, `07-bugs-and-ai-gaps.md`, `reports/work-progress.md`, evidence và AI Audit; chuẩn bị issue nhưng không đăng nếu chưa đủ ảnh. Commit riêng execution và file C/evidence liên quan.
```

## Tiến độ và cách thực thi

- Đã đọc lại SRS FR-12/FR-14, API specification, requirements/domains/cases/coverage C-FR14; SRS/API contract được dùng làm expected, không lấy code SUT làm oracle.
- Backend `:3000`, Admin `:5174`, Web `:5173` đều phản hồi. Fixture login xác nhận admin role và user role. Browser UI điều khiển được qua Chrome Headless/CDP. Không yêu cầu người dùng thao tác terminal.
- Đọc SQLite bằng read-only URI để kiểm tra ba danh mục ban đầu và quan hệ products; các danh mục mẫu đều có tham chiếu nên không dùng làm target xóa. Không restart backend, không import `database.js`, không sửa SUT.
- API chạy tuần tự; token được che trong evidence. Token hết hạn có claim admin được tạo cho riêng lần chạy, không ghi token ra file. UI click/nhập qua CDP; screenshot lưu trong evidence folder.
- Tất cả thao tác thêm/xóa dùng ID category test được ghi nhận. Sau khi lưu bằng chứng, dọn đúng tên/ID test; snapshot cuối trở về ba danh mục ban đầu.

## Actual / kết quả

- 23 ca: **15 Pass, 4 Fail, 1 Blocked, 3 observation-only**. Bốn Fail: C-DT-003, C-DT-014, C-DT-018, C-BV-001.
- C-DT-003 và C-BV-001: UI nhận trường rỗng và tạo dòng category tên rỗng. Expected có căn cứ từ FR-14.
- C-DT-014: POST với JWT user thường trả HTTP 200 và tạo category test; C-DT-018: DELETE với JWT user thường trả HTTP 200 và xóa target test. Expected có căn cứ từ FR-12; không dùng UI Admin để suy ra quyền API.
- C-DT-004 whitespace-only, C-DT-006 GET authorization và C-BV-005 ID vắng mặt chỉ observation vì SRS chưa định nghĩa expected. C-DT-008 Blocked vì UI không có dialog để hủy; không tự yêu cầu dialog theo FR-14.
- Automation click đầu tiên cho target nằm ngoài viewport; kiểm tra screenshot/state phát hiện lần đó chưa thao tác đúng dòng. Đã cuộn đúng target và chạy lại C-DT-007; chỉ kết quả retry hợp lệ được dùng. C-R01 Admin UI access của user thường/khách vẫn chưa chạy.
- Tạo hai nội dung issue draft theo slide; chưa đăng issue. Draft và evidence cần đính kèm nằm trong `features/C-FR14/07-bugs-and-ai-gaps.md`.

## Output / artifact

- [`features/C-FR14/06-execution.md`](../features/C-FR14/06-execution.md)
- [`features/C-FR14/07-bugs-and-ai-gaps.md`](../features/C-FR14/07-bugs-and-ai-gaps.md)
- [`reports/work-progress.md`](../reports/work-progress.md)
- Evidence: [`evidence/C-FR14/full-runs/20261015T055119Z-CFR14/`](../evidence/C-FR14/full-runs/20261015T055119Z-CFR14/), bao gồm API requests/responses, before/after snapshots, UI state, screenshots, retry và cleanup evidence.

## AI output cuối

> Đã chạy toàn bộ 18 ca Domain và 5 ca BVA/probe C-FR14 trong môi trường hiện có. Kết quả gồm 15 Pass, 4 Fail, 1 Blocked và 3 observation-only. Bốn Fail có expected rõ: tên rỗng vẫn được tạo (C-DT-003/C-BV-001) và API chấp nhận role user thường cho POST/DELETE (C-DT-014/C-DT-018). GET authorization, whitespace-only và ID không tồn tại không bị kết luận lỗi vì expected chưa được đặc tả. Ba category mẫu được giữ nguyên; các category test được dọn theo đúng ID sau khi lưu evidence. Hai issue được chuẩn bị dạng draft nhưng chưa đăng. C-R01 về quyền vào Admin UI bằng user thường/khách vẫn cần kiểm tra riêng.

## Giới hạn

- Chưa thực hiện UI access test bằng tài khoản user thường/khách.
- Không gán expected cho trim/whitespace-only, uniqueness, giới hạn tên, GET authorization, ID không tồn tại, dialog bắt buộc hoặc HTTP status/body ngoài nội dung SRS/API.
- Không đăng GitHub Issue; không chỉnh sửa SUT.
