var interpolate = require('util').format,
    handlers = require('./handlers'),
    request = require('request'),
    assert = require('assert'),
    async = require('async'),
    blage = require('../')

module.exports = function (helpers, callback) {
  var s = []
  
  s.push(function (callback) {
    request.put(helpers.address, function (e, res, body) {
      if(e) throw e
      assert(res.statusCode === 404)
      assert(body === undefined)
      callback()
    })
  })
  
  s.push(function (callback) {
    request.del(helpers.address, function (e, res, body) {
      if(e) throw e
      assert(res.statusCode === 200)
      assert(body === 'three')
      callback()
    })
  })
  
  s.push(function (callback) {
    request.post(helpers.address, function (e, res, body) {
      if(e) throw e
      assert(res.statusCode === 200)
      assert(body === 'two')
      callback()
    })
  })
  
  s.push(function (callback) {
    request.get(helpers.address, function (e, res, body) {
      if(e) throw e
      assert(res.statusCode === 200)
      assert(body === 'one')
      callback()
    })
  })
  
  async.series(s, callback)
}

module.exports.before = function (helpers, callback) {
  var onRequest = blage(handlers.one, handlers.two, handlers.three)
  var address = require('http').createServer(onRequest).listen().address()
  helpers.address = interpolate('http://%s:%s', address.address, address.port)
  callback()
}