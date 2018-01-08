import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parsersList = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

export default (fileName) => {
  const parse = parsersList[path.extname(fileName)];
  const fileBodyPlain = fs.readFileSync(fileName);

  return parse(fileBodyPlain);
};
