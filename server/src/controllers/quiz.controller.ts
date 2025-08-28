import { Request, Response } from 'express';
import Quiz from '../models/Quiz';
import { createQuiz, updateQuiz } from '../validators/quiz';

export async function list(req: Request, res: Response) {
  const items = await Quiz.find().sort({ dueDate: 1 });
  res.json(items);
}
export async function create(req: Request, res: Response) {
  const data = createQuiz.parse(req.body);
  const item = await Quiz.create(data);
  res.status(201).json(item);
}
export async function update(req: Request, res: Response) {
  const data = updateQuiz.parse(req.body);
  const item = await Quiz.findByIdAndUpdate(req.params.id, data, { new: true });
  res.json(item);
}
export async function remove(req: Request, res: Response) {
  await Quiz.findByIdAndDelete(req.params.id);
  res.status(204).end();
}
