import sublevel from 'level-sublevel'
import Trie from 'merkle-patricia-tree'

export default class Settlement {
  constructor(params) {
    this.db = params.db.sublevel(`settlement_${params.tokenA}_${params.tokenB}`)
    this.trie = new Trie(this.db)
  }
}
