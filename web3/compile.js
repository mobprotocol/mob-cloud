import Promise from 'bluebird'
import solc from 'solc'

const fs = Promise.promisifyAll(require('fs'))
const jsonfile = Promise.promisifyAll(require('jsonfile'))

export function compile(directory, file) {
  return new Promise((resolve, reject) => {
    return Promise.delay(0)
    .then(() => {
      return getContractFile(directory, file)
    }).then((file) => {
      console.log('file', file)
    //   return solcCompile(files)
    // }).then((compiled) => {
    //   return writeCompiledFile(compiled)
    // }).then(() => {
      resolve(true)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function getContractFile(directory, file) {
  console.log('### getting contract data')
  return new Promise((resolve, reject) => {
    return Promise.delay(0)
    .then(() => {
      return fs.readdirAsync(`${directory}/${file}`)
    }).then((file) => {
      resolve(file)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function solcCompile(files) {
  console.log('### compiling contracts')
}

export function writeCompiledFile(compiled) {
  console.log('### writing compiled artificats')
}
