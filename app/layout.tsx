import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'AgriRentX - Premium Agriculture Equipment Rental',
  description: 'India\'s leading agriculture equipment rental service. Jai Jawan, Jai Kisan, Jai Vigyan.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased bg-slate-50 text-slate-900 selection:bg-green-500 selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
