var send = function (res, str) {
  res.statusCode = 200
  res.end(str)
}

module.exports.one = function (req, res, next) {
  if(!req.method.match(/get/i)) next()
  send(res, 'one')
}

module.exports.two = function (req, res, next) {
  if(!req.method.match(/post/i)) next()
  send(res, 'two')
}

module.exports.three = function (req, res, next) {
  if(!req.method.match(/delete/i)) next()
  send(res, 'three')
}