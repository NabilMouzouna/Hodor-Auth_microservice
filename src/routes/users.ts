//!TODO: this Route must be Protected

import { Router } from "express";
import { DeleteUserById, GetAllUsers, GetUserById, UpdateUserById } from "../controllers/users";

const router = Router()

// Get user by id
router.get('/:userId',GetUserById)


// Update user selected by id
router.put('/:userId',UpdateUserById)


// Delete user selected by id (for developers only)
router.delete('/:userId',DeleteUserById)


// Get All users
router.get('/',GetAllUsers)

export default router