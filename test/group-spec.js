import { gsap } from '../src/utils'
import config from '../src/config/config'
import Group, { groupDefaults } from '../src/group/group'
import Timelines from '../src/group/timelines'

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
      const group = new Group()

      expect(group.fps).equal(groupDefaults.fps)
      expect(group.name).equal(groupDefaults.name)
      expect(group.timelines).equal(groupDefaults.timelines)
    })

    it('should create a named group', () => {
      const group = new Group({ name: 'ghost' })
      expect(group.name).equal('ghost')
    })

    it('should have empty timelines', () => {
      const group = new Group()
      expect(group.timelines).to.be.an.instanceOf(Timelines)
      expect(group.timelines).to.have.lengthOf(0)
    })

    it('should parse group from object', () => {
      const group = new Group({
        name: 'my-group',
        fps: 25,
        timelines: [
          { transformObject: divA, transitions: [{ frame: 0, params: { x: 0, y: 0 } }] },
          { transformObject: divB, transitions: [{ frame: 100, params: { x: 100, y: 200 } }] },
          { transformObject: divC, transitions: [{ frame: 200, params: { x: 400, y: 400 }, ease: 'custom' }] },
        ]
      })

      expect(group.timelines).to.be.an.instanceOf(Timelines)
      expect(group.timelines.toArray()).to.deep.equal([
        {
          type: 'dom',
          transformObject: divA,
          transitions: [{ frame: 0, params: { x: 0, y: 0 }, ease: 'Linear.easeNone' }]
        },
        {
          type: 'dom',
          transformObject: divB,
          transitions: [{ frame: 100, params: { x: 100, y: 200 }, ease: 'Linear.easeNone' }]
        },
        {
          type: 'dom',
          transformObject: divC,
          transitions: [{ frame: 200, params: { x: 400, y: 400 }, ease: 'custom' }]
        },
      ])
    })

    it('should fail set invalid fps', () => {
      const group = new Group()
      expect(group.fps).equal(30)
      expect(() => { group.fps = '12' }).to.throw(/Fps needs to be a number/)
    })

    it('should fail set invalid name', () => {
      const group = new Group()
      expect(group.name).equal('untitled')
      expect(() => { group.name = 123 }).to.throw(/Name needs to be a string/)
    })

  })

  describe('toObject', () => {
    it('should convert group to valid object', () => {
      const group = new Group({
        name: 'monkey-business',
        fps: 10,
        timelines: [
          { label: 'monkey', transformObject: divA },
          { label: 'eyes', transformObject: divB, transitions: [{ frame: 0 }] },
          { label: 'mouth', transformObject: divC }
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
            transitions: []
          },
          {
            type: 'dom',
            label: 'eyes',
            transformObject: divB,
            transitions: [{ frame: 0, params: {}, ease: 'Linear.easeNone' }]
          },
          {
            type: 'dom',
            label: 'mouth',
            transformObject: divC,
            transitions: []
          }
        ]
      })
    })
  })

  describe('construct', () => {

    let group

    beforeEach(() => {
      group = new Group()
      config.gsap = { ...configGsap }
    })

    afterEach(() => {
      config.gsap = { ...configGsap }
    })

    describe('ensure gsap', () => {

      beforeEach(() => {
        config.gsap.autoInjectUrl = 'test/fixtures/gsap.js'
      })

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

    })

  })

})
