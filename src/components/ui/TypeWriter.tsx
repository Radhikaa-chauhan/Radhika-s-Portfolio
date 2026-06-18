'use client';

import { useState, useEffect, useCallback } from 'react';

interface TypeWriterProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseTime?: number;
  loop?: boolean;
  onComplete?: () => void;
  className?: string;
}

export default function TypeWriter({
  texts,
  speed = 50,
  deleteSpeed = 30,
  pauseTime = 2000,
  loop = true,
  onComplete,
  className = '',
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentText = texts[textIndex];

    if (!isDeleting) {
      // Typing
      if (charIndex < currentText.length) {
        setDisplayText(currentText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      } else {
        // Finished typing
        if (textIndex === texts.length - 1 && !loop) {
          onComplete?.();
          return;
        }
        setTimeout(() => setIsDeleting(true), pauseTime);
      }
    } else {
      // Deleting
      if (charIndex > 0) {
        setDisplayText(currentText.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }
  }, [charIndex, isDeleting, textIndex, texts, loop, pauseTime, onComplete]);

  useEffect(() => {
    const timeout = setTimeout(tick, isDeleting ? deleteSpeed : speed);
    return () => clearTimeout(timeout);
  }, [tick, isDeleting, deleteSpeed, speed]);

  return (
    <span className={className}>
      {displayText}
      <span className="terminal-cursor" />
    </span>
  );
}
