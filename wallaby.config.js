'use strict'

module.exports = function(wallaby) {

  return {

    files: [
      { pattern: 'src/**/*.js', load: false },
      { pattern: 'test/fixtures/*.*', instrument: false },
      { pattern: 'test/fixtures/group/*.*', instrument: true },
      'test/bootstrap.js'
    ],

    tests: [
      'test/*-spec.js'
    ],

    compilers: {
      '**/*.js': wallaby.compilers.babel()
    },

    env: {
      type: 'node'
    },

    workers: { recycle: true },

    middleware: function middleware(app, express) {
      app.use('/test/fixtures', express.static(
        require('path').join(__dirname, 'test/fixtures')
      ))
    },

    setup: function setup() {
      process.env.NODE_ENV = 'test'
      require('./test/bootstrap')
    }

  }

}
