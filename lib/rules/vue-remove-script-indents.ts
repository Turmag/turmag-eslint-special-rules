import { TSESTree } from '@typescript-eslint/utils';
import { Rule } from 'eslint';

export default {
    meta: {
        fixable: 'code',
        type: 'suggestion',
        docs: { description: 'Remove extra padding lines in `<script>` tags of Vue files' },
        messages: { remove: 'Remove extra padding lines' },
    },
    // @ts-expect-error context type
    create(context) {
        return {
            Program(node: TSESTree.Program) {
                const sourceCode = context.getSourceCode();
                const text = sourceCode.getText();

                const scriptRegex = /(<script[^>]*>)\s*\n?([^\n]*.*?)\s*\n?(<\/script>)/gs;
                let match;

                while ((match = scriptRegex.exec(text)) !== null) {
                    const openingTag = match[1];
                    const content = match[2].replace(/^\s*\n|\n\s*$/g, '');
                    const closingTag = match[3];

                    const fixedContent = `${openingTag}\n${content}\n${closingTag}`;

                    if (fixedContent !== match[0]) {
                        const startIndex = match.index;
                        const endIndex = startIndex + match[0].length;

                        context.report({
                            node,
                            messageId: 'remove',
                            fix(fixer: Rule.RuleFixer) {
                                return fixer.replaceTextRange([startIndex, endIndex], fixedContent);
                            },
                        });
                    }
                }
            },
        };
    },
}