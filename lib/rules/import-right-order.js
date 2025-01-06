/**
 * DEPRECATED!
 * It's better to use rule sort-imports with custom groups from plugin eslint-plugin-perfectionist
 */

const entitiesOrder = ['external', 'vue', 'component', 'composable', 'store', 'mixin', 'type', 'constant', 'method', 'api'];
const determineEntity = (value, specifiers) => {
    let entity = 'external';
    value = value.toLowerCase();

    if (value === 'vue') entity = 'vue';
    else if (value.includes('mixin')) entity = 'mixin';
    else if (value.includes('.vue') || value.includes('kit')) entity = 'component';
    else if (value.includes('composable') || specifiers && specifiers[0]?.local.name.toLowerCase().includes('use')) entity = 'composable';
    else if (value.includes('store')) entity = 'store';
    else if (value.includes('type')) entity = 'type';
    else if (value.includes('constant')) entity = 'constant';
    else if (value.includes('helper') || value.includes('utils')) entity = 'method';
    else if (value.includes('api')) entity = 'api';

    return entity;
};

module.exports = {
    meta: {
        fixable: 'code',
        type: 'suggestion',
        docs: {
            description: 'Prefered right import order',
        },
        messages: {
            order: 'Use right import order',
        },
         
        schema: [],
    },
    create(context) {
        let prevNode = null;
        const nodesArr = [];
        let isErrorOrderNode = false;
        let startReplaceRange = 0;
        let endReplaceRange = 0;

        return {
            ImportDeclaration(node) {
                nodesArr.push(node);

                if (prevNode) {
                    const prevNodeEntity = determineEntity(prevNode.source.value, prevNode.specifiers);
                    const currentNodeEntity = determineEntity(node.source.value, node.specifiers);

                    const prevNodeIndex = entitiesOrder.indexOf(prevNodeEntity);
                    const currentNodeIndex = entitiesOrder.indexOf(currentNodeEntity);

                    prevNode.sortIndex = prevNodeIndex;
                    node.sortIndex = currentNodeIndex;

                    if (prevNodeIndex > currentNodeIndex && !isErrorOrderNode) {
                        isErrorOrderNode = true;
                    }
                }

                prevNode = node;

                if (isErrorOrderNode) {
                    context.report({
                        node,
                        messageId: 'order',
                        fix: fixer => {
                            const sortedNodesArr = structuredClone(nodesArr).sort((a, b) => a.sortIndex - b.sortIndex);

                            const replacedNodesArr = [];
                            sortedNodesArr.forEach((node, i) => {
                                if (replacedNodesArr.length) replacedNodesArr.push(node);
                                if (node.source.value !== nodesArr[i].source.value && !replacedNodesArr.length) {
                                    replacedNodesArr.push(node);
                                    startReplaceRange = nodesArr[i].range[0];
                                }
                                if (i === sortedNodesArr.length - 1) endReplaceRange = nodesArr[i].range[1];
                            });

                            let replaceText = '';

                            replaceText = '';
                            replacedNodesArr.forEach((node, i) => {
                                if (!node.specifiers[0]) {
                                    replaceText += `import '${node.source.value}';`;
                                } else if (node.specifiers[0].type === 'ImportDefaultSpecifier') {
                                    replaceText += `import ${node.specifiers[0].local.name} from '${node.source.value}';`;
                                } else if (node.specifiers[0].type === 'ImportNamespaceSpecifier') {
                                    replaceText += `import * as ${node.specifiers[0].local.name} from '${node.source.value}';`;
                                } else {
                                    const specifiersArr = [];
                                    node.specifiers.forEach(specifier => specifiersArr.push(specifier.local.name));

                                    const replaceSign = specifiersArr.length > 2 ? '\n' : ' ';
                                    const replaceShiftSign = specifiersArr.length > 2 ? '\n    ' : ' ';
                                    replaceText += `import {${replaceShiftSign}${specifiersArr.join(`,${replaceShiftSign}`)}${specifiersArr.length > 2 ? ',' : ''}${replaceSign}} from '${node.source.value}';`;
                                }
                                if (i < replacedNodesArr.length - 1) replaceText += '\n';
                            });

                            return fixer.replaceTextRange([startReplaceRange, endReplaceRange], replaceText);
                        },
                    });
                }
            },
        };
    },
}