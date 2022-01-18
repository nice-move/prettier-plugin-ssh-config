// eslint-disable-next-line import/no-unresolved
import test from 'ava';

import { format } from './helper/lib.mjs';

const source = `

#sfsfsf
\tgfd6g   56
  fd5465  5d54

#ccccccccccc
  # sfsccfsf
# sfsfs
 sss 5d54

\r\r  ssdd             4

matcH  fddfdfd
aaa    5d54

#   sfsfs
Host     *        55

# 4

HostName  localhost
  User root

# sfsfs5
   Host  abc 8
  # sfsfs

HostName   127.0.0.1

  User  nginx
  # sfsccccccccccccccfs
hhh nginx`;

const expected = `# sfsfsf
gfd6g 56
fd5465 5d54

# ccccccccccc
# sfsccfsf
# sfsfs
sss 5d54
ssdd 4

Match fddfdfd
  aaa 5d54

# sfsfs
Host * 55
  # 4
  HostName localhost
  User root

# sfsfs5
Host abc 8
  # sfsfs
  HostName 127.0.0.1
  User nginx
  # sfsccccccccccccccfs
  hhh nginx\n`;

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
