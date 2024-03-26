import User from '../models/User';
import JWT from 'jsonwebtoken';
import { Request, Response, Router } from 'express';
import { genSaltSync, hashSync } from 'bcryptjs';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { username, email, password, profilePicture } = req.body;
  
  const user = await User.findOne({ email });
  if (user) res.status(409).json({ message: `this user ${user.email} already exists` });
  else {
    const salt = genSaltSync(10)
    const hash = hashSync(password,salt)
    const newUser = await User.create({ username, email, password : hash, profilePicture });
    console.log(newUser)
    const token = JWT.sign({id:newUser.id, email :newUser.email,username: newUser.username, profilePicture : newUser.profilePicture},process.env.SECRET_KEY!);
    res.status(200).json({
      message: `this user ${newUser.email} is registered`,
      username,
      email,
      profilePicture,
      token,
    });
  }
});

export default router;
