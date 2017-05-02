import Keyframe from '../src/group/keyframe'

describe('keyframe', () => {

  it('should create a keyframe', () => {
    const kf = new Keyframe(0.2, 10, 'Linear.easeNone')
    expect(kf).to.have.property('time', 0.2)
    expect(kf).to.have.property('value', 10)
    expect(kf).to.have.property('ease', 'Linear.easeNone')
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

})
