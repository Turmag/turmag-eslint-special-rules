import addVueExtension from 'lib/rules/add-vue-extension.js';
import importEntitesByColumnOrLine from 'lib/rules/import-entities-by-column-or-line';
import importRightOrder from 'lib/rules/import-right-order.js';
import preferTrueAttributeShorthand from 'lib/rules/prefer-true-attribute-shorthand';
import useShortestAlias from 'lib/rules/use-shortest-alias.js';
import variableEntitiesByColumnOrLine from 'lib/rules/variable-entities-by-column-or-line.js';

export const rules = {
  'add-vue-extension': addVueExtension,
  'import-entities-by-column-or-line': importEntitesByColumnOrLine,
  'import-right-order': importRightOrder,
  'prefer-true-attribute-shorthand': preferTrueAttributeShorthand,
  'use-shortest-alias': useShortestAlias,
  'variable-entities-by-column-or-line': variableEntitiesByColumnOrLine,
};

export default { rules };