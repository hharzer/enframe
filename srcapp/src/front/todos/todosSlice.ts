import { createSlice } from 'redux-starter-kit'

let nextTodoId = 0
export const resetTodoId = () => (nextTodoId = 0)

export interface ITodo {
  id: number
  text: string
  completed: boolean
}

const todosSlice = createSlice({
  slice: 'todos',
  initialState: [],
  reducers: {
    addTodo: {
      reducer: (state: ITodo[], action) => {
        const { id, text } = action.payload
        state.push({ id, text, completed: false })
      },
      prepare: text => {
        return { payload: { text, id: nextTodoId++ } }
      }
    },
    toggleTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload.id)
      if (todo) {
        todo.completed = !todo.completed
      }
    }
  }
})

export const {
  reducer,
  actions: { addTodo, toggleTodo }
} = todosSlice
