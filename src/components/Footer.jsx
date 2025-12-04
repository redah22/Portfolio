import './Footer.css';
import { FaGithub, FaInstagram } from 'react-icons/fa'; // Import icons

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-icons">
        <a href="https://github.com/redah22" target="_blank" rel="noopener noreferrer">
          <FaGithub size={24} className="footer-icon" />
        </a>
        <a href="https://www.instagram.com/redah._/" target="_blank" rel="noopener noreferrer">
          <FaInstagram size={24} className="footer-icon" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;