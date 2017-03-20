import Timelines from '../src/group/timelines'
import Timeline from '../src/group/timeline'

describe('timelines', () => {

  const divA = document.createElement('div')
  const divB = document.createElement('div')
  const divC = document.createElement('div')

  let timelines

  beforeEach(() => {
    timelines = new Timelines([
      new Timeline('dom', divA, [], 'div[0]'),
      new Timeline('dom', divB, [], 'div[1]'),
      new Timeline('dom', divC, [], 'div[2]')
    ])
  })

  describe('parse', () => {

    it('should have empty timelines', () => {
      expect(new Timelines()).to.have.lengthOf(0)
    })

    it('should parse array of timelines by object', () => {
      expect(timelines).to.have.lengthOf(3)
      timelines.each(tl => expect(tl).to.be.an.instanceOf(Timeline))

      expect(timelines.at(0)).to.have.property('transformObject', divA)
      expect(timelines.at(1)).to.have.property('transformObject', divB)
      expect(timelines.at(2)).to.have.property('transformObject', divC)
    })

    it('should parse array of timelines by instances', () => {
      expect(timelines).to.have.lengthOf(3)
      timelines.each(tl => expect(tl).to.be.an.instanceOf(Timeline))

      expect(timelines.at(0)).to.have.property('transformObject', divA)
      expect(timelines.at(1)).to.have.property('transformObject', divB)
      expect(timelines.at(2)).to.have.property('transformObject', divC)
    })

  })

  describe('#get', () => {

    it('should get the timeline by transformObject', () => {
      expect(timelines.get(divA)).to.equal(timelines.at(0))
      expect(timelines.get(divB)).to.equal(timelines.at(1))
      expect(timelines.get(divC)).to.equal(timelines.at(2))
      expect(timelines.get({})).to.be.undefined
    })

  })

})
