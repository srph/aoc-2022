const { input } = require('./input')

function stepOne() {
  const parse = () => {
    return input.map((configurations) => {
      const data = { inspection: 0 }

      for (const config of configurations) {
        if (config.startsWith('Monkey')) {
          const [_, values] = config.split(' ')
          data.id = values.substr(0, 1)
        }

        if (config.startsWith('Starting')) {
          const [_, _2, ...values] = config.split(' ')
          data.startingItems = values.map((v) => Number(v.replace(',', '')))
        }

        if (config.startsWith('Operation')) {
          const [_, _2, _3, left, operation, right] = config.split(' ')
          data.operation = { left, operation, right }
        }

        if (config.startsWith('Test')) {
          const [_, ...values] = config.split(' ')
          data.test = { value: Number(values[values.length - 1]) }
        }

        if (config.startsWith('If true')) {
          const [_, ...values] = config.split(' ')
          data.test.truthy = Number(values[values.length - 1])
        }

        if (config.startsWith('If false')) {
          const [_, ...values] = config.split(' ')
          data.test.falsy = Number(values[values.length - 1])
        }
      }

      return data
    })
  }

  const monkeys = parse()

  const rules = {
    max: 20
  }

  for (let i = 0; i < rules.max; i++) {
    console.log('Round', i + 1)

    for (const monkey of monkeys) {
      console.log(`Monkey ${monkey.id}: ${monkey.startingItems.join(', ')}`)

      const items = [...monkey.startingItems]

      monkey.inspection = monkey.inspection + monkey.startingItems.length

      for (const item of items) {
        const right = monkey.operation.right === 'old' ? item : Number(monkey.operation.right)

        const ops = {
          '+': () => (item + right) / 3,
          '*': () => (item * right) / 3
        }

        const worry = Math.floor(ops[monkey.operation.operation]())

        monkey.startingItems.splice(0, 1)

        if (worry % monkey.test.value === 0) {
          //   console.log(`thrown to ${monkey.test.truthy}`)
          monkeys[monkey.test.truthy].startingItems.push(worry)
        } else {
          //   console.log(`thrown to ${monkey.test.falsy}`)
          monkeys[monkey.test.falsy].startingItems.push(worry)
        }

        // console.log('-')
      }
    }
  }

  const sorted = [...monkeys].sort((a, b) => {
    return b.inspection - a.inspection
  })

  console.log(
    sorted.map((monkey) => {
      return `Monkey ${monkey.id} inspected items ${monkey.inspection} times.`
    })
  )

  return sorted.slice(0, 2).reduce((total, value) => {
    return total * value.inspection
  }, 1)
}

function stepTwo() {}

console.log('Step one ->', stepOne())
console.log('Step two ->', stepTwo())
