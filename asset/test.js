import Promise from 'bluebird'

import Eths6 from '../eths6/index'
import Asset from './index'

let asset
export function createAsset() {
  return new Promise((resolve, reject) => {
    return Promise.delay(0)
    .then(() => {
      return asset = new Asset({
        file: 'Asset',
        deploy: true
      })
    }).then(() => {
      resolve(true)
    }).catch((err) => {
      reject(err)
    })
  })
}

createAsset()
