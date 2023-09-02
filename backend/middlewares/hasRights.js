import User from '../models/userModel.js';
import Post from '../models/postModel.js';

export const hasRights = async (req, res, next) => {

  const post = await Post.findById(req.params.id);
  const postAuthorId = String(post.userID);
  const user = await User.findById(req.user._id);
  const userId = String(user._id);

  if (postAuthorId !== userId)
    return res.status(403).json({
      message:
        'Доступ запрещен. Удалять или редактировать посты могут лишь администраторы и авторы постов',
    });

  next();
};
