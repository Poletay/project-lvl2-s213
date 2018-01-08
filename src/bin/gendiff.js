#!/usr/bin/env node
import program from 'commander';
import gendiff from '../';

program.arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'Output the version number')
  .option('-f, --format [type]', 'Output format')
  .action((firstConfig, secondConfig, options) => {
    const firstConfigValue = firstConfig;
    const secondConfigValue = secondConfig;
    if (typeof firstConfigValue === 'undefined' || typeof secondConfigValue === 'undefined') {
      process.exit(1);
    } else {
      const result = gendiff(firstConfigValue, secondConfigValue, options.format || 'object');
      console.log(result);
    }
  });

program.parse(process.argv);
