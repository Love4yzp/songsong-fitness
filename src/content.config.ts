import { defineCollection, z } from 'astro:content';

const learn = defineCollection({
  type: 'content',
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
  type: 'content',
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
  type: 'content',
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

const food = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['protein', 'carb', 'fat', 'vegetable', 'fruit', 'other']),
    nutritionRate: z.number(),
    tags: z.array(z.string()).default([]),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    aliases: z.array(z.string()).default([]),
  }),
});

export const collections = { learn, qa, training, food };
