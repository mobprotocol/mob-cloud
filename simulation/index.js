import Promise from 'bluebird'

export default class Simulation {
  constructor(params) {
    this.orderbook = params.orderbook
    this.daemon()
  }

  daemon() {
    console.log('this.orderbok', this.orderbook)
    return new Promise((resolve, reject) => {
      return Promise.delay(3000)
      .then(() => {
        return this.orderbook.submitSellA({ price: 10, quantity: 10 })
      }).then((res) => {
        return this.orderbook.submitSellB({ price: 10, quantity: 10 })
      }).then((res) => {
        return this.daemon()
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


}
