# Spirit - Runtime player

Spirit is the animation tool for the web. 

![](https://spiritapp.io/spirit.gif)

[![npm version](https://badge.fury.io/js/spiritjs.svg)](https://badge.fury.io/js/spiritjs) 
[![Build Status](https://travis-ci.org/spirit/spirit.svg?branch=master)](https://travis-ci.org/spirit/spirit)
[![Greensock Compatibility](https://img.shields.io/badge/gsap-v1.20.3-brightgreen.svg)](https://greensock.com/gsap)

## Getting Started:

- [Spirit Homepage](https://spiritapp.io)
- [Get you up and running](https://spiritapp.io/getting-started)
- [Documentation](https://docs.spiritapp.io)

## Install

See:
 
- [Documentation - Install](https://docs.spiritapp.io/installation.html)
- [Documentation - Embed Runtime](https://docs.spiritapp.io/gsap_runtime_include.html)

TLDR;

browser:

```html
<script src="https://unpkg.com/spiritjs/dist/spirit.min.js"></script>
```

node:

```bash
npm install spiritjs --save
```

## Usage

```javascript
spirit.loadAnimation({
  loop: true,
  yoyo: true,
  delay: 1,
  path: './animation.json'
})
```

Head over to the [API documentation](https://docs.spiritapp.io/gsap_runtime_simple.html) for more information.

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
