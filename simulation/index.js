import Promise from 'bluebird'

export default class Simulation {
  constructor(params) {
    this.orderbook = params.orderbook
    this.daemon()
  }

  daemon() {
    return new Promise((resolve, reject) => {
      return Promise.delay(10000)
      .then(() => {
        return this.orderbook.sellA()
      }).then((res) => {
        return this.orderbook.sellB()
      }).then((res) => {
        return this.daemon()
      }).catch((err) => {
        reject(err)
      })
    })
  }

  price() {

  }

  volume() {

  }
}
