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
        switch(side) {
          case 0:
            return processOrderA()
          case 1:
            return processOrderB()
          default:
            return ProcessOrderA()
        }
      }).then((order) => {

      }).then(() => {
        resolve(true)
      })
    })
  }

  chooseSide() {
    return Math.floor(Math.random())
  }

  calculateOrder() {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        return this.orderbook.sellA.last()
      }).then(() => {
        resolve(true)
      })
    })
  }

  submitOrder() {

  }

  processOrderA() {

  }

  processOrderB() {

  }
}
