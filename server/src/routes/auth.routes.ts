import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();
const SECRET = process.env.JWT_SECRET || 'dev-secret';

router.post('/login', (req, res) => {
  const token = jwt.sign({ sub: 'student', role: 'student' }, SECRET, { expiresIn: '12h' });
  res.json({ token });
});
router.post('/logout', (_req, res) => res.json({ ok: true }));
export default router;
