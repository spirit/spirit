import config from '../src/config/config'
import setup from '../src/config/setup'
import { Group, Timelines } from '../src/group'

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

      expect(group.timeScale).to.equal(1)
      expect(group.name).equal('test')
      expect(group.timelines).to.be.an.instanceOf(Timelines)
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
        timelines: [
          {
            transformObject: divA,
            path: 'div[0]',
            props: {
              x: { '10s': { value: 100 }, '20s': { value: 400 } },
              y: { '10s': { value: 100 }, '20s': { value: 400 } }
            }
          },
          {
            transformObject: divB,
            path: 'div[1]',
            props: {
              x: { '0s': { value: 0 }, '3s': { value: 1000 } },
              y: { '0s': { value: 0, ease: 'Expo.easeOut' } }
            }
          },
          {
            transformObject: divC,
            path: 'div[2]',
            props: {
              x: { '0s': { value: 0 }, '20s': { value: 10 } },
              y: { '0s': { value: 0 }, '20s': { value: 100 } }
            }
          }
        ]
      })

      expect(group.timelines).to.be.an.instanceOf(Timelines)
      expect(group.timelines.toArray()).to.deep.equal([
        {
          type: 'dom',
          transformObject: divA,
          path: 'div[0]',
          props: {
            x: { '10s': { value: 100, ease: null }, '20s': { value: 400, ease: null } },
            y: { '10s': { value: 100, ease: null }, '20s': { value: 400, ease: null } }
          }
        },
        {
          type: 'dom',
          transformObject: divB,
          path: 'div[1]',
          props: {
            x: { '0s': { value: 0, ease: null }, '3s': { value: 1000, ease: null } },
            y: { '0s': { value: 0, ease: 'Expo.easeOut' } }
          }
        },
        {
          type: 'dom',
          transformObject: divC,
          path: 'div[2]',
          props: {
            x: { '0s': { value: 0, ease: null }, '20s': { value: 10, ease: null } },
            y: { '0s': { value: 0, ease: null }, '20s': { value: 100, ease: null } }
          }
        }
      ])
    })

    it('should fail set invalid timeScale', () => {
      const group = new Group({ name: 'group' })
      expect(group.timeScale).equal(1)
      expect(() => { group.timeScale = '12' }).to.throw(/timeScale needs to be a number/)
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
        timeScale: 0.5,
        timelines: [
          {
            transformObject: divA,
            path: 'div[0]',
            props: {
              x: { '0s': { value: 0 }, '10s': { value: 100 } },
              y: { '0s': { value: 0 }, '10s': { value: 100 } }
            }
          }
        ]
      })
      expect(g).to.be.an.instanceOf(Group)
      expect(g.toObject()).to.deep.equal({
        timeScale: 0.5,
        name: 'ghost',
        timelines: [
          {
            type: 'dom',
            transformObject: divA,
            path: 'div[0]',
            props: {
              x: { '0s': { value: 0, ease: null }, '10s': { value: 100, ease: null } },
              y: { '0s': { value: 0, ease: null }, '10s': { value: 100, ease: null } }
            }
          }
        ]
      })
    })
  })

  describe('toObject', () => {
    it('should convert group to valid object', () => {
      const group = new Group({
        name: 'monkey-business',
        timeScale: 5,
        timelines: [
          { label: 'monkey', transformObject: divA, path: 'div[0]' },
          { label: 'eyes', transformObject: divB, path: 'div[1]', props: { z: { '0s': { value: 0 } } } },
          { label: 'mouth', transformObject: divC, path: 'div[2]' }
        ]
      })

      expect(group.toObject()).to.deep.equal({
        timeScale: 5,
        name: 'monkey-business',
        timelines: [
          {
            type: 'dom',
            transformObject: divA,
            props: {},
            label: 'monkey',
            path: 'div[0]'
          },
          {
            type: 'dom',
            transformObject: divB,
            props: { z: { '0s': { value: 0, ease: null } } },
            label: 'eyes',
            path: 'div[1]'
          },
          {
            type: 'dom',
            transformObject: divC,
            props: {},
            label: 'mouth',
            path: 'div[2]'
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

    describe('no gsap', () => {

      it('should throw no gsap found', () => {
        expect(() => group.construct()).to.throw(/GSAP cannot be found/)
      })

      it('should not throw gsap not found', async () => {
        await setup()
        expect(() => group.construct()).to.not.throw(/GSAP cannot be found/)
      })

      it('should fail when cannot construct timeline', async () => {
        await setup()

        group.timelines = [{ transformObject: divA, path: 'div[0]' }]
        group.timelines.get(divA).transformObject = null // needs to be set, silently fails

        expect(() => group.construct()).to.throw(/transformObject is not an Element/)
      })

    })

    describe('modify timeline', () => {

      beforeEach(async () => {
        await setup()

        const tlA = {
          transformObject: divA,
          path: 'div[0]',
          props: {
            x: { '0s': { value: 0 }, '10s': { value: 1000 } },
            y: { '0s': { value: 0 }, '20s': { value: 1000 } }
          }
        }

        const tlB = {
          transformObject: divB,
          path: 'div[1]',
          props: {
            scale: { '25s': { value: 1.5 } }
          }
        }

        const tlC = {
          transformObject: divC,
          path: 'div[2]',
          props: {
            skewX: { '5s': { value: 300 } },
            rotation: { '15s': { value: '1turn' } }
          }
        }

        group.timelines = [tlA, tlB, tlC]
      })

      it('should create a valid gsap timeline', async () => {
        const tl = group.construct()
        expect(tl).to.be.an.instanceOf(config.gsap.timeline)
        expect(group.timeline).to.equal(tl)
        expect(tl.duration()).to.equal(25)
      })

      it('should kill and clear existing timeline', async () => {
        group.construct()

        expect(group.timelines.get(divA).toObject()).to.have.deep.property('props.x.0s.value', 0)

        const spyKill = sandbox.spy(group.timeline, 'kill')
        const spyClear = sandbox.spy(group.timeline, 'clear')

        group.construct()

        expect(spyKill.calledOnce).to.be.true
        expect(spyClear.calledOnce).to.be.true
      })
    })
  })

  describe('timeScale', () => {
    let group

    beforeEach(async () => {
      config.gsap.autoInjectUrl = 'test/fixtures/gsap.js'
      await setup()

      group = new Group({ name: 'group' })
      group.timelines = [
        {
          transformObject: divA,
          path: 'div[0]',
          props: { x: { '0s': { value: 0 }, '12s': { value: 1000, ease: 'Linear.easeNone' } } }
        }
      ]
    })

    afterEach(() => {
      config.gsap = { ...configGsap }
    })

    it('should update timeScale on timeline', () => {
      const tl = group.construct()
      const timeScale = 0.25

      expect(group).to.have.property('timeScale', 1)
      expect(tl.timeScale()).to.equal(1)
      expect(tl.duration()).to.equal(12)
      expect(tl.endTime() - tl.startTime()).to.equal(12)

      group.timeScale = timeScale

      expect(group).to.have.property('timeScale', timeScale)
      expect(tl.timeScale()).to.equal(timeScale)
      expect(tl.duration()).to.equal(12)
      expect(tl.endTime() - tl.startTime()).to.equal(12 / timeScale)
    })

  })

  describe('dipatch events', () => {
    let group,
        spy

    before(async () => {
      config.gsap.autoInjectUrl = 'test/fixtures/gsap.js'
      await setup()
    })

    after(() => {
      config.gsap = { ...configGsap }
    })

    beforeEach(() => {
      spy = sinon.spy()

      group = new Group({
        name: 'dispatch-events',
        timelines: [
          {
            transformObject: divA,
            path: 'div[0]',
            props: {}
          }
        ]
      })
    })

    it('should change name', () => {
      group.on('change:name', spy)
      group.name = 'my-animation'

      expect(spy.callCount).to.equal(1)
      expect(spy.getCall(0).args[0]).to.have.deep.property('changed.type', 'name')
      expect(spy.getCall(0).args[0]).to.have.deep.property('changed.from', 'dispatch-events')
      expect(spy.getCall(0).args[0]).to.have.deep.property('changed.to', 'my-animation')
    })

    it('should change timeScale', () => {
      group.on('change:timeScale', spy)
      group.timeScale = 0.4

      expect(spy.callCount).to.equal(1)
      expect(spy.getCall(0).args[0]).to.have.deep.property('changed.type', 'timeScale')
      expect(spy.getCall(0).args[0]).to.have.deep.property('changed.from', 1)
      expect(spy.getCall(0).args[0]).to.have.deep.property('changed.to', 0.4)
    })

    it('should change timelines', () => {
      group.on('change:timelines', spy)
      group.timelines = [{ transformObject: divB, path: 'div[1]', props: {} }]

      expect(spy.callCount).to.equal(1)
      expect(spy.getCall(0).args[0]).to.have.deep.property('changed.type', 'timelines')
    })

    it('should change duration', () => {
      group.timelines.get(divA).props.add({ x: { '50s': { value: 10 } } })
      const tl = group.construct()

      expect(tl.duration()).to.equal(50)
      expect(tl.timeScale()).to.equal(1)

      group.on('change:duration', spy)
      group.duration = 5

      expect(tl.duration()).to.equal(50)
      expect(group.duration).to.equal(50)
      expect(tl.timeScale()).to.equal(10)

      expect(spy.callCount).to.equal(1)
      expect(spy.getCall(0).args[0]).to.have.deep.property('changed.type', 'duration')
      expect(spy.getCall(0).args[0]).to.have.deep.property('changed.from', 50)
      expect(spy.getCall(0).args[0]).to.have.deep.property('changed.to', 5)
    })

    it('should construct', () => {
      group.on('construct', spy)

      const tl = group.construct()

      expect(spy.callCount).to.equal(1)
      expect(spy.withArgs(tl).callCount).to.equal(1)
      expect(spy.withArgs(group.timeline).callCount).to.equal(1)

      group.construct()
      group.construct()
      group.construct()

      expect(spy.callCount).to.equal(4)
    })
  })

  describe('timing', () => {
    let group

    before(async () => {
      config.gsap.autoInjectUrl = 'test/fixtures/gsap.js'
      await setup()
    })

    after(() => {
      config.gsap = { ...configGsap }
    })

    beforeEach(() => {
      group = new Group({
        name: 'test',
        timelines: [
          {
            transformObject: divA,
            path: 'div[0]',
            props: {
              x: {
                '0s': { value: 0 },
                '10s': { value: 1000 }
              },
              y: {
                '0s': { value: 100 },
                '10s': { value: 200 }
              }
            }
          }
        ]
      })

      group.construct()
    })

    it('should start with x=0', () => {
      expect(divA).to.have.deep.property('_gsTransform.x', 0)
      expect(divA).to.have.deep.property('_gsTransform.y', 100)
    })

    it('should progress linear by default', () => {
      group.timeline.progress(0.25)
      expect(divA).to.have.deep.property('_gsTransform.x', 250)
      expect(divA).to.have.deep.property('_gsTransform.y', 125)

      group.timeline.progress(0.5)
      expect(divA).to.have.deep.property('_gsTransform.x', 500)
      expect(divA).to.have.deep.property('_gsTransform.y', 150)

      group.timeline.progress(0.75)
      expect(divA).to.have.deep.property('_gsTransform.x', 750)
      expect(divA).to.have.deep.property('_gsTransform.y', 175)

      group.timeline.progress(0.9)
      expect(divA).to.have.deep.property('_gsTransform.x', 900)
      expect(divA).to.have.deep.property('_gsTransform.y', 190)

      group.timeline.progress(1)
      expect(divA).to.have.deep.property('_gsTransform.x', 1000)
      expect(divA).to.have.deep.property('_gsTransform.y', 200)
    })
  })

})
