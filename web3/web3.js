import Promise from 'bluebird'

export default class Web3Interface {
  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")
  }

  deploy() {

  }
}
