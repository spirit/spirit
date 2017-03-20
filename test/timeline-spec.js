import Timeline from '../src/group/timeline'
import Transitions from '../src/group/transitions'

describe('timeline', () => {

  let el

  beforeEach(() => {
    el = document.createElement('div')
  })

  describe('type is DOM element', () => {

    it('should require an html element', () => {
      expect(() => new Timeline()).to.throw(/transformObject needs to be an element/)
    })

    it ('should require path', () => {
      expect(() => new Timeline('dom', el)).to.throw(/path is not defined/)
    })

    it ('should not require path if id is set', async() => {
      expect(() => new Timeline('dom', el, [], null, 'my-id')).to.not.throw(/path is not defined/)
    })

    it('should have element and transitions defined', () => {
      const tl = new Timeline('dom', el, [], 'div[0]')

      expect(tl.transformObject).equal(el)
      expect(tl.transitions).to.be.an.instanceOf(Transitions)
      expect(tl.path).equal('div[0]')
      expect(tl.id).equal(null)
      expect(tl.label).equal(null)
    })

    it ('should not have a custom label', async() => {
      const tl = new Timeline('dom', el, [], 'div[0]')
      expect(tl.label).equal(null)
    })

    it('should have a custom label', () => {
      const tl = new Timeline('dom', el, [], 'div[0]', null, 'ghost-body')
      expect(tl.label).equal('ghost-body')
    })

    it ('should not have an id', async() => {
      const tl = new Timeline('dom', el, [], 'div[0]')
      expect(tl.id).equal(null)
    })

    it ('should have an id', async() => {
      const tl = new Timeline('dom', el, [], 'div[0]', 'my-ghost-element')
      expect(tl.id).equal('my-ghost-element')
    })

  })

  describe('type is Object', () => {

    it ('should require an transform object', async() => {
      expect(() => new Timeline('object')).to.throw(/transformObject needs to be an object/)
    })

    it ('should not require any additional arguments', () => {
      expect(() => new Timeline('object', {})).to.not.throw()
    })

    it ('should create a valid timeline', async() => {
      const obj = {}
      const tl = new Timeline('object', obj)
      expect(tl).to.have.property('transformObject', obj)
      expect(tl).to.have.property('type', 'object')
      expect(tl).to.have.property('label', null)
      expect(tl).to.have.property('path', null)
      expect(tl).to.have.property('id', null)
      expect(tl).to.have.property('transitions').to.be.an.instanceOf(Transitions)
    })

  })

  describe('parse', () => {

    it('should parse transitions by array', () => {
      const tl = new Timeline('object', el, [
        { frame: 1, params: { opacity: 0 } },
        { frame: 60, params: { opacity: 1 } },
        { frame: 100, params: { scale: 1.4 } }
      ])

      expect(tl.transitions).to.be.an.instanceOf(Transitions)
      expect(tl.transitions.toArray()).to.deep.equal([
        { frame: 1, params: { opacity: 0 }, ease: 'Linear.easeNone' },
        { frame: 60, params: { opacity: 1 }, ease: 'Linear.easeNone' },
        { frame: 100, params: { scale: 1.4 }, ease: 'Linear.easeNone' },
      ])

    })

    it('should parse transitions by Transition object', () => {
      const transitions = new Transitions([{ frame: 10 }, { frame: 20 }])
      const tl = new Timeline('object', el, transitions)

      expect(tl.transitions).to.be.an.instanceOf(Transitions)
      expect(tl.transitions.toArray()).to.deep.equal([
        { frame: 10, params: {}, ease: 'Linear.easeNone' },
        { frame: 20, params: {}, ease: 'Linear.easeNone' }
      ])
    })

  })

  describe('parse fromObject', () => {

    it('should fail with invalid type', () => {
      expect(() => Timeline.fromObject(123)).to.throw(/Object is invalid/)
      expect(() => Timeline.fromObject([])).to.throw(/Object is invalid/)
    })

    it('should fail when no transformObject is provided', () => {
      expect(() => Timeline.fromObject({})).to.throw(/Object is invalid/)
    })

    describe('as dom', () => {

      it('should fail if transformObject is not a HTMLElement', () => {
        expect(() => Timeline.fromObject({ transformObject: 123 })).to.throw(/transformObject needs to be an element/)
      })

      it('should create a valid timeline', () => {
        expect(() => Timeline.fromObject({ transformObject: el, path: 'div[0]' })).to.not.throw(Error)
      })

    })

    describe('as object', () => {

      it('should create a timeline with transformObject as object', () => {
        expect(() => {
          Timeline.fromObject({ type: 'object', transformObject: { a: 'a', b: 'b' } })
        }).not.to.throw(Error)
      })

      it('should create a timeline with transitions', () => {
        const tl = Timeline.fromObject({
          type: 'object',
          transformObject: el,
          transitions: [
            { frame: 0, params: { x: 10, y: 10 } },
            { frame: 100, params: { x: 200, y: 0 } },
            { frame: 200, params: { x: 0, y: 0 } }
          ]
        })

        expect(tl.toObject()).to.have.property('transformObject', el)
        expect(tl.toObject()).to.have.property('transitions').to.deep.equal([
          { frame: 0, params: { x: 10, y: 10 }, ease: 'Linear.easeNone' },
          { frame: 100, params: { x: 200, y: 0 }, ease: 'Linear.easeNone' },
          { frame: 200, params: { x: 0, y: 0 }, ease: 'Linear.easeNone' }
        ])
      })

    })

  })


  describe('#toObject', () => {

    it('should convert timeline to object without label', () => {
      const tl = new Timeline('dom', el, [{ frame: 10 }, { frame: 20 }, { frame: 30 }], 'div[0]')

      expect(tl.toObject()).to.deep.equal({
        type: 'dom',
        transformObject: el,
        path: 'div[0]',
        transitions: [
          { frame: 10, params: {}, ease: 'Linear.easeNone' },
          { frame: 20, params: {}, ease: 'Linear.easeNone' },
          { frame: 30, params: {}, ease: 'Linear.easeNone' }
        ]
      })
    })

    it('should convert timeline to object with label', () => {
      const tl = new Timeline('dom', el, [{ frame: 10 }, { frame: 20 }, { frame: 30 }], 'div[0]', null, 'myLabel')
      expect(tl.toObject()).to.have.property('label', 'myLabel')
    })

  })

  describe('apply mappings to transitions', () => {

    describe('as object', () => {
      let tl

      beforeEach(() => {
        tl = new Timeline('object', { foo: 5, bar: 2 }, [
          { frame: 10, params: { total: '{this.foo * this.bar}' } },
          { frame: 20, params: { total: '{this.foo - 10}' } },
          { frame: 30, params: { total: '{this.foo + 10}' } }
        ])
      })

      it('should apply {this} mapping to transition params', () => {
        expect(tl.transitions.get(10).params.get('total').value).to.equal(10)
        expect(tl.transitions.get(20).params.get('total').value).to.equal(-5)
        expect(tl.transitions.get(30).params.get('total').value).to.equal(15)
      })

      it('should apply this mapping for transitions to add', () => {
        const added = tl.transitions.add({
          frame: 0,
          params: {
            bar: '{ (this.bar * 100) + "px" }'
          }
        })
        expect(added.toObject()).to.have.deep.property('params.bar', '200px')
      })

      it('should apply this mapping for params to add', () => {
        const added = tl.transitions.get(10).params.add({ foo: '{this.foo + this.bar}' })
        expect(added).to.have.property('value', 7)
      })
    })

    describe('as dom', () => {

      it('should evaluate {this} as the transform element', () => {
        el.style.width = '100px'

        const tl = new Timeline('dom', el, [{
          frame: 0,
          params: {
            x: '{ window.getComputedStyle(this).width }'
          }
        }], 'div[0]')

        expect(tl.toObject()).to.have.deep.property('transitions[0].params.x', '100px')
      })

    })

  })

  describe('destroy', () => {

    it('should destroy all transitions on timeline', () => {
      const tl = new Timeline('dom', el, [
        { frame: 0, params: { x: 0, y: 0 } },
        { frame: 100, params: { x: 100, y: 100 } }
      ], 'div[0]')

      const spy = sinon.spy()

      const tr =tl.transitions.get(0)

      tr.on('change:param', spy)
      tr.params.get('x').value = 10

      tl.destroy()

      tr.params.get('x').value = 20
      expect(spy.callCount).to.equal(1)
    })

  })

})
