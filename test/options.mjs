import test from 'ava';

import { format } from './helper/lib.mjs';

test(
  'options - useTabs',
  format,
  {
    parser: 'ssh-config',
    useTabs: true,
  },
  'Host  *\r    HostName  test',
);

test(
  'options - tabWidth',
  format,
  {
    parser: 'ssh-config',
    tabWidth: 4,
  },
  'Host  *\rHostName  test',
);

test(
  'options - endOfLine',
  format,
  {
    parser: 'ssh-config',
    endOfLine: 'cr',
  },
  'Host  *\r\nUser  test',
);
