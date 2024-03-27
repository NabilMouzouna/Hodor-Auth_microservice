import { Request, Response } from "express";

const VerifyToken = (req:Request<{}, any, any, any, Record<string, any>>, res : Response<any>) => {
    if (req.isAuthenticated()) {
      res.status(200).json({ user: req.user });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
export default VerifyToken