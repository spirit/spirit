import config from '../src/config/config';
import setup from '../src/config/setup';
import { gsap } from '../src/utils';
import { isGSAPInstance } from '../src/utils/gsap';

const configGsap = { ...config.gsap };

describe('config', () => {
  let sandbox;

  beforeEach(() => {
    config.gsap.autoInjectUrl = 'test/fixtures/gsap.js';

    sandbox = sinon.createSandbox();
    sandbox.spy(gsap, 'ensure');
    sandbox.spy(gsap, 'loadFromCDN');
  });

  afterEach(() => {
    sandbox.restore();
    config.gsap = { ...configGsap };
    delete window.gsap;
  });

  it('should load gsap from CDN on setup()', async () => {
    expect(config).to.have.nested.property('gsap.instance', null);
    expect(gsap.ensure.callCount).to.equal(0);
    expect(gsap.loadFromCDN.callCount).to.equal(0);

    await setup();

    expect(gsap.ensure.callCount).to.equal(1);
    expect(gsap.loadFromCDN.callCount).to.equal(1);

    expect(isGSAPInstance(config.gsap.instance)).to.be.true;
  });

  it('should load gsap from CDN on invalid gsap params', async () => {
    expect(config).to.have.nested.property('gsap.instance', null);
    expect(gsap.ensure.callCount).to.equal(0);
    expect(gsap.loadFromCDN.callCount).to.equal(0);

    await setup({ timeline: 123, tween: 123 });

    expect(gsap.ensure.callCount).to.equal(1);
    expect(gsap.loadFromCDN.callCount).to.equal(1);

    expect(isGSAPInstance(config.gsap.instance)).to.be.true;
  });

  it('should setup gsap through instances', async () => {
    expect(config).to.have.nested.property('gsap.instance', null);

    expect(gsap.ensure.callCount).to.equal(0);
    expect(gsap.loadFromCDN.callCount).to.equal(0);

    await setup({to: () => {}, timeline: () => {}});

    expect(gsap.ensure.callCount).to.equal(1);
    expect(gsap.loadFromCDN.callCount).to.equal(0);

    expect(isGSAPInstance(config.gsap.instance)).to.be.true;
  });

  it('should setup gsap from window object (using window.gsap)', async () => {
    window.gsap = {
      to: () => {},
      timeline: () => {},
    }

    expect(config).to.have.nested.property('gsap.instance', null);
    expect(gsap.ensure.callCount).to.equal(0);
    expect(gsap.loadFromCDN.callCount).to.equal(0);

    await setup();

    expect(gsap.ensure.callCount).to.equal(1);
    expect(gsap.loadFromCDN.callCount).to.equal(0);

    expect(isGSAPInstance(config.gsap.instance)).to.be.true;
  });
});
