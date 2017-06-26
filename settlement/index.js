import Promise from 'bluebird'
import sublevel from 'level-sublevel'
import Trie from 'merkle-patricia-tree'
import { List } from 'immutable'

export default class Settlement {
  constructor(params) {
    this.db = params.db.sublevel(`settlement_${params.tokenA}_${params.tokenB}`)
    this.trie = new Trie(this.db)
    this.queue = new List()
  }

  daemon() {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        return this.queue.last()
      }).then((orders) => {
        return executeTrades(orders)
      }).then(() => {
        return this.queue = this.queue.pop()
      })
    })
  }

  executeTrades(orders) {

  }
}
