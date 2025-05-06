module.exports = {
    meta: {
        fixable: 'code',
        type: 'suggestion',
        docs: { description: 'Prefered column or line destructuring' },
        messages: {
            column: 'Use column destructuring',
            line: 'Use line destructuring',
        },
        schema: [{
            type: 'object',
            properties: { minProperties: { type: 'number' } },
        }],
    },
    create(context) {
        return {
            VariableDeclaration(node) {
                if (!node.declarations[0]) return;
                if (node.declarations[0].id.type !== 'ObjectPattern') return;
                if (!node.declarations[0].init) return;
                const minProperties = context.options[0].minProperties;
                const kind = node.kind;
                const declaration = node.declarations[0];
                const properties = declaration.id.properties;
                const sourceCode = context.sourceCode;
                const rightSideText = sourceCode.getText(declaration.init);
                let areSmallAttributesInColumn = false;
                let areLinesRepeated = false;

                if (properties.length < minProperties) {
                    if (properties[0].loc.start.line !== properties[0].parent.loc.start.line) areSmallAttributesInColumn = true;
                } else {
                    properties.every((property, i) => {
                        if (i === 0) return true;
                        if (property.loc.start.line === property.loc.end.line && properties[i - 1].loc.start.line === property.loc.start.line) areLinesRepeated = true;
                        else return !areLinesRepeated;
                    });
                }

                const getPropertiesArr = properties => {
                    const propertiesArr = [];
                    properties.forEach(property => {
                        if (property.type === 'RestElement') {
                            propertiesArr.push(`...${property.argument.name}`);
                            return;
                        }
                        const key = property.key.name;
                        const value = property.value.name;
                        const name = key === value ? value : `${key}: ${value}`;
                        propertiesArr.push(name);
                    });

                    return propertiesArr;
                };

                if (areLinesRepeated) {
                    context.report({
                        node,
                        messageId: 'column',
                        fix: fixer => {
                            const propertiesArr = getPropertiesArr(properties);
                            const replaceShiftSign = '\n    ';
                            return fixer.replaceText(node, `${kind} {${replaceShiftSign}${propertiesArr.join(`,${replaceShiftSign}`)},\n} = ${rightSideText};`);
                        },
                    });
                } else if (areSmallAttributesInColumn) {
                    context.report({
                        node,
                        messageId: 'line',
                        fix: fixer => {
                            const propertiesArr = getPropertiesArr(properties);
                            const replaceShiftSign = ' ';
                            return fixer.replaceText(node, `${kind} {${replaceShiftSign}${propertiesArr.join(`,${replaceShiftSign}`)} } = ${rightSideText};`);
                        },
                    });
                }
            },
        };
    },
}