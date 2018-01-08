import fs from 'fs';
import gendiff from '../src';

test('Object output. With complex JSON.', () => {
  const beforeSource = '__tests__/__fixtures__/before-complex.json';
  const afterSource = '__tests__/__fixtures__/after-complex.json';
  const expected = fs.readFileSync('__tests__/__fixtures__/complex-obj.diff', 'UTF8');

  const result = gendiff(beforeSource, afterSource);
  expect(result).toBe(expected);
});
