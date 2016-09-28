import List from '../src/list/list'

describe('list', () => {

  it('should create an empty list', () => {
    expect(new List()).to.have.lengthOf(0)
  })

  it('should have infinity listener counts', () => {
    const list = new List()
    expect(list._maxListeners).equal(Infinity)
  })

  describe('Model', () => {
    it('should fail on invalid model', () => {
      class Model {}
      expect(() => new List([], Model)).to.throw(/model.toObject does not exist/)
    })
    it('should give list to model instances', () => {
      class Model { toObject() {} }
      Model.fromObject = (i) => new Model(i)

      const list = new List([new Model()], Model)
      expect(list.at(0)._list).to.equal(list)
      expect(list.add(new Model())._list).to.equal(list)

      list.add([{}, {}])
      expect(list.at(2)._list).to.equal(list)
      expect(list.at(3)._list).to.equal(list)
    })
  })

  describe('parse on creation', () => {
    it('should contain a predefined list', () => {
      const list = new List([1, 2, 3])
      expect(list.list).deep.equal([1, 2, 3])
    })

    it('should parse list on model', () => {
      class Model { toObject() {} }

      const list = new List([new Model(), new Model()], Model)
      expect(list._model).equal(Model)
      expect(list).to.have.lengthOf(2)
      expect(list.at(0)).to.be.an.instanceOf(Model)
      expect(list.at(1)).to.be.an.instanceOf(Model)
    })

    it('should parse list on model.fromObject', () => {
      class Model { toObject() {} }
      Model.fromObject = (obj) => new Model()

      const list = new List([{ foo: 'bar' }, { bar: 'foo' }], Model)
      expect(list).to.have.lengthOf(2)
      expect(list.at(0)).to.be.an.instanceOf(Model)
      expect(list.at(1)).to.be.an.instanceOf(Model)
    })

    it('should fail when model could not be parsed', () => {
      class Model { toObject() {} }

      expect(() => new List([{ foo: 'bar' }, { bar: 'foo' }], Model))
        .to.throw(/Could not parse/)
    })
  })

  describe('list', () => {
    it('should get list', () => {
      const list = new List([{ x: 10 }, { y: 20 }])
      expect(list.list).to.deep.equal([{ x: 10 }, { y: 20 }])
    })

    it('should fail to set invalid list', () => {
      const list = new List()
      expect(() => list.list = null).to.throw(/List should be an array/)
      expect(() => list.list = {}).to.throw(/List should be an array/)
    })

    it('should set new list', () => {
      const params = new List()
      const list = []
      params.list = list
      expect(params.list).equal(list)
    })
  })

  describe('#at', () => {
    it('should fail on retrieve invalid index', () => {
      expect(() => new List([{ x: 10 }]).at(2)).to.throw(/Index exceeded/)
    })

    it('should return param by index', () => {
      expect(new List(['x', 'y']).at(0)).equal('x')
      expect(new List(['x', 'y']).at(1)).equal('y')
    })
  })

  describe('#add', () => {

    let list

    beforeEach(() => {
      list = new List()
    })

    it('should successfull add null to list without model', () => {
      list.add(null)
      list.add(undefined)
      expect(list.at(0)).equal(null)
      expect(list.at(1)).equal(undefined)
    })

    it('should fail on adding invalid item with model', () => {
      class Model { toObject() {} }
      list = new List([], Model)

      expect(() => list.add(null)).to.throw(/Invalid item/)
      expect(() => list.add(undefined)).to.throw(/Invalid item/)
      expect(() => list.add({})).to.throw(/Invalid item/)
      expect(list).to.have.lengthOf(0)
    })

    it('should add item of model instance', () => {
      class Model { toObject() {} }
      list = new List([], Model)
      list.add(new Model())
      list.add(new Model())

      expect(list).to.have.lengthOf(2)
      expect(list.at(0)).to.be.an.instanceOf(Model)
      expect(list.at(1)).to.be.an.instanceOf(Model)
    })

    it('should add by object from model', () => {
      class Model {
        constructor(obj) {
          Object.assign(this, obj)
        }

        toObject() {}
      }
      Model.fromObject = (obj) => new Model(obj)

      list = new List([], Model)
      expect(list).to.have.lengthOf(0)

      list.add({ x: 10 })
      list.add({ y: 100 })
      list.add({ z: 1000 })

      expect(list).to.have.lengthOf(3)

      expect(list.at(0)).to.be.an.instanceOf(Model)
      expect(list.at(0).x).equal(10)

      expect(list.at(1)).to.be.an.instanceOf(Model)
      expect(list.at(1).y).equal(100)

      expect(list.at(2)).to.be.an.instanceOf(Model)
      expect(list.at(2).z).equal(1000)
    })

    describe('array with model', () => {

      class Model {
        constructor(obj) {
          Object.assign(this, obj)
        }

        toObject() {}
      }
      Model.fromObject = (obj) => new Model(obj)

      beforeEach(() => {
        list = new List([], Model)
      })

      it('should add by array object', () => {
        list.add([
          { x: 10 },
          { y: 100 },
          { z: 1000 },
        ])

        expect(list.at(0)).to.be.an.instanceOf(Model)
        expect(list.at(0).x).equal(10)

        expect(list.at(1)).to.be.an.instanceOf(Model)
        expect(list.at(1).y).equal(100)

        expect(list.at(2)).to.be.an.instanceOf(Model)
        expect(list.at(2).z).equal(1000)
      })

      it('should add by array model instances', () => {
        list.add([
          new Model({ x: 10 }),
          new Model({ y: 100 }),
          new Model({ z: 1000 }),
        ])

        expect(list.at(0)).to.be.an.instanceOf(Model)
        expect(list.at(0).x).equal(10)

        expect(list.at(1)).to.be.an.instanceOf(Model)
        expect(list.at(1).y).equal(100)

        expect(list.at(2)).to.be.an.instanceOf(Model)
        expect(list.at(2).z).equal(1000)
      })

      it('should return added value', () => {
        expect(
          list.add({ a: 'b' })
        ).to.be.an.instanceOf(Model).and.have.property('a', 'b')

        const added = list.add([{ b: 'c' }, { c: 'd' }])
        expect(added).to.be.an('array')
        expect(added[0]).to.be.an.instanceOf(Model).and.have.property('b', 'c')
        expect(added[1]).to.be.an.instanceOf(Model).and.have.property('c', 'd')
      })
    })
  })

  describe('#remove', () => {

    describe('no model', () => {

      let list

      beforeEach(() => {
        list = new List(['a', 'b', 'c', 'd'])
      })

      it('should remove a single value', () => {
        list.remove('a')
        expect(list.list).to.deep.equal(['b', 'c', 'd'])

        list.remove('c')
        expect(list.list).to.deep.equal(['b', 'd'])
      })

      it('should remove array of values', () => {
        list.remove(['a', 'c'])
        expect(list.list).to.deep.equal(['b', 'd'])
      })

      it('should remove array of number values', () => {
        list = new List([1, 2, 3, 4, 5])
        list.remove([3, 5])
        expect(list.list).to.deep.equal([1, 2, 4])
      })

      it('should return removed value', () => {
        expect(list.remove('c')).equal('c')
        expect(list.remove(['a', 'b', 'd'])).to.deep.equal(['a', 'b', 'd'])
      })
    })

    describe('with model', () => {

      let list

      class Model {
        constructor(obj) {
          this.obj = obj
        }

        toObject() {}
      }
      Model.fromObject = (i) => new Model(i)

      beforeEach(() => {
        list = new List([
          { a: 'b' },
          { b: 'c' },
          { c: 'd' },
          { d: 'e' }
        ], Model)
      })

      it('should have model instances with obj', () => {
        expect(list.list.map(i => i.obj)).to.deep.equal([
          { a: 'b' },
          { b: 'c' },
          { c: 'd' },
          { d: 'e' }
        ])
      })

      it('should remove model by instance', () => {
        const a = list.at(0)
        const c = list.at(2)

        list.remove(a)
        list.remove(c)

        expect(list.list.map(i => i.obj)).to.deep.equal([
          { b: 'c' },
          { d: 'e' }
        ])
      })

      it('should remove array of instances', () => {
        list.remove([
          list.at(0),
          list.at(2),
          list.at(3)
        ])
        expect(list.list.map(i => i.obj)).to.deep.equal([{ b: 'c' }])
        expect(list).to.have.lengthOf(1)
      })

      it('should return removed value', () => {
        expect(list.remove(list.at(0))).to.be.an.instanceof(Model).to.have.deep.property('obj.a', 'b')

        const removed = list.remove([list.at(0), list.at(2)])
        expect(removed).to.be.an('array')
        expect(removed[0]).to.be.an.instanceOf(Model).to.have.deep.property('obj.b', 'c')
        expect(removed[1]).to.be.an.instanceOf(Model).to.have.deep.property('obj.d', 'e')
      })
    })
  })

  describe('#clear', () => {

    let list,
        a, b, c, d

    class Model {
      constructor(obj) {
        this.obj = obj
      }

      toObject() {}
    }
    Model.fromObject = (i) => new Model(i)

    beforeEach(() => {
      list = new List([
        { a: 'b' },
        { b: 'c' },
        { c: 'd' },
        { d: 'e' }
      ], Model)

      a = list.at(0)
      b = list.at(1)
      c = list.at(2)
      d = list.at(3)
    })

    it('should have list for each item', () => {
      expect(a._list).equal(list)
      expect(b._list).equal(list)
      expect(c._list).equal(list)
      expect(d._list).equal(list)
    })

    it('should remove all items', () => {
      expect(list).to.have.lengthOf(4)
      list.clear()
      expect(list).to.have.lengthOf(0)

      expect(a._list).equal(null)
      expect(b._list).equal(null)
      expect(c._list).equal(null)
      expect(d._list).equal(null)
    })
  })

  describe('#each', () => {

    it('should create an immutable array', () => {
      const list = new List([1, 2, 3, 4])
      const length = list.length
      const spy = sinon.spy()

      list.each(item => {
        list.remove(item)
        spy()
      })

      expect(spy.callCount).equal(length)
    })

    it('should walk over each item', () => {
      const list = new List([1, 2, 3, 4])
      const spy = sinon.spy()

      list.each(spy)

      let calls = []
      for (let i = 0; i < spy.callCount; i++) {
        calls.push(spy.getCall(i).args[0])
      }

      expect(calls).to.deep.equal([1, 2, 3, 4])
    })

  })

  describe('#toObject', () => {
    it('should convert to readable object from primitives', () => {
      expect(new List([1, 2, 3, 4, 5]).toObject()).to.deep.equal([1, 2, 3, 4, 5])
      expect(new List([
        { a: 'a' },
        { b: 'b' }
      ]).toObject()).to.deep.equal([
        { a: 'a' },
        { b: 'b' }
      ])
    })

    it('should convert to readable object from model instances', () => {
      class Model {
        constructor(obj) {
          this.obj = obj
        }

        toObject() {
          return this.obj
        }
      }
      Model.fromObject = (i) => new Model(i)

      const list = new List([
        { a: 'a' },
        { b: 'b' },
        { c: 'c' }
      ], Model)

      const spyA = sinon.spy(list.at(0), 'toObject')
      const spyB = sinon.spy(list.at(1), 'toObject')
      const spyC = sinon.spy(list.at(2), 'toObject')

      const obj = list.toObject()

      expect(obj).to.deep.equal([{ a: 'a' }, { b: 'b' }, { c: 'c' }])
      expect(spyA.called).to.be.true
      expect(spyB.called).to.be.true
      expect(spyC.called).to.be.true
    })
  })

  describe('dispatch changes', () => {

    let spy

    class Model {
      constructor(obj) {
        this.obj = obj
        Object.assign(this, obj)
      }

      toObject() {}
    }
    Model.fromObject = (obj) => new Model(obj)

    beforeEach(() => {
      spy = sinon.spy()
    })

    describe('add', () => {

      it('should listen for add events on primitive values', () => {
        const list = new List()
        list.on('add', spy)

        list.add(1)
        list.add([2, 3, 4])
        list.add(5)

        expect(spy.callCount).equal(5)

        let values = []
        for (let j = 0; j < spy.callCount; j++) {
          values.push(spy.getCall(j).args[0])
        }
        expect(values).to.deep.equal([1, 2, 3, 4, 5])
      })

      it('should listen for add events for objects with model', () => {
        const list = new List([], Model)
        list.on('add', spy)

        list.add({ a: 'b' })
        list.add({ b: 'c' })
        list.add([{ c: 'd' }, { d: 'e' }])

        expect(spy.callCount).equal(4)
        expect(spy.getCall(0).args[0]).to.be.an.instanceOf(Model).and.have.property('a', 'b')
        expect(spy.getCall(1).args[0]).to.be.an.instanceOf(Model).and.have.property('b', 'c')
        expect(spy.getCall(2).args[0]).to.be.an.instanceOf(Model).and.have.property('c', 'd')
        expect(spy.getCall(3).args[0]).to.be.an.instanceOf(Model).and.have.property('d', 'e')
      })
    })

    describe('remove', () => {
      it('should listen for remove primitives', () => {
        const list = new List([1, 2, 3, 4, 5])
        list.on('remove', spy)

        list.remove(2)
        list.remove([3, 4, 5])
        list.remove(1)

        expect(spy.callCount).equal(5)
        expect(spy.getCall(0).args[0]).equal(2)
        expect(spy.getCall(1).args[0]).equal(3)
        expect(spy.getCall(2).args[0]).equal(4)
        expect(spy.getCall(3).args[0]).equal(5)
        expect(spy.getCall(4).args[0]).equal(1)
      })

      it('should listen for remove events for objects with model', () => {
        const list = new List([
          { a: 'b' },
          { b: 'c' },
          { c: 'd' },
          { d: 'e' }
        ], Model)

        list.on('remove', spy)

        const a = list.at(0)
        const c = list.at(2)
        const d = list.at(3)

        list.remove(c)
        list.remove([a, d])

        expect(spy.callCount).equal(3)
        expect(spy.getCall(0).args[0]).to.be.and.instanceOf(Model).and.have.property('c', 'd')
        expect(spy.getCall(1).args[0]).to.be.and.instanceOf(Model).and.have.property('a', 'b')
        expect(spy.getCall(2).args[0]).to.be.and.instanceOf(Model).and.have.property('d', 'e')
      })
    })

    describe.skip('change', () => {
      // todo implement
    })

  })

})
