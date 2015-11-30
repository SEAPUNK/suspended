'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, "next"); var callThrow = step.bind(null, "throw"); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require('babel-polyfill');

var Test = (function () {
  function Test(name, fn) {
    _classCallCheck(this, Test);

    this.name = name;
    this.fn = fn;
    this.data = {};
  }

  _createClass(Test, [{
    key: 'setup',
    value: function setup(data) {
      this.data = data;
    }
  }, {
    key: 'run',
    value: function run() {
      var bound = this.fn.bind(this);
      return bound();
    }
  }]);

  return Test;
})();

var Suspended = (function () {
  /**
   * Constructs a Suspended instance.
   * @return {Suspended} Suspended instance
   */

  function Suspended() {
    _classCallCheck(this, Suspended);

    this.tests = [];
  }

  /**
   * Adds a test.
   * @param {String}   name Test name.
   * @param {Function} fn   Test function. Must return a Promise.
   */

  _createClass(Suspended, [{
    key: 'add',
    value: function add(name, fn) {
      this.tests.push(new Test(name, fn));
    }

    /**
     * Runs the added tests.
     * @param {Object} [data] Data to set up the tests with before running
     * @return {String} A failed test's name, if any.
     */

  }, {
    key: 'run',
    value: (function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(data) {
        var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, test, promise;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 3;
                _iterator = this.tests[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 23;
                  break;
                }

                test = _step.value;

                test.setup(data || {});
                promise = test.run();

                if (!(!promise || !promise.then)) {
                  _context.next = 11;
                  break;
                }

                throw new Error('test \'' + test.name + '\' does not return a promise');

              case 11:
                _context.prev = 11;
                _context.next = 14;
                return promise;

              case 14:
                return _context.abrupt('continue', 20);

              case 17:
                _context.prev = 17;
                _context.t0 = _context['catch'](11);
                return _context.abrupt('return', test.name);

              case 20:
                _iteratorNormalCompletion = true;
                _context.next = 5;
                break;

              case 23:
                _context.next = 29;
                break;

              case 25:
                _context.prev = 25;
                _context.t1 = _context['catch'](3);
                _didIteratorError = true;
                _iteratorError = _context.t1;

              case 29:
                _context.prev = 29;
                _context.prev = 30;

                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }

              case 32:
                _context.prev = 32;

                if (!_didIteratorError) {
                  _context.next = 35;
                  break;
                }

                throw _iteratorError;

              case 35:
                return _context.finish(32);

              case 36:
                return _context.finish(29);

              case 37:
                return _context.abrupt('return', null);

              case 38:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 25, 29, 37], [11, 17], [30,, 32, 36]]);
      }));

      return function run(_x) {
        return ref.apply(this, arguments);
      };
    })()
  }]);

  return Suspended;
})();

module.exports = Suspended;