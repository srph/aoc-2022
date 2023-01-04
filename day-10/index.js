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
      circuit.cycle = circuit.cycle + 1

      if (command === 'addx' && i === cycles[command] - 1) {
        circuit.total = circuit.total + Number(value)
      }

      if (spikes.includes(circuit.cycle)) {
        const signal = circuit.cycle * circuit.total
        circuit.signal = circuit.signal + signal
      }
    }
  }

  return circuit.signal
}

function stepTwo() {}

console.log('Step one ->', stepOne())
console.log('Step two ->', stepTwo())
