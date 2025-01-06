/**
 * @fileoverview Special eslint rules for your awesome projects
 * @author Pavel
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
export default {
    rules: requireIndex(`${__dirname}/rules`)
}
