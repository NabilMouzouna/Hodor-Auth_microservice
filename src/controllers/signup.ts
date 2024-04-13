import User from '../models/User';
import axios from "axios"
import { genSaltSync, hashSync } from 'bcryptjs';
import { Request, Response, response } from 'express';
import { sign } from 'jsonwebtoken';



const SignUp = async (req: Request, res: Response) => {
    const { username, email, password, profilePicture } = req.body;
    
    const user = await User.findOne({ email });
    if (user) res.status(409).json({ message: `this user ${user.email} already exists` });

    else {
      const salt = genSaltSync(10)
      const hash = hashSync(password,salt)

      const token = sign({username, email, profilePicture},process.env.SECRET_KEY!,{expiresIn: "5min"});
      const refreshToken = sign({username, email, profilePicture},process.env.REFRESH_SECRET_KEY!,{expiresIn: "7d"})

      const userToBeSaved = { username, email, password : hash, profilePicture, token : refreshToken }
      
        try {

          const response = await axios.post(`${process.env.USER_MANAGER_URL!}/users`,userToBeSaved)

          if(!response.data.user) res.status(500).json("no data was returned")
          
          res.cookie("jwt",refreshToken, {httpOnly: true, maxAge:7 * 24 * 60 * 60 * 1000})
          res.setHeader("authorization", "Bearer " + token)
          res.json(response.data)

        } catch (error) {
          console.log(error)
          res.json(error)
        }
    }
  }

  export default SignUp