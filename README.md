# eslint-plugin-turmag-special-rules

Special eslint rules for your awesome projects

## Installation

You'll first need to install [ESLint](https://eslint.org):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-turmag-special-rules`:

```sh
npm install eslint-plugin-turmag-special-rules --save-dev

# Or run this to use yarn
yarn add eslint-plugin-turmag-special-rules --dev

# Or run this to use pnpm
pnpm add eslint-plugin-turmag-special-rules --save-dev
```

## Usage

In your [configuration file](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file), import the plugin `eslint-plugin-turmag-special-rules` and add `turmagEslintSpecialRules` to the `plugins` key:

```js
import turmagSpecialRules from "eslint-plugin-turmag-special-rules";

export default [
    {
        plugins: {
            'turmag-special-rules': turmagSpecialRules
        }
    }
];
```


Then configure the rules you want to use under the `rules` key.

```js
import turmagSpecialRules from "eslint-plugin-turmag-special-rules";

export default [
    {
        plugins: {
            'turmag-special-rules': turmagSpecialRules
        },
        rules: {
            "turmag-special-rules/rule-name": "warn"
        }
    }
];
```


## Rules

<!-- begin auto-generated rules list -->

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                                                 | Description                                                    | 🔧 |
| :----------------------------------------------------------------------------------- | :------------------------------------------------------------- | :- |
| [add-vue-extension](docs/rules/add-vue-extension.md)                                 | Require .vue in vue files                                      | 🔧 |
| [import-entities-by-column-or-line](docs/rules/import-entities-by-column-or-line.md) | Prefered column or line import                                 | 🔧 |
| [import-right-order](docs/rules/import-right-order.md)                               | Prefered right import order                                    | 🔧 |
| [prefer-true-attribute-shorthand](docs/rules/prefer-true-attribute-shorthand.md)     | Require shorthand form attribute when `v-bind` value is `true` | 🔧 |
| [use-shortest-alias](docs/rules/use-shortest-alias.md)                               | There are can be used shortest alias                           | 🔧 |

<!-- end auto-generated rules list -->


# License
This code is licensed under the [MIT](https://github.com/Turmag/turmag-eslint-special-rules/blob/main/LICENSE) License.