import _ from 'lodash';

const valueToString = (value, simpleStr = '[Complex Value]') => (_.isObject(value) ? simpleStr : `${value}`);

const formatAdapters = {
  nested: (node, func) => func(node.children),
  notchanged: node => ({ type: node.type, oldvalue: valueToString(node.oldValue) }),
  deleted: node => ({ type: node.type, oldValue: valueToString(node.oldValue) }),
  added: node => ({ type: node.type, newValue: valueToString(node.newValue) }),
  changed: node => ({
    type: node.type, oldValue: valueToString(node.oldValue), newValue: valueToString(node.newValue),
  }),
};


const formatAst = (diff) => {
  const result = diff.reduce((acc, node) => {
    acc[node.name] = formatAdapters[node.type](node, formatAst);
    return acc;
  }, {});
  return result;
};

export default diff => JSON.stringify(formatAst(diff), '', 4);
