import formatObj from './formatObj';
import formatPlain from './formatPlain';

export default (diff, format = 'object') => {
  const renders = {
    object: formatObj,
    plain: formatPlain,
  };
  const renderFormat = renders[format];
  return renderFormat(diff);
};
