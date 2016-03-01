'use strict'

const Promise = require('bluebird')
const Test = require('./Test')

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
    const test = new Test(name, fn)
    this.tests.push(test)
  }

  /**
   * Runs the added tests.
   * @param {Object} [data] Data to set up the tests with before running
   * @return {String} A failed test's name, if any.
   */
  run (data) {
    return new Promise((resolve, reject) => {
      const promiseArray = []
      for (let test of this.tests) {
        test.setup(data || {})
        const promise = test.run()
        promiseArray.push(promise)
      }
      Promise.all(promiseArray).then((tests) => {
        // Only return an array of truthy values.
        resolve(tests.filter((t) => t))
      }).catch(reject)
    })
  }
}

module.exports = Suspended
