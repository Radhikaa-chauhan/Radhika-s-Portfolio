'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { navItems } from '@/lib/data';
import { FileDown, Menu, X } from 'lucide-react';
import { Github } from '@/components/ui/BrandIcons';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    // Intersection observer for active section highlighting
    const observerOptions = {
      rootMargin: '-20% 0px -80% 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    navItems.forEach((item) => {
      const sectionId = item.href.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) observer.observe(element);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    window.dispatchEvent(new CustomEvent('trigger-pixel-transition', { detail: href }));
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="navbar-inner">
        <a href="#hero" className="navbar-logo" onClick={(e) => { e.preventDefault(); handleNavClick('#hero'); }}>
          <Github size={20} />
          <span>Radhika</span>
          <span style={{ color: 'var(--accent)', fontSize: '0.7rem' }}>●</span>
        </a>

        <ul className={`navbar-links ${mobileOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <li key={item.href}>
              <button
                className={`navbar-link ${activeSection === item.href.replace('#', '') ? 'active' : ''}`}
                onClick={() => handleNavClick(item.href)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <a
            href="/resume.pdf"
            className="navbar-cv-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FileDown size={14} />
            Download CV
          </a>

          <button
            className="navbar-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
