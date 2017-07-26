import Promise from 'bluebird'
import { createPermutation } from '../permutation/index'
import { contracsts, pair } from './contracts'
import Asset from '../asset/index'
import Web3 from 'web3'

const web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

let account
export function tokenPair() {
  return new Promise((resolve, reject) => {
    return getAccount()
    .then(() => {
      console.log('pair', pair)
      return pair
    }).map((asset) => {
      console.log('asset', asset)
      return new Asset({
        name: asset.name,
        ticker: asset.ticker,
        supply: asset.supply,
        file: 'Asset'
      })
    }).then(() => {
      resolve(true)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function getAccount() {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((res, err) => {
      if(err) { reject(err) }
      resolve(res[0])
    })
  })
}

tokenPair()
