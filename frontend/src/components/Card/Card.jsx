import React from 'react'
import cls from './Card.module.scss'

export const Card = ({className, children}) => {
  return (
    <div className={`${cls.card} ${className || ""}`}>{children}</div>
  )
}
