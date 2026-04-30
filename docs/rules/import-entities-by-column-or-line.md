# turmag-special-rules/import-entities-by-column-or-line

📝 Prefered column or line import.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## 📖 Rule Details

This rule regulates imports in a column or in a line, depending on the passed parameter **minProperties**, which is responsible for how many parameters are used to configure imports in a column

```vue
<script>
// For example, the passed property minProperties is 3 - line to column
// ✗ BAD
import { ref, computed, watch, onMounted } from 'vue';
import { UiButton, UiSwitch, UiToggler } from 'somepath/kit';
import { declOfNum, numberFormatter, getPath } from 'somepath/helpers';

// ✓ GOOD
import {
    ref,
    computed,
    watch,
    onMounted,
} from 'vue';
import {
    UiButton,
    UiSwitch,
    UiToggler,
} from 'somepath/kit';
import {
    declOfNum,
    numberFormatter,
    getPath,
} from 'somepath/helpers';
</script>
```

```vue
<script>
// For example, the passed property minProperties is 3  - column to line
// ✗ BAD
import {
    ref,
    computed,
} from 'vue';
import {
    UiButton,
    UiSwitch,
} from 'somepath/kit';
import {
    declOfNum,
    numberFormatter,
} from 'somepath/helpers';

// ✓ GOOD
import { ref, computed } from 'vue';
import { UiButton, UiSwitch } from 'somepath/kit';
import { declOfNum, numberFormatter } from 'somepath/helpers';
</script>
```

## 🔧 Rule Details (Config)
You can activate it rule or not.
But there is important setting - aliases.


```js
{
  'import-entities-by-column-or-line': ['error', { minProperties: 3 }]
}
```

## 🔎 Implementation

- [Rule source](../../lib/rules/import-entities-by-column-or-line.ts)