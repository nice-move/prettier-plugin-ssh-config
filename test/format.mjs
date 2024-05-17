import test from 'ava';

import { format } from './helper/lib.mjs';
import { source } from './helper/source.mjs';

test(
  'format by name',
  format,
  {
    filepath: 'ssh_config',
  },
  source,
);

test(
  'format by parser',
  format,
  {
    parser: 'ssh-config',
  },
  source,
);
