import { compile } from '../web3/compile'
export default class Token {
  constructor(params) {
    this.name = params.name
    this.symbol = params.symbol
    this.supply = params.supply
    this.setupTokenContract()
  }

  setupTokenContract() {
    compile('/Token.sol')
  }
}
