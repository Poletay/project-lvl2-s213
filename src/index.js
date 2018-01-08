import formatDiff from './formats';
import parseData from './parsers';
import getData from './sources';
import makeDiff from './mkdiff';

export default (firstSource, secondSource, format) => {
  const firstData = getData(firstSource);
  const secondData = getData(secondSource);
  const firstObj = parseData(firstData);
  const secondObj = parseData(secondData);
  const diff = makeDiff(firstObj, secondObj);
  return formatDiff(diff, format);
};
