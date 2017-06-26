import Promise from 'bluebird'

import Match from './index'
import Orderbook from '../orderbook/index'

let orderbook
let matchAgent

Promise.delay(0)
.then(() => {
  return
}).then(() => {
  return startMatchingEngine()
})
