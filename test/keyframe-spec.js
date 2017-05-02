import Keyframe from '../src/group/keyframe'

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

  it('should have evaluable value', () => {
    expect(new Keyframe(0, '{ hello() }').isEval()).to.be.true
    expect(new Keyframe(0, '+=123').isEval()).to.be.false
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
    
  })

})
