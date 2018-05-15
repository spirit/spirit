<p align="center">
  <img src="https://spiritapp.io/spirit.gif" alt="Spirit" width="100" height="64" />
</p>
 
<h1 align="center">Spirit - Player for the Web</h1>

<p align="center">
  <a href="https://npmjs.org/package/spiritjs">
    <img src="https://img.shields.io/npm/v/spiritjs.svg" alt="version" />
  </a>
  <a href="https://travis-ci.org/terkelg/prompts">
    <img src="https://img.shields.io/travis/spirit/spirit.svg" alt="travis" />
  </a>
  <a href="https://greensock.com/gsap">
    <img src="https://img.shields.io/badge/gsap-v1.20.4-brightgreen.svg" alt="greensock" />
  </a>
  <a href="https://npmjs.org/package/spiritjs">
    <img src="https://img.shields.io/npm/dm/spiritjs.svg" alt="downloads" />
  </a>
</p>

<p align="center">
  <b>Lightweight and easy to use</b></br>
  <sub>Play your (with Spirit Studio) created animations directly on your web page<sub> 
</p>


## ❯ Getting Started:

- [Spirit Homepage](https://spiritapp.io)
- [Get you up and running](https://spiritapp.io/getstarted)
- [Documentation](https://docs.spiritapp.io)

## ❯ Install

See:
 
- [Documentation - What is Spirit](https://docs.spiritapp.io/spirit.html)
- [Documentation - Install Web Player](https://docs.spiritapp.io/web-player/install.html)
- [Documentation - Usage Simple](https://docs.spiritapp.io/web-player/simple-api.html)
- [Documentation - Usage Extended](https://docs.spiritapp.io/web-player/extended-api/)

TLDR;

browser:

```html
<script src="https://unpkg.com/spiritjs/dist/spirit.min.js"></script>
```

node:

```bash
# with npm
npm install spiritjs --save

# or yarn
yarn add spiritjs
```

## ❯ Usage

```js
spirit.loadAnimation({
  loop: true,
  yoyo: true,
  delay: 1,
  path: './animation.json'
})
```

Head over to the [API Documentation](https://docs.spiritapp.io/web-player/simple-api.html) for more information.

## Examples

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
