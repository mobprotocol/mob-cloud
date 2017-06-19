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
    }).map((token) => {
      return new Asset({
        name: token.name,
        ticker: token.ticker,
        supply: token.supply
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
