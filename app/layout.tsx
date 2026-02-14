import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { SettingsProvider } from '@/components/layout/SettingsContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap' });

export const metadata: Metadata = {
  title: 'Gold Silver Now - Live Market Prices',
  description: 'Track live Gold (XAU) and Silver (XAG) prices in INR, USD, and EUR. Get real-time charts and market updates.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`} suppressHydrationWarning={true} >
        <SettingsProvider>
          {children}
        </SettingsProvider>
      </body>
    </html>
  );
}
