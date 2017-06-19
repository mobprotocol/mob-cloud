import express from 'express'
import Promise from 'bluebird'

const app = express()

app.get('/balance', () => {

})

app.listen(3000, () => {
  console.log('### Restful server listening on port 3000')
})
