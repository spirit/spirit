# Spirit

Spirit is the animation tool for the web. 

![](https://spiritapp.io/spirit.jpg)

[![npm version](https://badge.fury.io/js/spiritjs.svg)](https://badge.fury.io/js/spiritjs) 
[![Build Status](https://travis-ci.org/spirit/spirit.svg?branch=master)](https://travis-ci.org/spirit/spirit)
[![Greensock Compatibility](https://img.shields.io/badge/gsap-v1.18.0-brightgreen.svg)](https://greensock.com/gsap)

## Spirit Runtime - API

#### Setup

Spirit uses [GSAP](https://greensock.com/gsap) tween and timeline for animation playback.
By default it fetches GSAP from CDN.

If you already have GSAP installed, you can pass it to Spirit:

```javascript
/**
* @param {Object} GSAP { tween, timeline }
*/
spirit.setup({
  tween:    TweenMax,
  timeline: TimelineMax
})
```

#### Config

Change auto inject url for cdn. Default: `https://cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js`
 
 ```javascript
 spirit.config.gsap.autoInjectUrl = 'https://cdn.somewhere.com/TweenMax.min.js'
 ```

#### Create groups

Create groups based on animation data

```javascript
/**
* @param   {Object}    data     animation data (created with Spirit app)
* @param   {Element}   element  bind groups to element (default document.body)
* @returns {spirit.Groups}
*/
spirit.create(data, element)
```

#### Load groups

Load groups based on animation data. Use `XMLHttpRequest` to fetch the json data and parse groups.
 
 ```javascript
 /**
 * @param   {String}  url     load animation data (created with Spirit app)
 * @param   {Element} element bind groups to element (default document.body)
 * @returns {Promise}
 */
 spirit.load(url, element)
 ```
    
## Example

```html
<div class="container">
  <!-- html used for animation -->
</div>
```

```javascript
// load animation and bind to container element
const groups = await spirit.load('./animation.json', document.querySelector('.container'))

// play jump
groups.get('jump').construct().then(tl => tl.play())

// play wave
groups.get('wave').construct().then(tl => tl.play())

```

As you can have multiple animation groups, you'll need to construct the GSAP timelime before you use it.

## Install

#### Standalone

Simply download and include with a script tag. Spirit will be registered as a global variable.

- CDN (rawgit): [https://cdn.rawgit.com/spirit/spirit/master/dist/spirit.min.js](https://cdn.rawgit.com/spirit/spirit/master/dist/spirit.min.js)
- CDN (npmcdn): [https://unpkg.com/spiritjs/dist/spirit.min.js](https://unpkg.com/spiritjs/dist/spirit.min.js)

#### NPM

```
npm install spiritjs
```

or 

```
yarn add spiritjs
```

And use it:

```javascript
import spirit from 'spiritjs'

const groups = await spirit.create(data).construct()

// play all animations
groups.forEach( ({ tl }) => tl.play() )

```
