import Promise from 'bluebird'
import { sha256 } from 'ethereumjs-util'

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
            permutationHash(baseContract, contract)
            .then(() => {
              permutations.push({
                tokenA: baseContract,
                tokenB: contract
              })
            })
          }
        })
      }).then(() => {
        console.log('permutations', permutations.length)
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
      return alphaNumericSort(tokenA, tokenB)
      .then((res) => {
        if(res == 1) {
          return hashSortedPair(`${tokenB}_${tokenA}`)
        } else {
          return hashSortedPair(`${tokenA}_${tokenB}`)
        }
      }).then((key) => {
        resolve(key)
      })
    })
  }

  alphaNumericSort() {
    return new Promise((resolve, reject) => {
      resolve(1)
    })
  }

  hashSortedPair(pair) {
    return new Promise((resolve, reject) => {
      resolve(sha256(pair))
    })
  }
}


const network = new Network()
