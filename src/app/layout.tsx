
// src/app/layout.jsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Providers from '@/components/providers';
import { fetchProfile } from '../lib/userService';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HeyRoute - Your Travel Companion',
  description: 'Discover, review, and plan your next adventure with HeyRoute.',
  icons: { icon: '/favicon.ico' },
};

import type { ReactNode } from 'react';

export default async function RootLayout({ children }: { children: ReactNode }) {
  let user = null;
  try {
    user = await fetchProfile();
  } catch {
    user = null;
  }
  console.log(user);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased flex flex-col',
          geistSans.variable,
          geistMono.variable
        )}
      >
        <Providers initialUser={user}>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
