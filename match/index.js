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
      }).then(() => {
        return this.getOrder()
      }).then(() => {
        this.processOrder()
      }).then(() => {
        resolve(true)
      })
    })
  }

  chooseSide() {

  }

  getOrder() {

  }

  processOrder() {

  }
}
