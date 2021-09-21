# string-locale-compare

Compare strings with Intl.Collator if available, falling back to
String.localeCompare otherwise.

This also forces the use of a specific locale, to avoid using the system
locale, which is non-deterministic.

## USAGE

```js
const stringLocaleCompare = require('string-locale-compare')

myArrayOfStrings.sort(stringLocaleCompare('en'))
```
