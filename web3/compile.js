import Promise from 'bluebird'
import solc from 'solc'

const fs = Promise.promisifyAll(require('fs'))
const jsonfile = Promise.promisifyAll(require('jsonfile'))

export function compile(paths) {
  return new Promise((resolve, reject) => {
    return Promise.delay(0)
    .then(() => {
      return getContractFiles(paths)
    }).then((files) => {
      return solcCompile(files)
    }).then((compiled) => {
      return writeCompiledFile((compiled)
    }).then(() => {
      resolve(true)
    }).catch((err) => {
      reject(true)
    })
  })
}

// export function getContractFiles(paths) {
//   console.log('## getting contract data')
// }
