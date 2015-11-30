class Test {
  construct (name, fn) {
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
  construct () {
    this.tests = []
  }

  /**
   * Sets up the tests with initial data.
   * @param  {Object} data Data to use for the tests.
   */
  setup (data) {
    this.tests.forEach(function (test) {
      test.setup(data)
    })
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
   * @return {String} A failed test's name, if any.
   */
  run () {
    let self = this
    return new Promise(async function (resolve, reject) {
      for (let test of self.tests) {
        let promise = test.run()
        if (!test.fn || !test.fn.then) {
          return reject(new Error(`test '${test.name}' does not return a promise`))
        }
        try {
          await promise
        } catch (err) {
          resolve(test.name)
        }
      }
    })
  }
}

module.exports = Suspended
