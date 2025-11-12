import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Load custom Dracutaz font
const dracutaz = localFont({
  src: "../public/fonts/Dracutaz.ttf",
  variable: "--font-dracutaz",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vampire Dating Bio Generator",
  description: "Generate your perfect vampire dating bio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dracutaz.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}