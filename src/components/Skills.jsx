import { useState, useRef, useEffect } from 'react';
import './Skills.css';
import CardSwap, { Card } from './CardSwap';
import StarBorder from './StarBorder';
import Carousel from './Carousel';
import { FiMessageSquare, FiUsers, FiRefreshCw, FiClock, FiZap, FiTarget, FiSearch } from 'react-icons/fi';

const Skills = ({ language }) => {
  const [selectedSoftCardIndex, setSelectedSoftCardIndex] = useState(null);
  const softCardSwapRef = useRef(null);
  // Initialisation directe pour avoir la bonne valeur tout de suite
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 1024);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 1024;
      console.log("Width:", window.innerWidth, "Is Mobile:", mobile); // Debug
      setIsMobile(mobile);
    };
    
    window.addEventListener('resize', checkMobile);
    // Pas besoin d'appeler checkMobile() ici car l'état initial le fait déjà, 
    // mais on peut le garder pour les cas limites de redimensionnement au chargement
    checkMobile();
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const translations = {
    // ... (translations object remains the same)
    fr: {
      technicalTitle: "Compétences Techniques",
      softTitle: "Compétences Générales",
      technicalSkills: [
        { category: 'Skywise', skills: ['Dashboards & Workshops', 'Visualisation de KPIs', 'Traitement Données (Contour)', 'Pipelines de Données'] },
        { category: 'Python', skills: ['Numpy', 'Pandas', 'Scikit-learn', 'Data Collection', 'Nettoyage de Données', 'Algorithmes', 'CI/CD Pipelines', 'Tests & Typage'] },
        { category: 'JAVA', skills: [] },
        { category: 'SQL', skills: ['SQLite3', 'MySQL', 'PostgreSQL', 'Oracle', 'Requêtes Complexes', 'Modélisation BDD', 'Relations'] },
        { category: 'Cloud & CI/CD', skills: ['Git', 'GitHub', 'Gitlab', 'Pipelines CI/CD'] },
        { category: 'Data Viz', skills: ['Matplotlib', 'Dashboards', 'KPIs'] },
        { category: 'Machine Learning', skills: ['Clustering k-means', 'Analyse de Données'] },
        { category: 'Data Management', skills: ['Harmonisation', 'Stockage PGN'] },
      ],
      softSkills: [
        { title: 'Communication', description: 'Capacité à exprimer des idées clairement et à écouter activement.' },
        { title: 'Travail en équipe', description: 'Collaboration efficace avec les membres de l\'équipe pour atteindre des objectifs communs.' },
        { title: 'Adaptabilité', description: 'Flexibilité face aux changements et capacité à apprendre de nouvelles méthodes.' },
        { title: 'Ponctualité', description: 'Respect des délais et des engagements.' },
        { title: 'Autonomie', description: 'Capacité à travailler de manière indépendante et à prendre des initiatives.' },
        { title: 'Résolution de problèmes', description: 'Analyse critique des situations et proposition de solutions innovantes.' },
        { title: 'Curiosité', description: 'Désir d\'apprendre et d\'explorer de nouvelles technologies.' }
      ]
    },
    en: {
      technicalTitle: "Technical Skills",
      softTitle: "Soft Skills",
      technicalSkills: [
        { category: 'Skywise', skills: ['Dashboard & Workshop Dev', 'KPI Visualization', 'Data Processing (Contour)', 'Data Pipelines'] },
        { category: 'Python', skills: ['Numpy', 'Pandas', 'Scikit-learn', 'Data Collection', 'Data Cleaning', 'Algorithms', 'CI/CD Pipelines', 'Testing & Typing'] },
        { category: 'JAVA', skills: [] },
        { category: 'SQL', skills: ['SQLite3', 'MySQL', 'Complex Queries', 'DB Modeling', 'Relations'] },
        { category: 'Cloud & CI/CD', skills: ['Git', 'GitHub', 'Gitlab', 'CI/CD Pipelines'] },
        { category: 'Data Viz', skills: ['Matplotlib', 'Dashboards', 'KPIs'] },
        { category: 'Machine Learning', skills: ['K-means Clustering', 'Data Analysis'] },
        { category: 'Data Management', skills: ['Data Harmonization', 'PGN Storage'] },
      ],
      softSkills: [
        { title: 'Communication', description: 'Ability to express ideas clearly and listen actively.' },
        { title: 'Teamwork', description: 'Effective collaboration with team members to achieve common goals.' },
        { title: 'Adaptability', description: 'Flexibility in the face of change and ability to learn new methods.' },
        { title: 'Punctuality', description: 'Respect for deadlines and commitments.' },
        { title: 'Autonomy', description: 'Ability to work independently and take initiative.' },
        { title: 'Problem Solving', description: 'Critical analysis of situations and proposal of innovative solutions.' },
        { title: 'Curiosity', description: 'Desire to learn and explore new technologies.' }
      ]
    }
  };

  const t = translations[language] || translations.en;

  const softSkillIcons = [
    <FiMessageSquare className="soft-skill-icon" />,
    <FiUsers className="soft-skill-icon" />,
    <FiRefreshCw className="soft-skill-icon" />,
    <FiClock className="soft-skill-icon" />,
    <FiZap className="soft-skill-icon" />,
    <FiTarget className="soft-skill-icon" />,
    <FiSearch className="soft-skill-icon" />
  ];

  // Icônes spécifiques pour le Carousel (style neutre pour laisser le Carousel gérer)
  const carouselIcons = [
    <FiMessageSquare />,
    <FiUsers />,
    <FiRefreshCw />,
    <FiClock />,
    <FiZap />,
    <FiTarget />,
    <FiSearch />
  ];

  const handleSoftCardClick = (index) => { 
    setSelectedSoftCardIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const handleSoftCardSwapClick = () => { 
    softCardSwapRef.current?.swap();
  };

  // Transform softSkills into Carousel-compatible format
  const carouselSoftSkills = t.softSkills.map((skill, index) => ({
    title: skill.title,
    description: skill.description,
    id: index + 1,
    icon: carouselIcons[index] // Utilisation des icônes neutres
  }));


  return (
    <section id="skills">
      <div className="skills-section">
        <h3>{t.technicalTitle}</h3>
        
        <div className="technical-skills-grid">
          {t.technicalSkills.map((techSkill, index) => (
            <div key={index} className="tech-skill-category">
              <h4>{techSkill.category}</h4>
              <div className="skills-list-grid">
                {techSkill.skills.length > 0 ? (
                  techSkill.skills.map((skill, sIndex) => (
                    <StarBorder 
                      key={sIndex} 
                      as="div" 
                      className="skill-item"
                      color="var(--accent-color)" 
                      speed="4s"
                    >
                      {skill}
                    </StarBorder>
                  ))
                ) : (
                  <p className="no-skills">Wait...</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="skills-section">
        <h3>{t.softTitle}</h3>
        
        {isMobile ? (
          /* VERSION MOBILE : Carousel (Scroll) */
          <div className="mobile-carousel-wrapper">
            <Carousel
              items={carouselSoftSkills}
              baseWidth={300} // Largeur adaptée au mobile
              autoplay={true}
              autoplayDelay={3000}
              pauseOnHover={true}
              loop={true}
              round={false}
            />
          </div>
        ) : (
          /* VERSION DESKTOP : CardSwap animé */
          <div 
            className="cardswap-wrapper"
            style={{ height: '600px', position: 'relative' }}
            onClick={handleSoftCardSwapClick}
          >
            <CardSwap
              ref={softCardSwapRef}
              width={500}
              height={400}
              cardDistance={60}
              verticalDistance={70}
            >
              {t.softSkills.map((skill, index) => (
                <Card
                  key={index}
                  className={`soft-skill-card ${selectedSoftCardIndex === index ? 'selected' : ''}`}
                  onClick={() => { handleSoftCardClick(index); }}
                >
                  <div className="soft-skill-content">
                    {softSkillIcons[index]}
                    <h4>{skill.title}</h4>
                    <p>{skill.description}</p>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
