import {
  context,
  loadscript
} from '../src/utils'

describe('utils', () => {

  it('should has window context', () => {
    expect(context.isBrowser()).to.be.ok
  })

  describe('loadscript', () => {

    it ('should reject when context is not browser', (done) => {
      sinon.stub(context, 'isBrowser').returns(false)
      expect(loadscript('anything.js')).to.eventually.be.rejectedWith(/can only be loaded in browser/).notify(done)
      context.isBrowser.restore()
    })

    it('should reject invalid request', () => {
      return expect(loadscript('invalid.js')).to.eventually.be.rejectedWith(/Could not load/)
    })

    it('should load script into window', (done) => {
      expect(window.someGlobal).to.be.undefined

      loadscript('test/fixtures/loadscript.js')
        .then(() => {
          expect(window.someGlobal).to.be.a('function')
          window.someGlobal = undefined
          done()
        })
        .catch(done)
    })

  })

})
