import { Request, Response } from "express";
import User from "../models/User";


const Logout = async(req : Request, res : Response) => { 
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(200).json({message : "user is already logged out"});
    const refreshToken = cookies.jwt;
    const foundUser = await User.findOne({ token: refreshToken });
    if(!foundUser) return res.clearCookie("jwt",{httpOnly: true, maxAge:7 * 24 * 60 * 60 * 1000}).status(200).json({message : "successfully logged out"});

    try {
        await foundUser.updateOne({ token : ""})
        return res.clearCookie("jwt",{httpOnly: true, maxAge:7 * 24 * 60 * 60 * 1000}).status(200).json({message : "logged out successfully"})
    } catch (error) {
        return res.status(404).json({message : "there was an error, please try again"})
    }
}

export default Logout