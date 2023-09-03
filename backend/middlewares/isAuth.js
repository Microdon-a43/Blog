import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const isAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    if (!token)
      return res.status(401).json({
        message:
          'Вы не были авторизованы',
      });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, result) => {
      if (err)
        return res.status(401).json({
          message: 'Вы не были авторизованы.',
          err,
        });
      const user = await User.findOne({ _id: result.id });
      if (!user)
        res.status(401).json({
          message: 'Зарегистрируйтесь',
        });
      req.user = user;
      next();
    });
  } catch (error) {
    console.log(error);
  }
};
