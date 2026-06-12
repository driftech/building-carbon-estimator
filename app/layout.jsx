import "./globals.css";

export const metadata = {
  title: "\u5efa\u7b51\u78b3\u6392\u653e\u5feb\u901f\u4f30\u7b97\u5668",
  description:
    "\u7528\u4e8e\u5efa\u7b51\u65b9\u6848\u9636\u6bb5\u7684\u78b3\u6392\u653e\u521d\u6b65\u6d4b\u7b97\u4e0e\u7ed3\u679c\u53ef\u89c6\u5316",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
