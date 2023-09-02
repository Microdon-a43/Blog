import { body } from 'express-validator';

export const registerValidation = [
  body('username', 'Логин должен состоять минимум из 4 символов').isLength({
    min: 4,
  }),
  body('password', 'Пароль должнен состоять минимум из 4 символов').isLength({
    min: 4,
  }),
];

export const loginValidation = [
  body('password', 'Пароль должнен состоять минимум из 4 символов').isLength({
    min: 4,
  }),
  body('username', 'Логин должен состоять минимум из 4 символов').isLength({
    min: 4,
  }),
  body('avatar', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'Введите заголовок поста')
    .isLength({
      min: 4,
    })
    .isString(),
  body('category', 'Выберите категорию').exists(),
  body('description', 'Введите текст поста').isLength({ min: 15 }).isString(),
  body('picture', 'Неверная ссылка на картинку').optional().notEmpty(),
];
