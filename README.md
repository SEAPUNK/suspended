suspended
===

**requires Node 5 or newer**

minimal testing framework

runs tests concurrently, fails fast if one test fails

---

```js
import Suspended from 'suspended'

const test1 = async function () {
  // Function is bound to the test, which has the 'data' property.
  const data = this.data
  if (data.number !== 5) {
    throw new Error('number is not 5!')
  }
}

const test2 = async function () {
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

// 'The test "should have a fruit which is an apple" failed: Error: fruit is not apple!'
tester.run(data).then((failedTest) => {
  // failedTest has name and err
  if (failedTest) {
    console.log(`The test "${failedTest.name}" failed: ${failedTest.err}`)
  } else {
    console.log(`All tests passed!`)
  }
}).catch((err) => {
  console.log(`Uh oh, the tester broke`)
})
```
