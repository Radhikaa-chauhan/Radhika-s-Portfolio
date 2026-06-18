'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Check for touch device
    if ('ontouchstart' in window) {
      cursor.style.display = 'none';
      return;
    }

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => {
      cursor.classList.add('hovering');
    };

    const handleMouseLeave = () => {
      cursor.classList.remove('hovering');
    };

    window.addEventListener('mousemove', moveCursor);

    // Add hover effect for interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .project-card, .tech-item, .skill-tab, .glass-card, input, textarea'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    // Observe DOM changes for dynamically added interactive elements
    const observer = new MutationObserver(() => {
      const newElements = document.querySelectorAll(
        'a, button, .project-card, .tech-item, .skill-tab, .glass-card, input, textarea'
      );
      newElements.forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      observer.disconnect();
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" />;
}
