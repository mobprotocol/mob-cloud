import Promise from 'bluebird'
import { sha3 } from 'etheremjs-uitl'

let nonce
let prevhash


export function appendState(state) {
  return new Promise((resolve, reject) => {
    return Promise.delay(0)
    .then(() => {
      return sha3(state)
    }).then((hash) => {
      return sha3({
        state: ,
        prevhash: ,
        nonce: ,
        timestamp: ,
      })
    })
  })
}
