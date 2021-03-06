import test from 'tape'
import Match from './index'
import Orderbook from '../orderbook/index'
import Settlement from '../settlement/index'
import { db } from '../leveldb/index'

const tokenA = '0x6846e948d8b1ec25bb99dedf821b0d658e226595'
const tokenB = '0x2da664251cdff1ef96471d5570d6b7d3687b4516'

const orderbook = new Orderbook({
  tokenA,
  tokenB,
  db
})

const settlement = new Settlement({
  tokenA,
  tokenB,
  db
})

const matchingAgent = new Match({
  settlement,
  orderbook,
})

function setup() {
  // need to start matching daemon
  settlement.daemon()
  console.log('did we make it')
}


setup()

test('should not match given orders out of the market', (t) => {

})

console.log('made it here')
console.log('matchingAgent', matchingAgent)
