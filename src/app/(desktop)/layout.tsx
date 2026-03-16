import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./../globals.css"
import { cn } from "@/lib/utils";
import NavigationBar from "@/components/common/main/NavigationBar";
import Dock from "@/components/common/main/Dock";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "We Learn",
  description: "Productivity Web App - Where Learning Meets Productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <NavigationBar />
        {children}
        <Dock />
      </body>
    </html>
  );
}
