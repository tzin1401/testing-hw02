# AI-044 — Đối chiếu bug và chuẩn bị issue D-MREG

**Ngày giờ ghi audit:** 2026-10-15T15:02:22Z (2026-10-15 22:02:22 +07:00, Asia/Ho_Chi_Minh).
**AI tool:** Codex trong phiên làm việc hiện tại.
**SUT baseline:** `85af3ba875c88283615e22cb108f13e2fccaf0e9`.

## Prompt nguyên văn

```text
`Đối chiếu bug D-MREG đã có evidence với SRS. Cập nhật ​07-bugs-and-ai-gaps.md​, gộp test fail cùng nguyên nhân, tách lỗi độc lập; chuẩn bị title/body issue với bước tái hiện, expected/actual, severity có lý do, TC ID và ảnh cần đính kèm. Chỉ nêu AI gap có bằng chứng. Không tự đăng GitHub Issue; ghi audit và commit riêng phần báo cáo bug.`
```

## Đầu vào đã đối chiếu

- `eshop-sut/README.md`, FR-01: email phải hợp lệ và duy nhất; không quy định status/body lỗi API khi trùng.
- `eshop-sut/api_specification.md`, `POST /api/register`: request fields và response thành công; không định nghĩa phản hồi lỗi duplicate.
- `features/D-MREG/06-execution.md`: trạng thái UI Blocked và API supplementary finding.
- `evidence/D-MREG/full-runs/20261015T1303Z-DMREG/api-registration-duplicate-isolated.json`: hai POST tuần tự, response HTTP 200/ID 3 và ID 4, read-only count 0 → 1 → 2; mật khẩu đã redacted.
- Ảnh/log run cho việc tap Login không mở màn Login; run metadata cho backend listener đã dừng và bản sao test cô lập.

## Output

Đã cập nhật `features/D-MREG/07-bugs-and-ai-gaps.md` với một bug API độc lập, title/body issue, bước tái hiện, expected/actual, severity/priority có lý do, requirement/TC scope, labels đề xuất và chỉ dẫn evidence ảnh trung thực. Không gộp các ca Mobile Blocked thành bug; không đăng GitHub Issue. AI gap nội dung không được khẳng định vì run không cung cấp bằng chứng về AI-generated false result; blocker điều khiển UI được ghi như giới hạn thực thi có evidence.

## Giới hạn

Không chạy thêm test, không thay đổi SUT, không tạo ảnh minh họa và không đăng issue. Dữ liệu duplicate chỉ được tái hiện trong DB test cô lập. Không có ảnh UI/API phù hợp cho finding API; JSON là evidence chính. Chưa có kết quả Mobile.

## Commit

Sẽ được điền sau khi commit riêng file bug report và audit này.
