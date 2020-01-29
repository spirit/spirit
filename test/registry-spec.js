import { create } from '../src';
import registry from '../src/registry/registry';
import { Group } from '../src/group';
import config from '../src/config/config';

describe('registry', () => {
  beforeEach(() => {
    registry.clear();
  });

  afterEach(() => {
    config.overwriteAnimations = true;
  });

  it('should have an empty registry', () => {
    expect(registry).to.have.lengthOf(0);
  });

  it('should fail on add invalid group', () => {
    expect(() => registry.add({})).to.throw(/Invalid group/);
  });

  it('should have 2 groups', () => {
    create([
      { name: 'ghost', timelines: [] },
      { name: 'logo', timelines: [] },
    ]);

    expect(registry).to.have.lengthOf(2);
    registry.each(group => expect(group).to.be.an.instanceOf(Group));
  });

  it('should get group by name', () => {
    create([
      { name: 'ghost', timelines: [] },
      { name: 'logo', timelines: [] },
    ]);

    expect(registry.get('ghost')).to.be.an.instanceOf(Group);
    expect(registry.get('logo')).to.be.an.instanceOf(Group);
    expect(registry.get('undefined')).to.be.undefined;
  });

  it('should get registered group names', () => {
    create([
      { name: 'ghost', timelines: [] },
      { name: 'logo', timelines: [] },
    ]);
    expect(registry.groupNames()).to.deep.equal(['ghost', 'logo']);
  });

  it('should skip existing group with config.overwriteAnimations false', () => {
    config.overwriteAnimations = false;

    create([
      { name: 'ghost', timelines: [] },
      { name: 'logo', timelines: [] },
    ]);

    const ghost = registry.get('ghost');
    const created = create({ name: 'ghost', timelines: [] }).at(0);

    expect(registry.get('ghost')).to.equal(ghost);
    expect(registry.get('ghost')).not.to.equal(created);
  });

  describe('add and remove from groups', () => {
    let groups;

    beforeEach(() => {
      groups = create([]);
    });

    it('should add groups to registry later on', () => {
      expect(registry).to.have.lengthOf(0);

      groups.add({ name: 'a' });
      groups.add({ name: 'b' });

      expect(registry).to.have.lengthOf(2);
      expect(registry.groupNames()).to.deep.equal(['a', 'b']);
    });

    it('should add array of groups to registry', () => {
      groups.add([{ name: 'a' }, { name: 'b' }]);
      expect(registry.groupNames()).to.deep.equal(['a', 'b']);
    });

    it('should remove group from registry', () => {
      groups.add([{ name: 'a' }, { name: 'b' }, { name: 'c' }]);
      groups.remove(groups.get('b'));
      expect(registry.groupNames()).to.deep.equal(['a', 'c']);
    });

    it('should remove array of groups from registry', () => {
      groups.add([{ name: 'a' }, { name: 'b' }, { name: 'c' }]);
      groups.remove([groups.get('a'), groups.get('b')]);
      expect(registry.groupNames()).to.deep.equal(['c']);
    });

    it('should remove all groups from registry on groups.clear()', () => {
      groups.add([{ name: 'a' }, { name: 'b' }, { name: 'c' }]);

      groups.clear();
      expect(registry).to.have.lengthOf(0);
    });

    it('should call reset for removed group', () => {
      const group = groups.add({ name: 'a' });
      sinon.spy(group, 'reset');

      groups.remove(group);
      expect(group.reset.called).to.be.true;
      group.reset.restore();
    });

    it('should call reset for removed groups on clear', () => {
      const created = groups.add([{ name: 'a' }, { name: 'b' }, { name: 'c' }]);

      groups.each(g => sinon.spy(g, 'reset'));
      groups.clear();

      expect(created.map(g => g.reset.called)).to.deep.equal([true, true, true]);
      created.forEach(g => g.reset.restore());
    });
  });

  describe('multi groups', () => {
    it('should have mixed groups of multiple creates', () => {
      const a = create([
        { name: 'a', timeScale: 1.4, timelines: [] },
        { name: 'b', timeScale: 1.9, timelines: [] },
        { name: 'c', timeScale: 1.2, timelines: [] },
      ]);

      const b = create([
        { name: 'c', timeScale: 1.4, timelines: [] },
        { name: 'd', timeScale: 1.9, timelines: [] },
        { name: 'e', timeScale: 1.2, timelines: [] },
      ]);

      expect(registry.groupNames()).to.deep.equal(['a', 'b', 'c', 'c', 'd', 'e']);
      expect(registry.get('a')).to.equal(a.get('a'));
      expect(registry.get('b')).to.equal(a.get('b'));
      expect(registry.get('c')).to.equal(a.get('c'));
      expect(registry.get('d')).to.equal(b.get('d'));
      expect(registry.get('e')).to.equal(b.get('e'));
    });
  });
});
