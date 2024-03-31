import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

const RefreshToken = async (req: Request, res: Response) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(401);
        
        const refreshToken = cookies.jwt;
        const foundUser = await User.findOne({ token: refreshToken });
        
        if (!foundUser || !foundUser.username || !foundUser.id || !foundUser.email) {
            return res.sendStatus(403);
        }

        jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY!, (err: any, decoded: any) => {
            if (err || !decoded) {
                return res.sendStatus(403);
            }

            const accessToken = jwt.sign(
                { id: foundUser.id, email: foundUser.email, username: foundUser.username, profilePicture: foundUser.profilePicture },
                process.env.SECRET_KEY!,
                { expiresIn: "5min" }
            );
            res.setHeader("authorization", "Bearer " + accessToken)
            return res.status(200).json({accessToken});
        });
    } catch (error) {
        console.error("Error handling refresh token:", error);
        return res.sendStatus(500);
    }
};

export default RefreshToken