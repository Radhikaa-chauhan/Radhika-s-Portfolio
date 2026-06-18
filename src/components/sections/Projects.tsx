'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, viewportConfig } from '@/lib/animations';
import { projects } from '@/lib/data';
import TiltCard from '@/components/ui/TiltCard';
import { FolderGit2, Folder, Star, GitFork } from 'lucide-react';

const filterCategories = ['All', 'AI / ML', 'Full Stack', 'Backend', 'Tools'];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <h2>
            <FolderGit2 className="section-header-icon" size={24} style={{ color: 'var(--accent)' }} />
             Projects
          </h2>
          <a
            href="https://github.com/radhikaa-chauhan"
            target="_blank"
            rel="noopener noreferrer"
            className="section-header-link"
          >
            View all projects →
          </a>
        </motion.div>

        <motion.div
          className="projects-filters"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {filterCategories.map((cat) => (
            <button
              key={cat}
              className={`skill-tab ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          key={activeFilter}
        >
          {filteredProjects.map((project) => (
            <motion.div key={project.id} variants={staggerItem}>
              <TiltCard>
                <div className="project-card">
                  <div className="project-card-header">
                    <span className="project-card-name">
                      <Folder size={16} style={{ color: 'var(--text-secondary)', marginRight: '6px', display: 'inline-block', verticalAlign: 'middle' }} />
                      {project.name}
                    </span>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-github-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View on GitHub ↗
                    </a>
                  </div>

                  <p className="project-card-desc">{project.description}</p>

                  <div className="project-card-footer">
                    <div className="project-card-tech">
                      {project.techStack.map((tech) => (
                        <span key={tech} className="tag">{tech}</span>
                      ))}
                    </div>

                    <div className="project-card-stats">
                
                      <span className="project-stat" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                        <GitFork size={14} style={{ color: 'var(--text-secondary)' }} />
                        {project.forks}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                    <span
                      className="project-language-dot"
                      style={{ backgroundColor: project.languageColor }}
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {project.language}
                    </span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="projects-more-cta"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <a
            href="https://github.com/radhikaa-chauhan?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            View More Projects on GitHub ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}
