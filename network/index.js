import Promise from 'bluebird'
import { sha256, sha3, privateToAddress } from 'ethereumjs-util'

import Permutation from '../permutation/index'
import { contracts} from '../factory/contracts'
import { db } from '../leveldb/index'

class Network {
  constructor() {
    this.permutations = {}
    this.createNetwork()
  }

  getConnectedTopology() {
    return new Promise((resolve, reject) => {
      let permutations = []
      return Promise.delay(0)
      .then(() => {
        return Object.keys(contracts)
      }).map((contract) => {
        const baseContract = contract
        return Object.keys(contracts).map((contract) => {
          if (contract > baseContract) {
            this.permutationHash(baseContract, contract)
            .then((key) => {
              permutations[key] = {
                tokenA: baseContract,
                tokenB: contract
              }
            })
          }
        })
      }).then(() => {
        resolve(permutations)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  createNetwork() {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        return this.getConnectedTopology()
      }).map((permutation) => {
        console.log('### CREATING PERMUTATION FOR TOKEN PAIR', contracts[permutation.tokenA].name, contracts[permutation.tokenB].name)

        this.permutations[`${contracts[permutation.tokenA].name}_${contracts[permutation.tokenB]}`] = new Permutation({
          tokenA: permutation.tokenA,
          tokenB: permutation.tokenB,
          db: db
        })
      }).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }


  permutationHash(tokenA, tokenB) {
    return new Promise((resolve, reject) => {
      return this.alphaNumericSort(tokenA, tokenB)
      .then((res) => {
        console.log('res', res)
        if(res == 1) {
          return this.hashSortedPair(`${tokenB}_${tokenA}`)
          return [tokenB, tokenA]
        } else {
          return this.hashSortedPair(`${tokenA}_${tokenB}`)
        }
      }).then((key) => {
        console.log('key', key)
        resolve(key)
      })
    })
  }

  alphaNumericSort(tokenA, tokenB) {
    return new Promise((resolve, reject) => {
      console.log('tokenA', tokenA, tokenB)
      resolve(tokenA.localeCompare(tokenB))
    })
  }

  hashSortedPair(pair) {
    return new Promise((resolve, reject) => {
      resolve('0x' + privateToAddress(sha3(pair)).toString('hex'))
    })
  }
}


const network = new Network()
