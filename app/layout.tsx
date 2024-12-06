import type { Metadata } from "next";
import { inter } from '@/app/ui/fonts';
import "./globals.css";

export const metadata: Metadata = {
  title: "Productivity Dashboard",
  description: "Productivity Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="h-auto m-0" lang="en">
      <body
        className={`${inter.className} antialiased h-auto m-0`}
      >
        {children}
      </body>
    </html>
  );
}
