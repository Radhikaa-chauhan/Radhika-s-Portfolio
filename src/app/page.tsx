'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import OpenSource from '@/components/sections/OpenSource';

import Contact from '@/components/sections/Contact';
import PixelTransition from '@/components/ui/PixelTransition';

// Lazy load cursor since it's a non-critical visual enhancement
const CustomCursor = dynamic(() => import('@/components/layout/CustomCursor'), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <CustomCursor />
      <PixelTransition />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <OpenSource />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
