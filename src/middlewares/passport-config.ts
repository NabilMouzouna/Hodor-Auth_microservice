import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import passport from 'passport';
import { Request } from 'express';

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_secret_key_here', // Replace with your actual secret key
};

passport.use(
  new Strategy(options, (payload, done) => {
    // Here you would typically query your database to find the user based on the payload information
    // For example, if using Mongoose:
    // User.findById(payload.sub, (err, user) => {
    //   if (err) return done(err, false);
    //   if (user) return done(null, user);
    //   return done(null, false);
    // });
  })
);

export default passport;
