import Promise from 'bluebird'
import sublevel from 'level-sublevel'
import Trie from 'merkle-patricia-tree'
import { List } from 'immutable'

export default class Settlement {
  constructor(params) {
    this.queue_db = params.db.sublevel(`settlement_queue_${params.tokenA}_${params.tokenB}`)
    this.actions_db = params.db.sublevel(`settlement_actions_${params.tokenA}_${params.tokenB}`)
    // this.trie = new Trie(this.db)
    this.queue = new List()
    this.daemon()
  }

  daemon() {
    return new Promise((resolve, reject) => {
      return Promise.delay(1000)
      .then(() => {
        return this.queue.last()
      }).then((orders) => {
        if (orders) {
          return this.executeTransfer(orders)
        } else {
          return this.daemon()
        }
      }).then(() => {
        return this.queue = this.queue.pop()
      }).then(() => {
        return this.daemon()
      })
    })
  }

  insertSettlement() {

  }

  action() {

  }

  mutation() {

  }

  snapshot() {

  }

  executeTransfer(order) {
    console.log('### sending order to the EVM', order)
  }
}
