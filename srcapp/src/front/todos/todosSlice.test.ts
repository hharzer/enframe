import { expect } from 'chai'
import { reducer, addTodo, resetTodoId, toggleTodo } from './todosSlice';

describe('todos', () => {
  beforeEach(() => {
    resetTodoId()
  })

  describe('addTodo', () => {
    it('adds a todo', () => {
      const oldState = []
      const newState = reducer(oldState, addTodo('hello, world'))

      const expectedNewState = [{ id: 0, text: 'hello, world', completed: false }]
      expect(newState).to.deep.equal(expectedNewState)
    })

    it('autoincrements todo id', () => {
      const heyAction = addTodo('hey')
      const worldAction = addTodo('world')

      expect(heyAction.payload).to.eql({ id: 0, text: 'hey' })
      expect(worldAction.payload).to.eql({ id: 1, text: 'world' })
    })
  })

  describe('toggleTodo', () => {
    it('toggles the completedness of a todo', () => {
      const oldState = [{ id: 3, text: 'hello, world', completed: false }]
      const payload = { id: 3 }
      const newState = reducer(oldState, toggleTodo(payload))

      const expectedNewState = [{ id: 3, text: 'hello, world', completed: true }]
      expect(newState).to.deep.equal(expectedNewState)
    })
  })
})
