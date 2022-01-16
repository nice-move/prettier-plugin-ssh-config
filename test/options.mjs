// eslint-disable-next-line import/no-unresolved
import test from 'ava';

import { format } from './helper/lib.mjs';

test('options - useTabs', (t) => {
  format(
    t,
    {
      parser: 'ssh-config',
      useTabs: true,
    },
    'Host  *\r    HostName  test',
    'Host *\n\tHostName test\n\n',
  );
});

test('options - tabWidth', (t) => {
  format(
    t,
    {
      parser: 'ssh-config',
      tabWidth: 4,
    },
    'Host  *\rHostName  test',
    'Host *\n    HostName test\n\n',
  );
});

test('options - endOfLine', (t) => {
  format(
    t,
    {
      parser: 'ssh-config',
      endOfLine: 'cr',
    },
    'Host  *\r\nUser  test',
    'Host *\r  User test\r\r',
  );
});
