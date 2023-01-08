const input = [
  [
    'Monkey 0:',
    'Starting items: 91, 54, 70, 61, 64, 64, 60, 85',
    'Operation: new = old * 13',
    'Test: divisible by 2',
    'If true: throw to monkey 5',
    'If false: throw to monkey 2'
  ],

  [
    'Monkey 1:',
    'Starting items: 82',
    'Operation: new = old + 7',
    'Test: divisible by 13',
    'If true: throw to monkey 4',
    'If false: throw to monkey 3'
  ],

  [
    'Monkey 2:',
    'Starting items: 84, 93, 70',
    'Operation: new = old + 2',
    'Test: divisible by 5',
    'If true: throw to monkey 5',
    'If false: throw to monkey 1'
  ],

  [
    'Monkey 3:',
    'Starting items: 78, 56, 85, 93',
    'Operation: new = old * 2',
    'Test: divisible by 3',
    'If true: throw to monkey 6',
    'If false: throw to monkey 7'
  ],

  [
    'Monkey 4:',
    'Starting items: 64, 57, 81, 95, 52, 71, 58',
    'Operation: new = old * old',
    'Test: divisible by 11',
    'If true: throw to monkey 7',
    'If false: throw to monkey 3'
  ],

  [
    'Monkey 5:',
    'Starting items: 58, 71, 96, 58, 68, 90',
    'Operation: new = old + 6',
    'Test: divisible by 17',
    'If true: throw to monkey 4',
    'If false: throw to monkey 1'
  ],

  [
    'Monkey 6:',
    'Starting items: 56, 99, 89, 97, 81',
    'Operation: new = old + 1',
    'Test: divisible by 7',
    'If true: throw to monkey 0',
    'If false: throw to monkey 2'
  ],

  [
    'Monkey 7:',
    'Starting items: 68, 72',
    'Operation: new = old + 8',
    'Test: divisible by 19',
    'If true: throw to monkey 6',
    'If false: throw to monkey 0'
  ]
]

exports.input = input

// exports.input = [
//   [
//     'Monkey 0:',
//     'Starting items: 79, 98',
//     'Operation: new = old * 19',
//     'Test: divisible by 23',
//     'If true: throw to monkey 2',
//     'If false: throw to monkey 3'
//   ],

//   [
//     'Monkey 1:',
//     'Starting items: 54, 65, 75, 74',
//     'Operation: new = old + 6',
//     'Test: divisible by 19',
//     'If true: throw to monkey 2',
//     'If false: throw to monkey 0'
//   ],

//   [
//     'Monkey 2:',
//     'Starting items: 79, 60, 97',
//     'Operation: new = old * old',
//     'Test: divisible by 13',
//     'If true: throw to monkey 1',
//     'If false: throw to monkey 3'
//   ],

//   [
//     'Monkey 3:',
//     'Starting items: 74',
//     'Operation: new = old + 3',
//     'Test: divisible by 17',
//     'If true: throw to monkey 0',
//     'If false: throw to monkey 1'
//   ]
// ]
