# Chạy chuỗi đăng nhập API A-FR02

Script này tạo một tài khoản riêng qua API đăng ký, sau đó gửi 1–4 lần đăng nhập sai **tuần tự**. Mỗi lần gọi script sinh email/run ID mới. Script chỉ ghi request/response và counter/lock state nếu đọc được DB; script không tự kết luận Pass/Fail.

## Trước khi chạy

1. Đảm bảo backend đang chạy ở `http://localhost:3000`.
2. Mở terminal mới ở thư mục gốc bài làm. Không chạy `node database.js` và không restart backend giữa một chuỗi test.
3. Chọn số lần theo ca: `2` để khảo sát dưới ngưỡng, `3` để kiểm tra ngưỡng, `4` để gửi request thứ tư khi tài khoản có thể đã khóa. Mỗi lựa chọn tạo tài khoản mới.

## Lệnh chạy

Chạy **một lệnh cho mỗi chuỗi cần thu thập**:

```bash
cd /home/zinn/zinn/test/hw02
python3 scripts/A-FR02-login-sequence.py --attempts 2
```

Đổi `2` thành `3` hoặc `4` cho chuỗi độc lập khác. Lưu toàn bộ terminal output nếu cần:

```bash
python3 scripts/A-FR02-login-sequence.py --attempts 3 | tee /tmp/a-fr02-attempts-3.txt
```

`tee` chỉ lưu thêm bản terminal text; log JSONL chính được script tạo tại `evidence/A-FR02/api-runs/<Run-ID>/login-sequence.jsonl`.

## Nội dung và giới hạn của log

- Ghi UTC, monotonic send/receive time, thời lượng round-trip, HTTP status, response đã che password/token, email test, run ID và state DB đọc-only trước/sau.
- Nếu đọc DB lỗi, log ghi state unavailable; request API vẫn được ghi.
- Password không được ghi ra log. Token và trường authorization bị che; không copy token vào ảnh/issue.
- Thời gian đo là đồng hồ **client** tại lúc trước/sau HTTP call. Nó không cho biết chính xác lúc server so sánh `locked_until`, nên không tự chứng minh điểm đúng 29/30/31 giây. Với request thất bại thứ ba, khoảng round-trip cũng không được dùng thay cho timestamp nội bộ của server.
- Đăng ký qua API chỉ chuẩn bị tài khoản cho chuỗi; đây không phải kiểm thử FR-01. Không chạy lệnh này trong lúc đang giữ state của tài khoản khác cho một ca UI.
- Không dùng log API để kết luận UI validation, hiển thị lỗi, token storage của trình duyệt hay header do client Web gửi. Những phần đó cần chạy riêng trên giao diện và ghi đúng bằng chứng UI.
- Script tạo tài khoản trong SQLite hiện có và không xóa tài khoản sau chạy. Dùng email riêng, giữ log; chỉ dọn dữ liệu test sau khi đã bảo toàn bằng chứng và xác định đúng tài khoản.

## Bước tiếp theo sau mỗi lần chạy

Mở JSONL, xác nhận run ID/email, trạng thái tạo tài khoản và số request đã gửi. Gửi nguyên log cùng các ảnh UI liên quan và nhận xét của bạn để cập nhật `features/A-FR02/06-execution.md`. Nếu số lần/counter không như expected, ghi đúng actual; không sửa log để làm khớp thiết kế.
