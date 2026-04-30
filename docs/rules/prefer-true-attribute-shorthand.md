# turmag-special-rules/prefer-true-attribute-shorthand

📝 Require shorthand form attribute when `v-bind` value is `true`.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## 📖 Rule Details

`v-bind` attribute with `true` value usually can be written in shorthand form. This can reduce verbosity.


```vue
<template>
  <!-- ✗ BAD -->
  <MyComponent v-bind:show="true" />
  <MyComponent :show="true" />

  <!-- ✓ GOOD -->
  <MyComponent show />
  <MyComponent another-prop="text" />
</template>
```

```vue
<script>
export default {
  name: 'MyComponent',
  props: {
    bool: Boolean,
    boolSecond: Boolean,
    boolThird: Boolean,
  }
}
</script>
```

**Shorthand form:**

```vue
<MyComponent bool bool-second bool-third />
```

```vue
bool: true (boolean)
boolSecond: true (boolean)
boolThird: true (boolean)
```

**Longhand  form:**

```vue
<MyComponent :bool="true" :bool-second="true" :bool-third="true" />
```

```vue
bool: true (boolean)
boolSecond: true (boolean)
boolThird: true (boolean)
```

## 🔧 Rule Details (Config)
Default options is `'always'`.

```js
{
  'special-rules/prefer-true-attribute-shorthand': ['error', 'always' | 'never']
}
```

## 👫 Related Rules
* [vue/prefer-true-attribute-shorthand](https://eslint.vuejs.org/rules/prefer-true-attribute-shorthand)

## 🔎 Implementation

- [Rule source](../../lib/rules/prefer-true-attribute-shorthand.ts)