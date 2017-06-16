import Orderbook from '../orderbook/index'
import Simulation from '../simulation/index'
import Match from '../match/index'

export default class Permutation {
  constructor() {
    console.log('made it to Permutation constructor')
    this.orderbook = new Orderbook()
    this.simulation = new Simulation({
      orderbook: this.orderbook
    })
    this.match = new Match({
      orderbook: this.orderbook
    })
    // this.clean
  }
}
