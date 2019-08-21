import express from 'express'
import path from 'path'
import compression = require('compression');
import helmet = require('helmet');

const PORT = process.env.PORT || '3000'

const app = express()
app.use(compression())
app.use(helmet())

app.use(express.static(path.join(__dirname, '../../dist')))

app.get('/', (_, res: express.Response) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'))
})

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))
