import Promise from 'bluebird'

import Match from './index'
import Orderbook from '../orderbook/index'

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
  console.log('orderbook size', orderbook.sellA.last())
  // orderbook.sellA.forEach((element) => {
  //   console.log('element', element)
  // })
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
