# Hướng dẫn giải quyết phần kiểm thử còn thiếu

**Chế độ hiện tại: chỉ hướng dẫn.** Các prompt dưới đây là việc bạn có thể gửi sau,
không phải lệnh đã được thực hiện. Không cần chạy terminal. Tạm bỏ qua skill/video.

Đọc [ghi nhận công việc đã làm](testing-handoff.md) trước. Có evidence mới nhưng
chưa đủ để tự chuyển mọi trạng thái cũ sang Pass/Fail. Mỗi lần chạy bổ sung phải
có Run ID mới; giữ nguyên log cũ và lỗi thử nghiệm để đối chiếu.

## Bước 1 — Rà evidence mới trước khi quyết định chạy thêm

Bạn mở `reports/testing-handoff.md`, xem mục Mobile, B và C. Sau đó gửi:

```text
Chỉ rà soát evidence, chưa chạy thêm test. Đọc reports/testing-handoff.md và
các thư mục supplement-runs của B/C/D. Đối chiếu ảnh và events.jsonl với
requirements, domains, cases, review cũ. Tạo bảng từng checkpoint: bằng chứng
đủ/chưa đủ, setup có khác ca gốc không, cần làm tiếp gì. Không chuyển toàn TC
sang Pass chỉ vì một checkpoint thành công. Chưa đăng issue. Ghi audit.
```

**Kết quả cần nhận:** danh sách chính xác ca nào có thể cập nhật từ evidence đã có,
ca nào cần chạy lại, ca nào bị chặn do thiếu control. Đừng chạy lại toàn bộ chỉ vì
chưa tổng hợp; tránh lặp thao tác không cần thiết.

## Bước 2 — Hoàn thiện Mobile D-MREG

### 2.1. Xác minh form và sửa cách diễn đạt ca phụ thuộc

Đã vào được Register và có ảnh ba input. Trước đây cả bộ bị chặn do không mở được
màn hình; nay phải tách “thiếu confirmation field” với “không vào được Register”.
Gửi:

```text
Chỉ cập nhật thiết kế/coverage D-MREG từ ảnh Register mới đã đối chiếu.
Giữ ca presence bốn trường riêng. Với các ca dùng confirm, ghi dependency
thiếu field và tách checkpoint độc lập trên name/email/password, gắn ID biến
thể nếu setup khác. Không coi chưa nhập confirm là đã nhập khớp.
Sửa điểm thiếu độc lập của ca password rỗng/confirm rỗng, và giải thích
D-DT-005 dùng email không có @ khác đại diện cũ. Đưa thay đổi cho tôi đọc.
Không ghi review thay tôi, chưa chạy thêm. Ghi audit.
```

Bạn đọc các ca thay đổi và nhận xét thật: hiểu thao tác nào, còn vướng ở đâu,
expected có đúng yêu cầu không. Không cần tự xác nhận mọi thứ đúng nếu chưa chắc.

### 2.2. Chỉ chạy phần thiếu sau khi bạn muốn tiếp tục

```text
Thực thi phần D-MREG còn thiếu theo bảng rà evidence và thiết kế vừa cập nhật.
Tạo run mới, kiểm tra đúng emulator và DB backend đang chạy; không restart
backend/reset DB hoặc sửa logic app. Tự thao tác Mobile UI, không dùng API thay UI.
Kiểm tra lại việc nhập đúng dữ liệu cho D-BV-002 (8 ký tự) vì run trước có
kết quả khác D-DT-002. Chạy riêng các ca còn thiếu như D-BV-006/007.
Lưu ảnh trước submit, phản hồi và điều hướng, UTC/monotonic, count DB chỉ đọc.
Nếu cần request/response, thu từ request thật do app gửi và che bí mật; nếu
không thu được, nói rõ, không tạo response giả từ API chạy riêng.
Ca cần confirm không tồn tại vẫn Blocked; ghi Fail cho yêu cầu presence có ảnh.
Cập nhật 06-execution, 07-bugs-and-ai-gaps, work-progress và audit theo evidence.
Không đăng issue trong bước này.
```

