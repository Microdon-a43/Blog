import React from 'react';
import cls from './Title.module.scss';

export const Title = ({className, children}) => {
  return <h2 className={`${cls.title} ${className || ''}`}>{children}</h2>;
};
