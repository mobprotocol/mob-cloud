import Deque from 'double-ended-queue'

export default class Orderbook {
  constructor() {
    console.log('### made it to Orderbook constructor')
    this.sellA = new Deque()
    this.sellB = new Deque()
  }

  submitSellA(order) {
    console.log('### submitting sellA order', order)
    this.sellA.push(order)
  }

  submitSellB(order) {
    console.log('### submitting sellB order', order)
    this.sellB.push(order)
  }
}
