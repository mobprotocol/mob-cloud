import Promise from 'bluebird'

import Orderbook from './index'

let orderbook

export function submitSellA() {

}

export function submitSellB() {

}

export function testSortA() {

}

export function testSortB() {

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
    })
  })
}

tests()
