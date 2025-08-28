import { Request, Response } from 'express';
import Announcement from '../models/Announcement';
import { createAnnouncement, updateAnnouncement } from '../validators/announcement';

export async function list(req: Request, res: Response) {
  const { q } = req.query as { q?: string };
  const filter = q ? { $text: { $search: q } } : {};
  const items = await Announcement.find(filter).sort({ createdAt: -1 });
  res.json(items);
}
export async function create(req: Request, res: Response) {
  const data = createAnnouncement.parse(req.body);
  const item = await Announcement.create(data);
  res.status(201).json(item);
}
export async function update(req: Request, res: Response) {
  const data = updateAnnouncement.parse(req.body);
  const item = await Announcement.findByIdAndUpdate(req.params.id, data, { new: true });
  res.json(item);
}
export async function remove(req: Request, res: Response) {
  await Announcement.findByIdAndDelete(req.params.id);
  res.status(204).end();
}
