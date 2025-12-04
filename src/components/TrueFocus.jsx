import { useEffect, useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import './TrueFocus.css';

const TrueFocus = ({
  sentence = 'True Focus',
  separator = ' ',
  manualMode = false,
  blurAmount = 5,
  borderColor = 'green',
  glowColor = 'rgba(0, 255, 0, 0.6)',
  animationDuration = 0.5,
  pauseBetweenAnimations = 1,
  highlightPhrases = [] // New prop
}) => {
  const words = sentence.split(separator);
  const [currentHighlightIndex, setCurrentHighlightIndex] = useState(0); // New state for cycling through highlightPhrases
  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  // Map highlight phrases to word indices
  const phraseWordIndexes = useMemo(() => {
    return highlightPhrases.map(phrase => {
      const phraseWords = phrase.split(separator);
      let startIndex = -1;
      // Find the start index of the phrase in the main words array
      for (let i = 0; i < words.length; i++) {
        if (words[i] === phraseWords[0]) {
          let match = true;
          for (let j = 0; j < phraseWords.length; j++) {
            if (words[i + j] !== phraseWords[j]) {
              match = false;
              break;
            }
          }
          if (match) {
            startIndex = i;
            break;
          }
        }
      }
      if (startIndex !== -1) {
        return Array.from({ length: phraseWords.length }, (_, k) => startIndex + k);
      }
      return [];
    }).filter(arr => arr.length > 0); // Filter out phrases not found
  }, [separator, highlightPhrases, words]);

  useEffect(() => {
    if (!manualMode && phraseWordIndexes.length > 0) {
      const interval = setInterval(
        () => {
          setCurrentHighlightIndex(prev => (prev + 1) % phraseWordIndexes.length);
        },
        (animationDuration + pauseBetweenAnimations) * 1000
      );
      return () => clearInterval(interval);
    }
  }, [manualMode, animationDuration, pauseBetweenAnimations, phraseWordIndexes.length]);

  useEffect(() => {
    if (currentHighlightIndex === null || currentHighlightIndex === -1 || phraseWordIndexes.length === 0) return;

    const activeWordIndices = phraseWordIndexes[currentHighlightIndex];
    if (activeWordIndices.length === 0 || !containerRef.current) return;

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

    activeWordIndices.forEach(wordIndex => {
      const wordEl = wordRefs.current[wordIndex];
      if (wordEl) {
        const rect = wordEl.getBoundingClientRect();
        minX = Math.min(minX, rect.left);
        minY = Math.min(minY, rect.top);
        maxX = Math.max(maxX, rect.right);
        maxY = Math.max(maxY, rect.bottom);
      }
    });

    if (minX === Infinity) return; // No active words found

    const parentRect = containerRef.current.getBoundingClientRect();
    setFocusRect({
      x: minX - parentRect.left,
      y: minY - parentRect.top,
      width: maxX - minX,
      height: maxY - minY
    });
  }, [currentHighlightIndex, phraseWordIndexes, manualMode]);

  const handleMouseEnter = () => {
    // Manual mode logic might need adjustment if still desired with phrase highlighting
    // For now, disabling manual mode related functions
  };

  const handleMouseLeave = () => {
    // Manual mode logic might need adjustment if still desired with phrase highlighting
  };

  return (
    <div className="focus-container" ref={containerRef}>
      {words.map((word, index) => {
        // Check if the current word is part of the actively highlighted phrase
        const isActive = phraseWordIndexes[currentHighlightIndex]?.includes(index);
        return (
          <span
            key={index}
            ref={el => (wordRefs.current[index] = el)}
            className={`focus-word ${manualMode ? 'manual' : ''} ${isActive ? 'active' : ''}`}
            style={{
              filter: isActive ? `blur(0px)` : `blur(${blurAmount}px)`,
              '--border-color': borderColor,
              '--glow-color': glowColor,
              transition: `filter ${animationDuration}s ease`
            }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {word}
          </span>
        );
      })}

      <motion.div
        className="focus-frame"
        animate={{
          x: focusRect.x,
          y: focusRect.y,
          width: focusRect.width,
          height: focusRect.height,
          opacity: currentHighlightIndex >= 0 && phraseWordIndexes.length > 0 ? 1 : 0 // Ensure opacity only if there's a phrase to highlight
        }}
        transition={{
          duration: animationDuration
        }}
        style={{
          '--border-color': borderColor,
          '--glow-color': glowColor
        }}
      >
        <span className="corner top-left"></span>
        <span className="corner top-right"></span>
        <span className="corner bottom-left"></span>
        <span className="corner bottom-right"></span>
      </motion.div>
    </div>
  );
};

export default TrueFocus;