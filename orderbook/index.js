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
    // console.log('### submitting sellA order', order)
    // let index
    // console.log("this.sellA", this.sellA)
    // for (const entry in this.sellA) {
    //   console.log('entry', entry)
    //   if (this.sellA[entry].price < order.price) {
    //     index = entry
    //     break
    //   }
    // }
    // this.sellA.splice(index, 0, order)
    this.sellA = this.sellA.push(order)
    console.log('order', order)
    console.log('list A', this.sellA)

    const avengersList = new List(['ironMan', 'captainAmerica']);

    // append blackWidow
    console.log(avengersList.push('blackWidow'));
  }

  submitSellB(order) {
    // console.log('### submitting sellB order', order)
    // let index
    // for (const entry in this.sellB) {
    //   if (this.sellB[entry].price < order.price) {
    //     index = entry
    //     break
    //   }
    // }
    // this.sellB.splice(index, 0, order)
    this.sellB = this.sellB.push(10)
    console.log('order', order)
    console.log('list B', this.sellB)
    list.push(10)
    console.log('list example', list)
  }
}
