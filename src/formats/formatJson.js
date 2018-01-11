const formatAdapters = {
  nested: (node, func) => func(node.children),
  notchanged: node => ({ type: node.type, oldvalue: node.oldValue }),
  deleted: node => ({ type: node.type, oldValue: node.oldValue }),
  added: node => ({ type: node.type, newValue: node.newValue }),
  changed: node => ({
    type: node.type, oldValue: node.oldValue, newValue: node.newValue,
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
