<div align="center">
  <img src="https://raw.githubusercontent.com/svg/svgo/main/logo/logo-web.svg" width="348.61" height="100" alt="SVGO-Fine"/>
</div>

<h1 align="center">svgo-fine 🔩</h1>

<p>
  <a href="https://www.npmjs.com/package/svgo-fine" target="_blank">
    <img src="https://img.shields.io/npm/v/svgo-fine.svg" alt="npm version" />
  </a>

  <a href="https://www.npmjs.com/package/svgo-fine">
    <img src="https://img.shields.io/npm/dm/svgo-fine.svg" alt="npm downloads" />
  </a>
</p>

> A tool to fine tune [svgo](https://github.com/svg/svgo) to meet my SVG optimization requirements.

## Features ✨

- 🎨 Set `fill` to `"currentColor"` to fit in any color context.
- ⚛️ React: Correct common invalid attribute `class` to `className`.
- ⚛️ React: Correct hyphen case to camelCase. For example `fill-rule` to `fillRule`.
- 🗳️ Add `width` and `height` according to the viewBox.
- 🚰 Output to `stdout` by default to make it easier to pipe to other tools (Save to file, copy to clipboard, etc.).
- ➡️ Pretty print with indent `2` by default (WHY? Because it will be compressed anyway by your bundler, and indent is necessary for human readability and `git diff`).
- 🌈 Colorful output by [shikijs](https://shiki.style/packages/cli).

## Examples 🎯

optimize a SVG file and copy to clipboard:

```bash
pnpx svgo-fine -i input.svg | clip # Windows
```

```bash
pnpx svgo-fine -i input.svg | pbcopy # Macos
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

## How it works ⚙️

<details>
<summary>How it works</summary>

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

</details>
