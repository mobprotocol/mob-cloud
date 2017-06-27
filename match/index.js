import Promise from 'bluebird'

export default class Match {
  constructor(params) {
    this.orderbook = params.orderbook
    this.settlement = params.settlement
    this.daemon()
  }

  daemon() {
    return new Promise((resolve, reject) => {
      return Promise.delay(1000)
      .then(() => {
        return this.matchingEvent()
      }).then(() => {
        return this.daemon()
      }).catch((err) => {
        reject(err)
      })
    })
  }

  matchingEvent() {
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
    return Math.round(Math.random())
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
      return this.calculateSettlements()
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
      return this.orderbook.sellA.last()
    }).then((position) => {
      console.log('corresponding order', position)
    })
  }

  calculateSettlements(order1, order2, book) {
    if (1/order1.price < order2.price) {
      return
    }
    const settlements = []
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        if (order1.quantity < order2.quantity * order2.price) {
          if (book == 'A') {
            this.orderbook.sellA.pop()
            this.orderbook.sellB.update(-1,  order => {
              ...order,
              quantity: order.quantity - order1.price * order1.quantity
            })
          } else {
            this.orderbook.sellB.pop()
            this.orderbook.sellA.update(-1, order => {
              ...order,
              quantity: order.quantity - order1.price * order1.quantity
            })
          }
          settlements.push({ from: 'seller1', to: 'seller2', quantity: order1.quantity, token: '0x'})
          settlements.push({ from: 'seller2', to: 'seller1', quantity: order1.price * order1.quantity })
          settlements.push({ from: 'seller2', to: 'Exchange', quantity: (order1.quantity/order2.price) - (order1.price * order1.quantity) })
        } else {
          if (book == 'A') {
            this.orderbook.sellB.pop()
            this.orderbook.sellA.update(-1, order => {
              ...order,
              quantity: order.quantity - order2.price * order2.quantity
            })
          } else {
            this.orderbook.sellA.pop()
            this.orderbook.sellB.update(-1, order => {
              ...order,
              quantity: order.quantity - order2.price * order2.quantity
            })
          }
          settlements.push({ from: 'seller2', to: 'seller1', quantity: order2.quantity, token: '0x' })
          settlements.push({ from: 'seller1', to: 'seller2', quantity: order2.price * order2.quantity })
          settlements.push({ from: 'seller1', to: 'exchange_operator', quantity: (order2.quantity/order1.price) - (order2.price * order2.quantity) })
        }
      }).then(() => {
        resolve(settlements)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
