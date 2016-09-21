import Transition from '../src/group/transition'
import Params from '../src/group/params'

describe('transition', () => {

  it('should fail with invalid frame', () => {
    expect(() => new Transition(null)).to.throw(/Invalid frame/)
    expect(() => new Transition({})).to.throw(/Invalid frame/)
  })

  it ('should have defaults', () => {
    expect(new Transition(0).params).to.be.an.instanceOf(Params)
    expect(new Transition(0).ease).equal('Linear.easeNone')
    expect(new Transition(0).frame).equal(0)
  })


})
