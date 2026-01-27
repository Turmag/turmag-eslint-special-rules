import { RuleTester } from 'eslint';
import rule from '@rules/variable-entities-by-column-or-line';

const tester = new RuleTester({
    languageOptions: {
        sourceType: 'module'
    }
});

// @ts-expect-error rule type
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
                variable3
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
        },
        {
            code: `const {
        someData,
        isShowSomething = false,
        itemsLimit
    } = params;`,
            options: [{ minProperties: 3 }]
        },
        {
            code: `const {
                        value: {
                            nextValue: {
                                specialNextValue: {
                                    innerValueGraph,
                                    innerValueCount,
                                    innerValuePercent,
                                },
                            },
                        },
                    } = visibilityOptions;`,
            options: [{ minProperties: 3 }]
        },
        {
            code: `const { ['Дата']: date, ...stats } = record;`,
            options: [{ minProperties: 3 }]
        },
        {
            code: `const { 
            items, 
            subject,
            special,
            ...stats } = params;`,
            options: [{ minProperties: 3 }]
        }
    ],
    invalid: [
        {
            code: `const { variable1, variable2, variable3 } = useSomeComposable();`,
            options: [{ minProperties: 3 }],
            output: `const {
    variable1,
    variable2,
    variable3
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
        {
            code: `const { someData, isShowSomething = false, itemsLimit } = params;`,
            options: [{ minProperties: 3 }],
            output: `const {
    someData,
    isShowSomething = false,
    itemsLimit
} = params;`,
            errors: [
                {
                    messageId: 'column',
                    line: 1,
                    column: 1,
                }
            ]
        },
        {
            code: `const { items, subject, special, ...stats } = params;`,
            options: [{ minProperties: 3 }],
            output: `const {
    items,
    subject,
    special,
    ...stats
} = params;`,
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