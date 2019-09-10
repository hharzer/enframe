import { AddTodo } from './AddTodo'
import React, { useEffect } from 'react'
import { ITodo } from '../../Todo.interface'
import { Todo } from './Todo'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { getTodos } from './todosSlice';

export const Todos: React.FC = () => {
  const todos: ITodo[] = useSelector((state: RootState) => state.todos)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTodos())
  }, [])

  return (
    <>
      <AddTodo />
      <h2>All Todos</h2>
      {todos.map((todo, index) => (
        <Todo key={index} todo={todo} />
      ))}
    </>
  )
}
