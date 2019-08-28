import React from 'react'
import { ITodo } from './todosSlice';

export const Todo: React.FC<ITodo> = ({ text }) => {
  return <div>{text}</div>
}
