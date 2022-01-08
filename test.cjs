'use strict';

const test = require('ava').default;

const prettier = require('prettier');

function format(string, options) {
  return prettier.format(string, {
    ...options,
    plugins: ['.'],
  });
}

const source = `  IdentityFile ~/.ssh/id_rsa

\tHost   tahoe   544555
    HostName tahoe.com
  Host *
User keanu
    ForwardAgent true`;

const expected = `IdentityFile ~/.ssh/id_rsa

Host tahoe 544555
  HostName tahoe.com

Host *
  User keanu
  ForwardAgent true
`;

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

  t.is(
    result,
    `Host *
\tHostName test
`,
  );
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

  t.is(
    result,
    `Host *
    HostName test
`,
  );
});

test('format - endOfLine', (t) => {
  const result = format('Host *\r\nHostName test', {
    parser: 'ssh-config',
    endOfLine: 'cr',
  });

  t.is(result, 'Host *\r  HostName test\r');
});
