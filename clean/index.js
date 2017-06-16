import Promise from 'bluebird'

export default class Clean {
  constructor(params) {
    this.orderbook = params.orderbook
    this.daemon()
  }

  daemon() {
    return new Promise((resolve, reject) => {
      return Promise.delay(5000)
      .then(() => {
        return this.orderbook.sellA.peekBack()
      }).then((element) => {
        console.log('Back element', element)
        return this.daemon()
      }).catch((err) => {
        reject(err)
      })
    })
  }

}
