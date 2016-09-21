import Timeline from '../src/group/timeline'
import Transitions from '../src/group/transitions'

describe('timeline', () => {

  it('should require an element', () => {
    expect(() => new Timeline()).to.throw(/HTMLElement is required/)
  })

  it('should have element and transitions defined', () => {
    const el = document.createElement('div')
    const timeline = new Timeline(el)

    expect(timeline.el).equal(el)
    expect(timeline.transitions).to.be.an.instanceOf(Transitions)
    expect(timeline.label).equal(null)
  })

  it('should have a custom label', () => {
    const el = document.createElement('div')
    const timeline = new Timeline(el, null, 'ghost-body')

    expect(timeline.label).equal('ghost-body')
  })


})
