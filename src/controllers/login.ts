import User from '../models/User';
import JWT from 'jsonwebtoken';
import { compareSync } from 'bcryptjs';
import { Request, Response } from 'express';

const Login = async (req: Request, res: Response) => {

    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (!user) res.status(409).json({ message: `this email : ${email} not found Please register first` });
  
    else {
      if(!compareSync(password,user.password!)) res.status(405).json({message:"password mismatch"})
      else {
        const token = JWT.sign({id:user.id, email :user.email,username: user.username, profilePicture : user.profilePicture},process.env.SECRET_KEY!)
          res.status(200).json({
            message : "logged in successfully",
            user : {userId : user.id,username : user.username, email: user.email, profilePicture: user.profilePicture},
            token
          })
      }
  }
  }

export default Login