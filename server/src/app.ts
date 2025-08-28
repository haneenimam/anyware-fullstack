import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import announcementRoutes from './routes/announcement.routes';
import quizRoutes from './routes/quiz.routes';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middleware/error';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/health', (_, res) => res.json({ ok: true }));

app.use('/api/auth', authRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/quizzes', quizRoutes);

app.use(errorHandler);
export default app;
