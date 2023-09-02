import React from 'react';
import cls from './Input.module.scss';

export const Input = ({
  type = '',
  value,
  placeholder,
  id,
  onChange,
  accept,
  name,
  className = '',
}) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      accept={accept}
      placeholder={placeholder}
      onChange={onChange}
      name={name}
      className={`${cls.field} ${className}`}
    />
  );
};
