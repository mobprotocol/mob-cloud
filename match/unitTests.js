import test from 'tape'
import Match from './index'
import Orderbook from '../orderbook/index'
import { db } from '../leveldb/index'

const tokenA = '0x6846e948d8b1ec25bb99dedf821b0d658e226595'
const tokenB = '0x2da664251cdff1ef96471d5570d6b7d3687b4516'
test('should not match given orders out of the market', (t) => {
  const orderbook = new Orderbook({
    tokenA,
    tokenB,
    db
  })
  const match = new
})
