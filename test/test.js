var winston = require('winston');
var should = require('should')

require('../index').Pushover;

var options = {
  level: 'info',
  silent: false,
  userKey: 'MCXRmYXrH1KtJfxGqPxT2d7LNcabzm',
  token: 'kBV2sDHg59tdAHJBPLFamp77Id0OWW'
}

winston.remove(winston.transports.Console)
winston.add(winston.transports.Pushover, options)

describe('Winston Pushover', function () {

  describe('logging', function () {

    var testMessage = 'winston-pushover test'

    it('should send message to Pushover', function (done) {
      winston.warn(testMessage, { metadata: 'some data' }, function (err, level, msg, meta) {
        should.not.exist(err)
        level.should.equal('warn')
        msg.should.equal(testMessage)
        done()
      })
    })

  })

})
