import { Router } from 'express';
import Login from '../controllers/login';
const router = Router();

router.post('/', Login);

export default router;
