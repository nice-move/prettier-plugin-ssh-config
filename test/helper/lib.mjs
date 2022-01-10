import prettier from 'prettier';

function pretty(string, options) {
  return prettier.format(string, {
    ...options,
    plugins: ['.'],
  });
}

export function format(t, options, source, expected) {
  const result = pretty(source, options);

  t.is(result, expected);
}
