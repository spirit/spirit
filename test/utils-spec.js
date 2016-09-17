import {
  context,
  loadscript,
  jsonloader
} from '../src/utils'

import {
  req as jsonloaderReq,
  cache as jsonloaderCache
} from '../src/utils/jsonloader'

describe('utils', () => {

  it('should has window context', () => {
    expect(context.isBrowser()).to.be.ok
  })

  describe('loadscript', () => {

    it('should reject when context is not browser', (done) => {
      sinon.stub(context, 'isBrowser').returns(false)
      expect(loadscript('anything.js')).to.eventually.be.rejectedWith(/can only be loaded in browser/).notify(done)
      context.isBrowser.restore()
    })

    it('should reject invalid request', () => {
      return expect(loadscript('invalid.js')).to.eventually.be.rejectedWith(/Could not load/)
    })

    it('should load script into window', (done) => {
      expect(window.someGlobal).to.be.undefined

      loadscript('test/fixtures/loadscript.js')
        .then(() => {
          expect(window.someGlobal).to.be.a('function')
          window.someGlobal = undefined
          done()
        })
        .catch(done)
    })

  })

  describe('jsonloader', () => {

    let sandbox

    beforeEach(() => {
      sandbox = sinon.sandbox.create()
      Object.keys(jsonloaderReq).forEach(key => delete jsonloaderReq[key])
      Object.keys(jsonloaderCache).forEach(key => delete jsonloaderCache[key])
    })

    afterEach(() => {
      sandbox.restore()
    })

    it('should reject when context is not browser', (done) => {
      sinon.stub(context, 'isBrowser').returns(false)
      expect(jsonloader()).to.eventually.be.rejectedWith(/Invalid context/).notify(done)
      context.isBrowser.restore()
    })

    it('should retrieve from cache', () => {
      jsonloaderCache['temp.json'] = { foo: 'bar' }
      return expect(jsonloader('temp.json')).to.eventually.deep.equal({ foo: 'bar' })
    })

    it('should serve from queued request', () => {
      jsonloaderReq['temp.json'] = new Promise((resolve) => resolve({ foo: 'bar' }))
      return expect(jsonloader('temp.json')).to.eventually.deep.equal({ foo: 'bar' })
    })

    it('should reject as invalid request', () => {
      sandbox.stub(global, 'XMLHttpRequest').returns(new function() {
        this.open = () => { throw new Error('Invalid') }
      })

      return expect(jsonloader())
        .to.eventually.rejectedWith(/Could not open request/)
    })

    it('should resolve json', () => {
      sandbox.stub(global, 'XMLHttpRequest').returns(new function() {
        this.readyState = 4
        this.status = 200
        this.responseText = `{"foo": "bar"}`

        this.open = () => {}
        this.send = () => this.onreadystatechange.call(this)
      })

      return expect(jsonloader('test.json'))
        .to.eventually.deep.equal({ foo: 'bar' })
    })

    it ('should reject invalid json', () => {
      sandbox.stub(global, 'XMLHttpRequest').returns(new function() {
        this.readyState = 4
        this.status = 200
        this.responseText = `{foo": "bar"}`

        this.open = () => {}
        this.send = () => this.onreadystatechange.call(this)
      })

      return expect(jsonloader())
        .to.eventually.rejectedWith(/Invalid json/)
    })

  })

})
