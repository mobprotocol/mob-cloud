import Web3 from 'web3'
import Promise from 'buebird'
const fs = Promise.promisifyAll(require('fs'))
const jsonfile = Promise.promisifyAll(require('jsonfile'))

export default class Eths6 {
  constructor(params) {
    this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"),
    this.file = params.file,
    this.setupContract()
    this.address
    this.contract
    this.instance
    this.abi
    this.bytecode
    this.gasEstimate
  }

  /**
  //////////////////////////////////////////////////////////////////////////////
  CONTRACT INIT
  //////////////////////////////////////////////////////////////////////////////
  */

  setupContract() {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        return this.checkCompiledExists()
      }).then((bool) => {
        if(!bool) {
          return this.compile()
        }
        return true
      }).then(() => {
        return this.deploy()
      }).then(() => {
        return this.listenerDaemon()
      }).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  listenderDaemon() {

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
        return this.getCompiled(this.file)
      }).then((abi) => {
        return this.deployContract(abi)
      }).then(() => {
        resolve(true)
      }).catch((err) => {
        reject(err)
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

  deployContract(abi) {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        return this.contract = web3.eth.contract(abi)
      }).then(() => {
        return ([])
      }).then((params) => {

      })
    })
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
      }).then(() => {
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

  checkCompiledExists() {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        return fs.existsAsync(`${__dirname}/${this.file}.compilied.json`)
      }).then((res) => {
        resolve(res)
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
        return fs.readFileAsync(`${directory}/${file}.sol`)
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

  listeners(events) {
    console.log('### setting up event listeners')
  }

}
