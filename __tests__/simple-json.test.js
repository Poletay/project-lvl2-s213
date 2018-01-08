import fs from 'fs';
import gendiff from '../src';

test('Object output. With simple JSON.', () => {
  const beforeSource = '__tests__/__fixtures__/before.json';
  const afterSource = '__tests__/__fixtures__/after.json';
  const expected = fs.readFileSync('__tests__/__fixtures__/simple-obj.diff', 'UTF8');

  const result = gendiff(beforeSource, afterSource);
  expect(result).toBe(expected);
});
