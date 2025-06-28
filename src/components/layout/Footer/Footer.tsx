import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

interface FooterProps {}

export const Footer: React.FC<FooterProps> = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/a-propos', label: 'À propos' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact' }
  ];

  const legalLinks = [
    { path: '/mentions-legales', label: 'Mentions légales' },
    { path: '/politique-confidentialite', label: 'Politique de confidentialité' }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>BR16BATIMENT</h3>
            <p className={styles.description}>
              Spécialiste en travaux de charpente depuis 2017. 
              J'apporte expertise, qualité et savoir-faire artisanal pour tous vos projets de construction et rénovation.
            </p>
            <div className={styles.companyInfo}>
              <p>SIRET: 833 229 727 00015</p>
              <p>3 Les Vignes de Chez Rullier</p>
              <p>16250 Champagne-Vigny, France</p>
            </div>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Navigation</h4>
            <ul className={styles.linkList}>
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Informations légales</h4>
            <ul className={styles.linkList}>
              {legalLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Contact</h4>
            <div className={styles.contactInfo}>
              <p>Raphaël Bardan</p>
              <p>Artisan Charpentier</p>
              <a href="tel:0667116760" className={styles.contactLink}>
                06 67 11 67 60
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.copyright}>
            <p>&copy; {currentYear} BR16BATIMENT - Tous droits réservés</p>
          </div>
          <div className={styles.credits}>
            <p>Réalisé avec passion pour mon métier d'artisan</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
