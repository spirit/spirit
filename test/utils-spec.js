import config from '../src/config/config'
import Timeline from '../src/group/timeline'
import List from '../src/list/list'
import { EventEmitter } from 'events'

import { post } from './fixtures/group/dom'

import {
  context,
  loadscript,
  jsonloader,
  gsap,
  autobind,
  events,
  convert,
  xpath,
  is,
  emitter
} from '../src/utils'

import {
  req as jsonloaderReq,
  cache as jsonloaderCache
} from '../src/utils/jsonloader'

const gsapConfig = { ...config.gsap }

describe('utils', () => {

  before(() => {
    sinon.stub(is, 'isSVG', element => ['SVG', 'G', 'RECT'].includes(element.nodeName))
  })

  after(() => {
    is.isSVG.restore()
  })

  it('should has window context', () => {
    expect(context.isBrowser()).to.be.ok
  })

  describe('loadscript', () => {

    it('should reject when context is not browser', async () => {
      sinon.stub(context, 'isBrowser').returns(false)

      const err = await resolvePromise(loadscript('anything.js'))
      expect(err).to.be.an('error').match(/can only be loaded in browser/)

      context.isBrowser.restore()
    })

    it('should reject invalid request', async () => {
      const err = await resolvePromise(loadscript('invalid.js'))
      expect(err).to.be.an('error').match(/Could not load/)
    })

    it('should load script into window', async () => {
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

    it('should reject when context is not browser', async () => {
      sinon.stub(context, 'isBrowser').returns(false)

      const err = await resolvePromise(jsonloader('file.json'))
      expect(err).to.be.an('error').match(/Invalid context/)

      context.isBrowser.restore()
    })

    it('should retrieve from cache', async () => {
      jsonloaderCache['temp.json'] = { foo: 'bar' }
      expect(await jsonloader('temp.json')).to.deep.equal({ foo: 'bar' })
    })

    it('should serve from queued request', async () => {
      jsonloaderReq['temp.json'] = new Promise((resolve) => resolve({ foo: 'bar' }))
      expect(await jsonloader('temp.json')).to.deep.equal({ foo: 'bar' })
    })

    it('should reject as invalid request', async () => {
      stubXhr(sandbox, {
        open: () => {
          throw new Error('Invalid')
        }
      })

      const err = await resolvePromise(jsonloader('invalid-file.js'))
      expect(err).to.be.an('error').match(/Could not open request/)
    })

    it('should resolve json', async () => {
      stubXhr(sandbox, { responseText: `{"foo": "bar"}` })
      expect(await jsonloader('test.json')).to.deep.equal({ foo: 'bar' })
    })

    it('should reject invalid json', async () => {
      stubXhr(sandbox, { responseText: `{foo": "bar"}` })

      const err = await resolvePromise(jsonloader('invalid-json.json'))
      expect(err).to.be.an('error').match(/Invalid json/)
    })

  })

  describe('gsap', () => {

    beforeEach(() => {
      config.gsap = { ...gsapConfig }
    })

    afterEach(() => {
      config.gsap = { ...gsapConfig }
    })

    describe('ensure', () => {

      it('should not contain any gsap', () => {
        expect(gsap.has()).to.be.false
      })

      it('should ensure gsap', async () => {
        config.gsap.autoInjectUrl = 'test/fixtures/gsap.js'

        expect(gsap.has()).to.be.false

        await gsap.ensure()

        expect(window.TweenMax).to.be.a('function')
        expect(window.TimelineMax).to.be.a('function')
        expect(gsap.has()).to.be.true
      })

      it('should resolve if already has gsap', async () => {
        config.gsap.tween = function() {}
        config.gsap.timeline = function() {}
        await gsap.ensure()
        expect(gsap.has()).to.be.true
      })

      it('should reject ensure() when autoInject is false', async () => {
        config.gsap.autoInject = false

        const err = await resolvePromise(gsap.ensure())
        expect(err).to.be.an('error').match(/GSAP not found/)
      })

    })

    describe('generate timeline', () => {
      const div = document.createElement('div')

      it('should fail on invalid data', () => {
        expect(() => gsap.generateTimeline()).to.throw(/Need valid timeline/)
        expect(() => gsap.generateTimeline([])).to.throw(/Need valid timeline/)
        expect(() => gsap.generateTimeline({})).to.throw(/Need valid timeline/)
      })

      it('should fail if gsap timeline is not set', () => {
        expect(() => gsap.generateTimeline(new Timeline('dom', div, [], 'div[0]'))).to.throw(/GSAP not set/)
      })

      it('should fail if provided timeline is not of type "dom"', () => {
        config.gsap.timeline = function() {}
        expect(() => gsap.generateTimeline(new Timeline('object', {})))
          .to.throw(/Timeline invalid. Needs a timeline with type of dom/)
      })

      describe('on generated', () => {

        let timeline

        beforeEach(async () => {
          config.gsap.autoInjectUrl = 'test/fixtures/gsap.js'
          await gsap.ensure()

          const tl = new Timeline('dom', div, {
            x: {
              '0s': { value: 100 },
              '3.333s': { value: 1000 }
            },
            y: {
              '0s': { value: 100 }
            },
            rotationX: {
              '0s': { value: 300 },
              '1.666s': { value: 500, ease: 'Power3.easeInOut' },
              '5s': { value: -300 }
            }
          }, 'div[0]')

          timeline = gsap.generateTimeline(tl)
        })

        it('should have _gsTransform and _gsTweenID added to div', () => {
          timeline.progress(0.5)
          expect(div._gsTransform).to.be.an('object')
          expect(div._gsTweenID).to.be.an('string')
        })

        it('should have a gsap timeline with correct duration', () => {
          expect(timeline).to.be.an.instanceOf(config.gsap.timeline)
          expect(timeline.duration()).to.equal(5)
        })

        it('should use time and is paused', () => {
          expect(timeline.vars).to.deep.equal({ paused: true })
          expect(timeline.usesFrames()).to.be.false
        })

        describe('children', () => {

          it('should have children', () => {
            expect(timeline.getChildren()).to.have.lengthOf(6)
          })

          it('should have parent timeline', () => {
            const children = timeline.getChildren()
            children.forEach(child => expect(child.timeline).to.equal(timeline))
          })

          it('should have correct transitions', () => {
            const vars = timeline.getChildren().map(c => c.vars)

            expect(vars[0]).to.deep.equal({ ease: 'Linear.easeNone', immediateRender: true, css: { rotationX: 300 } })
            expect(vars[1]).to.deep.equal({ rotationX: 500, ease: 'Power3.easeInOut' })
            expect(vars[2]).to.deep.equal({ ease: 'Linear.easeNone', immediateRender: true, css: { x: 100 } })
            expect(vars[3]).to.deep.equal({ x: 1000, ease: 'Linear.easeNone' })
            expect(vars[4]).to.deep.equal({ immediateRender: true, css: { y: 100 }, ease: 'Linear.easeNone' })
            expect(vars[5]).to.deep.equal({ rotationX: -300, ease: 'Linear.easeNone' })
          })

          it('should have the correct offset (start time)', () => {
            const time = timeline.getChildren().map(c => c.startTime())

            expect(time[0]).to.equal(0)
            expect(time[1]).to.equal(0)

            expect(time[2]).to.equal(0)
            expect(time[3]).to.equal(0)

            expect(time[4]).to.equal(0)
            expect(time[5]).to.equal(1.666)
          })

        })
      })
    })

    describe('kill timeline', () => {
      const div = document.createElement('div')

      beforeEach(async() => {
        await gsap.ensure()
      })

      describe('flat timeline', () => {
        let timeline

        beforeEach(() => {
          timeline = gsap.generateTimeline(
            new Timeline('dom', div, {
              x: { '3.333s': 1000 },
              y: { '0s': 100 },
              left: { '0s': -100 }
            }, 'div[0]')
          )

          timeline.seek(3.333)
        })

        it('should have gsTransform values', () => {
          expect(div).to.have.deep.property('_gsTransform.x', 1000)
          expect(div).to.have.deep.property('_gsTransform.y', 100)
        })

        it('should have cleared gsTransform values', () => {
          gsap.killTimeline(timeline)
          expect(div).to.not.have.property('_gsTransform')
        })

        it('should have style attribute', () => {
          expect(div.style.getPropertyValue('left')).to.equal('-100px')
        })

        it('should have removed style attribute', () => {
          gsap.killTimeline(timeline)
          expect(div.style.getPropertyValue('left')).to.equal('')
          expect(div.getAttribute('style')).to.equal('')
        })
      })
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

  describe('emitter', () => {

    describe('for class', () => {
      it('should have added property for emitting', () => {
        @emitter.emitChange('label')
        class A extends EventEmitter {
        }
        const ins = new A()

        expect(ins).to.have.property('_label')
        expect(ins).to.have.property('label')
      })

      it('should add getters and setters with defaults', async () => {
        @emitter.emitChange('label', 'untitled')
        @emitter.emitChange('song')
        class Album extends EventEmitter {
        }

        const album = new Album()
        expect(album).to.have.property('label', 'untitled')
        expect(album).to.have.property('song', null)

        const spy = sinon.spy()
        const spyLabel = sinon.spy()
        const spySong = sinon.spy()

        album.on('change', spy)
        album.on('change:label', spyLabel)
        album.on('change:song', spySong)

        album.label = 'Summer'

        album.song = 'Hot'
        album.song = 'Cold'
        album.song = 'Warm'

        album.label = 'Winter'

        expect(album).to.have.property('label', 'Winter')
        expect(album).to.have.property('song', 'Warm')

        expect(spy.callCount).to.equal(5)
        expect(spy.getCall(0).args[0].changed).to.deep.equal({ type: 'label', from: 'untitled', to: 'Summer' })
        expect(spy.getCall(1).args[0].changed).to.deep.equal({ type: 'song', from: null, to: 'Hot' })
        expect(spy.getCall(2).args[0].changed).to.deep.equal({ type: 'song', from: 'Hot', to: 'Cold' })
        expect(spy.getCall(3).args[0].changed).to.deep.equal({ type: 'song', from: 'Cold', to: 'Warm' })
        expect(spy.getCall(4).args[0].changed).to.deep.equal({ type: 'label', from: 'Summer', to: 'Winter' })

        expect(spyLabel.callCount).to.equal(2)
        expect(spyLabel.getCall(0).args[0].changed).to.deep.equal({ type: 'label', from: 'untitled', to: 'Summer' })
        expect(spyLabel.getCall(1).args[0].changed).to.deep.equal({ type: 'label', from: 'Summer', to: 'Winter' })

        expect(spySong.callCount).to.equal(3)
        expect(spySong.getCall(0).args[0].changed).to.deep.equal({ type: 'song', from: null, to: 'Hot' })
        expect(spySong.getCall(1).args[0].changed).to.deep.equal({ type: 'song', from: 'Hot', to: 'Cold' })
        expect(spySong.getCall(2).args[0].changed).to.deep.equal({ type: 'song', from: 'Cold', to: 'Warm' })
      })

      it('should fail if has duplicates', () => {
        @emitter.emitChange('label')
        class Item extends EventEmitter {

          constructor(label) {
            super()
            this.label = label
          }

          toObject() {
            return { 'label': this.label }
          }
        }

        class Items extends List {
          duplicates = { prop: 'label' }

          constructor() {
            super([], Item)
          }
        }

        const items = new Items()
        items.add(new Item('foo'))
        items.add(new Item('bar'))

        const item = items.at(0)
        expect(() => item.label = 'bar').to.throw(/List has duplicates/)
      })
    })

    describe('for setter', () => {

      it('should throw error if class is not an instance of event emitter', () => {
        expect(() => {
          class A {
            @emitter.emitChange()
            emit(val) {}
          }
        }).to.throw(/can only be applied to event emitters/)
      })

      describe('valid emitter', () => {
        let ins, cb

        class A extends EventEmitter {
          _item = 123

          get item() { return this._item }

          @emitter.emitChange()
          set item(val) { this._item = val }
        }

        beforeEach(async () => {
          ins = new A()
          cb = sinon.spy()

          ins.on('change', cb)
        })

        afterEach(async () => {
          ins.removeListener('change', cb)
        })

        it('should not emit change if value is same', () => {
          expect(cb.callCount).to.equal(0)
          ins.item = 123
          expect(cb.callCount).to.equal(0)
        })

        it('should emit change if value is changed', () => {
          expect(cb.callCount).to.equal(0)
          ins.item = 456
          expect(cb.callCount).to.equal(1)

          const args = cb.firstCall.args[0]
          expect(args).to.have.property('previous').to.deep.equal({ item: 123 })
          expect(args).to.have.property('current').to.deep.equal({ item: 456 })
          expect(args).to.have.property('changed').to.deep.equal({ type: 'item', from: 123, to: 456 })
        })

        it('should use toObject() if defined', () => {
          ins.toObject = function() {
            return { item: 'to-' + this.item }
          }

          expect(cb.callCount).to.equal(0)
          ins.item = 456
          expect(cb.callCount).to.equal(1)

          const args = cb.firstCall.args[0]
          expect(args).to.have.property('previous').to.deep.equal({ item: 'to-123' })
          expect(args).to.have.property('current').to.deep.equal({ item: 'to-456' })
          expect(args).to.have.property('changed').to.deep.equal({ type: 'item', from: 123, to: 456 })
        })

        describe('_list', () => {

          it('should emit if is event emitter', () => {
            class B extends EventEmitter {}
            ins._list = new B()

            const spy = sinon.spy()
            ins._list.on('change:item', spy)

            expect(spy.callCount).to.equal(0)
            ins.item = 456
            expect(spy.callCount).to.equal(1)

            const args = spy.firstCall.args[0]
            expect(args).to.have.property('previous').to.deep.equal({ item: 123 })
            expect(args).to.have.property('current').to.deep.equal({ item: 456 })
            expect(args).to.have.property('changed').to.deep.equal({ type: 'item', from: 123, to: 456 })
          })

          it('should not emit if is not event emitter', () => {
            ins._list = { on: () => {} }

            const spy = sinon.spy()
            ins._list.on('change:item', spy)

            expect(spy.callCount).to.equal(0)
            ins.item = 456
            expect(spy.callCount).to.equal(0)
          })
        })

      })

    })

  })

  describe('events', () => {

    describe('bubbleEvent', () => {

      it('should fail when setting invalid scope', () => {
        expect(() => events.bubbleEvent('change', {})).to.throw(/Scope needs to be an event emitter./)
      })

      it('should bubble event', () => {
        class MyEmitter extends require('events').EventEmitter {}
        const spy = sinon.spy()
        const myEmitter = new MyEmitter()
        myEmitter.on('update', spy)

        const fn = events.bubbleEvent('update', myEmitter)
        const arg = { a: 200 }

        fn(arg)

        expect(spy.withArgs(arg).calledOnce).to.be.true
      })
    })

    describe('create event object for model', () => {

      class Model {
        frame = 0

        constructor(obj = {}) {
          Object.assign(this, obj)
        }
      }
      Model.fromObject = (obj) => new Model(obj)

      it('should create a valid event object for model', () => {
        const m = new Model()
        const evtObj = events.createEventObjectForModel(Model, m, 'frame', 0, 1)

        expect(evtObj).to.deep.equal({
          prevModel: { frame: 0 },
          model: { frame: 1 },
          changed: { type: 'frame', from: 0, to: 1 }
        })
      })

    })

    describe('clear events', () => {

      it('should clear all events for modern node implementations', () => {
        class MyEmitter extends require('events').EventEmitter {
          eventNames() {
            return ['foo', 'bar']
          }
        }

        const spyFoo = sinon.spy()
        const spyBar = sinon.spy()

        const emitter = new MyEmitter()
        emitter.on('foo', spyFoo)
        emitter.on('bar', spyBar)

        emitter.emit('foo')
        emitter.emit('bar')

        expect(spyFoo.calledOnce).to.be.true
        expect(spyBar.calledOnce).to.be.true

        events.clearEvents(emitter)

        emitter.emit('foo')
        emitter.emit('bar')

        expect(spyFoo.calledOnce).to.be.true
        expect(spyBar.calledOnce).to.be.true
      })

      it('should clear all events for legacy node implementations', () => {
        class MyEmitter extends require('events').EventEmitter {}

        const spyFoo = sinon.spy()
        const spyBar = sinon.spy()

        const emitter = new MyEmitter()
        emitter.on('foo', spyFoo)
        emitter.on('bar', spyBar)

        emitter.emit('foo')
        emitter.emit('bar')

        expect(spyFoo.calledOnce).to.be.true
        expect(spyBar.calledOnce).to.be.true

        events.clearEvents(emitter, ['foo', 'bar'])

        emitter.emit('foo')
        emitter.emit('bar')

        expect(spyFoo.calledOnce).to.be.true
        expect(spyBar.calledOnce).to.be.true
      })

    })

  })

  describe('convert', () => {

    it('should convert object to array', () => {
      expect(convert.objectToArray({ a: 'a', b: 'b', c: 'c' })).to.deep.equal([
        { a: 'a' },
        { b: 'b' },
        { c: 'c' }
      ])
    })

    it('should convert array to object', () => {
      expect(convert.arrayToObject([{ a: 'a' }, { b: 'b' }, { c: 'c' }])).to.deep.equal({
        a: 'a',
        b: 'b',
        c: 'c'
      })
    })

  })

  describe('xpath', () => {

    let container,
        post1,
        post2

    beforeEach(() => {
      container = document.createElement('div')
      container.setAttribute('id', 'container')
      document.body.appendChild(container)

      post1 = post()
      post2 = post()

      container.appendChild(post1)
      container.appendChild(post2)
    })

    afterEach(() => {
      document.body.removeChild(container)
    })

    describe('get expression', () => {

      it('should get xpath string relative to html', () => {
        const a = xpath.getExpression(post2.querySelector('.post-date'))
        const b = xpath.getExpression(post2.querySelector('.post-args'))

        expect(a).to.equal('/html[1]/body[1]/div[1]/div[2]/div[1]/div[1]/span[1]')
        expect(b).to.equal('/html[1]/body[1]/div[1]/div[2]/div[1]/div[1]/span[2]')
      })

      it('should get xpath relative to parent element', () => {
        const a = xpath.getExpression(post2.querySelector('.post-date'), container)
        const b = xpath.getExpression(post2.querySelector('.post-args'), container)

        expect(a).to.equal('div[2]/div[1]/div[1]/span[1]')
        expect(b).to.equal('div[2]/div[1]/div[1]/span[2]')
      })

      it('should get null', () => {
        expect(xpath.getExpression('div[3]', container)).to.equal(null)
        expect(xpath.getExpression('div[3]/div[2]/span[1]', container)).to.equal(null)
      })

      describe('svg', () => {
        let svg

        beforeEach(() => {
          // add svg element with nested rect
          svg = document.createElement('svg')

          let g    = document.createElement('g'),
              rect = document.createElement('rect')

          g.appendChild(rect)
          svg.appendChild(g)
          container.querySelector('.entry').appendChild(svg)
        })

        it('should get xpath string relative to html', () => {
          expect(xpath.getExpression(svg.querySelector('rect'))).to.equal(
            `/html[1]/body[1]/div[1]/div[1]/div[1]/*[local-name()='svg'][1]/*[local-name()='g'][1]/*[local-name()='rect'][1]`
          )
        })

        it('should get xpath relative to parent element', () => {
          expect(xpath.getExpression(svg.querySelector('rect'), container)).to.equal(
            `div[1]/div[1]/*[local-name()='svg'][1]/*[local-name()='g'][1]/*[local-name()='rect'][1]`
          )
        })
      })

    })

    describe('get element', () => {

      it('should get element by expression from html', () => {
        const element = xpath.getElement('/html[1]/body[1]/div[1]/div[2]/div[1]/div[1]/span[1]')
        expect(element).to.equal(post2.querySelector('.post-date'))
      })

      it('should get element by expression relative to parent element', () => {
        const element = xpath.getElement('div[1]/div[1]/div[1]/span[2]', container)
        expect(element).to.equal(post1.querySelector('.post-args'))
      })

    })

  })

})
