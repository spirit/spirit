import Prop from '../src/group/prop'
import Keyframes from '../src/group/keyframes'

describe('property', () => {

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
    
  })

})
