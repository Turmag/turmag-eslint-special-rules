module.exports = {
    meta: {
        fixable: 'code',
        type: 'suggestion',
        docs: {
            description: 'There are can be used shortest alias',
        },
        messages: {
            shortest: 'Use shortest alias',
        },
        schema: [{
            type: 'object',
            properties: { aliases: { type: 'object' } },
        }],
    },
    create(context) {
        return {
            ImportDeclaration(node) {
                const aliases = Object.entries(context.options[0].aliases);
                if (!aliases.length) return;

                const nodeName = node.source.value;
                let nodeNameWithoutAlias = nodeName;
                let resultNodeName = nodeName;

                aliases.every(([key, value]) => {
                    if (nodeNameWithoutAlias.includes(key)) nodeNameWithoutAlias = nodeNameWithoutAlias.replace(key, value);
                    else return nodeNameWithoutAlias === nodeName;
                });

                nodeNameWithoutAlias = nodeNameWithoutAlias.replace(/\\/ig, '/');

                aliases.every(([key, value]) => {
                    value = value.replace(/\\/ig, '/');
                    if (nodeNameWithoutAlias.includes(value))
                        resultNodeName = nodeNameWithoutAlias.replace(value, key).replace(/\\/ig, '/');
                    else return resultNodeName === nodeName;
                });

                if (nodeName !== resultNodeName) {
                    context.report({
                        node,
                        messageId: 'shortest',
                        fix: fixer => {
                            let replaceText = '';
                            if (node.specifiers[0].type === 'ImportDefaultSpecifier')
                                replaceText = `import ${node.specifiers[0].local.name} from '${resultNodeName}';`;
                            else {
                                const specifiersArr = [];
                                node.specifiers.forEach(specifier => specifiersArr.push(specifier.local.name));

                                const replaceSign = specifiersArr.length > 2 ? '\n' : ' ';
                                const replaceShiftSign = specifiersArr.length > 2 ? '\n    ' : ' ';
                                replaceText = `import {${replaceShiftSign}${specifiersArr.join(`,${replaceShiftSign}`)}${specifiersArr.length > 2 ? ',' : ''}${replaceSign}} from '${resultNodeName}';`;
                            }

                            return fixer.replaceText(node, replaceText);
                        },
                    });
                }
            },
        };
    },
}