import { Noto_Sans_KR } from "next/font/google";
import "@/styles/globals.css";

const noto_sans_kr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata = {
  title: "최애의 포토",
  description: "개인용 디지털 사진첩 생성 플랫폼",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className={`${noto_sans_kr.variable} antialiased`}>{children}</body>
    </html>
  );
}
