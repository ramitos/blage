var test = require('specced')()

test.specs = {
  test: require('./test')
}

test.after = function () {
  process.exit()
}

test.run()