import { RuleTester } from 'eslint';
import * as vueParser from 'vue-eslint-parser';
import rule from '@rules/prefer-true-attribute-shorthand';

const ruleTester = new RuleTester({
    languageOptions: {
        parser: vueParser,
        sourceType: 'module'
    },
});

// @ts-expect-error rule type
ruleTester.run('prefer-true-attribute-shorthand', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `
      <template>
        <MyCompValid1 v-if="true" />
      </template>
      `
    },
    {
      filename: 'test.vue',
      code: `
      <template>
        <MyCompValid2 v-bind="true" />
      </template>
      `
    },
    {
      filename: 'test.vue',
      code: `
      <template>
        <MyCompValid3 v-loading="true" />
      </template>
      `
    },
    {
      filename: 'test.vue',
      code: `
      <template>
        <MyCompValid4 show="true" />
      </template>
      `
    },
    {
      filename: 'test.vue',
      code: `
      <template>
        <MyCompValid5 v-bind:show="value" />
      </template>
      `
    },
    {
      filename: 'test.vue',
      code: `
      <template>
        <MyCompValid6 :show="value" />
      </template>
      `
    },
    {
      filename: 'test.vue',
      code: `
      <template>
        <MyCompValid7 v-bind:show="false" />
      </template>
      `
    },
    {
      filename: 'test.vue',
      code: `
      <template>
        <MyCompValid8 :show="false" />
      </template>
      `
    },
    {
      filename: 'test.vue',
      code: `
      <template>
        <MyCompValid9 show />
      </template>
      `
    },
    {
      filename: 'test.vue',
      code: `
      <template>
        <MyCompValid10 show />
      </template>
      `,
      options: ['always']
    },
    {
      filename: 'test.vue',
      code: `
      <template>
        <MyCompValid11 :show="true" />
      </template>
      `,
      options: ['never']
    },
    {
      filename: 'test.vue',
      code: `
      <template>
        <MyCompValid12 v-bind:show="true" />
      </template>
      `,
      options: ['never']
    },
    {
      filename: 'test.vue',
      code: `
      <template>
        <input v-bind:checked="true" />
      </template>
      `,
      options: ['never']
    },
    {
      filename: 'test.vue',
      code: `
      <template>
        <input checked />
      </template>
      `
    }
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `
      <template>
        <MyCompInvalid1 v-bind:show="true" />
      </template>`,
      output:  `
      <template>
        <MyCompInvalid1 show />
      </template>`,
      errors: [
        {
          messageId: 'shortHand',
          line: 3,
          column: 25,
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
      <template>
        <MyCompInvalid2 :show="true" />
      </template>`,
      output: `
      <template>
        <MyCompInvalid2 show />
      </template>`,
      errors: [
        {
          messageId: 'shortHand',
          line: 3,
          column: 25,
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
      <template>
        <MyCompInvalid3 v-bind:show="true" />
      </template>`,
      output: `
      <template>
        <MyCompInvalid3 show />
      </template>`,
      options: ['always'],
      errors: [
        {
          messageId: 'shortHand',
          line: 3,
          column: 25,
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
      <template>
        <MyCompInvalid4 :show="true" />
      </template>`,
      output: `
      <template>
        <MyCompInvalid4 show />
      </template>`,
      options: ['always'],
      errors: [
        {
          messageId: 'shortHand',
          line: 3,
          column: 25,
        }
      ]
    },
    {
      filename: 'test.vue',
      code: `
      <template>
        <MyCompInvalid5 show />
      </template>`,
      output: `
      <template>
        <MyCompInvalid5 :show="true" />
      </template>`,
      options: ['never'],
      errors: [
        {
          messageId: 'longHand',
          line: 3,
          column: 25,
        }
      ]
    }
  ]
})
