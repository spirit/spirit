import { List } from '../src/utils'

describe('list', () => {

  it('should create an empty list', () => {
    expect(new List()).to.have.lengthOf(0)
  })

  it('should have infinity listener counts', () => {
    const list = new List()
    expect(list._maxListeners).equal(Infinity)
  })

  describe('parse on creation', () => {
    it('should contain a predefined list', () => {
      const list = new List([1, 2, 3])
      expect(list.list).deep.equal([1, 2, 3])
    })

    it('should parse list on model', () => {
      class Model {}

      const list = new List([new Model(), new Model()], Model)
      expect(list._model).equal(Model)
      expect(list).to.have.lengthOf(2)
      expect(list.at(0)).to.be.an.instanceOf(Model)
      expect(list.at(1)).to.be.an.instanceOf(Model)
    })

    it('should parse list on model.fromObject', () => {
      class Model {}
      Model.fromObject = (obj) => new Model()

      const list = new List([{ foo: 'bar' }, { bar: 'foo' }], Model)
      expect(list).to.have.lengthOf(2)
      expect(list.at(0)).to.be.an.instanceOf(Model)
      expect(list.at(1)).to.be.an.instanceOf(Model)
    })

    it('should fail when model could not be parsed', () => {
      class Model {}

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
      class Model {}
      list = new List([], Model)

      expect(() => list.add(null)).to.throw(/Invalid item/)
      expect(() => list.add(undefined)).to.throw(/Invalid item/)
      expect(() => list.add({})).to.throw(/Invalid item/)
      expect(list).to.have.lengthOf(0)
    })

    it('should add item of model instance', () => {
      class Model {}
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
    })
  })

  describe('#remove', () => {

  })

  describe('dispatch changes', () => {

  })

})
