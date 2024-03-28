import User from '../models/User';
import JWT from 'jsonwebtoken';
import { genSaltSync, hashSync } from 'bcryptjs';
import { Request, Response } from 'express';

const SignUp = async (req: Request, res: Response) => {
    const { username, email, password, profilePicture } = req.body;
    
    const user = await User.findOne({ email });
    if (user) res.status(409).json({ message: `this user ${user.email} already exists` });
    else {
      const salt = genSaltSync(10)
      const hash = hashSync(password,salt)
      const newUser = await User.create({ username, email, password : hash, profilePicture });
      const token = JWT.sign({id:newUser.id, email :newUser.email,username: newUser.username, profilePicture : newUser.profilePicture},process.env.SECRET_KEY!,{expiresIn: "5min"});
      const refreshToken = JWT.sign({id:user!.id, email :user!.email},process.env.REFRESH_SECRET_KEY!,{expiresIn: "7d"})
        try {
          await User.findByIdAndUpdate(user!.id,{token : refreshToken})
          res.cookie("jwt",refreshToken, {httpOnly: true, maxAge:7 * 24 * 60 * 60 * 1000})
          res.status(200).json({
            message: `this user ${newUser.email} is registered`,
            user : {userId : newUser.id,username, email, profilePicture},
            token
          });
        } catch (error) {
          res.status(500).json(error)
        }
    }
  }

  export default SignUp