import gendiff from '../src';

test('Object output. With simple YAML.', () => {
  const expected = '{\n      host: hexlet.io\n    + timeout: 20\n    - timeout: 50\n    - proxy: 123.234.53.22\n    + verbose: true\n}';
  const result = gendiff('__tests__/__fixtures__/before.yml', '__tests__/__fixtures__/after.yml');
  expect(result).toBe(expected);
});
