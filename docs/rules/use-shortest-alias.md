# There are can be used shortest alias (`turmag-special-rules/use-shortest-alias`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## 📖 Rule Details

If you have many aliases, but want to use shortest, you can use this rule.
Your config should be configured in a certain order, since this order will be taken into account when comparing the current alias with those in the config.

```vue
<script>
// ✗ BAD
import MyHeader from '@/components/header/Header.vue';

// ✓ GOOD
import MyHeader from '@header/Header.vue';
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
  "special-rules/use-shortest-alias": ["error", { aliases }]
}
```

## 🔎 Implementation

- [Rule source](../../lib/rules/use-shortest-alias.js)