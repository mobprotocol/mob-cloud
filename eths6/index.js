import Web3 from 'web3'
import Promise from 'buebird'
const fs = Promise.promisifyAll(require('fs'))
const jsonfile = Promise.promisifyAll(require('jsonfile'))

export default class Eths6 {
  constructor(params) {
    this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"),
    this.file = params.file,
    this.owner = params.file
    this.setupContract()
    this.address
    this.contract
    this.instance
    this.abi
    this.bytecode
    this.gasEstimate
    this.contractParams
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
  DEPLOY CONTRACT
  //////////////////////////////////////////////////////////////////////////////
  */

  deploy() {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        return this.getCompiled(this.file)
      }).then((compiled) => {
        return this.deployContract(compiled)
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
        resolve(data)
      }).catch((err) => {
        reject(err)
      })
    })
  }

  deployContract(compiled) {
    return new Promise((resolve, reject) => {
      return Promise.delay(0)
      .then(() => {
        this.bytecode = compiled.contracts[this.file].interface
        this.abi = compiled.contracts[this.file].bytecode
        return this.gasEstimate = web3.eth.estimageGAs({ data: this.bytecode })
      }).then(() => {
        return this.contract = web3.eth.contract(JSON.parse(this.abi))
      }).then(() => {
        return ({
          from: this.owner,
          data: this.bytecode,
          gas: this.gasEstimate
        })
      }).then((sendObject) => {
        return this.instance = this.contract.new(
          ...contractParams,
          sendObject
        )
      }).then((txHash) => {
        console.log('### contract deployed w/ tx hash', txHash)
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