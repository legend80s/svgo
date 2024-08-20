#!/usr/bin/env node

import { parseArgs } from 'node:util';
import { readJSONFile } from './lib/fs.mjs';
import { optimize } from './lib/optimize.mjs';

const options = {
  help: {
    type: 'boolean',
    short: 'h',
    description: 'Show this help message',
    required: '×',
    default: false,
  },
  indent: {
    type: 'string',
    description: 'Indentation level in spaces',
    default: '2',
    required: '×',
  },
  input: {
    type: 'string',
    description: 'Input file',
    required: '✔ ',
    short: 'i',
  },
  color: {
    type: 'string',
    description: 'Should output with color',
    required: '×',
    default: 'true',
  },

  debug: {
    type: 'boolean',
    default: false,
    description: 'Print debug info',
    required: '×',
    short: 'd',
  },
};

/**
 * @param {{ parsed: { help:boolean, debug: boolean } & Parameters<typeof optimize>[0]; options: any }} opts
 */
async function main({ parsed, options }) {
  if (parsed.help) {
    await printHelp(options);

    return;
  }

  const { help, ...opts } = parsed;

  opts.debug && console.time('optimize');
  // console.log('opts:', opts);

  await optimize(opts);

  opts.debug && console.timeEnd('optimize');
}

const args = process.argv.slice(2);

// @ts-expect-error
main(parse(args));

/**
 *
 * @param {string[]} args
 * @example
 * const args = [ '--input', './assets/openapi-3.0.1.json', '--api', 'evaluate' ]
 * parseArgs(args);
 *
 * { input: './assets/openapi-3.0.1.json', api: 'evaluate' }
 */
function parse(args) {
  // @ts-expect-error
  const { values } = parseArgs({ args, options });

  if (values.debug) {
    console.log('args:', args);
    console.log('values:', values);
  }

  return { parsed: values, options };
}

// @ts-expect-error
async function printHelp(options) {
  const pkg = await readJSONFile('./package.json');
  const { name, version } = pkg;

  console.log();
  console.log(name + '@' + version);
  console.log();
  console.table(options);
  console.log();

  process.exitCode = 0;
}
