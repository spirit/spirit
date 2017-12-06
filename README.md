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
