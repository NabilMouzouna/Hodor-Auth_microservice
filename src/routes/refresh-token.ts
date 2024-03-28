import { Router } from "express";
import RefreshToken  from "../controllers/refreshToken";
const router = Router()

router.get('/', RefreshToken)
export default router