import _ from 'lodash';

const valueToString = (value, prefix = '', simpleStr = 'complex value') => (_.isObject(value) ? simpleStr : `${prefix}'${value}'`);

const formatAdapters = {
  nested: (node, path, formatAst) => formatAst(node.children, `${path}${node.name}.`),
  notchanged: () => {},
  changed: (node, path) => {
    const oldValue = valueToString(node.oldValue);
    const newValue = valueToString(node.newValue);
    return `Property '${path}${node.name}' was updated From ${oldValue} to ${newValue}`;
  },
  deleted: (node, path) => `Property '${path}${node.name}' was removed`,
  added: (node, path) => {
    const newValue = valueToString(node.newValue, 'value: ');
    return `Property '${path}${node.name}' was added with ${newValue}`;
  },
};

const formatAst = (diff, curpath = '') => {
  const diffRows = _.compact(diff.map(node => formatAdapters[node.type](node, curpath, formatAst)));
  return diffRows.join('\n');
};

export default formatAst;
