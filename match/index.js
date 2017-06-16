import Promise from 'bluebird'

export default class Match {
  constructor(params) {
    this.orderbook = params.orderbook
    this.daemon()
  }

  daemon() {
    return new Promise((resolve, reject) => {
      return Promise.delay(1000)
      .then(() => {
        return this.orderbook.sellA
      }).then((book) => {
        console.log('sellA book', book)
        return this.daemon()
      }).catch((err) => {
        reject(err)
      })
    })
  }

}
