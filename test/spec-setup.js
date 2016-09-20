import 'babel-polyfill'

import jsdom from 'jsdom'
import chai from 'chai'
import sinon from 'sinon'

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = { userAgent: 'node.js' }

global.expect = chai.expect
global.sinon = sinon

global.XMLHttpRequest = window.XMLHttpRequest
