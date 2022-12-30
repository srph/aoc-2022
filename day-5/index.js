const { stacks, moves } = require('./input')

function partOne() {
  const data = [...stacks]

  const movement = moves.map((move) => {
    const [_countString, countValue, _fromString, fromValue, _toString, toValue] = move.split(' ')
    const [count, from, to] = [countValue, fromValue, toValue].map(Number)
    return { count, from: from - 1, to: to - 1 }
  })

  for (const { count, from, to } of movement) {
    const values = data[from].splice(0, count)
    data[to].splice(0, 0, ...values.reverse())
  }

  const values = data.map((stack) => {
    return stack[0]
  })

  return values.join('')
}

function partTwo() {
  const data = [...stacks]

  const movement = moves.map((move) => {
    const [_countString, countValue, _fromString, fromValue, _toString, toValue] = move.split(' ')
    const [count, from, to] = [countValue, fromValue, toValue].map(Number)
    return { count, from: from - 1, to: to - 1 }
  })

  for (const { count, from, to } of movement) {
    const values = data[from].splice(0, count)
    data[to].splice(0, 0, ...values)
  }

  const values = data.map((stack) => {
    return stack[0]
  })

  return values.join('')
}

console.log('Part one ->', partOne())
console.log('Part two ->', partTwo())
