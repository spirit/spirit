import { gsap } from '../src/utils'
import Group, { groupDefaults } from '../src/group/group'
import Timelines from '../src/group/timelines'

describe('group', () => {

  let sandbox

  beforeEach(() => sandbox = sinon.sandbox.create())
  afterEach(() => sandbox.restore())

  it('should create an empty group', () => {
    const group = new Group()

    expect(group.fps).equal(groupDefaults.fps)
    expect(group.name).equal(groupDefaults.name)
    expect(group.timelines).equal(groupDefaults.timelines)
  })

  it('should create custom group', () => {
    const group = new Group({ name: 'ghost' })
    expect(group.name).equal('ghost')
  })

  it('should have empty timelines', () => {
    const group = new Group()
    expect(group.timelines).to.be.an.instanceOf(Timelines)
    expect(group.timelines).to.have.lengthOf(0)
  })

  it.skip('should ensure gsap before construct animation', async () => {
    const group = new Group()
    const spy = sandbox.spy(gsap, 'ensure')

    const result = await resolvePromise(group.construct())

    expect(spy.called).to.be.true
    expect(result).not.to.be.an('error')
  })


})
