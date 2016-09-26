import config from '../src/config/config'

import {
  context,
  loadscript,
  jsonloader,
  gsap,
  autobind
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

    it('should reject when context is not browser', async() => {
      sinon.stub(context, 'isBrowser').returns(false)

      const err = await resolvePromise(loadscript('anything.js'))
      expect(err).to.be.an('error').match(/can only be loaded in browser/)

      context.isBrowser.restore()
    })

    it('should reject invalid request', async() => {
      const err = await resolvePromise(loadscript('invalid.js'))
      expect(err).to.be.an('error').match(/Could not load/)
    })

    it('should load script into window', async() => {
      expect(window.someGlobal).to.be.undefined
      await loadscript('test/fixtures/loadscript.js')
      expect(window.someGlobal).to.be.a('function')

      delete window.someGlobal // restore
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

    let xhrDefaults = {
      open: function() {},
      send: function() {
        this.onreadystatechange.call(this)
      },
      readyState: 4,
      status: 200,
      responseText: ''
    }

    function stubXhr(props) {
      props = Object.assign({}, xhrDefaults, props)

      sandbox.stub(global, 'XMLHttpRequest').returns(new function() {
        props.open = props.open.bind(this)
        props.send = props.send.bind(this)

        Object.assign(this, props)
      })
    }

    it('should reject when context is not browser', async() => {
      sinon.stub(context, 'isBrowser').returns(false)

      const err = await resolvePromise(jsonloader('file.json'))
      expect(err).to.be.an('error').match(/Invalid context/)

      context.isBrowser.restore()
    })

    it('should retrieve from cache', async() => {
      jsonloaderCache['temp.json'] = { foo: 'bar' }
      expect(await jsonloader('temp.json')).to.deep.equal({ foo: 'bar' })
    })

    it('should serve from queued request', async() => {
      jsonloaderReq['temp.json'] = new Promise((resolve) => resolve({ foo: 'bar' }))
      expect(await jsonloader('temp.json')).to.deep.equal({ foo: 'bar' })
    })

    it('should reject as invalid request', async() => {
      stubXhr({
        open: () => {
          throw new Error('Invalid')
        }
      })

      const err = await resolvePromise(jsonloader('invalid-file.js'))
      expect(err).to.be.an('error').match(/Could not open request/)
    })

    it('should resolve json', async() => {
      stubXhr({ responseText: `{"foo": "bar"}` })
      expect(await jsonloader('test.json')).to.deep.equal({ foo: 'bar' })
    })

    it('should reject invalid json', async() => {
      stubXhr({ responseText: `{foo": "bar"}` })

      const err = await resolvePromise(jsonloader('invalid-json.json'))
      expect(err).to.be.an('error').match(/Invalid json/)
    })

  })

  describe('gsap', () => {

    let autoInjectUrl

    beforeEach(() => {
      autoInjectUrl = config.gsap.autoInjectUrl
      config.gsap.autoInject = true
      config.gsap.tween = null
      config.gsap.timeline = null
    })

    afterEach(() => {
      config.gsap.autoInjectUrl = autoInjectUrl
    })

    it('should not contain any gsap', () => {
      expect(gsap.has()).to.be.false
    })

    it('should ensure gsap', async() => {
      config.gsap.autoInjectUrl = 'test/fixtures/gsap.js'

      expect(gsap.has()).to.be.false

      await gsap.ensure()

      expect(window.TweenMax).to.be.a('function')
      expect(window.TimelineMax).to.be.a('function')
      expect(gsap.has()).to.be.true
    })

    it('should resolve if already has gsap', async() => {
      config.gsap.tween = function() {}
      config.gsap.timeline = function() {}
      await gsap.ensure()
      expect(gsap.has()).to.be.true
    })

    it('should reject ensure() when autoInject is false', async() => {
      config.gsap.autoInject = false

      const err = await resolvePromise(gsap.ensure())
      expect(err).to.be.an('error').match(/GSAP not found/)
    })

  })

  describe('autobind', () => {

    class A {
      exec() { this.fn.call(this) }
    }

    it('should not autobind method', () => {
      class B {
        constructor() {
          let a = new A()
          a.fn = this.executed
          a.exec()
        }

        executed() {
          expect(this).to.be.instanceOf(A)
        }
      }

      new B()
    })

    it('should autobind method', () => {
      class B {
        constructor() {
          let a = new A()
          a.fn = this.executed
          a.exec()
        }

        @autobind
        executed() {
          expect(this).to.be.instanceOf(B)
        }
      }

      new B()
    })

    it('should not autobind class', () => {
      class B {
        constructor() {
          let a = new A()
          a.fn = this.executed
          a.exec()
        }

        executed() {
          expect(this).to.be.instanceOf(A)
        }
      }

      new B()
    })

    it('should autobind class', () => {
      @autobind
      class B {
        constructor() {
          let a = new A()
          a.fn = this.executed
          a.exec()
        }

        executed() {
          expect(this).to.be.instanceOf(B)
        }
      }

      new B()
    })

  })

})
