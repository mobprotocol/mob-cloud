import Promise from 'bluebird'
import sublevel from 'level-sublevel'
import Trie from 'merkle-patricia-tree'
import { List } from 'immutable'
import { sha256 } from 'ethereumjs-util'

export default class Settlement {
  constructor(params) {
    this.queue_db = params.db.sublevel(`settlement_queue_${params.tokenA}_${params.tokenB}`)
    this.actions_db = params.db.sublevel(`settlement_actions_${params.tokenA}_${params.tokenB}`)
    // this.trie = new Trie(this.db)
    this.queue = new List()
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
      return Promise.delay(0)
      .then(() => {
        return this.timeStamp()
      }).then((timestamp) => {
        return _settlement.time = timestamp
      }).then(() => {
        return this.action(_settlement)
      }).then(() => {
        return this.insertion(_settlement)
      }).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  popSettlement() {

  }

  action(_settlement) {
    this.actions_db.put(this.hash(_settlement), _settlement, (err) => {
      if (err) {
        console.log('### error in action push', err)
      }
    })
  }

  hash(thing) {
    console.log('thing type', typeof thing)
    return sha256(JSON.stringify(thing), (err) => {
      if(err) {
        console.log('### error hashing object', err)
      }
    })

    // return sha256('hello world', (err) => {
    //   if(err) {
    //     console.log('### error hashing object', err)
    //   }
    // })
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
        return this.snapshot()
      }).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  pop() {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        return this.queue = this.queue.pop()
      }).then(() => {
        return snapshot()
      }).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  snapshot() {
    this.queue_db.put(this.hash(JSON.stringify(this.queue.toObject())), JSON.stringify(this.queue.toObject()), (err) => {
      if (err) {
        console.log('### error in snapshot write', err)
      }
    })
  }

  executeTransfer(order) {
    console.log('### sending order to the EVM', order)
  }
}
