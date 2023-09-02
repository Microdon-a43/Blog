import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Post from '../models/postModel.js';

export const hasRights = (roles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization;

      if (!token)
        return res.status(401).json({
          message: 'Вы не были авторизованы',
        });
      const { roles: userRoles } = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      );

      userRoles.forEach((role) => {
        if (roles.includes(role)) {
          next();
        }
      });

      const post = await Post.findById(req.params.id);
      const postAuthorId = String(post.userID);
      console.log(postAuthorId);
      const user = await User.findById(req.user._id);
      const userId = String(user._id);
      

      if (postAuthorId !== userId) {
        return res.status(403).json({
          message:
            'Доступ запрещен. Удалять или редактировать посты могут лишь администраторы и авторы постов',
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
    }
  };
};
