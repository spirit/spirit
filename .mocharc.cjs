module.exports = {
  diff: true,
  timeout: 5000,
  bail: true,
  exit: true,
  slow: 200,
  ui: 'bdd',
  'node-option': ['import=@babel/register/experimental-worker.js'],
  require: [
    'test/bootstrap.js'
  ],
  'watch-files': [
    'test/*-spec.js'
  ]
};
