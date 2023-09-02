import React from 'react';
import cls from './Modal.module.scss';
import closeBtn from '../../assets/btn-delete.svg';

export const AuthModal = ({ message, onClose }) => {
  return (
    <div className={`${cls.messageBox} ${message && cls.active}`}>
      <div className={cls.message}>
        {message}
        <img src={closeBtn} width={20} height={20} alt="close" onClick={onClose}/>
      </div>
    </div>
  );
};
