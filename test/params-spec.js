import Params from '../src/group/params'
import Param from '../src/group/param'

describe('params', () => {

  it('should have empty params', () => {
    expect(new Params()).to.have.lengthOf(0)
  })

  it('should parse object of params', () => {
    const params = new Params({ x: 10, width: 100 })
    expect(params).to.have.lengthOf(2)
    expect(params.toArray()).to.deep.equal([{ x: 10 }, { width: 100 }])
  })

  describe('list', () => {
    it('should get list', () => {
      const params = new Params([{ x: 10 }, { y: 20 }])
      expect(params.list.map(p => p.toObject())).to.deep.equal([{ x: 10 }, { y: 20 }])
    })

    it('should fail to set invalid list', () => {
      const params = new Params()
      expect(() => params.list = null).to.throw(/List should be an array/)
      expect(() => params.list = {}).to.throw(/List should be an array/)
    })

    it('should set new list', () => {
      const params = new Params()
      const list = []
      params.list = list
      expect(params.list).equal(list)
    })
  })

  describe('#at', () => {
    it('should fail on retrieve invalid index', () => {
      expect(() => new Params([{ x: 10 }]).at(2)).to.throw(/Index exceeded/)
    })

    it('should return param by index', () => {
      expect(new Params([{ x: 10 }, { y: 10 }]).at(1).prop).equal('y')
      expect(new Params([{ x: 10 }, { y: 10 }]).at(1).value).equal(10)
    })
  })

  describe('#add', () => {

    let params

    beforeEach(() => {
      params = new Params()
    })

    it('should fail on invalid param', () => {
      expect(() => params.add(null)).to.throw(/Invalid item/)
      expect(() => params.add({})).to.throw(/Object is invalid/)
      expect(params).to.have.lengthOf(0)
    })

    it('should add by object', () => {
      params.add({ x: 200 })
      params.add({ y: 300 })
      expect(params.at(0).toObject()).deep.equal({ x: 200 })
      expect(params.at(1).toObject()).deep.equal({ y: 300 })
    })

    it('should add by multiple object', () => {
      params.add({ a: 'a', b: 'b', c: 'c' })
      expect(params.toObject()).to.deep.equal({ a: 'a', b: 'b', c: 'c' })
      params.each(p => expect(p).instanceOf(Param))
    })

    it('should add by param', () => {
      params.add(new Param('x', 200))
      params.add(new Param('y', 300))
      expect(params.at(0).toObject()).deep.equal({ x: 200 })
      expect(params.at(1).toObject()).deep.equal({ y: 300 })
    })

    it('should add by array object', () => {
      params.add([
        { x: 200 },
        { y: 300 }
      ])
      expect(params.at(0).toObject()).deep.equal({ x: 200 })
      expect(params.at(1).toObject()).deep.equal({ y: 300 })
    })

    it('should add by array param', () => {
      params.add([
        new Param('x', 200),
        new Param('y', 300)
      ])
      expect(params.at(0).toObject()).deep.equal({ x: 200 })
      expect(params.at(1).toObject()).deep.equal({ y: 300 })
    })
  })

  describe('#get', () => {
    it('should get param', () => {
      const p = new Params([{ left: 100 }, { top: 200 }])
      expect(p.get('left')).to.be.an.instanceOf(Param)
      expect(p.get('left').value).equal(100)
      expect(p.get('top')).to.be.an.instanceOf(Param)
      expect(p.get('top').value).equal(200)
    })

    it('should get undefined', () => {
      const p = new Params([{ left: 100 }, { top: 200 }])
      expect(p.get('notfound')).to.be.undefined
    })
  })

  describe('#toObject', () => {
    it('should convert to a valid object', () => {
      const params = new Params([{ x: 100 }, { y: 200 }, { z: 300 }])
      expect(params.toObject()).to.deep.equal({ x: 100, y: 200, z: 300 })
    })
  })

  describe('#haveProp', () => {
    it('should have prop', () => {
      expect(new Params([{ top: '100' }, { x: 200 }]).haveProp('top')).to.be.true
    })

    it('should not have prop', () => {
      expect(new Params([{ top: '100' }, { x: 200 }]).haveProp('left')).to.be.false
    })
  })

  describe('parse array', () => {

    function testPresence(params, result) {
      expect(params).to.have.lengthOf(3)
      expect(params.at(0)).to.be.an.instanceOf(Param)
      expect(params.at(1)).to.be.an.instanceOf(Param)
      expect(params.at(2)).to.be.an.instanceOf(Param)
      expect(params.list.map(p => p.toObject())).to.deep.equal(result)
    }

    it('should parse params by object array', () => {
      const params = new Params([
        { x: 10 },
        { y: 100 },
        { z: 1000 }
      ])

      testPresence(params, [
        { x: 10 },
        { y: 100 },
        { z: 1000 }
      ])
    })

    it('should parse params by param array', () => {
      const params = new Params([
        new Param('x', 10),
        new Param('y', 100),
        new Param('z', 1000),
      ])

      testPresence(params, [
        { x: 10 },
        { y: 100 },
        { z: 1000 }
      ])
    })
  })

  describe('duplicates', () => {
    it('should not allow duplicates', () => {
      const params = new Params({ x: 10, y: 100 })
      expect(() => params.add({ x: 100 })).to.throw(/List has duplicates/)
      expect(() => new Params([{ x: 10 }, { x: 100 }])).to.throw(/List has duplicates/)
    })
  })

  describe('dispatch changes', () => {

    it('should change list', () => {
      const spy = sinon.spy()
      const params = new Params()
      const list = []

      params.on('change:list', spy)
      params.list = list

      expect(spy.withArgs(list).calledOnce).to.be.true
    })

    it('should emit param value change', () => {
      const params = new Params([{ x: 10 }, { y: 100 }], Param)
      const param = params.at(0)

      const spyParams = sinon.spy()
      const spyParamsValue = sinon.spy()
      const spyParam = sinon.spy()

      param.on('change:value', spyParam)
      params.on('change', spyParams)
      params.on('change:value', spyParamsValue)

      param.value++
      param.value++

      expect(spyParam.calledTwice).to.be.true
      expect(spyParams.calledTwice).to.be.true
      expect(spyParamsValue.calledTwice).to.be.true
    })

    it('should emit param prop change', () => {
      const params = new Params([{ x: 10 }, { y: 100 }])
      const param = params.at(0)

      const spyParams = sinon.spy()
      const spyParamsProp = sinon.spy()
      const spyParam = sinon.spy()

      param.on('change:prop', spyParam)
      params.on('change', spyParams)
      params.on('change:prop', spyParamsProp)

      // update
      param.prop = 'z'
      param.prop = 'translateX'

      expect(spyParam.calledTwice).to.be.true
      expect(spyParams.calledTwice).to.be.true
      expect(spyParamsProp.calledTwice).to.be.true
      expect(params.toArray()).to.deep.equal([{ translateX: 10 }, { y: 100 }])
    })

  })

})
