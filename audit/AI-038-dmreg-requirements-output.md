# AI-038 — Requirements D-MREG

**Công cụ:** Codex trong phiên chat hiện tại.

**Ngày giờ ghi nhận:** 2026-10-15T12:47:27Z (19:47:27 UTC+07); thời điểm ghi audit, không phải timestamp chính xác prompt.

## Prompt nguyên văn

```text
Đọc FR-20 và FR-01 trong `eshop-sut/README.md`, API specification, slide Domain/BVA và phân công thành viên 2. Tạo `features/D-MREG/01-requirements.md` tiếng Việt đơn giản. Gắn ID D-Rxx cho: họ tên/email/mật khẩu bắt buộc; email đúng định dạng và duy nhất; password tối thiểu 8 ký tự, có ít nhất một chữ hoa, chữ thường, chữ số, và ký tự thuộc `@$!%*?&`; trường xác nhận mật khẩu bắt buộc và phải khớp; đăng ký thành công tạo tài khoản và chuyển về màn hình Đăng nhập. Tách input, state (email đã tồn tại/chưa tồn tại, account tạo thành công hay không), output Mobile/API và nguồn expected result. Bao gồm điều kiện ký tự đặc biệt là membership trong tập đã nêu, không tự đòi đủ mọi ký tự. Nêu các điểm cần xác minh như trim họ tên/email, giới hạn độ dài, thông báo cụ thể, trạng thái khi mạng lỗi, email trùng race; không tự đặt expected. Chưa tạo EC/TC, chưa chạy test/human review. Ghi audit và commit riêng.
```

## Nguồn đã đối chiếu

- `eshop-sut/README.md`: FR-01 dòng 30–36, FR-20 dòng 233–235.
- `eshop-sut/api_specification.md`: Authentication §1.1, `POST /api/register`, JSON fields `name`, `email`, `password`, response success `200 OK` with `message` and `id` (lines 11–21).
- `group_feature_assignment.md`: member 2 Pool D, Mobile FR-01 registration (lines 15, 50–52).
- `slide/domain-testing-vn.pdf` and `slide/domain-testing-en.pdf`: Domain input/output, equivalence partitioning and representative values; BVA for ordered inputs and boundary/neighbor values.

## Output

- Created [`features/D-MREG/01-requirements.md`](../features/D-MREG/01-requirements.md) with D-R01–D-R09. Each row records input, pre/post state, observable Mobile/API output, expected behavior, and source.
- Kept confirmation-password validation in the Mobile UI scope: FR-01 requires the confirmation field and rejection on mismatch; the API specification body contains no confirmation field. Did not invent API confirmation behavior.
- Listed unresolved oracles for whitespace/trim, email format/case normalization, max lengths, Unicode/password interpretation, exact error messages/status/body, network failures, duplicate submission, and form preservation.
- No ECs, Domain/BVA test cases, execution results, human review or approvals were added.
- Committed requirements and audit separately as `docs: define D-MREG registration requirements`.
