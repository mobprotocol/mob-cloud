import Promise from 'bluebird'
import gaussian from 'gaussian'

export default class Simulation {
  constructor(params) {
    this.orderbook = params.orderbook
    this.marketPrice = 10
    this.marketVariance = .5
    this.volume = 100
    this.volumeVariance = 10
    this.volumeCounter
    this.quantityMin = 0
    this.quantityMax = 1000
    this.daemon()
  }

  daemon() {
    return new Promise((resolve, reject) => {
      return Promise.delay(3000)
      .then(() => {
        return this.tradingBatch()
      }).then((res) => {
        return this.daemon()
      }).catch((err) => {
        reject(err)
      })
    })
  }

  tradingBatch() {
    return new Promise((resolve, reject) => {
      return this.calculateMarketPrice()
      .then((price) => {
        console.log('price', price)
        this.marketPrice = price
        return this.calculateVolume()
      }).then((volume) => {
        console.log('volume', volume)
        this.volume = volume
        this.volumeCounter = volume
        return this.shotgun()
      }).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  chooseSide() {
    return new Promise((resolve, reject) => {
      const binary = Math.round(Math.random())
      if (binary == 0) {
        resolve('A')
      } else {
        resolve('B')
      }
    })
  }

  calculateMarketPrice() {
    return new Promise((resolve, reject) => {
      this.bellRandom(this.marketPrice, this.marketVariance)
      .then((price) => {
        resolve(price)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  calculateVolume() {
    return new Promise((resolve, reject) => {
      this.bellRandom(this.volume, this.volumeVariance)
      .then((volume) => {
        resolve(Math.round(volume))
      }).catch((err) => {
        reject(err)
      })
    })
  }

  shotgun() {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        this.volumeCounter--
        return this.submitTrade()
      }).then(() => {
        if (this.volumeCounter <= 0) {
          resolve(true)
        } else {
          return this.shotgun()
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }

  submitTrade() {
    return new Promise((resolve, reject) => {
      const order = {}
      let side
      this.chooseSide().then((binary) => {
        side = binary
        return this.bellRandom(this.marketPrice, this.marketVariance)
      }).then((price) => {
        order.price = price
        return this.flatRandom(this.quantityMin, this.quantityMax)
      }).then((quantity) => {
        order.quantity = quantity
        return this.orderbook[`submitSell${side}`](order)
      }).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  bellRandom(mean, variance) {
    return new Promise((resolve, reject) => {
      const distribution = gaussian(mean, variance)
      resolve(distribution.ppf(Math.random()))
    })
  }

  flatRandom(min, max) {
    return new Promise((resolve, reject) => {
      resolve(Math.round(Math.random() * (max - min) + min))
    })
  }
}
