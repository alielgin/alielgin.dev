import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const tutorials = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/CLAUDE.md'], base: './src/content/tutorials' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    cover: z.string().url().optional(), // R2 URL
    topics: z.array(z.string()).optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { tutorials };
