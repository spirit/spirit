import Groups from '../src/group/groups'
import Group from '../src/group/group'
import { simpleGroups } from './fixtures/group/groups'

describe('groups', () => {

  it('should create empty groups with default body as root element', () => {
    const groups = new Groups()
    expect(groups.rootEl).to.equal(document.body)
  })

  it('should fail on invalid type of root element', () => {
    expect(() => new Groups(null)).to.throw(/No root element provided/)
  })

  describe('parse', () => {

    it('should parse groups data by object', () => {
      const groups = new Groups(document.body, simpleGroups)
      expect(groups).to.have.lengthOf(2)
    })

    it('should pase groups by group instances', () => {
      const groups = new Groups(document.body, [
        new Group(simpleGroups[0]),
        new Group(simpleGroups[1])
      ])
      expect(groups).to.have.lengthOf(2)
    })

    it('should get group names', () => {
      const groups = new Groups(document.body, simpleGroups)
      expect(groups.list.map(group => group.name)).to.deep.equal(['puppet', 'ghost'])
    })

    it('should get correct durations', async() => {
      const groups = new Groups(document.body, simpleGroups)
      await groups.construct()
      expect(groups.list.map(group => group.timeline.duration())).to.deep.equal([100, 250])
    })

  })

  describe('get', () => {
    it('should get a group by name', () => {
      const groups = new Groups(document.body, simpleGroups)
      expect(groups.get('puppet')).to.equal(groups.at(0))
      expect(groups.get('ghost')).to.equal(groups.at(1))
    })
  })

})
