# Require .vue in vue files (`turmag-special-rules/add-vue-extension`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## 📖 Rule Details

If you want to use vue-files import with its extension, you can use it rule.


```vue
<script>
// ✗ BAD
import SomeComponent from 'somepath/SomeComponent';

// ✓ GOOD
import SomeComponent from 'somepath/SomeComponent.vue';
</script>
```

## 🔧 Rule Details (Config)
You can activate it rule or not.
But there is important setting - aliases.


```js
// aliases (you can put it in a separate file)
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const aliases = {
    '@main': path.resolve(__dirname, './src/components/main'),
    '@header': path.resolve(__dirname, './src/components/header'),
    '@': path.resolve(__dirname, './src'),
};
// end of aliases config

{
  'special-rules/add-vue-extension': ['error', { aliases }]
}
```

## 🔎 Implementation

- [Rule source](../../lib/rules/add-vue-extension.js)