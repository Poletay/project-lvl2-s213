import fs from 'fs';
import path from 'path';

const parsersList = {
  '.json': JSON.parse,
};

export default (fileName) => {
  const parse = parsersList[path.extname(fileName)];
  const fileBodyPlain = fs.readFileSync(fileName);

  return parse(fileBodyPlain);
};
