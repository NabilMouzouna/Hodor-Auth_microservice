import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import passport from 'passport';
import User from '../models/User';
import { config } from 'dotenv';
import { userType } from '../types/user';
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
      const response : userType = {
        userId : user.id,
        email : user.email,
        username : user.username,
        profilePicture : user.profilePicture || "",
      }
      return done(null, response);
    } else {
      return done(null, false);
    }
  }),
);


export default passport;
