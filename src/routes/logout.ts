import { Router } from "express";
import LogOut from "../controllers/logout"
const router = Router()
router.get("/",LogOut)

export default router