import Promise from 'bluebird'
import keythereum from 'keythereum'


export function exchangeOperator() {

}

export function traders() {

}

export function createAccounts() {
  return new Promise((resolve, reject) => {
    return Promise.delay(0)
    .then(() => {
      return exchangeOperator()
    }).then(() => {
      return traders()
    }).then(() => {
      resolve(true)
    }).catch((err) => {
      reject(err)
    })
  })
}

createAccounts()
