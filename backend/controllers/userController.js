import User from '../models/userModel.js';
import Role from '../models/roleModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1h',
  });
};

export const userController = {
  register: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
      }

      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (user)
        return res.json({
          message: 'Пользователь с таким именем уже существует!',
        });
      if (password.length < 4)
        return res.json({
          message: 'Пароль должен состоять как минимум из 4 символов',
        });
      const hashedPassword = await bcrypt.hash(password, 8);
      const userRole = await Role.findOne({ value: 'USER' });
      const newUser = await User.create({
        ...req.body,
        password: hashedPassword,
        roles: [userRole.value],
      });

      !newUser
        ? res.json({ message: 'При создании пользователя произошла ошибка' })
        : res.json({ message: 'Пользователь создан успешно', newUser });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: 'Ошибка при регистрации',
      });
    }
  },
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user)
        return res
          .status(401)
          .json({ message: 'Неверное имя пользователя или пароль' });

      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck)
        return res
          .status(401)
          .json({ message: 'Неверный имя пользователя или пароль' });

      const accessToken = generateAccessToken(user._id, user.roles);

      const refreshToken = jwt.sign(
        { id: user._id, password: user.password },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: '60d',
        }
      );

      res.cookie('refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json({
        message: 'Вы успешно авторизовались 😊 👌',
        user,
        accessToken,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: 'Ошибка при авторизации',
      });
    }
  },
  getAuthUser: async (req, res) => {
    try {
      const myToken = req.cookies.refreshToken;
      if (!myToken)
        return res.status(401).json({
          message: 'Вы не авторизованы!',
        });

      jwt.verify(
        myToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, result) => {
          if (err)
            return res.status(401).json({
              message: 'Вы не авторизованы!',
            });

          const user = await User.findById({ _id: result.id });
          if (!user)
            return res.status(401).json({
              message: 'Такого пользователя не существует!',
            });

          const accessToken = generateAccessToken(user._id, user.roles);

          return res.json({ user, accessToken });
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  },
};
