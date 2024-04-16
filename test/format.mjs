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

matcH host= fddfdfd
aaa    5d54

#   sfsfs
Host     *        55

# 4

HostName  localhost
  User root\r\n
# sfsfs5
   Host  abc 8
  # sfsfs

HostName   127.0.0.1

  User  nginx
  # sfsccccccccccccccfs
hhh nginx`;

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
