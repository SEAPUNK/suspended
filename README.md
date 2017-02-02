suspended
===

[![Greenkeeper badge](https://badges.greenkeeper.io/SEAPUNK/suspended.svg)](https://greenkeeper.io/)

**requires Node 5 or newer**

minimal testing framework

runs all tests, returns an array of failed tests

---

```js
import Suspended from 'suspended'

// Tests must return Promises.
const shouldHaveNumber = async function () {
  // Function is bound to the test, which has the 'data' property.
  const data = this.data
  if (data.number !== 5) {
    throw new Error('number is not 5!')
  }
}

const shouldHaveApple = async function () {
  const data = this.data
  if (data.fruit !== 'apple') {
    throw new Error('fruit is not apple!')
  }
}

const tester = new Suspended()
tester.add('should have the number 5', shouldHaveNumber)
tester.add('should have a fruit which is an apple', shouldHaveApple)
const data = {
  number: 5,
  fruit: 'orange'
}

// failedTests will always be an array of failed tests in the object format:
// {
//  name: 'should have a fruit which is an apple',
//  err: new Error('fruit is not apple!')
// }
tester.run(data).then((failedTests) => {
  // failedTests has name and err
  if (failedTests.length) {
    console.log(`${failedTests.length} failed!`)
    for (let failedTest of failedTests) {
      console.log(`The test "${failedTest.name}" failed: ${failedTest.err}`)
    }
  } else {
    console.log(`All tests passed!`)
  }
}).catch((err) => {
  console.log(`Uh oh, the tester broke`)
})
```
