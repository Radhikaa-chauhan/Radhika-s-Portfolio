'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem, viewportConfig } from '@/lib/animations';
import { githubStats, months, generateHeatmapData } from '@/lib/data';
import gsap from 'gsap';
import { Github } from '@/components/ui/BrandIcons';

function CountUp({ target, duration = 2 }: { target: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          const obj = { value: 0 };
          gsap.to(obj, {
            value: target,
            duration,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = Math.round(obj.value).toString();
            },
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return <span ref={ref}>0</span>;
}

export default function OpenSource() {
  const heatmapData = useMemo(() => generateHeatmapData(), []);

  const stats = [
    { value: githubStats.repositories, label: 'Repositories' },
    { value: githubStats.contributions, label: 'Contributions' },
    { value: githubStats.pullRequests, label: 'Pull Requests' },
    { value: githubStats.issues, label: 'Issues' },
  ];

  return (
    <section id="opensource" className="section">
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <h2>
            <Github className="section-header-icon" size={24} style={{ color: 'var(--accent)' }} />
            GitHub Stats
          </h2>
        </motion.div>

        <motion.div
          className="github-section"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          {/* Profile Card */}
          <motion.div className="github-profile-card" variants={staggerItem}>
            <div
              className="github-avatar"
              style={{
                background: 'linear-gradient(135deg, var(--accent-dim), var(--accent))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
              }}
            >
              👩‍💻
            </div>
            <div className="github-info">
              <h3>{githubStats.displayName}</h3>
              <p className="github-username">@{githubStats.username}</p>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div className="github-stats-grid" variants={staggerItem}>
            {stats.map((stat) => (
              <div key={stat.label} className="github-stat-card">
                <div className="github-stat-number">
                  <CountUp target={stat.value} />
                </div>
                <p className="github-stat-label">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          {/* Heatmap */}
          <motion.div className="heatmap-container" variants={staggerItem}>
            <div className="heatmap-header">
              <span className="heatmap-title">Contributions in the last year</span>
            </div>

            <div className="heatmap-months">
              {months.map((month) => (
                <span key={month} className="heatmap-month-label">{month}</span>
              ))}
            </div>

            <div className="heatmap-grid">
              {heatmapData.map((week, weekIndex) => (
                <div key={weekIndex} className="heatmap-week">
                  {week.map((level, dayIndex) => (
                    <motion.div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`heatmap-cell level-${level}`}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.2,
                        delay: weekIndex * 0.01 + dayIndex * 0.005,
                      }}
                      title={`${level} contributions`}
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="heatmap-legend">
              <span className="heatmap-legend-text">Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`heatmap-cell level-${level}`}
                  style={{ cursor: 'default' }}
                />
              ))}
              <span className="heatmap-legend-text">More</span>
            </div>

            <p className="heatmap-tagline">Build. Ship. Repeat. 🚀</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
