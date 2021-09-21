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

const sortedEn = [ 'ape', 'apple', 'banana', 'cat', 'chai', 'dog' ]
const sortedSk = [ 'ape', 'apple', 'banana', 'cat', 'dog', 'chai' ]

t.throws(() => stringLocaleCompare(), new TypeError('locale required'))

t.test('sorts with Intl.Collator', {
  skip: typeof Intl !== 'object' ? 'intl not available' : false,
}, t => {
  const compare = stringLocaleCompare('en')
  t.equal(stringLocaleCompare('en'), compare, 'returns cached copy of fn')
  t.strictSame(getArray().sort(compare), sortedEn)
  const compareSk = stringLocaleCompare('sk')
  t.not(compareSk, compare, 'different locale, different function')
  t.strictSame(getArray().sort(compareSk), sortedSk)
  t.end()
})

t.test('sorts with String.localeCompare', t => {
  const Intl = global.Intl
  t.teardown(() => global.Intl = Intl)
  global.Intl = null

  const stringLocaleCompare = t.mock('../')
  const compare = stringLocaleCompare('en')
  t.equal(stringLocaleCompare('en'), compare, 'returns cached copy of fn')
  t.strictSame(getArray().sort(compare), sortedEn)
  const compareSk = stringLocaleCompare('sk')
  t.not(compareSk, compare, 'different locale, different function')
  t.strictSame(getArray().sort(compareSk), sortedSk)
  t.end()
})
