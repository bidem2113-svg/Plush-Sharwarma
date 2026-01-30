import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Plush Chicken Shawarma | Deconstructed",
  description: "Experience the inner layers of craftsmanship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#050505]">
      <body className={`${inter.variable} font-sans antialiased bg-[#050505] text-white overflow-x-hidden`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
