import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import passport from 'passport';
import User from '../models/User';
import { config } from 'dotenv';
config()


const secret = process.env.SECRET_KEY!
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret
};

passport.use(
  new Strategy(options,async (payload, done) => {
    const user =await User.find({email:payload.email});
    if (user) {
      console.log(user)
      return done(null, user);
    } else {
      return done(null, false);
    }
  }),
);


export default passport;
