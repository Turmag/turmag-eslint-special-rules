import { RuleTester } from 'eslint';
import rule from '@rules/vue-remove-script-indents';
import * as vueParser from 'vue-eslint-parser';

const tester = new RuleTester({
    languageOptions: {
        parser: vueParser,
        sourceType: 'module'
    }
});

// @ts-expect-error rule type
tester.run('vue-remove-script-indents', rule, {
    valid: [
        {
            filename: 'test.vue',
            code: `
<script>
import data from 'lib';

console.log('test');
</script>`,
        },
        {
            filename: 'test.vue',
            code: `
<script setup lang="ts">
import { useDebounceFn, useStorage } from '@vueuse/core';
import { UiFlex } from 'turmag-vue-components';
import { ref, watch } from 'vue';
import { SvgIcon, UiCheckbox } from '@/components/kit';
import { useMainStore } from '@/stores/useMain.store';

const store = useMainStore();
const isStickyFilters = useStorage('isAphorismsStickyFilters', false);

const filterWord = ref('');

const resetFilter = () => store.filterWord = '';
const onInput = useDebounceFn(() => store.filterWord = filterWord.value, 500);

watch(
    () => store.filterWord,
    value => filterWord.value = value,
);
</script>`,
        },
    ],
    invalid: [
        {
            filename: 'test.vue',
            code: `
<script>

import data from 'lib';

console.log('test');
</script>`,
            output: `
<script>
import data from 'lib';

console.log('test');
</script>`,
            errors: [
                {
                    messageId: 'removeAfterOpening',
                    line: 4,
                    column: 1,
                }
            ]
        },
        {
            filename: 'test.vue',
            code: `
<script>
import data from 'lib';

console.log('test');

</script>`,
            output: `
<script>
import data from 'lib';

console.log('test');
</script>`,
            errors: [
                {
                    messageId: 'removeBeforeClosing',
                    line: 3,
                    column: 1,
                }
            ]
        },
    ]
});