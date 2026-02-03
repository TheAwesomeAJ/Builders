import type { Metadata } from "next";
import { Geist, Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/navigation/header";
import ConditionalHeader from "@/components/logic/conditional-header";

const figtree = Figtree({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hack Club Builders",
  description: "Track your contributions and get rewarded for them!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={figtree.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ConditionalHeader
          header={<Header />}
          excludedPaths={["/app*", "/admin*"]}
        >
          {children}
        </ConditionalHeader>
      </body>
    </html>
  );
}
