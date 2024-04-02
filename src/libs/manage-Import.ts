import cookieParser from "cookie-parser"
import { config } from 'dotenv';
import mongoose from 'mongoose';
import loginRoute from '../routes/login';
import signupRoute from "../routes/signup"
import userRoute from "../routes/users"
import cors from "cors"
import logOutRoute from "../routes/logout"
import auth from "../routes/auth"
export {
    mongoose,
    loginRoute,
    signupRoute,
    userRoute,
    logOutRoute,
    auth,
    cors,
    config,
    cookieParser
 }