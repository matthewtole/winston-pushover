/*
 * winston-pushover.js: Transport for outputting using the Pushover service.
 *
 * (c) 2012 Matthew Tole
 */

var util = require('util');
var winston = require('winston');
var pushover = require('pushover-notifications');

/**
 * @constructs Pushover
 * @param {object} options hash of options
 */
var Pushover = function (options) {
  this.name = 'pushover';
  this.level = options.level || 'info';
  this.userKey = options.user;
  this.token = options.token;
};

/** @extends winston.Transport */
util.inherits(Pushover, winston.Transport);

/** 
 * Define a getter so that `winston.transports.Pushover` 
 * is available and thus backwards compatible.
 */
winston.transports.Pushover = Pushover;

/**
 * Core logging method exposed to Winston. Metadata is optional.
 * @function log
 * @member Pushover
 * @param level {string} Level at which to log the message
 * @param msg {string} Message to log
 * @param meta {Object} **Optional** Additional metadata to attach
 * @param callback {function} Continuation to respond to when complete.
 */
Pushover.prototype.log = function (level, msg, meta, callback) {

  // Build the Pushover notification object.
  var pushNote = {
    title: level.substr(0, 1).toUpperCase() + level.substr(1);,
    message: msg,
    timestamp: Math.round((new Date()).getTime() / 1000),
  };

  // Pushover can only handle a combined title and message length of 512,
  // so if the message is too long, trim it down to size.
  if (pushNote.title.length + pushNote.message.length > 512) {
    pushNote.message = pushNote.message.substr(0, 
      512 - pushNote.title.length);
  }

  // Create the object to send the data to Pushover.
  var pusher = new pushover({ user: this.userKey, token: this.token });

  // Send the notification object we build to the Pushover server.
  pusher.send(pushNote, function(error, result) {
    if (error) {
      callback(error, false);
    }
    else {
      var result = JSON.parse(result);
      if (result.status == 1) {
        callback(null, true);
      }
      else {
        callback("Pushover failed with error code " + result.status, false);
      }
    }
  });
};

module.exports.Pushover = Pushover;