import test from 'ava';

import { format } from './helper/lib.mjs';

test(
  'feature - comment whitespace',
  format,
  { parser: 'ssh-config' },
  `#abc
  #  abc

  #   \t  abc
`,
);

test(
  'feature - first line no empty',
  format,
  { parser: 'ssh-config' },
  `
# abc
 abc
\rkey value
`,
);
