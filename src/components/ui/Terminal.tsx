'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { asciiArt } from '@/lib/data';

export default function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [showAscii, setShowAscii] = useState(false);

  const terminalLines = [
    { text: '$ Radhika.exe --init', isCommand: true, delay: 0 },
    { text: '', isCommand: false, delay: 400 },
    { text: 'Initializing developer profile...', isCommand: false, delay: 800 },
    { text: 'Loading skills, projects & experience...', isCommand: false, delay: 1400 },
    { text: '', isCommand: false, delay: 2000 },
    { text: 'System ready! 🚀', isCommand: false, delay: 2400 },
  ];

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    terminalLines.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, terminalLines[index].text]);
        if (index === terminalLines.length - 1) {
          setTimeout(() => setShowAscii(true), 500);
        }
      }, line.delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      className="terminal"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="terminal-dot red" />
          <span className="terminal-dot yellow" />
          <span className="terminal-dot green" />
        </div>
        <span className="terminal-title">radhika@dev ~ /portfolio</span>
        <div style={{ width: 52 }} />
      </div>

      <div className="terminal-body">
        {showAscii && (
          <motion.pre
            className="terminal-ascii"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            {asciiArt}
          </motion.pre>
        )}

        {lines.map((line, i) => (
          <motion.div
            key={i}
            className={`terminal-line ${i === 0 ? 'command' : ''}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {line}
          </motion.div>
        ))}

        {lines.length < terminalLines.length && (
          <span className="terminal-cursor" />
        )}
      </div>
    </motion.div>
  );
}
