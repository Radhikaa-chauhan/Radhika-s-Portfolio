'use client';

import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '@/lib/animations';
import Terminal from '@/components/ui/Terminal';
import MagneticButton from '@/components/ui/MagneticButton';
import TypeWriter from '@/components/ui/TypeWriter';
import { ArrowRight, Mail } from 'lucide-react';
import { Github, Linkedin, Twitter } from '@/components/ui/BrandIcons';

export default function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="container">
        <motion.div
          className="hero-inner"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-content" variants={fadeInLeft}>
            <motion.p className="hero-greeting" variants={fadeInUp}>
              Hi, I&apos;m
            </motion.p>
 
            <motion.h1 className="hero-name" variants={fadeInUp}>
              Radhika <span className="accent">/&gt;</span>
            </motion.h1>
 
            <motion.div variants={fadeInUp}>
              <TypeWriter
                texts={[
                  'Full Stack Developer & AI Enthusiast',
                  'Building AI-Powered Applications',
                  'Open Source Contributor',
                ]}
                speed={60}
                deleteSpeed={30}
                pauseTime={2500}
                className="hero-title"
              />
            </motion.div>
 
            <motion.p className="hero-bio" variants={fadeInUp}>
              I build scalable web applications and intelligent AI agents that solve real world problems.
            </motion.p>
 
            <motion.div className="hero-cta" variants={fadeInUp}>
              <MagneticButton
                href="#projects"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('trigger-pixel-transition', { detail: '#projects' }));
                }}
              >
                View My Work
                <ArrowRight size={14} />
              </MagneticButton>
 
              <MagneticButton
                href="#contact"
                className="btn btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('trigger-pixel-transition', { detail: '#contact' }));
                }}
              >
                Contact Me
              </MagneticButton>
            </motion.div>
 
            <motion.div className="hero-socials" variants={fadeInUp}>
              <span className="hero-socials-label">Connect with me</span>
              {[
                { name: 'GitHub', url: 'https://github.com/radhikaa-chauhan', icon: Github },
                { name: 'LinkedIn', url: 'https://www.linkedin.com/in/full-stack-radhikachauhan/', icon: Linkedin },
                { name: 'Twitter', url: 'https://x.com/Radhikacha05', icon: Twitter },
                { name: 'Email', url: 'mailto:radhikachauhanrc1980@gmail.com', icon: Mail },
              ].map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-social-link"
                    title={social.name}
                  >
                    <IconComponent size={18} />
                  </a>
                );
              })}
            </motion.div>
          </motion.div>

          <motion.div className="hero-terminal" variants={fadeInRight}>
            <Terminal />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
