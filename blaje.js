var notfound = function (req, res, next) {
  res.statusCode = 404
  res.end()
}

var blage = function (req, res) {
  var stack = this.stack.slice()
    
  var next = function () {
    stack.shift()(req, res, next)
  }
  
  next()
}

module.exports = function () {
  var self = {stack: Array.prototype.slice.call(arguments)}
  self.stack.push(notfound)
  return blage.bind(self)
}

