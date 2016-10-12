import { create, load } from '../src/data/parser'
import { context } from '../src/utils'
import { Timeline, Groups } from '../src/group'
import { timeline } from './fixtures/group/groups-data'
import { post } from './fixtures/group/dom'

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

        expect(groups.get('ghost-animation').timelines.at(0))
          .to.have.property('transformObject', post1)

        expect(groups.get('ghost-animation').timelines.get(post1))
          .to.be.an.instanceOf(Timeline)
      })

      it('should resolve element by path expression', () => {
        group.timelines = [timeline(null, 'div[2]/div[1]/div[1]/span[2]')]

        expect(create(group).get('ghost-animation').timelines.at(0))
          .to.have.property('transformObject', post2.querySelector('.post-args'))
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

  })


})
