import config from '../src/config/config';
import { Groups, Group, Timelines } from '../src/group';
import setup from '../src/config/setup';
import { simpleGroups } from './fixtures/group/groups';
import { is } from '../src/utils';

const configGsap = { ...config.gsap };

describe('groups', () => {
  before(async () => {
    config.gsap.autoInjectUrl = 'test/fixtures/gsap.js';
    await setup();
  });

  after(async () => {
    config.gsap = { ...configGsap };
  });

  it('should create empty groups with default body as root element', () => {
    const groups = new Groups();
    expect(groups.rootEl).to.equal(document.body);
  });

  it('should fail on invalid type of root element', () => {
    expect(() => new Groups(null)).to.throw(/No root element provided/);
  });

  describe('parse', () => {
    it('should parse groups data by object', () => {
      const groups = new Groups(document.body, simpleGroups);
      expect(groups).to.have.lengthOf(2);
    });

    it('should pase groups by group instances', () => {
      const groups = new Groups(document.body, [
        new Group(simpleGroups[0]),
        new Group(simpleGroups[1]),
      ]);
      expect(groups).to.have.lengthOf(2);
    });

    it('should get group names', () => {
      const groups = new Groups(document.body, simpleGroups);
      expect(groups.list.map(group => group.name)).to.deep.equal(['puppet', 'ghost']);
    });

    it('should get correct durations', async () => {
      const groups = new Groups(document.body, simpleGroups);
      groups.construct();
      expect(groups.list.map(group => group.duration)).to.deep.equal([10, 25]);
    });

    it('should construct groups and resolve items', () => {
      const groups = new Groups(document.body, simpleGroups);

      groups.each(g => sinon.spy(g, 'resolve'));
      groups.construct(true);

      groups.each(g => {
        expect(g.resolve.called).to.be.true;
        g.resolve.restore();
      });
    });
  });

  describe('resolve elements', () => {
    let data,
      elements = [
        document.createElement('div'),
        document.createElement('div'),
        document.createElement('div'),
      ];

    before(() => {
      sinon
        .stub(is, 'isSVG')
        .callsFake(element => ['SVG', 'G', 'RECT'].includes(element.nodeName));
    });

    after(() => {
      is.isSVG.restore();
    });

    beforeEach(() => {
      data = simpleGroups[0];
      data.timelines = data.timelines.map(({ transformObject, ...rest }) => rest);

      elements.forEach(el => document.body.appendChild(el));
    });

    afterEach(() => {
      elements.forEach(el => document.body.contains(el) && document.body.removeChild(el));
    });

    it('should have resolved elements', () => {
      const group = new Groups(document.body, [data]).at(0);
      group.construct(true);

      expect(group.timelines).to.have.lengthOf(2);
      expect(group.resolved).to.have.lengthOf(2);
      expect(group.unresolved).to.have.lengthOf(0);
    });

    it('should have unresolved elements after removing elements', () => {
      const spy = sinon.spy();

      const group = new Groups(document.body, [data]).at(0);
      group.on('unresolve', spy);
      group.resolve();

      expect(group.timelines).to.have.lengthOf(2);
      expect(group.resolved).to.have.lengthOf(2);
      expect(group.unresolved).to.have.lengthOf(0);

      elements.forEach(el => document.body.contains(el) && document.body.removeChild(el));
      group.resolve();

      expect(spy.callCount).to.equal(1);
      expect(spy.getCall(0).args[0]).to.be.an.instanceOf(Timelines);
      expect(group.timelines).to.have.lengthOf(2);
      expect(group.resolved).to.have.lengthOf(0);
      expect(group.unresolved).to.have.lengthOf(2);
    });
  });

  describe('get', () => {
    it('should get a group by name', () => {
      const groups = new Groups(document.body, simpleGroups);
      expect(groups.get('puppet')).to.equal(groups.at(0));
      expect(groups.get('ghost')).to.equal(groups.at(1));
    });
  });
});
