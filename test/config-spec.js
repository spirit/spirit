import config from '../src/config/config'
import setup from '../src/config/setup'
import { gsap } from '../src/utils'

const configGsap = { ...config.gsap }

describe('config', () => {

  let sandbox

  beforeEach(() => {
    config.gsap.autoInjectUrl = 'test/fixtures/gsap.js'

    sandbox = sinon.createSandbox()
    sandbox.spy(gsap, 'ensure')
    sandbox.spy(gsap, 'loadFromCDN')
  })

  afterEach(() => {
    sandbox.restore()
    config.gsap = { ...configGsap }

    delete window.TweenMax
    delete window.TweenLite
    delete window.TimelineMax
    delete window.TimelineLite
  })

  it('should load gsap from CDN on setup()', async () => {
    expect(config).to.have.nested.property('gsap.tween', null)
    expect(config).to.have.nested.property('gsap.timeline', null)
    expect(gsap.ensure.callCount).to.equal(0)
    expect(gsap.loadFromCDN.callCount).to.equal(0)

    await setup()

    expect(gsap.ensure.callCount).to.equal(1)
    expect(gsap.loadFromCDN.callCount).to.equal(1)

    expect(config).to.have.nested.property('gsap.tween').to.be.a('function')
    expect(config).to.have.nested.property('gsap.timeline').to.be.a('function')
  })

  it('should load gsap from CDN on invalid gsap params', async () => {
    expect(config).to.have.nested.property('gsap.tween', null)
    expect(config).to.have.nested.property('gsap.timeline', null)
    expect(gsap.ensure.callCount).to.equal(0)
    expect(gsap.loadFromCDN.callCount).to.equal(0)

    await setup({ timeline: 123, tween: 123 })

    expect(gsap.ensure.callCount).to.equal(1)
    expect(gsap.loadFromCDN.callCount).to.equal(1)
    expect(config).to.have.nested.property('gsap.tween').to.be.a('function')
    expect(config).to.have.nested.property('gsap.timeline').to.be.a('function')
  })

  it('should setup gsap through instances', async () => {
    expect(config).to.have.nested.property('gsap.tween', null)
    expect(config).to.have.nested.property('gsap.timeline', null)
    expect(gsap.ensure.callCount).to.equal(0)
    expect(gsap.loadFromCDN.callCount).to.equal(0)

    await setup({ timeline: () => {}, tween: () => {} })

    expect(gsap.ensure.callCount).to.equal(1)
    expect(gsap.loadFromCDN.callCount).to.equal(0)
    expect(config).to.have.nested.property('gsap.tween').to.be.a('function')
    expect(config).to.have.nested.property('gsap.timeline').to.be.a('function')
  })

  it('should setup gsap from window object (using *Max)', async () => {
    window.TweenMax = () => {}
    window.TimelineMax = () => {}

    expect(config).to.have.nested.property('gsap.tween', null)
    expect(config).to.have.nested.property('gsap.timeline', null)
    expect(gsap.ensure.callCount).to.equal(0)
    expect(gsap.loadFromCDN.callCount).to.equal(0)

    await setup()

    expect(gsap.ensure.callCount).to.equal(1)
    expect(gsap.loadFromCDN.callCount).to.equal(0)
    expect(config).to.have.nested.property('gsap.tween').to.be.a('function')
    expect(config).to.have.nested.property('gsap.timeline').to.be.a('function')
  })

  it('should setup gsap from window object (using *Lite)', async () => {
    window.TweenLite = () => {}
    window.TimelineLite = () => {}

    expect(config).to.have.nested.property('gsap.tween', null)
    expect(config).to.have.nested.property('gsap.timeline', null)
    expect(gsap.ensure.callCount).to.equal(0)
    expect(gsap.loadFromCDN.callCount).to.equal(0)

    await setup()

    expect(gsap.ensure.callCount).to.equal(1)
    expect(gsap.loadFromCDN.callCount).to.equal(0)
    expect(config).to.have.nested.property('gsap.tween').to.be.a('function')
    expect(config).to.have.nested.property('gsap.timeline').to.be.a('function')
  })

})
