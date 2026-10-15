# Kết nối iPhone với ứng dụng EShop qua Expo Go

Hướng dẫn này dùng khi chạy Expo trên máy tính trong mạng Wi‑Fi gia đình/trường. Không cần cắm cáp iPhone. iPhone và máy tính cần cùng mạng Wi‑Fi; nếu mạng bật chế độ cô lập thiết bị thì cần đổi sang mạng khác.

## 1. Cài Expo Go trên iPhone

1. Mở **App Store** trên iPhone.
2. Tìm **Expo Go** (nhà phát hành Expo).
3. Cài ứng dụng và mở một lần để hoàn tất màn hình chào/điều khoản nếu được hỏi.
4. Cho phép Expo Go dùng **Camera** khi iOS hỏi để quét QR. Nếu đã từ chối, vào **Settings → Apps → Expo Go** và bật Camera.

## 2. Nối iPhone và máy tính cùng Wi‑Fi

1. Trên iPhone, mở **Settings → Wi‑Fi** và ghi tên mạng đang kết nối.
2. Trên máy tính, mở Terminal và chạy:

   ```bash
   nmcli -t -f DEVICE,TYPE,STATE,CONNECTION device
   ip -brief -4 address
   ```
3. Tìm dòng thiết bị có `TYPE` là `wifi`, `STATE` là `connected`; trong kết quả IP, tìm interface cùng tên và địa chỉ dạng `192.168.x.x/24`, `10.x.x.x/24` hoặc `172.16–31.x.x/…`. Bỏ phần `/…` để lấy IP, ví dụ `192.168.2.151`.
4. Tránh chọn địa chỉ `127.0.0.1` hoặc interface Docker/bridge thường có địa chỉ `172.17.x.x` hay `172.18.x.x`.
5. So tên Wi‑Fi trên iPhone với kết nối Wi‑Fi của máy tính. Nếu máy tính đang dùng dây mạng, hãy nối cả hai vào cùng Wi‑Fi trước khi tiếp tục.

Địa chỉ máy tính thấy tại thời điểm viết hướng dẫn là `192.168.2.151`. Đây chỉ là ví dụ cho mạng hiện tại; IP có thể đổi khi đổi Wi‑Fi hoặc khởi động lại router. Mỗi lần kết nối lại, hãy lấy IP mới bằng các lệnh trên.

## 3. Bật backend và kiểm tra đường mạng từ iPhone

1. Nếu backend chưa chạy, mở Terminal Backend và chạy:

   ```bash
   cd /home/zinn/zinn/test/hw02/eshop-sut/backend
   node server.js
   ```
2. Giữ Terminal Backend mở. Trong trình duyệt trên máy tính, xác nhận `http://localhost:3000/api/products` hiển thị dữ liệu JSON.
3. Trên iPhone, mở Safari và nhập địa chỉ có IP máy tính, thay bằng IP vừa tìm được:

   ```text
   http://192.168.2.151:3000/api/products
   ```
4. Chấp nhận điều kiện đạt khi Safari hiện JSON danh sách sản phẩm. Chụp ảnh màn hình này nếu cần lưu bằng chứng kết nối. Đây chỉ xác nhận iPhone truy cập được API; chưa phải kết quả kiểm thử giao diện Mobile.
5. Nếu Safari không mở được: kiểm tra lại cùng Wi‑Fi và IP; tắt VPN trên iPhone/máy tính tạm thời; kiểm tra máy tính có đang dùng mạng khách (Guest) hay bật cô lập thiết bị; kiểm tra firewall có cho phép kết nối tới cổng `3000` trong mạng riêng hay không. Không tắt firewall toàn hệ thống. Thử lại URL sau khi xử lý. Chưa chạy Expo nếu bước này vẫn lỗi.

## 4. Đặt địa chỉ API của ứng dụng Mobile

Ứng dụng gọi backend từ iPhone, vì vậy `localhost` sẽ trỏ về chính iPhone chứ không phải máy tính. Cấu hình phải dùng IP LAN của máy tính.

