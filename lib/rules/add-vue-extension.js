const path = require('node:path');
const fs = require('node:fs');

module.exports = {
    meta: {
        fixable: 'code',
        type: 'suggestion',
        docs: {
            description: 'Require .vue in vue files',
        },
        messages: {
            proper: 'Use proper import of vue files',
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

                const basedir = path.dirname(path.resolve(context.getFilename()));
                let nodeName = node.source.value;

                aliases.every(([key, value]) => {
                    if (nodeName.includes(key)) nodeName = nodeName.replace(key, value);
                    else return nodeName === node.source.value;
                });

                const filePath = path.resolve(basedir, nodeName);

                const vueExt = '.vue';
                const findRealExtension = filePath => {
                    let realExt = fs.existsSync(filePath) ? path.extname(filePath) : null;
                    if (realExt === null) realExt = fs.existsSync(`${filePath}${vueExt}`) ? path.extname(`${filePath}${vueExt}`) : null;

                    return realExt;
                };

                const nodeNameExt = path.extname(nodeName);
                const realExt = findRealExtension(filePath);

                if (realExt === vueExt && realExt !== nodeNameExt) {
                    context.report({
                        node,
                        messageId: 'proper',
                        fix: fixer => fixer.replaceText(node, node.specifiers.map(specifier => `import ${specifier.local.name} from '${node.source.value}${realExt}';`).join('\n')),
                    });
                }
            },
        };
    },
}