import './Projects.css';
import SpotlightCard from './SpotlightCard';

const Projects = ({ language }) => {
  const translations = {
    fr: {
      title: "Expériences et Projets",
      projects: [
        {
          title: 'Airbus - Apprenti Data/IA (Mastère Informatique)',
          company: 'Quality A320 Family Customer Line (QSCO), Divisio, Airbus, Toulouse',
          date: 'septembre 2025 - juillet 2027',
          description: 'Première année d\'apprentissage dans le cadre d\'un mastère en Informatique au sein du service QSCO (A320 Family Customer Line). Collecte, traitement et nettoyage des données opérationnelles issues des phases d\'assemblage et de test des A320/A321.'
        },
        {
          title: 'TER - App d\'entrainement à la stratégie du jeu d\'échec',
          company: 'Université de Montpellier, Montpellier',
          date: 'Depuis novembre 2024',
          description: 'Développement d\'une application Open Source permettant aux joueurs d\'évaluer leur précision en devinant les coups des grands maîtres. Collecte et stockage des parties d\'échecs au format PGN dans une base de données.'
        },
        {
          title: 'Conception et développement d\'une base de données collaborative (Projet académique – 2024)',
          company: 'Université de Montpellier, Montpellier',
          date: 'octobre 2024 - décembre 2024',
          description: 'Rédaction d\'un cahier des charges détaillé avec contraintes métier et exigences fonctionnelles. Conception du Modèle Entité-Association (MEA) et du dictionnaire de données.'
        },
        {
          title: 'Stage de recherche en analyse de données satellitaires',
          company: 'LIRMM - CNRS, Monpellier',
          date: 'mai 2024 - juin 2024',
          description: 'Comparaison des méthodes d\'harmonisation des données satellitaires DMSP & VIIRS. Application de l\'algorithme k-moyennes (k-means) pour le clustering de l\'intensité lumineuse nocturne.'
        }
      ]
    },
    en: {
      title: "Experience and Projects",
      projects: [
        {
          title: 'Airbus - Data/AI Apprentice (Master\'s in Computer Science)',
          company: 'Quality A320 Family Customer Line (QSCO), Divisio, Airbus, Toulouse',
          date: 'September 2025 - July 2027',
          description: 'First year of apprenticeship as part of a Master\'s in Computer Science within the QSCO department (A320 Family Customer Line). Collection, processing, and cleaning of operational data from the assembly and test phases of A320/A321 aircraft.'
        },
        {
          title: 'TER - Chess Strategy Training App',
          company: 'University of Montpellier, Montpellier',
          date: 'Since November 2024',
          description: 'Development of an Open Source application allowing players to evaluate their accuracy by guessing Grandmasters\' moves. Collection and storage of chess games in PGN format in a database.'
        },
        {
          title: 'Design and Development of a Collaborative Database (Academic Project – 2024)',
          company: 'University of Montpellier, Montpellier',
          date: 'October 2024 - December 2024',
          description: 'Drafting of a detailed specifications document with business constraints and functional requirements. Design of the Entity-Relationship Model (ERM) and data dictionary.'
        },
        {
          title: 'Research Internship in Satellite Data Analysis',
          company: 'LIRMM - CNRS, Montpellier',
          date: 'May 2024 - June 2024',
          description: 'Comparison of harmonization methods for DMSP & VIIRS satellite data. Application of the k-means algorithm for clustering nocturnal light intensity.'
        }
      ]
    }
  };

  const t = translations[language] || translations.en;

  return (
    <section
      id="projects"
      className="projects"
    >
      <h2 className="projects-title">{t.title}</h2>
      <div className="projects-grid">
        {t.projects.map((project, index) => (
          <SpotlightCard
            key={index}
            className="project-spotlight-card" // New class for additional styling if needed
            spotlightColor="rgba(128, 0, 128, 0.2)" // Changed to purple
          >
            <h3>{project.title}</h3>
            <h4>{project.company}</h4>
            <p>{project.date}</p>
            <p>{project.description}</p>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
};

export default Projects;