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

const strategy = [
  ['A', 'X'],
  ['B', 'Y'],
  ['C', 'Z']
]

const scores = {
  opponent: 0,
  you: 0
}

// a

const rules = [
  ['rock', 'scissors'],
  ['paper', 'rock'],
  ['scissors', 'paper']
]

const ruleCheck = (a, b) => {
  for (const [winningMove, losingMove] of rules) {
    if (a === winningMove && b === losingMove) {
      return {
        a: outcome.won + shapes[a],
        b: outcome.lost + shapes[b]
      }
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

for (const [opponent, you] of strategy) {
  const { a: aScore, b: bScore } = check(mapping[opponent], mapping[you])
  console.log(aScore, bScore)
  scores.opponent += aScore
  scores.you += bScore
}

console.log(scores)
