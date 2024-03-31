import User from '../models/User';
import JWT from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import { Request, Response } from 'express';
import { SuccessResponseType } from '../types/response';

const Login = async (req: Request, res: Response) => {

    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (!user) res.status(409).json({ message: `this email : ${email} not found Please register first` });
  
    else {
      if(!compareSync(password,user.password!)) res.status(405).json({message:"password mismatch"})
      else {
        const accessToken = JWT.sign({id:user.id, email :user.email,username: user.username, profilePicture : user.profilePicture},process.env.SECRET_KEY!,{expiresIn: "5min"})
        const refreshToken = JWT.sign({id:user.id, email :user.email},process.env.REFRESH_SECRET_KEY!,{expiresIn: "7d"})
        try {
          await User.findByIdAndUpdate(user.id,{token : refreshToken})
          const response : SuccessResponseType = {
            message : "logged in successfully",
            user : {userId : user.id,username : user.username, email: user.email, profilePicture: user.profilePicture || ""},
          }
          res.setHeader("authorization", "Bearer " + accessToken)
          res.cookie("jwt",refreshToken, {httpOnly: true, maxAge:7 * 24 * 60 * 60 * 1000})
          return res.status(200).json(response)
        } catch (error) {
          return res.status(500).json(error)
        }
      }
  }
  }

export default Login