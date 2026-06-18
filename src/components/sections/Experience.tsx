'use client';

import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, slideInLeft, viewportConfig } from '@/lib/animations';
import { experiences } from '@/lib/data';
import { Briefcase, GraduationCap, Globe, Building2 } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <h2>
            <Briefcase className="section-header-icon" size={24} style={{ color: 'var(--accent)' }} />
            Experience
          </h2>
        </motion.div>

        <motion.div
          className="experience-timeline"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              className="experience-item"
              variants={slideInLeft}
            >
              <div className="experience-dot" />
              <div className="experience-card">
                <div className="experience-card-header">
                  <h3 className="experience-role">{exp.role}</h3>
                  <span className="experience-date">{exp.dateRange}</span>
                </div>
                <p className="experience-company" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {exp.type === 'education' ? (
                    <GraduationCap size={16} style={{ color: 'var(--accent)' }} />
                  ) : exp.type === 'freelance' ? (
                    <Globe size={16} style={{ color: 'var(--accent)' }} />
                  ) : (
                    <Building2 size={16} style={{ color: 'var(--accent)' }} />
                  )}
                  {exp.company}
                </p>
                <p className="experience-desc">{exp.description}</p>
                <div className="experience-tech">
                  {exp.techStack.map((tech) => (
                    <span key={tech} className="tag">{tech}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
