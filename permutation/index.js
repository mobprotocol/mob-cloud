import Orderbook from '../orderbook/index'
import Simulation from '../simulation/index'
import Match from '../match/index'
import Clean from '../clean/index'
import Settlement from '../settlement/index'

export default class Permutation {
  constructor(params) {
    this.orderbook = new Orderbook({ tokenA: params.tokenA, tokenB: params.tokenB, db: params.db })
    this.settlement = new Settlement({ tokenA: params, tokenB: params.tokenB, db: params.db })
    this.simulation = new Simulation({ orderbook: this.orderbook })
    this.match = new Match({ orderbook: this.orderbook, settlement: this.settlement })
    this.clean = new Clean({ orderbook: this.orderbook })
  }
}
