import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pro Master Construction Products | UAE & GCC",
  description:
    "Premium construction chemicals — waterproofing, tile adhesives, concrete repair, coatings and sealants. Distributed across the UAE and GCC.",
  icons: {
    icon: "/logo-white.jpg",
    shortcut: "/logo-white.jpg",
    apple: "/logo-white.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>{children}</body>
    </html>
  );
}
