import _ from 'lodash';

const formatAdapters = {
  nested: (node, path, formatAst) => formatAst(node.children, `${path}${node.name}.`),
  notchanged: () => {},
  changed: (node, path) => {
    const oldValue = _.isObject(node.oldValue) ? 'complex value' : node.oldValue;
    const newValue = _.isObject(node.newValue) ? 'complex value' : node.newValue;
    return `Property '${path}${node.name}' was updated From '${oldValue}' to '${newValue}'`;
  },
  deleted: (node, path) => `Property '${path}${node.name}' was removed`,
  inserted: (node, path) => {
    const value = _.isPlainObject(node.newValue) ? 'complex value' : `value: '${node.newValue.toString()}'`;
    return `Property '${path}${node.name}' was added with ${value}`;
  },
};

const formatAst = (diff, curpath = '') => {
  const diffRows = _.compact(diff.map(node => formatAdapters[node.type](node, curpath, formatAst)));
  return diffRows.join('\n');
};

export default formatAst;
