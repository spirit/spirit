const jsdom = require('jsdom');
const chai = require('chai');
const sinon = require('sinon');

const dom = new jsdom.JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'file://' + process.cwd() + '/',
  features: {
    FetchExternalResources: ['script'],
  },
  resources: 'usable',
  runScripts: 'dangerously',
});

global.window = dom.window;
global.document = global.window.document;
Object.defineProperty(global, 'navigator', {
  value: { userAgent: 'node.js' },
  writable: true,
  configurable: true,
});

global.expect = chai.expect;
global.sinon = sinon;

global.resolvePromise = promise =>
  new Promise(resolve => promise.then(resolve).catch(resolve));
global.XMLHttpRequest = global.window.XMLHttpRequest;

global.stubXhr = function(sandbox, props) {
  const defaults = {
    open: function() {},
    send: function() {
      this.onreadystatechange.call(this);
    },
    readyState: 4,
    status: 200,
    responseText: '',
  };

  props = { ...defaults, ...props };

  sandbox.stub(global, 'XMLHttpRequest').returns(
    new (function() {
      props.open = props.open.bind(this);
      props.send = props.send.bind(this);

      Object.assign(this, props);
    })()
  );
};
