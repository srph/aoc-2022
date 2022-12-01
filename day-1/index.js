const fs = require('fs')
const path = require('path')

const input = fs.readFileSync(path.join(__dirname, 'input.txt'), 'utf-8')

const elves = input.split('\r\n\r\n').map((lines, index) => {
  return {
    name: `Elf ${index + 1}`,
    total: lines
      .split('\r\n')
      .map((value) => {
        return Number(value)
      })
      .reduce((total, value) => {
        return total + value
      }, 0)
  }
})

const sorted = [...elves].sort((a, b) => {
  return b.total - a.total
})

console.table(
  sorted.map((elf) => {
    return [elf.name, elf.total]
  })
)
