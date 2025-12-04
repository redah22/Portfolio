import React, { useState } from 'react';
import './TerminalLoader.css';
import TextType from './TextType';

const TerminalLoader = ({ onComplete }) => {
  const [visibleLineCount, setVisibleLineCount] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  
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

  const handleLineComplete = () => {
    // Passer à la ligne suivante immédiatement pour accélérer
    const nextIndex = visibleLineCount + 1;
    
    if (nextIndex < textLines.length) {
       setVisibleLineCount(nextIndex);
    } else {
      // Tout est fini
      setTimeout(() => setShowButtons(true), 200); // Délai court avant les boutons
    }
  };

  return (
    <div className="terminal-loader">
      <div className="terminal-content">
        {textLines.map((line, index) => {
           // On n'affiche la ligne que si on est arrivé à son tour
           if (index > visibleLineCount) return null;

           return (
             <div key={index} className="terminal-line">
               <TextType 
                 text={line === "" ? " " : line}
                 typingSpeed={5} // Beaucoup plus rapide (était 15)
                 startOnVisible={true}
                 loop={false}
                 showCursor={index === visibleLineCount && !showButtons}
                 onTypingDone={() => {
                   if (index === visibleLineCount) {
                      handleLineComplete();
                   }
                 }}
               />
             </div>
           );
        })}
        
        {showButtons && (
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
