//!TODO : implement REFRESH Token
import express, { Express, Request, Response } from 'express';
import { loginRoute,signupRoute,verifyTokenRoute,userRoute,logOutRoute, refreshToken, cors, config, cookieParser} from "./libs/manage-Import"
import connectDB from './libs/connectDB';

// Variables
const app: Express = express();
config()
connectDB()
const PORT = process.env.PORT || 8001;

// Middlewares
app.use(express.json());
app.use(cookieParser())
app.use(cors({credentials : true}))
app.use("/signup", signupRoute)
app.use('/login', loginRoute);
app.use('/check-auth', verifyTokenRoute);
app.use('/refresh-token',refreshToken );
app.use("/users", userRoute)
app.use("/logout", logOutRoute)


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Nuble Authentication!');
});

app.listen(PORT, () => {
  const message = `\n\t->\x1b[33m Server is Running at\x1b[0m \x1b[34mhttp://localhost:${PORT}\x1b[0m\n`;
  console.log(message);
});
