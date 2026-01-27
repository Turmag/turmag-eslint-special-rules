import addVueExtension from './rules/add-vue-extension.js';
import importEntitesByColumnOrLine from './rules/import-entities-by-column-or-line';
import preferTrueAttributeShorthand from './rules/prefer-true-attribute-shorthand';
import useShortestAlias from './rules/use-shortest-alias';
import variableEntitiesByColumnOrLine from './rules/variable-entities-by-column-or-line';

export const rules = {
  'add-vue-extension': addVueExtension,
  'import-entities-by-column-or-line': importEntitesByColumnOrLine,
  'prefer-true-attribute-shorthand': preferTrueAttributeShorthand,
  'use-shortest-alias': useShortestAlias,
  'variable-entities-by-column-or-line': variableEntitiesByColumnOrLine,
};

export default { rules };