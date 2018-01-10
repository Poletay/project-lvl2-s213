import _ from 'lodash';

const oneStep = '    ';
const marks = {
  added: '+ ',
  deleted: '- ',
  notchanged: '  ',
  gag: '  ',
};

const formatNode = (nodeValue, nodeName, marker, depth) => {
  const jump = oneStep.repeat(depth);
  if (_.isPlainObject(nodeValue)) {
    const formated = _.flatten(_.keys(nodeValue).map((key) => {
      if (_.isPlainObject(nodeValue[key])) {
        return formatNode(nodeValue[key], depth + 1);
      }
      return `${jump}${oneStep}${marks.gag}${key}: ${nodeValue[key]}`;
    }));
    return [`${jump}${marker}${nodeName}: {`, ...formated, `${jump}${marks.gag}}`];
  }
  return [`${jump}${marker}${nodeName}: ${nodeValue}`];
};

const formatAdapters = {
  nested: (node, depth, func) => func(node.children, node.name, depth),
  deleted: (node, depth) => formatNode(node.oldValue, node.name, marks.deleted, depth),
  added: (node, depth) => formatNode(node.newValue, node.name, marks.added, depth),
  notchanged: (node, depth) => formatNode(node.oldValue, node.name, marks.notchanged, depth),
  changed: (node, depth) => {
    const before = formatNode(node.oldValue, node.name, marks.deleted, depth);
    const after = formatNode(node.newValue, node.name, marks.added, depth);
    return _.flatten([after, before]);
  },
};

const formatAst = (diff, nodeName = undefined, depth = 0) => {
  const jump = oneStep.repeat(depth);
  const name = nodeName ? `${nodeName}: ` : '';
  const start = `${jump}${marks.gag}${name}{`;
  const end = `${jump}${marks.gag}}`;
  const rows = _.flatten(diff.map(node => formatAdapters[node.type](node, depth + 1, formatAst)));

  return [start, ...rows, end].join('\n');
};

export default formatAst;
