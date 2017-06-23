import Deque from 'double-ended-queue'
import rp from 'request-promise'
import sublevel from 'level-sublevel'
import { List } from 'immutable'

export default class Orderbook {
  constructor(params) {
    console.log('### made it to Orderbook constructor')
    this.hello = 'world'
    this.sellA = List()
    this.sellB = List()
    // this.db = params.db.sublevel(`orderbook_${params.tokenA}_params${params.tokenB}`)
  }

  submitSellA(order) {
    console.log('### submitting sellA order', order)
    let index
    console.log("this.sellA", this.sellA)
    for (const entry in this.sellA) {
      if (this.sellA[entry].price < order.price) {
        index = entry
        break
      }
    }
    this.sellA.splice(index, 0, order)
  }

  submitSellB(order) {
    console.log('### submitting sellB order', order)
    let index
    for (const entry in this.sellB) {
      if (this.sellB[entry].price < order.price) {
        index = entry
        break
      }
    }
    this.sellB.splice(index, 0, order)
  }
}
