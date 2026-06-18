import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Radhika Chauhan — Full Stack Developer & AI Enthusiast',
  description:
    'Portfolio of Radhika Chauhan — a full stack developer building scalable web applications and intelligent AI agents. Skilled in React, Next.js, Python, LangChain, and more.',
  keywords: [
    'Radhika Chauhan',
    'Full Stack Developer',
    'AI Engineer',
    'React',
    'Next.js',
    'Python',
    'LangChain',
    'Portfolio',
  ],
  authors: [{ name: 'Radhika Chauhan' }],
  openGraph: {
    title: 'Radhika Chauhan — Full Stack Developer & AI Enthusiast',
    description:
      'Building scalable web applications and intelligent AI agents.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Radhika Chauhan — Full Stack Developer & AI Enthusiast',
    description:
      'Building scalable web applications and intelligent AI agents.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
