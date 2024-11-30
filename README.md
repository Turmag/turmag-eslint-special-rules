# eslint-plugin-turmag-special-rules

Special eslint rules for your awesome projects

## Installation

You'll first need to install [ESLint](https://eslint.org/):

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

In your [configuration file](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file), import the plugin `eslint-plugin-turmag-special-rules` and add `turmag-eslint-special-rules` to the `plugins` key:

```js
import turmag-eslint-special-rules from "eslint-plugin-turmag-special-rules";

export default [
    {
        plugins: {
            turmag-eslint-special-rules
        }
    }
];
```


Then configure the rules you want to use under the `rules` key.

```js
import turmag-eslint-special-rules from "eslint-plugin-turmag-special-rules";

export default [
    {
        plugins: {
            turmag-eslint-special-rules
        },
        rules: {
            "turmag-eslint-special-rules/rule-name": "warn"
        }
    }
];
```



## Configurations

<!-- begin auto-generated configs list -->
TODO: Run eslint-doc-generator to generate the configs list (or delete this section if no configs are offered).
<!-- end auto-generated configs list -->



## Rules

<!-- begin auto-generated rules list -->
TODO: Run eslint-doc-generator to generate the rules list.
<!-- end auto-generated rules list -->


