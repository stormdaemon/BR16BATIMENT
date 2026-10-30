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
    includes: z.array(z.string()).min(3),
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
