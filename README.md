# Ứng dụng Quản lý Điểm Sinh viên

Bài thực hành TH01 — Lập trình Web 2026

- **Sinh viên:** Nguyễn Thế Lâm
- **Mã sinh viên:** B25DCCC131
- **Nhánh:** `TH01`

## Công nghệ

React 19 + Vite 8 (JavaScript thuần, không dùng thư viện UI ngoài).

## Cách chạy

```bash
npm install
npm run dev
```

Mở trình duyệt tại địa chỉ Vite in ra (mặc định `http://localhost:5173`).

## Cấu trúc component

```
App                       component CHA - quản lý state chính (students, filter)
├── StudentForm           form nhập liệu + ràng buộc dữ liệu
├── Statistics            tổng số sinh viên, điểm trung bình (.reduce)
├── FilterBar             nút lọc Tất cả / Giỏi / Trượt môn
└── StudentTable          component CON - nhận danh sách qua props
    └── StudentItem       component CHÁU - hiển thị 1 dòng sinh viên
```

Dữ liệu mẫu đặt riêng tại `src/data/students.js` (5 sinh viên).

## Đối chiếu yêu cầu đề bài

| Yêu cầu | Thực hiện |
|---|---|
| Danh sách mẫu tối thiểu 3 sinh viên | 5 sinh viên trong `src/data/students.js` |
| Hiển thị dạng bảng | `StudentTable` + `StudentItem` |
| Form thêm (Họ tên, Điểm, Lớp) | `StudentForm` |
| Thêm không mất dữ liệu cũ | `setStudents([...students, student])` |
| Báo lỗi khi để trống | Kiểm tra `.trim() === ''` |
| Báo lỗi khi điểm < 0 hoặc > 10 | Kiểm tra `diem < 0 \|\| diem > 10` |
| Xoá sinh viên | `handleDelete` dùng `.filter()` theo `id` |
| Lọc Giỏi (>= 8) / Trượt (< 5) | `FilterBar` + `filteredStudents` |
| Tổng số sinh viên, điểm trung bình | `Statistics` dùng `.reduce()` |

## Quy chuẩn ES6

| Yêu cầu | Vị trí tiêu biểu |
|---|---|
| `let` / `const`, không dùng `var` | toàn bộ mã nguồn |
| Arrow Functions | tất cả component và handler |
| Destructuring (props và state) | `({ student, index, onDelete })`, `const { id, name, score, class: className } = student` |
| Template Literals | `` `${score} / 10` ``, `` `btn-filter ${filter === value ? 'active' : ''}` `` |
| `.map()` | `StudentTable`, `FilterBar` |
| `.filter()` | xoá sinh viên, lọc danh sách, đếm Giỏi/Trượt |
| `.reduce()` | tính tổng điểm trong `Statistics` |
| Spread operator | `[...students, student]`, `{ ...form, [field]: value }` |
