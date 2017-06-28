import Promise from 'bluebird'

import Match from './index'
import Orderbook from '../orderbook/index'

let orderbook
let matchAgent

let batch_a_amount = 10
let batch_b_amount = 10

// Promise.delay(0)
// .then(() => {
//   return orderbook = new Orderbook()
// }).then(() => {
//   return fillOrderbook()
// }).then(() => {
//   return matchAgent = new Match({
//     orderbook: orderbook
//   })
// }).then(() => {
//   console.log('ending test cases')
// }).catch((err) => {
//   console.log('err', err)
// })

const sellA = {
  user: '0xd492884386ef2847cff0ac97cb820c641fad956d',
  quantity: 1,
  price: 220
}

const sellB = {
  user: '0xd5addcfc1d9f0b48defa15e24cddaa13565f088f',
  quantity: 400,
  price: .004
}

Promise.delay(0)
.then(() => {
  return orderbook = new Orderbook({
    tokenA: '0x6846e948d8b1ec25bb99dedf821b0d658e226595',
    tokenB: '0x2da664251cdff1ef96471d5570d6b7d3687b4516'
  })
}).then(() => {
  return orderbook.submitSellA(sellA)
}).then(() => {
  return orderbook.submitSellB(sellB)
}).then(() => {
  return matchAgent = new Match({ orderbook: orderbook })
}).then(() => {

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

export function generateOrder() {
  return ({
    quantity: Math.floor(Math.random()*100) + 1,
    price: Math.floor(Math.random()*100) + 1
  })
}
