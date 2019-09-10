import React from 'react'
import { Todos } from './todos/Todos'

export const App: React.FC<{}> = () => {
  return (
    <div>
      <h1>Example Todo App</h1>
      <Todos />
    </div>
  )
}
