import _ from 'lodash';

const oneStep = '    ';
const marks = {
  inserted: '+ ',
  deleted: '- ',
  notchanged: '  ',
};

const formatNode = (nodeValue, nodeName, marker) => `${oneStep}${marker}${nodeName}: ${nodeValue}`;

const formatAdapters = {
  deleted: node => formatNode(node.value, node.name, marks.deleted),
  inserted: node => formatNode(node.value, node.name, marks.inserted),
  'not changed': node => formatNode(node.value, node.name, marks.notchanged),
  changed: (node) => {
    const before = formatNode(node.value.old, node.name, marks.deleted);
    const after = formatNode(node.value.new, node.name, marks.inserted);
    return _.flatten([after, before]);
  },
};

const formatAst = (diff) => {
  const start = '{';
  const end = '}';
  const diffRows = _.flatten(diff.map(node => formatAdapters[node.type](node)));
  return [start, ...diffRows, end].join('\n');
};

export default formatAst;
