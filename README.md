# prettier-plugin-ssh-config

A [prettier] plugin for ssh config.

[prettier]: https://prettier.io/

[![npm][npm-badge]][npm-url]
[![github][github-badge]][github-url]
![node][node-badge]

[npm-url]: https://www.npmjs.com/package/prettier-plugin-ssh-config
[npm-badge]: https://img.shields.io/npm/v/prettier-plugin-ssh-config.svg?style=flat-square&logo=npm
[github-url]: https://github.com/nice-move/prettier-plugin-ssh-config
[github-badge]: https://img.shields.io/npm/l/prettier-plugin-ssh-config.svg?style=flat-square&colorB=blue&logo=github
[node-badge]: https://img.shields.io/node/v/prettier-plugin-ssh-config.svg?style=flat-square&colorB=green&logo=node.js

## Installation

```sh
npm install prettier prettier-plugin-ssh-config --save-dev
```

## Usage

```sh
prettier --write ssh_config
```

To support custom config name:

```json
// .prettierrc.json
{
  "overrides": [
    {
      "files": ".ssh/config",
      "options": {
        "parser": "ssh-config"
      }
    }
  ]
}
```

## Options

This plugin took [options](https://prettier.io/docs/en/options.html) from prettier. Support `useTabs/tabWidth/endOfLine` , not support `printWidth/requirePragma/insertPragma` .

## Related

- [@nice-move/prettier-config](https://github.com/nice-move/nice-move/tree/master/packages/prettier-config)
- [@bring-it/cli](https://github.com/airkro/bring-it)
