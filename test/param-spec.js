import Param from '../src/group/param'

describe('param', () => {

  it('should create a param', () => {
    const param = new Param('x', 120)
    expect(param.prop).equal('x')
    expect(param.value).equal(120)
  })

  it('should create an object', () => {
    expect(new Param('x', 120).toObject()).deep.equal({ x: 120 })
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

  describe('dispatch changes', () => {

    let param, spy

    beforeEach(() => {
      param = new Param('x', '120')
      spy = sinon.spy()
    })

    afterEach(() => {
      param.removeAllListeners()
    })

    it ('should emit prop changes', () => {
      param.on('change:prop', spy)

      param.prop = 'y'
      param.prop = 'z'
      param.prop = 'y'

      param.removeListener('change:prop', spy)

      param.prop = 'z'
      param.prop = 'y'

      expect(spy.withArgs('y').callCount).equal(2)
      expect(spy.withArgs('z').callCount).equal(1)
      expect(spy.callCount).equal(3)
    })

    it ('should emit value changes', () => {
      param.on('change:value', spy)
      param.value = 120

      let i = 10
      while(--i) {
        param.value--
      }
      
      let values = []
      for (let j = 0; j < spy.callCount; j++) {
        values.push(spy.getCall(j).args[0])
      }

      expect(values).deep.equal([120, 119, 118, 117, 116, 115, 114, 113, 112, 111])
    })


  })


})
