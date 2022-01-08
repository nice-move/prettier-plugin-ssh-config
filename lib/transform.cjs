'use strict';

module.exports = function transform(ast, { tab, linebreak, indent = false }) {
  ast.forEach((item, index) => {
    /* eslint-disable no-param-reassign */

    ast[index].before = indent ? tab : index === 0 ? '' : linebreak;

    ast[index].after = linebreak;

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
      }
    }
    /* eslint-enable no-param-reassign */
  });

  return ast;
};
