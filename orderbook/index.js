import Deque from 'double-ended-queue'
import rp from 'request-promise'
import sublevel from 'level-sublevel'
import { List } from 'immutable'

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
    let found = false
    this.sellA.forEach((entry, i) => {
      if (entry.price < order.price && found == false) {
        index = i
        found = true
      }
    })
    if(index == 0) {
      this.sellA = this.sellA.unshift(order)
    } else if (index) {
      this.sellA = this.sellA.splice(index, 0, order)
    } else {
      this.sellA = this.sellA.push(order)
    }
  }

  submitSellB(order) {
    console.log('### submitting sellB order', order)
    let index
    let found = false
    this.sellB.forEach((entry, i) => {
      if (entry.price < order.price && found == false) {
        index = i
        found = true
      }
    })
    if (index == 0) {
      console.log('unshifting')
      this.sellB = this.sellB.unshift(order)
    } else if (index) {
      console.log('splicing', index)
      this.sellB = this.sellB.splice(index, 0, order)
    } else {
      console.log('pushing')
      this.sellB = this.sellB.push(order)
    }
  }
}
