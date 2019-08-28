import { configureStore } from 'redux-starter-kit'
import { AnyAction } from 'redux'
import { reducer, ITodo } from './todos/todosSlice';

export interface RootState {
  todos: ITodo[]
}

export const store = configureStore<RootState, AnyAction>({
  reducer: {
    todos: reducer
  }
})
