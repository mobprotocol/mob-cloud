import Promise from 'bluebird'
import { db } from '../leveldb/index'

import Orderbook from './index'

let orderbook

let batch_a_amount = 10
let batch_b_amount = 10

export function testSortA() {
  return Promise.delay(500)
  .then(() => {
    return orderbook.submitSellA(generateOrder())
  }).then(() => {
    batch_a_amount = batch_a_amount - 1
    if (batch_a_amount <= 0) {
      console.log('ending')
      return true
    } else {
      return testSortA()
    }
  }).catch((err) => {
    console.log('err', err)
  })
}

export function testSortB() {
  return new Promise.delay(500)
  .then(() => {
    return orderbook.submitSellB(generateOrder())
  }).then(() => {
    batch_b_amount = batch_b_amount - 1
    if(batch_b_amount <= 0) {
      return true
    } else {
      return testSortB()
    }
  }).catch((err) => {
    console.log('err', err)
  })
}

const sell_order = {
  quantity: Math.floor(Math.random()*100) + 1,
  price: Math.floor(Math.random()*100) + 1
}

export function generateOrder() {
  return ({
    quantity: Math.floor(Math.random()*100) + 1,
    price: Math.floor(Math.random()*100) + 1
  })
}

export function tests() {
  return new Promise((resolve, reject) => {
    return Promise.delay(0)
    .then(() => {
      return orderbook = new Orderbook({
        tokenA: '0x2da664251cdff1ef96471d5570d6b7d3687b4516',
        tokenB: '0x6846e948d8b1ec25bb99dedf821b0d658e226595',
        db
      })
    }).then(() => {
    //   return orderbook.submitSellA(generateOrder())
    // }).then(() => {
    //   return orderbook.submitSellB(generateOrder())
    // }).then(() => {
      return testSortA()
    }).then(() => {
      orderbook.sellA.forEach((element) => {
        console.log('element', element)
      })
      return testSortB()
    }).then(() => {
      orderbook.sellB.forEach((element) => {
        console.log('element', element)
      })
      resolve(true)
    }).catch((err) => {
      reject(err)
    })
  })
}

tests()

function testRandomPrice() {
  setInterval(() => {
    console.log('order', generateOrder())
  }, 3000)
}
