# AI-002 — Output nguyên văn của bước chuẩn bị

## File: README.md

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
- Working tree SUT sạch tại thời điểm ghi nhận ngày 14/10/2026; chưa xác nhận môi trường chạy. Chi tiết tại [environment.md](reports/environment.md).
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

## File: reports/environment.md

# Môi trường và baseline — HW02

**Sinh viên:** Nguyễn Lê Thế Vinh — 23120190 — Thành viên 2.

**Ngày ghi nhận:** 14/10/2026, múi giờ Asia/Ho_Chi_Minh (UTC+07:00). Đây là thông tin chuẩn bị, không phải kết quả kiểm thử SUT.

## Baseline

| Thuộc tính | Giá trị |
|---|---|
| Repo bài làm | https://github.com/tzin1401/testing-hw02 |
| Repo SUT | https://github.com/ttbhanh/eshop-sut |
| Thư mục SUT tương đối | `eshop-sut/` |
| Commit SUT | `85af3ba875c88283615e22cb108f13e2fccaf0e9` |
| Thay đổi cục bộ SUT tại lúc kiểm tra | Không có (`git -C eshop-sut status --short` không có output) |
| Cấu hình Mobile đã chỉnh | Chưa ghi nhận |
| Môi trường chạy ứng dụng | Chưa xác nhận |

Repo ngoài đang có `eshop-sut` staged dạng gitlink; bước chuẩn bị không đưa mục này vào commit. Để tái lập SUT, lấy repo chính thức và checkout đúng commit trên. Mọi diff cấu hình sau này phải được ghi lại riêng cùng lần chạy.

## Công cụ đã kiểm tra bằng lệnh chỉ đọc

| Thành phần | Giá trị quan sát | Nguồn |
|---|---|---|
| Hệ điều hành | Ubuntu 26.04.1 LTS | `/etc/os-release` |
| Kernel | Linux 7.0.0-34-generic | `uname -sr` |
| Node.js | v22.22.1 | `node --version` |
| npm | 9.2.0 | `npm --version` |
| Python | 3.14.4 | `python3 --version` |
| Trình duyệt/phiên bản | Chưa cung cấp | Bổ sung khi chuẩn bị chạy Web |
| Thiết bị Mobile, OS, kích thước màn hình | Chưa cung cấp | Bổ sung khi chuẩn bị chạy Mobile |
| Expo Go/emulator và phiên bản | Chưa xác nhận | Bổ sung khi chuẩn bị chạy Mobile |

Các phiên bản này được đọc trên workspace hiện tại; nếu chạy test trên máy khác, ghi lại môi trường của máy thực thi. Chưa kiểm chứng dependency installation hoặc tính tương thích runtime.

## Địa chỉ dự kiến, chưa xác nhận đang hoạt động

| Thành phần | Địa chỉ/cấu hình dự kiến |
|---|---|
| Backend | `http://localhost:3000` |
| Web | `http://localhost:5173` |
| Admin | `http://localhost:5174` |
| Mobile | Expo trên thiết bị/emulator; API dùng địa chỉ backend thiết bị truy cập được |

Theo mã nguồn đã đọc trong quá trình chuẩn bị hướng dẫn, backend import `database.js`, file này gọi `initDatabase()` để DROP/seed bảng khi khởi động. Sao lưu dữ liệu cần giữ trước khi khởi chạy; tránh restart giữa chuỗi kiểm thử trạng thái. Không chạy server hoặc reset DB trong bước chuẩn bị tài liệu này.

## Nguồn yêu cầu để đối chiếu

