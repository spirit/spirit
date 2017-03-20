import { create, load } from '../src/data/parser'
import { context } from '../src/utils'
import { cache, req } from '../src/utils/jsonloader'
import { Timeline, Groups } from '../src/group'
import { timeline, jsonGhost } from './fixtures/group/groups-data'
import { post, ghost } from './fixtures/group/dom'

describe('parser', () => {

  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('create', () => {

    let group

    beforeEach(() => {
      group = {
        name: 'ghost-animation',
        fps: 12,
        timelines: []
      }
    })

    it('should fail to create in node', () => {
      sandbox.stub(context, 'isBrowser').returns(false)
      expect(() => create({}, document.body)).to.throw(/can only be executed in browser/)
    })

    it('should create groups from object', () => {
      expect(create({ groups: [group] })).to.be.an.instanceOf(Groups)
    })

    it('should assign document.body as groups root element if not provided', () => {
      const groups = create(group)
      expect(groups.rootEl).to.equal(document.body)
      expect(groups).to.have.lengthOf(1)
    })

    it('should create groups from array', () => {
      const groups = create([group])
      expect(groups).to.have.lengthOf(1)
    })

    describe('element not found', () => {

      it('should fail to resolve element with id only', () => {
        group.timelines = [timeline('ghost', null, 'ghost', 2)]
        expect(() => create(group)).to.throw(/Cannot find element with \[data-spirit-id="ghost"/)
      })

      it('should fail to resolve element with path only', () => {
        group.timelines = [timeline(null, 'div[1]/h1[1]', 'logo', 3)]
        expect(() => create(group)).to.throw(/Cannot find element with path expression div\[1]\/h1\[1]/)
      })

      it('should fail to resolve element with id and path', () => {
        group.timelines = [timeline('asd', 'div[2]/p[2]', 'text', 5)]
        expect(() => create(group)).to.throw(/Cannot find element with path expression div\[2]\/p\[2]/)
      })

      it('should fail to resolve if id and path are not set', () => {
        group.timelines = [timeline(null, null, 'legs', 2)]
        expect(() => create(group)).to.throw(/^Cannot find element.$/)
      })

    })

    describe('element found', () => {

      let post1,
          post2,
          post3

      beforeEach(() => {
        post1 = post()
        post2 = post()
        post3 = post()

        document.body.appendChild(post1)
        document.body.appendChild(post2)
        document.body.appendChild(post3)
      })

      afterEach(() => {
        document.body.removeChild(post1)
        document.body.removeChild(post2)
        document.body.removeChild(post3)
      })

      it('should resolve element by id', () => {
        post1.setAttribute('data-spirit-id', 'my-post-animation')
        group.timelines = [timeline('my-post-animation', null, 'post', 3)]

        let groups = create(group)

        const tl = groups.get('ghost-animation').timelines.at(0)

        expect(tl).to.have.property('transformObject', post1)
        expect(tl).to.have.property('id', 'my-post-animation')

        expect(groups.get('ghost-animation').timelines.get(post1))
          .to.be.an.instanceOf(Timeline)
      })

      it('should resolve element by path expression', () => {
        group.timelines = [timeline(null, 'div[2]/div[1]/div[1]/span[2]')]

        const tl = create(group).get('ghost-animation').timelines.at(0)

        expect(tl).to.have.property('transformObject', post2.querySelector('.post-args'))
        expect(tl).to.have.property('path', 'div[2]/div[1]/div[1]/span[2]')
        expect(tl).to.have.property('id', null)
      })

    })

    describe('with sub container as root element', () => {

      let container

      beforeEach(() => {
        container = document.createElement('div')
        container.className = 'posts'

        container.appendChild(post())
        container.appendChild(post())
        container.appendChild(post())
        container.appendChild(post())
        container.appendChild(post())

        document.body.appendChild(container)
      })

      afterEach(() => {
        document.body.removeChild(container)
      })

      it('should contain provided root element', () => {
        const groups = create(group, container)
        expect(groups.rootEl).to.equal(container)
      })

      it('should resolve element by id from sub container', () => {
        group.timelines = [timeline('my-post')]

        const firstPost = container.querySelector('.post:nth-of-type(1)')
        firstPost.setAttribute('data-spirit-id', 'my-post')

        const groups = create(group, container)

        expect(groups).to.have.lengthOf(1)
        expect(groups.get('ghost-animation').timelines.at(0)).to.have.property('transformObject', firstPost)
        expect(groups.get('ghost-animation').timelines.get(firstPost)).to.be.an.instanceOf(Timeline)
      })

      it('should resolve element by path expression from sub container', () => {
        group.timelines = [timeline(null, 'div[2]')]

        const secondPost = container.querySelector('.post:nth-of-type(2)')
        const groups = create(group, container)

        expect(groups).to.have.lengthOf(1)
        expect(groups.get('ghost-animation').timelines.at(0)).to.have.property('transformObject', secondPost)
        expect(groups.get('ghost-animation').timelines.get(secondPost)).to.be.an.instanceOf(Timeline)
      })

    })

  })

  describe('load', () => {

    beforeEach(() => {
      Object.keys(cache).forEach(key => delete cache[key])
      Object.keys(req).forEach(key => delete req[key])
    })

    it('should fail to create in node', async() => {
      sandbox.stub(context, 'isBrowser').returns(false)

      const result = await resolvePromise(load('animation.json'))
      expect(result).to.be.an('error').to.match(/can only be executed in browser/)
    })

    it('should fail to load json', async() => {
      stubXhr(sandbox, {
        open: () => {
          throw new Error('Invalid')
        }
      })

      const result = await resolvePromise(load('animation.json'))
      expect(result).to.be.an('error').to.match(/Unable to load animation\.json/)
    })

    it('should load json data via jsonloader', async() => {
      stubXhr(sandbox, { responseText: jsonGhost })

      const url = 'animation.json'
      await resolvePromise(load(url))

      expect(Object.keys(cache)).to.deep.equal([url])
      expect(cache[url]).to.deep.equal(JSON.parse(jsonGhost))
    })

    it('should try to create groups from data', async() => {
      stubXhr(sandbox, { responseText: jsonGhost })

      const result = await resolvePromise(load('animation.json'))
      expect(result).to.be.an('error').to.match(/Cannot find element/)
    })

    describe('parse', () => {

      let gc

      beforeEach(() => {
        gc = ghost()
        stubXhr(sandbox, { responseText: jsonGhost })
      })

      it('should parse animation and create valid groups', async() => {
        const groups = await resolvePromise(load('animation.json', gc))
        const timelines = groups.get('ghost').timelines

        expect(timelines).to.have.lengthOf(4)

        expect(timelines.at(0)).to.have.property('transformObject').to.equal(gc.querySelector('svg'))
        expect(timelines.at(1)).to.have.property('transformObject').to.equal(gc.querySelector('path:first-child'))
        expect(timelines.at(2)).to.have.property('transformObject').to.equal(gc.querySelector('g'))
        expect(timelines.at(3)).to.have.property('transformObject').to.equal(gc.querySelector('path:last-child'))
      })

    })

  })

})
