//!TODO : implement REFRESH Token
import express, { Express, Request, Response } from 'express';
import { loginRoute,signupRoute,auth,logOutRoute, cors, config, cookieParser} from "./libs/manage-Import"
import connectDB from './libs/connectDB';
config()

// Variables
const app: Express = express();

const PORT = process.env.PORT || 7001;

// Middlewares
app.use(express.json());
app.use(cookieParser())
app.use(cors({credentials : true}))
app.use("/signup", signupRoute)
app.use('/login', loginRoute);
app.use('/auth', auth);
app.use("/logout", logOutRoute)


app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Nuble Authentication!');
});

app.listen(PORT, () => {
  const message = [`\n\t✅\u001b[1m Server is Running at\u001b[0m`,`\x1b[34mhttp://localhost:${PORT}\x1b[0m\n`];
  connectDB()
  console.log(...message);
});
