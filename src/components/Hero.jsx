import './Hero.css';
import TrueFocus from './TrueFocus';

const Hero = ({ language }) => {
  const translations = {
    en: {
      subtitle: "Master AI & Data Science • Freelance",
      focusSentence: "Data Engineer & Artificial Intelligence",
      highlightPhrases: ["Data Engineer", "Artificial Intelligence"]
    },
    fr: {
      subtitle: "Master IA & Data Science • Freelance",
      focusSentence: "Ingénieur Data & Intelligence Artificielle",
      highlightPhrases: ["Ingénieur Data", "Intelligence Artificielle"]
    }
  };

  const t = translations[language] || translations.en;

  return (
    <section
      id="hero"
      className="hero"
    >
      <div className="hero-content">
        <h2 className="hero-subtitle font-mono text-xl md:text-2xl mb-6 tracking-widest uppercase">{t.subtitle}</h2>
        <h1 className="hero-title">Reda AMMARI</h1>
        <TrueFocus 
          sentence={t.focusSentence}
          highlightPhrases={t.highlightPhrases} // New prop
          manualMode={false}
          blurAmount={5}
          borderColor="red"
          animationDuration={1.0} 
          pauseBetweenAnimations={0.8} 
        />
      </div>
    </section>
  );
};


export default Hero;