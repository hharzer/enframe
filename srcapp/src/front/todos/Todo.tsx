import React from 'react'
import { ITodo } from '../../Todo.interface'
import { useDispatch } from 'react-redux'
import { deleteTodo, completeTodo } from './todosSlice'

export const Todo: React.FC<{ todo: ITodo }> = ({ todo }) => {
  const dispatch = useDispatch()
  const onDelete = () => todo.id && dispatch(deleteTodo(todo.id))
  const markComplete = () => todo.id && dispatch(completeTodo(todo as Required<ITodo>))
  const className = `todo${todo.completed ? ' completed' : ''}`

  return (
    <div className={className}>
      <div>{todo.text}</div>
      <div>
        <button onClick={markComplete}>Complete</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  )
}
