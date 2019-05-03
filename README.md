<p align="center">
  <img src="https://spiritapp.io/banner.jpg" alt="Spirit" width="100%" />
</p>

<h1 align="center">Spirit ⚡️ Web Player</h1>

<p align="center">
  <a href="https://travis-ci.org/spirit/spirit">
    <img src="https://img.shields.io/travis/spirit/spirit.svg" alt="travis" />
  </a>
  <a href="https://npmjs.org/package/spiritjs">
    <img src="https://img.shields.io/npm/v/spiritjs.svg" alt="version" />
  </a>
  <a href="https://greensock.com/gsap">
    <img src="https://img.shields.io/badge/gsap-v2.1.2-brightgreen.svg" alt="greensock" />
  </a>
  <a href="https://npmjs.org/package/spiritjs">
    <img src="https://img.shields.io/npm/dm/spiritjs.svg" alt="downloads" />
  </a>
  <a href="https://github.com/spirit/spirit/releases/latest">
    <img src="https://img.shields.io/github/release-date/spirit/spirit.svg" alt="release" />
  </a>
</p>

<p align="center">
  <b>Lightweight and easy to use</b>
  <br />
  <sub>Play your animations on the web<sub>
</p>

### Getting Started:

- [Spirit Homepage](https://spiritapp.io)
- [Get Started](https://spiritapp.io/getstarted)
- [Documentation](https://docs.spiritapp.io)

### Browser:

```html
<svg>
  <g id="container">
    <path d="..." data-spirit-id="body" />
    <path d="..." data-spirit-id="mouth" />
    <path d="..." data-spirit-id="legs" />
  </g>
</svg>

<script src="https://unpkg.com/spiritjs/dist/spirit.min.js"></script>
<script>
  spirit.loadAnimation({ 
    path: './animation.json',
    container: dcument.getElementById('container') 
  }).then(
    timeline => timeline.play()
  );
</script>
```

### Node:

install:

```bash
npm install spiritjs --save
```

usage:

```js
import spirit from 'spiritjs';

spirit.loadAnimation({ path: './animation.json' }).then(
  timeline => timeline.play()
);
```

For more info check out the [API Documentation](https://docs.spiritapp.io/web-player/simple-api.html).

### Links

- [Documentation - What is Spirit](https://docs.spiritapp.io/spirit.html)
- [Documentation - Install Web Player](https://docs.spiritapp.io/web-player/install.html)
- [Documentation - Simple Usage](https://docs.spiritapp.io/web-player/simple-api.html)
- [Documentation - Extended Usage](https://docs.spiritapp.io/web-player/extended-api/)

### Examples

<p>
  <img src="https://user-images.githubusercontent.com/232559/33662370-d6898552-da8b-11e7-9909-73334a313217.gif" width="210" />
  <img src="https://user-images.githubusercontent.com/232559/33662484-32b64996-da8c-11e7-9122-52712925ab1e.gif" width="210" />
  <img src="https://user-images.githubusercontent.com/232559/33662504-440d4d66-da8c-11e7-8d21-fcb1ed87da50.gif" width="210" />
  <img src="https://user-images.githubusercontent.com/232559/33662538-57d89076-da8c-11e7-9dc8-55f70a31feeb.gif" width="210" />
  <img src="https://user-images.githubusercontent.com/232559/33662552-64e1972c-da8c-11e7-827f-5ae63e822aa0.gif" width="210" />
  <img src="https://user-images.githubusercontent.com/232559/33662567-743a4a48-da8c-11e7-8e97-8d4019929883.gif" width="210" />
  <img src="https://user-images.githubusercontent.com/232559/33662579-886a97ac-da8c-11e7-9e99-0fc55aa24ffd.gif" width="210" />
  <img src="https://user-images.githubusercontent.com/232559/33662592-9a93309c-da8c-11e7-9c15-1dfc11871831.gif" width="210" />
</p>
