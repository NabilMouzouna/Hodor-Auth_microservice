import User from '../models/User';
import JWT from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import { Request, Response } from 'express';
import { SuccessResponseType } from '../types/response';
import { getUserWithQueryParams } from '../libs/InteractionWithUserServer';

const Login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const data = await getUserWithQueryParams(email);
    if (!data?.user) res.status(409).json({ message: `this email : ${email} not found Please register first` });
    else {
      if(!compareSync(password,data.user.password!)) res.status(405).json({message:"password mismatch"})
      else {
        const accessToken = JWT.sign({id:data.user.userId, email :data.user.email,username: data.user.username, profilePicture : data.user.profilePicture},process.env.SECRET_KEY!,{expiresIn: "5min"})
        const refreshToken = JWT.sign({id:data.user.userId, email :data.user.email},process.env.REFRESH_SECRET_KEY!,{expiresIn: "7d"})

        try {
          await User.findByIdAndUpdate(data.user.userId,{token : refreshToken})
          const response : SuccessResponseType = {
            message : "logged in successfully",
            user : {userId : data.user.userId,username : data.user.username, email: data.user.email, profilePicture: data.user.profilePicture || ""},
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