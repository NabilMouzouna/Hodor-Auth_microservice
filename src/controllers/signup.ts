import User from '../models/User';
import axios from "axios"
import { genSaltSync, hashSync } from 'bcryptjs';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { getUser, setUser } from '../libs/InteractionWithUserServer';
import { SuccessResponseType } from '../types/response';



const SignUp = async (req: Request, res: Response) => {
  try {
    const {username , email, password, profilePicture} = req.body;
    
    const salt = genSaltSync(10)
    const hash = hashSync(password,salt)
    
    const response = await setUser({username, email, password : hash, profilePicture}) // this function creates the User and return it on success
    if(!response) return res.status(501).json({error : 'User already exists'})
    
    return res.status(200).json(response)
    }
    catch (error) {
      console.log(error)
      res.json(error)
    }
  }

  export default SignUp