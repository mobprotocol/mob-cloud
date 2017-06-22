import Promise from 'bluebird'

import { db } from '../api/index'
import Permutation from '../permutation/index'
import { contracts} from '../factory/contracts'

export function fullyConnectedTopology() {
  return new Promise((resolve, reject) => {
    return Promise.delay(0)
    .then(() => {
      return Object.keys(contracts)
    }).map((contract) => {
      console.log('contract', contract)
      return contract.ticker
    }).then(() => {
      console.log('made it')
      resolve(true)
    }).catch((err) => {
      reject(err)
    })
  })
}

fullyConnectedTopology()
