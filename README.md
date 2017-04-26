# Spirit

Spirit is the animation tool for the web. 

![](https://spiritapp.io/spirit.jpg)

[![npm version](https://badge.fury.io/js/spiritjs.svg)](https://badge.fury.io/js/spiritjs) 
[![Build Status](https://travis-ci.org/spirit/spirit.svg?branch=master)](https://travis-ci.org/spirit/spirit)
[![Greensock Compatibility](https://img.shields.io/badge/gsap-v1.19.1-brightgreen.svg)](https://greensock.com/gsap)

## Spirit Runtime - API

#### Setup

Spirit uses [GSAP](https://greensock.com/gsap) tween and timeline for animation playback.

```javascript
/**
* @param   {Object}
* @returns {Promise}
*/
spirit.setup({ tween, timeline })
```

By default it fetches GSAP from CDN:

```javascript
spirit.setup().then(() => {
  // gsap is present, fetched from cdn
  // run spirit code here..
})
```

If you already have GSAP installed, you can pass it to `spirit.setup()`:

```javascript
spirit.setup({

  tween:    TweenMax,
  timeline: TimelineMax

}).then(() => {
  // run spirit code here..
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

// play folding-cards group
groups.get('folding-cards').construct().play()

// play dialog
groups.get('dialog').construct().play()

```

As you can have multiple animation groups, you'll need to construct the GSAP timelime before you use it.

## Install

#### Standalone

Simply download and include with a script tag. Spirit will be registered as a global variable.

[https://unpkg.com/spiritjs/dist/spirit.min.js](https://unpkg.com/spiritjs/dist/spirit.min.js)

#### NPM

```
npm install spiritjs
```

or 

```
yarn add spiritjs
```

And use it.

Example:

```javascript
import * as spirit from 'spiritjs'

async start() {
  // load gsap from cdn
  await spirit.setup()
  
  // create animations, construct all group timelines and play all timelines at once
  spirit
    .create(data)
    .construct()
    .forEach( timeline => timeline.play() )
}

start()

```
