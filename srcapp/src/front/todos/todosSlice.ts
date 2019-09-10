import { createSlice, PayloadAction } from 'redux-starter-kit'
import { ITodo } from '../../Todo.interface'
import { Dispatch } from 'redux'
import { pore } from '../../pore'
import { api } from '../api'

const todosSlice = createSlice({
  slice: 'todos',
  initialState: [],
  reducers: {
    addTodoLocal: (state: ITodo[], action: PayloadAction<{ todo: ITodo }>) => {
      state.push(action.payload.todo)
    },
    deleteTodoLocal: (state: ITodo[], action: PayloadAction<{ id: number }>) => {
      return state.filter(todo => todo.id != action.payload.id)
    },
    toggleTodo: (state, action: PayloadAction<{ id: number }>) => {
      const todo = state.find(todo => todo.id === action.payload.id)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    overwriteTodos: (state: ITodo[], action: PayloadAction<{ todos: ITodo[] }>) => {
      const todos: ITodo[] = action.payload.todos
      return todos
    },
    updateTodoLocal: (state, action: PayloadAction<{ todo: Required<ITodo> }>) => {
      const newTodo: ITodo = action.payload.todo
      const oldTodo = state.find(oldTodo => oldTodo.id === newTodo.id)
      if (oldTodo) {
        oldTodo.text = newTodo.text
        oldTodo.completed = newTodo.completed
      }
    }
  }
})

export const reducer = todosSlice.reducer
export const {
  addTodoLocal,
  toggleTodo,
  overwriteTodos,
  deleteTodoLocal,
  updateTodoLocal
} = todosSlice.actions

const dispatchGetTodos = async (dispatch: Dispatch) => {
  const [todos, err] = await pore(api.getTodos())
  if (err) return
  dispatch(overwriteTodos({ todos }))
}

export const getTodos = () => dispatchGetTodos

export const addTodo = (todo: ITodo) => {
  return async (dispatch: Dispatch) => {
    dispatch(addTodoLocal({ todo }))
    const [, err] = await pore(api.postTodo(todo))
    if (err) return
    dispatchGetTodos(dispatch)
  }
}

export const deleteTodo = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(deleteTodoLocal({ id }))
    const [, err] = await pore(api.deleteTodo(id))
    if (!err) return
    dispatchGetTodos(dispatch)
  }
}

export const completeTodo = (todo: Required<ITodo>) => {
  return async (dispatch: Dispatch) => {
    const completedTodo = { ...todo, completed: true }
    dispatch(updateTodoLocal({ todo: completedTodo }))
    const [, err] = await pore(api.updateTodo(completedTodo))
    if (!err) return
    dispatchGetTodos(dispatch)
  }
}
