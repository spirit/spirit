import Keyframe from '../src/group/keyframe'
import EvalMap from '../src/group/evalmap'

describe('keyframe', () => {

  it('should create a keyframe', () => {
    const keyframe = new Keyframe(0.2, 10, 'Linear.easeNone')
    expect(keyframe).to.have.property('time', 0.2)
    expect(keyframe).to.have.property('value', 10)
    expect(keyframe).to.have.property('ease', 'Linear.easeNone')
  })

  it('should create an object', () => {
    expect(new Keyframe(1, 20, 'Power1.easeOut').toObject()).to.deep.equal({
      '1s': { value: 20, ease: 'Power1.easeOut' }
    })
  })

  it('should fail on invalid time', () => {
    expect(() => new Keyframe({}, 10)).to.throw(/Time must be a number/)
    expect(() => new Keyframe('1s', 10)).to.throw(/Time must be a number/)
  })

  describe('eval', () => {
    it('should have evaluable value', () => {
      expect(new Keyframe(0, '{ hello() }').isEval()).to.be.true
      expect(new Keyframe(0, '+=123').isEval()).to.be.false
    })
  })

  describe('eval mapping', () => {
    let keyframe

    beforeEach(() => {
      keyframe = new Keyframe(0, 0)
    })

    it('should evaluate mapping for number', () => {
      expect(keyframe).to.have.property('value', 0)

      keyframe.value = '{ test + 5 }'
      keyframe.mappings = [new EvalMap(/test/g, 3)]

      expect(keyframe).to.have.property('value', 8)
    })

    it('should evaluate mapping for object', () => {
      keyframe.value = '{ foo.bar + 10 }'
      keyframe.mappings = [new EvalMap(/foo/g, { bar: 3 })]

      expect(keyframe).to.have.property('value', 13)
    })

    it('should evaluate mapping for function', () => {
      keyframe.value = '{ bar() - 3 }'
      keyframe.mappings = [new EvalMap(/bar/g, function() { return 5 })]
      expect(keyframe).to.have.property('value', 2)
    })

    it('should evaluate multiple mappings', () => {
      keyframe.value = '{ one() + two() }'
      keyframe.mappings = [
        new EvalMap(/one/, function() { return 1 }),
        new EvalMap(/two/, function() { return 2 })
      ]

      expect(keyframe).to.have.property('value', 3)
    })

    it('should fail on invaid evaluation', () => {
      keyframe.value = '{ one() + two() }'
      keyframe.mappings = [new EvalMap(/one/, function() { return 1 })]

      expect(() => keyframe.value).to.throw(/two is not defined/)
    })

    it('should evaluate global (window) function', () => {
      global.sayHello = name => `Hi there ${name}!`

      keyframe.value = `{ sayHello('amigo') }`
      expect(keyframe).to.have.property('value', 'Hi there amigo!')

      delete global.sayHello
    })

    it('should evaluate doubles', () => {
      keyframe.value = '{ n * n * n }'
      keyframe.mappings = [new EvalMap(/n/g, 5)]

      expect(keyframe).to.have.property('value', 125)
    })

    it('should be able to set another value after error is thrown', () => {
      keyframe.mappings = [new EvalMap(/none/, 123)]
      keyframe.value = '{ x }'

      expect(() => keyframe.value).to.throw(/x is not defined/)
      expect(() => { keyframe.value = '{ none }' }).to.not.throw()
      expect(keyframe).to.have.property('value', 123)
    })
  })

  describe('from object', () => {

    it('should fail on parse invalid object', () => {
      expect(() => Keyframe.fromObject({})).to.throw(/Object is invalid/)
      expect(() => Keyframe.fromObject({ x: 123 })).to.throw(/Object is invalid/)
      expect(() => Keyframe.fromObject({ time: 123 })).to.throw(/Object is invalid/)
      expect(() => Keyframe.fromObject(234)).to.throw(/Object is invalid/)
      expect(() => Keyframe.fromObject([])).to.throw(/Object is invalid/)
    })

    it('should fail on parse invalid time', () => {
      expect(() => Keyframe.fromObject({ 'invalid-time': { value: 10 } })).to.throw(/Object is invalid/)
    })

    it('should fail on parse invalid value', () => {
      expect(() => Keyframe.fromObject({ '1s': { value: undefined } })).to.throw(/Object is invalid/)
      expect(() => Keyframe.fromObject({ '1s': { value: null } })).to.throw(/Object is invalid/)
    })

    it('should parse valid object', () => {
      const keyframe = Keyframe.fromObject({ '02s': { value: '+=10deg' } })

      expect(keyframe).to.have.property('time', 2)
      expect(keyframe).to.have.property('value', '+=10deg')
      expect(keyframe).to.have.property('ease', null)
    })

    it('should parse value as string', () => {
      const keyframe = Keyframe.fromObject({ '1s': 'bottom-left' })

      expect(keyframe).to.have.property('time', 1)
      expect(keyframe).to.have.property('value', 'bottom-left')
      expect(keyframe).to.have.property('ease', null)
    })

    it('should parse value as number', () => {
      const keyframe = Keyframe.fromObject({ '1s': 20 })

      expect(keyframe).to.have.property('time', 1)
      expect(keyframe).to.have.property('value', 20)
      expect(keyframe).to.have.property('ease', null)
    })

  })

  describe('dispatch events', () => {
    let keyframe, spy

    beforeEach(() => {
      keyframe = new Keyframe(0, 0)
      spy = sinon.spy()
    })

    it('should dispatch change', () => {
      keyframe.on('change', spy)

      keyframe.time = 1
      keyframe.value = 10
      keyframe.ease = 'Power2.easeOut'

      expect(spy.callCount).to.equal(3)

      expect(spy.getCall(0).args[0]).to.deep.equal({
        previous: { '0s': { value: 0, ease: null } },
        current: { '1s': { value: 0, ease: null } },
        changed: { type: 'time', from: 0, to: 1 }
      })

      expect(spy.getCall(1).args[0]).to.deep.equal({
        previous: { '1s': { value: 0, ease: null } },
        current: { '1s': { value: 10, ease: null } },
        changed: { type: 'value', from: 0, to: 10 }
      })

      expect(spy.getCall(2).args[0]).to.deep.equal({
        previous: { '1s': { value: 10, ease: null } },
        current: { '1s': { value: 10, ease: 'Power2.easeOut' } },
        changed: { type: 'ease', from: null, to: 'Power2.easeOut' }
      })
    })

    it('should dispatch change:time', () => {
      keyframe.on('change:time', spy)

      keyframe.time = 10.5
      keyframe.ease = 'Power2.easeOut'
      keyframe.value++
      keyframe.time = 12

      expect(spy.callCount).to.equal(2)

      expect(spy.getCall(0).args[0]).to.deep.equal({
        previous: { '0s': { value: 0, ease: null } },
        current: { '10.5s': { value: 0, ease: null } },
        changed: { type: 'time', from: 0, to: 10.5 }
      })

      expect(spy.getCall(1).args[0]).to.deep.equal({
        previous: { '10.5s': { value: 1, ease: 'Power2.easeOut' } },
        current: { '12s': { value: 1, ease: 'Power2.easeOut' } },
        changed: { type: 'time', from: 10.5, to: 12 }
      })
    })

    it('should dispatch change:value', () => {
      keyframe.on('change:value', spy)

      keyframe.time = 10.5
      keyframe.ease = 'Power2.easeOut'
      keyframe.value++
      keyframe.time = 12

      expect(spy.callCount).to.equal(1)

      expect(spy.getCall(0).args[0]).to.deep.equal({
        previous: { '10.5s': { value: 0, ease: 'Power2.easeOut' } },
        current: { '10.5s': { value: 1, ease: 'Power2.easeOut' } },
        changed: { type: 'value', from: 0, to: 1 }
      })
    })

    it('should dispatch change:ease', () => {
      keyframe.on('change:ease', spy)

      keyframe.time = 10.5
      keyframe.ease = 'Power2.easeOut'
      keyframe.value++
      keyframe.time = 12

      expect(spy.callCount).to.equal(1)

      expect(spy.getCall(0).args[0]).to.deep.equal({
        previous: { '10.5s': { value: 0, ease: null } },
        current: { '10.5s': { value: 0, ease: 'Power2.easeOut' } },
        changed: { type: 'ease', from: null, to: 'Power2.easeOut' }
      })
    })

    it('should destroy listeners', () => {
      keyframe.on('change', spy)
      keyframe.time = 12

      keyframe.destroy()

      keyframe.time = 24
      expect(spy.callCount).to.equal(1)
      expect(spy.getCall(0).args[0]).to.deep.equal({
        previous: { '0s': { value: 0, ease: null } },
        current: { '12s': { value: 0, ease: null } },
        changed: { type: 'time', from: 0, to: 12 }
      })
    })

  })

})
