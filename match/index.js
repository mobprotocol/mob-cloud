import Promise from 'bluebird'

export default class Match {
  constructor(params) {
    this.orderbook = params.orderbook
    this.daemon()
  }

  daemon() {
    return new Promise((resolve, reject) => {
      return Promise.delay(1000)
      .then(() => {
        return this.matchOrder()
      }).then((element) => {
        console.log('first element', element)
        return this.daemon()
      }).catch((err) => {
        reject(err)
      })
    })
  }

  matchOrder() {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        return this.chooseSide()
      }).then((side) => {
        return this.getOrder(side)
      }).then(() => {
        this.processOrder()
      }).then(() => {
        resolve(true)
      })
    })
  }

  chooseSide() {
    return Math.floor(Math.random())
  }

  getOrder(side) {
    switch(side) {
      case 0:
        return orderbook.sellA.last()
        break
      case 1:
        return orderbook.sellB.last()
        break
      default:
        return false
        break
    }
  }

  processOrder() {

  }
}
