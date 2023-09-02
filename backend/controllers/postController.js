import { validationResult } from 'express-validator';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';

export const postController = {
  createPost: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }
      const newPost = await Post.create({
        ...req.body,
        userID: req.user._id,
        author: req.user.username,
      });
      if (!newPost)
        return res.status(400).json({
          message: 'При создании поста произошла непредвиденная ошибка',
        });

      return res.json({
        message: 'Пост создан успешно',
        newPost,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getOnePost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);

      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { views: 1 },
        }
      );
      if (!post)
        return res.status(404).json({
          message: 'Пост не найден',
        });
      return res.json({
        message: 'Пост найден',
        post,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find();

      !posts
        ? res.status(404).json({ message: 'Посты не найден' })
        : res.json({ message: 'Запрос выполнен успешно', posts });
    } catch (error) {
      console.log(error);
    }
  },
  getPostsById: async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: 'Пользователь не найден',
      });
    }
    const posts = await Post.find({ userID: user._id });
    if (!posts) {
      return res.status(404).json({
        message: 'У вас еще нет постов',
      });
    }
    return res.status(200).json({
      message: 'Посты найдены',
      posts,
    });
  },
  updatePost: async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(
        { _id: req.params.id },
        {
          title: req.body.title,
          category: req.body.category,
          description: req.body.description,
          picture: req.body.picture,
        }
      );
      !post
        ? res.status(400).json({
            message: 'Пост не был обновлен',
          })
        : res.status(200).json({
            message: 'Пост был успешно обновлен',
            post,
          });
    } catch (error) {
      console.log(error);
    }
  },

  deletePost: async (req, res) => {
    try {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
      !deletedPost
        ? res.status(404).json({
            message:
              'В процессе удаления поста возникла ошибка. Возможно, Ваш пост был удален ранее',
          })
        : res.json({
            message: 'Пост был успешно удален',
            deletedPost,
          });
    } catch (error) {
      console.log(error);
    }
  },
  likePost: async (req, res) => {
    const likedPost = await Post.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $push: { likes: req.user._id },
      }
    );
    if (!likedPost)
      return res.status(400).json({
        message: 'Возникла непредвиденная ошибка',
      });
    return res.status(200).json({
      message: 'Вы успешно лайкнули пост',
      likedPost,
    });
  },
};
