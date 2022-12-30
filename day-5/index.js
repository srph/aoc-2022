const { stacks, moves } = require('./input')

function partOne() {
  const movement = moves.map((move) => {
    const [_countString, countValue, _fromString, fromValue, _toString, toValue] = move.split(' ')
    const [count, from, to] = [countValue, fromValue, toValue].map(Number)
    return { count, from: from - 1, to: to - 1 }
  })

  for (const { count, from, to } of movement) {
    const values = stacks[from].splice(0, count)
    stacks[to].splice(0, 0, ...values.reverse())
  }

  const values = stacks.map((stack) => {
    return stack[0]
  })

  return values.join('')
}

console.log('Part one ->', partOne())
