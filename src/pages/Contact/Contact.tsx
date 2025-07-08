"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from '@formspree/react';
import { SEOHead } from '../../components/ui/SEOHead';
import styles from './Contact.module.css';

interface ContactProps {}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  projectType: string;
}

export const Contact: React.FC<ContactProps> = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    projectType: ''
  });

  const [state, handleFormspreeSubmit] = useForm("xeokbklz");
  const [showModal, setShowModal] = useState<boolean>(false);

  const projectTypes = [
    'Charpente',
    'Ossature bois',
    'Rénovation',
    'Couverture',
    'Isolation',
    'Menuiserie',
    'Plaquisterie',
    'Aménagement Intérieur',
    'Nettoyages toitures',
    'Autre'
  ];

  const contactInfo = [
    {
      title: "Adresse",
      content: "3 Les Vignes de Chez Rullier\n16250 Champagne-Vigny\nCharente, France",
      icon: "📍"
    },
    {
      title: "Téléphone",
      content: "06 67 11 67 60",
      icon: "📞"
    },
    {
      title: "Email",
      content: "br16batiment@gmail.com",
      icon: "✉️"
    },
    {
      title: "Horaires",
      content: "Lundi - Vendredi\n8h00 - 18h00\nSamedi sur rendez-vous",
      icon: "🕐"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    // Submit to Formspree
    await handleFormspreeSubmit(e);
  };

  // Watch for successful submission to show modal
  useEffect(() => {
    if (state.succeeded) {
      setShowModal(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        projectType: ''
      });
    }
  }, [state.succeeded]);

  const closeModal = (): void => {
    setShowModal(false);
  };

  return (
    <>
      <SEOHead
        title="Contact"
        description="Contactez-moi pour votre projet de charpente en Charente. Devis gratuit, conseils personnalisés. Raphaël Bardan, charpentier professionnel à Champagne-Vigny."
        keywords="contact charpentier, devis charpente, Champagne-Vigny, Charente, BR16BATIMENT contact"
        canonicalUrl="/contact"
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
              <h1 className={styles.heroTitle}>Contactez-moi</h1>
              <p className={styles.heroDescription}>
                Parlons de votre projet ensemble. Devis gratuit et conseils personnalisés.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className={styles.contactSection}>
          <div className={styles.container}>
            <div className={styles.contactContent}>
              {/* Contact Info */}
              <motion.div
                className={styles.contactInfo}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className={styles.contactTitle}>Mes Coordonnées</h2>
                <div className={styles.infoGrid}>
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      className={styles.infoCard}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className={styles.infoIcon}>{info.icon}</div>
                      <div className={styles.infoContent}>
                        <h3 className={styles.infoTitle}>{info.title}</h3>
                        <p className={styles.infoText}>{info.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className={styles.companyInfo}>
                  <h3 className={styles.companyTitle}>BR16BATIMENT</h3>
                  <div className={styles.companyDetails}>
                    <p><strong>Raphaël Bardan</strong> - Artisan</p>
                    <p>SIRET: 833 229 727 00015</p>
                    <p>Assurance décennale</p>
                    <p>Devis gratuit</p>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                className={styles.contactForm}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className={styles.formTitle}>Demande de Devis</h2>
                
                {state.errors && Object.keys(state.errors).length > 0 && (
                  <div className={styles.errorMessage}>
                    <p>❌ Une erreur s'est produite. Veuillez réessayer ou me contacter directement.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name" className={styles.label}>
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={styles.input}
                        placeholder="Votre nom et prénom"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.label}>
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={styles.input}
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone" className={styles.label}>
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="06 12 34 56 78"
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="projectType" className={styles.label}>
                        Type de projet *
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleInputChange}
                        required
                        className={styles.select}
                      >
                        <option value="">Sélectionnez un type</option>
                        {projectTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="subject" className={styles.label}>
                      Sujet *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className={styles.input}
                      placeholder="Résumé de votre projet"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.label}>
                      Description du projet *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className={styles.textarea}
                      placeholder="Décrivez votre projet en détail : dimensions, matériaux souhaités, délais, budget approximatif..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className={`${styles.submitButton} ${state.submitting ? styles.submitting : ''}`}
                  >
                    {state.submitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className={styles.mapSection}>
          <div className={styles.container}>
            <motion.div
              className={styles.mapContent}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={styles.mapTitle}>Ma Zone d'Intervention</h2>
              <p className={styles.mapDescription}>
                Basé à Champagne-Vigny, j'interviens dans toute la Charente et les départements limitrophes.
              </p>
              <div className={styles.mapPlaceholder}>
                <div className={styles.mapIcon}>🗺️</div>
                <p>Carte interactive disponible prochainement</p>
                <p><strong>Zone principale :</strong> Charente (16)</p>
                <p><strong>Déplacements possibles :</strong> Charente-Maritime, Dordogne</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Success Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal}
            >
              <motion.div
                className={styles.modalContent}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 50 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={styles.modalHeader}>
                  <div className={styles.modalIcon}>✅</div>
                  <h3 className={styles.modalTitle}>Message envoyé !</h3>
                </div>
                <div className={styles.modalBody}>
                  <p className={styles.modalText}>
                    Votre demande a été envoyée avec succès. Je vous recontacterai sous 48h pour discuter de votre projet.
                  </p>
                </div>
                <div className={styles.modalFooter}>
                  <button
                    onClick={closeModal}
                    className={styles.modalButton}
                  >
                    Fermer
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};
