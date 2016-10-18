import Transitions from '../src/group/transitions'
import Transition from '../src/group/transition'
import EvalMap from '../src/group/evalmap'

describe('transitions', () => {

  it('should have empty transitions', () => {
    expect(new Transitions()).to.have.lengthOf(0)
  })

  it('should parse array of transitions by objects', () => {
    const trs = new Transitions([{ frame: 0 }, { frame: 12 }, { frame: 49 }])
    expect(trs).to.have.lengthOf(3)
    expect(trs.at(0).toObject(true)).to.deep.equal({ frame: 0, ease: 'Linear.easeNone', params: [] })
    expect(trs.at(1).toObject(true)).to.deep.equal({ frame: 12, ease: 'Linear.easeNone', params: [] })
    expect(trs.at(2).toObject(true)).to.deep.equal({ frame: 49, ease: 'Linear.easeNone', params: [] })
  })

  describe('duplicates', () => {
    it('should not allow duplicate frames', () => {
      expect(() => new Transitions([{ frame: 10 }, { frame: 10 }])).to.throw(/List has duplicates/)
    })
    it('should not allow add duplicate', () => {
      const trs = new Transitions([{ frame: 12 }])
      expect(() => trs.add({ frame: 12 })).to.throw(/List has duplicates/)
    })
  })

  describe('#toArray', () => {

    let trs

    beforeEach(() => {
      trs = new Transitions([{ frame: 0 }, { frame: 12 }, { frame: 49, params: { x: 200, y: 500 } }])
    })

    it('should convert to object', () => {
      expect(trs.toArray()).to.deep.equal([
        { frame: 0, ease: 'Linear.easeNone', params: {} },
        { frame: 12, ease: 'Linear.easeNone', params: {} },
        { frame: 49, ease: 'Linear.easeNone', params: { x: 200, y: 500 } },
      ])
    })

    it('should convert to object with params as array', () => {
      expect(trs.list.map(tr => tr.toObject(true))).to.deep.equal([
        { frame: 0, ease: 'Linear.easeNone', params: [] },
        { frame: 12, ease: 'Linear.easeNone', params: [] },
        { frame: 49, ease: 'Linear.easeNone', params: [{ x: 200 }, { y: 500 }] },
      ])
    })
  })

  describe('#get', () => {

    let trs

    beforeEach(() => {
      trs = new Transitions([{ frame: 0 }, { frame: 12 }, { frame: 49, params: { x: 200, y: 500 } }])
    })

    it('should get a transition by frame', () => {
      const tr = trs.get(49)
      expect(tr).to.be.an.instanceOf(Transition)
      expect(tr.params.toObject()).to.deep.equal({ x: 200, y: 500 })
    })

    it('should get no transition by frame', () => {
      expect(trs.get(4)).to.be.undefined
      expect(trs.get(13)).to.be.undefined
    })
  })

  describe('#haveFrame', () => {

    let trs

    beforeEach(() => {
      trs = new Transitions([{ frame: 0 }, { frame: 12 }, { frame: 49, params: { x: 200, y: 500 } }])
    })

    it('should have transition with frame', () => {
      expect(trs.haveFrame(12)).to.be.true
    })

    it('should not have a transition with frame', () => {
      expect(trs.haveFrame(13)).to.be.false
    })
  })

  describe('sort', () => {
    let trs

    beforeEach(() => {
      trs = new Transitions([
        { frame: 40 },
        { frame: 2 },
        { frame: 15, params: { x: 200, y: 500 } }
      ])
    })

    it('should have transitions sorted by frame', () => {
      expect(trs.toArray()).to.deep.equal([
        { frame: 2, ease: 'Linear.easeNone', params: {} },
        {
          frame: 15,
          ease: 'Linear.easeNone',
          params: { x: 200, y: 500 }
        },
        { frame: 40, ease: 'Linear.easeNone', params: {} }
      ])
    })

    it('should automatically insert transition by frame', () => {
      trs.add([{ frame: 33 }, { frame: 1 }])
      expect(trs.list.map(tr => tr.frame)).to.deep.equal([1, 2, 15, 33, 40])
    })
  })

  describe('linked transitions', () => {
    let trs

    beforeEach(() => {
      trs = new Transitions([
        { frame: 40 },
        { frame: 2 },
        { frame: 15, params: { x: 200, y: 500 } }
      ])
    })

    it('should have linked the transitions', () => {
      expect(trs.get(2)).to.have.property('_prev', null)
      expect(trs.get(2)).to.have.property('_next', trs.get(15))

      expect(trs.get(15)).to.have.property('_prev', trs.get(2))
      expect(trs.get(15)).to.have.property('_next', trs.get(40))

      expect(trs.get(40)).to.have.property('_prev', trs.get(15))
      expect(trs.get(40)).to.have.property('_next', null)
    })

  })

  describe('mapping', () => {

    let trs

    beforeEach(() => {
      trs = new Transitions([{ frame: 1 }, { frame: 2 }, { frame: 3 }, { frame: 4 }])
      trs.mappings = [
        new EvalMap(/foo/, { foo: 'bar' }),
        new EvalMap(/bar/, { bar: 'foo' })
      ]
    })

    it('should apply mappings for existing transitions', () => {
      trs.each(tr => {
        expect(tr.params.mappings).to.deep.equal(trs.mappings)
      })
    })

    it('should apply mappings for transitions to add', () => {
      const added = trs.add({ frame: 10 })
      expect(added.params.mappings).to.deep.equal(trs.mappings)
    })

    it('should remove mappings on transition removal', () => {
      expect(trs.remove(trs.get(1)))
        .to.have.deep.property('params.mappings')
        .to.deep.equal([])

      trs.remove([trs.get(2), trs.get(4)]).forEach(tr => {
        expect(tr)
          .to.have.deep.property('params.mappings')
          .to.deep.equal([])
      })
    })

    it('should reassign mappings for new params', () => {
      trs.get(2).params = { x: 200, y: 300 }
      expect(trs.get(2))
        .to.have.deep.property('params.mappings')
        .to.deep.equal(trs.mappings)
    })

  })

  describe('destroy', () => {

    it('should destroy all transitions', () => {

      const trs = new Transitions([
        { frame: 12, params: { x: 100, y: 200 } },
        { frame: 24, params: { x: 100, y: 200 } },
        { frame: 48, params: { x: 100, y: 200 } }
      ])

      const spyTrs = sinon.spy()
      const spyTr = sinon.spy()

      trs.on('change:frame', spyTrs)
      trs.on('change:param:value', spyTrs)
      trs.on('change:params', spyTrs)

      trs.get(12).on('change:param', spyTr)
      trs.get(12).on('change:frame', spyTr)
      trs.get(24).on('change:ease', spyTr)

      // mutate
      trs.get(12).frame = 33
      trs.get(33).params.get('x').value = 1000
      trs.get(24).ease = 'Quint.easeOut'
      trs.get(48).params = []

      expect(spyTrs.callCount).to.equal(3)
      expect(spyTr.callCount).to.equal(3)

      trs.destroy()

      // mutate
      trs.get(33).frame = 12
      trs.get(12).params.get('x').value = 100

      expect(spyTrs.callCount).to.equal(3)
      expect(spyTr.callCount).to.equal(3)
    })

  })

  describe('dispatch changes', () => {

    let sandbox,
        trs,
        spy

    beforeEach(() => {
      sandbox = sinon.sandbox.create()
      spy = sandbox.spy()
      trs = new Transitions([
        { frame: 1 },
        { frame: 10 },
        { frame: 20 },
      ])
    })

    afterEach(() => {
      sandbox.restore()
      trs.each(tr => tr.destroy())
      trs.removeAllListeners()
    })

    it('should change list', () => {
      trs.on('change:list', spy)

      const list = []
      trs.list = list

      expect(spy.withArgs(list).calledOnce).to.be.true
    })

    it('should add transition', () => {
      trs.on('add', spy)
      const added = trs.add({ frame: 2 })
      expect(spy.withArgs(added).calledOnce).to.be.true
    })

    it('should remove transition', () => {
      trs.on('remove', spy)
      const removed = trs.remove(trs.at(0))
      expect(spy.withArgs(removed).calledOnce).to.be.true
    })

    it('should change frame of a transition', () => {
      trs.on('change:frame', spy)
      trs.at(0).frame = 12
      trs.at(0).frame = 13
      expect(spy.calledTwice).to.be.true
    })

    it('should change ease of a transition', () => {
      trs.on('change:ease', spy)
      trs.at(0).ease = 'Linear.easeNone'
      trs.at(0).ease = 'Strong.easeOut'
      expect(spy.calledOnce).to.be.true
    })

    it('should change params of a transition', () => {
      trs.on('change:params', spy)
      trs.at(0).params = { x: 1, y: 2 }
      expect(spy.getCall(0).args[1].toArray()).to.deep.equal([
        { x: 1 },
        { y: 2 }
      ])
    })

    it('should change a param of a transition', () => {
      trs.on('change:param', spy)
      const tr = trs.add({ frame: 100, params: { x: 200, y: 300 } })
      tr.params.get('x').value++
      expect(spy.calledOnce).to.be.true
    })

    it('should change a param:prop of a transition', () => {
      trs.on('change:param:prop', spy)
      const tr = trs.add({ frame: 100, params: { x: 200, y: 300 } })
      tr.params.get('x').prop = 'z'
      expect(spy.getCall(0).args[1]).to.equal('z')
    })

    it('should change param:value of a transition', () => {
      trs.on('change:param:value', spy)
      const tr = trs.add({ frame: 100, params: { x: 200, y: 300 } })
      tr.params.get('x').value = 500
      expect(spy.getCall(0).args[1]).to.equal(500)
    })

    it('should add param of a transition', () => {
      trs.on('add:param', spy)
      const added = trs.get(1).params.add({ top: '200px' })
      expect(spy.withArgs(added).calledOnce).to.be.true
    })

    it('should remove param of a transition', () => {
      trs.on('remove:param', spy)
      trs.get(1).params = { x: 500, y: 1000, z: 900 }

      const removeZ = trs.get(1).params.remove(trs.get(1).params.get('z'))
      const removeX = trs.get(1).params.remove(trs.get(1).params.get('x'))

      expect(spy.callCount).to.equal(2)
      expect(spy.withArgs(removeZ).calledOnce).to.be.true
      expect(spy.withArgs(removeX).calledOnce).to.be.true
    })

    it('should emit changes', () => {
      trs.on('change', spy)

      trs.get(10).frame = 15
      trs.get(20).ease = 'Quint.easeInOut'
      trs.get(15).params = []

      expect(spy.callCount).to.equal(3)
      expect(spy.getCall(0).args[0].changed).to.deep.equal({ type: 'frame', from: 10, to: 15 })
      expect(spy.getCall(1).args[0].changed).to.deep.equal({
        type: 'ease',
        from: 'Linear.easeNone',
        to: 'Quint.easeInOut'
      })
      expect(spy.getCall(2).args[0].changed).to.deep.equal({ type: 'params', from: [], to: [] })
    })
  })

})
