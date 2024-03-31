import cookieParser from "cookie-parser"
import { config } from 'dotenv';
import mongoose from 'mongoose';
import loginRoute from '../routes/login';
import signupRoute from "../routes/signup"
import verifyTokenRoute from "../routes/check-auh"
import userRoute from "../routes/users"
import cors from "cors"
import refreshToken from "../routes/refresh-token"
import logOutRoute from "../routes/logout"
export {
    mongoose,
    loginRoute,
    signupRoute,
    verifyTokenRoute,
    userRoute,
    refreshToken,
    logOutRoute,
    cors,
    config,
    cookieParser
 }