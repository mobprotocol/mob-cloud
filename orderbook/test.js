import Promise from 'bluebird'

import Orderbook from './index'

let orderbook

const batch_a_amount = 10
const batch_b_amount = 10

export function testSortA() {
  return new Promise((resolve, reject) => {
    return Promise.delay(10)
    .then(() => {
      return orderbook.sellA(sell_order)
    }).then(() => {
      batch_a_amount = batch_a_amount - 1
      if (batch_a_amount <= 0) {
        resolve(true)
      } else {
        return testSortA()
      }
    }).catch((err) => {
      reject(err)
    })
  })
}

export function testSortB() {
  return new Promise((resolve, reject) => {
    return new promise.delay(10)
    .then(() => {
      return orderbook.sellB(sell_order)
    }).then(() => {
      batch_b_amount = batch_b_amount--
      if(batch_b_amount <= 0) {
        resolve(true)
      } else {
        return testSortB()
      }
    }).catch((err) => {
      reject(err)
    })
  })
}

const sell_order = {
  quantity: Math.floor(Math.random()*100) + 1,
  price: Math.floor(Math.random()*100) + 1
}

export function tests() {
  return new Promise((resolve, reject) => {
    return Promise.delay(0)
    .then(() => {
      return orderbook = new Orderbook()
    }).then(() => {
      return orderbook.submitSellA(sell_order)
    }).then(() => {
      console.log('sellA book', orderbook.sellA)
      return orderbook.submitSellB(sell_order)
    }).then(() => {
      console.log('sellB book', orderbook.sellB)
      return
    })
  })
}

tests()
