import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodMine Dashboard",
  description: "Landing, login et dashboard sécurisé",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">{children}</main>
          <footer className="w-full grid grid-cols-3 h-2 text-xs border-t backdrop-blur">
            <div className="flex items-center justify-center bg-[#2EAAE2] text-white"></div>
            <div className="flex items-center justify-center bg-[#FEF200] text-white"></div>
            <div className="flex items-center justify-center bg-[#D02335] text-white"></div>
          </footer>
        </div>
      </body>
    </html>
  );
}
