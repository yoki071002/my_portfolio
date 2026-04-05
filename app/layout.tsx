import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import NavigationFrame from "@/components/NavigationFrame";

export const metadata: Metadata = {
  title: "YUTONG QIN | Digital Archive",
  description: "CS / Applied Math / Archaeology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-xuan text-xuanblack antialiased">
        <NavigationFrame>
          {children}
        </NavigationFrame>
      </body>
    </html>
  );
}