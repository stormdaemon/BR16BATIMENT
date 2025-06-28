"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var Home_1 = require("./pages/Home");
var About_1 = require("./pages/About");
var Services_1 = require("./pages/Services");
var Contact_1 = require("./pages/Contact");
var LegalNotice_1 = require("./pages/LegalNotice");
var PrivacyPolicy_1 = require("./pages/PrivacyPolicy");
// Ce fichier centralise la configuration des routes pour l'application.
// Il est utilisé par App.tsx pour créer les routes et par sitemap.ts pour générer le sitemap.
exports.routes = [
    { path: '/', component: Home_1.Home, exact: true },
    { path: '/a-propos', component: About_1.About },
    { path: '/services', component: Services_1.Services },
    { path: '/contact', component: Contact_1.Contact },
    { path: '/mentions-legales', component: LegalNotice_1.LegalNotice },
    { path: '/politique-confidentialite', component: PrivacyPolicy_1.PrivacyPolicy },
];
