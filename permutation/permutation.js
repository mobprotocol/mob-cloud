import Orderbook from '../orderbook/index'
import Simulation from '../simulation/index'

export default class Permutation {
  constructor() {
    console.log('made it to Permutation constructor')
    this.orderbook = new Orderbook()
    this.simulation = new Simulation({
      orderbook: this.orderbook
    })
    // this.match
    // this.clean
  }
}
