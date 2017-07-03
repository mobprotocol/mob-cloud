import Web3 from 'web3'
import Promise from 'buebird'
const fs = Promise.promisifyAll(require('fs'))
const jsonfile = Promise.promisifyAll(require('jsonfile'))

class Web3Interface {
  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")
  }

  deploy() {

  }
}

module.exports = {
  Web3Interface: new Web3Interface()
}
