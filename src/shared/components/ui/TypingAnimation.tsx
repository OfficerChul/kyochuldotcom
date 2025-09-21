import React, { useState, useEffect, useMemo } from 'react';

interface TypingAnimationProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  cursor?: boolean;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  text,
  delay = 0,
  speed = 100,
  className = '',
  onComplete,
  cursor = true
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(cursor);
  const [isTyping, setIsTyping] = useState(false);

  // Generate variable speeds for each character for more realistic typing
  const charSpeeds = useMemo(() => {
    return text.split('').map((char) => {
      // Spaces are typed faster
      if (char === ' ') return speed * 0.3;

      // Punctuation has a slight pause after
      if (['.', ',', '!', '?', ':'].includes(char)) return speed * 1.5;

      // Capital letters take slightly longer (shift key)
      if (char === char.toUpperCase() && char.match(/[A-Z]/)) return speed * 1.2;

      // Regular characters with natural variation
      const variation = 0.5 + Math.random(); // 0.5 to 1.5x speed
      return speed * variation;
    });
  }, [text, speed]);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < text.length) {
      // Use the pre-calculated speed for this character
      const charSpeed = charSpeeds[currentIndex];

      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, charSpeed);

      return () => clearTimeout(timeout);
    } else {
      if (onComplete) onComplete();
      // Hide cursor after typing is complete
      setTimeout(() => setShowCursor(false), 500);
    }
  }, [currentIndex, text, charSpeeds, isTyping, onComplete]);

  return (
    <span className={className} style={{ position: 'relative' }}>
      {displayText.split('').map((char, index) => (
        <span
          key={index}
          style={{
            opacity: 1,
            animation: 'fadeInChar 0.15s ease-in forwards',
            animationDelay: '0ms'
          }}
        >
          {char}
        </span>
      ))}
      {showCursor && (
        <span
          className="typing-cursor"
          style={{
            opacity: isTyping ? 1 : 0,
            transition: 'opacity 0.3s',
            marginLeft: '2px'
          }}
        >
          |
        </span>
      )}
    </span>
  );
};

export default TypingAnimation;