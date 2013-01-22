var should = require('should')
var winston = require('winston')

require('../index').Pushover;

var options = {
  level: 'info',
  silent: false,
  userKey: 'MCXRmYXrH1KtJfxGqPxT2d7LNcabzm',
  token: 'kBV2sDHg59tdAHJBPLFamp77Id0OWW'
}

describe('Winston Pushover', function () {

  var logger = null

  beforeEach(function (done) {
    logger = new (winston.Logger)()
    done()
  })

  afterEach(function (done) {
    setTimeout(done, 1000)
  })

  describe('logging', function () {

    var testMessage = 'winston-pushover test'

    it('should send message to Pushover', function (done) {
      logger.add(winston.transports.Pushover, options)

      logger.warn(testMessage, { metadata: 'some data' }, function (err, level, msg, meta) {
        should.not.exist(err)
        level.should.equal('warn')
        msg.should.equal(testMessage)
        done()
      })
    })

    it('should accept custom sounds', function (done) {
      options.sound = 'magic'
      logger.add(winston.transports.Pushover, options)
      delete options['magic']

      logger.warn(testMessage, { metadata: 'some data' }, function (err, level, msg, meta) {
        should.not.exist(err)
        level.should.equal('warn')
        msg.should.equal(testMessage)
        done()
      })
    })

  })

})
