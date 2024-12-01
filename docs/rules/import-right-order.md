# Prefered right import order (`turmag-special-rules/import-right-order`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

## 📖 Rule Details

This rule sets up a special order by which imports will be sorted in the vue project.
So far, it is tied to a specific order. In the future, it will be possible to configure this order.

```vue
<script>
// ✗ BAD
import { declOfNum, numberFormatter } from 'somepath/helpers';
import SomeComponent from 'somepath/SomeComponent.vue';
import Api from '@/shared/api';
import { colors } from 'somepath/constants';
import { ref, computed } from 'vue';
import dayjs from 'dayjs';
import SomeMixin from 'somepath/mixins/SomeMixin.vue';
import { authStore } from '@/store/auth';
import { useStorage } from '@vueuse/core';
import type { IStore } from '@/shared/types';

// ✓ GOOD
import dayjs from 'dayjs';
import { ref, computed } from 'vue';
import SomeComponent from 'somepath/SomeComponent.vue';
import { useStorage } from '@vueuse/core';
import { authStore } from '@/store/auth';
import SomeMixin from 'somepath/mixins/SomeMixin.vue';
import { IStore } from '@/shared/types';
import { colors } from 'somepath/constants';
import { declOfNum, numberFormatter } from 'somepath/helpers';
import Api from '@/shared/api';
</script>
```

## 🔧 Rule Details (Config)
You can activate it rule or not. Just in case, I want to warn you that the rule is difficult, and it is better to include it last


```js
{
  'import-right-order': 'error'
}
```

## 🔎 Implementation

- [Rule source](../../lib/rules/import-right-order.js)