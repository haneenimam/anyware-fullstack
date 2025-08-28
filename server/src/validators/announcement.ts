import { z } from 'zod';

export const createAnnouncement = z.object({
  title: z.string().min(2),
  body: z.string().min(2),
  author: z.string().min(2),
  course: z.string().min(1),
  avatarUrl: z.string().url().optional()
});

export const updateAnnouncement = createAnnouncement.partial();
