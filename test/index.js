const t = require('tap')

const stringLocaleCompare = require('../')

const getArray = () => [
  'chai',
  'apple',
  'ape',
  'cat',
  'dog',
  'banana',
]

const getArrayNumCase = () => getArray().concat([
  'dog1',
  'dog2',
  'dog10',
  'dog20',
  'BANANA',
])

const sortedEn = [ 'ape', 'apple', 'banana', 'cat', 'chai', 'dog' ]
const sortedSk = [ 'ape', 'apple', 'banana', 'cat', 'dog', 'chai' ]

const sortedEnLower = [
  'ape',
  'apple',
  'banana',
  'BANANA',
  'cat',
  'chai',
  'dog',
  'dog1',
  'dog10',
  'dog2',
  'dog20',
]

const sortedEnUpper = [
  'ape',
  'apple',
  'BANANA',
  'banana',
  'cat',
  'chai',
  'dog',
  'dog1',
  'dog10',
  'dog2',
  'dog20',
]

const sortedEnNum = [
  'ape',
  'apple',
  'banana',
  'BANANA',
  'cat',
  'chai',
  'dog',
  'dog1',
  'dog2',
  'dog10',
  'dog20',
]

t.throws(() => stringLocaleCompare(), new TypeError('locale required'))

const runTest = (t, stringLocaleCompare) => {
  const compare = stringLocaleCompare('en')
  t.equal(stringLocaleCompare('en'), compare, 'returns cached copy of fn')
  t.strictSame(getArray().sort(compare), sortedEn)
  const compareSk = stringLocaleCompare('sk')
  t.not(compareSk, compare, 'different locale, different function')
  t.strictSame(getArray().sort(compareSk), sortedSk)

  const compareEnLower = stringLocaleCompare('en', { caseFirst: 'lower' })
  const compareEnUpper = stringLocaleCompare('en', { caseFirst: 'upper' })
  const compareEnUpperExtraOpt = stringLocaleCompare('en', { caseFirst: 'upper', foo: 'bar' })
  t.notEqual(compareEnLower, compareEnUpper)
  t.equal(compareEnUpperExtraOpt, compareEnUpper)
  t.strictSame(getArrayNumCase().sort(compareEnLower), sortedEnLower)
  t.strictSame(getArrayNumCase().sort(compareEnUpper), sortedEnUpper)
  const compareEnNum = stringLocaleCompare('en', { numeric: true, caseFirst: 'lower' })
  const compareEnNumOptOrder = stringLocaleCompare('en', { caseFirst: 'lower', numeric: true })
  t.notEqual(compareEnNum, compareEnUpper)
  t.notEqual(compareEnNum, compareEnLower)
  t.equal(compareEnNum, compareEnNumOptOrder)
  t.strictSame(getArrayNumCase().sort(compareEnNum), sortedEnNum)

  t.end()
}

t.test('sorts with Intl.Collator', {
  skip: typeof Intl !== 'object' ? 'intl not available' : false,
}, t => runTest(t, stringLocaleCompare))

t.test('sorts with String.localeCompare', t => {
  const Intl = global.Intl
  t.teardown(() => global.Intl = Intl)
  global.Intl = null
  runTest(t, t.mock('../'))
})
