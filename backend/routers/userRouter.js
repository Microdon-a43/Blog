import express from 'express';
import { userController } from '../controllers/userController.js';
import { registerValidation, loginValidation } from '../validations.js';

export const userRouter = express.Router();

userRouter.post('/register', registerValidation, userController.register);
userRouter.post('/login', loginValidation, userController.login);
userRouter.get('/user', userController.getAuthUser);
userRouter.get('/users', userController.getAllUsers);
