import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "수산물 지식 베이스",
  description: "Species reports viewer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <Link href="/" className="text-xl font-bold text-gray-900">
              수산물 지식 베이스
            </Link>
            <span className="ml-3 text-sm text-gray-500">Species Reports</span>
          </div>
          <Link
            href="/about"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            프로젝트 소개
          </Link>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
