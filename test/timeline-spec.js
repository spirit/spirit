import Timeline from '../src/group/timeline'
import Transitions from '../src/group/transitions'

describe('timeline', () => {

  let el

  beforeEach(() => {
    el = document.createElement('div')
  })

  describe('type is DOM element', () => {

    it('should require an html element', () => {
      expect(() => new Timeline()).to.throw(/HTMLElement is required/)
    })

    it('should have element and transitions defined', () => {
      const tl = new Timeline('dom', el)

      expect(tl.transformObject).equal(el)
      expect(tl.transitions).to.be.an.instanceOf(Transitions)
      expect(tl.label).equal(null)
    })

    it('should have a custom label', () => {
      const el = document.createElement('div')
      const tl = new Timeline('dom', el, [], 'ghost-body')
      expect(tl.label).equal('ghost-body')
    })

  })

  describe('parse', () => {

    it('should parse transitions by array', () => {
      const tl = new Timeline('dom', el, [
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
      const tl = new Timeline('dom', el, transitions)

      expect(tl.transitions).to.be.an.instanceOf(Transitions)
      expect(tl.transitions.toArray()).to.deep.equal([
        { frame: 10, params: {}, ease: 'Linear.easeNone' },
        { frame: 20, params: {}, ease: 'Linear.easeNone' }
      ])
    })

  })

  describe('#toObject', () => {

    it('should convert timeline to object without label', () => {
      const tl = new Timeline('dom', el, [{ frame: 10 }, { frame: 20 }, { frame: 30 }])

      expect(tl.toObject()).to.deep.equal({
        type: 'dom',
        transformObject: el,
        transitions: [
          { frame: 10, params: {}, ease: 'Linear.easeNone' },
          { frame: 20, params: {}, ease: 'Linear.easeNone' },
          { frame: 30, params: {}, ease: 'Linear.easeNone' }
        ]
      })
    })

    it('should convert timeline to object with label', () => {
      const tl = new Timeline('dom', el, [{ frame: 10 }, { frame: 20 }, { frame: 30 }], 'myLabel')
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
        const div = document.createElement('div')
        div.style.width = '100px'

        const tl = new Timeline('dom', div, [{
          frame: 0,
          params: {
            x: '{ window.getComputedStyle(this).width }'
          }
        }])

        expect(tl.toObject()).to.have.deep.property('transitions[0].params.x', '100px')
      })

    })


  })

})
