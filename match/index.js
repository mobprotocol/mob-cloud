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
      }).then(() => {
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
            return this.processOrderA()
          case 1:
            return this.processOrderB()
          default:
            return this.ProcessOrderA()
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

  processOrderA(order) {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        console.log('### processing order A')
        return this.getOrderSetB()
      }).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  getOrderSetB(order) {
    return Promise.delay(0)
    .then(() => {
      // const first = this.orderbook.sellB.last()
      // console.log('this.orderbook.sellB', first)
      return this.orderbook.sellB.last()
    }).then((position) => {
      console.log('corresponding position', position)
    })
  }

  processOrderB(order) {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        console.log('### processing order B')
        return this.getOrderSetA()
      }).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  getOrderSetA(order) {
    return Promise.delay(0)
    .then(() => {
      console.log('this.orderbook.sellA', this.orderbook.sellA)
      return this.orderbook.sellA.last()
    }).then((position) => {
      console.log('corresponding order', position)

    })
  }
}
