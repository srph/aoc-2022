const { chunk } = require('lodash')
const { input } = require('./input')

const common = chunk(input, 3).map((group) => {
  for (const rucksack of group) {
    const others = group.filter((r) => {
      return r !== rucksack
    })

    for (const character of rucksack.split('')) {
      if (others.every((r) => r.includes(character))) {
        return character
      }
    }
  }
})

const lowerCaseScore = (character) => {
  return character.charCodeAt(0) - 'a'.charCodeAt(0) + 1
}

const upperCaseScore = (character) => {
  return character.charCodeAt(0) - 'A'.charCodeAt(0) + 1
}

const score = (character) => {
  if (/[a-z]/.test(character)) {
    return lowerCaseScore(character)
  }

  return upperCaseScore(character) + lowerCaseScore('z')
}

const totalScore = common.reduce((total, character) => {
  return total + score(character)
}, 0)

console.log(totalScore)
