# AI-015 — Snapshot output: sửa bước 8

Snapshot các nội dung chính đã cập nhật trong lượt sửa hướng dẫn. File làm việc hiện tại là nguồn đầy đủ; snapshot này ghi lại prompt điều phối được đặt ở bước 8 và mục đích của hai file script.

## Bước 8 trong `LAM_HW02_TUNG_BUOC.md`

> Hãy thực thi toàn bộ test case Domain và BVA của A-FR02 trong `features/A-FR02/03-domain-cases.md` và `features/A-FR02/04-boundary-cases.md`. Tôi đã review và hiểu các ca. Tự kiểm tra backend đang chạy, commit SUT, các script và tiền điều kiện; tận dụng `scripts/A-FR02-login-sequence.py` hoặc tạo mã hỗ trợ dùng thư viện sẵn có để chạy những ca API. Tự chạy lệnh cần thiết, không yêu cầu tôi tự chạy script. Dùng tài khoản test riêng cho từng chuỗi có trạng thái; không restart backend, không import `database.js`, không xóa DB/dữ liệu thật và không sửa logic SUT. Thực hiện cả ca Domain lẫn BVA, tránh bỏ qua ca chỉ vì đã chạy một lần tương tự; nếu cùng một lần chạy phủ nhiều TC ID thì ghi rõ bằng chứng và liên kết Run ID cho từng ca. Tự động hóa UI nếu môi trường cho phép. Nếu cần thao tác trên trình duyệt người dùng mà bạn không điều khiển được, hãy tiếp tục chạy tất cả ca API/tự động hóa còn lại rồi gửi tôi danh sách thao tác UI cụ thể cần làm, từng bước một; không yêu cầu tôi chạy lệnh terminal. Với từng ca, lưu request/response đã che password/token, ảnh UI nếu quan sát được, timestamp UTC/monotonic và state DB chỉ đọc khi hữu ích. Đánh dấu Pass/Fail chỉ khi expected đã rõ và có bằng chứng; ghi Blocked/Not run cùng lý do khi không thể chạy. Q chưa rõ thì ghi observation riêng, không tự đặt expected hoặc báo bug. Với mốc 29/30/31 giây, chỉ kết luận phía biên khi khoảng đo chứng minh request nằm hẳn trước/sau ngưỡng; đúng 30 giây chỉ kết luận nếu kiểm soát được clock tại điểm server so sánh, nếu không ghi Blocked/không đủ độ chính xác. Cập nhật `06-execution.md`, `07-bugs-and-ai-gaps.md` và `reports/work-progress.md` theo kết quả thật; chưa tạo GitHub Issue cho lỗi thiếu ảnh cần thiết. Ghi prompt/output và giới hạn vào AI Audit. Commit riêng phần thực thi, chỉ stage file bài làm và evidence liên quan.

Bước làm rõ ngay sau prompt: người dùng không chạy lệnh script. Codex cố gắng chạy tất cả ca; nếu không thể điều khiển UI thì hoàn tất ca khác trước, rồi mới xin người dùng làm đúng các thao tác UI còn thiếu. Mỗi ca phải có kết quả/evidence hoặc giải thích cụ thể vì sao chưa chạy/chưa thể kết luận.

## `scripts/README-A-FR02.md`

README script được sửa để mở đầu bằng lời giải thích script là công cụ Codex dùng khi nhận prompt bước 8; người dùng không cần gọi script. Lệnh CLI vẫn được giữ như tham khảo nếu người dùng chủ động muốn tự chạy. Bước 7 cũng được sửa để người dùng không phải tự tạo execution log; mục hướng dẫn script giải thích không cần đọc/gửi JSONL mà Codex vừa tạo, trừ trường hợp họ tự chạy script.

## Bằng chứng lịch sử được ghi nhận

Run 002 đã chạy ở lượt trước theo yêu cầu “Chạy giúp tôi đi”; chi tiết và JSONL ở `features/A-FR02/06-execution.md` và `evidence/A-FR02/api-runs/20261014T173755Z-47a40399/login-sequence.jsonl`. Lượt này chỉ sửa hướng dẫn/log tiến độ, không chạy test mới.
