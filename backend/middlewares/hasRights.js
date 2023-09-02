import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Post from '../models/postModel.js';

export const hasRights = (roles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization;

      const post = await Post.findById(req.params.id);
      const postAuthorId = String(post.userID);
      const user = await User.findById(req.user._id);
      const userId = String(user._id);

      if (!token)
        return res.status(401).json({
          message: 'Вы не были авторизованы',
        });
      const { roles: userRoles} = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      );

      if(userRoles.forEach((role) => roles.includes(role))){
        console.log('1 stage');
        next()
      } else if(postAuthorId === userId) {
        console.log('2 stage');
        next()
      } else {
        console.log('3 stage');
        return res.status(403).json({
          message:
            'Доступ запрещен. Удалять или редактировать посты могут лишь администраторы и авторы постов',
        });
      }
    
      
    } catch (error) {
      console.log(error);
    }
  };
};
