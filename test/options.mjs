import test from 'ava';

import { format } from './helper/lib.mjs';
import { source } from './helper/source.mjs';

test(
  'options - useTabs',
  format,
  {
    parser: 'ssh-config',
    useTabs: true,
  },
  source,
);

test(
  'options - tabWidth',
  format,
  {
    parser: 'ssh-config',
    tabWidth: 4,
  },
  source,
);

test(
  'options - endOfLine',
  format,
  {
    parser: 'ssh-config',
    endOfLine: 'cr',
  },
  source,
);
