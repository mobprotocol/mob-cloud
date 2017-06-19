import Promise from 'bluebird'
import solc from 'solc'

const fs = Promise.promisifyAll(require('fs'))
const jsonfile = Promise.promisifyAll(require('jsonfile'))

export function compile(directory, file) {
  return new Promise((resolve, reject) => {
    return Promise.delay(0)
    .then(() => {
      return getContractData(directory, file)
    }).then((data) => {
      return solcCompile(data)
    }).then((compiled) => {
      console.log('compiled', compiled)
      return true
    }).then(() => {
      resolve(true)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function getContractData(directory, file) {
  console.log('### getting contract data')
  return new Promise((resolve, reject) => {
    return Promise.delay(0)
    .then(() => {
      return fs.readFileAsync(`${directory}/${file}`)
    }).then((file) => {
      resolve(file.toString())
    }).catch((err) => {
      reject(err)
    })
  })
}

export function solcCompile(data) {
  return new Promise((resolve, reject) => {
    return Promise.delay(0)
    .then(() => {
      console.log('data', data)
      return solc.compile(data)
    }).then((compiled) => {
      console.log('compiled')
      resolve(compiled)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function writeCompiledFile(compiled) {
  console.log('### writing compiled artificats')
}
