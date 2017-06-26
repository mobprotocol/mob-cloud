import Promise from 'bluebird'

import Match from './index'
import Orderbook from '../orderbook/index'
import { testSortA, testSortB, generateOrder } from '../orderbook/test'

let orderbook
let matchAgent

let batch_a_amount = 10
let batch_b_amount = 10

Promise.delay(0)
.then(() => {
  return orderbook = new Orderbook()
}).then(() => {
  return fillOrderbook()
}).then(() => {
  console.log('orderbook size', orderbook.sellA.size)
  orderbook.sellA.forEach((element) => {
    console.log('element', element)
  })
  return matchAgent = new Match({
    orderbook: orderbook
  })
}).then(() => {

}).catch((err) => {
  console.log('err', err)
})

export function fillOrderbook() {
  return new Promise((resolve, reject) => {
    return Promise.delay(0)
    .then(() => {
      return testSortA()
    }).then(() => {
      return testSortB()
    }).then(() => {
      resolve(true)
    }).catch((err) => {
      reject(err)
    })
  })
}
