import { Lilita_One, Nunito } from 'next/font/google';
import './globals.css';

const lilitaOne = Lilita_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lilita',
});

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['800', '900'],
  variable: '--font-nunito',
});

export const metadata = {
  title: 'My Storybooks',
  description: 'Digital storybooks for kids',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt" className={`${lilitaOne.variable} ${nunito.variable}`}>
      <body>{children}</body>
    </html>
  );
}
