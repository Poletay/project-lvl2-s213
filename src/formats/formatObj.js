import _ from 'lodash';

const oneStep = '    ';
const marks = {
  inserted: '+ ',
  deleted: '- ',
  notchanged: '  ',
  gag: '  ',
};

const formatNodeValue = (nodeValue, nodeName, marker, depth) => {
  const jump = oneStep.repeat(depth);
  if (_.isPlainObject(nodeValue)) {
    const formated = _.flatten(_.keys(nodeValue).map((key) => {
      if (_.isPlainObject(nodeValue[key])) {
        return formatNodeValue(nodeValue[key], depth + 1);
      }
      return `${jump}${oneStep}${marks.gag}${key}: ${nodeValue[key]}`;
    }));
    return [`${jump}${marker}${nodeName}: {`, ...formated, `${jump}${marks.gag}}`];
  }
  return [`${jump}${marker}${nodeName}: ${nodeValue}`];
};

const formatNode = (node, depth, formatAst) => _.flatten([
  node.children ? formatAst(node.children, node.name, depth) : undefined,
  node.value ? formatNodeValue(node.value, node.name, marks.notchanged, depth) : undefined,
  node.newValue ? formatNodeValue(node.newValue, node.name, marks.inserted, depth) : undefined,
  node.oldValue ? formatNodeValue(node.oldValue, node.name, marks.deleted, depth) : undefined,
]);

const formatAst = (diff, nodeName = undefined, depth = 0) => {
  const jump = oneStep.repeat(depth);
  const name = nodeName ? `${nodeName}: ` : '';
  const start = `${jump}${marks.gag}${name}{`;
  const end = `${jump}${marks.gag}}`;
  const rows = _.compact(_.flatten(diff.map(node => formatNode(node, depth + 1, formatAst))));

  return [start, ...rows, end].join('\n');
};

export default formatAst;
