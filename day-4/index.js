const { input } = require('./input')

function partOne() {
  let total = 0

  const values = input.map((pair) => {
    return pair.map((value) => {
      return value.split('-').map(Number)
    })
  })

  const isFullyOverlapping = ([aMin, aMax], [bMin, bMax]) => {
    if (aMin <= bMin && aMax >= bMax) {
      return true
    }

    return false
  }

  for (const pair of values) {
    const [a, b] = pair

    if (isFullyOverlapping(a, b) || isFullyOverlapping(b, a)) {
      total += 1
    }
  }

  return total
}

function partTwo() {
  let total = 0

  const values = input.map((pair) => {
    return pair.map((value) => {
      return value.split('-').map(Number)
    })
  })

  const isSubset = ([aMin, aMax], [bMin, bMax]) => {
    if (aMin >= bMin && aMin <= bMax) {
      return true
    }

    return false
  }

  for (const pair of values) {
    const [a, b] = pair

    if (isSubset(a, b) || isSubset(b, a)) {
      total += 1
    }
  }

  return total
}

console.log('Part one ->', partOne())
console.log('Part two ->', partTwo())
