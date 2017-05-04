import Props from '../src/group/props'
import Prop from '../src/group/prop'
import Keyframes from '../src/group/keyframes'
import Keyframe from '../src/group/keyframe'
import EvalMap from '../src/group/evalmap'

describe('properties', () => {

  it('should have empty properties', () => {
    expect(new Props()).to.have.lengthOf(0)
  })

  it('should parse object of properties', () => {
    const properties = new Props({
      x: {
        '0s': { value: 10 },
        '1s': { value: 100 }
      },
      y: {
        '0s': { value: 0 },
        '10s': { value: 0 }
      }
    })

    expect(properties).to.have.lengthOf(2)
    expect(properties.get('x')).to.be.an.instanceOf(Prop)
    expect(properties.get('x').toObject()).to.deep.equal({
      x: {
        '0s': { value: 10, ease: null },
        '1s': { value: 100, ease: null }
      }
    })

    expect(properties.get('y')).to.be.an.instanceOf(Prop)
    expect(properties.get('y').toObject()).to.deep.equal({
      y: {
        '0s': { value: 0, ease: null },
        '10s': { value: 0, ease: null }
      }
    })

    expect(properties.get('z')).to.be.undefined
  })

  it('should parse array of properties', () => {
    const propertiesA = new Props([
      { 'x': { '0s': { value: 0 }, '1s': { value: 10 } } },
      { 'y': { '0s': { value: 0 }, '10s': { value: 0 } } }
    ])

    const propertiesB = new Props([
      new Prop('x', [new Keyframe(0, 0), new Keyframe(1, 10)]),
      new Prop('y', [new Keyframe(0, 0), new Keyframe(10, 0)])
    ])

    expect(propertiesA).to.have.lengthOf(2)
    expect(propertiesB).to.have.lengthOf(2)
    expect(propertiesA.get('x')).to.be.an.instanceOf(Prop)
    expect(propertiesA.get('x').toObject()).to.deep.equal({
      x: {
        '0s': { value: 0, ease: null },
        '1s': { value: 10, ease: null }
      }
    })

    expect(propertiesA.toArray()).to.deep.equal(propertiesB.toArray())
    expect(propertiesA.toObject()).to.deep.equal(propertiesB.toObject())
  })

  describe('list', () => {
    it('should get list', () => {
      const properties = new Props({
        x: {
          '0s': { value: 10 },
          '1s': { value: 100 }
        },
        y: {
          '0s': { value: 0 },
          '10s': { value: 0 }
        }
      })

      expect(properties.list.map(p => p.toObject())).to.deep.equal(properties.toArray())
    })

    it('should fail to set invalid list', () => {
      const properties = new Props()
      expect(() => properties.list = null).to.throw(/List should be an array/)
      expect(() => properties.list = {}).to.throw(/List should be an array/)
    })

    it('should set new list', () => {
      const properties = new Props()
      const list = []
      properties.list = list
      expect(properties.list).equal(list)
    })

    it('should get the parent list from property', () => {
      const x = new Prop('x')
      const y = new Prop('y')
      const z = new Prop('z')

      expect(x.list).to.equal(null)
      expect(y.list).to.equal(null)
      expect(z.list).to.equal(null)

      const properties = new Props([x, y, z])

      expect(x.list).to.equal(properties)
      expect(y.list).to.equal(properties)
      expect(z.list).to.equal(properties)
    })
  })

  describe('duplicates', () => {
    it('should not allow name duplicates', () => {
      const properties = new Props({
        x: {},
        y: {},
        z: {}
      })

      expect(() => properties.add({ x: { '0s': { value: 10 } } })).to.throw(/List has duplicates/)
      expect(() => new Props([
        { x: {} },
        { x: {} }
      ])).to.throw(/List has duplicates/)
    })
  })

  describe('linked list', () => {
    let properties

    beforeEach(() => {
      properties = new Props([
        new Prop('z'),
        new Prop('x'),
        new Prop('y')
      ])
    })

    it('should have linked properties', () => {
      expect(properties.get('x')).to.have.property('_prev', null)
      expect(properties.get('x')).to.have.property('_next', properties.get('y'))

      expect(properties.get('y')).to.have.property('_prev', properties.get('x'))
      expect(properties.get('y')).to.have.property('_next', properties.get('z'))

      expect(properties.get('z')).to.have.property('_prev', properties.get('y'))
      expect(properties.get('z')).to.have.property('_next', null)
    })

    it('should cycle over linked list next', () => {
      let res = {}
      let p = properties.get('x')

      while (p) {
        res = { ...res, ...p.toObject() }
        p = p.next()
      }

      expect(res).to.deep.equal(properties.toObject())
    })

    it('should cycle over linked list prev', () => {
      let res = {}
      let p = properties.get('z')

      while (p) {
        res = { ...res, ...p.toObject() }
        p = p.prev()
      }

      expect(res).to.deep.equal(properties.toObject())
    })
  })

  describe('mapping', () => {
    let props,
        val = {
          '0s': { value: 0 },
          '10s': { value: 50 },
          '20s': { value: 100 }
        }

    beforeEach(() => {
      props = new Props({
        x: val,
        y: val,
        z: val
      })

      props.mappings = [
        new EvalMap(/foo/, { foo: 'bar' }),
        new EvalMap(/bar/, { bar: 'foo' })
      ]
    })

    it('should apply mappings to existing properties', () => {
      props.each(prop => {
        expect(prop.keyframes.mappings).to.deep.equal(props.mappings)
      })
    })

    it('should apply mappings for properties to add', () => {
      expect(props.add(new Prop('scale')))
        .to.have.deep.property('keyframes.mappings')
        .to.deep.equal(props.mappings)
    })

    it('should remove mappings on properties removal', () => {
      expect(props.remove(props.get('x')))
        .to.have.deep.property('keyframes.mappings')
        .to.deep.equal([])

      props.remove([props.get('y'), props.get('z')]).forEach(prop => {
        expect(prop)
          .to.have.deep.property('keyframes.mappings')
          .to.deep.equal([])
      })
    })

    it('should reassign mappings for new properties', () => {
      props.get('x').keyframes = {
        '0s': { value: 0 },
        '100s': { value: 0 }
      }

      expect(props.get('x'))
        .to.have.deep.property('keyframes.mappings')
        .to.deep.equal(props.mappings)
    })
  })

  describe('#at', () => {
    it('should fail on retrieve invalid index', () => {
      expect(() => new Props({ x: {}, y: {} }).at(2)).to.throw(/Index exceeded/)
    })

    it('should return property by index', () => {
      const properties = new Props({
        z: { '0s': { value: 1000 } },
        x: { '0s': { value: 10 } },
        y: { '0s': { value: 100 } }
      })

      expect(properties.at(0)).to.have.property('name', 'x')
      expect(properties.at(1)).to.have.property('name', 'y')
      expect(properties.at(2)).to.have.property('name', 'z')
    })
  })

  describe('#get', () => {
    let properties

    beforeEach(() => {
      properties = new Props({
        z: { '0s': { value: 1000 } },
        x: { '0s': { value: 10 } },
        y: { '0s': { value: 100 } }
      })
    })

    it('should get property', () => {
      expect(properties.get('x')).to.be.an.instanceOf(Prop)
      expect(properties.get('x')).to.have.deep.property('keyframes.list[0].value', 10)

      expect(properties.get('y')).to.be.an.instanceOf(Prop)
      expect(properties.get('y')).to.have.deep.property('keyframes.list[0].value', 100)

      expect(properties.get('z')).to.be.an.instanceOf(Prop)
      expect(properties.get('z')).to.have.deep.property('keyframes.list[0].value', 1000)
    })

    it('should get undefined', () => {
      expect(properties.get('rotation')).to.be.undefined
    })
  })

  describe('#add', () => {
    let properties

    beforeEach(() => {
      properties = new Props()
    })

    it('should fail on invalid property', () => {
      expect(() => properties.add(null)).to.throw(/Invalid item/)
      expect(() => properties.add({})).to.throw(/Object is invalid/)
      expect(properties).to.have.lengthOf(0)
    })

    it('should add by object(s)', () => {
      properties.add({
        x: { '1s': { value: 10 }, '2s': { value: 100 } },
        y: { '0s': { value: 0 }, '1s': { value: 1000 } }
      })

      properties.add({ z: { '1s': { value: 1000 } } })

      expect(properties.at(0).toObject()).to.deep.equal({
        x: {
          '1s': { value: 10, ease: null },
          '2s': { value: 100, ease: null }
        }
      })
      expect(properties.at(1).toObject()).to.deep.equal({
        y: {
          '0s': { value: 0, ease: null },
          '1s': { value: 1000, ease: null }
        }
      })
      expect(properties.at(2).toObject()).to.deep.equal({
        z: {
          '1s': { value: 1000, ease: null }
        }
      })

      expect(properties).to.have.lengthOf(3)
      expect(properties.toObject()).to.deep.equal({
        x: {
          '1s': { value: 10, ease: null },
          '2s': { value: 100, ease: null }
        },
        y: {
          '0s': { value: 0, ease: null },
          '1s': { value: 1000, ease: null }
        },
        z: {
          '1s': { value: 1000, ease: null }
        }
      })
    })

    it('should add by instance', () => {
      properties.add(new Prop('x'))
      properties.add(new Prop('y'))


      expect(properties.at(0)).to.to.be.an.instanceOf(Prop)
      expect(properties.at(0).toObject()).to.deep.equal({ x: {} })

      expect(properties.at(1)).to.to.be.an.instanceOf(Prop)
      expect(properties.at(1).toObject()).to.deep.equal({ y: {} })

      expect(properties.toObject()).to.deep.equal({
        x: {},
        y: {}
      })
    })

    it('should add by array object', () => {
      properties.add([
        { x: { '0s': { value: 10 } } },
        { y: { '0s': { value: 0 } } }
      ])

      expect(properties.at(0)).to.to.be.an.instanceOf(Prop)
      expect(properties.at(0).toObject()).to.deep.equal({ x: { '0s': { value: 10, ease: null } } })

      expect(properties.at(1)).to.to.be.an.instanceOf(Prop)
      expect(properties.at(1).toObject()).to.deep.equal({ y: { '0s': { value: 0, ease: null } } })

      expect(properties.toObject()).to.deep.equal({
        x: { '0s': { value: 10, ease: null } },
        y: { '0s': { value: 0, ease: null } }
      })
    })

    it('should add by array instances', () => {
      properties.add([
        new Prop('x', [new Keyframe(0, 10), new Keyframe(10, 100)]),
        new Prop('y', [new Keyframe(0, 0), new Keyframe(20, 100)])
      ])

      expect(properties.at(0)).to.be.an.instanceOf(Prop)
      expect(properties.at(0).toObject()).to.deep.equal({
        x: {
          '0s': { value: 10, ease: null },
          '10s': { value: 100, ease: null }
        }
      })

      expect(properties.at(1)).to.be.an.instanceOf(Prop)
      expect(properties.at(1).toObject()).to.deep.equal({
        y: {
          '0s': { value: 0, ease: null },
          '20s': { value: 100, ease: null }
        }
      })

      expect(properties.toObject()).to.deep.equal({
        x: {
          '0s': { value: 10, ease: null },
          '10s': { value: 100, ease: null }
        },
        y: {
          '0s': { value: 0, ease: null },
          '20s': { value: 100, ease: null }
        }
      })
    })
  })

  describe('#remove', () => {
    it('should remove property from list', () => {
      const properties = new Props({
        x: {
          '0s': { value: 10, ease: null },
          '10s': { value: 100, ease: null }
        },
        y: {
          '0s': { value: 0, ease: null },
          '20s': { value: 100, ease: null }
        }
      })

      expect(properties).to.have.lengthOf(2)

      const spy = sinon.spy()
      properties.once('remove', spy)

      const prop = properties.at(0)
      properties.remove(prop)

      expect(properties).to.have.lengthOf(1)
      expect(spy.callCount).to.equal(1)
      expect(spy.withArgs(prop).callCount).to.equal(1)
    })
  })

  describe('#toObject', () => {
    it('should convert a valid object', () => {
      const properties = new Props([
        new Prop('x', { '1s': { value: 0 }, '2s': { value: 100 } }),
        new Prop('z', { '1s': { value: 0 }, '2s': { value: 100 } }),
        new Prop('y', { '1s': { value: 0 }, '2s': { value: 100 } })
      ])

      const val = {
        '1s': { value: 0, ease: null },
        '2s': { value: 100, ease: null }
      }

      expect(properties.toObject()).to.deep.equal({ x: val, y: val, z: val })
    })
  })

  describe('#toArray', () => {
    it('should convert a valid array', () => {
      const properties = new Props([
        new Prop('x', { '1s': { value: 0 }, '2s': { value: 100 } }),
        new Prop('z', { '1s': { value: 0 }, '2s': { value: 100 } }),
        new Prop('y', { '1s': { value: 0 }, '2s': { value: 100 } })
      ])

      const val = {
        '1s': { value: 0, ease: null },
        '2s': { value: 100, ease: null }
      }

      expect(properties.toArray()).to.deep.equal([
        { x: val },
        { y: val },
        { z: val }
      ])
    })
  })

  describe('#haveProp', () => {
    const properties = new Props({ x: {}, y: {}, z: {} })
    expect(properties.haveProp('x')).to.be.true
    expect(properties.haveProp('y')).to.be.true
    expect(properties.haveProp('z')).to.be.true
    expect(properties.haveProp('rotation')).to.be.false
    expect(properties.haveProp('scale')).to.be.false
  })

  describe('#destroy', () => {
    const spies = {
      'keyframeA': sinon.spy(),
      'keyframeB': sinon.spy(),
      'keyframes': sinon.spy(),
      'prop': sinon.spy(),
      'properties': sinon.spy()
    }

    const keyframeA = new Keyframe(0, 0)
    keyframeA.on('change', spies.keyframeA)

    const keyframeB = new Keyframe(10, 0)
    keyframeB.on('change', spies.keyframeB)

    const keyframes = new Keyframes([keyframeA, keyframeB])
    keyframes.on('change', spies.keyframes)

    const prop = new Prop('x', keyframes)
    prop.on('change', spies.prop)

    const properties = new Props([prop])
    properties.on('change', spies.properties)

    properties.destroy()

    properties.at(0).name = 'z'
    properties.at(0).keyframes.at(0).time = 1
    properties.at(0).keyframes.at(1).value = 1000

    expect(spies.keyframeA.callCount).to.equal(0)
    expect(spies.keyframeB.callCount).to.equal(0)
    expect(spies.keyframes.callCount).to.equal(0)
    expect(spies.prop.callCount).to.equal(0)
    expect(spies.properties.callCount).to.equal(0)
  })

  describe('dispatch changes', () => {
    let keyframe,
        keyframes,
        prop,
        properties,
        spy

    beforeEach(() => {
      spy = sinon.spy()

      keyframe = new Keyframe(0, 0)

      keyframes = new Keyframes([
        keyframe,
        new Keyframe(1, 100),
        new Keyframe(2, 1000)
      ])

      prop = new Prop('x', keyframes)
      properties = new Props([
        prop,
        new Prop('y', { '0s': { value: 0 }, '1s': { value: 10 }, '2s': { value: 100 } }),
        new Prop('z', { '0s': { value: 0 }, '1s': { value: 10 }, '2s': { value: 100 } })
      ])
    })

    it('should change list', () => {
      const list = []

      properties.on('change:list', spy)
      properties.list = list

      expect(spy.withArgs(list).calledOnce).to.be.true
    })

    it('should add property', () => {
      properties.on('add', spy)

      properties.add(new Prop('rotation'))
      properties.add(new Prop('scale'))

      expect(spy.callCount).to.equal(2)
      expect(properties).to.have.lengthOf(5)
      expect(properties.toObject()).to.deep.equal({
        rotation: {},
        scale: {},
        x: {
          '0s': { value: 0, ease: null },
          '1s': { value: 100, ease: null },
          '2s': { value: 1000, ease: null }
        },
        y: {
          '0s': { value: 0, ease: null },
          '1s': { value: 10, ease: null },
          '2s': { value: 100, ease: null }
        },
        z: {
          '0s': { value: 0, ease: null },
          '1s': { value: 10, ease: null },
          '2s': { value: 100, ease: null }
        }
      })

      expect(spy.getCall(0).args[0]).to.be.an.instanceOf(Prop)
      expect(spy.getCall(0).args[0].toObject()).to.deep.equal({ rotation: {} })

      expect(spy.getCall(1).args[0]).to.be.an.instanceOf(Prop)
      expect(spy.getCall(1).args[0].toObject()).to.deep.equal({ scale: {} })
    })

    it('should remove property', () => {
      properties.on('remove', spy)

      properties.remove(prop)

      expect(spy.callCount).to.equal(1)
      expect(properties).to.have.lengthOf(2)
      expect(properties.toObject()).to.deep.equal({
        y: {
          '0s': { value: 0, ease: null },
          '1s': { value: 10, ease: null },
          '2s': { value: 100, ease: null }
        },
        z: {
          '0s': { value: 0, ease: null },
          '1s': { value: 10, ease: null },
          '2s': { value: 100, ease: null }
        }
      })

      expect(spy.getCall(0).args[0]).to.be.an.instanceOf(Prop)
      expect(spy.getCall(0).args[0].toObject()).to.deep.equal({
        x: {
          '0s': { value: 0, ease: null },
          '1s': { value: 100, ease: null },
          '2s': { value: 1000, ease: null }
        }
      })
    })

    it('should change property name', () => {
      const spyName = sinon.spy()

      properties.on('change', spy)
      properties.on('change:name', spyName)

      prop.name = 'renamed'
      prop.name = 'x'

      const expectSpy = spy => {
        expect(spy.callCount).to.equal(2)
        expect(spy.getCall(0).args[0]).to.have.deep.property('changed.from', 'x')
        expect(spy.getCall(0).args[0]).to.have.deep.property('changed.to', 'renamed')

        expect(spy.getCall(1).args[0]).to.have.deep.property('changed.from', 'renamed')
        expect(spy.getCall(1).args[0]).to.have.deep.property('changed.to', 'x')
      }

      expectSpy(spy)
      expectSpy(spyName)
    })

    it('should change property keyframes', () => {
      const spyKeyframes = sinon.spy()

      properties.on('change', spy)
      properties.on('change:keyframes', spyKeyframes)

      prop.keyframes = new Keyframes({
        '0s': { value: 0 },
        '1s': { value: 0 }
      })

      const expectSpy = spy => {
        expect(spy.callCount).to.equal(1)
        expect(spy.getCall(0).args[0]).to.have.deep.property('changed.from').to.deep.equal([
          { '0s': { value: 0, ease: null } },
          { '1s': { value: 100, ease: null } },
          { '2s': { value: 1000, ease: null } }
        ])
        expect(spy.getCall(0).args[0]).to.have.deep.property('changed.to').to.deep.equal({
          '0s': { value: 0, ease: null },
          '1s': { value: 0, ease: null }
        })
      }

      expectSpy(spy)
      expectSpy(spyKeyframes)
    })

    it('should change keyframes list', () => {
      const list = []

      properties.on('change:keyframes:list', spy)
      prop.keyframes.list = list

      expect(spy.callCount).to.equal(1)
      expect(spy.getCall(0).args[0]).to.equal(list)
    })

    it('should change keyframe value', () => {
      const spyValue = sinon.spy()

      properties.on('change:keyframe', spy)
      properties.on('change:keyframe:value', spyValue)

      prop.keyframes.at(0).value = 50
      prop.keyframes.at(1).value = 200

      const expectSpy = spy => {
        expect(spy.callCount).to.equal(2)

        expect(spy.getCall(0).args[0]).to.have.deep.property('changed.from').to.equal(0)
        expect(spy.getCall(0).args[0]).to.have.deep.property('changed.to').to.equal(50)
        expect(spy.getCall(1).args[0]).to.have.deep.property('changed.from').to.equal(100)
        expect(spy.getCall(1).args[0]).to.have.deep.property('changed.to').to.equal(200)
      }

      expectSpy(spy)
      expectSpy(spyValue)
    })

    it('should change keyframe time', () => {
      const spyTime = sinon.spy()

      properties.on('change:keyframe', spy)
      properties.on('change:keyframe:time', spyTime)

      prop.keyframes.at(0).time = 50
      prop.keyframes.at(1).time = 200

      const expectSpy = spy => {
        expect(spy.callCount).to.equal(2)

        expect(spy.getCall(0).args[0]).to.have.deep.property('changed.from').to.equal(0)
        expect(spy.getCall(0).args[0]).to.have.deep.property('changed.to').to.equal(50)
        expect(spy.getCall(1).args[0]).to.have.deep.property('changed.from').to.equal(1)
        expect(spy.getCall(1).args[0]).to.have.deep.property('changed.to').to.equal(200)
      }

      expectSpy(spy)
      expectSpy(spyTime)
    })

    it('should change keyframe ease', () => {
      const spyEase = sinon.spy()

      properties.on('change:keyframe', spy)
      properties.on('change:keyframe:ease', spyEase)

      prop.keyframes.at(0).ease = 'Power3.easeOut'
      prop.keyframes.at(1).ease = 'Strong.easeInOut'

      const expectSpy = spy => {
        expect(spy.callCount).to.equal(2)

        expect(spy.getCall(0).args[0]).to.have.deep.property('changed.from').to.equal(null)
        expect(spy.getCall(0).args[0]).to.have.deep.property('changed.to').to.equal('Power3.easeOut')
        expect(spy.getCall(1).args[0]).to.have.deep.property('changed.from').to.equal(null)
        expect(spy.getCall(1).args[0]).to.have.deep.property('changed.to').to.equal('Strong.easeInOut')
      }

      expectSpy(spy)
      expectSpy(spyEase)
    })

    it('should add keyframe', () => {
      properties.on('add:keyframe', spy)

      prop.keyframes.add({ '10s': { value: 10.5 } })
      properties.at(2).keyframes.add({ '12s': { value: 10 } })

      expect(spy.callCount).to.equal(2)
      expect(spy.getCall(0).args[0]).to.be.an.instanceOf(Keyframe)
      expect(spy.getCall(0).args[0].toObject()).to.deep.equal({ '10s': { value: 10.5, ease: null } })
      expect(spy.getCall(1).args[0]).to.be.an.instanceOf(Keyframe)
      expect(spy.getCall(1).args[0].toObject()).to.deep.equal({ '12s': { value: 10, ease: null } })
    })

    it('should remove keyframe', () => {
      properties.on('remove:keyframe', spy)

      prop.keyframes.remove(keyframe)

      expect(spy.callCount).to.equal(1)
      expect(spy.getCall(0).args[0]).to.be.an.instanceOf(Keyframe)
      expect(spy.getCall(0).args[0].toObject()).to.deep.equal(keyframe.toObject())
    })

  })

})
