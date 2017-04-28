import Keyframe from '../src/group/keyframe'

describe.only('keyframe', () => {

  it('should create a keyframe', () => {
    const kf = new Keyframe('0.2s', 10, 'Linear.easeNone')
    expect(kf).to.have.property('time', '0.2s')
    expect(kf).to.have.property('value', 10)
    expect(kf).to.have.property('ease', 'Linear.easeNone')
  })

  it('should create an object', async () => {
    expect(new Keyframe('1s', 20, 'Power1.easeOut').toObject()).to.deep.equal({
      '1s': { value: 20, ease: 'Power1.easeOut' }
    })
  })

  it('should fail on invalid time', async() => {
    expect(() => new Keyframe(10, 10)).to.throw(/time is invalid/)
  })

})
