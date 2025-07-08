"use client";

import { motion } from 'framer-motion';
import { SEOHead } from '../../components/ui/SEOHead';
import styles from './About.module.css';
import aboutImage from '../../assets/about.jpg';

interface AboutProps {}

export const About: React.FC<AboutProps> = () => {
  const values = [
    {
      title: "Expertise",
      description: "Plus de 25 ans d'expérience dans les travaux de second œuvre",
      icon: "🎯"
    },
    {
      title: "Qualité",
      description: "Matériaux nobles et techniques éprouvées pour des réalisations durables",
      icon: "⭐"
    },
    {
      title: "Passion",
      description: "L'artisanat au cœur de chaque projet",
      icon: "❤️"
    },
    {
      title: "Innovation",
      description: "Alliance entre savoir-faire traditionnel et techniques modernes",
      icon: "💡"
    }
  ];

  const timeline = [
    {
      year: "2017",
      title: "Création de l'entreprise",
      description: "Lancement de BR16BATIMENT avec ma passion de l'artisanat"
    },
    {
      year: "2019",
      title: "L'année du neuf",
      description: "Réalisation d'un grand nombre de projets de maisons neuves"
    },
    {
      year: "2023",
      title: "Expansion des services",
      description: "Élargissement vers la rénovation"
    },
    {
      year: "2024",
      title: "Les particuliers sont à l'honneur",
      description: "Renforcement de notre engagement auprès des particuliers pour concrétiser leurs projets."
    }
  ];

  return (
    <>
      <SEOHead
        title="À propos"
        description="Découvrez mon histoire, Raphaël Bardan, artisan charpentier passionné en Charente. Plus de 12 ans d'expertise au service de vos projets de charpente et construction bois."
        keywords="Raphaël Bardan, charpentier Charente, artisan charpentier, histoire BR16BATIMENT, expertise charpente"
        canonicalUrl="/a-propos"
      />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <motion.div
              className={styles.heroText}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className={styles.heroTitle}>
                L'Art du second œuvre
              </h1>
              <p className={styles.heroSubtitle}>
                Je mets mon expertise au service de vos projets depuis plus de 12 ans.
              </p>
            </motion.div>
            
            <motion.div
              className={styles.heroImage}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img 
                src={aboutImage} 
                alt="Raphaël Bardan - Artisan charpentier BR16BATIMENT au travail"
                className={styles.aboutImg}
              />
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className={styles.story}>
          <div className={styles.container}>
            <motion.div
              className={styles.storyContent}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.sectionTitle}>Mon Histoire</h2>
              <div className={styles.storyText}>
                <p>
                  Depuis 2013, j'incarne l'excellence de l'artisanat français 
                  dans le domaine du second œuvre. Basé à Champagne-Vigny en Charente, j'ai créé BR16BATIMENT 
                  suite à ma passion profonde pour mon métier.
                </p>
                <p>
                  Après l'obtention de mon Baccalauréat Professionnel en Menuiserie en 1999,
                  je me suis formé sur le terrain et j'ai acquis une expérience solide dans les domaines
                  de la menuiserie, charpente, couverture, plâtrerie, isolation et ossature bois.
                </p>
                <p>
                  J'ai su m'adapter aux différentes normes successives pour faire évoluer votre
                  habitat. Ainsi je suis en capacité d'offrir à chaque client des solutions sur mesure.
                  Chaque projet, est une nouvelle aventure, une occassion de donner vie 
                  à chacune de vos idées.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className={styles.values}>
          <div className={styles.container}>
            <motion.div
              className={styles.sectionHeader}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.sectionTitle}>Mes Valeurs</h2>
              <p className={styles.sectionDescription}>
                Les piliers qui guident mon travail au quotidien
              </p>
            </motion.div>

            <div className={styles.valuesGrid}>
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  className={styles.valueCard}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className={styles.valueIcon}>{value.icon}</div>
                  <h3 className={styles.valueTitle}>{value.title}</h3>
                  <p className={styles.valueDescription}>{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className={styles.timeline}>
          <div className={styles.container}>
            <motion.div
              className={styles.sectionHeader}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.sectionTitle}>Mon Parcours</h2>
              <p className={styles.sectionDescription}>
                Les étapes clés de mon développement
              </p>
            </motion.div>

            <div className={styles.timelineContainer}>
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  className={styles.timelineItem}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className={styles.timelineYear}>{item.year}</div>
                  <div className={styles.timelineContent}>
                    <h3 className={styles.timelineTitle}>{item.title}</h3>
                    <p className={styles.timelineDescription}>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className={styles.certifications}>
          <div className={styles.container}>
            <motion.div
              className={styles.certContent}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.sectionTitle}>Mes Garanties</h2>
              <div className={styles.certGrid}>
                <div className={styles.certItem}>
                  <h3>Artisan Qualifié</h3>
                  <p>Savoir-faire reconnu et certifié</p>
                </div>
                <div className={styles.certItem}>
                  <h3>Assurance Décennale</h3>
                  <p>Vos travaux protégés sur 10 ans</p>
                </div>
                <div className={styles.certItem}>
                  <h3>Devis Gratuit</h3>
                  <p>Étude personnalisée sans engagement</p>
                </div>
                <div className={styles.certItem}>
                  <h3>Matériaux Premium</h3>
                  <p>Sélection rigoureuse des essences</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};
