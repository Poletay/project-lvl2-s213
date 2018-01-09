import fs from 'fs';
import path from 'path';
import formatDiff from './formats';
import parseData from './parsers';
import makeDiff from './mkdiff';

export default (firstSource, secondSource, format) => {
  const firstData = fs.readFileSync(firstSource, 'UTF8');
  const secondData = fs.readFileSync(secondSource, 'UTF8');
  const firstDataType = path.extname(firstSource);
  const secondDataType = path.extname(secondSource);
  const firstObj = parseData(firstData, firstDataType);
  const secondObj = parseData(secondData, secondDataType);
  const diff = makeDiff(firstObj, secondObj);
  return formatDiff(diff, format);
};
