import { Request, Response } from "express"
import User from "../models/User"
import { genSaltSync, hashSync } from "bcryptjs"
export const GetAllUsers = async(req : Request,res : Response) => { 
    try {
        const users = await User.find()
        res.status(200).json({
            message : "these are all available users",
            users
        })
    } catch (error) {res.status(400).json(error)}
 }





export const GetUserById = async (req : Request,res : Response) => { 
    try {
        const user = await User.findById(req.params.userId)
        res.status(200).json({
            message : "user Was found in the database",
            user : {id : user?.id,username : user?.username, email : user?.email, password : user?.password}
        })
    } catch (error) {res.status(400).json(error)}
 }






export const UpdateUserById =async (req : Request,res : Response) => { 
    try {
        const { username, email, password, profilePicture } = req.body
        const salt = genSaltSync(10)
        const hashedPassword = hashSync(password, salt)
        const user = await User.findByIdAndUpdate(req.params.userId,{username, email, password : hashedPassword, profilePicture})
        res.status(200).json({
            message : "user information are updated successfully",
            user : {id :user?.id ,username : user?.username, email : user?.email, password : user?.password}
        })
    } catch (error) {res.status(400).json(error)}
 }




export const DeleteUserById =async (req : Request,res : Response) => { 
    try {
        const user = await User.findByIdAndDelete(req.params.userId)
        res.status(200).json({
            message : `the user ${user?.username} was deleted successfully`,
        })
    } catch (error) {res.status(400).json(error)}
 }