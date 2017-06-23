import Promise from 'bluebird'

import Orderbook from './index'

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
      return new Orderbook()
    }).then((Orderbook) => {
      console.log('Orderbook', Orderbook)
      return Orderbook.submitSellA(sell_order)
    }).then(() => {
      console.log('Orderbook', typeof Orderbook.sellA)
    })
  })
}

tests()
