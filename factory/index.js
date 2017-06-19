import Promise from 'bluebird'
import { createPermutation } from '../permutation/index'
import { contracsts, pair } from './contracts'
import Asset from '../asset/asset'

  // createPermutation('tokenA', 'tokenB')

export function tokenPair() {
  return new Promise((resolve, reject) => {
    return Promise.delay(0)
    .then(() => {
      return pair
    }).map((asset) => {
      return new Asset({
        name: asset.name,
        ticker: asset.ticker,
        supply: asset.supply
      })
    }).then(() => {
      resolve(true)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function fullyConnectedTopology() {

}

tokenPair()
