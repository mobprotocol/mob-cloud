import Web3 from 'web3'
import Promise from 'buebird'
const fs = Promise.promisifyAll(require('fs'))
const jsonfile = Promise.promisifyAll(require('jsonfile'))

export default class Eths6 {
  constructor(params) {
    this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545")
    this.file = params.file,
    params.
    this.setupContract(params.compile, params.deploy)
  }

  /**
  //////////////////////////////////////////////////////////////////////////////
  CONTRACT INIT
  //////////////////////////////////////////////////////////////////////////////
  */

  setupContract(compile, deploy) {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        // if (compile) {
        //   return this.compile(this.file)
        // }
      }).then(() => {
        if (deploy) {
          return this.deploy()
        }
      }).then(() => {
        return listeners()
      }).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  /**
  //////////////////////////////////////////////////////////////////////////////
  DEPLOY CONTRACT
  //////////////////////////////////////////////////////////////////////////////
  */

  deploy() {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        return this.getCompiled()
      }).then((abi) => {
        reuturn
      })
    })
  }

  getCompiled() {
    return new Promise((resolve, reject) => {
      const file = this.file.slice(-3)
      console.log('file', file)
      jsonfile.readFileAsync(`${__dirname}/${file}.compiled.json`)
      .then((data) => {
        console.log('data', data)
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  listeners(events) {
    console.log('### setting up event listeners')
  }

  /**
  //////////////////////////////////////////////////////////////////////////////
  COMPILE CONTRACT
  //////////////////////////////////////////////////////////////////////////////
  */

  compile(directory, file) {
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

  getContractData(directory, file) {
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

  solcCompile(data) {
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

  writeCompiledFile(directory, file, compiled) {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        let fileName = file.slice(0, -4)
        return jsonfile.writeFileAsync(`${directory}/${fileName}.compiled.json`, compiled)
      }).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  /**
  //////////////////////////////////////////////////////////////////////////////
  CONTRACT LISTENERS
  //////////////////////////////////////////////////////////////////////////////
  */

  
}
