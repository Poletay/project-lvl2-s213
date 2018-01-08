import _ from 'lodash';

const typesList = [
  {
    type: 'not changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] === second[key])),
    getValue: first => _.identity(first),
  },
  {
    type: 'changed',
    check: (first, second, key) => (_.has(first, key) && _.has(second, key)
      && (first[key] !== second[key])),
    getValue: (first, second) => ({ old: first, new: second }),
  },
  {
    type: 'deleted',
    check: (first, second, key) => (_.has(first, key) && !_.has(second, key)),
    getValue: first => _.identity(first),
  },
  {
    type: 'inserted',
    check: (first, second, key) => (!_.has(first, key) && _.has(second, key)),
    getValue: (first, second) => _.identity(second),
  },
];

const mkDiff = (firstData, secondData) => {
  const unionKeys = _.union(Object.keys(firstData), Object.keys(secondData));

  return unionKeys.map((key) => {
    const { type, getValue } = _.find(typesList, item => item.check(firstData, secondData, key));
    const value = getValue(firstData[key], secondData[key], mkDiff);
    return { name: key, type, value };
  });
};

export default mkDiff;
