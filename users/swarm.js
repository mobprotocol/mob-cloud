import Promise from 'bluebird'

import User from './index'

let operator
const users = {}
const swarm_amount = 100

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
