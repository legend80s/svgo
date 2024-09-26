import { readFile } from 'node:fs/promises';
import { codeToANSI } from '@shikijs/cli';
import { optimize as compress } from 'svgo';

const config = {
  js2svg: { indent: 2, pretty: true },
  plugins: [
    {
      name: 'removeAttributesBySelector',
      params: {
        selectors: [
          { selector: 'path', attributes: ['fill'] },
          { selector: 'svg', attributes: ['fill'] },
        ],
      },
    },
    {
      name: 'addAttributesToSVGElement',
      params: {
        attributes: [{ fill: 'currentColor' }],
      },
    },
  ],
};

/**
 *
 * @param {{ input: string, indent: number, debug: boolean, color: boolean }} param0
 */
export async function optimize({ input, indent, color = true }) {
  const svgString = await readFile(input, 'utf8');

  if (indent != undefined) {
    config.js2svg.indent = Number(indent);
  }

  // extract width and height from `viewBox="0 0 20 20"`
  const viewBox = svgString.match(/viewBox="0 0 (\d+) (\d+)"/);
  if (viewBox) {
    const [, width, height] = viewBox;
    config.plugins.push({
      name: 'addAttributesToSVGElement',
      params: {
        // @ts-expect-error
        attributes: [{ width }, { height }],
      },
    });
  }

  // @ts-expect-error
  const { data } = compress(svgString, config);

  // replace class to className
  const optimizedSvgString = hyphensToCamelCaseInAttributes(
    replaceAttrName(data.trim(), 'class', 'className')
  );

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

/**
 *
 * @param {string} str
 * @param {string} from
 * @param {string} to
 * @returns {string}
 */
function replaceAttrName(str, from, to) {
  return str.replace(` ${from}="`, ` ${to}="`);
}

// transform all hyphens to camelCase only in attributes. for example transform `fill-rule="hi-foo"` to `fillRule="hi-foo"`
/**
 *
 * @param {string} str
 * @returns {string}
 */
function hyphensToCamelCaseInAttributes(str) {
  return str.replace(/ ([a-z-]+)="([^"]*)"/g, (_, attr, value) => {
    return ` ${hyphensToCamelCase(attr)}="${value}"`;
  });
}

/**
 *
 * @param {string} str
 * @returns {string}
 */
function hyphensToCamelCase(str) {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}
