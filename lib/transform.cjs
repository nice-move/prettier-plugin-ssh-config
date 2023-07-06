'use strict';

/* eslint-disable no-param-reassign */

function common(item) {
  if (item.type === 1 && item.separator) {
    item.separator = ' ';
  }

  if (item.type === 2 && item.content !== '#') {
    item.content = item.content.replace(/^#\s*/, '# ');
  }
}

function subTransform(ast, { tab, linebreak }) {
  for (const [index, item] of ast.entries()) {
    common(item);

    item.before = tab;

    item.after = index === ast.length - 1 ? linebreak.repeat(2) : linebreak;
  }
}

function endingComments(config) {
  const io = [];

  for (let index = config.length - 1; index >= 0; index--) {
    if (config[index].type === 2) {
      io.unshift(config.pop());
    } else {
      break;
    }
  }

  return io;
}

function isNested(item) {
  const io = item.param.toLowerCase();

  return io === 'host' || io === 'match';
}

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

module.exports = function transform(ast, { tab = '  ', linebreak = '\n' }) {
  for (const [index, item] of ast.entries()) {
    if (item.type === 1 && isNested(item)) {
      item.param = capitalize(item.param);

      if (item.config.length > 0) {
        const io = endingComments(item.config);

        if (io.length > 0) {
          ast.splice(index + 1, 0, ...io);
        }
      }
    }
  }

  for (const [index, item] of ast.entries()) {
    item.before = '';

    const next = ast[index + 1];

    if (item.type === 1) {
      if (isNested(item)) {
        if (item.config) {
          if (item.config.length === 0) {
            delete item.config;
            item.after = linebreak.repeat(2);
          } else {
            subTransform(item.config, { tab, linebreak });
            item.after = linebreak;
          }
        }
      } else if (
        next &&
        ((next.type === 1 && isNested(next)) || next.type === 2)
      ) {
        item.after = linebreak.repeat(2);
      } else {
        item.after = linebreak;
      }
    }

    if (item.type === 2) {
      item.after = /^\r\n{2}|\r{2}|\n{2}$/.test(item.after)
        ? linebreak.repeat(2)
        : linebreak;
    }

    common(item);
  }

  const last = ast.at(-1);

  if (last.type === 1 && isNested(last)) {
    if (last.config) {
      last.config.at(-1).after = linebreak;
    } else {
      last.after = linebreak;
    }
  }
};
