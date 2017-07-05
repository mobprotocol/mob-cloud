import Eths6 from '../eths6/index'

export default class Asset {
  constructor(params) {
    console.log('setting up token instance', params)
    this.name = params.name
    this.symbol = params.symbol
    this.supply = params.supply
    this.setupTokenContract()
    this.contract = new Eths6({
      file: Asset,
      compile: true,
      deploy: true,
    })
  }

  setupTokenContract() {
    compile(__dirname, 'Asset.sol')
  }
}
