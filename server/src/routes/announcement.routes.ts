import { Router } from 'express';
import * as ctrl from '../controllers/announcement.controller';

const router = Router();
router.get('/', ctrl.list);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);
export default router;
