import { Pool } from 'pg'
import { ITodo } from '../Todo.interface'
import { pore } from '../pore'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

const query = (text: string, params = []) => pool.query(text, params)

export const db = {
  seed: async () => {
    const queryString =
      'CREATE TABLE IF NOT EXISTS todos(id SERIAL, text varchar(40), completed boolean);'
    const [, err] = await pore(query(queryString))
    if (!err) console.log('Successfully seeded the database')
  },
  getTodos: async (): Promise<ITodo[]> => {
    const [{ rows }, err] = await pore(query('SELECT * FROM todos;'))
    if (err) return []
    return rows
  },
  addTodo: async (todo: ITodo): Promise<void> => {
    const insert = 'INSERT INTO todos (text, completed) VALUES ($1, $2);'
    await query(insert, [todo.text, todo.completed])
  },
  deleteTodo: async (id: string): Promise<void> => {
    await query('DELETE FROM todos WHERE id=$1;', [id])
  },
  updateTodo: async ({ id, text, completed }: Required<ITodo>): Promise<void> => {
    const update = 'UPDATE todos SET text = $2, completed = $3 WHERE id=$1;'
    const params = [id, text, completed]
    await query(update, params)
  }
}
