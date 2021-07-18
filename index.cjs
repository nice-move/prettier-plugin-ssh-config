'use strict';

const SSHConfig = require('ssh-config');

const name = 'ssh-config';

function format(data, { tab, linebreak }) {
  data.forEach((item, index) => {
    /* eslint-disable no-param-reassign */
    data[index].before = index === 0 ? '' : linebreak;
    data[index].after = linebreak;
    if (item.config) {
      item.config.forEach((_, subIndex) => {
        data[index].config[subIndex].before = tab;
        data[index].config[subIndex].after = linebreak;
      });
    }
    /* eslint-enable no-param-reassign */
  });
  return data.toString();
}

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
        const data = path.getValue();

        const tab = useTabs ? '\t' : ' '.repeat(tabWidth);

        const linebreak = breaks[endOfLine];

        return format(data, { tab, linebreak });
      },
    },
  },
};
