import Keyframes from '../src/group/keyframes'
import Keyframe from '../src/group/keyframe'

describe('keyframes', () => {

  it('should have empty keyframes', () => {
    expect(new Keyframes()).to.have.lengthOf(0)
  })

  it('should parse object of keyframes', () => {
    const keyframes = new Keyframes({ '0s': { value: 0 }, '10s': { value: 100 } })
    expect(keyframes).to.have.lengthOf(2)
    expect(keyframes.toArray()).to.deep.equal([
      { '0s': { value: 0, ease: null } },
      { '10s': { value: 100, ease: null } }
    ])
  })

  describe('list', () => {
    it('should get list', () => {
      const keyframes = new Keyframes({
        '0s': { value: 0 },
        '10s': { value: 100 },
        '20.234s': { value: 1000 }
      })

      expect(keyframes.list.map(k => k.toObject())).to.deep.equal(keyframes.toArray())
    })

    it('should fail to set invalid list', () => {
      const keyframes = new Keyframes()
      expect(() => keyframes.list = null).to.throw(/List should be an array/)
      expect(() => keyframes.list = {}).to.throw(/List should be an array/)
    })

    it('should set new list', () => {
      const keyframes = new Keyframes()
      const list = []
      keyframes.list = list
      expect(keyframes.list).equal(list)
    })
  })

  describe('#at', () => {
    it('should fail on retrieve invalid index', () => {
      expect(() => new Keyframes({ '10s': { value: 0 } }).at(2)).to.throw(/Index exceeded/)
    })

    it('should return keyframe by index', () => {
      const frames = new Keyframes({ '10s': { value: 100 }, '20s': { value: 200 } })
      expect(frames.at(0)).to.have.property('time', 10)
      expect(frames.at(0)).to.have.property('value', 100)
      expect(frames.at(1)).to.have.property('time', 20)
      expect(frames.at(1)).to.have.property('value', 200)
    })
  })

  describe('#add', () => {
    let keyframes

    beforeEach(() => {
      keyframes = new Keyframes()
    })

    it('should fail on invalid keyframe', () => {
      expect(() => keyframes.add(null)).to.throw(/Invalid item/)
      expect(() => keyframes.add({})).to.throw(/Object is invalid/)
      expect(keyframes).to.have.lengthOf(0)
    })

    it('should add by object(s)', () => {
      keyframes.add({
        '002s': { value: 200 },
        '5s': { value: 300 },
        '10s': { value: 400 }
      })
      keyframes.add({ '3s': { value: 1000 } })

      expect(keyframes.at(0).toObject()).to.deep.equal({ '2s': { value: 200, ease: null } })
      expect(keyframes.at(1).toObject()).to.deep.equal({ '3s': { value: 1000, ease: null } })
      expect(keyframes.at(2).toObject()).to.deep.equal({ '5s': { value: 300, ease: null } })
      expect(keyframes.at(3).toObject()).to.deep.equal({ '10s': { value: 400, ease: null } })
    })

    it('should add by instance', () => {
      keyframes.add(new Keyframe(20, 200))
      keyframes.add(new Keyframe(0.1, 10))
      expect(keyframes.at(0).toObject()).to.deep.equal({ '0.1s': { value: 10, ease: null } })
      expect(keyframes.at(1).toObject()).to.deep.equal({ '20s': { value: 200, ease: null } })
    })

    it('should add by array object', () => {
      keyframes.add([
        { '1s': { value: 0, ease: 'Power1.easeOut' } },
        { '0.2s': { value: 10, ease: 'Linear.easeNone' } }
      ])
      expect(keyframes.at(0).toObject()).to.deep.equal({ '0.2s': { value: 10, ease: 'Linear.easeNone' } })
      expect(keyframes.at(1).toObject()).to.deep.equal({ '1s': { value: 0, ease: 'Power1.easeOut' } })
    })

    it('should add by array instances', () => {
      keyframes.add([
        new Keyframe(10, 100, 'Linear.easeNone'),
        new Keyframe(2, 300, 'Power3.easeInOut')
      ])
      expect(keyframes.at(0).toObject()).to.deep.equal({ '2s': { value: 300, ease: 'Power3.easeInOut' } })
      expect(keyframes.at(1).toObject()).to.deep.equal({ '10s': { value: 100, ease: 'Linear.easeNone' } })
    })
  })

  describe('#remove', () => {
    it('should remove keyframe from list', () => {

      const keyframes = new Keyframes({
        '1s': { value: 100 },
        '2s': { value: 200 }
      })
      expect(keyframes).to.have.lengthOf(2)

      const spy = sinon.spy()
      keyframes.once('remove', spy)

      const frame = keyframes.at(0)
      keyframes.remove(frame)

      expect(keyframes).to.have.lengthOf(1)
      expect(spy.callCount).to.equal(1)
      expect(spy.withArgs(frame).callCount).to.equal(1)
    })
  })

  describe('#get', () => {
    let keyframes

    beforeEach(() => {
      keyframes = new Keyframes({
        '0s': { value: 0 },
        '19.45s': { value: 110 },
        '110s': { value: 200 }
      })
    })

    it('should get keyframe', () => {
      expect(keyframes.get('19.45s')).to.be.an.instanceOf(Keyframe)
      expect(keyframes.get('19.45s')).to.have.property('time', 19.45)
      expect(keyframes.get('19.45s')).to.have.property('value', 110)

      expect(keyframes.get(19.45)).to.be.an.instanceOf(Keyframe)
      expect(keyframes.get(19.45)).to.have.property('time', 19.45)
      expect(keyframes.get(19.45)).to.have.property('value', 110)
    })

    it('should get undefined', () => {
      expect(keyframes.get(10)).to.be.undefined
    })
  })

  describe('#toObject', () => {
    it('should convert a valid object', () => {
      const keyframes = new Keyframes([
        new Keyframe(0, 0),
        new Keyframe(2.43455, 1000),
        new Keyframe(1.45, 2000, 'Power3.easeInOut'),
        new Keyframe(40, 100)
      ])
      expect(keyframes.toObject()).to.deep.equal({
        '0s': { value: 0, ease: null },
        '1.45s': { value: 2000, ease: 'Power3.easeInOut' },
        '2.43455s': { value: 1000, ease: null },
        '40s': { value: 100, ease: null }
      })
    })
  })

  describe('parse array', () => {
    function testPresence(keyframes, result) {
      expect(keyframes).to.have.lengthOf(3)
      expect(keyframes.at(0)).to.be.an.instanceOf(Keyframe)
      expect(keyframes.at(1)).to.be.an.instanceOf(Keyframe)
      expect(keyframes.at(2)).to.be.an.instanceOf(Keyframe)
      expect(keyframes.toArray()).to.deep.equal(result)
    }

    it('should parse keyframes by object array', () => {
      const keyframes = new Keyframes([
        { '0s': { value: 0 } },
        { '10.5s': { value: 1000, ease: 'Linear.easeNone' } },
        { '25.34s': { value: 400, ease: 'Power3.easeOut' } }
      ])

      testPresence(keyframes, [
        { '0s': { value: 0, ease: null } },
        { '10.5s': { value: 1000, ease: 'Linear.easeNone' } },
        { '25.34s': { value: 400, ease: 'Power3.easeOut' } }
      ])
    })

    it('should parse keyframes by instance array', () => {
      const keyframes = new Keyframes([
        new Keyframe(0, 0),
        new Keyframe(10.5, 1000, 'Linear.easeNone'),
        new Keyframe(25.34, 400, 'Power3.easeOut')
      ])

      testPresence(keyframes, [
        { '0s': { value: 0, ease: null } },
        { '10.5s': { value: 1000, ease: 'Linear.easeNone' } },
        { '25.34s': { value: 400, ease: 'Power3.easeOut' } }
      ])
    })
  })

  describe('duplicates', () => {
    it('should not allow time duplicates', () => {
      const keyframes = new Keyframes({
        '0.2s': { value: 1000 },
        '12.2s': { value: 50 }
      })

      expect(() => keyframes.add({ '0.2s': { value: 200 } })).to.throw(/List has duplicates/)
      expect(() => new Keyframes([
        { '0.2s': { value: 1000 } },
        { '0.2s': { value: 50 } }
      ])).to.throw(/List has duplicates/)
    })
  })

  describe('linked list', () => {
    let keyframes

    beforeEach(() => {
      keyframes = new Keyframes([
        new Keyframe(0, 0),
        new Keyframe(1.5, 100),
        new Keyframe(0.5, 500),
        new Keyframe(10.2, 20)
      ])
    })

    it('should have linked keyframes', () => {
      expect(keyframes.get(0)).to.have.property('_prev', null)
      expect(keyframes.get(0)).to.have.property('_next', keyframes.get(0.5))

      expect(keyframes.get(0.5)).to.have.property('_prev', keyframes.get(0))
      expect(keyframes.get(0.5)).to.have.property('_next', keyframes.get(1.5))

      expect(keyframes.get(1.5)).to.have.property('_prev', keyframes.get(0.5))
      expect(keyframes.get(1.5)).to.have.property('_next', keyframes.get(10.2))

      expect(keyframes.get(10.2)).to.have.property('_prev', keyframes.get(1.5))
      expect(keyframes.get(10.2)).to.have.property('_next', null)
    })

    it('should cycle over linked list next', () => {
      let res = {}
      let k = keyframes.get(0)

      while (k) {
        res = { ...res, ...k.toObject() }
        k = k.next()
      }

      expect(res).to.deep.equal(keyframes.toObject())
    })

    it('should cycle over linked list prev', () => {
      let res = {}
      let k = keyframes.get(10.2)

      while (k) {
        res = { ...res, ...k.toObject() }
        k = k.prev()
      }

      expect(res).to.deep.equal(keyframes.toObject())
    })
  })

  describe('dispatch changes', () => {
    let keyframes,
        keyframe

    beforeEach(() => {
      keyframes = new Keyframes([
        new Keyframe(0, 100),
        new Keyframe(20, 400),
        new Keyframe(50, 1000)
      ])

      keyframe = keyframes.get(20)
    })

    it('should change list', () => {
      const spy = sinon.spy()
      const keyframes = new Keyframes()
      const list = []

      keyframes.on('change:list', spy)
      keyframes.list = list

      expect(spy.withArgs(list).calledOnce).to.be.true
    })

    it('should add keyframe', () => {
      const spy = sinon.spy()
      const keyframe = new Keyframe(100, 2000)

      keyframes.on('add', spy)
      keyframes.add(keyframe)
      keyframes.add({ '200s': { value: 3000 } })

      expect(spy.callCount).to.equal(2)
      expect(keyframes).to.have.lengthOf(5)
      expect(keyframes.toObject()).to.deep.equal({
        '0s': { value: 100, ease: null },
        '20s': { value: 400, ease: null },
        '50s': { value: 1000, ease: null },
        '100s': { value: 2000, ease: null },
        '200s': { value: 3000, ease: null }
      })
    })

    it('should remove keyframe', () => {
      const spy = sinon.spy()
      keyframes.on('remove', spy)

      keyframes.remove(keyframes.at(1))  // remove 20s
      keyframes.remove(keyframes.at(1))  // remove 50s

      expect(spy.callCount).to.equal(2)

      expect(spy.getCall(0).args[0]).to.have.property('time', 20)
      expect(spy.getCall(1).args[0]).to.have.property('time', 50)
    })

    it('should emit value change', () => {
      const spyKeyframes = sinon.spy()
      const spyKeyframesValue = sinon.spy()
      const spyKeyframe = sinon.spy()

      keyframe.on('change:value', spyKeyframe)
      keyframes.on('change', spyKeyframes)
      keyframes.on('change:value', spyKeyframesValue)

      keyframe.value += 100
      keyframe.value++

      expect(keyframe).to.have.property('value', 501)

      // keyframes
      const expectSpy = spy => {
        expect(spy.calledTwice).to.be.true
        expect(spy.getCall(0).args[0]).to.deep.equal({
          previous: { '20s': { value: 400, ease: null } },
          current: { '20s': { value: 500, ease: null } },
          changed: { type: 'value', from: 400, to: 500 }
        })
        expect(spy.getCall(1).args[0]).to.deep.equal({
          previous: { '20s': { value: 500, ease: null } },
          current: { '20s': { value: 501, ease: null } },
          changed: { type: 'value', from: 500, to: 501 }
        })
      }

      expectSpy(spyKeyframes)
      expectSpy(spyKeyframesValue)
      expectSpy(spyKeyframe)
    })

    it('should emit time change', () => {
      const spyKeyframes = sinon.spy()
      const spyKeyframesTime = sinon.spy()
      const spyKeyframe = sinon.spy()

      keyframe.on('change:time', spyKeyframe)
      keyframes.on('change', spyKeyframes)
      keyframes.on('change:time', spyKeyframesTime)

      keyframe.time = 0.005
      keyframe.time++

      const expectSpy = spy => {
        expect(spy.calledTwice).to.be.true
        expect(spy.getCall(0).args[0]).to.deep.equal({
          previous: { '20s': { value: 400, ease: null } },
          current: { '0.005s': { value: 400, ease: null } },
          changed: { type: 'time', from: 20, to: 0.005 }
        })
        expect(spy.getCall(1).args[0]).to.deep.equal({
          previous: { '0.005s': { value: 400, ease: null } },
          current: { '1.005s': { value: 400, ease: null } },
          changed: { type: 'time', from: 0.005, to: 1.005 }
        })
      }

      expectSpy(spyKeyframes)
      expectSpy(spyKeyframesTime)
      expectSpy(spyKeyframe)
    })

    it('should emit ease change', () => {
      const spyKeyframes = sinon.spy()
      const spyKeyframesEase = sinon.spy()
      const spyKeyframe = sinon.spy()

      keyframe.on('change:ease', spyKeyframe)
      keyframes.on('change', spyKeyframes)
      keyframes.on('change:ease', spyKeyframesEase)

      keyframe.ease = 'Power2.easeOut'
      keyframe.ease = null

      const expectSpy = spy => {
        expect(spy.calledTwice).to.be.true
        expect(spy.getCall(0).args[0]).to.deep.equal({
          previous: { '20s': { value: 400, ease: null } },
          current: { '20s': { value: 400, ease: 'Power2.easeOut' } },
          changed: { type: 'ease', from: null, to: 'Power2.easeOut' }
        })
        expect(spy.getCall(1).args[0]).to.deep.equal({
          previous: { '20s': { value: 400, ease: 'Power2.easeOut' } },
          current: { '20s': { value: 400, ease: null } },
          changed: { type: 'ease', from: 'Power2.easeOut', to: null }
        })
      }

      expectSpy(spyKeyframes)
      expectSpy(spyKeyframesEase)
      expectSpy(spyKeyframe)
    })
  })

})
