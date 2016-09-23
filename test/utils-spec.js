import config from '../src/config/config'

import {
  context,
  loadscript,
  jsonloader,
  gsap,
  autobind,
  List
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

  describe('list', () => {

    it('should create an empty list', () => {
      expect(new List()).to.have.lengthOf(0)
    })

    it('should have infinity listener counts', () => {
      const list = new List()
      expect(list._maxListeners).equal(Infinity)
    })

    describe('parse on creation', () => {
      it('should contain a predefined list', () => {
        const list = new List([1, 2, 3])
        expect(list.list).deep.equal([1, 2, 3])
      })

      it('should parse list on model', () => {
        class Model {}

        const list = new List([new Model(), new Model()], Model)
        expect(list._model).equal(Model)
        expect(list).to.have.lengthOf(2)
        expect(list.at(0)).to.be.an.instanceOf(Model)
        expect(list.at(1)).to.be.an.instanceOf(Model)
      })

      it('should parse list on model.fromObject', () => {
        class Model {}
        Model.fromObject = (obj) => new Model()

        const list = new List([{ foo: 'bar' }, { bar: 'foo' }], Model)
        expect(list).to.have.lengthOf(2)
        expect(list.at(0)).to.be.an.instanceOf(Model)
        expect(list.at(1)).to.be.an.instanceOf(Model)
      })

      it('should fail when model could not be parsed', () => {
        class Model {}

        expect(() => new List([{ foo: 'bar' }, { bar: 'foo' }], Model))
          .to.throw(/Could not parse/)

      })
    })

    describe('list', () => {
      it('should get list', () => {
        const list = new List([{ x: 10 }, { y: 20 }])
        expect(list.list).to.deep.equal([{ x: 10 }, { y: 20 }])
      })

      it('should fail to set invalid list', () => {
        const list = new List()
        expect(() => list.list = null).to.throw(/List should be an array/)
        expect(() => list.list = {}).to.throw(/List should be an array/)
      })

      it('should set new list', () => {
        const params = new List()
        const list = []
        params.list = list
        expect(params.list).equal(list)
      })
    })

    describe('#at', () => {
      it('should fail on retrieve invalid index', () => {
        expect(() => new List([{ x: 10 }]).at(2)).to.throw(/Index exceeded/)
      })

      it('should return param by index', () => {
        expect(new List(['x', 'y']).at(0)).equal('x')
        expect(new List(['x', 'y']).at(1)).equal('y')
      })
    })

    describe('#add', () => {

      let list

      beforeEach(() => {
        list = new List()
      })

      it('should successfull add null to list without model', () => {
        list.add(null)
        list.add(undefined)
        expect(list.at(0)).equal(null)
        expect(list.at(1)).equal(undefined)
      })

      it('should fail on adding invalid item with model', () => {
        class Model {}
        list = new List([], Model)

        expect(() => list.add(null)).to.throw(/Invalid item/)
        expect(() => list.add(undefined)).to.throw(/Invalid item/)
        expect(() => list.add({})).to.throw(/Invalid item/)
        expect(list).to.have.lengthOf(0)
      })

      it('should add item of model instance', () => {
        class Model {}
        list = new List([], Model)
        list.add(new Model())
        list.add(new Model())

        expect(list).to.have.lengthOf(2)
        expect(list.at(0)).to.be.an.instanceOf(Model)
        expect(list.at(1)).to.be.an.instanceOf(Model)
      })

      it('should add by object from model', () => {
        class Model {
          constructor(obj) {
            Object.assign(this, obj)
          }
        }
        Model.fromObject = (obj) => new Model(obj)

        list = new List([], Model)
        expect(list).to.have.lengthOf(0)

        list.add({ x: 10 })
        list.add({ y: 100 })
        list.add({ z: 1000 })

        expect(list).to.have.lengthOf(3)

        expect(list.at(0)).to.be.an.instanceOf(Model)
        expect(list.at(0).x).equal(10)

        expect(list.at(1)).to.be.an.instanceOf(Model)
        expect(list.at(1).y).equal(100)

        expect(list.at(2)).to.be.an.instanceOf(Model)
        expect(list.at(2).z).equal(1000)
      })

      describe('array with model', () => {

        class Model {
          constructor(obj) {
            Object.assign(this, obj)
          }
        }
        Model.fromObject = (obj) => new Model(obj)

        beforeEach(() => {
          list = new List([], Model)
        })

        it('should add by array object', () => {
          list.add([
            { x: 10 },
            { y: 100 },
            { z: 1000 },
          ])

          expect(list.at(0)).to.be.an.instanceOf(Model)
          expect(list.at(0).x).equal(10)

          expect(list.at(1)).to.be.an.instanceOf(Model)
          expect(list.at(1).y).equal(100)

          expect(list.at(2)).to.be.an.instanceOf(Model)
          expect(list.at(2).z).equal(1000)
        })

        it('should add by array model instances', () => {
          list.add([
            new Model({ x: 10 }),
            new Model({ y: 100 }),
            new Model({ z: 1000 }),
          ])

          expect(list.at(0)).to.be.an.instanceOf(Model)
          expect(list.at(0).x).equal(10)

          expect(list.at(1)).to.be.an.instanceOf(Model)
          expect(list.at(1).y).equal(100)

          expect(list.at(2)).to.be.an.instanceOf(Model)
          expect(list.at(2).z).equal(1000)
        })
      })
    })

    describe('#remove', () => {

    })

    describe('dispatch changes', () => {

    })

  })

})
