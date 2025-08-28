import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const SECRET = process.env.JWT_SECRET || 'dev-secret';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const hdr = req.headers.authorization;
  if (!hdr?.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
  try {
    jwt.verify(hdr.slice(7), SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
}
