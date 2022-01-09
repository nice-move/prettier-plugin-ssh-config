'use strict';

module.exports = function transform(ast, { tab, linebreak, indent = false }) {
  /* eslint-disable no-param-reassign */

  ast.forEach((item, index) => {
    ast[index].before = indent ? tab : index === 0 ? '' : linebreak;

    ast[index].after = linebreak;

    if (item.type === 2 && item.content !== '#') {
      ast[index].content = item.content.replace(/^#\s*/, '# ');
    }

    if (item.type === 1) {
      if (item.separator) {
        ast[index].separator = ' ';
      }

      if (item.config) {
        ast[index].config = transform(item.config, {
          tab,
          linebreak,
          indent: true,
        });

        if (ast[index].config[0].type === 2) {
          ast[index].after = linebreak.repeat(2);
        }
      }
    }
  });

  if (!indent) {
    return ast + linebreak;
  }

  /* eslint-enable no-param-reassign */
  return ast;
};
