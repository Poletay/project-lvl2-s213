#!/usr/bin/env node
import program from 'commander';

program.arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .option('-V, --version', 'Output the version number')
  .option('-f, --format [type]', 'Output format');

program.parse(process.argv);
