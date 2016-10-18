# Spirit

[![npm version](https://badge.fury.io/js/spiritjs.svg)](https://badge.fury.io/js/spiritjs) 
 [![Build Status](https://travis-ci.org/spirit/spirit.svg?branch=es6-rewrite)](https://travis-ci.org/spirit/spirit)

![](https://spiritapp.io/spirit.jpg)

[The animation tool for the web](https://spiritapp.io)

Manage your animations in realtime!

## API

#### Setup
Spirit uses [GSAP](https://greensock.com/gsap) tween and timeline for animation playback.
By default it fetch GSAP from CDN.

```js
/**
* @param {object} gsap engines { tween, timeline }
*/
spirit.setup({
  tween: TweenMax,
  timeline: TimelineMax
})
```

#### Config
Change auto inject url for cdn.
 
 ```js
 spirit.config.gsap.autoInjectUrl = 'https://cdn.somewhere.com/TweenMax.min.js'
 ```

#### Create groups

Create groups based on animation data

```js
/**
* @param {object} data animation data (created with Spirit app)
* @param {Element} element bind groups to element (default document.body)
* @returns {spirit.Groups}
*/
spirit.create(data, element)
```

#### Load groups

Load groups based on animation data.
 
 ```js
 /**
 * @param {string} url load animation data (created with Spirit app)
 * @param {Element} element bind groups to element (default document.body)
 * @returns {Promise}
 */
 spirit.load(url, element)
 ```
    
## Example

```html
<div class="container">
  ...
</div>
```

```js
// load animation and bind to element
const groups = await spirit.load('./animation.json', document.querySelector('.container'))

// play jump
groups.get('jump').construct().then(tl => tl.play())

// play wave
groups.get('wave').construct().then(tl => tl.play())

```

## Install

#### Standalone

Simply download and include with a script tag. Spirit will be registered as a global variable.
CDN: [https://cdn.rawgit.com/spirit/spirit/dist/spirit.min.js](https://cdn.rawgit.com/spirit/spirit/es6-rewrite/dist/spirit.min.js)

#### NPM / Yarn

```
npm install spiritjs
```

```js
import { create } from 'spiritjs'

create(data).construct()
```

#### Bower

```
bower install spiritjs
```

**AMD Module Loaders**

The standalone downloads or versions installed via Bower are wrapped with UMD so they can be used directly as an AMD module.
