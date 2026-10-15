# AI-041 — Output thiết kế BVA D-MREG

## Prompt nguyên văn

```text
Tạo `features/D-MREG/04-boundary-cases.md` theo slide. Kiểm tra password length ở 7/8/9 ký tự: dùng chuỗi có hoa, thường, số và ký tự đặc biệt hợp lệ ở cả ba điểm, ví dụ `Aa1!bbb`, `Aa1!bbbb`, `Aa1!bbbbb`; expected riêng về độ dài là 7 từ chối, 8/9 đạt điều kiện độ dài nhưng chỉ thành công nếu các trường khác hợp lệ. Thêm biên một bên cho các tập ký tự bằng cách thiếu một nhóm riêng, nhưng phân loại đó là EC/robustness chứ không giả danh length boundary. Với họ tên/email/confirm chỉ thiết kế biên nếu SRS nêu giới hạn; không bịa max length. Ghi email duy nhất cho mỗi ca đăng ký thành công, setup trạng thái DB, từng thao tác Mobile, expected, D-EC/D-R/TC và ảnh cần lưu. Chưa chạy. Ghi audit và commit riêng.
```

## Output

Toàn văn đầu ra là [`features/D-MREG/04-boundary-cases.md`](../features/D-MREG/04-boundary-cases.md). Tài liệu có ba điểm BVA password length tại 7/8/9 (`LB−1`, `LB`, `LB+1`) và bốn ca EC/robustness riêng cho thiếu từng nhóm ký tự. Mỗi ca có thiết bị Android mặc định, trạng thái app/DB, dữ liệu, thao tác Mobile, expected, D-EC/D-R/TC và bằng chứng dự kiến. 8 và 9 dùng email test thành công riêng biệt; không đặt upper bound cho password hay giới hạn trường khác.

## Giới hạn

Chỉ đọc yêu cầu, domains, domain cases, slide và môi trường đã ghi để soạn thiết kế. Chưa chạy app/test, tạo account, chụp evidence, điền actual/status hoặc ghi human review. Không sửa SUT.
