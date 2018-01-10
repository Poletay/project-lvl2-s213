import formatObj from './formatObj';
import formatPlain from './formatPlain';

const renders = {
  object: formatObj,
  plain: formatPlain,
};

export default (diff, format = 'object') => renders[format](diff);
