# HW02 — Domain Testing on EShop

- **Sinh viên:** Nguyễn Lê Thế Vinh — **23120190**.
- **Phân công:** Thành viên 2; bài làm cá nhân.
- **Repo bài làm và GitHub Issues:** https://github.com/tzin1401/testing-hw02
- **Trạng thái:** Đã chuẩn bị tài liệu ban đầu. Chưa ghi nhận kết quả kiểm thử hoặc review của sinh viên đối với thiết kế kiểm thử.

## Phạm vi bốn chức năng

| Mã bài làm | Pool | Chức năng | Nguồn yêu cầu |
|---|---|---|---|
| A-FR02 | A | Đăng nhập và khóa tài khoản Web | SRS FR-02 |
| B-FR07 | B | Giỏ hàng Web | SRS FR-07; ràng buộc số lượng tham chiếu FR-06 và phân công nhóm |
| C-FR14 | C | Thêm/Xem/Xóa danh mục Admin | SRS FR-14; quyền thao tác ghi tham chiếu FR-12 |
| D-MREG | D | Đăng ký trên Mobile | SRS FR-20 kết hợp quy tắc FR-01 |

FR-14 có tên CRUD nhưng SRS chỉ bắt buộc Thêm/Xem/Xóa. “Mobile FR-01” trong phân công nhóm được ánh xạ thành FR-20 + FR-01, không phải phần đăng ký Web của thành viên khác.

## Baseline và nguồn tài liệu

- SUT chính thức: https://github.com/ttbhanh/eshop-sut
- Commit baseline: `85af3ba875c88283615e22cb108f13e2fccaf0e9`.
- Working tree SUT sạch tại thời điểm ghi nhận ngày 14/10/2026; Backend, Web và Admin đã có phản hồi/hiển thị theo dữ liệu và ảnh sinh viên gửi (AI-004–AI-006); Mobile chưa xác nhận. Chi tiết tại [environment.md](reports/environment.md).
- [Đề HW02](2026.HW02.Domain%20Testing_En.pdf): mục 5–6 về phạm vi/kỹ thuật; mục 7 về skills; mục 9–10 về AI; mục 12, 14–15, 17 về commit, bài nộp và chấm điểm.
- [Phân công nhóm](group_feature_assignment.md): thành viên 2; danh tính được người dùng xác nhận trong hội thoại.
- [Slide tiếng Việt](slide/domain-testing-vn.pdf), trang 6–26; [slide tiếng Anh](slide/domain-testing-en.pdf), trang 12–37: phương pháp Domain Testing và BVA.
- [SRS tại baseline](https://github.com/ttbhanh/eshop-sut/blob/85af3ba875c88283615e22cb108f13e2fccaf0e9/README.md): hành vi đúng để thiết kế expected result.
- [API specification tại baseline](https://github.com/ttbhanh/eshop-sut/blob/85af3ba875c88283615e22cb108f13e2fccaf0e9/api_specification.md) và [setup guide](https://github.com/ttbhanh/eshop-sut/blob/85af3ba875c88283615e22cb108f13e2fccaf0e9/setup_guide.md): giao tiếp API và khởi chạy.
- [Hướng dẫn từng bước](LAM_HW02_TUNG_BUOC.md): thứ tự thao tác cá nhân; không thay thế yêu cầu của đề/SRS.

Một số tài liệu nguồn trên hiện có cục bộ nhưng chưa được đưa vào commit chuẩn bị. Repo SUT là repo lồng bên trong; sử dụng URL và commit ở trên để lấy đúng phiên bản, không giả định repo bài làm đã chứa mã nguồn SUT.

## Bảng tự chấm

Để trống đến khi có sản phẩm thực tế và sinh viên tự đánh giá.

| STT | Hạng mục | Điểm tối đa | Điểm tự chấm | Dẫn chứng |
|---|---|---:|---|---|
| 1 | A-FR02 — Domain + BVA | 25 | | |
| 2 | B-FR07 — Domain + BVA | 25 | | |
| 3 | C-FR14 — Domain + BVA | 25 | | |
| 4 | D-MREG — Mobile, Domain + BVA | 15 | | |
| 5 | Agent Skills | 10 | | |
| | **Tổng** | **100** | | |

## Test summary

Phạm vi dự kiến gồm **4 chức năng**. Dấu `—` là chưa có số liệu được tổng hợp, không phải kết quả chạy hoặc giá trị 0 đã được xác nhận.

| Chức năng | Thiết kế | Đã chạy | Pass | Fail | Chưa chạy | Bug | Video demo |
|---|---|---|---|---|---|---|---|
| A-FR02 | — | — | — | — | — | — | — |
| B-FR07 | — | — | — | — | — | — | — |
| C-FR14 | — | — | — | — | — | — | — |
| D-MREG | — | — | — | — | — | — | — |
| Tổng | — | — | — | — | — | — | — |

Khi tổng hợp: đếm TC ID duy nhất; `Đã chạy = Pass + Fail`; `Chưa chạy = Not run + Blocked`; `Thiết kế = Đã chạy + Chưa chạy`. Các lần chạy lại có Run ID riêng. Bug đếm theo lỗi/issue duy nhất. Chỉ điền khi có dữ liệu và bằng chứng.

## Theo dõi bài làm

- [Môi trường và baseline](reports/environment.md).
- [Tiến độ và bước tiếp theo](reports/work-progress.md).
- [AI Audit Report](AI_AUDIT_REPORT.md) — bản đang phát triển, chưa phải phụ lục nộp hoàn chỉnh.

Sản phẩm cần hoàn thiện: báo cáo chính Markdown + PDF cho bốn chức năng; bug report và ảnh trên GitHub Issues; AI Audit và AI Critique 200–300 từ (Markdown + PDF); commit log văn bản; README tự chấm/test summary; skill, video YouTube và bằng chứng hỗ trợ.

Nộp ZIP lên Moodle theo tên `23120190_HW02_AI_DomainTesting_<điểm-3-chữ-số>.zip`. Chỉ điền điểm sau khi tự đánh giá; commit/push GitHub không thay cho nộp Moodle.
