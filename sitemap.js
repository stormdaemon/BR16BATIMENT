"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var routesConfig_1 = require("./src/routesConfig");
var fs_1 = require("fs");
var generateSitemap = function () {
    var baseUrl = 'https://br16batiment.netlify.app';
    var sitemap = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n  ".concat(routesConfig_1.routes
        .map(function (route) {
        return "\n    <url>\n      <loc>".concat(baseUrl).concat(route.path, "</loc>\n      <lastmod>").concat(new Date().toISOString().slice(0, 10), "</lastmod>\n      <changefreq>monthly</changefreq>\n      <priority>0.8</priority>\n    </url>");
    })
        .join(''), "\n</urlset>");
    (0, fs_1.writeFileSync)('public/sitemap.xml', sitemap);
    console.log('Sitemap generated successfully!');
};
generateSitemap();
