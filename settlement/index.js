import Promise from 'bluebird'
import sublevel from 'level-sublevel'
import Trie from 'merkle-patricia-tree'
import { List } from 'immutable'
import { sha3 } from 'ethereumjs-utl'

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

  insertSettlement(_settlement) {
    return new Promise((resolve, reject) => {
      return this.timeStamp()
    }).then((timestamp) => {
      return _settlement.time = timeStamp
    }).then(() => {
      return action(_settlement)
    }).then(() => {
      return insertion(_settlement)
    }).then(() => {
      resolve(true)
    }).catch((err) => {
      reject(err)
    })
  }

  popSettlement() {

  }

  action(_settlement) {
    this.actions_db.put(hash(_settlement), _settlement, () => {
      if (err) {
        console.log('### error in action push', err)
      }
    })
  }

  hash(object) {
    return sha3(object, (err) => {
      if(err) {
        console.log('### error hashing object', err)
      }
    })
  }

  timeStamp() {
    return new Date().getTime()
  }

  insertion(_settlement) {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        return this.queue = this.queue.unshift(_settlement)
      }).then(() => {
        return snapshot()
      }).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  pop() {
    return new Prom
  }

  snapshot() {
    this.queue_db.put(hash(this.queue), this.queue, (err) => {
      if (err) {
        console.log('### error in snapshot write', err)
      }
    })
  }

  executeTransfer(order) {
    console.log('### sending order to the EVM', order)
  }
}
