import type {Metadata} from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });

export const metadata: Metadata = {
  title: 'AllyFenix - Portal Oficial',
  description: 'Portal oficial da guilda AllyFenix - Mu Online',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${montserrat.variable}`}>
      <body suppressHydrationWarning className="bg-brand-dark text-white antialiased">
        {children}
      </body>
    </html>
  );
}
