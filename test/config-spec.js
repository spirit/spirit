import config from '../src/config/config'
import setup from '../src/config/setup'

describe('config', () => {

  it('should reject invalid type', () => {
    expect(() => setup(123)).to.throw(/Invalid type/)
  })

  it('should reject when tween or timeline is not found', () => {
    expect(() => setup({})).to.throw(/Invalid object/)
  })

  it ('should store gsap into config', () => {
    setup({
      tween: function(){},
      timeline: function(){}
    })

    expect(config.gsap.tween).to.be.a('function')
    expect(config.gsap.timeline).to.be.a('function')
  })

})