1. Trong VS Code, mở:

   ```text
   eshop-sut/frontend-mobile/App.js
   ```
2. Tìm dòng bắt đầu bằng `const API_URL =` (hiện đang là `http://192.168.10.13:3000/api`).
3. Chỉ thay phần IP bằng địa chỉ LAN mới. Ví dụ, nếu lệnh ở bước 2 cho `192.168.2.151`, dòng phải thành:

   ```js
   const API_URL = "http://192.168.2.151:3000/api";
   ```
4. Giữ nguyên `http://`, `:3000` và `/api`. Không dùng `localhost`, không dùng IP Docker/bridge.
5. Lưu file (`Ctrl+S`). Ghi IP đã dùng và ngày thay đổi vào `reports/environment.md`. Đây là cấu hình thuộc repo SUT lồng `eshop-sut`; không đưa thay đổi này vào commit bài làm nếu đề không yêu cầu.

## 5. Khởi động Expo trên máy tính

1. Mở terminal mới tên **Terminal Expo**; để Terminal Backend tiếp tục chạy.
2. Chạy:

   ```bash
   cd /home/zinn/zinn/test/hw02/eshop-sut/frontend-mobile
   npm ci
   npx expo start --lan
   ```
3. Chờ Metro/Expo khởi động và hiện QR code trong terminal hoặc trang Expo Dev Tools. Giữ terminal này mở.
4. Nếu iPhone hỏi quyền truy cập thiết bị trong mạng cục bộ, chọn **Allow**. Nếu đã từ chối: trên iPhone vào **Settings → Privacy & Security → Local Network**, bật quyền cho Expo Go (nếu mục này xuất hiện).

## 6. Mở ứng dụng trên iPhone

1. Đảm bảo iPhone vẫn ở cùng Wi‑Fi với máy tính.
2. Mở Camera mặc định của iPhone và hướng vào QR code Expo. Chạm banner **Open in Expo Go**. Có thể mở Expo Go rồi chọn chức năng quét QR nếu Camera không hiện banner.
3. Chờ Expo Go tải bundle và mở ứng dụng EShop. Lần tải đầu có thể lâu hơn; không đóng Terminal Expo hay Terminal Backend.
4. Xác nhận app hiện màn hình sản phẩm. Nếu thấy danh sách sản phẩm, chụp ảnh màn hình bằng nút cạnh bên + tăng âm lượng; lưu trong `evidence/D-MREG/` với tên thể hiện checkpoint, ví dụ `D-MREG-setup-home.png`.
5. Ghi vào `reports/environment.md`: model iPhone, phiên bản iOS, phiên bản Expo Go (nếu thấy), ngày giờ, IP máy tính dùng và kết quả mở app. Không ghi đây là Pass cho ca D-MREG; đây mới là xác nhận môi trường.

## 7. Nếu không kết nối được

- **Safari trên iPhone không mở API:** xử lý bước 3 trước; QR/Expo không sửa được kết nối backend.
- **Safari mở API được nhưng Expo Go không tải project:** xác nhận cùng Wi‑Fi, VPN tắt, cho phép Local Network, và xem Terminal Expo có báo lỗi hay không. Ghi nguyên văn lỗi.
- **App mở nhưng không tải sản phẩm:** kiểm tra lại IP trong `API_URL`, lưu `App.js`, rồi trong Expo Go mở menu developer và chọn **Reload**. Nếu IP vừa đổi, cập nhật lại URL và reload.
- **Màn hình lỗi đỏ hoặc lỗi khác:** chụp ảnh, ghi lỗi và dừng ở đó; không sửa logic SUT để che lỗi.
- **Mạng Wi‑Fi chặn thiết bị nhìn thấy nhau:** thử mạng Wi‑Fi khác mà cả hai thiết bị cùng tham gia. Có thể tiếp tục thiết kế bài, nhưng chưa ghi nhận kiểm thử Mobile UI cho đến khi app chạy trên iPhone hoặc emulator.
