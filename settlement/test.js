import Promise from 'bluebird'

import Settlement from './index'

let settlement

Promise.delay(0)
.then(() => {
  return settlement = new Settlement({
    tokenA: '0x6846e948d8b1ec25bb99dedf821b0d658e226595',
    tokenB: '0x2da664251cdff1ef96471d5570d6b7d3687b4516'
  })
}).then(() => {
  Promise.resolve(true)
}).catch((err) => {
  Promise.reject(err)
})


export function submitSettlements() {
  return new Promise((resolve, reject) => {
    return Promise.delay(0)
    .then(() => {
      return generateSettlement()
    }).then((_settlement) => {
      return this.settlement.queue = this.settlement.queue.unshift(_settlment)
    }).then(() => {
      console.log('this.settlement.queue', this.settlement.queue)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function generateSettlement() {

}
