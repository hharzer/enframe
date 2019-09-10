import React from 'react'
import { ITodo } from '../../Todo.interface'
import { useDispatch } from 'react-redux'
import { deleteTodo, completeTodo } from './todosSlice'
import { text } from 'body-parser'

export const Todo: React.FC<{ todo: ITodo }> = ({ todo }) => {
  const dispatch = useDispatch()
  const onDelete = () => todo.id && dispatch(deleteTodo(todo.id))
  const markComplete = () => todo.id && dispatch(completeTodo(todo as Required<ITodo>))

  const style = {
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid black',
    padding: '10px',
    margin: '10px 0',
    textDecoration: todo.completed ? 'line-through' : 'none'
  }

  return (
    <div style={style}>
      <div>{todo.text}</div>
      <div>
        <button onClick={markComplete}>Complete</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  )
}
