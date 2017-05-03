import Prop from '../src/group/prop'
import Keyframes from '../src/group/keyframes'
import Keyframe from '../src/group/keyframe'

describe.only('property', () => {

  it('should create an empty property', () => {
    const prop = new Prop('x')
    expect(prop).to.have.property('name', 'x')
    expect(prop).to.have.property('keyframes').to.be.an.instanceOf(Keyframes).to.have.lengthOf(0)
  })

  it('should create a property with keyframes', () => {
    const prop = new Prop('y', {
      '0s': { value: 10 },
      '1s': { value: 100 },
      '2s': { value: 200 }
    })

    expect(prop).to.have.property('name', 'y')
    expect(prop).to.have.property('keyframes').to.have.lengthOf(3)

    expect(prop.keyframes.toObject()).to.deep.equal({
      '0s': { value: 10, ease: null },
      '1s': { value: 100, ease: null },
      '2s': { value: 200, ease: null }
    })
  })

  it('should create an object', () => {
    expect(new Prop('z', {
      '0s': { value: 10 },
      '1s': { value: 100 },
      '2s': { value: 200 }
    }).toObject()).to.deep.equal({
      z: {
        '0s': { value: 10, ease: null },
        '1s': { value: 100, ease: null },
        '2s': { value: 200, ease: null }
      }
    })
  })

  it('should fail on invalid name', () => {
    expect(() => new Prop()).to.throw(/Name must be a string/)
    expect(() => new Prop(123)).to.throw(/Name must be a string/)
  })

  describe('from object', () => {

    it('should fail on parse invalid object', () => {
      expect(() => Prop.fromObject(123)).to.throw(/Object is invalid/)
      expect(() => Prop.fromObject({})).to.throw(/Object is invalid/)
      expect(() => Prop.fromObject({ x: 123 })).to.throw(/Object is invalid/)
      expect(() => Prop.fromObject([])).to.throw(/Object is invalid/)
    })

    it('should fail on parse invalid name', () => {
      expect(() => Prop.fromObject({ 1: {} })).to.throw(/Name must be a string/)
    })

    it('should fail on parse invalid time', () => {
      expect(() => Prop.fromObject({ x: { 'invalid-time': { value: 10 } } })).to.throw(/Invalid time/)
    })

    it('should fail on parse invalid value', () => {
      expect(() => Prop.fromObject({ x: { '1s': { novalue: 123 } } })).to.throw(/No value found/)
    })

    it('should parse valid object', () => {
      const prop = Prop.fromObject({
        x: {
          '0s': { value: 10 },
          '1s': { value: 100 },
          '2s': { value: 200, ease: 'Power3.easeInOut' }
        }
      })

      expect(prop).to.have.property('name', 'x')
      expect(prop).to.have.property('keyframes').to.be.an.instanceOf(Keyframes).to.have.lengthOf(3)
      expect(prop.toObject()).to.deep.equal({
        x: {
          '0s': { value: 10, ease: null },
          '1s': { value: 100, ease: null },
          '2s': { value: 200, ease: 'Power3.easeInOut' }
        }
      })

    })
  })

  describe('dispatch events', () => {

    let spyA,
        spyB

    beforeEach(() => {
      spyA = sinon.spy()
      spyB = sinon.spy()
    })

    it('should dispatch name change', () => {

      const prop = new Prop('x')
      prop.on('change:name', spyA)
      prop.on('change', spyB)

      prop.name = 'y'
      prop.name = 'z'

      expect(spyA.callCount).to.equal(2)
      expect(spyB.callCount).to.equal(2)

      expect(spyA.getCall(0).args[0]).to.deep.equal({
        previous: { x: {} },
        current: { y: {} },
        changed: { type: 'name', from: 'x', to: 'y' }
      })
      expect(spyB.getCall(0).args[0]).to.deep.equal({
        previous: { x: {} },
        current: { y: {} },
        changed: { type: 'name', from: 'x', to: 'y' }
      })
      expect(spyA.getCall(1).args[0]).to.deep.equal({
        previous: { y: {} },
        current: { z: {} },
        changed: { type: 'name', from: 'y', to: 'z' }
      })
      expect(spyB.getCall(1).args[0]).to.deep.equal({
        previous: { y: {} },
        current: { z: {} },
        changed: { type: 'name', from: 'y', to: 'z' }
      })
    })

    it('should dispatch keyframes change', () => {
      const prop = new Prop('x')
      prop.on('change:keyframes', spyA)
      prop.on('change', spyB)

      prop.keyframes = new Keyframes({
        '1s': { value: 10 },
        '2s': { value: 100 }
      })

      prop.keyframes = {
        '0s': { value: 10 },
        '5s': { value: 100 }
      }

      expect(spyA.callCount).to.equal(2)
      expect(spyB.callCount).to.equal(2)

      expect(spyA.getCall(0).args[0]).to.deep.equal({
        previous: { x: {} },
        current: {
          x: { '1s': { value: 10, ease: null }, '2s': { value: 100, ease: null } }
        },
        changed: {
          type: 'keyframes',
          from: [],
          to: { '1s': { value: 10, ease: null }, '2s': { value: 100, ease: null } }
        }
      })
      expect(spyB.getCall(0).args[0]).to.deep.equal({
        previous: { x: {} },
        current: {
          x: { '1s': { value: 10, ease: null }, '2s': { value: 100, ease: null } }
        },
        changed: {
          type: 'keyframes',
          from: [],
          to: { '1s': { value: 10, ease: null }, '2s': { value: 100, ease: null } }
        }
      })

      expect(spyA.getCall(1).args[0]).to.deep.equal({
        previous: {
          x: { '1s': { value: 10, ease: null }, '2s': { value: 100, ease: null } }
        },
        current: {
          x: { '0s': { value: 10, ease: null }, '5s': { value: 100, ease: null } }
        },
        changed: {
          type: 'keyframes',
          from: [{ '1s': { value: 10, ease: null } }, { '2s': { value: 100, ease: null } }],
          to: { '0s': { value: 10 }, '5s': { value: 100 } }
        }
      })
      expect(spyB.getCall(1).args[0]).to.deep.equal({
        previous: {
          x: { '1s': { value: 10, ease: null }, '2s': { value: 100, ease: null } }
        },
        current: {
          x: { '0s': { value: 10, ease: null }, '5s': { value: 100, ease: null } }
        },
        changed: {
          type: 'keyframes',
          from: [{ '1s': { value: 10, ease: null } }, { '2s': { value: 100, ease: null } }],
          to: { '0s': { value: 10 }, '5s': { value: 100 } }
        }
      })
    })

    it('should dispatch keyframe add', () => {
      const prop = new Prop('x')
      prop.on('add:keyframe', spyA)

      prop.keyframes.add({
        '1s': { value: 0 },
        '2s': { value: 100 }
      })

      prop.keyframes.add(new Keyframe(0, 0))

      expect(spyA.callCount).to.equal(3)

      expect(spyA.getCall(0).args[0]).to.be.an.instanceOf(Keyframe)
      expect(spyA.getCall(1).args[0]).to.be.an.instanceOf(Keyframe)
      expect(spyA.getCall(2).args[0]).to.be.an.instanceOf(Keyframe)
      expect(spyA.getCall(0).args[0].toObject()).to.deep.equal({ '1s': { value: 0, ease: null } })
      expect(spyA.getCall(1).args[0].toObject()).to.deep.equal({ '2s': { value: 100, ease: null } })
      expect(spyA.getCall(2).args[0].toObject()).to.deep.equal({ '0s': { value: 0, ease: null } })
      expect(prop.toObject()).to.deep.equal({
        x: {
          '0s': { value: 0, ease: null },
          '1s': { value: 0, ease: null },
          '2s': { value: 100, ease: null }
        }
      })
    })

    it('should dispatch keyframe remove', () => {
      const prop = new Prop('rotation', {
        '0s': { value: 0 },
        '1s': { value: 100 },
        '2s': { value: 200 },
        '3s': { value: 300 }
      })

      prop.on('remove:keyframe', spyA)

      const keyframeA = prop.keyframes.get(1)
      const keyframeB = prop.keyframes.get(3)

      prop.keyframes.remove(keyframeA)
      prop.keyframes.remove(keyframeB)

      expect(spyA.callCount).to.equal(2)

      expect(spyA.getCall(0).args[0]).to.be.an.instanceOf(Keyframe)
      expect(spyA.getCall(1).args[0]).to.be.an.instanceOf(Keyframe)
      expect(spyA.getCall(0).args[0].toObject()).to.deep.equal({ '1s': { value: 100, ease: null } })
      expect(spyA.getCall(1).args[0].toObject()).to.deep.equal({ '3s': { value: 300, ease: null } })
      expect(prop.toObject()).to.deep.equal({
        rotation: {
          '0s': { value: 0, ease: null },
          '2s': { value: 200, ease: null }
        }
      })
    })
  })

})
