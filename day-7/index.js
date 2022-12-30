let { input } = require('./input')

function stepOne() {
  /**
   * interface Tree {
   *  parent: Tree
   *  name: string
   *  directories: Tree[]
   *  files: { path: string, name: string, size: number }
   * }
   */
  let root = null

  let active = null

  let cursor = null

  for (let line of input) {
    if (line.startsWith('$')) {
      let [_, command, ...inputs] = line.split(' ')

      if (command === 'cd') {
        let [input] = inputs

        if (input === '/') {
          if (root == null) {
            root = {
              parent: null,
              name: '/',
              directories: [],
              files: []
            }
          }

          cursor = root
        } else if (input === '..') {
          cursor = cursor.parent ? cursor.parent : cursor
        } else {
          let [name] = inputs

          cursor = cursor.directories.find((directory) => {
            return directory.name === name
          })
        }
      }

      if (command === 'ls') {
        active = 'ls'
      }
    } else if (line.startsWith('dir')) {
      const [_, filename] = line.split(' ')

      const tree = {
        parent: cursor,
        name: filename,
        directories: [],
        files: []
      }

      cursor.directories.push(tree)
    } else if (/^[0-9]+\s/.test(line)) {
      const [size, filename] = line.split(' ')

      const file = {
        size: Number(size),
        name: filename
      }

      cursor.files.push(file)
    }
  }

  cursor = root

  const getSize = (directory) => {
    let size = 0

    for (const file of directory.files) {
      size += file.size
    }

    for (const sub of directory.directories) {
      size += getSize(sub)
    }

    return size
  }
  const qualified = []

  const search = (directory) => {
    let size = getSize(directory)

    if (getSize(directory) < 100_000) {
      qualified.push({ directory, size })
    }

    for (const sub of directory.directories) {
      search(sub)
    }
  }

  const getPathName = (directory) => {
    const stack = []

    let cursor = directory

    while (cursor) {
      stack.push(cursor.name)
      cursor = cursor.parent
    }

    return '/' + stack.reverse().slice(1).join('/')
  }

  search(root)

  qualified.map((data) => {
    return {
      name: getPathName(data.directory),
      size: data.size
    }
  })

  return qualified.reduce((total, data) => {
    return total + data.size
  }, 0)
}

function stepTwo() {
  /**
   * interface Tree {
   *  parent: Tree
   *  name: string
   *  directories: Tree[]
   *  files: { path: string, name: string, size: number }
   * }
   */
  let root = null

  let active = null

  let cursor = null

  for (let line of input) {
    if (line.startsWith('$')) {
      let [_, command, ...inputs] = line.split(' ')

      if (command === 'cd') {
        let [input] = inputs

        if (input === '/') {
          if (root == null) {
            root = {
              parent: null,
              name: '/',
              directories: [],
              files: []
            }
          }

          cursor = root
        } else if (input === '..') {
          cursor = cursor.parent ? cursor.parent : cursor
        } else {
          let [name] = inputs

          cursor = cursor.directories.find((directory) => {
            return directory.name === name
          })
        }
      }

      if (command === 'ls') {
        active = 'ls'
      }
    } else if (line.startsWith('dir')) {
      const [_, filename] = line.split(' ')

      const tree = {
        parent: cursor,
        name: filename,
        directories: [],
        files: []
      }

      cursor.directories.push(tree)
    } else if (/^[0-9]+\s/.test(line)) {
      const [size, filename] = line.split(' ')

      const file = {
        size: Number(size),
        name: filename
      }

      cursor.files.push(file)
    }
  }

  cursor = root

  const getSize = (directory) => {
    let size = 0

    for (const file of directory.files) {
      size += file.size
    }

    for (const sub of directory.directories) {
      size += getSize(sub)
    }

    return size
  }
  const qualified = []

  const total = 70_000_000

  const tldSize = getSize(root)

  const update = 30_000_000

  const threshold = total - tldSize

  const search = (directory) => {
    let size = getSize(directory)

    if (threshold + getSize(directory) >= update) {
      qualified.push({ directory, size })
    }

    for (const sub of directory.directories) {
      search(sub)
    }
  }

  // const getPathName = (directory) => {
  //   const stack = []

  //   let cursor = directory

  //   while (cursor) {
  //     stack.push(cursor.name)
  //     cursor = cursor.parent
  //   }

  //   return '/' + stack.reverse().slice(1).join('/')
  // }

  search(root)

  // console.log(
  //   qualified.map((data) => {
  //     return {
  //       name: getPathName(data.directory),
  //       size: data.size
  //     }
  //   })
  // )

  const smallest = qualified.sort((a, b) => {
    return a.size - b.size
  })

  return smallest[0].size
}

console.log('Step one ->', stepOne())
console.log('Step two ->', stepTwo())
