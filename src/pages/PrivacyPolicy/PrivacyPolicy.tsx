import { SEOHead } from '../../components/ui/SEOHead';
import styles from './PrivacyPolicy.module.css';

interface PrivacyPolicyProps {}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = () => {
  return (
    <>
      <SEOHead
        title="Politique de confidentialité"
        description="Politique de confidentialité de BR16BATIMENT. Protection des données personnelles et respect de votre vie privée."
        canonicalUrl="/politique-confidentialite"
        noIndex={true}
      />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Politique de Confidentialité</h1>
          
          <div className={styles.intro}>
            <p>
              BR16BATIMENT s'engage à protéger la confidentialité de vos données personnelles. 
              Cette politique explique comment nous collectons, utilisons et protégeons vos informations 
              conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Responsable du traitement</h2>
            <div className={styles.content}>
              <p><strong>Responsable :</strong> Raphaël BARDAN - BR16BATIMENT</p>
              <p><strong>Adresse :</strong> 3 Les Vignes de Chez Rullier, 16250 Champagne-Vigny, France</p>
              <p><strong>Email :</strong> contact@br16batiment.fr</p>
              <p><strong>SIRET :</strong> 833 229 727 00015</p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Données collectées</h2>
            <div className={styles.content}>
              <h3 className={styles.subTitle}>2.1 Données collectées via le formulaire de contact</h3>
              <ul>
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone (optionnel)</li>
                <li>Type de projet</li>
                <li>Sujet et description du projet</li>
              </ul>

              <h3 className={styles.subTitle}>2.2 Données de navigation</h3>
              <ul>
                <li>Adresse IP</li>
                <li>Type de navigateur</li>
                <li>Pages visitées</li>
                <li>Durée de visite</li>
                <li>Données de géolocalisation approximative</li>
              </ul>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Finalités du traitement</h2>
            <div className={styles.content}>
              <p>Vos données personnelles sont collectées et traitées pour les finalités suivantes :</p>
              <ul>
                <li><strong>Répondre à vos demandes :</strong> traitement de vos demandes de devis et de contact</li>
                <li><strong>Relation commerciale :</strong> suivi de votre projet et communication</li>
                <li><strong>Amélioration du service :</strong> analyse de l'utilisation du site</li>
                <li><strong>Obligations légales :</strong> conservation des documents commerciaux</li>
              </ul>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Base légale</h2>
            <div className={styles.content}>
              <p>Le traitement de vos données personnelles repose sur :</p>
              <ul>
                <li><strong>Votre consentement :</strong> pour l'envoi de communications commerciales</li>
                <li><strong>L'exécution d'un contrat :</strong> pour le traitement de vos demandes de devis</li>
                <li><strong>L'intérêt légitime :</strong> pour l'amélioration de nos services</li>
                <li><strong>Les obligations légales :</strong> pour la conservation des documents comptables</li>
              </ul>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. Destinataires des données</h2>
            <div className={styles.content}>
              <p>Vos données personnelles sont destinées à :</p>
              <ul>
                <li>BR16BATIMENT et ses collaborateurs autorisés</li>
                <li>Nos prestataires techniques (hébergement, maintenance)</li>
                <li>Les autorités compétentes en cas d'obligation légale</li>
              </ul>
              <p>
                Aucune donnée n'est vendue, louée ou cédée à des tiers à des fins commerciales 
                sans votre consentement explicite.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Durée de conservation</h2>
            <div className={styles.content}>
              <p>Vos données sont conservées pendant les durées suivantes :</p>
              <ul>
                <li><strong>Données de contact :</strong> 3 ans après le dernier contact</li>
                <li><strong>Données de prospects :</strong> 3 ans après la collecte</li>
                <li><strong>Données clients :</strong> 10 ans après la fin du contrat (obligation légale)</li>
                <li><strong>Données de navigation :</strong> 13 mois maximum</li>
              </ul>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Vos droits</h2>
            <div className={styles.content}>
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul>
                <li><strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles</li>
                <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
                <li><strong>Droit à l'effacement :</strong> supprimer vos données sous certaines conditions</li>
                <li><strong>Droit à la limitation :</strong> limiter le traitement de vos données</li>
                <li><strong>Droit à la portabilité :</strong> récupérer vos données dans un format structuré</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement pour motifs légitimes</li>
                <li><strong>Droit de retrait du consentement :</strong> retirer votre consentement à tout moment</li>
              </ul>
              
              <p>
                Pour exercer ces droits, contactez-nous à l'adresse : contact@br16batiment.fr 
                en précisant votre demande et en joignant une copie de votre pièce d'identité.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Sécurité des données</h2>
            <div className={styles.content}>
              <p>
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées 
                pour protéger vos données personnelles contre :
              </p>
              <ul>
                <li>L'accès non autorisé</li>
                <li>La modification, la divulgation ou la destruction</li>
                <li>La perte accidentelle</li>
              </ul>
              <p>
                Nos prestataires s'engagent également à respecter la confidentialité 
                et la sécurité de vos données.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>9. Cookies</h2>
            <div className={styles.content}>
              <p>
                Notre site peut utiliser des cookies pour améliorer votre expérience de navigation. 
                Les cookies sont de petits fichiers stockés sur votre appareil.
              </p>
              
              <h3 className={styles.subTitle}>Types de cookies utilisés :</h3>
              <ul>
                <li><strong>Cookies techniques :</strong> nécessaires au fonctionnement du site</li>
                <li><strong>Cookies analytiques :</strong> pour mesurer l'audience (anonymisés)</li>
                <li><strong>Cookies de préférences :</strong> pour mémoriser vos choix</li>
              </ul>
              
              <p>
                Vous pouvez configurer votre navigateur pour refuser les cookies, 
                mais certaines fonctionnalités du site pourraient être limitées.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>10. Transferts internationaux</h2>
            <div className={styles.content}>
              <p>
                Certains de nos prestataires peuvent être situés en dehors de l'Union Européenne. 
                Dans ce cas, nous nous assurons que des garanties appropriées sont mises en place 
                pour protéger vos données (clauses contractuelles types, certifications).
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>11. Réclamations</h2>
            <div className={styles.content}>
              <p>
                Si vous estimez que le traitement de vos données personnelles constitue une violation 
                du RGPD, vous avez le droit d'introduire une réclamation auprès de la CNIL :
              </p>
              <p>
                <strong>Commission Nationale de l'Informatique et des Libertés (CNIL)</strong><br />
                3 Place de Fontenoy - TSA 80715<br />
                75334 Paris Cedex 07<br />
                Téléphone : 01 53 73 22 22<br />
                Site web : www.cnil.fr
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>12. Modifications</h2>
            <div className={styles.content}>
              <p>
                Cette politique de confidentialité peut être modifiée à tout moment. 
                Toute modification sera publiée sur cette page avec la date de mise à jour.
              </p>
              <p>
                Nous vous encourageons à consulter régulièrement cette page pour rester 
                informé de nos pratiques en matière de protection des données.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>13. Contact</h2>
            <div className={styles.content}>
              <p>
                Pour toute question concernant cette politique de confidentialité 
                ou le traitement de vos données personnelles, contactez-nous :
              </p>
              <p>
                <strong>Email :</strong> contact@br16batiment.fr<br />
                <strong>Courrier :</strong> BR16BATIMENT - 3 Les Vignes de Chez Rullier, 16250 Champagne-Vigny
              </p>
            </div>
          </section>

          <div className={styles.lastUpdate}>
            <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          </div>
        </div>
      </main>
    </>
  );
};
