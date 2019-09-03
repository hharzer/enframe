import React, { useEffect } from 'react'
import { Todos } from './todos/Todos'

const fetchTodos = async () => {
  const response = await fetch('/api/todos')
  const json = await response.json()
  console.log('%%%%%%%%%%%%%%%%%% ', json)
}

export const App: React.FC<{}> = () => {
  useEffect(() => {
    fetchTodos()
  })

  return (
    <div>
      <h1>Hello, World!</h1>
      <Todos />
    </div>
  )
}
