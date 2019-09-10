import React, { useState } from 'react'
import { addTodo } from './todosSlice'
import { useDispatch } from 'react-redux'
import { ITodo } from '../../Todo.interface'

export const AddTodo: React.FC = () => {
  const dispatch = useDispatch()
  const [todoText, setTodoText] = useState('')

  const submit = e => {
    e.preventDefault()
    const noText: boolean = !todoText.trim()
    if (noText) return

    const newTodo: ITodo = { text: todoText, completed: false }
    dispatch(addTodo(newTodo))

    setTodoText('')
  }

  return (
    <>
      <h2>Add a Todo</h2>
      <form className="add-todo-form" onSubmit={submit}>
        <div>
          <label htmlFor="todo-text">Todo Text</label>
          <input
            id="todo-text"
            value={todoText}
            onChange={e => setTodoText(e.target.value)}
          />
        </div>
        <input type="submit"/>
      </form>
    </>
  )
}
