
import { Rule } from 'eslint';
import { TSESTree } from '@typescript-eslint/utils';

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
    // @ts-expect-error create type
    create(context) {
        return {
            ImportDeclaration(node: TSESTree.ImportDeclaration) {
                if (!node.specifiers[0]) return;
                if (node.specifiers[0].type === 'ImportDefaultSpecifier') return;
                const minProperties = context.options[0].minProperties;

                const isTypedNode = node.importKind === 'type';
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

                const getSpecifiersArr = (specifiers: TSESTree.ImportSpecifier[]) => {
                    const specifiersArr: string[] = [];
                    specifiers.forEach(specifier => {
                        const localName = specifier.local.name;
                        let resultName = localName;
                        if ((specifier.imported as TSESTree.Identifier).name !== localName) {
                            resultName = `${(specifier.imported as TSESTree.Identifier).name} as ${localName}`;
                        }

                        const name = specifier.importKind === 'type' ? `type ${resultName}` : resultName;

                        specifiersArr.push(name);
                    });

                    return specifiersArr;
                };

                if(areLinesRepeated){
                    context.report({
                        node,
                        messageId: 'column',
                        fix: (fixer: Rule.RuleFixer) => {
                            const specifiersArr = getSpecifiersArr(node.specifiers as TSESTree.ImportSpecifier[]);

                            const replaceShiftSign = '\n    ';
                            return fixer.replaceText(node, `import ${isTypedNode ? 'type ' : ''}{${replaceShiftSign}${specifiersArr.join(`,${replaceShiftSign}`)},\n} from '${node.source.value}';`);
                        },
                    });
                }
                else if(areSmallAttributesInColumn){
                    context.report({
                        node,
                        messageId: 'line',
                        fix: (fixer: Rule.RuleFixer) => {
                            const specifiersArr = getSpecifiersArr(node.specifiers as TSESTree.ImportSpecifier[]);

                            const replaceShiftSign = ' ';
                            return fixer.replaceText(node,  `import ${isTypedNode ? 'type ' : ''}{${replaceShiftSign}${specifiersArr.join(`,${replaceShiftSign}`)} } from '${node.source.value}';`);
                        },
                    });
                }
            },
        };
    },
}
