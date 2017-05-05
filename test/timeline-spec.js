import Timeline from '../src/group/timeline'
import Props from '../src/group/props'

describe('timeline', () => {
  let el

  beforeEach(() => {
    el = document.createElement('div')
  })

  describe('type is DOM element', () => {
    it('should require an html element', () => {
      expect(() => new Timeline()).to.throw(/transformObject needs to be an element/)
    })

    it('should require path', () => {
      expect(() => new Timeline('dom', el)).to.throw(/path is not defined/)
    })

    it('should not require path if id is set', async () => {
      expect(() => new Timeline('dom', el, [], null, 'my-id')).to.not.throw(/path is not defined/)
    })

    it('should have element and props defined', () => {
      const tl = new Timeline('dom', el, {}, 'div[0]')

      expect(tl.transformObject).equal(el)
      expect(tl.props).to.be.an.instanceOf(Props)
      expect(tl.path).equal('div[0]')
      expect(tl.id).equal(null)
      expect(tl.label).equal(null)
    })

    it('should not have a custom label', async () => {
      const tl = new Timeline('dom', el, [], 'div[0]')
      expect(tl.label).equal(null)
    })

    it('should have a custom label', () => {
      const tl = new Timeline('dom', el, [], 'div[0]', null, 'ghost-body')
      expect(tl.label).equal('ghost-body')
    })

    it('should not have an id', async () => {
      const tl = new Timeline('dom', el, [], 'div[0]')
      expect(tl.id).equal(null)
    })

    it('should have an id', async () => {
      const tl = new Timeline('dom', el, [], 'div[0]', 'my-ghost-element')
      expect(tl.id).equal('my-ghost-element')
    })
  })

  describe('type is Object', () => {
    it('should require an transform object', async () => {
      expect(() => new Timeline('object')).to.throw(/transformObject needs to be an object/)
    })

    it('should not require any additional arguments', () => {
      expect(() => new Timeline('object', {})).to.not.throw()
    })

    it('should create a valid timeline', async () => {
      const obj = {}
      const tl = new Timeline('object', obj)
      expect(tl).to.have.property('transformObject', obj)
      expect(tl).to.have.property('type', 'object')
      expect(tl).to.have.property('label', null)
      expect(tl).to.have.property('path', null)
      expect(tl).to.have.property('id', null)
      expect(tl).to.have.property('props').to.be.an.instanceOf(Props)
    })
  })

  describe('parse', () => {
    it('should parse properties by array', () => {
      const tl = new Timeline('object', el, [
        {
          'opacity': {
            '0s': { value: 0 },
            '1s': { value: 1 }
          }
        },
        {
          'scale': {
            '3s': { value: 1.4 }
          }
        }
      ])

      expect(tl.props).to.be.an.instanceOf(Props)
      expect(tl.props.toArray()).to.deep.equal([
        {
          opacity: {
            '0s': { value: 0, ease: null },
            '1s': { value: 1, ease: null }
          }
        },
        {
          scale: {
            '3s': { value: 1.4, ease: null }
          }
        }
      ])

      tl.props.each(prop => {
        prop.keyframes.each(keyframe => {
          expect(keyframe).to.have.property('mappings').to.have.lengthOf(1)
        })
      })
    })

    it('should parse properties by instances', () => {
      const props = new Props([
        { x: { '0s': { value: 0 }, '2s': { value: 100 } } },
        { y: { '0s': { value: 0 }, '2s': { value: 100, ease: 'Power3.easeOut' } } }
      ])

      const tl = new Timeline('object', el, props)

      expect(tl.props).to.be.an.instanceOf(Props)
      expect(tl.props.toObject()).to.deep.equal({
        x: {
          '0s': { value: 0, ease: null },
          '2s': { value: 100, ease: null }
        },
        y: {
          '0s': { value: 0, ease: null },
          '2s': { value: 100, ease: 'Power3.easeOut' }
        }
      })
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

      it('should create a timeline with properties', () => {
        const tl = Timeline.fromObject({
          type: 'object',
          transformObject: el,
          props: {
            'x': {
              '0s': { value: 10 },
              '4s': { value: 200 },
              '6s': { value: 0 }
            },
            'y': {
              '0s': { value: 10 },
              '4s': { value: 0 }
            }
          }
        })

        expect(tl.toObject()).to.have.property('transformObject', el)
        expect(tl.toObject()).to.have.property('props').to.deep.equal({
          x: {
            '0s': { value: 10, ease: null },
            '4s': { value: 200, ease: null },
            '6s': { value: 0, ease: null }
          },
          y: {
            '0s': { value: 10, ease: null },
            '4s': { value: 0, ease: null }
          }
        })
      })
    })
  })

  describe('#toObject', () => {
    it('should convert timeline to object without label', () => {
      const tl = new Timeline('dom', el, {}, 'div[0]')

      expect(tl.toObject()).to.deep.equal({
        type: 'dom',
        transformObject: el,
        path: 'div[0]',
        props: {}
      })
    })

    it('should convert timeline to object with label', () => {
      const tl = new Timeline('dom', el, {}, 'div[0]', null, 'myLabel')
      expect(tl.toObject()).to.have.property('label', 'myLabel')
    })
  })

  describe('apply mappings to props', () => {
    describe('as object', () => {
      let tl

      beforeEach(() => {
        tl = new Timeline('object', { foo: 5, bar: 2 }, {
          'total': {
            '0s': { value: '{ this.foo * this.bar }' },
            '1s': { value: '{ this.foo - 10 }' },
            '2s': { value: '{ this.foo + 10 }' }
          }
        })
      })

      it('should apply {this} mapping to keyframes', () => {
        expect(tl.props.get('total').keyframes.get(0)).to.have.property('value', 10)
        expect(tl.props.get('total').keyframes.get(1)).to.have.property('value', -5)
        expect(tl.props.get('total').keyframes.get(2)).to.have.property('value', 15)
      })

      it('should apply this mapping for props to add', () => {
        const added = tl.props.add({
          'bar': {
            '0s': { value: '{ (this.bar * 100) + "px" }' },
            '2.55s': { value: '{ this.bar + "deg" }' }
          }
        })

        expect(added.toObject()).to.deep.equal({
          bar: {
            '0s': { value: '200px', ease: null },
            '2.55s': { value: '2deg', ease: null }
          }
        })
      })

      it('should apply this mapping for keyframes to add', () => {
        const keyframe = tl.props.get('total').keyframes.add({ '3s': { value: '{ this.foo + this.bar }' } })
        expect(keyframe).to.have.property('value', 7)
        expect(keyframe).to.have.property('mappings').to.have.lengthOf(1)
      })

    })

    describe('as dom', () => {
      it('should evaluate {this} as the transform element', () => {
        el.style.width = '100px'

        const tl = new Timeline('dome', el, {
          x: {
            '0s': { value: '{ window.getComputedStyle(this).width }' }
          }
        }, 'div[0]')

        expect(tl.toObject()).to.have.deep.property('props.x.0s.value', '100px')
      })
    })
  })

  describe('destroy', () => {
    it('should destroy all transitions on timeline', () => {
      const tl = new Timeline('dom', el, {
        x: {
          '0s': { value: 0 },
          '5s': { value: 100 }
        },
        y: {
          '0s': { value: 0 },
          '5s': { value: 100 }
        }
      }, 'div[0]')

      const spy = sinon.spy()
      const prop = tl.props.get('x')
      prop.on('change:keyframe', spy)

      prop.keyframes.get(0).value = 10

      tl.destroy()

      prop.keyframes.get(0).value = 20
      expect(spy.callCount).to.equal(1)
    })
  })

})
