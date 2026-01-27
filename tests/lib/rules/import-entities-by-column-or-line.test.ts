
import { RuleTester } from 'eslint';
import rule from '@rules/import-entities-by-column-or-line';

const ruleTester = new RuleTester({
    languageOptions: {
        sourceType: 'module'
    }
});

// @ts-expect-error rule type
ruleTester.run('import-entities-by-column-or-line', rule, {
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
        },
        {
            code: `import {
                ComponentPublicInstance,
                TransitionProps,
                Transition as VueTransition,
                h,
            } from 'vue';`,
            options: [{ minProperties: 3 }]
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
        {
            code: `import { ComponentPublicInstance, TransitionProps, Transition as VueTransition, h } from 'vue';`,
            options: [{ minProperties: 3 }],
            output: `import {
    ComponentPublicInstance,
    TransitionProps,
    Transition as VueTransition,
    h,
} from 'vue';`,
            errors: [
                {
                    messageId: 'column',
                    line: 1,
                    column: 1,
                }
            ]
        }
    ]
});