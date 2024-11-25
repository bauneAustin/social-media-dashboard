import type { Metadata } from "next";
import localFont from "next/font/local";
import { inter } from '@/app/ui/fonts';
import "./globals.css";

export const metadata: Metadata = {
  title: "Media Dashboard",
  description: "Social Media Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased h-full`}
      >
        {children}
      </body>
    </html>
  );
}
