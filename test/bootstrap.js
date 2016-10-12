import 'babel-polyfill'

import jsdom from 'jsdom'
import chai from 'chai'
import sinon from 'sinon'

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>')
global.window = document.defaultView
global.navigator = { userAgent: 'node.js' }

global.expect = chai.expect
global.sinon = sinon

global.resolvePromise = (promise) => new Promise(resolve => promise.then(resolve).catch(resolve))
global.XMLHttpRequest = window.XMLHttpRequest

global.stubXhr = function(sandbox, props) {
  const defaults = {
    open: function() {},
    send: function() {
      this.onreadystatechange.call(this)
    },
    readyState: 4,
    status: 200,
    responseText: ''
  }

  props = { ...defaults, ...props }

  sandbox.stub(global, 'XMLHttpRequest').returns(new function() {
    props.open = props.open.bind(this)
    props.send = props.send.bind(this)

    Object.assign(this, props)
  })
}
