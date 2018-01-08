import formatDiff from './formats';
import getData from './parse';
import mkdiff from './mkdiff';

export default (firstSource, secondSource, format) => {
  const firstData = getData(firstSource);
  const secondData = getData(secondSource);
  const diff = mkdiff(firstData, secondData);
  return formatDiff(diff, format);
};
