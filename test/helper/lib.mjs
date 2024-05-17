import { format as formatter } from 'prettier';
import SSHConfig from 'ssh-config';

import plugin from '../../lib/index.cjs';
import transform from '../../lib/transform.cjs';

export async function format(t, options, source) {
  const result = await formatter(source, {
    ...options,
    plugins: [plugin],
    pluginSearchDirs: false,
  });

  t.snapshot(result);

  const io = SSHConfig.parse(source);

  t.snapshot(io);

  transform(io, {});

  t.snapshot(io);
}
