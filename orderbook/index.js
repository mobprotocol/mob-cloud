import Deque from 'double-ended-queue'

import { sendData } from '../socket/index'

export default class Orderbook {
  constructor() {
    console.log('### made it to Orderbook constructor')
    this.sellA = new Deque()
    this.sellB = new Deque()
  }

  submitSellA(order) {
    console.log('### submitting sellA order', order)
    sendData({
      sellA: order
    })
    this.sellA.push(order)
  }

  submitSellB(order) {
    console.log('### submitting sellB order', order)
    sendData({
      sellB: order
    })
    this.sellB.push(order)
  }
}
