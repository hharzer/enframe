import { AddTodo } from './AddTodo'
import React from 'react'
import { Todo } from './Todo'
import { connect } from 'react-redux'
import { ITodo } from './todosSlice';

const TodosNC: React.FC<{ todos: ITodo[] }> = ({ todos }) => {
  return (
    <>
      <h2>Todos</h2>
      <AddTodo />
      {todos.map((todo, index) => (
        <Todo key={index} {...todo} />
      ))}
    </>
  )
}

const mapStateToProps = state => ({ todos: state.todos })
export const Todos = connect(mapStateToProps)(TodosNC)
