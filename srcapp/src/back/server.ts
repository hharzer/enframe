import express from 'express'
import path from 'path'
import compression from 'compression'
import helmet from 'helmet'
import { apiRouter } from './apiRouter'
import { db } from './db'

db.seed()

const PORT = process.env.PORT || '3000'

const app = express()
app.use(compression())
app.use(helmet())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../../dist')))

app.use('/api/v1', apiRouter)
app.get('/', (_, res: express.Response) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'))
})

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))
