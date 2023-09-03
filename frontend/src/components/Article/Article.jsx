import cls from './Article.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { Title } from '../Title/Title';
import Option from '../../assets/option.svg';
import { useState } from 'react';

export const Article = ({
  title,
  description,
  createdAt,
  id,
  onDeletePost,
  onOpenEditor,
}) => {
  const [showOperations, setShow] = useState(false);

  const onShowOperations = () => {
    setShow(!showOperations);
  };

  const onCloseOperations = () => {
    setShow(false);
  };

  return (
    <div className={cls.article}>
      <div className={cls.article_top}>
        <Link to={id}>
          <Title className={cls.title}>
            {title}
          </Title>
        </Link>
        <div onFocus={onShowOperations} onBlur={onCloseOperations} tabIndex={0}>
          <img src={Option} alt="Option" />
          <ul className={`${cls.modal} ${showOperations && cls.active}`}>
            <li className={cls.delete} onMouseDown={() => onDeletePost(id)}>
              <Link>Удалить</Link>
            </li>
            <li className={cls.edit} onMouseDown={() => onOpenEditor(id)}>
              <Link>Редактировать</Link>
            </li>
            <li className={cls.share}>
              <Link>Поделиться</Link>
            </li>
          </ul>
        </div>
      </div>
      <span>{createdAt}</span>
      <p className={cls.text}>
        {description.length > 100 ? description.slice(0, 300) + '...' : description}
      </p>
    </div>
  );
};
