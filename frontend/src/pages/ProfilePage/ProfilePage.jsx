import React from 'react';
import { Title } from '../../components/Title/Title';
import cls from './Profile.module.scss';
import { Button } from '../../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/actions/authAction';
import { AuthModal } from '../../components/Modal/AuthModal';

export const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="container">
      <AuthModal />
      <div className={cls.wrapper}>
        <Title className={cls.title}>Personal Information</Title>
        <div className={cls.info}>
          <div className={cls.user}>
            <strong>Username:</strong>
            <div className={cls.area}></div>
          </div>
          <div className={cls.roles}>
            <strong>Roles:</strong>
            <div className={cls.area}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
