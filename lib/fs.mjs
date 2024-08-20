import fs from 'node:fs/promises';

/**
 *
 * @param {string} input
 * @returns
 */
export async function readJSONFile(input) {
  try {
    return (
      await import(input, {
        with: { type: 'json' },
      })
    ).default;
  } catch (error) {
    // console.error('fallback to fs readFile', error);

    return JSON.parse(await fs.readFile(input, 'utf8'));
  }
}
