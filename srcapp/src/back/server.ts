import express from 'express'
import path from 'path'
import compression from 'compression'
import helmet from 'helmet'
import { query } from './db'

const PORT = process.env.PORT || '3000'

const app = express()
app.use(compression())
app.use(helmet())

app.use(express.static(path.join(__dirname, '../../dist')))

app.get('/', (_, res: express.Response) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'))
})

app.get('/api/todos', async (_, res: express.Response) => {
  query('SELECT * FROM todos;', todos => {
    res.json({
      data: {
        todos
      }
    })
  })
})

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))
