import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ============ 色彩体系 ============
      colors: {
        // 主色：灰鼠尾草绿（柔和、舒缓、自然）
        primary: {
          DEFAULT: "#5A8A6A",
          50:  "#EEF4F0",
          100: "#D8E8DD",
          200: "#B8D4C2",
          300: "#8FBAA3",
          400: "#6FA48A",
          500: "#5A8A6A", // 主色
          600: "#4A7358",
          700: "#3D5E49",
          800: "#324C3C",
          900: "#293E31",
          950: "#1A2A21",
        },
        // 强调色：暖赤陶（温暖、自然、可信赖）
        accent: {
          DEFAULT: "#C4773A",
          50:  "#FDF5EE",
          100: "#F9E5D1",
          200: "#F0C9A3",
          300: "#E5A771",
          400: "#D5894F",
          500: "#C4773A", // 主强调色
          600: "#A8632F",
          700: "#8C5127",
          800: "#734221",
          900: "#5E351D",
          950: "#3A1F10",
        },
        // 暖金色（辅助强调，用于徽章、小面积装饰）
        gold: {
          DEFAULT: "#A16207",
          50:  "#FEFCE8",
          100: "#FEF9C3",
          200: "#FDE047",
          300: "#FACC15",
          400: "#EAB308",
          500: "#A16207", // 主暖金色
          600: "#854D0E",
          700: "#713F12",
          800: "#5C4010",
          900: "#4A3310",
          950: "#2D1F0A",
        },
        // 中性色 / 背景
        bg: {
          DEFAULT: "#F8F7F4", // 暖白（主背景）
          warm:    "#F8F7F4",
          white:   "#FFFFFF",
          card:    "#FFFFFF",
          section: "#F3F0EB",
        },
        // 文字色
        text: {
          primary:   "#1F1F1C", // 近黑（主文字）
          secondary: "#6B6B68", // 次级文字
          muted:     "#9A9A95", // 静默文字
          inverse:   "#FFFFFF",
        },
        // 边框 / 分割线
        border: {
          DEFAULT: "#E0DCD6",
          light:    "#EDE9E3",
          strong:   "#C8C3BC",
        },
      },

      // ============ 字体体系 ============
      fontFamily: {
        // 英文标题：优雅衬线体
        heading: ["Playfair Display", "Georgia", "Noto Serif SC", "serif"],
        // 英文正文：友好圆润无衬线
        body: ["Nunito", "Noto Sans SC", "sans-serif"],
        // 中文标题：宋体（传统文化韵味）
        cnHeading: ["Noto Serif SC", "Source Han Serif SC", "serif"],
        // 中文正文：黑体（清晰易读）
        cnBody: ["Noto Sans SC", "Source Han Sans SC", "sans-serif"],
        // 等宽（代码、数据展示）
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },

      // ============ 间距体系 ============
      spacing: {
        "4xs": "2px",
        "3xs": "4px",
        "2xs": "8px",
        xs:     "12px",
        sm:     "16px",
        md:     "24px",
        lg:     "32px",
        xl:     "48px",
        "2xl":  "64px",
        "3xl":  "80px",
        "4xl":  "96px",
        "5xl":  "128px",
      },

      // ============ 圆角体系（Organic Biophilic 大圆角风格）============
      borderRadius: {
        sm:   "4px",
        DEFAULT: "8px",
        md:   "12px",
        lg:   "16px",
        xl:   "20px",  // 主圆角（按钮、卡片）
        "2xl": "24px",
        "3xl": "32px",
        full:  "9999px",
      },

      // ============ 阴影（柔和、自然）============
      boxShadow: {
        sm:   "0 1px 3px rgba(31, 31, 28, 0.04), 0 1px 2px rgba(31, 31, 28, 0.02)",
        DEFAULT: "0 4px 12px rgba(31, 31, 28, 0.06), 0 1px 4px rgba(31, 31, 28, 0.04)",
        md:   "0 8px 24px rgba(31, 31, 28, 0.08), 0 2px 8px rgba(31, 31, 28, 0.04)",
        lg:   "0 16px 48px rgba(31, 31, 28, 0.10), 0 4px 16px rgba(31, 31, 28, 0.06)",
        xl:   "0 24px 64px rgba(31, 31, 28, 0.12), 0 8px 24px rgba(31, 31, 28, 0.08)",
        floating: "0 12px 40px rgba(90, 138, 106, 0.12), 0 4px 12px rgba(90, 138, 106, 0.06)",
      },

      // ============ 动画 ============
      animation: {
        "fade-in": "fadeIn 0.5s ease-out both",
        "fade-in-up": "fadeInUp 0.6s ease-out both",
        "slide-up": "slideUp 0.4s ease-out both",
        "leaf-float": "leafFloat 4s ease-in-out infinite",
        "pulse-soft": "pulseSoft 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        leafFloat: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(2deg)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.85" },
        },
      },

      // ============ 容器最大宽度 ============
      maxWidth: {
        sm:   "640px",
        md:   "768px",
        lg:   "1024px",
        xl:   "1200px",
        "2xl": "1400px",
        "3xl": "1600px",
      },

      // ============ 字号体系 ============
      fontSize: {
        xs:   ["0.75rem", { lineHeight: "1.5" }],
        sm:   ["0.875rem", { lineHeight: "1.5" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg:   ["1.125rem", { lineHeight: "1.6" }],
        xl:   ["1.25rem", { lineHeight: "1.5" }],
        "2xl": ["1.5rem", { lineHeight: "1.4" }],
        "3xl": ["1.875rem", { lineHeight: "1.3" }],
        "4xl": ["2.25rem", { lineHeight: "1.2" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
        "6xl": ["3.75rem", { lineHeight: "1.05" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
      },

      // ============ 字重 ============
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },

      // ============ 行高 ============
      lineHeight: {
        tight: "1.25",
        snug:  "1.375",
        normal:"1.5",
        relaxed: "1.625",
        loose: "2",
      },
    },
  },
  plugins: [],
};

export default config;