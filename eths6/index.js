import Web3 from 'web3'
import Promise from 'buebird'
const fs = Promise.promisifyAll(require('fs'))
const jsonfile = Promise.promisifyAll(require('jsonfile'))

export default class Eths6 {
  constructor(params) {
    this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")
    this.file = params.file,
    params.
    this.setupContract(params.compile, params.deploy)
  }

  setupContract(compile, deploy) {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        if (compile) {
          return this.compile(this.file)
        }
      }).then(() => {
        if (deploy) {
          return this.deploy()
        }
      }).then(() => {
        return listeners()
      }).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  deploy() {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        return this.getCompiled()
      }).then((abi) => {
        reuturn
      })
    })
  }

  listeners(events) {
    console.log('### setting up event listeners')
  }
}
