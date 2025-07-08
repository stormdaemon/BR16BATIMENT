import { SEOHead } from '../../components/ui/SEOHead';
import styles from './LegalNotice.module.css';

interface LegalNoticeProps {}

export const LegalNotice: React.FC<LegalNoticeProps> = () => {
  return (
    <>
      <SEOHead
        title="Mentions légales"
        description="Mentions légales de BR16BATIMENT - Raphaël Bardan, artisan charpentier en Charente. Informations légales et réglementaires."
        canonicalUrl="/mentions-legales"
        noIndex={true}
      />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Mentions Légales</h1>
          
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Identification de l'entreprise</h2>
            <div className={styles.content}>
              <p><strong>Dénomination sociale :</strong> BR16BATIMENT</p>
              <p><strong>Forme juridique :</strong> Entrepreneur individuel</p>
              <p><strong>Dirigeant :</strong> Monsieur Raphaël BARDAN</p>
              <p><strong>Adresse du siège social :</strong><br />
                3 Les Vignes de Chez Rullier<br />
                16250 Champagne-Vigny<br />
                France
              </p>
              <p><strong>SIREN :</strong> 833 229 727</p>
              <p><strong>SIRET du siège social :</strong> 833 229 727 00015</p>
              <p><strong>Code NAF/APE :</strong> 4391A - Travaux de charpente</p>
              <p><strong>TVA intracommunautaire :</strong> FR66833229727</p>
              <p><strong>Date de création :</strong> 10 novembre 2017</p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Contact</h2>
            <div className={styles.content}>
              <p><strong>Email :</strong> br16batiment@gmail.com</p>
              <p><strong>Téléphone :</strong> 06.67.11.67.60</p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Hébergement du site</h2>
            <div className={styles.content}>
              <p>Ce site est hébergé par :</p>
              <p><strong>Netlify, Inc.</strong><br />
                2325 3rd Street, Suite 296<br />
                San Francisco, CA 94107<br />
                États-Unis
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Propriété intellectuelle</h2>
            <div className={styles.content}>
              <p>
                L'ensemble de ce site relève de la législation française et internationale 
                sur le droit d'auteur et la propriété intellectuelle. Tous les droits de 
                reproduction sont réservés, y compris pour les documents téléchargeables 
                et les représentations iconographiques et photographiques.
              </p>
              <p>
                La reproduction de tout ou partie de ce site sur un support électronique 
                quel qu'il soit est formellement interdite sauf autorisation expresse 
                du directeur de la publication.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Responsabilité</h2>
            <div className={styles.content}>
              <p>
                Les informations contenues sur ce site sont aussi précises que possible 
                et le site est périodiquement remis à jour, mais peut toutefois contenir 
                des inexactitudes, des omissions ou des lacunes.
              </p>
              <p>
                Si vous constatez une lacune, erreur ou ce qui paraît être un dysfonctionnement, 
                merci de bien vouloir le signaler par email en décrivant le problème de la 
                manière la plus précise possible.
              </p>
              <p>
                BR16BATIMENT ne pourra en aucune circonstance être tenu responsable de tout 
                dommage de quelque nature qu'il soit résultant de l'interprétation ou de 
                l'utilisation des informations et/ou documents disponibles sur ce site.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Liens hypertextes</h2>
            <div className={styles.content}>
              <p>
                Les liens hypertextes mis en place dans le cadre du présent site web en 
                direction d'autres ressources présentes sur le réseau Internet ne sauraient 
                engager la responsabilité de BR16BATIMENT.
              </p>
              <p>
                De même, BR16BATIMENT ne saurait être tenu responsable du contenu des sites 
                qui auraient un lien vers le présent site.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Cookies</h2>
            <div className={styles.content}>
              <p>
                Ce site peut utiliser des cookies pour améliorer l'expérience utilisateur. 
                Les cookies sont de petits fichiers stockés sur votre ordinateur par votre 
                navigateur web.
              </p>
              <p>
                Vous pouvez configurer votre navigateur pour refuser les cookies, mais 
                certaines fonctionnalités du site pourraient ne pas fonctionner correctement.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Droit applicable</h2>
            <div className={styles.content}>
              <p>
                Tant le présent site que les modalités et conditions de son utilisation 
                sont régis par le droit français, quel que soit le lieu d'utilisation. 
                En cas de contestation éventuelle, et après l'échec de toute tentative 
                de recherche d'une solution amiable, les tribunaux français seront seuls compétents.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Assurance professionnelle</h2>
            <div className={styles.content}>
              <p>
                BR16BATIMENT est couvert par une assurance responsabilité civile 
                professionnelle et décennale conformément à la réglementation en vigueur 
                pour les activités de construction.
              </p>
              <p>
                Les références de l'assurance peuvent être communiquées sur demande.
              </p>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Médiation</h2>
            <div className={styles.content}>
              <p>
                En cas de litige, vous pouvez recourir à la médiation de la consommation. 
                Le médiateur de la consommation compétent est :
              </p>
              <p>
                <strong>Médiateur de la Fédération Française du Bâtiment</strong><br />
                33 avenue Kléber<br />
                75784 Paris Cedex 16<br />
                Email : mediation@ffbatiment.fr
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
