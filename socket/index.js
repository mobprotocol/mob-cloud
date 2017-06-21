import Server from 'simple-websocket/server'

const socket = new Server({ port: 3001 })

socket.on('connection', (socket) => {
  console.log('### WEBSOCKET CONNECTED ON PORT 3001')
  socket.on('data', (data) => {
    console.log('### RECEIVED DATA FROM CLIENT', data)
  })
})
