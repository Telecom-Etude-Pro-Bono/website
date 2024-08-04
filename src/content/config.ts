import { defineCollection, z } from 'astro:content';
import { partners } from '../web-data/externals/links';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    author: z.string(),
    image: z.string(),
    type: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
  }),
});

const quoteCollection = defineCollection({
  type: 'content',
  schema: z.object({
    text: z.string(),
    author: z.string(),
    function: z.string(),
    img: z.string(),
  }),
});



export const collections = {
  blog: blogCollection,
  quote: quoteCollection,
};
