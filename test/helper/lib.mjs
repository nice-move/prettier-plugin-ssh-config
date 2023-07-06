import { format as formatter } from 'prettier';

export async function format(t, options, ...sources) {
  for (const source of sources) {
    const result = await formatter(source, {
      ...options,
      plugins: ['.'],
      pluginSearchDirs: false,
    });

    t.snapshot(result);
  }
}
