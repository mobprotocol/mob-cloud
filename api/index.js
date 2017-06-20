import express from 'express'
import Promise from 'bluebird'

const app = express()

app.get('/balance', (req, res) => {
  console.log('req', JSON.stringify(req.body))
  res.end(JSON.stringify({ balance: 10000 }))
})

app.listen(3000, () => {
  console.log('### Restful server listening on port 3000')
})
