import Promise from 'bluebird'

export default class Clean {
  constructor(params) {
    this.orderbook = params.orderbook
  }

  daemon() {
    console.log('hey, hit the cleaning daemon')
  }

}
