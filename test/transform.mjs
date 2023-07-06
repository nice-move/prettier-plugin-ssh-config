import test from 'ava';
import SSHConfig from 'ssh-config';

import transform from '../lib/transform.cjs';

const source = `
host r
#fff
host ee
`;

const io = SSHConfig.parse(source);

test('transform', (t) => {
  t.snapshot(io);

  transform(io, {});

  t.snapshot(io);
});
