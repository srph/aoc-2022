const { input } = require('./input')

function stepOne() {
  const movement = {
    U: { x: 0, y: 1 },
    D: { x: 0, y: -1 },
    L: { x: -1, y: 0 },
    R: { x: 1, y: 0 }
  }

  const head = {
    x: 0,
    y: 0
  }

  const tail = {
    x: 0,
    y: 0
  }

  const visited = {
    '0-0': true
  }

  for (const command of input) {
    const [direction, units] = command.split(' ')

    const value = Number(units)

    for (let i = 0; i < value; i++) {
      head.x += movement[direction].x
      head.y += movement[direction].y

      const distance = {
        x: head.x - tail.x,
        y: head.y - tail.y
      }

      if (Math.abs(distance.x) >= 2 && Math.abs(distance.y)) {
        tail.x = tail.x + distance.x / 2
        tail.y = tail.y + distance.y
      } else if (Math.abs(distance.y) >= 2 && Math.abs(distance.y)) {
        tail.x = tail.x + distance.x
        tail.y = tail.y + distance.y / 2
      } else if (Math.abs(distance.x) >= 2) {
        tail.x = tail.x + distance.x / 2
      } else if (Math.abs(distance.y) >= 2) {
        tail.y = tail.y + distance.y / 2
      }

      visited[`${tail.x}-${tail.y}`] = true
    }
  }

  return Object.keys(visited).length
}

function stepTwo() {
  const movement = {
    U: { x: 0, y: 1 },
    D: { x: 0, y: -1 },
    L: { x: -1, y: 0 },
    R: { x: 1, y: 0 }
  }

  const head = {
    x: 0,
    y: 0
  }

  const knots = Array.from({ length: 9 }).fill({
    x: 0,
    y: 0
  })

  const visited = {
    '0-0': true
  }

  const adjust = (previous, knot) => {
    const copy = { ...knot }

    const distance = {
      x: previous.x - copy.x,
      y: previous.y - copy.y
    }

    if (Math.abs(distance.x) >= 2 && Math.abs(distance.y) >= 2) {
      copy.x = copy.x + Math.floor(distance.x / 2)
      copy.y = copy.y + Math.floor(distance.y / 2)
    } else if (Math.abs(distance.x) >= 2) {
      copy.x = copy.x + Math.floor(distance.x / 2)
      copy.y = copy.y + distance.y
    } else if (Math.abs(distance.y) >= 2) {
      copy.x = copy.x + distance.x
      copy.y = copy.y + Math.floor(distance.y / 2)
    }

    return copy
  }

  for (const command of input) {
    const [direction, units] = command.split(' ')

    const value = Number(units)

    for (let i = 0; i < value; i++) {
      head.x += movement[direction].x
      head.y += movement[direction].y

      for (let i = 0; i < knots.length; i++) {
        knots[i] = adjust(i === 0 ? head : knots[i - 1], knots[i])
      }

      const tail = knots[knots.length - 1]

      visited[`${tail.x}-${tail.y}`] = true
    }
  }

  return Object.keys(visited).length
}

console.log('Step one ->', stepOne())
console.log('Step two ->', stepTwo())
