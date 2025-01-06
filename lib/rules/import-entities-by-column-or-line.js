export default {
    meta: {
        fixable: 'code',
        type: 'suggestion',
        docs: {
            description: 'Prefered column or line import',
        },
        messages: {
            column: 'Use column import',
            line: 'Use line import',
        },
        schema: [{
            type: 'object',
            properties: { minProperties: { type: 'number' } },
        }],
    },
    create(context) {
        return {
            ImportDeclaration(node) {
                if (!node.specifiers[0]) return;
                if (node.specifiers[0].type === 'ImportDefaultSpecifier') return;
                const minProperties = context.options[0].minProperties;

                let areSmallAttributesInColumn = false;
                let areLinesRepeated = false;
                if (node.specifiers.length < minProperties) {
                    if (node.specifiers[0].loc.start.line !== node.specifiers[0].parent.loc.start.line) areSmallAttributesInColumn = true;
                } else {
                    node.specifiers.every((specifier, i) => {
                        if (i === 0) return true;
                        if (specifier.loc.start.line === specifier.loc.end.line && node.specifiers[i - 1].loc.start.line === specifier.loc.start.line) areLinesRepeated = true;
                        else return !areLinesRepeated;
                    });
                }

                if(areLinesRepeated){
                    context.report({
                        node,
                        messageId: 'column',
                        fix: fixer => {
                            const specifiersArr = [];
                            node.specifiers.forEach(specifier => specifiersArr.push(specifier.local.name));

                            const replaceShiftSign = '\n    ';
                            return fixer.replaceText(node, `import {${replaceShiftSign}${specifiersArr.join(`,${replaceShiftSign}`)},\n} from '${node.source.value}';`);
                        },
                    });
                }
                else if(areSmallAttributesInColumn){
                    context.report({
                        node,
                        messageId: 'line',
                        fix: fixer => {
                            const specifiersArr = [];
                            node.specifiers.forEach(specifier => specifiersArr.push(specifier.local.name));

                            const replaceShiftSign = ' ';
                            return fixer.replaceText(node,  `import {${replaceShiftSign}${specifiersArr.join(`,${replaceShiftSign}`)} } from '${node.source.value}';`);
                        },
                    });
                }
            },
        };
    },
}