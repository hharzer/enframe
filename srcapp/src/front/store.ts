import { configureStore } from 'redux-starter-kit'
import { AnyAction } from 'redux'
import { reducer } from './todos/todosSlice';
import { ITodo } from '../Todo.interface';

export interface RootState {
  todos: ITodo[]
}

export const store = configureStore<RootState, AnyAction>({
  reducer: {
    todos: reducer
  }
})
