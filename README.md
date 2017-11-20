# Spirit (GSAP) Runtime

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

### Browser

Development:

> With warnings and tips

```html
<script src="https://unpkg.com/spiritjs/dist/spirit.js"></script>
```

Production:

> Warnings and tips stripped, 13KB min+gzip

```html
<script src="https://unpkg.com/spiritjs/dist/spirit.min.js"></script>
```

> Don’t use the minified version during development. You will miss out on all the nice warnings for common mistakes!


> **CDN**
>
> Recommended: [`https://unpkg.com/spiritjs/dist/spirit.min.js`](https://unpkg.com/spiritjs/dist/spirit.min.js), which reflect the latest version as soon as it is published to npm. You can also browse the source of the npm package at [`https://unpkg.com/spiritjs/`](https://unpkg.com/spiritjs/).
>
> Also available on [cdn.jdelivr.net](https://cdn.jsdelivr.net/npm/spiritjs/dist/spirit.min.js).

### Node

```bash
# npm
npm i spiritjs -S

# yarn
yarn add spiritjs
```

> **NOTE:**
> Make sure to install `spiritjs` from npm, the `spirit` package is not related to this project at all.

## Usage

```javascript
import spirit from 'spiritjs'

// load GSAP from CDN
spirit.setup().then(() => {
  
  // now GSAP is present, create/load animation
  
  spirit.load('groups.json').then(groups => {
    // play first animation group
    groups.at(0).construct().play()  
  })
  
})
```

Checkout the [API documentation](https://docs.spiritapp.io) for more information.

## Example

```html
<div class="container">
  <!-- html used for animation -->
</div>
```

```javascript
// load animation and bind to container element
const groups = await spirit.load('./animation.json', document.querySelector('.container'))

// play folding-cards group
groups.get('folding-cards').construct().play()

// play dialog
groups.get('dialog').construct().play()

```

As you can have multiple animation groups, you'll need to construct the GSAP timelime before you use it.
