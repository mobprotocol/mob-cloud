import Promise from 'buebird'

const fs = Promise.promisifyAll(require('fs'))
const jsonfile = Promise.promisifyAll(require('jsonfile'))
