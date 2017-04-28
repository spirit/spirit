import Param from '../src/group/param'
import Params from '../src/group/params'
import EvalMap from '../src/group/evalmap'

describe('param', () => {

  it('should create a param', () => {
    const param = new Param('x', 120)
    expect(param.prop).equal('x')
    expect(param.value).equal(120)
  })

  it('should create an object', () => {
    expect(new Param('x', 120).toObject()).deep.equal({ x: 120 })
  })

  it('should have no mapping', () => {
    expect(new Param('x', 120).mappings).to.have.lengthOf(0)
  })

  it('should fail on invalid property', () => {
    const param = new Param()
    expect(() => param.prop = 123).to.throw(/Property needs to be a string/)
    expect(() => param.prop = {}).to.throw(/Property needs to be a string/)
  })

  describe('from object', () => {

    it('should fail on parse invalid object', () => {
      expect(() => Param.fromObject(null)).to.throw(/Object is invalid/)
      expect(() => Param.fromObject(123)).to.throw(/Object is invalid/)
      expect(() => Param.fromObject([])).to.throw(/Object is invalid/)
      expect(() => Param.fromObject({})).to.throw(/Object is invalid/)
      expect(() => Param.fromObject({ x: null })).to.throw(/Object is invalid/)
      expect(() => Param.fromObject({ x: undefined })).to.throw(/Object is invalid/)
    })

    it('should parse valid object', () => {
      const param = Param.fromObject({ x: 120 })
      expect(param.prop).equal('x')
      expect(param.value).equal(120)
      expect(param.toObject()).deep.equal({ x: 120 })
    })

  })

  describe('css transform', () => {

    it('should indicate property as css transform', () => {
      expect(Param.fromObject({ x: 120 }).isCSSTransform()).to.be.true
      expect(Param.fromObject({ y: 120 }).isCSSTransform()).to.be.true
      expect(Param.fromObject({ z: 120 }).isCSSTransform()).to.be.true
      expect(Param.fromObject({ scale: 1 }).isCSSTransform()).to.be.true
      expect(Param.fromObject({ scaleX: 1 }).isCSSTransform()).to.be.true
      expect(Param.fromObject({ skewX: 1 }).isCSSTransform()).to.be.true
    })

    it('should not indicate property as css transform', () => {
      expect(Param.fromObject({ top: 12 }).isCSSTransform()).to.be.false
      expect(Param.fromObject({ left: 12 }).isCSSTransform()).to.be.false
      expect(Param.fromObject({ borderBottomWidth: 12 }).isCSSTransform()).to.be.false
    })

  })

  describe('eval', () => {

    it('should be an evaluable param', () => {
      expect(new Param('x', '{ foo: "bar" }').isEval()).to.be.true
      expect(new Param('x', ' { foo: "bar" } ').isEval()).to.be.true
    })

    it('should not be an evaluable param', () => {
      expect(new Param('x', '12').isEval()).to.be.false
      expect(new Param('x', 23).isEval()).to.be.false
    })

  })

  describe('eval mapping', () => {

    let param

    beforeEach(() => {
      param = new Param('x', 120)
    })

    it('should evaluate mapping for number', () => {
      expect(param.value).equal(120)
      param.value = '{ test + 5 }'
      param.mappings.push(new EvalMap(/test/g, 3))
      expect(param.value).equal(8)
    })

    it('should evaluate mapping for object', () => {
      param.value = '{ foo.bar + 10 }'
      param.mappings.push(new EvalMap(/foo/, { bar: 10 }))
      expect(param.value).equal(20)
    })

    it('should evaluate mapping for function', () => {
      param.value = '{ bar() - 3 }'
      param.mappings.push(new EvalMap(/bar/, function() { return 5 }))
      expect(param.value).equal(2)
    })

    it('should evaluate multiple mappings', () => {
      param.value = '{ one() + two() }'
      param.mappings.push(new EvalMap(/one/, function() { return 1 }))
      param.mappings.push(new EvalMap(/two/, function() { return 2 }))
      expect(param.value).equal(3)
    })

    it('should fail on invalid evaluation', () => {
      param.value = '{ one() + two() }'
      param.mappings.push(new EvalMap(/one/, function() { return 1 }))
      expect(() => param.value).to.throw(/two is not defined/)
    })

    it('should evaluate global function', () => {
      global.sayHello = (name) => `Hi there ${name}!`

      param.value = `{ sayHello('mr robot') }`
      expect(param.value).equal('Hi there mr robot!')

      delete global.sayHello
    })

    it('should evaluate doubles', () => {
      param.value = '{ test + test + test }'
      param.mappings.push(new EvalMap(/test/g, 5))
      expect(param.value).equal(15)
    })

  })

  describe('have list', () => {

    let params,
        paramA,
        paramB,
        paramC

    beforeEach(() => {
      params = new Params()
      paramA = new Param('x', 10)
      paramB = new Param('y', 100)
      paramC = new Param('z', 1000)
    })

    it('should have been added to a list of params', () => {
      params.add([paramA, paramB, paramC])

      expect(paramA.list).equal(params)
      expect(paramB.list).equal(params)
      expect(paramC.list).equal(params)
    })

    it('should remove from list of params', () => {
      params.add([paramA, paramB, paramC])
      params.remove([paramA, paramB, paramC])

      expect(paramA.list).equal(null)
      expect(paramB.list).equal(null)
      expect(paramC.list).equal(null)
    })

    it('should not be able to set list of param', () => {
      params.add(paramA)
      expect(() => paramA.list = 123).to.throw(/Cannot set property list/)
      expect(paramA.list).equal(params)
    })

  })

  describe('dispatch changes', () => {

    let param, spy

    beforeEach(() => {
      param = new Param('x', '120')
      spy = sinon.spy()
    })

    it('should emit prop changes', () => {
      param.on('change:prop', spy)

      param.prop = 'y'
      param.prop = 'z'
      param.prop = 'y'

      param.removeListener('change:prop', spy)

      param.prop = 'z'
      param.prop = 'y'

      expect(spy.callCount).equal(3)
    })

    it('should emit prop changes with previous model', () => {
      param.on('change:prop', spy)

      param.prop = 'y'
      param.prop = 'z'

      expect(spy.getCall(0).args[1]).to.equal('y')
      expect(spy.getCall(0).args[0].previous).to.deep.equal({ x: '120' })
      expect(spy.getCall(0).args[0].current).to.deep.equal({ y: '120' })
      expect(spy.getCall(0).args[0].changed).to.deep.equal({ type: 'prop', from: 'x', to: 'y' })

      expect(spy.getCall(1).args[1]).to.equal('z')
      expect(spy.getCall(1).args[0].previous).to.deep.equal({ y: '120' })
      expect(spy.getCall(1).args[0].current).to.deep.equal({ z: '120' })
      expect(spy.getCall(1).args[0].changed).to.deep.equal({ type: 'prop', from: 'y', to: 'z' })
    })

    it('should emit value changes', () => {
      param.on('change:value', spy)
      param.value = 120

      let i = 10
      while (--i) {
        param.value--
      }

      let values = []
      for (let j = 0; j < spy.callCount; j++) {
        values.push(spy.getCall(j).args[1])
      }

      expect(values).deep.equal([120, 119, 118, 117, 116, 115, 114, 113, 112, 111])
    })

    it('should emit value changes with previous model', () => {
      param.on('change:value', spy)
      param.value = 100
      param.value = 101

      expect(spy.getCall(0).args[1]).to.equal(100)
      expect(spy.getCall(0).args[0].previous).to.deep.equal({ x: '120' })
      expect(spy.getCall(0).args[0].current).to.deep.equal({ x: 100 })
      expect(spy.getCall(0).args[0].changed).to.deep.equal({
        type: 'value',
        from: '120',
        to: 100
      })

      expect(spy.getCall(1).args[1]).to.equal(101)
      expect(spy.getCall(1).args[0].previous).to.deep.equal({ x: 100 })
      expect(spy.getCall(1).args[0].current).to.deep.equal({ x: 101 })
      expect(spy.getCall(1).args[0].changed).to.deep.equal({
        type: 'value',
        from: 100,
        to: 101
      })
    })

    it ('should not dispatch for unchanged prop', () => {
      param.on('change:prop', spy)
      param.prop = 'x'
      expect(spy.callCount).equal(0)

      param.prop = 'z'
      expect(spy.callCount).equal(1)
    })

    it ('should not dispatch for unchanged value', () => {
      param.on('change:value', spy)
      param.value = '120'
      expect(spy.callCount).equal(0)

      param.value = 50
      expect(spy.callCount).equal(1)
    })

  })

})
