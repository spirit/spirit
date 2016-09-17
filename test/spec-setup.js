import jsdom from 'jsdom'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'

chai.use(chaiAsPromised)

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = { userAgent: 'node.js' }

global.expect = chai.expect
global.sinon = sinon

global.XMLHttpRequest = window.XMLHttpRequest
