import { Request, Response } from "express"
import User from "../models/User"
import { genSaltSync, hashSync } from "bcryptjs"
import { SuccessResponseType } from "../types/response"
import { userType } from "../types/user"
export const GetAllUsers = async(req : Request,res : Response) => { 
    try {
        const users : userType[] = await User.find()
        // @ts-ignore 
        const usersInfo = users.map(user => ({userId: user.id, username: user.username, email: user.email, profilePicture: user.profilePicture}))
        return res.status(200).json({
            message : "Registered users",
            usersInfo
        })
    } catch (error) {return res.status(400).json(error)}
 }





export const GetUserById = async (req : Request,res : Response) => { 
    try {
        const user = await User.findById(req.params.userId)
        const response : SuccessResponseType = {
            message : "user was found in the database",
            user : {userId : user?.id,username : user!.username, email : user!.email, profilePicture : user!.profilePicture || ""}
        }
        return res.status(200).json(response)
    } catch (error) {return res.status(400).json(error)}
 }






export const UpdateUserById =async (req : Request,res : Response) => { 
    try {
        const { username, email, password, profilePicture } = req.body
        const salt = genSaltSync(10)
        const hashedPassword = hashSync(password, salt)
        const user = await User.findByIdAndUpdate(req.params.userId,{username, email, password : hashedPassword, profilePicture})
        const response : SuccessResponseType = {
            message : "user information are updated successfully",
            user : {userId :user!.id ,username : user!.username, email : user!.email, profilePicture : user!.profilePicture || ""}
        }
        return res.status(200).json(response)
    } catch (error) {return res.status(400).json(error)}
 }




export const DeleteUserById =async (req : Request,res : Response) => { 
    try {
        const user = await User.findByIdAndDelete(req.params.userId)
        return res.status(200).json({
            message : `the user ${user?.username} was deleted successfully`,
        })
    } catch (error) {return res.status(400).json(error)}
 }