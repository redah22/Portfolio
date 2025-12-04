import { useState } from 'react';
import './App.css';
import DarkVeil from './components/DarkVeil';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Dock from './components/Dock';
import TerminalLoader from './components/TerminalLoader';
import { VscHome, VscCode, VscTools } from 'react-icons/vsc';
import { FaGithub, FaEnvelope } from 'react-icons/fa';

function App() {
  const [showTerminal, setShowTerminal] = useState(true);
  const [language, setLanguage] = useState('en'); // Par défaut

  const handleTerminalComplete = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setShowTerminal(false);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => scrollToSection('hero') },
    { icon: <VscCode size={18} />, label: 'Projects', onClick: () => scrollToSection('projects') },
    { icon: <VscTools size={18} />, label: 'Skills', onClick: () => scrollToSection('skills') },
    { icon: <FaEnvelope size={18} />, label: 'Contact', onClick: () => scrollToSection('contact') },
    { icon: <FaGithub size={18} />, label: 'GitHub', onClick: () => window.open('https://github.com/redah22', '_blank') },
  ];

  if (showTerminal) {
    return <TerminalLoader onComplete={handleTerminalComplete} />;
  }

  return (
    <div className="App">
      <DarkVeil />
      <main>
        <Hero language={language} />
        <Projects language={language} />
        <Skills language={language} />
        <Contact language={language} />
      </main>
      <Footer />
      <Dock 
        items={items}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
    </div>
  );
}

export default App;