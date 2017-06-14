import Deque from 'double-ended-queue'

export default class Orderbook {
  constructor() {
    console.log('### made it to Orderbook constructor')
    this.sellA = new Deque()
    this.sellB = new Deque()
  }

  submitSellA(order) {
    sellA.push(order)
  }

  submitSellB(order) {
    sellB.push(order)
  }
}
