import Promise from 'bluebird'

import { db } from '../api/index'
import Permutation from '../permutation/index'
import { contracts} from '../factory/contracts'

export function fullyConnectedTopology() {
  return new Promise((resolve, reject) => {
    let permutations = []
    return Promise.delay(0)
    .then(() => {
      return Object.keys(contracts)
    }).map((contract) => {
      const baseContract = contract
      return Object.keys(contracts).map((contract) => {
        if (contract > baseContract) {
          permutations.push({
            tokenA: baseContract,
            tokenB: contract
          })
        }
      })
    }).then(() => {
      console.log('permutations', permutations.length)
      console.log('made it')
      resolve(true)
    }).catch((err) => {
      reject(err)
    })
  })
}





fullyConnectedTopology()
