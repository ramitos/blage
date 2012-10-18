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

var notfound = module.exports.notfound = function (req, res, next) {
  res.statusCode = 404
  res.end()
}