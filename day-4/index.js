const { input } = require('./input')

function partOne() {
  let total = 0

  const values = input.map((pair) => {
    return pair.map((value) => {
      return value.split('-').map(Number)
    })
  })

  const isFullyOverlapping = ([aMin, aMax], [bMin, bMax]) => {
    // console.log([aMin, aMax], [bMin, bMax], aMin <= bMin && aMax >= bMax)

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

console.log('Part one ->', partOne())
