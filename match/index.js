import Promise from 'bluebird'

export default class Match {
  constructor(params) {
    this.orderbook = params.orderbook
    this.settlement = params.settlement
  }

  daemon() {
    return new Promise((resolve, reject) => {
      return Promise.delay(5000)
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
            return this.processOrder('sellA', 'sellB')
          case 1:
            return this.processOrder('sellB', 'sellA')
          default:
            return this.processOrder('sellA', 'sellB')
        }
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

  processOrder(book1, book2) {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        return this.orderbook[book1].last()
      }).then((order) => {
        console.log('order', order)
        return this.orderSettlements(order, book1, book2)
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  orderSettlements(order1, book1, book2) {
    return new Promise((resolve, reject) => {
      return Promise.delay(5000)
      .then(() => {
        if (this.orderbook[book2].isEmpty()) {
          resolve(true)
        } else {
          return this.orderbook[book2].last()
        }
      }).then((order2) => {

        if (1/order1.price > order2.price) {
          return this.calculateSettlements(order1, order2)
        } else {
          resolve(true)
        }
      }).map((settlement) => {
        return this.dispatchSettlement(settlement)
      }).then(() => {
        return this.orderbook[book1].last()
      }).then((newOrder) => {
        console.log('newOrder', newOrder)
        if(newOrder == null) {
          console.log('null null')
          resolve(true)
        }
        else if (newOrder.quantity <= 0) {
          console.log('order exaughsted')
          resolve(true)
        } else {
          console.log('newOrder', newOrder)
          return this.orderSettlements(newOrder, book1, book2)
        }
      }).catch((err) => {
        // return Promise.delay(1000)
        // .then(() => {
        //   console.log('### error in settlement loop', err)
        //   return this.orderSettlements(order1, book1, book2)
        // })
        reject(err)
      })
    })
  }

  calculateSettlements(order1, order2) {
    const settlements = []
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        if (order1.quantity < order2.quantity * order2.price) {
          settlements.push({ from: 'seller1', to: 'seller2', quantity: order1.quantity, token: order1.token})
          settlements.push({ from: 'seller2', to: 'seller1', quantity: order1.price * order1.quantity, token: order2.token })
          settlements.push({ from: 'seller2', to: 'Exchange', quantity: (order1.quantity/order2.price) - (order1.price * order1.quantity), token: order2.token })
        } else {
          settlements.push({ from: 'seller2', to: 'seller1', quantity: order2.quantity, token: order2.token })
          settlements.push({ from: 'seller1', to: 'seller2', quantity: order2.price * order2.quantity, token: order1.token })
          settlements.push({ from: 'seller1', to: 'exchange_operator', quantity: (order2.quantity/order1.price) - (order2.price * order2.quantity), token: order1.token })
        }
      }).then(() => {
        console.log('settlements', settlements)
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
        if (settlement.quantity == this.orderbook[book].last().quantity) {
          console.log('popping orderbook')
          this.orderbook[book] = this.orderbook[book].pop()
        } else {
          console.log('updating orderbook', settlement.quantity)
          this.orderbook[book] = this.orderbook[book].update(-1, order => {
            return {
              user: 'testing update',
              quantity: order.quantity - settlement.quantity,
              price: order.price,
              token: order.token
            }
          })
        }
        return book
      }).then((book) => {
        return this.settlement.queue.unshift(settlement)
      }).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
