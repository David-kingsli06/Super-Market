import type { Metadata } from "next";
import "./compiled.css";

export const metadata: Metadata = {
  title: "PROVENCE MARKET | Cinematic Supermarket Journey",
  description: "An immersive, cinematic supermarket journey through fresh produce, world beverages, family aisles, and seamless checkout.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#0b0d0c] text-[#f4f4f0] selection:bg-emerald-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}

