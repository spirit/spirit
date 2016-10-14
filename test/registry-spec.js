import { create } from '../src'
import registry from '../src/registry/registry'
import { Group } from '../src/group'

describe('registry', () => {

  beforeEach(() => {
    registry.clear()
  })

  it('should have an empty registry', () => {
    expect(registry).to.have.lengthOf(0)
  })

  it('should fail on add invalid group', () => {
    expect(() => registry.add({})).to.throw(/Invalid group/)
  })

  it('should have 2 groups', () => {
    create([
      { name: 'ghost', fps: 30, timelines: [] },
      { name: 'logo', fps: 30, timelines: [] }
    ])

    expect(registry).to.have.lengthOf(2)
    registry.each(group => expect(group).to.be.an.instanceOf(Group))
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

  it('should get registered group names', () => {
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

  describe('add and remove from groups', () => {

    let groups

    beforeEach(() => {
      groups = create([])
    })

    it('should add groups to registry later on', () => {
      expect(registry).to.have.lengthOf(0)

      groups.add({ name: 'a' })
      groups.add({ name: 'b' })

      expect(registry).to.have.lengthOf(2)
      expect(registry.groupNames()).to.deep.equal(['a', 'b'])
    })

    it('should add array of groups to registry', () => {
      groups.add([
        { name: 'a' },
        { name: 'b' }
      ])
      expect(registry.groupNames()).to.deep.equal(['a', 'b'])
    })

    it('should remove group from registry', () => {
      groups.add([
        { name: 'a' },
        { name: 'b' },
        { name: 'c' }
      ])
      groups.remove(groups.get('b'))
      expect(registry.groupNames()).to.deep.equal(['a', 'c'])
    })

    it('should remove array of groups from registry', () => {
      groups.add([
        { name: 'a' },
        { name: 'b' },
        { name: 'c' }
      ])
      groups.remove([
        groups.get('a'),
        groups.get('b'),
      ])
      expect(registry.groupNames()).to.deep.equal(['c'])
    })

    it('should remove all groups from registry on groups.clear()', () => {
      groups.add([
        { name: 'a' },
        { name: 'b' },
        { name: 'c' },
      ])

      groups.clear()
      expect(registry).to.have.lengthOf(0)
    })

  })

  describe('multi groups', () => {

    it('should have mixed groups of multiple creates', () => {
      const a = create([
        { name: 'a', fps: 20, timelines: [] },
        { name: 'b', fps: 20, timelines: [] },
        { name: 'c', fps: 20, timelines: [] },
      ])

      const b = create([
        { name: 'c', fps: 20, timelines: [] },
        { name: 'd', fps: 20, timelines: [] },
        { name: 'e', fps: 20, timelines: [] },
      ])

      expect(registry.groupNames()).to.deep.equal(['a', 'b', 'c', 'd', 'e'])
      expect(registry.get('a')).to.equal(a.get('a'))
      expect(registry.get('b')).to.equal(a.get('b'))
      expect(registry.get('c')).to.equal(a.get('c'))
      expect(registry.get('d')).to.equal(b.get('d'))
      expect(registry.get('e')).to.equal(b.get('e'))
    })

  })

})
