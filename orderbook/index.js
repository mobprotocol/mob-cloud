import Deque from 'double-ended-queue'
import rp from 'request-promise'
import sublevel from 'level-sublevel'
import { List } from 'immutable'
let list = List([1, 2])
export default class Orderbook {
  constructor(params) {
    console.log('### made it to Orderbook constructor')
    this.hello = 'world'
    this.sellA =  new List()
    this.sellB = new List()
    // this.db = params.db.sublevel(`orderbook_${params.tokenA}_params${params.tokenB}`)
  }

  submitSellA(order) {
    console.log('### submitting sellA order', order)
    let index
    this.sellA.forEach((entry, i) => {
      if (entry.price < order.price) {
        index = i
      }
    })
    if(index && index > 0) {
      this.sellA = this.sellA.splice(index, 0, order)
    } else {
      this.sellA = this.sellA.push(order)
    }
  }

  submitSellB(order) {
    console.log('### submitting sellB order', order)
    let index
    this.sellB.forEach((entry, i) => {
      if (entry.price < order.price) {
        index = i
      }
    })
    if(index) {
      this.sellB = this.sellB.splice(index, 0, order)
    } else {
      this.sellB = this.sellB.push(order)
    }
  }
}
