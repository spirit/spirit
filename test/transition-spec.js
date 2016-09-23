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

  describe('dispatch changes', () => {

    let transition,
        spy

    beforeEach(() => {
      transition = new Transition(0)
      spy = sinon.spy()
    })

    it ('should change frame', () => {
      transition.on('change:frame', spy)
      transition.frame = 10
      expect(spy.withArgs(10).calledOnce).to.be.true
    })

    it ('should change ease', () => {
      transition.on('change:ease', spy)
      transition.ease = 'Strong.easeOut'
      expect(spy.withArgs('Strong.easeOut').calledOnce).to.be.true
    })

    it ('should change params', () => {
      const newParams = new Params()

      transition.on('change:params', spy)
      transition.params = newParams
      expect(spy.withArgs(newParams).calledOnce).to.be.true
    })


  })


})
