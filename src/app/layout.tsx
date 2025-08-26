import type { Metadata } from "next";
import Link from "next/link";
import Providers from "../components/Providers";
import MobileCartBar from "../components/MobileCartBar";
import { draftMode } from 'next/headers';
import { VisualEditing } from 'next-sanity';
import { fetchSanityDocument } from '../../lib/sanity-server';
import { globalQuery } from '../../lib/sanity-queries';
import { urlFor } from '@/sanity/lib/image';
import { BackgroundSlideshow } from '../components/BackgroundSlideshow';
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: draftEnabled } = await draftMode();

  const { data: globalSettings } = await fetchSanityDocument<any>(globalQuery);
  const imagesArr = (globalSettings?.backgroundImages ?? []) as any[];
  const images = imagesArr.map((img) => ({
    src: urlFor(img).quality(100).url(),
    alt: img.alt ?? ''
  }));

  return (
    <html lang="en" className={`${aeonikPro.variable} ${aeonikMono.variable}`}>
      <body className="min-h-screen bg-black text-white">
        {/* Background slideshow behind all content */}
        {images.length > 0 && <BackgroundSlideshow images={images} />}
        {/* Global providers */}
        <Providers>
        <main>
          {children}
        </main>
        <MobileCartBar />
        </Providers>
        {draftEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
