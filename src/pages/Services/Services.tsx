"use client";

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/ui/SEOHead';
import styles from './Services.module.css';

interface ServicesProps {}

export const Services: React.FC<ServicesProps> = () => {
  const mainServices = [
    {
      title: "Charpente Traditionnelle",
      description: "Conception et réalisation de charpentes en bois massif selon les techniques ancestrales françaises. Assemblages à tenons et mortaises, chevilles en bois.",
      features: [
        "Charpente à la française",
        "Assemblages traditionnels",
        "Bois massif sélectionné",
        "Taille sur mesure"
      ],
      image: "🏗️"
    },
    {
      title: "Charpente Industrielle",
      description: "Solutions modernes et performantes utilisant des connecteurs métalliques et des techniques industrialisées pour tous types de constructions.",
      features: [
        "Fermettes industrielles",
        "Calculs de structure",
        "Pose rapide",
        "Optimisation des coûts"
      ],
      image: "🏭"
    },
    {
      title: "Ossature Bois",
      description: "Construction écologique et durable en ossature bois pour maisons individuelles, extensions et bâtiments tertiaires.",
      features: [
        "Construction écologique",
        "Isolation performante",
        "Montage rapide",
        "Design moderne"
      ],
      image: "🌲"
    },
    {
      title: "Rénovation & Restauration",
      description: "Restauration de charpentes anciennes, renforcement de structures existantes et mise aux normes des bâtiments patrimoniaux.",
      features: [
        "Diagnostic structure",
        "Renforcement",
        "Respect du patrimoine",
        "Mise aux normes"
      ],
      image: "🔨"
    }
  ];

  const additionalServices = [
    {
      title: "Couverture",
      description: "Pose et rénovation de toitures",
      icon: "🏠"
    },
    {
      title: "Zinguerie",
      description: "Gouttières et évacuation des eaux",
      icon: "💧"
    },
    {
      title: "Isolation",
      description: "Isolation thermique et phonique",
      icon: "🛡️"
    },
    {
      title: "Bardage",
      description: "Habillage extérieur en bois",
      icon: "🪵"
    },
    {
      title: "Terrasses",
      description: "Terrasses et structures extérieures",
      icon: "🏡"
    },
    {
      title: "Aménagement",
      description: "Combles et espaces sous toiture",
      icon: "🏠"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Étude & Devis",
      description: "Analyse de votre projet et établissement d'un devis détaillé gratuit"
    },
    {
      step: "02",
      title: "Conception",
      description: "Plans techniques et choix des matériaux adaptés à vos besoins"
    },
    {
      step: "03",
      title: "Fabrication",
      description: "Préparation et usinage des éléments en atelier"
    },
    {
      step: "04",
      title: "Montage",
      description: "Installation sur site avec respect des délais convenus"
    }
  ];

  return (
    <>
      <SEOHead
        title="Services"
        description="Découvrez tous mes services : charpente traditionnelle, charpente industrielle, ossature bois, rénovation. Devis gratuit en Charente."
        keywords="services charpentier, charpente traditionnelle, charpente industrielle, ossature bois, rénovation charpente, couverture, Charente"
        canonicalUrl="/services"
      />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <motion.div
              className={styles.heroText}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className={styles.heroTitle}>Mes Services</h1>
              <p className={styles.heroDescription}>
                Mon savoir-faire complet au service de tous vos projets de charpente et construction bois
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Services */}
        <section className={styles.mainServices}>
          <div className={styles.container}>
            <motion.div
              className={styles.sectionHeader}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.sectionTitle}>Mes Spécialités</h2>
              <p className={styles.sectionDescription}>
                Des solutions adaptées à chaque projet, de la tradition à l'innovation
              </p>
            </motion.div>

            <div className={styles.servicesGrid}>
              {mainServices.map((service, index) => (
                <motion.div
                  key={index}
                  className={styles.serviceCard}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    y: -10,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className={styles.serviceHeader}>
                    <div className={styles.serviceIcon}>{service.image}</div>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                  </div>
                  <p className={styles.serviceDescription}>{service.description}</p>
                  <ul className={styles.serviceFeatures}>
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className={styles.additionalServices}>
          <div className={styles.container}>
            <motion.div
              className={styles.sectionHeader}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.sectionTitle}>Services Complémentaires</h2>
              <p className={styles.sectionDescription}>
                Une approche globale pour tous vos besoins en construction bois
              </p>
            </motion.div>

            <div className={styles.additionalGrid}>
              {additionalServices.map((service, index) => (
                <motion.div
                  key={index}
                  className={styles.additionalCard}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className={styles.additionalIcon}>{service.icon}</div>
                  <h4 className={styles.additionalTitle}>{service.title}</h4>
                  <p className={styles.additionalDescription}>{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className={styles.process}>
          <div className={styles.container}>
            <motion.div
              className={styles.sectionHeader}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.sectionTitle}>Ma Méthode</h2>
              <p className={styles.sectionDescription}>
                Un processus éprouvé pour garantir la réussite de votre projet
              </p>
            </motion.div>

            <div className={styles.processSteps}>
              {process.map((step, index) => (
                <motion.div
                  key={index}
                  className={styles.processStep}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className={styles.stepNumber}>{step.step}</div>
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.cta}>
          <div className={styles.container}>
            <motion.div
              className={styles.ctaContent}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.ctaTitle}>Un Projet en Tête ?</h2>
              <p className={styles.ctaDescription}>
                Contactez-moi pour discuter de votre projet et obtenir un devis personnalisé
              </p>
              <div className={styles.ctaActions}>
                <Link to="/contact" className={styles.ctaButton}>
                  Demander un Devis
                </Link>
                <a href="tel:0667116760" className={styles.ctaButtonSecondary}>
                  M'Appeler
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};
