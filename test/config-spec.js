import config from '../src/config/config'
import setup from '../src/config/setup'
import { gsap } from '../src/utils'

const configGsap = { ...config.gsap }

describe('config', () => {

  beforeEach(() => {
    sinon.spy(gsap, 'ensure')
  })

  afterEach(() => {
    config.gsap = { ...configGsap }
    gsap.ensure.restore()
  })

  it('should ensure gsap when no gsap instances are provided', async () => {
    expect(config).to.have.deep.property('gsap.tween', null)
    expect(config).to.have.deep.property('gsap.timeline', null)
    expect(gsap.ensure.callCount).to.equal(0)

    await setup()

    expect(gsap.ensure.callCount).to.equal(1)
    expect(config).to.have.deep.property('gsap.tween').to.be.a('function')
    expect(config).to.have.deep.property('gsap.timeline').to.be.a('function')
  })

  it('should ensure gsap when invalid gsap instances are provided', async () => {
    expect(config).to.have.deep.property('gsap.tween', null)
    expect(config).to.have.deep.property('gsap.timeline', null)
    expect(gsap.ensure.callCount).to.equal(0)

    await setup({ timeline: 123, tween: 123 })

    expect(gsap.ensure.callCount).to.equal(1)
    expect(config).to.have.deep.property('gsap.tween').to.be.a('function')
    expect(config).to.have.deep.property('gsap.timeline').to.be.a('function')
  })

  it('should setup gsap through instances', async () => {
    expect(config).to.have.deep.property('gsap.tween', null)
    expect(config).to.have.deep.property('gsap.timeline', null)
    expect(gsap.ensure.callCount).to.equal(0)

    await setup({
      timeline: () => {},
      tween: () => {}
    })

    expect(gsap.ensure.callCount).to.equal(0)
    expect(config).to.have.deep.property('gsap.tween').to.be.a('function')
    expect(config).to.have.deep.property('gsap.timeline').to.be.a('function')
  })

})
