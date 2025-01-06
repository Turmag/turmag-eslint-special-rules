import { RuleTester } from 'eslint';
import vueParser from 'vue-eslint-parser';
import rule from '../../../lib/rules/prefer-true-attribute-shorthand.js';

const tester = new RuleTester({
    languageOptions: {
        parser: vueParser,
        sourceType: 'module'
    }
});

tester.run('prefer-true-attribute-shorthand', rule, {
    valid: [
      {
        filename: 'test.vue',
        code: `
        <template>
          <MyComp v-if="true" />
        </template>
        `
      },
      {
        filename: 'test.vue',
        code: `
        <template>
          <MyComp v-bind="true" />
        </template>
        `
      },
      {
        filename: 'test.vue',
        code: `
        <template>
          <MyComp v-loading="true" />
        </template>
        `
      },
      {
        filename: 'test.vue',
        code: `
        <template>
          <MyComp show="true" />
        </template>
        `
      },
      {
        filename: 'test.vue',
        code: `
        <template>
          <MyComp v-bind:show="value" />
        </template>
        `
      },
      {
        filename: 'test.vue',
        code: `
        <template>
          <MyComp :show="value" />
        </template>
        `
      },
      {
        filename: 'test.vue',
        code: `
        <template>
          <MyComp v-bind:show="false" />
        </template>
        `
      },
      {
        filename: 'test.vue',
        code: `
        <template>
          <MyComp :show="false" />
        </template>
        `
      },
      {
        filename: 'test.vue',
        code: `
        <template>
          <MyComp show />
        </template>
        `
      },
      {
        filename: 'test.vue',
        code: `
        <template>
          <MyComp show />
        </template>
        `,
        options: ['always']
      },
      {
        filename: 'test.vue',
        code: `
        <template>
          <MyComp :show="true" />
        </template>
        `,
        options: ['never']
      },
      {
        filename: 'test.vue',
        code: `
        <template>
          <MyComp v-bind:show="true" />
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
          <MyComp v-bind:show="true" />
        </template>`,
        output:  `
        <template>
          <MyComp show />
        </template>`,
        errors: [
          {
            messageId: 'shortHand',
            line: 3,
            column: 19,
          }
        ]
      },
      {
        filename: 'test.vue',
        code: `
        <template>
          <MyComp :show="true" />
        </template>`,
        output: `
        <template>
          <MyComp show />
        </template>`,
        errors: [
          {
            messageId: 'shortHand',
            line: 3,
            column: 19,
          }
        ]
      },
      {
        filename: 'test.vue',
        code: `
        <template>
          <MyComp v-bind:show="true" />
        </template>`,
        output: `
        <template>
          <MyComp show />
        </template>`,
        options: ['always'],
        errors: [
          {
            messageId: 'shortHand',
            line: 3,
            column: 19,
          }
        ]
      },
      {
        filename: 'test.vue',
        code: `
        <template>
          <MyComp :show="true" />
        </template>`,
        output: `
        <template>
          <MyComp show />
        </template>`,
        options: ['always'],
        errors: [
          {
            messageId: 'shortHand',
            line: 3,
            column: 19,
          }
        ]
      },
      {
        filename: 'test.vue',
        code: `
        <template>
          <MyComp show />
        </template>`,
        output: `
        <template>
          <MyComp :show="true" />
        </template>`,
        options: ['never'],
        errors: [
          {
            messageId: 'longHand',
            line: 3,
            column: 19,
          }
        ]
      }
    ]
  })