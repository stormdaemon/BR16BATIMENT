import React from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = "charpentier, charpente, construction, rénovation, artisan, bois, Charente, Champagne-Vigny",
  ogImage = "/logo.png",
  ogType = "website",
  canonicalUrl,
  noIndex = false
}) => {
  const fullTitle = `${title} | BR16BATIMENT - Charpentier professionnel en Charente`;
  const baseUrl = "https://br16batiment.fr"; // À adapter selon le domaine final

  return (
    <>
      {/* Titre et description */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {!noIndex && <meta name="robots" content="index, follow" />}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={`${baseUrl}${canonicalUrl}`} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={`${baseUrl}${ogImage}`} />
      <meta property="og:url" content={`${baseUrl}${canonicalUrl || ''}`} />
      <meta property="og:site_name" content="BR16BATIMENT" />
      <meta property="og:locale" content="fr_FR" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${ogImage}`} />
      
      {/* Informations entreprise */}
      <meta name="author" content="BR16BATIMENT - Raphaël Bardan" />
      <meta name="company" content="BR16BATIMENT" />
      <meta name="geo.region" content="FR-16" />
      <meta name="geo.placename" content="Champagne-Vigny" />
      <meta name="geo.position" content="45.8167;0.2833" />
      <meta name="ICBM" content="45.8167, 0.2833" />
      
      {/* Données structurées pour l'entreprise locale */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "BR16BATIMENT",
          "description": "Spécialiste en travaux de charpente et construction bois en Charente",
          "url": baseUrl,
          "telephone": "+33",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "3 Les Vignes de Chez Rullier",
            "addressLocality": "Champagne-Vigny",
            "postalCode": "16250",
            "addressCountry": "FR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 45.8167,
            "longitude": 0.2833
          },
          "openingHours": "Mo-Fr 08:00-18:00",
          "priceRange": "€€",
          "founder": {
            "@type": "Person",
            "name": "Raphaël Bardan"
          },
          "foundingDate": "2017-11-10",
          "areaServed": {
            "@type": "State",
            "name": "Charente"
          },
          "serviceType": "Travaux de charpente",
          "hasCredential": {
            "@type": "EducationalOccupationalCredential",
            "credentialCategory": "Artisan"
          }
        })}
      </script>
    </>
  );
};
