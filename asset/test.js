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
      return operator = new User('operator')
    }).then(() => {
      return asset = new Asset({
        file: 'Asset',
        deploy: true,
        ownder: operator.publicKey
      })
    }).then(() => {
      resolve(true)
    }).catch((err) => {
      reject(err)
    })
  })
}

createAsset()
