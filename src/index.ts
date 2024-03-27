//!TODO : implement REFRESH Token

import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import loginRoute from './routes/login';
import signupRoute from "./routes/signup"
import verifyTokenRoute from "./routes/verify-token"
import userRoute from "./routes/users"
// Variables
const app: Express = express();
const port = process.env.PORT || 8001;

// Middlewares
app.use(express.json());
app.use("/signup", signupRoute)
app.use('/login', loginRoute);
app.use('/verify-token', verifyTokenRoute);
app.use("/users", userRoute)
try {
  mongoose.connect(process.env.MONGODB_URI!);
  console.log('database connection established');
} catch (error) {
  console.log(error);
}

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Nuble Authentication!');
});

app.listen(port, () => {
  const message = `\n-->\x1b[33m Server is Running at\x1b[0m \x1b[34mhttp://localhost:${port}\x1b[0m\n`;
  console.log(message);
});
