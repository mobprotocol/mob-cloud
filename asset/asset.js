import { compile } from '../web3/compile'
import Web3Interface from '../web3/web3'

export default class Asset {
  constructor(params) {
    console.log('setting up token instance', params)
    this.name = params.name
    this.symbol = params.symbol
    this.supply = params.supply
    this.setupTokenContract()
  }

  setupTokenContract() {
    compile(__dirname, 'Asset.sol')
  }


}
