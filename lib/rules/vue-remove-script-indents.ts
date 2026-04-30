import { TSESTree } from '@typescript-eslint/utils';
import { Rule } from 'eslint';

export default {
    meta: {
        fixable: 'code',
        type: 'suggestion',
        docs: { description: 'Remove extra padding lines in `<script>` tags of Vue files' },
        messages: {
            removeAfterOpening: 'Remove extra lines after opening `<script>` tag',
            removeBeforeClosing: 'Remove extra lines before closing `</script>` tag',
            removeBoth: 'Remove extra lines after opening `<script>` and before closing `</script>` tag',
        },
    },
    // @ts-expect-error context type
    create(context) {
        return {
            Program(node: TSESTree.Program) {
                const filename = context.getFilename();
                if (!filename.endsWith('.vue')) return;

                const sourceCode = context.getSourceCode();
                const text = sourceCode.getText();

                const scriptRegex = /(<script[^>]*>)(\s*)(.*?)(\s*)(<\/script>)/gs;
                let match;

                while ((match = scriptRegex.exec(text)) !== null) {
                    const openingTag = match[1];
                    const whitespaceAfterOpening = match[2];
                    const content = match[3];
                    const whitespaceBeforeClosing = match[4];
                    const closingTag = match[5];

                    const normalizeToNewlines = (str: string) => str.replace(/\r\n/g, '\n');

                    const normalizedAfterOpening = normalizeToNewlines(whitespaceAfterOpening);
                    const normalizedBeforeClosing = normalizeToNewlines(whitespaceBeforeClosing);

                    const newlineCountAfterOpening = (normalizedAfterOpening.match(/\n/g) || []).length;
                    const newlineCountBeforeClosing = (normalizedBeforeClosing.match(/\n/g) || []).length;

                    const hasExtraAfterOpening = newlineCountAfterOpening > 1;
                    const hasExtraBeforeClosing = newlineCountBeforeClosing > 1;

                    if (!hasExtraAfterOpening && !hasExtraBeforeClosing) {
                        continue;
                    }

                    const cleanedContent = content.replace(/^\s+|\s+$/g, '');

                    const fixedContent = `${openingTag}\n${cleanedContent}\n${closingTag}`;

                    // Нормализуем оригинал для сравнения
                    const normalizedOriginal = normalizeToNewlines(match[0]);
                    const normalizedFixed = normalizeToNewlines(fixedContent);

                    if (normalizedFixed !== normalizedOriginal) {
                        const startIndex = match.index;
                        const endIndex = startIndex + match[0].length;
                        let messageId;

                        if (hasExtraAfterOpening && hasExtraBeforeClosing) {
                            messageId = 'removeBoth';
                        } else if (hasExtraAfterOpening) {
                            messageId = 'removeAfterOpening';
                        } else {
                            messageId = 'removeBeforeClosing';
                        }

                        context.report({
                            node,
                            messageId,
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