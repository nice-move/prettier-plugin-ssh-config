// eslint-disable-next-line import/no-unresolved
import test from 'ava';

import { format } from './helper/lib.mjs';

function pretty(t, source, expected) {
  format(t, { parser: 'ssh-config' }, source, expected);
}

test('feature - comment whitespace', (t) => {
  pretty(t, '#abc\n', '# abc\n');
  pretty(t, '  #  abc\n', '# abc\n');
});

test('feature - first line no empty', (t) => {
  pretty(t, '\n# abc\n', '# abc\n');
  pretty(t, '\rkey value\n', 'key value\n');
});

test('feature - whitespace as separator', (t) => {
  pretty(t, 'key   value\n', 'key value\n');
  pretty(t, 'Host  *   *  \n', 'Host * *\n');
  pretty(t, 'Host abc\nkey value', 'Host abc\n  key value\n');
});
