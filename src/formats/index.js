import formatObj from './formatObj';
import formatPlain from './formatPlain';
import formatJson from './formatJson';

const renders = {
  object: formatObj,
  plain: formatPlain,
  json: formatJson,
};

export default (diff, format = 'object') => renders[format](diff);
