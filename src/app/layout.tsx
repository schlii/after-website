import type { Metadata } from "next";
import Link from "next/link";
import Providers from "../components/Providers";
import CartToggleButton from "../components/CartToggleButton";
import CartSidebar from "../components/CartSidebar";
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity';
import "./globals.css";
import localFont from 'next/font/local';

export const metadata: Metadata = {
  title: "After - Official Band Website",
  description: "The official website of After - Music, Tour Dates, Merch, and More",
};

const aeonikPro = localFont({
  src: [
    {
      path: '../../public/Aeonik Pro/AeonikPro-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/Aeonik Pro/AeonikPro-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-aeonik-pro',
  display: 'swap',
});

const aeonikMono = localFont({
  src: [
    {
      path: '../../public/Aeonik Mono/AeonikMono-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/Aeonik Mono/AeonikMono-Medium.otf',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-aeonik-mono',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${aeonikPro.variable} ${aeonikMono.variable}`}>
      <body className="min-h-screen bg-black text-white">
        {/* Global providers */}
        <Providers>
        <CartSidebar />
        <main>
          {children}
        </main>
        <footer className="bg-black/80 backdrop-blur-sm py-8 mt-10">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} After. All rights reserved.</p>
          </div>
        </footer>
        </Providers>
        {(draftMode() as any).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
