# AI-045 — Đăng issue bug D-MREG

**Ngày giờ:** 2026-10-15T15:04:53Z (22:04:53 +07:00).
**Công cụ:** Codex và GitHub CLI đã xác thực dưới tài khoản `tzin1401`.

## Prompt nguyên văn

```text
đăng đi
```

## Thao tác và kết quả

- Xác nhận remote là `tzin1401/testing-hw02`, GitHub CLI đăng nhập đúng `tzin1401`, không có issue trùng theo tìm kiếm tiêu đề.
- Kiểm tra và dùng labels có sẵn: `type: bug`, `severity: major`, `priority: P1`, `status: new`, `module: api`.
- Tạo [issue #8](https://github.com/tzin1401/testing-hw02/issues/8) với title `[BUG][API] Đăng ký tạo tài khoản mới dù email đã tồn tại`, body gồm bước tái hiện, expected/actual theo FR-01, môi trường cô lập, severity rationale, D-R04/API-only scope và lưu ý Mobile D-DT-006 còn Blocked.
- GitHub Issues API không cho đính file local trực tiếp bằng endpoint comment; thay vào đó, thêm comment trỏ thẳng tới JSON redacted đã commit trên main: https://github.com/tzin1401/testing-hw02/blob/main/evidence/D-MREG/full-runs/20261015T1303Z-DMREG/api-registration-duplicate-isolated.json. JSON gồm request/response, thời gian và DB count 0→1→2. Không có screenshot thích hợp cho lỗi API-only; không dùng ảnh Mobile Blocked làm bằng chứng API.
- Không thay đổi SUT hoặc kết quả test.

## Giới hạn

Issue không có screenshot; evidence chính là JSON request/response đã che mật khẩu. Không đăng thêm lỗi Mobile vì chưa có kết quả UI.
