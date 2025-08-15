import type { Metadata } from "next";
import "./globals.css";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["200", "400", "700"],
});

export const metadata: Metadata = {
  title: "Ivi's paycheck",
  description: "A simple paycheck calculator for Ivi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${oswald.variable} antialiased`} style={{ zoom: 0.75 }}>
        {children}
      </body>
    </html>
  );
}
