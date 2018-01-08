import fs from 'fs';
import path from 'path';


export default source => ({
  type: path.extname(source),
  value: fs.readFileSync(source, 'UTF8'),
});
