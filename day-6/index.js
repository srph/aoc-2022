const { uniq } = require('lodash')
const { input } = require('./input')

function stepOne() {
  for (let i = 0; i < input.length; i++) {
    const sequence = input.substr(i, 4).split('')

    if (uniq(sequence).length === 4) {
      return i + 4
    }
  }
}

function stepOne() {
  for (let i = 0; i < input.length; i++) {
    const sequence = input.substr(i, 14).split('')

    if (uniq(sequence).length === 14) {
      return i + 14
    }
  }
}

console.log('Step one ->', stepOne())
