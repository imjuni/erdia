import indent from '@tool/indent';
import 'jest';

test('logger', () => {
  const id01 = indent();
  const id04 = indent(4);

  expect(id01).toEqual(' ');
  expect(id04).toEqual('    ');
});
