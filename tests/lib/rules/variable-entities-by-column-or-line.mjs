import { RuleTester } from 'eslint';
import rule from '../../../lib/rules/variable-entities-by-column-or-line.js';

const tester = new RuleTester({
    languageOptions: {
        sourceType: 'module'
    }
});

tester.run('variable-entities-by-column-or-line', rule, {
    valid: [
        {
            code: `const { variable1, variable2 } = useSomeComposable();`,
            options: [{ minProperties: 3 }]
        },
        {
            code: `const {
                variable1,
                variable2,
                variable3,
            } = useSomeComposable();`,
            options: [{ minProperties: 3 }]
        },
        {
            code: `const { data, status } = await getData();`,
            options: [{ minProperties: 3 }]
        },
        {
            code: `const { variable1, variable2, variable3 } = useSomeComposable();`,
            options: [{ minProperties: 4 }]
        }
    ],
    invalid: [
        {
            code: `const { variable1, variable2, variable3 } = useSomeComposable();`,
            options: [{ minProperties: 3 }],
            output: `const {
    variable1,
    variable2,
    variable3,
} = useSomeComposable();`,
            errors: [
                {
                    messageId: 'column',
                    line: 1,
                    column: 1,
                }
            ]
        },
        {
            code: `const { 
                data,
                status,
            } = await getData();`,
            options: [{ minProperties: 3 }],
            output: `const { data, status } = await getData();`,
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