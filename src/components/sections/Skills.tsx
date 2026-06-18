'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportConfig } from '@/lib/animations';
import { skills, skillCategories, otherSkills } from '@/lib/data';
import { IconType } from 'react-icons';
import { Zap } from 'lucide-react';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
  exit: { opacity: 0, scale: 0.85, transition: { duration: 0.2 } },
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<string>('Languages');
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section">
      <div className="container">

        {/* Header */}
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <h2>
            <Zap className="section-header-icon" size={24} style={{ color: 'var(--accent)' }} />
            Skills
          </h2>
        </motion.div>

        {/* Tabs */}
        <motion.div
          className="skills-tabs"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {skillCategories.map((category) => (
            <button
              key={category}
              className={`skill-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Icon Grid */}
        <div className="skills-icon-grid">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="skills-icon-inner"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {filteredSkills.map((skill, i) => {
                const Icon: IconType = skill.icon;
                const isHovered = hoveredSkill === skill.name;

                return (
                  <motion.div
                    key={skill.name}
                    className="skill-icon-card"
                    custom={i}
                    variants={cardVariants}
                    whileHover={{ y: -8, scale: 1.1 }}
                    whileTap={{ scale: 0.93 }}
                    onHoverStart={() => setHoveredSkill(skill.name)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                  >
                    {/* Glow ring on hover */}
                    <motion.div
                      className="skill-icon-glow"
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.2 }}
                    />

                    <motion.div
                      className="skill-icon-wrapper"
                      animate={{
                        color: isHovered ? 'var(--accent)' : 'var(--text-muted)',
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      <Icon size={34} />
                    </motion.div>

                    <motion.span
                      className="skill-icon-label"
                      animate={{
                        opacity: isHovered ? 1 : 0.55,
                        color: isHovered ? 'var(--text-primary)' : 'var(--text-muted)',
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {skill.name}
                    </motion.span>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Other Skills */}
        <motion.div
          className="other-skills"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <h3 className="other-skills-title">Other Skills</h3>
          <div className="other-skills-tags">
            {otherSkills.map((skill) => (
              <motion.span
                key={skill}
                className="tag"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}