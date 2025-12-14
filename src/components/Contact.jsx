import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane, FaLaptopCode, FaBrain } from 'react-icons/fa';
import './Contact.css';

const Contact = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(''); // 'sending', 'success', 'error'

  const translations = {
    fr: {
      title: "Contactez-moi",
      namePlaceholder: "Votre Nom",
      emailPlaceholder: "Votre Email",
      messagePlaceholder: "Votre Message",
      sendButton: "Envoyer le Message",
      sending: "Envoi en cours...",
      success: "Message envoyé avec succès !",
      error: "Une erreur est survenue. Réessayez.",
      directContact: "Mes Coordonnées",
      // description supprimée
      phoneLabel: "Téléphone",
      locationLabel: "Localisation",
      freelanceLabel: "Freelance",
      freelanceDesc: "Disponible pour missions & sites web à Montpellier, Toulouse et en remote.",
      aiLabel: "Passion",
      aiDesc: "IA & Data Engineering"
    },
    en: {
      title: "Get in Touch",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      messagePlaceholder: "Your Message",
      sendButton: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "An error occurred. Please try again.",
      directContact: "Contact Info",
      // description removed
      phoneLabel: "Phone",
      locationLabel: "Location",
      freelanceLabel: "Freelance",
      freelanceDesc: "Available for gigs & websites in Montpellier, Toulouse and remotely.",
      aiLabel: "Passion",
      aiDesc: "AI & Data Engineering"
    }
  };

  const t = translations[language] || translations.en;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const SERVICE_ID = 'service_srlorfl';
    const TEMPLATE_ID = 'template_y6jdfr4';
    const PUBLIC_KEY = 'Hg_JwlkPZdt51ia2O';

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact">
      <h2 className="contact-title">{t.title}</h2>
      
      <div className="contact-container">
        {/* Partie Gauche : Colonne d'infos */}
        <div className="contact-info-column">
          <div className="contact-header-text">
            <h3>{t.directContact}</h3>
          </div>
          
          <div className="info-cards-stack">
            <div className="info-card">
              <div className="icon-box">
                <FaEnvelope />
              </div>
              <div className="info-content">
                <span className="info-label">Email</span>
                <a href="mailto:reda.ammari@outlook.com">reda.ammari@outlook.com</a>
              </div>
            </div>

            <div className="info-card">
              <div className="icon-box">
                <FaPhone />
              </div>
              <div className="info-content">
                <span className="info-label">{t.phoneLabel}</span>
                <span>07 66 84 99 08</span>
              </div>
            </div>

            <div className="info-card">
              <div className="icon-box">
                <FaMapMarkerAlt />
              </div>
              <div className="info-content">
                <span className="info-label">{t.locationLabel}</span>
                <span>Montpellier / Toulouse, France</span>
              </div>
            </div>

            {/* Nouveaux blocs Freelance & Passion */}
            <div className="info-card highlight-card">
              <div className="icon-box">
                <FaLaptopCode />
              </div>
              <div className="info-content">
                <span className="info-label">{t.freelanceLabel}</span>
                <span>{t.freelanceDesc}</span>
              </div>
            </div>

            <div className="info-card highlight-card">
              <div className="icon-box">
                <FaBrain />
              </div>
              <div className="info-content">
                <span className="info-label">{t.aiLabel}</span>
                <span>{t.aiDesc}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Partie Droite : Formulaire */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              name="name"
              placeholder={t.namePlaceholder} 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <input 
              type="email" 
              name="email"
              placeholder={t.emailPlaceholder} 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <textarea 
              name="message"
              placeholder={t.messagePlaceholder} 
              value={formData.message} 
              onChange={handleChange} 
              required 
              rows="5"
            ></textarea>
          </div>
          
          <button type="submit" className="submit-btn" disabled={status === 'sending'}>
            <FaPaperPlane className="btn-icon" /> {status === 'sending' ? t.sending : t.sendButton}
          </button>
          
          {status === 'success' && <p className="success-msg">{t.success}</p>}
          {status === 'error' && <p className="error-msg">{t.error}</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
