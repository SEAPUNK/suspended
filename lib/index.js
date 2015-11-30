"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, "next"); var callThrow = step.bind(null, "throw"); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Test = (function () {
  function Test() {
    _classCallCheck(this, Test);
  }

  _createClass(Test, [{
    key: "construct",
    value: function construct(name, fn) {
      this.name = name;
      this.fn = fn;
      this.data = {};
    }
  }, {
    key: "setup",
    value: function setup(data) {
      this.data = data;
    }
  }, {
    key: "run",
    value: function run() {
      var bound = this.fn.bind(this);
      return bound();
    }
  }]);

  return Test;
})();

var Suspended = (function () {
  function Suspended() {
    _classCallCheck(this, Suspended);
  }

  _createClass(Suspended, [{
    key: "construct",

    /**
     * Constructs a Suspended instance.
     * @return {Suspended} Suspended instance
     */
    value: function construct() {
      this.tests = [];
    }

    /**
     * Sets up the tests with initial data.
     * @param  {Object} data Data to use for the tests.
     */

  }, {
    key: "setup",
    value: function setup(data) {
      this.tests.forEach(function (test) {
        test.setup(data);
      });
    }

    /**
     * Adds a test.
     * @param {String}   name Test name.
     * @param {Function} fn   Test function. Must return a Promise.
     */

  }, {
    key: "add",
    value: function add(name, fn) {
      this.tests.push(new Test(name, fn));
    }

    /**
     * Runs the added tests.
     * @return {String} A failed test's name, if any.
     */

  }, {
    key: "run",
    value: function run() {
      var self = this;
      return new Promise((function () {
        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve, reject) {
          var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, test, promise;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  _context.prev = 3;
                  _iterator = self.tests[Symbol.iterator]();

                case 5:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    _context.next = 21;
                    break;
                  }

                  test = _step.value;
                  promise = test.run();

                  if (!(!test.fn || !test.fn.then)) {
                    _context.next = 10;
                    break;
                  }

                  return _context.abrupt("return", reject(new Error("test '" + test.name + "' does not return a promise")));

                case 10:
                  _context.prev = 10;
                  _context.next = 13;
                  return promise;

                case 13:
                  _context.next = 18;
                  break;

                case 15:
                  _context.prev = 15;
                  _context.t0 = _context["catch"](10);

                  resolve(test.name);

                case 18:
                  _iteratorNormalCompletion = true;
                  _context.next = 5;
                  break;

                case 21:
                  _context.next = 27;
                  break;

                case 23:
                  _context.prev = 23;
                  _context.t1 = _context["catch"](3);
                  _didIteratorError = true;
                  _iteratorError = _context.t1;

                case 27:
                  _context.prev = 27;
                  _context.prev = 28;

                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }

                case 30:
                  _context.prev = 30;

                  if (!_didIteratorError) {
                    _context.next = 33;
                    break;
                  }

                  throw _iteratorError;

                case 33:
                  return _context.finish(30);

                case 34:
                  return _context.finish(27);

                case 35:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this, [[3, 23, 27, 35], [10, 15], [28,, 30, 34]]);
        }));

        return function (_x, _x2) {
          return ref.apply(this, arguments);
        };
      })());
    }
  }]);

  return Suspended;
})();

module.exports = Suspended;