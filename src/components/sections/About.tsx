'use client';

import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, viewportConfig } from '@/lib/animations';
import { User, GraduationCap, Cpu, GitBranch } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <h2>
            <User className="section-header-icon" size={24} style={{ color: 'var(--accent)' }} />
            About Me
          </h2>
        </motion.div>

        <motion.div
          className="about-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.div className="about-text" variants={fadeInLeft}>
            <p className="about-bio">
              I&apos;m a passionate developer who loves building intelligent systems and beautiful user experiences.
              My journey in tech is driven by curiosity, problem-solving and the desire to create impact through code.
            </p>

            <ul className="about-highlights">
              <li className="about-highlight">
                <GraduationCap className="about-highlight-icon" size={20} />
                <span>B.Tech in Computer Science</span>
              </li>
              <li className="about-highlight">
                <Cpu className="about-highlight-icon" size={20} />
                <span>Focused on AI, Full Stack & System Design</span>
              </li>
              <li className="about-highlight">
                <GitBranch className="about-highlight-icon" size={20} />
                <span>Love open source & developer tools</span>
              </li>
            </ul>
          </motion.div>

          <motion.div className="about-right" variants={fadeInRight}>
            <div className="about-avatar-wrapper">
              <img
                src="/avatar.jpg"
                alt="Radhika Chauhan"
              />
            </div>

            <div className="about-learning">
              <div className="about-learning-header">
                <span className="about-learning-dot" />
                <span className="about-learning-title">Currently Learning</span>
              </div>
              <ul className="about-learning-list">
                <li className="about-learning-item">Agentic AI</li>
                <li className="about-learning-item">System Design</li>
                <li className="about-learning-item">DevOps & Cloud Architecture</li>
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
