import Promise from 'bluebird'
import keythereum from 'keythereum'

export default class User {
  constructor(name) {
    console.log('### creating User instance', name)
    this.name = name
    this.address
    this.generateAddress()
  }

  generateAddress() {
    return new Promise((resolve, reject) => {
      this.dk = keythereum.create({ keyBytes: 32, ivBytes: 16 }, (res) => {
          this.dk = res
          console.log('privateKey', this.dk.privateKey.toString('utf-8'))
          console.log('iv', this.dk.iv.toString('utf-8'))
          console.log('salt', this.dk.salt.toString('utf-8'))
          resolve(true)
      })
    })
  }

}
