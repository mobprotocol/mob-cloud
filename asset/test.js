import Promise from 'bluebird'

import Eths6 from '../eths6/index'
import Asset from './index'
import User from '../users/index'

let operator
let asset

export function createAsset() {
  return new Promise((resolve, reject) => {
    return Promise.delay(0)
    .then(() => {
      console.log(1)
      return operator = new User('operator')
    }).then(() => {
      return operator.setupAccount()
    }).then(() => {
      console.log('operator', operator.publicKey)
      return asset = new Asset({
        file: 'Asset',
        deploy: true,
        name: 'Mob',
        ticker: 'MOB',
        supply: 1000000000,
        owner: operator.publicKey
      })
    }).then(() => {
      resolve(true)
    }).catch((err) => {
      reject(err)
    })
  })
}

createAsset()
