import { Router } from "express";
import passport from "../middlewares/passport-config";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).json({ user: req.user });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
);

export default router;