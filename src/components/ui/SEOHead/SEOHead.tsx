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
  ogImage = "/og-image.png",
  ogType = "website",
  canonicalUrl,
  noIndex = false
}) => {
  const fullTitle = `${title} | BR16BATIMENT - Charpentier professionnel en Charente`;
  const baseUrl = "https://br16batiment.com";

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
      <meta name="geo.position" content="45.50348;0.03990" />
      <meta name="ICBM" content="45.50348, 0.03990" />
    </>
  );
};
