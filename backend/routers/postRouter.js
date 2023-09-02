import Router from 'express';
import { postController } from '../controllers/postController.js';
import { hasRights } from '../middlewares/hasRights.js';
import { isAuth } from '../middlewares/isAuth.js';
import { likesCheck } from '../middlewares/likesCheck.js';
import { postCreateValidation } from '../validations.js';

export const postRouter = new Router();

postRouter.post('/createPost', isAuth, postCreateValidation, postController.createPost);
postRouter.get('/posts', postController.getAllPosts);
postRouter.get('/posts/:id', postController.getPostsById);
postRouter.get('/post/:id', postController.getOnePost);
postRouter.patch('/posts/:id', isAuth, hasRights(['ADMIN']), postController.updatePost);
postRouter.delete('/posts/:id', isAuth, hasRights(['ADMIN']), postController.deletePost);
postRouter.patch('/post/:id', isAuth, likesCheck, postController.likePost);

