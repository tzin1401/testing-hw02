# Chạy EShop Mobile trên Android Emulator

Hướng dẫn này dành cho máy Ubuntu/Linux trong workspace. Không cần iPhone hay kết nối Wi‑Fi giữa điện thoại và máy tính. Emulator là Android ảo trên chính máy tính.

## Trạng thái máy đã kiểm tra

- Máy đang chạy Ubuntu/Linux 64-bit.
- Chưa thấy Android Studio, Android SDK, `adb` hoặc `emulator` được cài trong PATH.
- Máy có RAM 30 GiB, còn khoảng 380 GiB dung lượng ở phân vùng `/home`; KVM có thể đọc/ghi được. Điều này đủ điều kiện cơ bản để cài và chạy một AVD.
- Ứng dụng trong `eshop-sut/frontend-mobile/package.json` dùng Expo SDK 54 (`expo: ~54.0.33`). Vì vậy phải mở app bằng Expo Go Android tương thích SDK 54. Không nâng SDK của SUT chỉ để chạy emulator.

## 1. Cài Android Studio

1. Mở trang tải chính thức: [Android Studio](https://developer.android.com/studio).
2. Tải bản **Linux 64-bit** (`.tar.gz`).
3. Mở thư mục **Downloads**, giải nén file vừa tải. Di chuyển thư mục `android-studio` đã giải nén vào thư mục `~/Applications` (tạo thư mục này nếu chưa có).
4. Mở Terminal và chạy lệnh sau để mở Android Studio:

   ```bash
   ~/Applications/android-studio/bin/studio.sh
   ```
5. Ở lần mở đầu, chọn **Do not import settings** nếu được hỏi, chọn kiểu cài đặt **Standard**, chấp nhận license Android SDK và đợi Setup Wizard tải công cụ xong. Không cần mở project Android của SUT.
6. Nếu Ubuntu báo thiếu thư viện khi mở Studio, ghi lại nguyên văn lỗi trước khi cài thêm gói hệ thống.

## 2. Cài Android SDK và tạo điện thoại ảo

1. Ở màn hình chào Android Studio, chọn **More Actions → SDK Manager**. Nếu đã mở một project, vào **Tools → SDK Manager**.
2. Trong tab **SDK Tools**, bảo đảm đã chọn **Android SDK Platform-Tools** và **Android Emulator**. Bấm **Apply** để cài nếu còn thiếu.
3. Ghi nhớ mục **Android SDK Location** ở đầu cửa sổ. Mặc định thường là `~/Android/Sdk`.
4. Quay lại màn hình chào, chọn **More Actions → Virtual Device Manager** (trong project: **Tools → Device Manager**).
5. Chọn **Create Virtual Device… → Phone → Pixel** (ví dụ Pixel 6 hoặc Pixel 7) → **Next**.
6. Chọn system image x86_64 phù hợp (API 35 hoặc 36; ưu tiên image ghi **Google APIs**), bấm nút tải xuống nếu chưa có, rồi **Next → Finish**. Chỉ cần một AVD.
7. Trong Device Manager, bấm nút ▶ của AVD. Chờ Android khởi động tới màn hình Home. Lần khởi động đầu thường mất vài phút.
8. Giữ emulator mở. Trên máy tính mở Terminal mới và kiểm tra:

   ```bash
   adb devices
   ```

   Kết quả cần có một dòng thiết bị có trạng thái `device`, thường tên là `emulator-5554`. Nếu báo `adb: command not found`, đóng/mở lại terminal sau khi Android Studio cài SDK Platform-Tools. Nếu vẫn chưa có PATH, chạy trực tiếp:

   ```bash
   ~/Android/Sdk/platform-tools/adb devices
   ```

   Nếu SDK Manager ghi đường dẫn khác `~/Android/Sdk`, thay đường dẫn trong lệnh bằng **Android SDK Location** đã ghi ở bước 3.

## 3. Cài Expo Go đúng SDK 54 vào emulator

Expo Go trên iPhone không dùng được ở đây do lệch SDK. Android Emulator cho phép cài bản Expo Go phù hợp với SDK của project.

1. Trên máy tính, mở [expo.dev/go](https://expo.dev/go).
2. Chọn **SDK 54** và nền tảng **Android**, rồi tải file APK Expo Go được cung cấp.
3. Cài APK vào emulator theo một trong hai cách:
   - Kéo file `.apk` từ thư mục Downloads thả vào cửa sổ emulator; hoặc
   - Trong Terminal chạy `adb install ~/Downloads/TEN_FILE_APK.apk`, thay `TEN_FILE_APK.apk` bằng tên file vừa tải.
4. Chờ thông báo cài đặt hoàn tất. Trên emulator, mở **Expo Go** một lần nếu cần hoàn tất màn hình chào.

Không cài Expo Go SDK 57 cho project SDK 54; như vậy sẽ lặp lại lỗi tương thích trên iPhone.

## 4. Cho app truy cập backend đang chạy trên máy tính

Trong Android Emulator, địa chỉ `10.0.2.2` đại diện cho máy tính chủ. Vì vậy app phải dùng địa chỉ này để gọi backend.

1. Đảm bảo backend đang chạy ở cổng 3000. Nếu đã chạy từ trước, giữ nguyên terminal đó; **đừng khởi động lại** chỉ để chạy emulator vì backend của bài có thể khởi tạo lại DB khi khởi động.
2. Trong VS Code mở `eshop-sut/frontend-mobile/App.js`.
3. Tìm `const API_URL = ...` và sửa riêng URL thành:

   ```js
   const API_URL = "http://10.0.2.2:3000/api";
   ```

   Đây là IP đặc biệt dùng từ Android Emulator về máy chủ host; không dùng `localhost` và không dùng `192.168.2.151` trong cấu hình emulator.
4. Lưu file bằng `Ctrl+S`. Ghi cấu hình môi trường vào `reports/environment.md`. Đây là thay đổi trong repo SUT lồng `eshop-sut`; không stage vào commit bài làm nếu đề không yêu cầu.

## 5. Mở app trong emulator

1. Giữ Android Emulator và backend đang chạy.
2. Mở Terminal Expo mới và chạy:

   ```bash
   cd /home/zinn/zinn/test/hw02/eshop-sut/frontend-mobile
   npm ci
   npx expo start
   ```
3. Chờ Expo/Metro sẵn sàng. Quay lại cửa sổ Terminal Expo, nhấn phím `a` để mở project trên Android Emulator. Nếu được hỏi chọn emulator, chọn thiết bị vừa tạo.
4. Lần đầu mở có thể mất vài phút. Expo Go đã cài ở bước 3 phải có mặt trong emulator. Chờ app EShop tải và hiện trang sản phẩm.
5. Nếu nhấn `a` không mở app, giữ Expo đang chạy, mở Expo Go trong emulator và dùng **Enter URL manually** để nhập URL `exp://127.0.0.1:8081` nếu terminal báo Metro chạy cổng 8081. Nếu Metro hiển thị cổng khác, dùng đúng cổng đó. Có thể gửi ảnh Terminal Expo để mình xác định URL chính xác.
6. Nếu app hiện danh sách sản phẩm, chụp ảnh emulator bằng công cụ Screenshot của cửa sổ emulator hoặc `Ctrl+S` trong cửa sổ emulator, rồi lưu ảnh phù hợp vào `evidence/D-MREG/`. Ảnh mở app chỉ xác nhận môi trường; chưa phải Pass của ca kiểm thử đăng ký.
7. Ghi vào `reports/environment.md`: tên AVD, Android API level, Expo Go SDK 54, ngày giờ, IP backend `10.0.2.2:3000` và kết quả khởi chạy.

## 6. Nếu có lỗi

- **`adb devices` không hiện emulator:** kiểm tra AVD đã khởi động hoàn toàn chưa và Device Manager có báo lỗi không.
- **Emulator chạy chậm hoặc không khởi động:** đóng các ứng dụng nặng khác; kiểm tra máy còn dung lượng; xác nhận `/dev/kvm` truy cập được. Không cần chạy lệnh thay đổi quyền nếu emulator đã khởi động.
- **Lỗi “Project is incompatible…”:** kiểm tra đã cài APK Expo Go SDK 54 (Android), không phải APK mới nhất SDK 57.
- **App mở nhưng không tải sản phẩm:** kiểm tra `API_URL` đúng `http://10.0.2.2:3000/api`, backend vẫn chạy, rồi mở menu developer trong Expo Go và chọn **Reload**.
- **Màn hình lỗi đỏ hoặc lỗi khác:** chụp ảnh, ghi nguyên văn lỗi và dừng ở đó; không sửa logic SUT để che lỗi.

## Bằng chứng và giới hạn

Emulator dùng để thực hiện các thao tác Mobile UI (tap, nhập, submit, kiểm tra thông báo/điều hướng). API test hoặc ảnh Android Emulator không được mô tả là kiểm thử iPhone thật. Trong báo cáo ghi rõ thiết bị là **Android Emulator** cùng API level. Với mỗi ca D-MREG, lưu ảnh hoặc log phù hợp với checkpoint; nếu ca lỗi và cần đăng GitHub Issue, đính kèm ảnh lỗi theo yêu cầu bài.
