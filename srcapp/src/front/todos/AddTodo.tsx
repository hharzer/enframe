import { PayloadActionCreator } from 'redux-starter-kit';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodo } from './todosSlice';

interface AddTodoProps {
  addTodo: PayloadActionCreator
}
export const AddTodo = connect(
  null,
  { addTodo }
)(({ addTodo }: AddTodoProps) => {
  const [todoText, setTodoText] = useState('')

  const submit = e => {
    e.preventDefault()
    if (!todoText.trim()) return
    addTodo(todoText)
    setTodoText('')
  }

  return (
    <form onSubmit={submit}>
      <input value={todoText} onChange={e => setTodoText(e.target.value)} />
      <input type="submit" />
    </form>
  )
})
