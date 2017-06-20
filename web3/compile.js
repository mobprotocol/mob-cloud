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
      return writeCompiledFile(directory, file, compiled)
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
      return solc.compile(data)
    }).then((compiled) => {
      resolve(compiled)
    }).catch((err) => {
      reject(err)
    })
  })
}

export function writeCompiledFile(directory, file, compiled) {
  return new Promise((resolve, reject) => {
    return Promise.delay(0)
    .then(() => {
      console.log('compiled', compiled)
      let fileName = file.slice(0, -3)
      console.log('fileName', fileName)
      console.log('writing to', `${directory}/${file}.compiled.json`)
      return jsonfile.writeFileAsync(`${directory}/${fileName}.compiled.json`)
    }).then(() => {
      resolve(true)
    }).catch((err) => {
      reject(err)
    })
  })
}
