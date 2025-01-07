import { RuleTester } from 'eslint';
import rule from '../../../lib/rules/import-entities-by-column-or-line.js';

const tester = new RuleTester({
    languageOptions: {
        sourceType: 'module'
    }
});

tester.run('import-entities-by-column-or-line', rule, {
    valid: [
        {
            code: `import { computed, useCssModule } from 'vue';`,
            options: [{ minProperties: 3 }]
        },
        {
            code: `import { 
                computed,
                ref,
                useCssModule,
            } from 'vue';`,
            options: [{ minProperties: 3 }]
        },
        {
            code: `import { useStorage } from '@vueuse/core';`,
            options: [{ minProperties: 3 }]
        },
        {
            code: `import { computed, ref, watch } from 'vue';`,
            options: [{ minProperties: 4 }]
        }
    ],
    invalid: [
        {
            code: `import { computed, useCssModule } from 'vue';`,
            options: [{ minProperties: 2 }],
            output: `import {
    computed,
    useCssModule,
} from 'vue';`,
            errors: [
                {
                    messageId: 'column',
                    line: 1,
                    column: 1,
                }
            ]
        },
        {
            code: `import { 
                computed,
                ref,
                useCssModule,
            } from 'vue';`,
            options: [{ minProperties: 4 }],
            output: `import { computed, ref, useCssModule } from 'vue';`,
            errors: [
                {
                    messageId: 'line',
                    line: 1,
                    column: 1,
                }
            ]
        },
    ]
});