import Promise from 'bluebird'
import keythereum from 'keythereum'

const options = {
  kdf: "pbkdf2",
  cipher: "aes-128-ctr",
  kdfparams: {
    c: 262144,
    dklen: 32,
    prf: "hmac-sha256"
  }
};

export default class User {
  constructor(name) {
    console.log('### creating User instance', name)
    this.name = name
    this.privateKey
    this.publicKey
  }

  setupAccount() {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        return this.generatePrivKey()
      }).then(() => {
        return this.generatePublicKey()
      }).then(() => {
        return this.writeToFile()
      }).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  generatePrivKey() {
    return new Promise((resolve, reject) => {
      return keythereum.create({ keyBytes: 32, ivBytes: 16 }, (res) => {
        this.dk = res
        this.privateKey = this.dk.privateKey.toString('hex')
        resolve(true)
      })
    })
  }

  generatePublicKey() {
    return new Promise((resolve, reject) => {
      return keythereum.dump('password', this.dk.privateKey, this.dk.salt, this.dk.iv, options, (res) => {
        this.publicKey = res.address
        resolve(true)
      })
    })
  }

  writeToFile() {

  }
}
