module.exports = {
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
