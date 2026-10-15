# AI-037 — Cập nhật hướng dẫn cho Android Emulator và bước tiếp theo

**Công cụ:** Codex trong phiên chat hiện tại.

**Thời điểm ghi nhận:** 2026-10-15T12:44:32Z (19:44:32 UTC+07); thời điểm ghi nhận, không phải timestamp chính xác prompt.

## Prompt nguyên văn

```text
Tôi đã thấy xong. Giờ làm tiếp gì trên file này đây /home/zinn/zinn/test/hw02/LAM_HW02_TUNG_BUOC.md
```

## Output/thao tác

- Đối chiếu mục 12–13 trong `LAM_HW02_TUNG_BUOC.md` với trạng thái thực tế: Pixel 9 / Android 15 / API 35 chạy Expo Go SDK 54; app đã mở và hiển thị danh sách sản phẩm.
- Sửa mục 12 để tách hướng dẫn Android Emulator khỏi thiết bị thật. Đánh dấu các bước môi trường emulator đã quan sát hoàn thành; phân biệt rõ chúng chưa phải kết quả test D-MREG. Sửa prompt thiết kế Domain để nhận thiết bị thật hoặc emulator.
- Chạy backend từ bản sao tạm `/tmp/hw02-mobile-backend-safe`, do backend SUT khởi tạo lại DB khi khởi động; không chạy backend trên DB đang có trong repo.
- Ghi thông tin môi trường và giới hạn vào `reports/environment.md`. Không chạy test D-MREG, không ghi Pass/Fail và không lưu ảnh setup vào evidence.
- Bước kế tiếp cho sinh viên là mục 13.1: gửi prompt tạo requirements D-MREG; chưa thiết kế domains/cases trước khi hoàn tất các bước 13.1 trở đi.
