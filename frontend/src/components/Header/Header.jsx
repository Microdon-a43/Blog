import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import avatar from '../../assets/postsImages/avatar.svg';
import { Button } from '../Button/Button';
import cls from './Header.module.scss';
import arrowSvg from '../../assets/profile-arrow.svg';
import { useState } from 'react';
import { logout } from '../../store/actions/authAction';

export const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const openMenu = () => {
    setIsOpen(!isOpen);
  };
  const exit = (e) => {
    const confirmLogout = window.confirm('Вы уверены, что хотите выйти?');
    console.log(confirmLogout);
    if (!confirmLogout) {
      return null
    } else {
      confirmLogout && dispatch(logout({ type: 'AUTH', user: '' }));
    }
  };

  return (
    <header className={cls.header}>
      <div className="container">
        <div className={cls.wrapper}>
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          {user ? (
            <>
              <div className={cls.userpanel}>
                <Button to="/addpost">Добавить пост</Button>
                <img src={avatar} alt="avatar" className={cls.avatar} />
                <Link className={cls.profile_link} onClick={openMenu}>
                  {user.username}
                  {isOpen && (
                    <ul className={`${cls.userMenu} ${isOpen && cls.active}`}>
                      <li className={cls.profile}>
                        <Link to={'/profile'}>Профиль</Link>
                      </li>
                      <li className={cls.edit}>
                        <Link to="/myPosts">Мои блоги</Link>
                      </li>
                      <li className={cls.favourite}>
                        <Link to="/favourite">Избранное</Link>
                      </li>
                      <li className={cls.logout} onClick={exit}>
                        <Link to="/">Выйти</Link>
                      </li>
                    </ul>
                  )}
                </Link>
              </div>
            </>
          ) : (
            <div className={cls.buttons}>
              <Button to="/login">Войти</Button>
              <Button to="/register" outline="outline">
                Регистрация
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
