import fs from 'fs';
import gendiff from '../src';

test('Object output. With simple YAML.', () => {
  const beforeSource = '__tests__/__fixtures__/before.yml';
  const afterSource = '__tests__/__fixtures__/after.yml';
  const expected = fs.readFileSync('__tests__/__fixtures__/simple-obj.diff', 'UTF8');

  const result = gendiff(beforeSource, afterSource);
  expect(result).toBe(expected);
});
