import { ITodo, ITodoPostBody } from '../Todo.interface'

const apiHeaders = { 'Content-Type': 'application/json' }
const todosRoute = (path?: string | number) =>
  path ? `/api/v1/todos/${path}` : '/api/v1/todos'

export const api = {
  getTodos: async (): Promise<ITodo[]> => {
    const response = await fetch(todosRoute())
    const json = await response.json()
    const todos = json.data.todos as ITodo[]
    return todos
  },
  postTodo: async (todo: ITodo): Promise<void> => {
    const body: ITodoPostBody = { todo }
    const fetchOptions = {
      method: 'POST',
      headers: apiHeaders,
      body: JSON.stringify(body)
    }
    await fetch(todosRoute(), fetchOptions)
  },
  deleteTodo: async (id: number): Promise<void> => {
    const fetchOptions = { method: 'DELETE' }
    await fetch(todosRoute(id), fetchOptions)
  },
  updateTodo: async ({ id, text, completed }: Required<ITodo>): Promise<void> => {
    const body: { todo: Omit<ITodo, 'id'> } = {
      todo: { text, completed }
    }
    const fetchOptions = {
      method: 'PUT',
      headers: apiHeaders,
      body: JSON.stringify(body)
    }
    await fetch(todosRoute(id), fetchOptions)
  }
}
