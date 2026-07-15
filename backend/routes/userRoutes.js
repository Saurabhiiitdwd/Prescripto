import express from 'express'
import { registerUser, loginUser } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import { getProfile } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/get-profile', authUser, getProfile);

export default userRouter;