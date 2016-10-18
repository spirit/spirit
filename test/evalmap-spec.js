import EvalMap from '../src/group/evalmap'

describe('evalmap', () => {

  it('should fail on invalid regex', () => {
    expect(() => new EvalMap(null, {})).to.throw(/Invalid expression/)
    expect(() => new EvalMap(123, {})).to.throw(/Invalid expression/)
  })

  it('should fail on invalid map', () => {
    expect(() => new EvalMap(/test/, null)).to.throw(/Invalid mapping/)
    expect(() => new EvalMap(/test/, undefined)).to.throw(/Invalid mapping/)
  })

  it ('should have a valid eval map', () => {
    expect(new EvalMap(/test/, 123).regex).to.be.an.instanceOf(RegExp)
    expect(new EvalMap(/test/, 123).map).equal(123)
  })
})
