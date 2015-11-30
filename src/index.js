require('babel-polyfill')

class Test {
  constructor (name, fn) {
    this.name = name
    this.fn = fn
    this.data = {}
  }

  setup (data) {
    this.data = data
  }

  run () {
    let bound = this.fn.bind(this)
    return bound()
  }
}

class Suspended {
  /**
   * Constructs a Suspended instance.
   * @return {Suspended} Suspended instance
   */
  constructor () {
    this.tests = []
  }

  /**
   * Adds a test.
   * @param {String}   name Test name.
   * @param {Function} fn   Test function. Must return a Promise.
   */
  add (name, fn) {
    this.tests.push(new Test(name, fn))
  }

  /**
   * Runs the added tests.
   * @param {Object} [data] Data to set up the tests with before running
   * @return {String} A failed test's name, if any.
   */
  async run (data) {
    for (let test of this.tests) {
      test.setup(data || {})
      let promise = test.run()
      if (!promise || !promise.then) {
        throw new Error(`test '${test.name}' does not return a promise`)
      }
      try {
        await promise
        continue
      } catch (err) {
        return test.name
      }
    }
    return null
  }
}

module.exports = Suspended
