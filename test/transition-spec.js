import Transition from '../src/group/transition'
import Params from '../src/group/params'

describe('transition', () => {

  describe('parse', () => {
    it('should fail with invalid frame', () => {
      expect(() => new Transition(null)).to.throw(/Invalid frame/)
      expect(() => new Transition({})).to.throw(/Invalid frame/)
    })

    it('should fail with invalid ease', () => {
      expect(() => new Transition(0, [], null)).to.throw(/Invalid ease/)
      expect(() => new Transition(0, [], {})).to.throw(/Invalid ease/)
    })

    it('should have a function as ease', () => {
      const tr = new Transition(0, [], function() {})
      expect(tr.ease).to.be.a('function')
    })

    it('should have a string as ease', () => {
      const tr = new Transition(0, [], 'Linear.easeNone')
      expect(tr.ease).to.be.a('string')
    })

    it('should have defaults', () => {
      expect(new Transition(0).params).to.be.an.instanceOf(Params)
      expect(new Transition(0).ease).equal('Linear.easeNone')
      expect(new Transition(0).frame).equal(0)
    })

    it('should parse params by array or object', () => {
      const trA = new Transition(0, [{ x: 10 }, { width: 100 }])
      const trB = new Transition(0, { x: 20, width: 200 })

      expect(trA.params).to.be.an.instanceOf(Params)
      expect(trB.params).to.be.an.instanceOf(Params)

      expect(trA.params.toObject()).to.deep.equal({ x: 10, width: 100 })
      expect(trB.params.toObject()).to.deep.equal({ x: 20, width: 200 })
    })
  })

  describe('frame', () => {
    it('should fail when try to set invalid frame', () => {
      const tr = new Transition(12)
      expect(() => tr.frame = {}).to.throw(/Frame should be a number/)
      expect(() => tr.frame = function() {}).to.throw(/Frame should be a number/)
    })
  })

  describe('ease', () => {
    it('should fail when try to set invalid ease', () => {
      const tr = new Transition(12)
      expect(() => tr.ease = {}).to.throw(/Ease should be a string or function/)
      expect(() => tr.ease = 10).to.throw(/Ease should be a string or function/)
    })
  })

  describe('params', () => {

    let tr,
        pW,
        pH

    beforeEach(() => {
      tr = new Transition(0, { width: 100, height: 200 })
      pW = tr.params.get('width')
      pH = tr.params.get('height')
    })

    it('should have params', () => {
      expect(tr.params.toObject()).deep.equal({ width: 100, height: 200 })
      expect(tr.params.toArray()).deep.equal([{ width: 100 }, { height: 200 }])
    })

    it('should clear list on each param when changing params', () => {
      expect(pW.list).equal(tr.params)
      expect(pH.list).equal(tr.params)

      tr.params = { top: 500, left: '1000px' }

      expect(tr.params.toObject()).deep.equal({ top: 500, left: '1000px' })

      expect(pW.list).equal(null)
      expect(pH.list).equal(null)
    })

    it('should reassign list to params', () => {
      tr.params = { top: 1200, left: 10 }
      expect(pW.list).equal(null)
      expect(pH.list).equal(null)

      tr.params.add([pW, pH])

      expect(pW.list).equal(tr.params)
      expect(pH.list).equal(tr.params)
    })

    it('should reassign list to params by override params', () => {
      tr.params = [pW, pH, { top: '100px' }]
      expect(tr.params.toObject()).to.deep.equal({ width: 100, height: 200, top: '100px' })
    })
  })

  describe('#toObject', () => {

    let tr

    beforeEach(() => {
      tr = new Transition(12, { x: 100, y: 200, z: 300 }, 'Quint.easeOut')
    })

    it('should return a object with params as object', () => {
      expect(tr.toObject()).to.deep.equal({
        frame: 12,
        ease: 'Quint.easeOut',
        params: { x: 100, y: 200, z: 300 }
      })
    })

    it('should return a object with params as array', () => {
      expect(tr.toObject(true)).to.deep.equal({
        frame: 12,
        ease: 'Quint.easeOut',
        params: [{ x: 100 }, { y: 200 }, { z: 300 }]
      })
    })
  })

  describe('dispatch changes', () => {

    let transition,
        spy

    beforeEach(() => {
      transition = new Transition(0)
      spy = sinon.spy()
    })

    it('should change frame', () => {
      transition.on('change:frame', spy)
      transition.frame = 10
      expect(spy.withArgs(10).calledOnce).to.be.true
    })

    it('should not dispatch when frame is not changed', () => {
      transition.on('change:frame', spy)
      transition.frame = 0
      expect(spy.callCount).equal(0)
    })

    it('should change ease', () => {
      transition.on('change:ease', spy)
      transition.ease = 'Strong.easeOut'
      expect(spy.withArgs('Strong.easeOut').calledOnce).to.be.true
    })

    it('should not dispatch when ease is not changed ', () => {
      transition.on('change:ease', spy)
      transition.ease = 'Linear.easeNone'
      expect(spy.callCount).equal(0)
    })

    it('should change params', () => {
      const newParams = new Params()

      transition.on('change:params', spy)
      transition.params = newParams
      expect(spy.withArgs(newParams).calledOnce).to.be.true
    })

    describe('bubble param events', () => {

      beforeEach(() => {
        transition.params = { x: 200, y: 300 }
      })

      it('should dispatch change:param', () => {
        transition.on('change:param', spy)

        const x = transition.params.get('x')
        x.value++
        x.value++

        expect(spy.callCount).equal(2)
        expect(spy.getCall(0).args[0].changed).to.deep.equal({ type: 'value', from: 200, to: 201 })
        expect(spy.getCall(1).args[0].changed).to.deep.equal({ type: 'value', from: 201, to: 202 })
      })

      it('should dispatch change:param:prop', () => {
        transition.on('change:param:prop', spy)

        const x = transition.params.get('x')
        x.prop = 'skewX'
        x.prop = 'skewY'

        expect(spy.callCount).equal(2)
        expect(spy.getCall(0).args[0].changed).to.deep.equal({ type: 'prop', from: 'x', to: 'skewX' })
        expect(spy.getCall(1).args[0].changed).to.deep.equal({ type: 'prop', from: 'skewX', to: 'skewY' })
      })

      it ('should dispatch change:param:value', () => {
        transition.on('change:param:value', spy)

        const x = transition.params.get('x')
        x.value--
        x.value--

        expect(spy.callCount).equal(2)
        expect(spy.getCall(0).args[0].changed).to.deep.equal({ type: 'value', from: 200, to: 199 })
        expect(spy.getCall(1).args[0].changed).to.deep.equal({ type: 'value', from: 199, to: 198 })
      })
    })

  })


})
