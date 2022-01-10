'use strict';

/* eslint-disable no-param-reassign */

function common(ast, { linebreak }) {
  ast.forEach((item, index, array) => {
    if (item.type === 1 && item.separator) {
      ast[index].separator = ' ';
    }

    if (item.type === 2 && item.content !== '#') {
      ast[index].content = item.content.replace(/^#\s*/, '# ');
    }

    ast[index].after = linebreak;

    const next = array[index + 1];

    if (item.type === 1 && next && next.type === 2) {
      ast[index].after = linebreak.repeat(2);
    }
  });
}

function subTransform(ast, { tab, linebreak }) {
  common(ast, { linebreak });

  ast.forEach((item, index) => {
    ast[index].before = tab;
  });

  return ast;
}

module.exports = function transform(ast, { tab, linebreak }) {
  common(ast, { linebreak });

  ast.forEach((item, index) => {
    ast[index].before = '';

    if (item.type === 1 && item.config && item.config.length > 0) {
      ast[index].config = subTransform(item.config, {
        tab,
        linebreak,
      });

      if (ast[index].config[0].type === 2) {
        ast[index].after = linebreak.repeat(2);
      }
    }
  });

  return ast;
};
