import Promise from 'bluebird'
import { createPermutation } from '../permutation/index'
import { contracsts, pair } from './contracts'
import Asset from '../asset/index'
import Web3 from 'web3'

const web3 = new Web3()
web3.setProvider(new web3.providers.HttpProvider('http://localhost:8545'));

let owner
export function tokenPair() {
  return new Promise((resolve, reject) => {
    return web3.eth.getAccounts()
    .then((accounts) => {
      owner = accounts[0]
      return pair
    }).map((asset) => {
      console.log('asset', asset)
      return new Asset({
        file: 'Asset',
        name: asset.name,
        ticker: asset.ticker,
        supply: asset.supply,
        deploy: true,
        owner: owner
      })
    }).then(() => {
      resolve(true)
    }).catch((err) => {
      reject(err)
    })
  })
}

tokenPair()
