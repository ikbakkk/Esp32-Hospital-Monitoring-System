import './globals.css';
import { Inter } from 'next/font/google';

import Header from '@/components/Header';
import QueryProvider from '@/components/QueryProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <title>Room Monitor</title>
      </head>
      <body className={inter.className}>
        <Header />
        <main className='md:h-[80vh]'>
          <QueryProvider>{children}</QueryProvider>
        </main>
      </body>
    </html>
  );
}
