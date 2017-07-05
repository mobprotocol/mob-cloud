import Promise from 'bluebird'

import User from './index'

let operator
let users = []
let swarm_amount = 100

export function exchangeOperator() {
  return new Promise((resolve, reject) => {
    return Promise.delay(0)
    .then(() => {
      return operator = new User()
    })
  })
}

export function traders() {
  return new Promise((resolve, reject) => {
    return Promise.delay(500)
    .then(() => {
      return users[swarm_amount] = new User()
    }).then(() => {
      if (swarm_amount <= 0) {
        resolve(true)
      } else {
        swarm_amount = swarm_amount - 1
        return traders()
      }
    }).catch((err) => {
      reject(err)
    })
  })
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
