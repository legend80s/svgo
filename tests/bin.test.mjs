{
  /* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6667 1.66669C17.1269 1.66669 17.5 2.03979 17.5 2.50002V5.63085L15.8333 7.29752V3.33335H4.16667V16.6667H15.8333V14.3684L17.5 12.7017V17.5C17.5 17.9603 17.1269 18.3334 16.6667 18.3334H3.33333C2.8731 18.3334 2.5 17.9603 2.5 17.5V2.50002C2.5 2.03979 2.8731 1.66669 3.33333 1.66669H16.6667ZM18.1485 7.33969L19.327 8.51819L12.8452 15L11.6649 14.9983L11.6667 13.8215L18.1485 7.33969ZM10.8333 10V11.6667H6.66667V10H10.8333ZM13.3333 6.66669V8.33335H6.66667V6.66669H13.3333Z" fill="#626267"/>
</svg> */
}

import { it, beforeEach } from 'node:test';
import { deepStrictEqual } from 'node:assert';
import { execSync } from 'node:child_process';

beforeEach(() => {
  process.env.FORCE_COLOR = '0';
});

it('should remove params in passed args because all the params has been consumed by the url (in path)', () => {
  const input = `node bin.mjs -i ./assets/sample.svg`;
  const actual = execSync(input).toString('utf8');
  const expected = `<svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
  <path d="M16.6667 1.66669C17.1269 1.66669 17.5 2.03979 17.5 2.50002V5.63085L15.8333 7.29752V3.33335H4.16667V16.6667H15.8333V14.3684L17.5 12.7017V17.5C17.5 17.9603 17.1269 18.3334 16.6667 18.3334H3.33333C2.8731 18.3334 2.5 17.9603 2.5 17.5V2.50002C2.5 2.03979 2.8731 1.66669 3.33333 1.66669H16.6667ZM18.1485 7.33969L19.327 8.51819L12.8452 15L11.6649 14.9983L11.6667 13.8215L18.1485 7.33969ZM10.8333 10V11.6667H6.66667V10H10.8333ZM13.3333 6.66669V8.33335H6.66667V6.66669H13.3333Z"/>
</svg>
`;

  deepStrictEqual(actual, expected);
});