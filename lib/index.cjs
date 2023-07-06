'use strict';

const SSHConfig = require('ssh-config');
const transform = require('./transform.cjs');

const name = 'ssh-config';

const breaks = {
  lf: '\n',
  crlf: '\r\n',
  cr: '\r',
};

module.exports = {
  languages: [
    {
      name: 'SSH Config',
      parsers: [name],
      filenames: ['ssh_config', 'ssh.config', 'ssh-config', 'sshconfig'],
      extensions: ['.ssh_config', '.ssh-config', '.sshconfig'],
      group: 'INI',
      aceMode: 'text',
      tmScope: 'source.ssh-config',
      language_id: 554920715,
    },
  ],
  parsers: {
    [name]: {
      astFormat: name,
      parse: (data) => SSHConfig.parse(data),
    },
  },
  printers: {
    [name]: {
      print: (path, { endOfLine, useTabs, tabWidth }) => {
        const ast = path.getValue();

        const tab = useTabs ? '\t' : ' '.repeat(tabWidth);

        const linebreak = breaks[endOfLine];

        transform(ast, { tab, linebreak });

        return ast.toString().trimEnd() + linebreak;
      },
    },
  },
};
