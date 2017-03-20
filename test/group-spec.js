import config from '../src/config/config'
import { gsap } from '../src/utils'
import { Group, Timelines } from '../src/group'
import { groupDefaults } from '../src/group/group'

const configGsap = { ...config.gsap }

describe('group', () => {

  const divA = document.createElement('div')
  const divB = document.createElement('div')
  const divC = document.createElement('div')

  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('parse', () => {
    it('should create an empty group', () => {
      const group = new Group({ name: 'test' })

      expect(group.fps).equal(groupDefaults.fps)
      expect(group.name).equal('test')
      expect(group.timelines).equal(groupDefaults.timelines)
    })

    it('should fail to create a group without a name', () => {
      expect(() => new Group()).to.throw(/Cannot create group without a name/)
      expect(() => new Group({ name: '' })).to.throw(/Cannot create group without a name/)
      expect(() => new Group({ name: 123 })).to.throw(/Cannot create group without a name/)
    })

    it('should create a named group', () => {
      const group = new Group({ name: 'ghost' })
      expect(group.name).equal('ghost')
    })

    it('should have empty timelines', () => {
      const group = new Group({ name: 'group' })
      expect(group.timelines).to.be.an.instanceOf(Timelines)
      expect(group.timelines).to.have.lengthOf(0)
    })

    it('should parse group from object', () => {
      const group = new Group({
        name: 'my-group',
        fps: 25,
        timelines: [
          { transformObject: divA, path: 'div[0]', transitions: [{ frame: 0, params: { x: 0, y: 0 } }] },
          { transformObject: divB, path: 'div[1]', transitions: [{ frame: 100, params: { x: 100, y: 200 } }] },
          { transformObject: divC, path: 'div[2]', transitions: [{ frame: 200, params: { x: 400, y: 400 }, ease: 'custom' }] },
        ]
      })

      expect(group.timelines).to.be.an.instanceOf(Timelines)
      expect(group.timelines.toArray()).to.deep.equal([
        {
          type: 'dom',
          transformObject: divA,
          path: 'div[0]',
          transitions: [{ frame: 0, params: { x: 0, y: 0 }, ease: 'Linear.easeNone' }]
        },
        {
          type: 'dom',
          transformObject: divB,
          path: 'div[1]',
          transitions: [{ frame: 100, params: { x: 100, y: 200 }, ease: 'Linear.easeNone' }]
        },
        {
          type: 'dom',
          transformObject: divC,
          path: 'div[2]',
          transitions: [{ frame: 200, params: { x: 400, y: 400 }, ease: 'custom' }]
        },
      ])
    })

    it('should fail set invalid fps', () => {
      const group = new Group({ name: 'group' })
      expect(group.fps).equal(30)
      expect(() => { group.fps = '12' }).to.throw(/Fps needs to be a number/)
    })

    it('should fail set invalid name', () => {
      const group = new Group({ name: 'untitled' })
      expect(group.name).equal('untitled')
      expect(() => { group.name = 123 }).to.throw(/Name needs to be a string/)
    })

  })

  describe('fromObject', () => {
    it('should return a valid group from object', () => {
      const g = Group.fromObject({
        name: 'ghost',
        fps: 25,
        timelines: [
          { transformObject: divA, path: 'div[0]', transitions: [{ frame: 10, params: { x: 100, y: 100 } }] }
        ]
      })
      expect(g).to.be.an.instanceOf(Group)

      expect(g.toObject()).to.deep.equal({
        name: 'ghost',
        fps: 25,
        timelines: [
          {
            type: 'dom',
            transformObject: divA,
            path: 'div[0]',
            transitions: [{ frame: 10, params: { x: 100, y: 100 }, ease: 'Linear.easeNone' }]
          }
        ]
      })
    })
  })

  describe('toObject', () => {
    it('should convert group to valid object', () => {
      const group = new Group({
        name: 'monkey-business',
        fps: 10,
        timelines: [
          { label: 'monkey', transformObject: divA, path: 'div[0]' },
          { label: 'eyes', transformObject: divB, path: 'div[1]', transitions: [{ frame: 0 }] },
          { label: 'mouth', transformObject: divC, path: 'div[2]' }
        ]
      })

      expect(group.toObject()).to.deep.equal({
        name: 'monkey-business',
        fps: 10,
        timelines: [
          {
            type: 'dom',
            label: 'monkey',
            transformObject: divA,
            path: 'div[0]',
            transitions: []
          },
          {
            type: 'dom',
            label: 'eyes',
            transformObject: divB,
            path: 'div[1]',
            transitions: [{ frame: 0, params: {}, ease: 'Linear.easeNone' }]
          },
          {
            type: 'dom',
            label: 'mouth',
            transformObject: divC,
            path: 'div[2]',
            transitions: []
          }
        ]
      })
    })
  })

  describe('construct', () => {

    let group

    beforeEach(() => {
      config.gsap.autoInjectUrl = 'test/fixtures/gsap.js'
      group = new Group({ name: 'group' })
    })

    afterEach(() => {
      config.gsap = { ...configGsap }
    })

    describe('ensure gsap', () => {

      it('should ensure gsap before construct animation', async() => {
        const spy = sandbox.spy(gsap, 'ensure')
        const result = await resolvePromise(group.construct())

        expect(spy.called).to.be.true
        expect(result).not.to.be.an('error')
      })

      it('should fail when gsap can not be loaded', async() => {
        config.gsap.autoInject = false
        const result = await resolvePromise(group.construct())
        expect(result).to.be.an('error').to.match(/GSAP not found/)
      })

      it('should fail when can not construct timeline', async() => {
        group.timelines = [{ transformObject: divA, path: 'div[0]' }]
        group.timelines.get(divA).transformObject = null // needs to be set, silently fails
        const tl = await resolvePromise(group.construct())
        expect(tl).to.be.an('error').to.match(/Could not construct timeline/)
      })

    })

    describe('modify timeline', () => {

      beforeEach(() => {
        const tlA = {
          transformObject: divA,
          path: 'div[0]',
          transitions: [
            { frame: 0, params: { x: 0, y: 0 } },
            { frame: 100, params: { x: 1000 } },
            { frame: 200, params: { y: 1000 } }
          ]
        }

        const tlB = {
          transformObject: divB,
          path: 'div[1]',
          transitions: [
            { frame: 250, params: { scale: 1.5 } }
          ]
        }

        const tlC = {
          transformObject: divC,
          path: 'div[2]',
          transitions: [
            { frame: 50, params: { skewX: 300 } },
            { frame: 150, params: { rotateZ: 360 } },
          ]
        }

        group.timelines = [tlA, tlB, tlC]
      })

      it('should create a valid gsap timeline', async() => {
        const tl = await group.construct()
        expect(tl).to.be.an.instanceOf(config.gsap.timeline)
        expect(group.timeline).to.equal(tl)
        expect(tl.duration()).to.equal(250)
      })

      it('should kill and clear existing timeline', async() => {
        await group.construct()
        group.timelines.get(divA).transitions.get(100).params.get('x').value = 500

        const spyKill = sandbox.spy(group.timeline, 'kill')
        const spyClear = sandbox.spy(group.timeline, 'clear')

        await group.construct()

        expect(spyKill.calledOnce).to.be.true
        expect(spyClear.calledOnce).to.be.true
      })

    })

  })

  describe('timeline.timeScale with fps', () => {

    let group

    beforeEach(() => {
      config.gsap.autoInjectUrl = 'test/fixtures/gsap.js'
      group = new Group({ name: 'group' })
      group.timelines = [{
        transformObject: divA,
        path: 'div[0]',
        transitions: [
          { frame: 0, params: { x: 0 } },
          { frame: 120, params: { x: 1000 } }
        ]
      }]
    })

    afterEach(() => {
      config.gsap = { ...configGsap }
    })

    it('should match fps with timeScale on construct', async () => {
      const tl = await group.construct()

      expect(group.fps).to.equal(30)
      expect(tl.timeScale()).to.equal(0.5)
      expect(tl.endTime() - tl.startTime()).to.equal(240)
    })

    it ('should update timescale on fps change', async() => {
      const tl = await group.construct()
      expect(tl.timeScale()).to.equal(0.5)

      group.fps = 60
      expect(tl.timeScale()).to.equal(1)
      expect(tl.endTime() - tl.startTime()).to.equal(120)

      group.fps = 12
      expect(tl.timeScale()).to.equal(0.2)
      expect(tl.endTime() - tl.startTime()).to.equal(600)
    })


  })

})
