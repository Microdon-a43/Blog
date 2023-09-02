import Post from '../models/postModel.js';

export const likesCheck = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (post.likes.includes(req.user._id)) return res.status(403).json({
      message: 'Вы уже лайкали этот пост',
    });
  next();
};
