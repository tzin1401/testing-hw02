# AI-036 — Đăng GitHub Issues C-FR14

**Prompt nguyên văn:**

```text
Đăng issue lên đi
```

## Kết quả

- Đã đăng [Issue #6 — tên danh mục rỗng được chấp nhận](https://github.com/tzin1401/testing-hw02/issues/6). Trạng thái OPEN; labels `type: bug`, `severity: minor`, `priority: P2`, `status: new`, `module: admin`. Đính kèm hai ảnh UI:
  - Trước: https://github.com/user-attachments/assets/730f684f-cd6a-45e7-9095-1eb0ebf6940f
  - Sau: https://github.com/user-attachments/assets/78372825-d465-4c90-aa75-5e3a892b8164
- Đã đăng [Issue #7 — API cho phép role user POST/DELETE danh mục](https://github.com/tzin1401/testing-hw02/issues/7). Trạng thái OPEN; labels `type: bug`, `severity: major`, `priority: P1`, `status: new`, `module: api`. Body gồm request/response redacted và state delta cho C-DT-014/C-DT-018. Không đính kèm ảnh UI vì không chứng minh được role/token của API request.
- Tạo label còn thiếu `module: admin`.
- `gh issue view` xác minh titles, body, labels và trạng thái OPEN. Issue #6 được cập nhật sau upload để dùng GitHub attachment URLs.
- Không push repo commit hoặc SUT/evidence lên GitHub repository.

## Báo cáo đã cập nhật

- [`features/C-FR14/07-bugs-and-ai-gaps.md`](../features/C-FR14/07-bugs-and-ai-gaps.md)
- [`reports/work-progress.md`](../reports/work-progress.md)
- [`AI_AUDIT_REPORT.md`](../AI_AUDIT_REPORT.md), Interaction AI-036
