import express from 'express';
import { userController } from '../controllers/userController.js';
import { isAdmin } from '../middlewares/isAdmin.js';
import { registerValidation, loginValidation } from '../validations.js';

export const userRouter = express.Router();

userRouter.post('/register', registerValidation, userController.register);
userRouter.post('/login', loginValidation, userController.login);
userRouter.get('/user', userController.getAuthUser);
userRouter.get('/users', isAdmin(['ADMIN']), userController.getAllUsers);
