import { create } from '../src'
import registry from '../src/registry/registry'
import { Group } from '../src/group'

describe('registry', () => {

  afterEach(() => {
    registry.clear()
  })

  it('should have an empty registry', () => {
    expect(registry).to.have.lengthOf(0)
  })

  it('should have 2 groups', () => {
    create([
      { name: 'ghost', fps: 30, timelines: [] },
      { name: 'logo', fps: 30, timelines: [] }
    ])

    expect(registry).to.have.lengthOf(2)
    registry.each(group => expect(group).to.be.an.instanceOf(Group))
  })

  it('should fail on add invalid group', () => {
    expect(() => registry.add({})).to.throw(/Invalid group/)
  })

  it('should get group by name', () => {
    create([
      { name: 'ghost', fps: 30, timelines: [] },
      { name: 'logo', fps: 30, timelines: [] }
    ])

    expect(registry.get('ghost')).to.be.an.instanceOf(Group)
    expect(registry.get('logo')).to.be.an.instanceOf(Group)
    expect(registry.get('undefined')).to.be.undefined
  })

  it('should group names', () => {
    create([
      { name: 'ghost', fps: 30, timelines: [] },
      { name: 'logo', fps: 30, timelines: [] }
    ])
    expect(registry.groupNames()).to.deep.equal(['ghost', 'logo'])
  })

  it('should skip existing group', () => {
    create([
      { name: 'ghost', fps: 30, timelines: [] },
      { name: 'logo', fps: 30, timelines: [] }
    ])

    const ghost = registry.get('ghost')
    const logo = registry.get('logo')

    const created = create({ name: 'ghost', fps: 30, timelines: [] }).at(0)

    expect(registry.get('ghost')).to.equal(ghost)
    expect(registry.get('ghost')).not.to.equal(created)
  })

})
