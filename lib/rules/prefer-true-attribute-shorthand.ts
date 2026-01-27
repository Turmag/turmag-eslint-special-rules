export default {
    meta: {
        fixable: 'code',
        type: 'suggestion',
        docs: {
            description:
            'Require shorthand form attribute when `v-bind` value is `true`',
        },
        messages: {
            shortHand: 'Boolean prop with \'true\' value should be written in shorthand form',
            longHand: 'Boolean prop with \'true\' value should be written in longhand form',
        },
        schema: [{ enum: ['always', 'never'] }],
    },
    // @ts-expect-error create type
    create(context) {
        const sourceCode = context.getSourceCode();
        return sourceCode.parserServices?.defineTemplateBodyVisitor
            ? sourceCode.parserServices.defineTemplateBodyVisitor({
                VAttribute(node: { directive: unknown; value: { expression: { value: boolean; }; }; key: { rawName?: unknown; name?: unknown; argument?: unknown; }; }) {
                    const option = context.options[0] || 'always';

                    if (option === 'never' && !node.directive && !node.value) {
                        context.report({
                            node,
                            messageId: 'longHand',
                            fix: (fixer: { replaceText: (arg0: unknown, arg1: string) => unknown; }) => fixer.replaceText(node, `:${node.key.rawName}="true"`),
                        });
                    }

                    if (option !== 'always') return;

                    if (node.directive && node.key.name !== 'bind' && node.value?.expression?.value && node.value.expression.value === Boolean(node.value.expression.value)) {
                        const { argument } = node.key;
                        if (!argument) return;

                        context.report({
                            node,
                            messageId: 'shortHand',
                            fix: (fixer: { replaceText: (arg0: unknown, arg1: unknown) => unknown; }) => {
                                const sourceCode = context.getSourceCode();
                                return fixer.replaceText(node, sourceCode.getText(argument));
                            },
                        });
                    }
                },
            })
            : {};
    },
}