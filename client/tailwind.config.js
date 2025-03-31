/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E88E5", // Xanh dương (CTA, nút chính)
        secondary: "#1565C0", // Xanh dương đậm (Tiêu đề, navbar)
        accent: "#FFB74D", // Cam nhạt (Điểm nhấn, badge, rating)
        background: "#F5F5F5", // Xám nhạt (Nền trang)
        card: "#FFFFFF", // Trắng (Nền card, nội dung chính)
        textPrimary: "#212121", // Đen nhạt (Văn bản chính)
        textSecondary: "#616161", // Xám đậm (Phụ đề, mô tả)
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "sans-serif"],
      },
      fontSize: {
        hero: "40px", // Tiêu đề chính trang chủ
        sectionTitle: "28px", // Tiêu đề mục
        cardTitle: "20px", // Tiêu đề khóa học
        body: "16px", // Văn bản chính
        small: "14px", // Mô tả, nhãn nhỏ
      },
      boxShadow: {
        card: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Bóng nhẹ cho card
      },
      borderRadius: {
        card: "12px", // Bo góc mềm mại cho card
      },
    },
  },
  plugins: [],
};
