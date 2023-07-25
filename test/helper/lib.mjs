import { format as formatter } from 'prettier';

import plugin from '../../lib/index.cjs';

export async function format(t, options, ...sources) {
  for (const source of sources) {
    const result = await formatter(source, {
      ...options,
      plugins: [plugin],
      pluginSearchDirs: false,
    });

    t.snapshot(result);
  }
}
