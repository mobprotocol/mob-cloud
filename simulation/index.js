import Promise from 'bluebird'

export default class Simulation {
  constructor(params) {
    this.orderbook = params.orderbook
    this.marketPrice = 10
    this.marketVariance = .5
    this.volume = 100
    this.volumeVariance = 10
    this.volumeCounter
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
        this.marketPrice = price
        return this.calculateVolume()
      }).then((volume) => {
        this.volume = volume
        this.volumeCounter = volume
        return shotgun()
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
      bellRandom(this.marketPrice, this.marketVariance)
      .then((price) => {
        resolve(price)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  calculateVolume() {
    return new Promise((resolve, reject) => {
      bellRandom(this.volume, this.volumeVariance)
      .then((volume) => {
        resolve(volume)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  bellRandom() {
    return new Promise((resolve, reject) => {
      const distribution = gaussian(mean, variance)
      resolve(distribution.ppf(Math.random()))
    })
  }


}
