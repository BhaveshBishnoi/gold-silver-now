import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import ThemeRegistry from '@/theme/ThemeRegistry';
import { SettingsProvider } from '@/context/SettingsContext';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

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
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={`${inter.variable} ${outfit.variable}`}>
        <ThemeRegistry>
          <SettingsProvider>
            <Nav />
            <main style={{ minHeight: '80vh', paddingBottom: '2rem' }}>
              {children}
            </main>
            <Footer />
          </SettingsProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