- [Đề HW02](../2026.HW02.Domain%20Testing_En.pdf), [phân công thành viên 2](../group_feature_assignment.md).
- [Slide VN](../slide/domain-testing-vn.pdf), [slide EN](../slide/domain-testing-en.pdf).
- [SRS tại commit baseline](https://github.com/ttbhanh/eshop-sut/blob/85af3ba875c88283615e22cb108f13e2fccaf0e9/README.md): A-FR02 → FR-02; B-FR07 → FR-07/FR-06; C-FR14 → FR-14/FR-12; D-MREG → FR-20/FR-01.
- API và hướng dẫn cài đặt nằm cùng commit baseline; đường dẫn được liệt kê trong [README bài làm](../README.md).

## Thông tin bổ sung ở bước chạy môi trường

- [ ] Ghi kết quả cài dependency và lệnh khởi chạy thực tế.
- [ ] Xác nhận backend/Web/Admin mở được, kèm thời điểm và bằng chứng.
- [ ] Ghi trình duyệt, thiết bị và phiên bản ứng dụng Mobile.
- [ ] Ghi IP/URL Mobile thực tế và diff cấu hình nếu thay đổi.
- [ ] Ghi dữ liệu tiền điều kiện và phương pháp reset/cleanup cho từng nhóm test.

Các mục trên là công việc chưa xác nhận, không phải human review hoặc kết quả test.

## File: reports/work-progress.md

# Tiến độ HW02 — Nguyễn Lê Thế Vinh — 23120190

**Vai trò nhóm:** Thành viên 2. **Cập nhật:** 14/10/2026 (UTC+07:00).

## Bước chuẩn bị tài liệu

- [x] Đối chiếu phân công thành viên 2 và xác nhận bốn chức năng.
- [x] Ghi baseline SUT `85af3ba875c88283615e22cb108f13e2fccaf0e9` và nguồn yêu cầu.
- [x] Tạo README với rubric 25/25/25/15/10, để trống điểm tự chấm.
- [x] Tạo environment.md với thông tin công cụ quan sát được và các mục chưa xác nhận.
- [x] Tạo file theo dõi tiến độ này.

Đây là trạng thái tạo tài liệu của AI; không thể hiện sinh viên đã review thiết kế hoặc đã chạy SUT. Nhật ký tương tác của bước này nằm ở **AI-002** trong [AI Audit](../AI_AUDIT_REPORT.md).

## Tiến độ từng chức năng

“Chưa ghi nhận” nghĩa là chưa có sản phẩm/bằng chứng được xác nhận trong bộ bài làm này.

| Chức năng | Yêu cầu/input-output | EC | Ca Domain | Ca BVA | Review sinh viên | Thực thi | Bug/AI gaps |
|---|---|---|---|---|---|---|---|
| A-FR02 — Đăng nhập/khóa Web | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận |
| B-FR07 — Giỏ hàng Web | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận |
| C-FR14 — Danh mục Admin | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận |
| D-MREG — Đăng ký Mobile | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận | Chưa ghi nhận |

Không chuyển một ô thành hoàn thành chỉ vì AI đã đề xuất nội dung. Review chỉ ghi khi có nhận xét thật của sinh viên; execution chỉ ghi khi có lần chạy và bằng chứng.

## Quy trình lưu file và commit khi thực hiện

Mỗi chức năng dùng thư mục `features/<mã-chức-năng>/`, với các bước:

| Thứ tự | File dự kiến | Nội dung |
|---|---|---|
| 1 | `01-requirements.md` | Nguồn yêu cầu, input/output, trạng thái |
| 2 | `02-domains.md` | Lớp tương đương và đại diện |
| 3 | `03-domain-cases.md` | Các ca Domain có thao tác và expected |
| 4 | `04-boundary-cases.md` | Biên và các ca BVA |
| 5 | `05-review-coverage.md` | Review thực tế, sửa đổi và truy vết |
| 6 | `06-execution.md` | Run ID, actual, status và evidence |
| 7 | `07-bugs-and-ai-gaps.md` | Bug/issue, thiếu sót AI có bằng chứng |

Tạo commit sau từng bước thực sự hoàn thành của từng chức năng. Chỉ stage đường dẫn liên quan; giữ nguyên các thay đổi khác. Không điền trước các file execution hoặc human review.

## Các phần tổng hợp còn lại

- [ ] Skill Domain/BVA tái sử dụng và video demo YouTube.
- [ ] Báo cáo chính Markdown + PDF cho đủ bốn chức năng.
- [ ] Bug report, GitHub Issues và ảnh trên từng issue.
- [ ] AI Audit đầy đủ và PDF; xử lý các phần lịch sử còn thiếu bằng dữ liệu thật.
- [ ] AI Critique 200–300 từ, Markdown + PDF.
- [ ] Test summary thực tế và bảng tự chấm.
- [ ] Commit log, kiểm tra ZIP và nộp Moodle.

## Việc tiếp theo

Thực hiện **bước 3–4** của [LAM_HW02_TUNG_BUOC.md](../LAM_HW02_TUNG_BUOC.md): chuẩn bị/chạy backend, Web, Admin và cung cấp kết quả thực tế để cập nhật environment. Lưu ý backend có hành vi seed lại DB khi khởi động.

Sau khi môi trường được xác nhận, thực hiện **bước 5.1** cho A-FR02. Chưa bắt đầu test hay tạo kết quả ở lượt chuẩn bị này.

## Thông báo tiến độ

Tôi sẽ kiểm tra trạng thái repo, tạo ba file chuẩn bị và ghi AI Audit cho lượt này, rồi commit riêng các file đó.

Ba file đã có đủ baseline, phạm vi bốn chức năng và bảng tự chấm để trống. Tôi đang kiểm tra nội dung và phạm vi commit; mục `eshop-sut` đang staged sẽ được giữ nguyên, không đưa vào commit này.

## Phản hồi cuối

Đã tạo [README.md](/home/zinn/zinn/test/hw02/README.md), [environment.md](/home/zinn/zinn/test/hw02/reports/environment.md) và [work-progress.md](/home/zinn/zinn/test/hw02/reports/work-progress.md).

Đã ghi AI Audit và commit riêng bước chuẩn bị; không gom `eshop-sut` hoặc thay đổi khác. Điểm tự chấm để trống, chưa ghi kết quả chạy hay human review.

Tiếp theo: làm **bước 3–4** để chạy backend, Web và Admin.
