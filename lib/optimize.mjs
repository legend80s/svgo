// fs.promises.readFile(file, 'utf8').then
import { execSync } from 'child_process';
import { codeToANSI } from '@shikijs/cli';

/**
 *
 * @param {{ input: string, indent: number, debug: boolean, color: boolean }} param0
 */
export async function optimize({ input, indent, debug, color = true }) {
  // const command = `node node_modules/svgo/bin/svgo -i ${input} --pretty --indent ${indent} --config lib/config.cjs -o -`;
  const command = `npx svgo -i ${input} --pretty --indent ${indent} --config lib/config.cjs -o - --eol lf`;

  debug && console.log('command:', command);

  const optimizedSvgString = execSync(command).toString().trim();

  process.stdout.write(
    color ? await highlight(optimizedSvgString) : optimizedSvgString
  );
}

/**
 *
 * @param {string} content
 * @returns {Promise<string>}
 */
async function highlight(content) {
  return await codeToANSI(content, 'xml', 'dark-plus');
}
