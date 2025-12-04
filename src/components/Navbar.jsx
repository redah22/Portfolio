import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">AR</a>
      </div>
      <ul className="navbar-links">
        <li><a href="#hero">Accueil</a></li>
        <li><a href="#skills">Compétences</a></li>
        <li><a href="#projects">Expériences</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="https://github.com/redah22" target="_blank" rel="noopener noreferrer">GitHub</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
