# A-FR02 — Đối chiếu timestamp cho các ca thời gian

**Nguồn:** Run 003 API và Run 004 UI; SUT baseline/runtime `85af3ba875c88283615e22cb108f13e2fccaf0e9`. Thời gian trong bảng là monotonic phía client/browser. Không có log tại đúng điểm server so sánh `locked_until`.

Với một request kích hoạt khóa, gọi `s` là lúc gửi và `r` là lúc nhận response. Thời điểm kích hoạt server nằm trong khoảng này. Với probe có thời điểm gửi/nhận `p_s`, `p_r`, khoảng elapsed bảo thủ là `[p_s-r, p_r-s]`. Nếu cận trên <30s thì toàn request ở trước 30s; nếu cận dưới >30s thì toàn request ở sau 30s. Khoảng này xác định phía của mốc, không khẳng định request được xử lý đúng tại số mục tiêu danh nghĩa.

## API — Run 003

| TC | Probe | Khoảng elapsed (giây) | HTTP | Phân loại |
|---|---|---:|---:|---|
| A-DT-012 | đúng, mục tiêu 10s | [10.0344, 10.0458] | 403 | Toàn request trước 30s |
| A-DT-013 | đúng, mục tiêu 40s | [40.0787, 40.0881] | 403 | Toàn request sau 30s |
| A-BV-006 | đúng, mục tiêu 29s | [29.0598, 29.0711] | 403 | Toàn request trước 30s |
| A-BV-008 | đúng, mục tiêu 31s | [31.0707, 31.0814] | 403 | Toàn request sau 30s |
| A-BV-009 | đúng, mục tiêu 10s | [10.0610, 10.0706] | 403 | Toàn request trước 30s |
| A-BV-010 | đúng, mục tiêu 40s | [40.0876, 40.0969] | 403 | Toàn request sau 30s |
| A-DT-021 | đúng, mục tiêu 10s | [10.0541, 10.0661] | 403 | Toàn request trước 30s |
| A-DT-021 | đúng, mục tiêu 40s | [40.1490, 40.1576] | 403 | Toàn request sau 30s |
| A-DT-022 | sai, mục tiêu 40s | [40.0726, 40.0822] | 403 | Toàn request sau 30s |

Mỗi chuỗi khóa bắt đầu từ tài khoản mới. Tuy nhiên backend khóa sau lần sai thứ hai, không phải thứ ba. Các ca này vì vậy là chẩn đoán thời gian từ mốc khóa quan sát được; không chứng minh tiền điều kiện “đã sai đúng ba lần”. Việc probe sau 31/40 giây vẫn nhận 403 cùng `locked_until` khoảng ba phút sau lúc kích hoạt cho thấy hành vi thời lượng không khớp 30 giây.

## UI — Run 004

Browser log giữ các request/response theo thứ tự và monotonic timestamp. Khi ghép response, bỏ OPTIONS preflight HTTP 204; login POST thật trả 401/403. Kết quả ghép từ log như sau:

| TC | Probe | Khoảng elapsed (giây) | HTTP | Phân loại |
|---|---|---:|---:|---|
| A-DT-012 | đúng, gần 10s | [11.4230, 11.4290] | 403 | Toàn request trước 30s |
| A-DT-013 | đúng, gần 40s | [41.4140, 41.4246] | 403 | Toàn request sau 30s |
| A-DT-021 | đúng, gần 10s | [11.4335, 11.4407] | 403 | Toàn request trước 30s |
| A-DT-021 | đúng, gần 40s | [42.8516, 42.8602] | 403 | Toàn request sau 30s |
| A-DT-022 | sai, gần 40s | [41.4359, 41.4427] | 403 | Toàn request sau 30s |

Các khoảng bắt đầu từ lúc nhận response của request sai thứ hai và dùng request/response của probe trong cùng email test. Khoảng 10 giây thực tế dài hơn mục tiêu do thao tác automation và tải trang; vẫn nằm hẳn trước 30 giây. Browser timestamp cũng là client-side, không thay thế clock tại điểm so sánh trên server.

## Chưa đo được

A-BV-007 (đúng 30.000s), A-BV-011 (29.999s) và A-BV-012 (30.001s) chưa chạy. Môi trường không có clock/harness điều khiển tại điểm server so sánh; `sleep` phía client không chứng minh mốc chính xác. Không có Pass/Fail cho ba ca này.
