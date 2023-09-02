import React from 'react';
import cls from './Button.module.scss';
import { Link } from 'react-router-dom'

export const Button = ({to, max, outline, children}) => {
    return (
        <>
        {
            to ? <Link to={to} className={`${cls.btn} ${max && cls.max} ${cls[outline]}`}>{children}</Link>
               : <button className={`${cls.btn} ${max && cls.max} ${cls[outline]}`} type='submit'>{children}</button>
        }
        </>
    )
}
