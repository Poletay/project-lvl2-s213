import formatObj from './formatObj';

export default (diff, format = 'object') => {
  const renders = {
    object: formatObj,
  };
  const renderFormat = renders[format];
  return renderFormat(diff);
};
