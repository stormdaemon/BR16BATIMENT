import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faq = z.array(z.object({ q: z.string(), a: z.string() })).default([]);

const sources = z
  .array(z.object({ label: z.string(), url: z.url(), date: z.string().optional() }))
  .default([]);

// Limites issues des contrôles qualité SEO : au-delà, Google tronque.
const seo = {
  title: z.string().min(30).max(60),
  description: z.string().min(120).max(160),
  h1: z.string(),
  answer: z.string().min(120),
  updated: z.coerce.date(),
};

const services = defineCollection({
  loader: glob({ base: './src/content/services', pattern: '*.md' }),
  schema: z.object({
    ...seo,
    label: z.string(),
    order: z.number(),
    // Autres noms du service, ceux qu'emploient les clients : repris dans les données structurées.
    names: z.array(z.string()).default([]),
    // Chaque page part du problème du client et dit ce que l'entreprise y fait.
    problems: z.array(z.object({ problem: z.string(), solution: z.string() })).min(3),
    includes: z.array(z.string()).min(3),
    // Ce qui atteste ce métier en particulier : un fait vérifiable, jamais un avis inventé.
    proof: z.string(),
    // Ce que l'entreprise ne fait pas : à dire avant que le client n'appelle.
    limits: z.array(z.string()).default([]),
    guides: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
    faq,
    sources,
  }),
});

const zones = defineCollection({
  loader: glob({ base: './src/content/zones', pattern: '*.md' }),
  schema: z.object({
    ...seo,
    name: z.string(),
    kind: z.enum(['commune', 'departement']),
    faq,
    sources,
  }),
});

const guides = defineCollection({
  loader: glob({ base: './src/content/guides', pattern: '*.md' }),
  schema: z.object({
    ...seo,
    label: z.string(),
    service: z.string(),
    published: z.coerce.date(),
    faq,
    sources: sources.refine((s) => s.length >= 2, 'Un guide cite au moins deux sources.'),
  }),
});

export const collections = { services, zones, guides };
