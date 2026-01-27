import { TSESTree } from '@typescript-eslint/utils';
import { Rule } from 'eslint';

export default {
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
    // @ts-expect-error context type
    create(context) {
        return {
            VariableDeclaration(node: TSESTree.VariableDeclaration) {
                if (!node.declarations[0]) return;
                if (node.declarations[0].id.type !== 'ObjectPattern') return;
                if (!node.declarations[0].init) return;
                const minProperties = context.options[0].minProperties;
                const kind = node.kind;
                const declaration = node.declarations[0];
                // @ts-expect-error properties type
                const properties = declaration.id.properties;
                const sourceCode = context.sourceCode;
                const rightSideText = sourceCode.getText(declaration.init);
                let areSmallAttributesInColumn = false;
                let areLinesRepeated = false;

                let isObjectDestructured = false;
                // @ts-expect-error property type
                properties.forEach(property => {
                    if (property.value?.type === 'ObjectPattern') isObjectDestructured = true;
                });

                if (isObjectDestructured) return;

                if (properties.length < minProperties) {
                    if (properties[0].loc.start.line !== properties[0].parent.loc.start.line) areSmallAttributesInColumn = true;
                } else {
                    // @ts-expect-error property type
                    properties.every((property, i: number) => {
                        if (i === 0) return true;
                        if (property.loc.start.line === property.loc.end.line && properties[i - 1].loc.start.line === property.loc.start.line) areLinesRepeated = true;
                        else return !areLinesRepeated;
                    });
                }

                // @ts-expect-error properties type
                const getPropertiesArr = properties => {
                    const propertiesArr: string[] = [];
                    // @ts-expect-error property type
                    properties.forEach(property => {
                        if (property.type === 'RestElement') {
                            propertiesArr.push(`...${property.argument.name}`);
                            return;
                        }
                        const key = property.key.name;
                        let value = property.value.name;

                        let name = key === value ? value : `${key}: ${value}`;

                        if (!value && property.value.left && property.value.right) {
                            value = property.value.left.name;
                            const rightValue = property.value.right.value;
                            name = key === value ? `${value} = ${rightValue}` : `${key}: ${value} = ${rightValue}`;
                        }

                        propertiesArr.push(name);
                    });

                    return propertiesArr;
                };

                if (areLinesRepeated) {
                    context.report({
                        node,
                        messageId: 'column',
                        fix: (fixer: Rule.RuleFixer) => {
                            const propertiesArr = getPropertiesArr(properties);
                            const replaceShiftSign = '\n    ';
                            // @ts-expect-error node type
                            return fixer.replaceText(node, `${kind} {${replaceShiftSign}${propertiesArr.join(`,${replaceShiftSign}`)},\n} = ${rightSideText};`);
                        },
                    });
                } else if (areSmallAttributesInColumn) {
                    context.report({
                        node,
                        messageId: 'line',
                        fix: (fixer: Rule.RuleFixer) => {
                            const propertiesArr = getPropertiesArr(properties);
                            const replaceShiftSign = ' ';
                            // @ts-expect-error node type
                            return fixer.replaceText(node, `${kind} {${replaceShiftSign}${propertiesArr.join(`,${replaceShiftSign}`)} } = ${rightSideText};`);
                        },
                    });
                }
            },
        };
    },
}