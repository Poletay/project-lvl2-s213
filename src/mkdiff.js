import _ from 'lodash';

const typesList = [
  {
    type: 'nested',
    check: (first, second, key) => _.isPlainObject(first[key]) && _.isPlainObject(second[key]),
    getValue: (first, second, func) => func(first, second),
  },
  {
    type: 'not changed',
    check: (firstObj, secondObj, key) => firstObj[key] === secondObj[key],
    getValue: firstValue => firstValue,
  },
  {
    type: 'changed',
    check: (firstObj, secondObj, key) => (_.has(firstObj, key) && _.has(secondObj, key)
      && (firstObj[key] !== secondObj[key])),
    getValue: (firstValue, secondValue) => ({ old: firstValue, new: secondValue }),
  },
  {
    type: 'deleted',
    check: (firstObj, secondObj, key) => !_.has(secondObj, key),
    getValue: firstValue => firstValue,
  },
  {
    type: 'inserted',
    check: (firstObj, secondObj, key) => !_.has(firstObj, key),
    getValue: (firstValue, secondValue) => secondValue,
  },
];

const mkDiff = (firstObj, secondObj) => {
  const unionKeys = _.union(Object.keys(firstObj), Object.keys(secondObj));

  return unionKeys.map((key) => {
    const { type, getValue } = _.find(typesList, item => item.check(firstObj, secondObj, key));
    const value = getValue(firstObj[key], secondObj[key], mkDiff);
    return { name: key, type, value };
  });
};

export default mkDiff;
