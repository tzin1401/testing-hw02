# AI-040 — Output thiết kế Domain cases D-MREG

## Prompt nguyên văn

```text
Tạo `features/D-MREG/03-domain-cases.md` cho ca trên Android Emulator hoặc thiết bị Mobile thật, mỗi ca `D-DT-nnn`. Ghi loại thiết bị/AVD, OS/API level, trạng thái app, account/email đã tồn tại hay chưa, dữ liệu từng trường, từng thao tác tap/nhập/ẩn-hiện bàn phím/submit, expected, D-EC, D-R và evidence. Bao gồm: form có đủ bốn trường; đăng ký thành công bằng dữ liệu hợp lệ và email mới; tên rỗng; email rỗng/sai format/trùng; password rỗng; từng lỗi password độc lập (thiếu hoa, thường, số, ký tự đặc biệt); confirm sai/rỗng; xác nhận không tạo account khi bị từ chối; sau thành công chuyển về Login và có thể thấy account được tạo. Ca âm chỉ vi phạm một điều kiện, giữ các trường khác hợp lệ. Mỗi ca thành công phải dùng email riêng; không ghi mật khẩu thật. Nếu form thiếu trường bắt buộc, tạo ca kiểm tra sự hiện diện với ảnh; các ca cần field đó đánh dấu phụ thuộc/blocked, nhưng tiếp tục các ca độc lập có thể làm. Ghi thông báo lỗi dự kiến theo ý nghĩa yêu cầu, không bịa câu chữ. Chưa chạy và chưa điền actual. Ghi audit và commit riêng.
```

## Output

Toàn văn đầu ra là file [`features/D-MREG/03-domain-cases.md`](../features/D-MREG/03-domain-cases.md). File có 13 ca D-DT-001–D-DT-013, thao tác Mobile UI, dữ liệu giả, điều kiện account/email, expected, traceability và đường dẫn evidence dự kiến. Các negative cases chỉ đổi một điều kiện; password rỗng ghi rõ ràng buộc confirm rỗng và không dùng ca đó làm bằng chứng confirm. Mỗi negative case nêu xác minh account state bằng DB test chỉ đọc khi khả thi. Thành công chuyển về Login và account creation được kiểm tra cùng ca D-DT-002.

## Giới hạn

Chỉ đọc requirements/domains/SRS/API và soạn thiết kế. Không mở app, chạy test, tạo account, chụp evidence, điền actual/status, hoặc xác nhận human review. Không stage hay thay đổi `eshop-sut`.
