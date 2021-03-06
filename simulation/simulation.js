import Promise from 'bluebird'
import gaussian from 'gaussian'

import Orderbook from '../orderbook/index'

let orderbook
let price = 10
let price_variance = 1
let volume
let volume_variance
let volume_counter


export function oneSimultation() {
  return new Promise((resolve, reject) => {
    orderbook = new Orderbook({
      tokenA: '0x6846e948d8b1ec25bb99dedf821b0d658e226595',
      tokenB: '0x2da664251cdff1ef96471d5570d6b7d3687b4516'
    })

    return simulationLoop().then((res) => {
      if(res) {
        resolve(res)
      }
      reject(res)
    })
  })
}

export function simulationLoop() {
  return new Promise((resolve, reject) => {
    return Promise.delay(5000)
    .then(() => {
      console.log(1)
      return calculateMarketPrice()
    }).then(() => {
      console.log(2)
      return calculateVolume()
    }).then(() => {
      console.log(3)
      return shotgun()
    }).then(() => {
      console.log(4)
      resolve(true)
    })
  })
}
//
// oneSimultation()

export async function calculateMarketPrice() {
  return new Promise(async (resolve, reject) => {
    try {
      price = await bellRandom(price, price_variance)
    } catch (err) {
      reject(err)
    }
    resolve(price)
  })
}

export async  function calculateVolume() {
  return new Promise(async (resolve, reject) => {
    try {
      volume = await bellRandom(volume, volume_variance)
    } catch (err) {
      rejct(err)
    }
    volume_counter = volume
    resolve(volume)
  })
}

export function shotgun() {
  return new Promise((resolve, reject) => {
    // return Promise.delay(0)
    // .then(() => {
    //   return submitOrder()
    // }).then(() => {
    //   if (volume_counter <= 0) {
    //     resolve(true)
    //   }
    //   volume_counter--
    //   return shotgun()
    // }).catch((err) => {
    //   reject(err)
    // })
    resolve(true)
  })
}

export async function submitOrder() {
  return new Promise(async (resolve, reject) => {
    let side
    let trade_price
    let trade_quantity

    try {
      side = await chooseSide()
      console.log('side', side)
      trade_price = await bellRandom(price, price_variance)
      console.log('trade_price', trade_price)
      trade_quantity = await flatRandom(0, 1000)
      console.log('trade_quantity', trade_quantity)
      const order = {
        price: trade_price,
        quantity: trade_quantity,
      }
      orderbook[`submitSell${side}`](order)
    } catch (err) {
      reject(err)
    }
    resolve(true)
  })
}

export async function chooseSide() {
  return new Promise((resolve, reject) => {
    var side = Math.round(Math.random())
    if (side == 0) {
      resolve('A')
    } else {
      resolve('B')
    }
  })
}

export async function bellRandom(mean, variance) {
  return new Promise((resolve, reject) => {
    const distribution = gaussian(mean, variance)
    resolve(distribution.ppf(Math.random()))
  })
}

export async function flatRandom(min, max) {
  return new Promise((resolve, reject) => {
    resolve(Math.round(Math.random() * (max - min) + min))
  })
}

oneSimultation()
