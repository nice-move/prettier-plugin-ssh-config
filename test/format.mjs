// eslint-disable-next-line import/no-unresolved
import test from 'ava';

import { format } from './helper/lib.mjs';

const source = `  IdentityFile ~/.ssh/id_rsa
#   hh9


      #f
#

\tHost   tahoe   544555
    HostName tahoe.com
  Host *
 # 5
User keanu

    ForwardAgent true`;

const expected = `IdentityFile ~/.ssh/id_rsa

# hh9

# f
#

Host tahoe 544555
  HostName tahoe.com

Host *
  # 5
  User keanu
  ForwardAgent true\n\n`;

test('format by name', (t) => {
  format(
    t,
    {
      filepath: 'ssh_config',
    },
    source,
    expected,
  );
});

test('format by parser', (t) => {
  format(
    t,
    {
      parser: 'ssh-config',
    },
    source,
    expected,
  );
});
