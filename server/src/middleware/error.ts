import { ZodError } from 'zod';
import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({ message: 'Validation failed', issues: err.issues });
  }
  console.error(err);
  res.status(500).json({ message: 'Server error' });
}