**Nếu phải thao tác tay trên emulator:** mở Home; dùng TAB/phím mũi tên để đưa
focus tới “Đăng nhập”, nhấn nút chọn/Enter, xác minh thật sự thấy form Login;
chạm “Đăng ký ngay”. Chuỗi phím phụ thuộc focus hiện tại, không bấm mù một chuỗi
cố định. Điền dữ liệu từ ca đã sửa, ẩn bàn phím chỉ khi nó đang mở; BACK khi bàn
phím không mở có thể rời app. Giữ mật khẩu ẩn, chụp trước/sau và gửi ảnh cho trợ lý.

**Xong bước D khi:** có status từng TC/checkpoint; mọi phần thiếu field được giải
thích; biến thể có ID/setup riêng; không còn gộp API-only thành Mobile Pass.

## Bước 3 — Hoàn thiện giỏ hàng B-FR07

Đã có đường UI khác tạo được giỏ: thêm từ Home. Một số setup quantity 2 dùng hai
lần click trang chi tiết để vượt qua lỗi lần đầu. Đây là setup bổ trợ, không làm
lỗi click đầu biến mất hoặc đổi ca gốc thành Pass.

Gửi bước rà soát trước, không chạy lại ngay:

```text
Đối chiếu supplement run B-FR07 20261015T154202360Z-supp với SRS và bộ ca.
Tách setup từ Home/hai lần click chi tiết khỏi ca gốc thêm một lần.
Dùng ảnh/log để đánh giá gộp dòng, các cột, +/- presence, dialog xóa, nhãn
Tổng cộng, thành tiền và tiếp tục mua sắm. Chỉ ghi tổng tiền theo oracle có căn cứ.
Ca tương tác +/- khi nút thiếu phải Blocked; presence có evidence thì Fail.
Xóa ngay không dialog không có nghĩa đã thực hiện xác nhận hoặc Hủy thành công.
Với ca invalid quantity, không gọi giỏ rỗng sau click đầu là Pass validation
vì click đầu hợp lệ cũng không có tác dụng. Đánh dấu checkpoint bị che bởi bug.
Cập nhật 06/07 và coverage từ evidence đủ; liệt kê chính xác phần cần chạy thêm.
Chưa chạy test mới hoặc đăng issue. Ghi audit.
```

Nếu còn ca khả thi cần chạy, sau khi đọc danh sách bạn gửi:

```text
Chạy đúng các checkpoint B-FR07 còn thiếu vừa liệt kê, bằng Web UI, run mới.
Tạo giỏ qua thao tác UI được mô tả rõ; reset chỉ xóa dòng giỏ do ca tạo.
Không sửa/xóa sản phẩm, không seed bằng API để thay state UI. Không reload giữa chuỗi.
Với quantity 0/âm/thập phân, ghi giá trị control thật nhận và phản hồi; phân biệt
lỗi click đầu với validation. Nếu dùng đường kích hoạt khác, ghi là diagnostic
variant, không thay kết quả ca một-click. Lưu ảnh và request thực tế nếu có.
Không cố bấm +/- không tồn tại. Cập nhật báo cáo/audit; chưa đăng issue.
```

**Xong bước B khi:** các ca trước đây Blocked do không có hàng đã được đối chiếu
với giỏ tạo từ UI; phần còn Blocked có lý do cụ thể (thiếu +/- hoặc dialog), không
còn ghi chung “không thêm được hàng” cho mọi ca.

## Bước 4 — Bổ sung quyền truy cập Admin UI C-FR14

Evidence mới chỉ có màn Login của khách. Chưa có kết quả login user thường.

```text
Bổ sung coverage C-R01 trên Admin UI theo FR-12. Tạo ca bổ sung có ID riêng
cho khách và user thường; mô tả dữ liệu/setup/expected từ SRS trước khi chạy.
Dùng user test riêng role user, tạo fixture qua API nếu cần nhưng thực hiện
login và quan sát chặn truy cập trên giao diện Admin. Không tự nhét admin token.
Dùng run mới, chụp màn khách vào Admin, user login, thông báo/kết quả điều hướng.
Không thêm/xóa danh mục trong ca quyền UI. Ghi API quyền hiện có riêng biệt.
Cập nhật coverage, execution, gaps và audit theo kết quả thật.
```

**Điều cần quan sát:** khách thấy màn đăng nhập; user thường đăng nhập xong có bị
ngăn vào giao diện quản trị không. Không suy luận kết quả UI từ POST/DELETE API.

