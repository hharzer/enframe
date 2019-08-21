import express from 'express'
import path from 'path'

const PORT = process.env.PORT || '3000'

const app = express()

app.get('/', (_, res: express.Response) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'))
})

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))
