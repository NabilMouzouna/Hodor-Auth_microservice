import { Router } from "express";
import passport from "../middlewares/passport-jwt";
import VerifyToken from "../controllers/check-auth";
import RefreshToken from "../controllers/refreshToken";
const router = Router();

router.get(
  "/verify-token",
  passport.authenticate("jwt", { session: false }),
  VerifyToken
);
router.get('/refresh-token', RefreshToken)
export default router;