## Bước 5 — Chốt A-FR02 và giới hạn biên thời gian

A chưa có run mới trong đợt bổ sung. Trước hết gửi:

```text
Chỉ rà soát A-FR02, chưa chạy. Đối chiếu 36 TC với execution và evidence.
Tách verdict checkpoint với verdict toàn TC, probe và setup failure.
Liệt kê phần còn thiếu thật sự, đặc biệt A-BV-007/011/012.
Đối chiếu protocol clock trong 04-boundary-cases.md mục 3.2; nêu việc cần làm
để kiểm soát new Date/Date.now tại server comparison trên bản sao riêng.
Không coi sleep ở client là đo đúng 30s/1ms. Ghi audit và chưa tạo harness.
```

Sau đó chọn theo mục tiêu:

- **Nếu giữ giới hạn đo:** báo Not run/Blocked có căn cứ, không ghi đã phủ đúng
  30 giây hoặc 1ms. Đây là báo cáo trung thực, không phải cam kết đạt điểm tối đa.
- **Nếu muốn kiểm thử mô phỏng chính xác:** gửi prompt bên dưới khi bạn chủ động
  muốn làm tiếp; không thay đổi đồng hồ toàn máy hoặc server đang dùng.

```text
Tạo và chạy harness clock riêng cho A-FR02 theo mục 3.2 trong boundary cases,
trên bản sao SUT/DB tách biệt. Chỉ điều khiển nguồn thời gian/quan sát; không
sửa ngưỡng, thời lượng, toán tử hoặc nhánh login. Ghi patch/hook/source hash.
Tách chuỗi khóa tự nhiên khỏi fixture khóa giả lập. Khi setup tự nhiên sai,
ghi failure setup và diagnostic; fixture không chứng minh SUT tự khóa đúng 30s.
Lưu clock tại phép so sánh, request/response redacted, state và run mới.
Nếu không đạt kiểm soát clock thật tại điểm so sánh, giữ Blocked và giải thích.
Cập nhật execution/coverage/audit; không sửa lại verdict run cũ.
```

## Bước 6 — Chốt bug mới và ảnh cho issue

Bước này làm sau khi evidence đã rà soát; đừng đăng các dấu hiệu chưa phân xử.

```text
Tổng hợp bug đã đủ evidence trong các run bổ sung B/C/D. Đối chiếu SRS,
gộp lỗi cùng nguyên nhân khi có căn cứ, tách lỗi độc lập. Chuẩn bị title/body,
severity có lý do, R/TC/Run ID và ảnh thật. So với issue đã có để tránh trùng.
Bổ sung kế hoạch screenshot thật cho API issue #7/#8 và sửa đường dẫn JSON #8
đang 404. Chưa tự đăng/comment/push; đưa danh sách thay đổi cụ thể cho tôi xem.
Ghi audit.
```

Khi bạn muốn đăng/cập nhật, gửi riêng yêu cầu đăng. Ảnh phải là màn hình thật hoặc
API client/terminal thật, không ảnh minh họa; che token/password. File commit local
chưa chắc có trên GitHub: sau push phải kiểm tra từng URL mở được.

## Bước 7 — Kiểm tra lại trước khi chuyển sang báo cáo nộp

```text
Chỉ kiểm tra kết quả bổ sung, chưa chạy thêm. Tổng hợp trạng thái mới của A/B/C/D
bằng TC ID duy nhất, phân biệt Pass/Fail/Blocked/Not run/observation và partial.
Liên kết run/checkpoint cho mỗi verdict; nêu ca chưa thể đóng và lý do.
Cập nhật work-progress và submission-readiness, không tự cho điểm tối đa.
Ghi audit. Liệt kê file thuộc đợt bổ sung để tôi biết trước khi yêu cầu commit.
```

Khi phần kiểm thử đã rõ, tiếp tục các việc đóng gói còn thiếu trong
[submission-readiness.md](submission-readiness.md): main report/bug report,
AI Critique 200–300 từ, audit đầy đủ, PDF, test summary, tự chấm, commit log và ZIP.
Đó là giai đoạn sau, không được tự coi là đã xong từ việc có evidence mới.
