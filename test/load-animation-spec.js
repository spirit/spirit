import loadAnimation from '../src/loadAnimation'
import registry from '../src/registry/registry'
import config from '../src/config/config'
import { cache, req } from '../src/utils/jsonloader'
import { is } from '../src/utils'
import { post } from './fixtures/group/dom'

const gsapConfig = { ...config.gsap }

// helper
const createContainers = (c, num) => {
  let inner = ''
  for (let i = 1; i <= num; i++) {
    inner += `
        <div class="container-${i}">
          ${post(`post-${i}-1`).outerHTML}
          ${post(`post-${i}-2`).outerHTML}
          ${post(`post-${i}-3`).outerHTML}
        </div>
      `
  }
  c.innerHTML = inner

  let result = []
  for (let i = 1; i <= num; i++) {
    result.push(document.querySelector(`.container-${i}`))
  }
  return result
}

describe('load-animation', () => {
  let div

  before(() => { config.gsap.autoInjectUrl = 'test/fixtures/gsap.js' })
  after(() => { config.gsap = { ...gsapConfig } })

  beforeEach(() => {
    div = document.createElement('div')
    document.body.appendChild(div)
    registry.clear()
  })

  afterEach(() => {
    document.body.removeChild(div)
  })

  describe('parse', () => {

    describe('with animationData', () => {

      it('should create animations from object', async () => {
        const result = await loadAnimation({ animationData: { name: 'a' } })

        expect(result).to.be.an.instanceOf(config.gsap.timeline)
        expect(registry).to.have.lengthOf(1)
        expect(registry.at(0)).to.have.property('name', 'a')
        expect(registry.at(0)).to.have.deep.property('_list.rootEl', document.body)
      })

      it('should create animations from array', async () => {
        const result = await loadAnimation({ animationData: [{ name: 'b' }] })

        expect(result).to.be.an.instanceOf(config.gsap.timeline)
        expect(registry).to.have.lengthOf(1)
        expect(registry.at(0)).to.have.property('name', 'b')
        expect(registry.at(0)).to.have.deep.property('_list.rootEl', document.body)
      })

      it('should create animations from multi array', async () => {
        const result = await loadAnimation({
          animationData: [
            { name: 'a' },
            { name: 'b' },
            { name: 'c' }
          ]
        })

        expect(result).to.be.an('object')
        expect(result).to.have.all.keys('a', 'b', 'c')

        expect(registry).to.have.lengthOf(3)
        expect(registry.at(0)).to.have.property('name', 'a')
        expect(registry.at(0)).to.have.deep.property('_list.rootEl', document.body)
        expect(registry.at(1)).to.have.property('name', 'b')
        expect(registry.at(1)).to.have.deep.property('_list.rootEl', document.body)
        expect(registry.at(2)).to.have.property('name', 'c')
        expect(registry.at(2)).to.have.deep.property('_list.rootEl', document.body)
      })

      it('should create animations assigned to container', async () => {
        const result = await loadAnimation({
          container: div,
          animationData: { name: 'ghost' }
        })

        expect(result).to.be.an.instanceOf(config.gsap.timeline)
        expect(registry.at(0)).to.have.deep.property('_list.rootEl', div)
      })

      it('should create groups with parsed root', async () => {
        const containers = createContainers(div, 1)
        const result = await loadAnimation({
          animationData: {
            name: 'ghost-animation',
            root: { path: 'div[1]/div[1]' }
          }
        })

        expect(result).to.be.an.instanceOf(config.gsap.timeline)
        expect(registry.at(0)).to.have.deep.property('_list.rootEl', containers[0])
      })

      it('should create multiple groups with parsed roots', async () => {
        const containers = createContainers(div, 3)

        const result = await loadAnimation({
          animationData: [
            { name: 'a', root: { path: 'div[1]/div[1]' } },
            { name: 'b', root: { path: 'div[1]/div[2]' } },
            { name: 'c', root: { path: 'div[1]/div[3]' } },
          ]
        })

        expect(result).to.be.an('object')
        expect(result).to.have.all.keys('a', 'b', 'c')

        expect(registry.at(0)).deep.have.deep.property('_list.rootEl', containers[0])
        expect(registry.at(1)).deep.have.deep.property('_list.rootEl', containers[1])
        expect(registry.at(2)).deep.have.deep.property('_list.rootEl', containers[2])
      })

      it('should throw error on invalid animation data', async () => {
        const load = animationData => resolvePromise(loadAnimation({ animationData }))

        expect(await load('aa')).to.be.an('error').to.match(/Invalid animation data/)
        expect(await load(1234)).to.be.an('error').to.match(/Invalid animation data/)
        expect(await load({})).to.be.an('error').to.match(/Cannot create group without a name/)
      })

    })

    describe('with load path', () => {
      let sandbox

      beforeEach(() => {
        sandbox = sinon.sandbox.create()
      })

      afterEach(() => {
        sandbox.restore()
        Object.keys(cache).forEach(key => delete cache[key])
        Object.keys(req).forEach(key => delete req[key])
      })

      it('should create animations from object', async () => {
        stubXhr(sandbox, { responseText: JSON.stringify({ name: 'a' }) })

        const result = await loadAnimation({ path: 'animation.json' })

        expect(result).to.be.an.instanceOf(config.gsap.timeline)
        expect(registry).to.have.lengthOf(1)
        expect(registry.at(0)).to.have.property('name', 'a')
        expect(registry.at(0)).to.have.deep.property('_list.rootEl', document.body)
      })

      it('should create animations from array', async () => {
        stubXhr(sandbox, { responseText: JSON.stringify([{ name: 'b' }]) })

        const result = await loadAnimation({ path: 'animation.json' })

        expect(result).to.be.an.instanceOf(config.gsap.timeline)
        expect(registry).to.have.lengthOf(1)
        expect(registry.at(0)).to.have.property('name', 'b')
        expect(registry.at(0)).to.have.deep.property('_list.rootEl', document.body)
      })

      it('should create animations from multi array', async () => {
        stubXhr(sandbox, {
          responseText: JSON.stringify([
            { name: 'a' },
            { name: 'b' },
            { name: 'c' }
          ])
        })

        const result = await loadAnimation({ path: 'animation.json' })

        expect(result).to.be.an('object')
        expect(result).to.have.all.keys('a', 'b', 'c')

        expect(registry).to.have.lengthOf(3)
        expect(registry.at(0)).to.have.property('name', 'a')
        expect(registry.at(0)).to.have.deep.property('_list.rootEl', document.body)
        expect(registry.at(1)).to.have.property('name', 'b')
        expect(registry.at(1)).to.have.deep.property('_list.rootEl', document.body)
        expect(registry.at(2)).to.have.property('name', 'c')
        expect(registry.at(2)).to.have.deep.property('_list.rootEl', document.body)
      })

      it('should create animations assigned to container', async () => {
        stubXhr(sandbox, { responseText: JSON.stringify({ name: 'ghost' }) })

        const result = await loadAnimation({
          container: div,
          path: 'animations.json'
        })

        expect(result).to.be.an.instanceOf(config.gsap.timeline)
        expect(registry.at(0)).to.have.deep.property('_list.rootEl', div)
      })

      it('should create groups with parsed root', async () => {
        stubXhr(sandbox, {
          responseText: JSON.stringify({
            name: 'ghost-animation',
            root: { path: 'div[1]/div[1]' }
          })
        })

        const containers = createContainers(div, 1)
        const result = await loadAnimation({ path: 'animation.json' })

        expect(result).to.be.an.instanceOf(config.gsap.timeline)
        expect(registry.at(0)).to.have.deep.property('_list.rootEl', containers[0])
      })

      it('should create multiple groups with parsed roots', async () => {
        stubXhr(sandbox, {
          responseText: JSON.stringify([
            { name: 'a', root: { path: 'div[1]/div[1]' } },
            { name: 'b', root: { path: 'div[1]/div[2]' } },
            { name: 'c', root: { path: 'div[1]/div[3]' } },
          ])
        })

        const containers = createContainers(div, 3)
        const result = await loadAnimation({ path: 'animation.json' })

        expect(result).to.be.an('object')
        expect(result).to.have.all.keys('a', 'b', 'c')

        expect(registry.at(0)).deep.have.deep.property('_list.rootEl', containers[0])
        expect(registry.at(1)).deep.have.deep.property('_list.rootEl', containers[1])
        expect(registry.at(2)).deep.have.deep.property('_list.rootEl', containers[2])
      })

    })

  })

  describe('features', () => {
    let sandbox

    const createSimpleGroup = (name, path, opts = {}, props = { x: { '0s': 0, '0.001s': 100 } }) => ({
      name, timelines: [{ path, props }], ...opts
    })

    before(() => {
      sandbox = sinon.sandbox.create()
      sandbox.stub(is, 'isSVG', element => ['SVG', 'G', 'RECT'].includes(element.nodeName))
    })

    after(() => {
      sandbox.restore()
    })

    beforeEach(function() {
      createContainers(div, 3)
    })

    describe('autoPlay', () => {

      it('should auto play single group', async () => {
        const timeline = await loadAnimation({ animationData: createSimpleGroup('a', 'div[1]') })
        expect(timeline.isActive()).to.be.true
      })

      it('should not auto play single group', async () => {
        const timeline = await loadAnimation({
          autoPlay: false,
          animationData: createSimpleGroup('a', 'div[1]')
        })
        expect(timeline.isActive()).to.be.false
      })

      it('should auto play all groups', async () => {
        const groups = await loadAnimation({
          autoPlay: true,
          animationData: [
            createSimpleGroup('a', 'div[1]/div[1]'),
            createSimpleGroup('b', 'div[1]/div[2]'),
            createSimpleGroup('c', 'div[1]/div[3]')
          ]
        })
        expect(Object.keys(groups).map(g => groups[g].isActive())).to.deep.equal([true, true, true])
      })

      it('should not auto play all groups', async () => {
        const groups = await loadAnimation({
          autoPlay: false,
          animationData: [
            createSimpleGroup('a', 'div[1]/div[1]'),
            createSimpleGroup('b', 'div[1]/div[2]'),
            createSimpleGroup('c', 'div[1]/div[3]')
          ]
        })
        expect(Object.keys(groups).map(g => groups[g].isActive())).to.deep.equal([false, false, false])
      })

    })

    describe('loop', () => {

      it('should not loop single group', async () => {
        const timeline = await loadAnimation({ animationData: createSimpleGroup('a', 'div[1]') })
        expect(timeline.repeat()).to.equal(0)
      })

      it('should loop single group', async () => {
        const timeline = await loadAnimation({
          loop: true,
          animationData: createSimpleGroup('a', 'div[1]')
        })
        expect(timeline.repeat()).to.equal(-1)
      })

      it('should loop all groups', async () => {
        const groups = await loadAnimation({
          loop: true,
          animationData: [
            createSimpleGroup('a', 'div[1]/div[1]'),
            createSimpleGroup('b', 'div[1]/div[2]'),
            createSimpleGroup('c', 'div[1]/div[3]')
          ]
        })
        expect(Object.keys(groups).map(g => groups[g].repeat())).to.deep.equal([-1, -1, -1])
      })

      it('should not loop all groups', async () => {
        const groups = await loadAnimation({
          autoPlay: true,
          animationData: [
            createSimpleGroup('a', 'div[1]/div[1]'),
            createSimpleGroup('b', 'div[1]/div[2]'),
            createSimpleGroup('c', 'div[1]/div[3]')
          ]
        })
        expect(Object.keys(groups).map(g => groups[g].repeat())).to.deep.equal([0, 0, 0])
      })

    })

    describe('yoyo', () => {

      it('should not yoyo single group', async () => {
        const timeline = await loadAnimation({ animationData: createSimpleGroup('a', 'div[1]') })
        expect(timeline.yoyo()).to.be.false
      })

      it('should yoyo single group', async () => {
        const timeline = await loadAnimation({
          yoyo: true,
          animationData: createSimpleGroup('a', 'div[1]')
        })
        expect(timeline.yoyo()).to.be.true
      })

      it('should yoyo all groups', async () => {
        const groups = await loadAnimation({
          yoyo: true,
          animationData: [
            createSimpleGroup('a', 'div[1]/div[1]'),
            createSimpleGroup('b', 'div[1]/div[2]'),
            createSimpleGroup('c', 'div[1]/div[3]')
          ]
        })
        expect(Object.keys(groups).map(g => groups[g].yoyo())).to.deep.equal([true, true, true])
      })

      it('should not yoyo all groups', async () => {
        const groups = await loadAnimation({
          yoyo: false,
          animationData: [
            createSimpleGroup('a', 'div[1]/div[1]'),
            createSimpleGroup('b', 'div[1]/div[2]'),
            createSimpleGroup('c', 'div[1]/div[3]')
          ]
        })
        expect(Object.keys(groups).map(g => groups[g].yoyo())).to.deep.equal([false, false, false])
      })

    })

    describe('delay', () => {

      it('should not delay single group', async () => {
        const timeline = await loadAnimation({ animationData: createSimpleGroup('a', 'div[1]') })
        expect(timeline.delay()).to.equal(0)
      })

      it('should delay single group', async () => {
        const timeline = await loadAnimation({
          delay: 2,
          animationData: createSimpleGroup('a', 'div[1]')
        })
        expect(timeline.delay()).to.equal(2)
      })

      it('should delay all groups', async () => {
        const groups = await loadAnimation({
          delay: 2,
          animationData: [
            createSimpleGroup('a', 'div[1]/div[1]'),
            createSimpleGroup('b', 'div[1]/div[2]'),
            createSimpleGroup('c', 'div[1]/div[3]')
          ]
        })
        expect(Object.keys(groups).map(g => groups[g].delay())).to.deep.equal([2, 2, 2])
      })

      it('should not delay all groups', async () => {
        const groups = await loadAnimation({
          delay: 0,
          animationData: [
            createSimpleGroup('a', 'div[1]/div[1]'),
            createSimpleGroup('b', 'div[1]/div[2]'),
            createSimpleGroup('c', 'div[1]/div[3]')
          ]
        })
        expect(Object.keys(groups).map(g => groups[g].delay())).to.deep.equal([0, 0, 0])
      })

    })

    describe('time scale', () => {

      it('should not overwrite time scale for single group', async () => {
        const timeline = await loadAnimation({ animationData: createSimpleGroup('a', 'div[1]') })
        expect(timeline.timeScale()).to.equal(1)
      })

      it('should overwrite time scale for single group', async () => {
        const timeline = await loadAnimation({
          timeScale: 5,
          animationData: createSimpleGroup('a', 'div[1]')
        })
        expect(timeline.timeScale()).to.equal(5)
      })

      it('should overwrite time scale for all groups', async () => {
        const groups = await loadAnimation({
          timeScale: 4,
          animationData: [
            createSimpleGroup('a', 'div[1]/div[1]'),
            createSimpleGroup('b', 'div[1]/div[2]', { timeScale: 2 }),
            createSimpleGroup('c', 'div[1]/div[3]')
          ]
        })
        expect(Object.keys(groups).map(g => groups[g].timeScale())).to.deep.equal([4, 4, 4])
      })

      it('should not overwrite time scale for all groups', async () => {
        const groups = await loadAnimation({
          animationData: [
            createSimpleGroup('a', 'div[1]/div[1]', { timeScale: 1.2 }),
            createSimpleGroup('b', 'div[1]/div[2]', { timeScale: 2 }),
            createSimpleGroup('c', 'div[1]/div[3]', { timeScale: 2.2 })
          ]
        })
        expect(Object.keys(groups).map(g => groups[g].timeScale())).to.deep.equal([1.2, 2, 2.2])
      })

    })

  })

})
