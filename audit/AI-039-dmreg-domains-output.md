# AI-039 — Equivalence domains D-MREG

**Công cụ:** Codex trong phiên chat hiện tại.

**Ngày giờ ghi nhận:** 2026-10-15T12:50:16Z (19:50:16 UTC+07); thời điểm audit, không phải timestamp chính xác prompt.

## Prompt nguyên văn

```text
Dựa trên `features/D-MREG/01-requirements.md`, tạo `02-domains.md` với D-EC ID. Phân lớp riêng cho họ tên rỗng/hợp lệ; email rỗng/sai format/hợp lệ mới/hợp lệ đã tồn tại; password độ dài dưới 8/đúng 8/trên 8 và thiếu riêng từng nhóm hoa, thường, số, ký tự đặc biệt; confirm khớp/không khớp/rỗng; kết quả API/network success/failure và app ở Register/Login. Mỗi lớp nêu dữ liệu mẫu, expected, D-R, output cần quan sát. Để kiểm tra một quy tắc password, giữ các quy tắc còn lại hợp lệ; ví dụ nhóm ký tự thiếu nhưng vẫn đủ 8 ký tự. Không gộp lỗi email trùng với format sai. Ghi cách xử lý Unicode/khoảng trắng/trim chưa có quy tắc là câu hỏi, không tự kết luận. Giải thích phân lớp và chưa chạy SUT. Ghi audit, commit riêng.
```

## Nội dung tạo

- Tạo [`features/D-MREG/02-domains.md`](../features/D-MREG/02-domains.md) gồm D-EC-01–D-EC-24 cho name, email, password, confirm, API/network và trạng thái màn hình Register/Login.
- Password có lớp dưới/đúng/trên ngưỡng 8 và từng lớp thiếu riêng hoa, thường, số, ký tự thuộc `@$!%*?&`; đại diện thiếu một nhóm giữ độ dài ít nhất 8 và các nhóm còn lại hợp lệ.
- Email sai format tách khỏi email hợp lệ đã tồn tại. Confirm là lớp Mobile UI, không đưa vào API request theo API spec hiện tại.
- Ghi expected và output quan sát từng lớp; status/body lỗi API, network-failure behavior, whitespace, trim, Unicode, email normalization và race được để thành câu hỏi/observation khi chưa có oracle.
- Giải thích cách phân lớp, nêu rõ chưa chạy SUT; không tạo test case, actual, Pass/Fail hay human review.

## Commit

File domains và audit được commit riêng với commit message `docs: add D-MREG equivalence domains`.
