# SONA-GLOBAL — Creations for Billions

Website tĩnh nhiều trang cho SONA-GLOBAL. `About us` là landing chính; mỗi module có một trang nội dung độc lập.

## Routes

- `/` hoặc `/index.html` — About us
- `/ecosystem.html` — AI Apps, Mobile Apps, Mobile Games và Data × AI × Growth
- `/publishing.html` — Dịch vụ publishing và hành trình hợp tác
- `/share.html` — Góc chia sẻ về product, growth và văn hóa đội ngũ
- `/library.html` — Brand/media kit, báo cáo và tài liệu truyền thông
- `/contact.html` — Thông tin liên hệ và form mở email (không lưu dữ liệu)

## VI / EN

Nút `VI` và `EN` nằm trên navbar ở mọi trang. Lựa chọn được lưu bằng `localStorage` với key `sona-global-locale`, vì vậy ngôn ngữ vẫn giữ nguyên khi chuyển trang hoặc tải lại trang.

Mỗi nội dung hai ngôn ngữ dùng các thuộc tính `data-vi`, `data-en` và `data-i18n`. Cách này giữ dự án thuần HTML/CSS/JavaScript, không cần database hay CMS.

## Motion và giao diện

- Canvas network background, gradient tối và glass surfaces.
- Scroll reveal, parallax hero, counter số liệu, hover lift/tilt card.
- Tôn trọng `prefers-reduced-motion`.
- Ảnh hero tạo riêng tại `public/media/sona-ecosystem-hero.png`; ảnh không có chữ hoặc logo để dùng lại trên nhiều trang.

## Chạy local

```bash
cd apps/sona-global-landing
pnpm dev
```

Mở `http://localhost:3000`.

Không cần biến môi trường, database hoặc API bên ngoài. Form liên hệ không gửi dữ liệu lên server: form chỉ mở ứng dụng email của người dùng.
