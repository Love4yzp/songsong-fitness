import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const learn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/learn' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['philosophy', 'how-it-works', 'cutting', 'bulking']),
    tags: z.array(z.string()).default([]),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().default('好人松松'),
    draft: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

const qa = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/qa' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['stall', 'eating-out', 'hunger', 'alcohol', 'medical', 'myths', 'practical']),
    tags: z.array(z.string()).default([]),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().default('好人松松'),
    draft: z.boolean().default(false),
    symptoms: z.array(z.string()).default([]),
  }),
});

const training = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/training' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['gym-3', 'gym-4-shoulder', 'gym-4-arms', 'home']),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('intermediate'),
    tags: z.array(z.string()).default([]),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string().default('好人松松'),
    draft: z.boolean().default(false),
    equipment: z.array(z.string()).default([]),
    duration: z.string().optional(),
  }),
});

export const collections = { learn, qa, training };
