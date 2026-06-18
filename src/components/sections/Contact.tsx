'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, viewportConfig } from '@/lib/animations';
import MagneticButton from '@/components/ui/MagneticButton';
import { Mail, Send } from 'lucide-react';
import { Github, Linkedin, Twitter } from '@/components/ui/BrandIcons';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <h2>
            <Mail className="section-header-icon" size={24} style={{ color: 'var(--accent)' }} />
            Contact
          </h2>
        </motion.div>

        <motion.div
          className="contact-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.div className="contact-info" variants={fadeInLeft}>
            <p className="contact-text">
              Have a project idea, want to collaborate, or just want to say hi?
              Feel free to reach out! I&apos;m always open to interesting conversations and new opportunities.
            </p>

            <div className="contact-links">
              {[
                { icon: Mail, label: 'radhikachauhanrc1980@gmail.com', url: 'mailto:radhikachauhanrc1980@gmail.com' },
                { icon: Github, label: 'github.com/radhikaa-chauhan', url: 'https://github.com/radhikaa-chauhan' },
                { icon: Linkedin, label: 'linkedin.com/in/full-stack-radhikachauhan/', url: 'https://www.linkedin.com/in/full-stack-radhikachauhan/' },
                { icon: Twitter, label: 'x.com/Radhikacha05', url: 'https://x.com/Radhikacha05' },
              ].map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-link-item"
                  >
                    <IconComponent size={18} style={{ color: 'var(--accent)' }} />
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>

          <motion.div variants={fadeInRight}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                className="contact-input"
                placeholder="Your Name"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                required
              />
              <input
                type="email"
                className="contact-input"
                placeholder="Your Email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                required
              />
              <textarea
                className="contact-textarea"
                placeholder="Your Message"
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                required
              />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    padding: '12px 24px',
                    background: 'rgba(63, 185, 80, 0.1)',
                    border: '1px solid var(--accent-dim)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--accent)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    textAlign: 'center',
                  }}
                >
                  ✅ Message sent successfully! I&apos;ll get back to you soon.
                </motion.div>
              ) : (
                <MagneticButton className="btn btn-primary" onClick={() => {}}>
                  Send Message
                  <Send size={14} />
                </MagneticButton>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
