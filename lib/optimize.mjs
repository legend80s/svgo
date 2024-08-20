// fs.promises.readFile(file, 'utf8').then

import { execSync } from 'child_process';

/**
 *
 * @param {{ input: string, indent: number, debug: boolean }} param0
 */
export function optimize({ input, indent, debug }) {
  // const command = `node node_modules/svgo/bin/svgo -i ${input} --pretty --indent ${indent} --config lib/config.cjs -o -`;
  const command = `npx svgo -i ${input} --pretty --indent ${indent} --config lib/config.cjs -o -`;

  debug && console.log('command:', command);

  execSync(command, { stdio: 'inherit' });
}
