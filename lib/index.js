/**
 * @fileoverview Special eslint rules for your awesome projects
 * @author Pavel
 */
"use strict";

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

import addVueExtension from "./rules/add-vue-extension";
import importEntitiesByColumnOrLine from "./rules/import-entities-by-column-or-line";
import importRightOrder from "./rules/import-right-order";
import preferTrueAttributeShorthand from "./rules/prefer-true-attribute-shorthand";
import useShortestAlias from "./rules/use-shortest-alias";

// import all rules in lib/rules
export default {
    'add-vue-extension': addVueExtension,
    'import-entities-by-column-or-line': importEntitiesByColumnOrLine,
    'import-right-order': importRightOrder,
    'prefer-true-attribute-shorthand': preferTrueAttributeShorthand,
    'use-shortest-alias': useShortestAlias,
}
