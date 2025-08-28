import { z } from 'zod';

export const createQuiz = z.object({
  title: z.string().min(2),
  course: z.string().min(1),
  topic: z.string().min(2),
  dueDate: z.coerce.date()
});
export const updateQuiz = createQuiz.partial();
