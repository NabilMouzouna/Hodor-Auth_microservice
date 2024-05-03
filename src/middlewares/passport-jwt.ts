import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import passport from 'passport';
import User from '../models/User';
import { config } from 'dotenv';
import { userType } from '../types/user';
import { SuccessResponseType } from '../types/response';
config()


const secret = process.env.SECRET_KEY!
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

passport.use(
  new Strategy(options,async (payload, done) => {
    const user =await User.findOne({email:payload.email});
    if (user) {
      const userInfo : userType = {
        userId : user.id,
        email : user.email,
        username : user.username,
        profilePicture : user.profilePicture || "",
      }
      const response : SuccessResponseType = {
        message : "Valid token, User is Authenticated",
        user : userInfo
      }
      return done(null, response);
    } else {
      return done(null, false);
    }
  }),
);


export default passport;
