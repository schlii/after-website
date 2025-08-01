import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "After - Official Band Website",
  description: "The official website of After - Music, Tour Dates, Merch, and More",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-sm">
          <nav className="max-w-7xl mx-auto px-4 py-4">
            <ul className="flex items-center justify-center space-x-8">
              <li>
                <Link href="/" className="text-xl hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/music" className="text-xl hover:text-purple-400 transition-colors">
                  Music
                </Link>
              </li>
              <li>
                <Link href="/tour" className="text-xl hover:text-purple-400 transition-colors">
                  Tour
                </Link>
              </li>
              <li>
                <Link href="/merch" className="text-xl hover:text-purple-400 transition-colors">
                  Merch
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-xl hover:text-purple-400 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-xl hover:text-purple-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="pt-20">
          {children}
        </main>
        <footer className="bg-black/80 backdrop-blur-sm py-8 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-400">© {new Date().getFullYear()} After. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
