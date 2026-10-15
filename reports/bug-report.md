# Bug report — HW02 EShop

**SUT baseline:** `85af3ba875c88283615e22cb108f13e2fccaf0e9`
**Nguồn expected:** SRS/API specification theo từng feature; không lấy code SUT làm oracle.

## Issue hiện có

| Issue | Finding | TCs/requirement | Hiện trạng bằng chứng |
|---:|---|---|---|
| #1 | Login counter tăng hai thay vì một | A-FR02, A-R04 | Issue có screenshot theo hồ sơ A. |
| #2 | Thời gian khóa không khớp 30 giây | A-FR02, A-R06 | Issue có screenshot; các biên đúng thời điểm server comparison vẫn chưa chạy. |
| #3 | Input email Web không dùng type=email | A-FR02, A-R10 | Issue có screenshot. |
| #4 | Thêm hàng hợp lệ từ chi tiết không cập nhật giỏ | B-DT-002 | Issue có screenshot. Findings khác sau đó không được gộp vào issue này. |
| #5 | Empty cart thiếu illustration | B-DT-001 | Issue có screenshot. |
| #6 | Tạo category với tên rỗng | C-DT-003, C-BV-001 | Issue có ảnh trước/sau. |
| #7 | API cho role user POST/DELETE categories | C-DT-014, C-DT-018 | CLI đọc body/comments: có request/response JSON nhưng không có ảnh GitHub attachment. |
| #8 | API tạo duplicate email | D-R04 | CLI đọc body/comments: không có ảnh attachment; body hiện vẫn ghi Mobile blocked dù đã có Mobile variant count 1→2, cần cập nhật có giới hạn. |

## Findings bổ sung đã có local UI evidence nhưng chưa được xác nhận đã đăng

| Finding | Case/evidence | Expected / actual |
|---|---|---|
| Cart duplicate product thành hai dòng | B-DT-004-SUP, `evidence/B-FR07/supplement-runs/20261015T154202360Z-supp/B-DT-004-SUP-duplicate-product.png` | FR-07 cần gộp cùng product; UI tạo hai dòng P1. |
| Không có nút `+/-` | B-DT-006–010-SUP và B-BV-004–006-SUP; ảnh controls | Yêu cầu controls; UI chỉ có Xóa. Presence fail; interaction cases blocked. |
| Xóa không có xác nhận | B-DT-011–013-SUP; ảnh before/after | Expected confirm dialog; row bị xóa ngay, `dialogs: []`; cancel branch blocked. |
| Total label mismatch | B-DT-015-SUP | Expected “Tổng cộng”; actual “Tổng tạm tính”. |
| Form Mobile thiếu confirm field | D-DT-001; `D-DT-001-register-form.png` | FR-01 bắt buộc confirmation và matching; form chỉ có 3 fields. |
| Mobile accepts blank name | D-DT-003 variant; ảnh before/response | Alert success, DB count 0→1; full four-field TC partial vì confirmation absent. |
| Mobile accepts blank/malformed email | D-DT-004/005 variants; ảnh before/response | Cả hai được success và count 0→1; full cases partial vì confirmation absent. |

Các finding mới có ảnh local nhưng issue chưa được tạo/ảnh chưa được kiểm chứng trên GitHub. Việc tạo issue cần dùng đúng template trong slide: title, environment, steps, expected, actual, severity/priority có lý do, TC ID, labels, ảnh thật. Bản audit này không khẳng định việc upload đã hoàn tất.

## Findings không nâng thành bug

- C-FR14 login thử đầu dùng `test@eshop.com` không đủ căn cứ; lần bổ sung sau dùng fixture role user đã xác minh, API login HTTP 200, Admin UI báo “Bạn không phải là admin!” và không cấp admin token. Đây là UI evidence riêng với API POST/DELETE Issue #7.
- D-MREG D-BV-002 length 8: `Network request failed`; không đủ để kết luận boundary.
- Whitespace, GET permission, xóa ID không tồn tại, max length, persistence, race, và các oracle mở khác không bị kết luận bug.

Chi tiết repro, expected/actual, severity và AI gaps của từng feature: [A](../features/A-FR02/07-bugs-and-ai-gaps.md), [B](../features/B-FR07/07-bugs-and-ai-gaps.md), [C](../features/C-FR14/07-bugs-and-ai-gaps.md), [D](../features/D-MREG/07-bugs-and-ai-gaps.md).
