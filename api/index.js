import express from 'express'
import Promise from 'bluebird'
import Server from 'simple-websocket/server'

const app = express()

app.get('/balance', (req, res) => {
  console.log('req', JSON.stringify(req.body))
  res.end(JSON.stringify({ balance: 10000 }))
})

app.get('/orderbook', (req, res) => {
  console.log('### hit orderbook endpoint', req.body)
})

app.listen(3000, () => {
  console.log('### Restful server listening on port 3000')
})

const socket = new Server({ port: 3001 })

socket.on('connection', (socket) => {
  console.log('### WEBSOCKET CONNECTED ON PORT 3001')
  socket.on('data', (data) => {
    console.log('### RECEIVED DATA FROM CLIENT', data)
  })
})

export function sendData(data) {
  socket.write(data)
}
