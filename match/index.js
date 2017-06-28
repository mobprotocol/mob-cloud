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

  processOrderA() {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        return this.orderbook.sellA.last()
      }).then((orderA) => {
        console.log('### processing order A')
        return this.getOrderSetB(orderA)
      }).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  getOrderSetB(orderA) {
    return Promise.delay(0)
    .then(() => {
      // const first = this.orderbook.sellB.last()
      // console.log('this.orderbook.sellB', first)
      return this.orderbook.sellB.last()
    }).then((orderB) => {
      console.log('order', orderA, orderB)
      return this.calculateSettlements(orderA, orderB)
    }).then((settlements) => {
      console.log('settlements', settlements)
      return settlements
    }).map((settlement) => {
      return this.dispatchSettlement(settlement)
    }).then(() => {
      Promise.resolve(true)
    }).catch((err) => {
      Promise.reject(err)
    })
  }

  processOrderB() {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        return this.orderbook.sellB.last()
      }).then((orderB) => {
        console.log('### processing order B')
        return this.getOrderSetA(orderB)
      }).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  getOrderSetA(orderB) {
    return Promise.delay(0)
    .then(() => {
      return this.orderbook.sellA.last()
    }).then((orderA) => {
      return this.calculateSettlements(orderB, orderA)
    }).then((settlements) => {
      console.log('settlements(order b)', settlements)
      return settlements
    }).map((settlement) => {
      return this.dispatchSettlement(settlement)
    }).then(() => {
      Promise.resolve(true)
    }).catch((err) => {
      Promise.reject(err)
    })
  }

  calculateSettlements(order1, order2) {
    if (1/order1.price < order2.price) {
      return
    }
    const settlements = []
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        if (order1.quantity < order2.quantity * order2.price) {
          // if (book == 'A') {
          //   this.orderbook.sellA.pop()
          //   console.log('...order1', ...order1)
          //   // this.orderbook.sellB.update(-1,  order => {
          //   //   ...order,
          //   //   quantity: order.quantity - order1.price * order1.quantity
          //   // })
          // } else {
          //   this.orderbook.sellB.pop()
          //   // this.orderbook.sellA.update(-1, order => {
          //   //   ...order,
          //   //   quantity: order.quantity - order1.price * order1.quantity
          //   // })
          // }
          settlements.push({ from: 'seller1', to: 'seller2', quantity: order1.quantity, token: order1.token})
          settlements.push({ from: 'seller2', to: 'seller1', quantity: order1.price * order1.quantity, token: order2.token })
          settlements.push({ from: 'seller2', to: 'Exchange', quantity: (order1.quantity/order2.price) - (order1.price * order1.quantity), token: order2.token })
        } else {
          // if (book == 'A') {
          //   this.orderbook.sellB.pop()
          //   // this.orderbook.sellA.update(-1, order => {
          //   //   ...order,
          //   //   quantity: order.quantity - order2.price * order2.quantity
          //   // })
          // } else {
          //   this.orderbook.sellA.pop()
          //   // this.orderbook.sellB.update(-1, order => {
          //   //   ...order,
          //   //   quantity: order.quantity - order2.price * order2.quantity
          //   // })
          // }
          settlements.push({ from: 'seller2', to: 'seller1', quantity: order2.quantity, token: order2.token })
          settlements.push({ from: 'seller1', to: 'seller2', quantity: order2.price * order2.quantity, token: order1.token })
          settlements.push({ from: 'seller1', to: 'exchange_operator', quantity: (order2.quantity/order1.price) - (order2.price * order2.quantity), token: order1.token })
        }
      }).then(() => {
        resolve(settlements)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  dispatchSettlement(settlement) {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        if(settlement.token == this.orderbook.tokenA) {
          return 'sellA'
        } else {
          return 'sellB'
        }
      }).then((book) => {
        console.log('settlement(here)', settlement.quantity)
        if (settlement.quantity == this.orderbook[book].last().quantity) {
          this.orderbook[book].pop()
        } else {
          this.orderbook[book].update(-1, order => {
            console.log('order(here)', order)
            // ...order,
            // quantity: order.quantity - order1.price * order1.quantity
          })
        }
      }).then(() => {
        this.settlement.shift(settlement)
      })
    })
  }
}
