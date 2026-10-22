# Thiệp Mời Đám Cưới Online (Host Miễn Phí Trên Cloudflare Pages)

Dự án trang web **Thiệp Mời Đám Cưới** phong cách **Sang trọng - Tinh tế (Trắng Kem - Vàng Champagne Gold - Pastel Blush)**, tối ưu 100% cho cả điện thoại và máy tính, không cần máy chủ trả phí.

---

## 1. Cách chỉnh sửa nội dung thiệp cưới của bạn

Bạn chỉ cần mở duy nhất tệp [`config.js`](./config.js) và thay đổi các thông tin:
- **Cô Dâu & Chú Rể**: Họ tên, tên phụ huynh hai bên, địa chỉ, tiểu sử ngắn, ảnh đại diện.
- **Tài khoản ngân hàng & QR Mừng Cưới**: Chỉ cần điền mã ngân hàng (VD: `VCB`, `TCB`, `MB`, `ACB`...) và số tài khoản vào đường dẫn `https://img.vietqr.io/image/<MÃ_NGÂN_HÀNG>-<SỐ_TK>-compact2.png?accountName=<TÊN_CHỦ_TK>` để tự động tạo mã QR chuẩn VietQR, hoặc thay bằng ảnh QR của bạn.
- **Ngày giờ cưới (`weddingDate.isoDate`)**: Định dạng `YYYY-MM-DDTHH:mm:ss` (ví dụ `2026-12-20T18:00:00`) để bộ đếm ngược tự động tính ngày, giờ, phút, giây.
- **Lịch trình & Bản đồ (`events`)**: Thay địa chỉ và link Google Maps cho Lễ Vu Quy, Lễ Thành Hôn, Tiệc Cưới.
- **Album ảnh (`gallery`) & Nhạc nền (`music`)**: Thay bằng link ảnh cưới và bài hát yêu thích của hai bạn.

---

## 2. Tính năng tạo Link Thiệp ghi tên từng khách mời

Trang web hỗ trợ cá nhân hóa tên khách mời ngay trên phong bì thiệp:
- Bạn có thể kéo xuống cuối trang thiệp (mục **Tạo Link Thiệp Ghi Tên Khách Mời**), nhập tên khách (ví dụ: `Anh Tuấn & Chị Lan`) rồi bấm **Sao chép Link Thiệp**.
- Hoặc thêm `?to=Tên+Khách` vào sau địa chỉ web (ví dụ: `https://thiepcuoi.pages.dev/?to=Anh%20Minh%20v%C3%A0%20Ng%C6%B0%E1%BB%9Di%20th%C6%B0%C6%A1ng`).

---

## 3. Hướng dẫn kết nối Form RSVP & Lời Chúc với Google Sheets (Miễn phí 100%)

1. Truy cập [Google Sheets](https://sheets.new) và tạo một bảng tính mới.
2. Đặt tên các cột ở dòng 1 lần lượt là:
   `Thời gian` | `Tên khách mời` | `Số điện thoại` | `Khách bên` | `Tham dự` | `Số lượng` | `Lời chúc`
3. Trên thanh menu, chọn **Tiện ích mở rộng (Extensions)** -> **Apps Script**.
4. Xóa đoạn mã mặc định và dán đoạn mã dưới đây vào:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    data.timestamp || new Date().toLocaleString("vi-VN"),
    data.name || "",
    data.phone || "",
    data.side || "",
    data.attendance || "",
    data.guests || "",
    data.message || ""
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

5. Nhấn nút **Triển khai (Deploy)** -> **Tùy chọn triển khai mới (New deployment)**:
   - Chọn loại: **Ứng dụng web (Web app)**.
   - Thực thi dưới dạng (Execute as): **Tôi (Me)**.
   - Ai có quyền truy cập (Who has access): **Bất kỳ ai (Anyone)**.
   - Nhấn **Triển khai (Deploy)** và cấp quyền truy cập.
6. Sao chép đường dẫn **Web App URL** (`https://script.google.com/macros/s/.../exec`) và dán vào mục `googleSheetWebAppUrl` trong tệp [`config.js`](./config.js).

---

## 4. Hướng dẫn đưa lên Cloudflare Pages (Miễn phí trọn đời, Băng thông không giới hạn)

### Cách 1: Kéo thả trực tiếp (Nhanh nhất - Chỉ mất 1 phút, không cần cài đặt)
1. Đăng nhập vào [Cloudflare Dashboard](https://dash.cloudflare.com/) (đăng ký tài khoản miễn phí nếu chưa có).
2. Ở menu bên trái, chọn **Workers & Pages** -> nhấn nút **Create** -> chuyển sang tab **Pages** -> chọn **Upload assets** (Direct Upload).
3. Đặt tên dự án (ví dụ: `thiep-cuoi-quan-truc`) -> Bạn sẽ nhận được tên miền miễn phí dạng `https://thiep-cuoi-quan-truc.pages.dev`.
4. Kéo thả toàn bộ thư mục `wedding-invitation` lên và nhấn **Deploy site**.

### Cách 2: Kết nối với GitHub (Tự động cập nhật khi bạn sửa ảnh/nội dung)
1. Đẩy thư mục `wedding-invitation` lên một kho lưu trữ (Repository) trên GitHub của bạn.
2. Vào **Cloudflare Dashboard** -> **Workers & Pages** -> **Create** -> **Pages** -> **Connect to Git**.
3. Chọn repository vừa tạo -> Ở mục **Build settings**, để trống cả *Build command* và *Build output directory* (mặc định là `/`) -> Nhấn **Save and Deploy**.

