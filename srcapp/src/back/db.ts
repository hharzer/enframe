import { Client } from 'pg'

export async function query(queryString, callback) {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: true
  })

  client.connect()

  let rows: any

  client.query(queryString, (err, res) => {
    if (err) throw err
    rows = res.rows.map(row => JSON.stringify(row))
    client.end()
    callback(rows)
  })
}
