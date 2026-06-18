'use client';

import { useEffect, useRef, useState } from 'react';
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
    if (!el) return;

    if (!hasAnimated) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setHasAnimated(true);
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }

    const obj = { value: parseFloat(el.textContent || '0') || 0 };
    gsap.to(obj, {
      value: target,
      duration,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = Math.round(obj.value).toString();
      },
    });
  }, [target, duration, hasAnimated]);

  return <span ref={ref}>0</span>;
}

export default function OpenSource() {
  const [statsData, setStatsData] = useState({
    username: githubStats.username,
    displayName: githubStats.displayName,
    avatarUrl: '',
    repositories: githubStats.repositories,
    contributions: githubStats.contributions,
    pullRequests: githubStats.pullRequests,
    issues: githubStats.issues,
  });

  const [heatmapData, setHeatmapData] = useState<number[][]>([]);

  useEffect(() => {
    setHeatmapData(generateHeatmapData());

    const username = githubStats.username;

    // 1. Fetch profile details (repos, name, avatar)
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
      })
      .then((data) => {
        setStatsData((prev) => ({
          ...prev,
          displayName: data.name || prev.displayName,
          repositories: data.public_repos,
          avatarUrl: data.avatar_url,
        }));
      })
      .catch((err) => console.warn('GitHub profile fetch error:', err));

    // 2. Fetch contribution graph data
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch contributions');
        return res.json();
      })
      .then((data) => {
        const rawContributions = data.contributions;
        if (!rawContributions || rawContributions.length === 0) return;

        // 1. Sort contributions chronologically (API returns newest first / per-year blocks)
        const sorted = rawContributions.sort((a: any, b: any) => a.date.localeCompare(b.date));

        // 2. Filter out future days (API returns full current calendar year including future days)
        const todayObj = new Date();
        const todayStr = todayObj.toISOString().split('T')[0];
        const pastAndPresent = sorted.filter((c: any) => c.date <= todayStr);

        // 3. Align start day of the grid to Sunday so rows represent weekdays correctly
        const dayOfWeek = todayObj.getDay(); // 0 (Sunday) to 6 (Saturday)
        const totalDaysNeeded = 51 * 7 + (dayOfWeek + 1);
        const alignedContributions = pastAndPresent.slice(-totalDaysNeeded);

        // 4. Build 52 weeks grid (each week is 7 days starting on Sunday)
        const grid: number[][] = [];
        for (let i = 0; i < 52; i++) {
          const week: number[] = [];
          for (let j = 0; j < 7; j++) {
            const index = i * 7 + j;
            if (index < alignedContributions.length) {
              week.push(alignedContributions[index].level);
            } else {
              week.push(0); // Pad future days of the current week with 0
            }
          }
          grid.push(week);
        }
        setHeatmapData(grid);

        // Sum contributions for the last year
        const total = alignedContributions.reduce((sum: number, item: any) => sum + item.count, 0);
        setStatsData((prev) => ({
          ...prev,
          contributions: total || prev.contributions,
        }));
      })
      .catch((err) => console.warn('GitHub contributions fetch error:', err));

    // 3. Fetch Pull Requests count
    fetch(`https://api.github.com/search/issues?q=author:${username}+type:pr`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch PRs');
        return res.json();
      })
      .then((data) => {
        setStatsData((prev) => ({
          ...prev,
          pullRequests: data.total_count,
        }));
      })
      .catch((err) => console.warn('GitHub PR fetch error:', err));

    // 4. Fetch Issues count
    fetch(`https://api.github.com/search/issues?q=author:${username}+type:issue`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch issues');
        return res.json();
      })
      .then((data) => {
        setStatsData((prev) => ({
          ...prev,
          issues: data.total_count,
        }));
      })
      .catch((err) => console.warn('GitHub issue fetch error:', err));
  }, []);

  const stats = [
    { value: statsData.repositories, label: 'Repositories' },
    { value: statsData.contributions, label: 'Contributions' },
    { value: statsData.pullRequests, label: 'Pull Requests' },
    { value: statsData.issues, label: 'Issues' },
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
                background: statsData.avatarUrl
                  ? `url(${statsData.avatarUrl}) no-repeat center/cover`
                  : 'linear-gradient(135deg, var(--accent-dim), var(--accent))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
              }}
            >
              {!statsData.avatarUrl && '👩‍💻'}
            </div>
            <div className="github-info">
              <h3>{statsData.displayName}</h3>
              <p className="github-username">@{statsData.username}</p>
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
