import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { LegalNotice } from './pages/LegalNotice';
import { PrivacyPolicy } from './pages/PrivacyPolicy';

// Ce fichier centralise la configuration des routes pour l'application.
// Il est utilisé par App.tsx pour créer les routes et par sitemap.ts pour générer le sitemap.
export const routes = [
  { path: '/', component: Home, exact: true },
  { path: '/a-propos', component: About },
  { path: '/services', component: Services },
  { path: '/contact', component: Contact },
  { path: '/mentions-legales', component: LegalNotice },
  { path: '/politique-confidentialite', component: PrivacyPolicy },
];
