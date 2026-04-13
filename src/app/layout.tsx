import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CustomCursor, SmoothScroll } from "@/components/effects";
import { CookieBanner } from "@/components/cookie-banner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EUGVRP - Europa Greenville Roleplay Community",
  description:
    "Server de roleplay Roblox Greenville. Alătură-te comunității noastre și trăiește experiența roleplay-ului autentic!",
  keywords: [
    "Roblox",
    "Greenville",
    "Roleplay",
    "EUGVRP",
    "Europa Greenville Roleplay Community",
    "Romania",
  ],
  openGraph: {
    title: "EUGVRP - Europa Greenville Roleplay Community",
    description: "Server de roleplay Roblox Greenville Romania",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gradient-to-br from-purple-900 via-blue-900 to-black cursor-none md:cursor-auto">
        <CustomCursor />
        <SmoothScroll />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
