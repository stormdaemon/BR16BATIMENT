import Generator from 'react-router-sitemap-generator';
import Router from './src/Router'; // ajustez le chemin vers votre router

const generator = new Generator(
  'https://br16batiment.netlify.app', // remplacez par votre URL
  Router(),
  {
    lastmod: new Date().toISOString().slice(0, 10),
    changefreq: 'monthly',
    priority: 0.8,
  }
);

generator.save('public/sitemap.xml');
