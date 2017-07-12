import Orderbook from '../orderbook/Orderbook'

export function oneSimultation() {
  return new Promise((resolve, reject) => {
    const orderbook = new Orderbook({
      tokenA: '0x6846e948d8b1ec25bb99dedf821b0d658e226595',
      tokenB: '0x2da664251cdff1ef96471d5570d6b7d3687b4516'
    })
    console.log('orderbook', orderbook)
  })
}

oneSimultation()
