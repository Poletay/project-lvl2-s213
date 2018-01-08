import _ from 'lodash';

const oneStep = '    ';
const marks = {
  inserted: '+ ',
  deleted: '- ',
  notchanged: '  ',
  gag: '  ',
};

const formatNode = (nodeValue, nodeName, marker, depth = 1) => {
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
  nested: (node, depth, func) => func(node.value, node.name, depth),
  deleted: (node, depth) => formatNode(node.value, node.name, marks.deleted, depth),
  inserted: (node, depth) => formatNode(node.value, node.name, marks.inserted, depth),
  'not changed': (node, depth) => formatNode(node.value, node.name, marks.notchanged, depth),
  changed: (node, depth) => {
    const before = formatNode(node.value.old, node.name, marks.deleted, depth);
    const after = formatNode(node.value.new, node.name, marks.inserted, depth);
    return _.flatten([after, before]);
  },
};

const formatAst = (astDiff, nodeName = '', depth = 0) => {
  const jump = oneStep.repeat(depth);
  const name = nodeName ? `${nodeName}: ` : '';
  const start = `${jump}${marks.gag}${name}{`;
  const end = `${jump}${marks.gag}}`;

  const arrayOfBlock = _.flatten(astDiff.map((node) => {
    const stringify = formatAdapters[node.type];
    return stringify(node, depth + 1, formatAst);
  }));

  return [start, ...arrayOfBlock, end].join('\n');
};

export default formatAst;
