const { input } = require('./input')

function stepOne() {
  const cycles = {
    addx: 2,
    noop: 1
  }

  const spikes = [20, 60, 100, 140, 180, 220]

  const circuit = {
    total: 1,
    signal: 0,
    cycle: 1
  }

  for (const instruction of input) {
    const [command, value] = instruction.split(' ')

    for (let i = 0; i < cycles[command]; i++) {
      if (spikes.includes(circuit.cycle)) {
        const signal = circuit.cycle * circuit.total
        circuit.signal = circuit.signal + signal
      }

      circuit.cycle = circuit.cycle + 1
    }

    if (command === 'addx') {
      circuit.total = circuit.total + Number(value)
    }
  }

  return circuit.signal
}

function stepTwo() {
  const cycles = {
    addx: 2,
    noop: 1
  }

  const circuit = {
    total: 1,
    cycle: 1
  }

  const size = {
    width: 40,
    height: 6
  }

  const screen = Array.from({ length: size.height }).map(() => {
    return Array.from({ length: size.width }).fill('.')
  })

  for (const instruction of input) {
    const [command, value] = instruction.split(' ')

    for (let i = 0; i < cycles[command]; i++) {
      const pixel = {
        row: Math.ceil(circuit.cycle / 40) - 1,
        column: (circuit.cycle - 1) % 40
      }

      const sprite = {
        column: circuit.total % 40
      }

      if (sprite.column - 1 <= pixel.column && sprite.column + 1 >= pixel.column) {
        screen[pixel.row][pixel.column] = '#'
      }

      circuit.cycle = circuit.cycle + 1
    }

    if (command === 'addx') {
      circuit.total = circuit.total + Number(value)
    }
  }

  return (
    '\n' +
    screen
      .map((columns) => {
        return columns.join('')
      })
      .join('\n')
  )
}

console.log('Step one ->', stepOne())
console.log('Step two ->', stepTwo())
