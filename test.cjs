'use strict';

// eslint-disable-next-line import/no-unresolved
const test = require('ava').default;
const prettier = require('prettier');

function format(string, options) {
  return prettier.format(string, {
    ...options,
    plugins: ['.'],
  });
}

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

test('format - by name', (t) => {
  const result = format(source, {
    filepath: 'ssh_config',
  });

  t.is(result, expected);
});

test('format - by parser', (t) => {
  const result = format(source, {
    parser: 'ssh-config',
  });

  t.is(result, expected);
});

test('format - useTabs', (t) => {
  const result = format(
    `Host *
  HostName test`,
    {
      parser: 'ssh-config',
      useTabs: true,
    },
  );

  t.is(result, 'Host *\n\tHostName test\n\n');
});

test('format - tabWidth', (t) => {
  const result = format(
    `Host *
  HostName test`,
    {
      parser: 'ssh-config',
      tabWidth: 4,
    },
  );

  t.is(result, 'Host *\n    HostName test\n\n');
});

test('format - endOfLine', (t) => {
  const result = format('Host *\r\nHostName test', {
    parser: 'ssh-config',
    endOfLine: 'cr',
  });

  t.is(result, 'Host *\r  HostName test\r\r');
});
