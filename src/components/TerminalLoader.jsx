import React, { useState, useEffect, useRef } from 'react';
import './TerminalLoader.css';

const TerminalLoader = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [showButton, setShowButton] = useState(false);
  
  // Configuration des lignes à afficher
  const textLines = [
    "┌──────────────────────────────────────────┐",
    "│       REDA AMMARI  -  PORTFOLIO OS       │",
    "│           SYSTEM VERSION 2.5.0           │",
    "└──────────────────────────────────────────┘",
    "",
    "> INITIALIZING KERNEL...",
    "> MOUNTING DATA VOLUMES...",
    "> [SUCCESS] /home/reda/datasets MOUNTED",
    "> CHECKING SYSTEM INTEGRITY...",
    "> LOAD MOD: PYTHON_CORE.........[OK]",
    "> LOAD MOD: TENSORFLOW_BACKEND..[OK]",
    "> LOAD MOD: PYTORCH_GPU.........[OK]",
    "",
    "> INITIALIZING NEURAL NETWORKS...",
    "> TRAINING MODELS...",
    "> DOWNLOADING SKILLS DATABASE...",
    "  - PYTHON      [██████████] 100%",
    "  - ML / DL     [██████████] 100%",
    "  - DATA ENG.   [██████████] 100%",
    "",
    "> OPTIMIZING HYPERPARAMETERS...",
    "> VALIDATING MODEL ACCURACY...",
    "> USER PROFILE DETECTED",
    "> ACCESS PERMISSION: GRANTED",
    "",
    "> READY TO LAUNCH."
  ];

  useEffect(() => {
    let currentLineIndex = 0;
    let timer;

    const addLine = () => {
      if (currentLineIndex < textLines.length) {
        setLines((prev) => [...prev, textLines[currentLineIndex]]);
        
        // Temps aléatoire entre chaque ligne pour faire plus "vrai"
        const randomDelay = Math.random() * 400 + 100; 
        
        currentLineIndex++;
        timer = setTimeout(addLine, randomDelay);
      } else {
        // Fin de l'écriture
        setTimeout(() => setShowButton(true), 500);
      }
    };

    // Démarrage après un petit délai
    timer = setTimeout(addLine, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="terminal-loader">
      <div className="terminal-content">
        {lines.map((line, index) => (
          <div key={index} className="terminal-line">
            {line}
          </div>
        ))}
        {/* Le curseur clignotant est toujours à la fin de la dernière ligne ou sur une nouvelle ligne */}
        {!showButton && <span className="terminal-cursor"></span>}
        
        {showButton && (
          <div className="access-button-container">
            <button className="access-btn" onClick={() => onComplete('en')}>
              [ EN ] ENGLISH
            </button>
            <button className="access-btn" onClick={() => onComplete('fr')}>
              [ FR ] FRANÇAIS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TerminalLoader;
