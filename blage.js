var interpolate = require('util').format,
    colors = require('colors')

module.exports = function () {
  var stack = Array.prototype.slice.call(arguments)
  stack.push(notfound)

  return function (req, res) {
    var pile = stack.slice()

    var next = function () {
      pile.shift()(req, res, next)
    }

    next()
  }
}

module.exports.log = function (req, res, next) {
  console.log(interpolate('%s %s%s', req.method.toUpperCase().green, req.headers.host.grey, req.url.grey))
  next()
}

var notfound = module.exports.notfound = function (req, res, next) {
  res.statusCode = 404
  res.end()
}