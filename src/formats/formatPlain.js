import _ from 'lodash';

const formatAdapters = {
  nested: (node, path, func) => func(node.value, `${path}${node.name}.`),
  'not changed': () => {},
  changed: (node, path) => {
    const oldValue = _.isObject(node.value.old) ? 'complex value' : node.value.old;
    const newValue = _.isObject(node.value.new) ? 'complex value' : node.value.new;
    return `Property '${path}${node.name}' was updated From '${oldValue}' to '${newValue}'`;
  },
  deleted: (node, path) => `Property '${path}${node.name}' was removed`,
  inserted: (node, path) => {
    const value = _.isPlainObject(node.value) ? 'complex value' : `value: '${node.value.toString()}'`;
    return `Property '${path}${node.name}' was added with ${value}`;
  },
};

const formatAst = (diff, curpath = '') => {
  const diffRows = _.compact(diff.map(node => formatAdapters[node.type](node, curpath, formatAst)));
  return diffRows.join('\n');
};

export default formatAst;
