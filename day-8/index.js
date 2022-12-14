const { input } = require('./input')

// 3784 too high
function stepOne() {
  const data = input.map((row) => {
    return row.split('').map(Number)
  })

  let visible = 0

  for (const [x, row] of data.entries()) {
    for (const [y, value] of row.entries()) {
      const visibleFromTop = () => {
        const trees = data
          .map((tree) => {
            return tree[y]
          })
          .filter((_, i) => {
            return i < x
          })

        for (const tree of trees) {
          if (tree >= value) {
            return false
          }
        }

        return true
      }

      const visibleFromLeft = () => {
        const trees = data[x].filter((_, i) => {
          return i < y
        })

        for (const tree of trees) {
          if (tree >= value) {
            return false
          }
        }

        return true
      }

      const visibleFromRight = () => {
        const trees = data[x].filter((_, i) => {
          return i > y
        })

        for (const tree of trees) {
          if (tree >= value) {
            return false
          }
        }

        return true
      }

      const visibleFromBottom = () => {
        const trees = data
          .map((tree) => {
            return tree[y]
          })
          .filter((_, i) => {
            return i > x
          })

        for (const tree of trees) {
          if (tree >= value) {
            return false
          }
        }

        return true
      }

      if (visibleFromTop() || visibleFromLeft() || visibleFromRight() || visibleFromBottom()) {
        visible++
      }
    }
  }

  return visible
}

function stepTwo() {
  const data = input.map((row) => {
    return row.split('').map(Number)
  })

  const scores = []

  for (const [x, row] of data.entries()) {
    for (const [y, value] of row.entries()) {
      const getSceneScoreFromTop = () => {
        const trees = data
          .map((tree) => {
            return tree[y]
          })
          .filter((_, i) => {
            return i < x
          })
          .reverse()

        let score = 0

        for (const tree of trees) {
          score++

          if (tree >= value) {
            break
          }
        }

        return score
      }

      const getSceneScoreFromLeft = () => {
        const trees = data[x]
          .filter((_, i) => {
            return i < y
          })
          .reverse()

        let score = 0

        for (const tree of trees) {
          score++

          if (tree >= value) {
            break
          }
        }

        return score
      }

      const getSceneScoreFromRight = () => {
        const trees = data[x].filter((_, i) => {
          return i > y
        })

        let score = 0

        for (const tree of trees) {
          score++

          if (tree >= value) {
            break
          }
        }

        return score
      }

      const getSceneScoreFromBottom = () => {
        const trees = data
          .map((tree) => {
            return tree[y]
          })
          .filter((_, i) => {
            return i > x
          })

        let score = 0

        for (const tree of trees) {
          score++

          if (tree >= value) {
            break
          }
        }

        return score
      }

      scores.push(
        getSceneScoreFromTop() * getSceneScoreFromLeft() * getSceneScoreFromRight() * getSceneScoreFromBottom()
      )
    }
  }

  return scores.sort((a, b) => {
    return b - a
  })[0]
}

console.log('Step one ->', stepOne())
console.log('Step two ->', stepTwo())
