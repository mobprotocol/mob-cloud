import Server from 'simple-websocket/server'

const socket = new Server({ port: 3001 })

socket.on('connection', (socket) => {
  console.log('### CLIENT CONNECTED ON PORT 3001')
  socket.on('data', (data) => {
    console.log('### RECEIVED DATA FROM CLIENT', data)    
  })
})

/**
/////////////////////////////////////////////
DATA TUNNEL

DATA TYPES: (DATA IS PARSED BY JSON KEY)

/////////////////////////////////////////////
*/

export function sendData(data) {
  socket.write(data)
}
