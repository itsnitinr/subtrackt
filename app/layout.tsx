import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ThemeProvider } from '@/components/theme-provider';

import './globals.css';
import { SettingsMenu } from '@/components/settings-menu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Subscriptions Tracker',
  description: 'Simple and elegant subscription tracker',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-background`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="h-full max-w-screen-sm mx-auto px-4">
            {children}
            <div className="absolute right-4 bottom-4">
              <SettingsMenu />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
