'use strict'

const Promise = require('bluebird')

class Test {
  constructor (name, fn) {
    this.name = name
    this.fn = fn
    this.data = {}
  }

  setup (data) {
    this.data = data
  }

  /*
    Returns a promise.
    Resolves with nothing if the test passed, otherwise returns with an object:
      {
        name: 'test name',
        err: new Error('test error')
      }.
    Rejects if the test does not return a promise.
   */
  run () {
    return new Promise((resolve, reject) => {
      let bound = this.fn.bind(this)
      let promise = bound()
      if (!promise || !promise.then) {
        return reject(new Error(`Test ${this.name} does not return a promise`))
      }
      promise.then(() => {
        resolve()
      }).catch((err) => {
        resolve({
          name: this.name,
          err: err
        })
      })
    })
  }
}

module.exports = Test
