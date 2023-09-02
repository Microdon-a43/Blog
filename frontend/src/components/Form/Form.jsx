import React from 'react'

export const Form = ({onSubmit, className, children}) => {
  return (
    <form onSubmit={onSubmit} className={className || ''}>{children}</form>
  )
}
