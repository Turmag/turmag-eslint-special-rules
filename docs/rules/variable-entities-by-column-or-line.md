# Prefered column or line destructuring (`turmag-special-rules/variable-entities-by-column-or-line`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->


## 📖 Rule Details

This rule regulates imports in a column or in a line, depending on the passed parameter **minProperties**, which is responsible for how many parameters are used to configure imports in a column

```vue
<script>
// For example, the passed property minProperties is 3 - line to column
// ✗ BAD
const { variable1, variable2, variable3 } = useSomeComposable();
const { data, status, special } = await getData();

// ✓ GOOD
const {
    variable1,
    variable2,
    variable3,
} = useSomeComposable();

const {
    data,
    status,
    special,
} = await getData();
</script>
```

```vue
<script>
// For example, the passed property minProperties is 3  - column to line
// ✗ BAD
const {
    variable1,
    variable2,
} = useSomeComposable();
const {
    data,
    status,
} = await getData();

// ✓ GOOD
const { variable1, variable2 } = useSomeComposable();
const { data, status } = await getData();
</script>
```

## 🔧 Rule Details (Config)
You can activate it rule or not.
But there is important setting - aliases.


```js
{
  'variable-entities-by-column-or-line': ['error', { minProperties: 3 }]
}
```

## 🔎 Implementation

- [Rule source](../../lib/rules/variable-entities-by-column-or-line.js)