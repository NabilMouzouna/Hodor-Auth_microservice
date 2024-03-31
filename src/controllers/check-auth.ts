import { Request, Response } from "express";

const VerifyToken = (req:Request<{}, any, any, any, Record<string, any>>, res : Response<any>) => res.status(200).json({ user: req.user });
  
export default VerifyToken