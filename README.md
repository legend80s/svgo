# svgo-fine

> A tool to fine tune [svgo](https://github.com/svg/svgo) to meet my requirements.

## Features

- Set `fill` to `"currentColor"` to fit in any color context.
- Output to `stdout` by default to make it easier to pipe to other tools (Save to file, copy to clipboard, etc.).
- Pretty print with indent `2` by default (WHY? Because it will be compressed anyway by your bundler, and indent is necessary for human readability and `git diff`).

## Example

```bash
pnpx svgo-fine input.svg
```

Before:

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"><path fill="#626267" d="M5.379 15.833 1.667 18.75V3.333c0-.46.373-.833.833-.833h15c.46 0 .833.373.833.833V15c0 .46-.373.833-.833.833zm-.577-1.666h11.865v-10H3.333V15.32z"/><path fill="#626267" d="M5.379 15.833 1.667 18.75V3.333c0-.46.373-.833.833-.833h15c.46 0 .833.373.833.833V15c0 .46-.373.833-.833
.833zm-.577-1.666h11.865v-10H3.333V15.32z"/>
</svg>
```

After:

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor">
  <path d="M5.379 15.833 1.667 18.75V3.333c0-.46.373-.833.833-.833h15c.46 0 .833.373.833.833V15c0 .46-.373.833-.833
.833zm-.577-1.666h11.865v-10H3.333V15.32z"/>
  <path d="M5.379 15.833 1.667 18.75V3.333c0-.46.373-.833.833-.833h15c.46 0 .833.373.833.833V15c0 .46-.373.833-.833
.833zm-.577-1.666h11.865v-10H3.333V15.32z"/>
</svg>
```

## How it works

It is just some adjustment of plugin settings of [svgo#removeAttributesBySelector&addAttributesToSVGElement](https://svgo.dev/docs/plugins/removeAttributesBySelector/).

So You can use settings to meet your requirements instead of using this package.

```ts
{
  js2svg: { indent: 2, pretty: true },
  plugins: [
    {
      name: "removeAttributesBySelector",
      params: {
        selectors: [
          {selector: 'path', attributes: ['fill']},
          {selector: 'svg', attributes: ['fill']}
        ]
      }
    },
    {
      name: "addAttributesToSVGElement",
      params: {
        attributes: [{fill: 'currentColor'}]
      }
    }
  ]
}
```
