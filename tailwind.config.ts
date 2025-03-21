import type { Config } from "tailwindcss";

const config = {
 theme: {
   extend: {
     colors: {
      foreground: "hsla(var(--foreground))",
      background: "hsla(var(--background))",
      border: "hsla(var(--border))",
     },
     boxShadow: {
      'right-bottom-white': '2px 2px 4px rgba(0, 0, 0, 0.1)', // 薄い黒の影
      'md-right-bottom-white': '4px 4px 8px rgba(0, 0, 0, 0.15)', // 少し濃いめの影
      'gray-right-bottom-white': '2px 2px 4px rgba(100, 100, 100, 0.15)', // 灰色の影
      'md-gray-right-bottom-white': '4px 4px 8px rgba(0, 240, 240, 0.2)', // 少し濃いめの灰色の影
    },
   },
 },
} satisfies Config;

export default config;