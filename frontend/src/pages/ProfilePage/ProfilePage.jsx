import React from 'react';
import { Title } from '../../components/Title/Title';
import cls from './Profile.module.scss';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);

  // const actualName = user.username;
  // console.log(actualName);

  return (
    <div className="container">
      <div className={cls.wrapper}>
        <Title className={cls.title}>Personal Information</Title>
        <div className={cls.info}>
          <div className={cls.userInfo}>
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
