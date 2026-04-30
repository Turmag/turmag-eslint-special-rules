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
            code: `
<script>
import data from 'lib';

console.log('test');
</script>`,
        },
    ],
    invalid: [
        {
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
                    messageId: 'remove',
                    line: 4,
                    column: 1,
                }
            ]
        },
        {
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
                    messageId: 'remove',
                    line: 3,
                    column: 1,
                }
            ]
        },
    ]
});