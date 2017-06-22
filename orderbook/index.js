import Deque from 'double-ended-queue'
import rp from 'request-promise'
import sublevel from 'level-sublevel'

export default class Orderbook {
  constructor(params) {
    console.log('### made it to Orderbook constructor')
    this.sellA = new Deque()
    this.sellB = new Deque()
    this.db = params.db.sublevel(`orderbook_${params.tokenA}_params${params.tokenB}`)
  }

  submitSellA(order) {
    console.log('### submitting sellA order', order)
    this.sellA.push(order)
  }

  insertionSortA() {

  }

  insertionSortB() {

  }

  submitSellB(order) {
    console.log('### submitting sellB order', order)
    this.sellB.push(order)
  }
}
