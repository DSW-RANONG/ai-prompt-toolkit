import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Prompt Toolkit | AI เพื่อครูยุคใหม่",
  description:
    "คลัง Prompt และเครื่องมือ AI สำหรับครู เพื่อสร้างสื่อ แผนการสอน ข้อสอบ ใบงาน และกิจกรรมการเรียนรู้",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={notoSansThai.variable}>
      <body>{children}</body>
    </html>
  );
}