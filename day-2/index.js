const { input } = require('./input')

const shapes = {
  rock: 1,
  paper: 2,
  scissors: 3
}

const outcome = {
  lost: 0,
  draw: 3,
  won: 6
}

const mapping = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
  X: 'rock',
  Y: 'paper',
  Z: 'scissors'
}

const scores = {
  opponent: 0,
  you: 0
}

const win = {
  rock: 'scissors',
  paper: 'rock',
  scissors: 'paper'
}

const lose = {
  rock: 'paper',
  paper: 'scissors',
  scissors: 'rock'
}

const ruleCheck = (a, b) => {
  if (a === lose[b] && b === win[a]) {
    return {
      a: outcome.won + shapes[a],
      b: outcome.lost + shapes[b]
    }
  }
}

const check = (a, b) => {
  if (a === b) {
    return {
      a: outcome.draw + shapes[a],
      b: outcome.draw + shapes[b]
    }
  }

  if (ruleCheck(a, b)) {
    return {
      a: outcome.won + shapes[a],
      b: outcome.lost + shapes[b]
    }
  }

  if (ruleCheck(b, a)) {
    return {
      a: outcome.lost + shapes[a],
      b: outcome.won + shapes[b]
    }
  }

  throw new Error(`Unable to process ${a} versus ${b}.`)
}

const guess = (a, b) => {
  const value = {
    X: win[mapping[a]],
    Y: mapping[a],
    Z: lose[mapping[a]]
  }

  return value[b]
}

for (const [opponent, you] of input) {
  const { a: aScore, b: bScore } = check(mapping[opponent], guess(opponent, you))
  scores.opponent += aScore
  scores.you += bScore
}

console.log(scores)
