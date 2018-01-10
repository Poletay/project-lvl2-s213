import _ from 'lodash';

const typesList = [
  {
    type: 'nested',
    check: (first, second, key) => _.isPlainObject(first[key]) && _.isPlainObject(second[key]),
    getParams: (first, second, func) => ({ children: func(first, second) }),
  },
  {
    type: 'notchanged',
    check: (firstObj, secondObj, key) =>
      JSON.stringify(firstObj[key]) === JSON.stringify(secondObj[key]),
    getParams: oldValue => ({ oldValue }),
  },
  {
    type: 'changed',
    check: (firstObj, secondObj, key) => (_.has(firstObj, key) && _.has(secondObj, key)
      && (JSON.stringify(firstObj[key]) !== JSON.stringify(secondObj[key]))),
    getParams: (oldValue, newValue) => ({ oldValue, newValue }),
  },
  {
    type: 'deleted',
    check: (firstObj, secondObj, key) => !_.has(secondObj, key),
    getParams: oldValue => ({ oldValue }),
  },
  {
    type: 'added',
    check: (firstObj, secondObj, key) => !_.has(firstObj, key),
    getParams: (oldValue, newValue) => ({ newValue }),
  },
];

const mkDiff = (firstObj, secondObj) => {
  const unionKeys = _.union(Object.keys(firstObj), Object.keys(secondObj));

  return unionKeys.map((key) => {
    const { type, getParams } = _.find(typesList, item => item.check(firstObj, secondObj, key));
    const { oldValue, newValue, children } = getParams(firstObj[key], secondObj[key], mkDiff);

    return {
      name: key, type, oldValue, newValue, children,
    };
  });
};

export default mkDiff;
