import { optimize } from 'svgo';

const svgString = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"><path fill="#626267" d="M5.379 15.833 1.667 18.75V3.333c0-.46.373-.833.833-.833h15c.46 0 .833.373.833.833V15c0 .46-.373.833-.833.833zm-.577-1.666h11.865v-10H3.333V15.32z"/><path fill="#626267" d="M5.379 15.833 1.667 18.75V3.333c0-.46.373-.833.833-.833h15c.46 0 .833.373.833.833V15c0 .46-.373.833-.833
.833zm-.577-1.666h11.865v-10H3.333V15.32z"/>
</svg>
`;

const result = optimize(svgString, {
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
});

const optimizedSvgString = result.data;

console.log(optimizedSvgString);
