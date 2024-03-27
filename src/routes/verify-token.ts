import { Router } from "express";
import passport from "../middlewares/passport-config";
import VerifyToken from "../controllers/verify-token";
const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  VerifyToken
);

export default router;