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
    // for (const entry in this.sellA) {
    //   console.log('entry', entry)
    //   if (this.sellA[entry].price < order.price) {
    //     index = entry
    //     break
    //   }
    // }
    this.sellA = this.sellA.push(order)
    this.sellA.forEach((entry, i) => {
      console.log('entry', entry)
      if (entry.price < order.price) {
        index = i
      }
    })
    if(index) {
      this.sellA = this.sellA.splice(index, 0, order)
    } else {
      this.sellA = this.sellA.push(order)
    }
  }

  submitSellB(order) {
    console.log('### submitting sellB order', order)
    let index
    // for (const entry in this.sellB) {
    //   if (this.sellB[entry].price < order.price) {
    //     index = entry
    //     break
    //   }
    // }
    this.sellB = this.sellB.push(order)
    this.sellB.forEach((entry) => {
      console.log('entry', entry)
    })
    if(index) {
      this.sellB = this.sellB.splice(index, 0, order)
    } else {
      this.sellB = this.sellB.push(order)
    }
  }
}
