import addVueExtension from './add-vue-extension.js';
import importEntitesByColumnOrLine from './import-entities-by-column-or-line.js';
import preferTrueAttributeShorthand from './prefer-true-attribute-shorthand.js';
import useShortestAlias from './use-shortest-alias.js';
import variableEntitiesByColumnOrLine from './variable-entities-by-column-or-line.js';
import vueRemoveScriptIndents from './vue-remove-script-indents.js';

export const rules = {
  'add-vue-extension': addVueExtension,
  'import-entities-by-column-or-line': importEntitesByColumnOrLine,
  'prefer-true-attribute-shorthand': preferTrueAttributeShorthand,
  'use-shortest-alias': useShortestAlias,
  'variable-entities-by-column-or-line': variableEntitiesByColumnOrLine,
  'vue-remove-script-indents': vueRemoveScriptIndents,
};

export default { rules };