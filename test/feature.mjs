import test from 'ava';

import { format } from './helper/lib.mjs';

test(
  'feature - comment whitespace',
  format,
  { parser: 'ssh-config' },
  '#abc\n',
  '  #  abc\n',
  '\n  #  abc\n',
);

test(
  'feature - first line no empty',
  format,
  { parser: 'ssh-config' },
  '\n# abc\n',
  ' abc\n',
  '\rkey value\n',
);

test(
  'feature - whitespace as separator',
  format,
  { parser: 'ssh-config' },
  'key   value\n',
  'Host  *   *  \n',
  'Host abc\nkey value',
);
