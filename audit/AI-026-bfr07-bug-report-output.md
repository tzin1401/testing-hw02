# AI-026 output snapshot — B-FR07 bug report

## Prompt nguyên văn

> `Đối chiếu bug B-FR07 đã có evidence với SRS. Cập nhật ​07-bugs-and-ai-gaps.md​, gộp test fail cùng nguyên nhân, tách lỗi độc lập; chuẩn bị title/body issue với bước tái hiện, expected/actual, severity có lý do, TC ID và ảnh cần đính kèm. Chỉ nêu AI gap có bằng chứng. Không tự đăng GitHub Issue; ghi audit và commit riêng phần báo cáo bug.`

## Đầu ra

Đã cập nhật `features/B-FR07/07-bugs-and-ai-gaps.md` với hai issue draft chưa đăng:

1. `Web: Thêm sản phẩm hợp lệ không cập nhật giỏ hàng` — gộp triệu chứng B-DT-002 sau cùng một thao tác Add, severity Major có lý do, body gồm môi trường, tiền điều kiện, bước tái hiện, expected/actual, TC ID và ba ảnh.
2. `Web cart: Empty state không hiển thị hình minh họa` — lỗi độc lập B-DT-001, severity Minor có lý do, body gồm các trường tương tự và ảnh empty state.

Phần AI gaps chỉ ghi harness input sai đã được xác nhận trong run notes, API POST exploratory 1.5 có HTTP 200 và GET follow-up hai entry nhưng thiếu baseline nên không quy kết được nguồn. Không đăng GitHub Issue.
