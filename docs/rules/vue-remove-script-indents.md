# turmag-special-rules/vue-remove-script-indents

📝 Remove extra padding lines in `<script>` tags of Vue files.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## 📖 Rule Details

This rule removes extra indents in block `<script>` in vue files

```vue
<script>
// ✗ BAD

import data from 'lib';

console.log('test');

</script>
```

```vue
<script>
// ✗ GOOD
import data from 'lib';

console.log('test');
</script>
```

## 🔎 Implementation

- [Rule source](../../lib/rules/vue-remove-script-indents.ts)