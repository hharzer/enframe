import express from 'express'
import { db } from './db'
import { ITodo, ITodoPostBody } from '../Todo.interface'
import { pore } from '../pore'

const apiRouter = express.Router()

apiRouter
  .route('/todos')
  .get(async (_, res: express.Response) => {
    const todos = await db.getTodos()
    res.json({ data: { todos } })
  })
  .post(async (req: express.Request, res: express.Response) => {
    const newTodo: ITodo = (req.body as ITodoPostBody).todo
    const [, err] = await pore(db.addTodo(newTodo))
    if (err) res.sendStatus(404)
    res.sendStatus(201)
  })

apiRouter.delete('/todos/:id', async (req, res) => {
  db.deleteTodo(req.params.id)
})

apiRouter
  .route('/todos/:id')
  .put(async (req: express.Request, res: express.Response) => {
    const todoData = (req.body as ITodoPostBody).todo
    const id = parseInt(req.params.id)
    const todo: Required<ITodo> = { ...todoData, id }
    const [, err] = await pore(db.updateTodo(todo))
    if (err) res.sendStatus(404)
    res.sendStatus(204)
  })
  .delete(async (req, res) => {
    db.deleteTodo(req.params.id)
  })

export { apiRouter }
