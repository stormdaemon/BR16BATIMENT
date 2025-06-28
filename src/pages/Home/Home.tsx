"use client";

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/ui/SEOHead';
import styles from './Home.module.css';

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const services = [
    {
      title: "Charpente traditionnelle",
      description: "Conception et réalisation de charpentes en bois massif selon les techniques ancestrales",
      icon: "🏗️"
    },
    {
      title: "Charpente industrielle",
      description: "Solutions modernes et performantes pour tous types de constructions",
      icon: "🏭"
    },
    {
      title: "Rénovation",
      description: "Restauration et modernisation de charpentes existantes",
      icon: "🔨"
    },
    {
      title: "Ossature bois",
      description: "Construction écologique et durable en ossature bois",
      icon: "🌲"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <>
      <SEOHead
        title="Accueil"
        description="BR16BATIMENT - Spécialiste en travaux de charpente en Charente. Charpentier professionnel depuis 2017, je réalise vos projets de construction et rénovation avec expertise et savoir-faire artisanal."
        keywords="charpentier Charente, charpente bois, construction charpente, rénovation charpente, artisan charpentier, Champagne-Vigny"
        canonicalUrl="/"
      />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <motion.div
              className={styles.heroText}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className={styles.heroTitle}>
                <span className={styles.titleMain}>BR16BATIMENT</span>
                <span className={styles.titleSub}>Maître Charpentier</span>
              </h1>
              <p className={styles.heroDescription}>
                Depuis 2017, je donne vie à vos projets de charpente avec passion et expertise. 
                De la conception à la réalisation, découvrez l'excellence de mon savoir-faire artisanal.
              </p>
              <div className={styles.heroActions}>
                <Link to="/services" className={styles.ctaPrimary}>
                  Mes Services
                </Link>
                <Link to="/contact" className={styles.ctaSecondary}>
                  Devis Gratuit
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              className={styles.heroVisual}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className={styles.heroShape}></div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className={styles.services}>
          <div className={styles.container}>
            <motion.div
              className={styles.sectionHeader}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.sectionTitle}>Mes Expertises</h2>
              <p className={styles.sectionDescription}>
                Mon savoir-faire artisanal au service de vos projets les plus ambitieux
              </p>
            </motion.div>

            <motion.div
              className={styles.servicesGrid}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className={styles.serviceCard}
                  variants={itemVariants}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className={styles.serviceIcon}>{service.icon}</div>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About Preview Section */}
        <section className={styles.aboutPreview}>
          <div className={styles.container}>
            <div className={styles.aboutContent}>
              <motion.div
                className={styles.aboutText}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className={styles.aboutTitle}>L'Excellence Artisanale</h2>
                <p className={styles.aboutDescription}>
                  Raphaël Bardan, artisan charpentier passionné, je mets mon expertise au service 
                  de vos projets depuis plus de 7 ans. Chaque réalisation est unique et 
                  reflète mon engagement pour la qualité et la tradition.
                </p>
                <Link to="/a-propos" className={styles.aboutCta}>
                  Découvrir mon histoire
                </Link>
              </motion.div>
              
              <motion.div
                className={styles.aboutVisual}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className={styles.aboutShape}></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <motion.div
              className={styles.ctaContent}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.ctaTitle}>Prêt à donner vie à votre projet ?</h2>
              <p className={styles.ctaDescription}>
                Contactez-moi pour un devis personnalisé et gratuit
              </p>
              <Link to="/contact" className={styles.ctaButton}>
                Demander un devis
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};
