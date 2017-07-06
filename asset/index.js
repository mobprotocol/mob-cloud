import Eths6 from '../eths6/index'

export default class Asset {
  constructor(params) {
    this.name = params.name
    this.symbol = params.symbol
    this.supply = params.supply
    this.contract = new Eths6({
      file: params.file,
      dir: __dirname,
      name: params.name,
      symbol: params.symbol,
      supply: params.supply

    })
  }
}
